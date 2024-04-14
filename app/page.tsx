"use client";

export default async function Home() {
	const handleSubmit = async (formData: FormData) => {
		const searchText = formData.get("text");
		const response = await fetch("/api/word2vec", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ searchText }),
		});
		const data = await response.json();
		console.log(data.vector);
	};
	return (
		<>
			<form
				action={handleSubmit}
				className="pt-10 max-w-full mx-5 md:mx-20"
			>
				<div className="mb-5">
					<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
						Search term
					</label>
					<input
						type="text"
						name="text"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						required
					/>
				</div>
				<button
					type="submit"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					Search
				</button>
			</form>
		</>
	);
}
