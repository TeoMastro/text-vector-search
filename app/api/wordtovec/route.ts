import { NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { text } = await req.json();
        const apiUrl = "http://127.0.0.1:5000/vectorize";

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: text }),
        });

        const res = await response.json();
        const vector = res.vector;
		console.log(vector.length)
		const first = await prisma.textVectors.findFirst();
		console.log(first);
        // const word = await findSimilarVectors(vector);
        // console.log(word);
        return NextResponse.json({ word: "teo" });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: error }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}

/**
 * Find similar vectors using euclidian distance
 */
async function findSimilarVectors(vector: any) {
    return await prisma.$queryRaw`SELECT *, vector <-> ${Prisma.sql(
        vector
    )} AS distance FROM "TextVectors" ORDER BY distance LIMIT 5`;
}
