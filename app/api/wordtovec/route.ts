import {
    euclidean,
    cityBlock,
    minkowski,
    chebyshev,
    sorensen,
    canberra,
    soergel,
    findSimilarVectors,
} from "@ext/vector-functions/functions";
import { NextResponse } from "next/server";

// Object mapping function names to their corresponding functions
const distanceFunctions = {
    euclidean,
    cityBlock,
    minkowski,
    chebyshev,
    sorensen,
    canberra,
    soergel,
};

export async function POST(req: Request) {
    try {
        const { text, k, distanceFunctionName } = await req.json();
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

        // Get the correct distance function using the distanceFunctionName
        const distanceFunction = distanceFunctions[distanceFunctionName];
        
        if (typeof distanceFunction !== 'function') {
            throw new Error(`Distance function '${distanceFunctionName}' is not a function.`);
        }

        const similarWords = await findSimilarVectors(vector, k, distanceFunction);

        return NextResponse.json({ words: similarWords });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: 'see server console' }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}
