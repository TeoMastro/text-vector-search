import fs from "fs";
import path from "path";
import { prisma } from "@ext/lib/prisma";

export default async function InsertDataForm() {
	const filePath = path.join("./data/", "simple_sentence_vectors.json");
	const jsonData = fs.readFileSync(filePath);
	const data = JSON.parse(jsonData);

	// routine to insert data
	for (const item of data) {
		await prisma.$executeRaw`INSERT INTO "TextVectors" ("text", "vector") VALUES (${item.text}, ${item.vector}::float8[])`;
	}

	console.log(`Inserted ${data.length} items.`);

	return <>Inserting data...</>;
}
