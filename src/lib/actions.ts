"use server";
import { z } from "zod";
import dbConnect from "./db-connect";
import ProductModel from "@/models/product.model";
import { revalidatePath } from "next/cache";

export async function createProduct(prevState: any, formData: FormData) {
	const schema = z.object({
		name: z.string().min(3),
		image: z.string().min(1),
		price: z.number().min(1),
		category: z.string().min(1),
	});

	const parse = schema.safeParse({
		name: formData.get("name"),
		image: formData.get("image"),
		price: Number(formData.get("price")),
		category: formData.get("category"),
	});

	if (!parse.success) {
		console.log(parse.error);

		return {
			message: "Form data is not valid"
		}
	}

	const data = parse.data;

	try {
		await dbConnect();

		const product = new ProductModel(data);
		await product.save();
		revalidatePath("/");
		
		return {
			message: `Create product success - ${data.name}`,
		}
	} catch (err) {
		return {
			message: "Failed to create product",
		}
	}
}

export async function deleteProduct(formData: FormData) {
	const schema = z.object({
		_id: z.string().min(1),
		name: z.string().min(1),
	});

	const data = schema.parse({
		_id: formData.get("_id"),
		name: formData.get("name"),
	});

	try {
		await dbConnect();
		await ProductModel.findOneAndDelete({
			_id: data._id,
		})
		revalidatePath("/");
		console.log({
			message: `Deleted product ${data.name}`
		});

		return {
			message: `Deleted product ${data.name}`
		}
	} catch (err) {
		return {
			message: `Failed to delete product`
		}
	}
}