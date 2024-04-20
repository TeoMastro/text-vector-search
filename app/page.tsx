"use client";

import { useState } from "react";

export default function Home() {
	const [data, setData] = useState([]);

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const text = formData.get("text");
		const k = formData.get("k");
		const distanceFunctionName = formData.get("distanceFunctionName");

		try {
			const response = await fetch("/api/wordtovec", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					text,
					k,
					distanceFunctionName,
				}),
			});

			const result = await response.json();
			// Update state with the new data
			setData(result.words || []); // Assuming the response has a 'words' key
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className="pt-10 max-w-full mx-5 md:mx-20"
			>
				{/* Search Term Input */}
				<div className="mb-5">
					<label
						htmlFor="text"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Search term
					</label>
					<input
						id="text"
						type="text"
						name="text"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						required
					/>
				</div>

				{/* K Nearest Items Select */}
				<div className="mb-5">
					<label
						htmlFor="k"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						K nearest items
					</label>
					<select
						id="k"
						name="k"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
						required
					>
						<option value="5">5</option>
						<option value="10">10</option>
						<option value="20">20</option>
					</select>
				</div>

				{/* Distance Function Select */}
				<div className="mb-5">
					<label
						htmlFor="distanceFunctionName"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Distance Function
					</label>
					<select
						id="distanceFunctionName"
						name="distanceFunctionName"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
						required
					>
						<option value="euclidean">Euclidean</option>
						<option value="cityBlock">City Block</option>
						<option value="minkowski">Minkowski</option>
						<option value="chebyshev">Chebyshev</option>
						<option value="sorensen">Sørensen</option>
						<option value="canberra">Canberra</option>
						<option value="soergel">Soergel</option>
					</select>
				</div>

				{/* Submit Button */}
				<button
					type="submit"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					Search
				</button>
			</form>

			{/* Table to display data */}
			<div className="pt-10 max-w-full mx-5 md:mx-20">
				<table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="py-3 px-6">
								ID
							</th>
							<th scope="col" className="py-3 px-6">
								Text
							</th>
							<th scope="col" className="py-3 px-6">
								Distance
							</th>
							<th scope="col" className="py-3 px-6">
								Similarity
							</th>
						</tr>
					</thead>
					<tbody>
						{data.map((item: any, index: any) => (
							<tr
								key={index}
								className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
							>
								<td className="py-4 px-6">{item.id}</td>
								<td className="py-4 px-6">{item.text}</td>
								<td className="py-4 px-6">
									{item.distance.toFixed(3)}
								</td>
								<td className="py-4 px-6">
									{item.similarity.toFixed(2)}%
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}
