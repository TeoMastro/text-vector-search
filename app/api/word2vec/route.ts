import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
	try {
		const { searchText } = await req.json();
		const apiUrl = 'http://127.0.0.1:5000/vectorize';

		const response = await axios.post(apiUrl, {
			text: searchText
		});

		if (response.status === 200) {
			return NextResponse.json({ vector: response.data.vector });
		} else {
			return new Response(
				JSON.stringify({ error: "API responded with an error" }),
				{
					status: response.status,
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
		}
	} catch (error) {
		console.log(error);
		return new Response(
			JSON.stringify({ error: "Failed to create vector" }),
			{
				status: 500,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	}
}
