import models from '../models/index.js';
import db from '../config/connection.js';

export default async (modelName: "Question", collectionName: string) => {
  try {
    const model = models[modelName];

    // Ensure the model exists and has a db property
    if (!model) {
      throw new Error(`Model ${modelName} does not exist or is not properly defined.`);
    }
    if (!model.db) {
      throw new Error(`Model ${modelName} does not have a db property.`);
    }
    if (!model.db.db) {
      throw new Error(`Model ${modelName} does not have a db.db property.`);
    }
    
    let modelExists = await model.db.db.listCollections({
      name: collectionName
    }).toArray()

    if (modelExists.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    throw err;
  }
}
