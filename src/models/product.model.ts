import mongoose from "mongoose"

export type Product = {
	_id: string,
	name: string,
	image: string,
	price: number,
	category: string,
}

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		image: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		category: {
			type: String,
			required: true,
		}
	},
	{
		timestamps: true,
	}
);

const ProductModel = mongoose.models.Product || mongoose.model("Product", productSchema);

export default ProductModel;