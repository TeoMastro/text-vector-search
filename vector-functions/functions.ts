import { prisma } from "@ext/lib/prisma";

export function euclidean(v1: any[], v2: { [x: string]: number }) {
	return Math.sqrt(v1.reduce((acc, val, i) => acc + (val - v2[i]) ** 2, 0));
}

export function cityBlock(v1: any[], v2: { [x: string]: number }) {
	return v1.reduce((acc, val, i) => acc + Math.abs(val - v2[i]), 0);
}

export function minkowski(v1: any[], v2: { [x: string]: number }, p: number) {
	return Math.pow(
		v1.reduce((acc, val, i) => acc + Math.pow(Math.abs(val - v2[i]), p), 0),
		1 / p
	);
}

export function chebyshev(v1: any[], v2: { [x: string]: number }) {
	return Math.max(...v1.map((val, i) => Math.abs(val - v2[i])));
}

export function sorensen(v1: any[], v2: { [x: string]: any }) {
	const numerator = v1.reduce(
		(acc, val, i) => acc + Math.abs(val - v2[i]),
		0
	);
	const denominator = v1.reduce((acc, val, i) => acc + val + v2[i], 0);
	return numerator / denominator;
}

export function canberra(v1: string | any[], v2: number[]) {
	let distance = 0;
	for (let i = 0; i < v1.length; i++) {
		const numerator = Math.abs(v1[i] - v2[i]);
		const denominator = Math.abs(v1[i]) + Math.abs(v2[i]);
		if (denominator > 0) {
			distance += numerator / denominator;
		}
	}
	return distance;
}

export function soergel(v1: any[], v2: { [x: string]: number }) {
	const numerator = v1.reduce(
		(acc, val, i) => acc + Math.abs(val - v2[i]),
		0
	);
	const denominator = v1.reduce(
		(acc, val, i) => acc + Math.max(val, v2[i]),
		0
	);
	return numerator / denominator;
}

/**
 * Compares the input of the user to the vectors stored in db.
 * @param vector
 * @param k top k elements to return.
 * @returns the top k items with distance closer to vector.
 */
export async function findSimilarVectors(
	vector: any[],
	k: number,
	measurementFunction: any
) {
	const vectors = await fetchVectors();
	const distanceResults = vectors.map((dbVector: { vector: any }) => ({
		...dbVector,
		distance: measurementFunction(vector, dbVector.vector),
	}));

	// Find the maximum distance in the top k results to use as a baseline for similarity
	const sortedDistances = distanceResults
		.slice()
		.sort(
			(a: { distance: number }, b: { distance: number }) =>
				a.distance - b.distance
		)
		.slice(0, k);

	const maxDistance =
		sortedDistances.length > 0
			? sortedDistances[sortedDistances.length - 1].distance
			: 0;

	// Calculate similarity as a percentage
	const similarityResults = sortedDistances.map(
		(result: { distance: number }) => ({
			...result,
			similarity:
				maxDistance > 0
					? (1 - result.distance / maxDistance) * 100
					: 100, // In case maxDistance is 0, avoid division by zero
		})
	);

	return similarityResults;
}

/**
 * Fetches all vectors from db.
 */
export async function fetchVectors() {
	const result: any =
		await prisma.$queryRaw`SELECT id, text, CAST(vector AS text) AS vector FROM "TextVectors"`;
	return result.map((entry: { vector: string }) => ({
		...entry,
		vector: entry.vector
			.substring(1, entry.vector.length - 1)
			.split(",")
			.map(Number),
	}));
}
