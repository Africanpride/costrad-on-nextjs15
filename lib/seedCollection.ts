// lib/seedCollection.ts
import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";

export async function seedCollection(collectionName: string) {
  const dataPath = path.join(process.cwd(), "data", `${collectionName}_mongo.json`);

  if (!fs.existsSync(dataPath)) {
    throw new Error(`Data file for ${collectionName} not found.`);
  }

  const fileContent = fs.readFileSync(dataPath, "utf8");
  let data = JSON.parse(fileContent);

  const dateFields = ["startDate", "endDate", "created_at", "updated_at"];

  // Ensure date strings are converted to JS Date objects
  const documentsToInsert = (data as Array<{ [key: string]: any }>).map(({ _id, ...rest }) => {
    for (const field of dateFields) {
      if (rest[field]) {
        rest[field] = new Date(rest[field]);
      }
    }
    return rest;
  });

  const client = new MongoClient(process.env.MONGODB_URI!);
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection(collectionName);

    const count = await collection.countDocuments();
    if (count === 0) {
      await collection.insertMany(documentsToInsert);
      console.log(`${collectionName} seeded.`);
    } else {
      console.log(`${collectionName} already exists.`);
    }
  } finally {
    await client.close();
  }
}
