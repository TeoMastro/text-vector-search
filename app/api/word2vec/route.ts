import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { searchText } = await req.json();
        console.log(searchText)
		return NextResponse.json({ vector: "Vector for " });
	} catch (error) {
		console.log(error);
		return new Response(
			JSON.stringify({ error: "Failed to create and save embedding" }),
			{
				status: 500,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	}
}
