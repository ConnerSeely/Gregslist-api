import mongoose from "mongoose"
const Schema = mongoose.Schema

export const CarSchema = new Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: String, required: true },
    price: { type: Number, required: true, min: 1 },
    description: { type: String, default: "No Description Provided" },
    imgUrl: { type: String, default: "http://placekitten.com/200/300" },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account' }
}, { timestamps: true, toJSON: { virtuals: true } })

CarSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})