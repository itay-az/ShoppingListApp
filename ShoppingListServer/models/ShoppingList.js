import mongoose from "mongoose";

const Schema = mongoose.Schema;

const shoppingListSchema = new Schema ({
    _id: mongoose.Schema.Types.ObjectId,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    ShoppingListName: String,
    Items:
        [
            {
                name:String
            }
        ],


});



export default mongoose.model('ShoppingList', shoppingListSchema);