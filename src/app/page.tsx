import CreateForm from "@/components/CreateForm";
import dbConnect from "@/lib/db-connect";
import Image from "next/image";
import { Toaster } from "react-hot-toast";
import ProductModel, { Product } from "@/models/product.model";
import DeleteForm from "@/components/DeleteForm";
import React from "react";

export default async function Home() {
	await dbConnect();

	const products = await ProductModel.find({}).sort({
		_id: -1
	}) as Product[];

	return (
		<div className="mx-auto max-w-2xl lg:max-w-7xl">
			<div className="flex justify-between items-center">
				<h1 className="font-bold py-10 text-2xl">Next.js 14 Server Actions MongoDB - List all data, create and delete product.</h1>
				<CreateForm />
				<Toaster />
			</div>
			<div className="inline-block min-w-full align-middle">
				<table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
					<thead className="bg-gray-100 dark:bg-gray-700">
						<tr>
							<th scope="col" className="p-4">
								<div className="flex items-center" 
								>
									<input id="checkbox-all" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
									/>
									<label htmlFor="checkbox-all" className="sr-only">checkbox</label>
								</div>
							</th>
							<th className="py-3 text-left">Image</th>
							<th className="py-3 text-left">Product</th>
							<th className="py-3 text-left">Price</th>
							<th className="py-3 text-left">Category</th>
							<th className="py-3 text-left">Actions</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">

						{
							products.length === 0 ? (
								<tr>
									<td colSpan={6}  className="text-center">No product found</td>
								</tr>
							) : (
								products.map((product: Product) => (
									<tr className="hover:bg-gray-100 dark:hover:bg-gray-700" key={product._id}>
										<td className="p-4 w-4">
											<div className="flex items-center">
												<input id="checkbox-table-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
												<label htmlFor="checkbox-table-1" className="sr-only">checkbox</label>
											</div>
										</td>
										<td>
											<Image
												src={product.image}
												alt={product.name}
												width={80}
												height={80}
												className="rounded-lg"
											/>
										</td>
										<td>{product.name}</td>
										<td>{product.price}</td>
										<td>{product.category}</td>
										<td>
											<DeleteForm
												_id={product._id.toString()}
												name={product.name}
											/>
										</td>
									</tr>
								))
							)
						}
					</tbody>
				</table>
			</div>
		</div>
	);
}
