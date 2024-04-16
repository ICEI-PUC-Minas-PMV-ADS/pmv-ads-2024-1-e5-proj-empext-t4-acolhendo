import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IProductImg extends Document {
    product_id: number;
    url: string;
}

const productImgSchema = new Schema<IProductImg>({
    product_id: { type: Number, required: true },
    url: { type: String, required: true }
});

let ProductImg: Model<IProductImg>;

try {

    ProductImg = mongoose.model('product_img');

} catch(e) {

    ProductImg = mongoose.model('product_img', productImgSchema);

}

export default ProductImg;