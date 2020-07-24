import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    ingredients: { type: Array, required: true },
    description: { type: String, required: true },
    method: { type: Array, required: true },
    parentRecipe: { type: String, default: '', required: false },
}, {
    timestamps: true
})

const recipeModel = mongoose.model("Recipe", recipeSchema);

export default recipeModel;