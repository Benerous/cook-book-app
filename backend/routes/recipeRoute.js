import express from 'express';
import Recipe from '../models/recipeModel';

const router = express.Router();

router.get("/", async (req, res) => {
    const sortOrder = { title: 1 };
    const parentId = req.query.parentId
        ? {
            parentRecipe: {
            $regex: req.query.parentId,
            $options: 'i',
            },
        }
        : {};
    const searchKeyword = req.query.searchKeyword
        ? {
            title: {
                $regex: req.query.searchKeyword,
                $options: 'i',
            }
        }
        : {};
    const recipes = await Recipe.find({ ...searchKeyword, ...parentId }).sort(sortOrder);
    res.send(recipes);
});

router.post("/new", async (req, res) => {
    const recipe = new Recipe({
        title: req.body.title,
        image: req.body.image,
        ingredients: req.body.ingredients,
        method: req.body.method,
        description: req.body.description,
    });
    const newRecipe = await recipe.save();
    if (newRecipe) {
        return res.status(201).send({ message: "New Recipe Created" , data: newRecipe });
    } else {
        return res.status(500).send({ message: "Error while creating new Recipe" })
    }
})

router.post("/child", async (req, res) => {
    const parentId = req.query.parentId;
    const childRecipe = new Recipe({
        title: req.body.title,
        image: req.body.image,
        ingredients: req.body.ingredients,
        method: req.body.method,
        description: req.body.description,
        parentRecipe: parentId,
    });
    const newChildRecipe = await childRecipe.save();
    if (newChildRecipe) {
        return res.status(201).send({ message: "New Recipe Created" , data: newChildRecipe});
    } else {
        return res.status(500).send({ message: "Error while creating new Recipe" })
    }
})

router.get("/:id", async (req, res) => {
    const recipe = await Recipe.findOne({ _id: req.params.id });
    if (recipe) {
        res.send(recipe)
    } else {
        res.status(404).send({ message: "Recipe not Found" });
    }
})

router.delete("/:id", async (req, res) => {
    const deletedRecipe = await Recipe.findById(req.params.id);
    if (deletedRecipe) {
        await Recipe.updateMany({ parentRecipe: req.params.id }, { parentRecipe: "" });
        await deletedRecipe.remove(); 
        res.send({ message: "Product deleted" });
    } else {
        res.send("Error in Deletion");
    }
})

router.put("/edit/:id", async (req, res) => {
    const recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);
    if (recipe) {
        recipe.title = req.body.title || recipe.title;
        recipe.image = req.body.image || recipe.image;
        recipe.ingredients = req.body.ingredients || recipe.ingredients;
        recipe.method = req.body.method || recipe.method;
        recipe.description = req.body.description || recipe.description;
        const updatedRecipe = await recipe.save();
        res.send({
            _id: updatedRecipe._id,
            title: updatedRecipe.title,
            image: updatedRecipe.image,
            ingredients: updatedRecipe.ingredients,
            method: updatedRecipe.method,
            description: updatedRecipe.description
        });
    } else {
        res.status(404).send({ message: "Recipe not found" });
    }
})
export default router;