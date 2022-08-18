import express from 'express';
import mongoose from "mongoose";
import ShoppingList from './models/ShoppingList.js';

const router = express.Router();


// Create a new Shopping List
router.post('/AddShoppingList',async (request,response) => {

    const ShoppingListName = request.body.ShoppingListName;

    console.log(ShoppingListName)

    ShoppingList.findOne({ShoppingListName:ShoppingListName})
    .then(async shoppingList => {
        if(shoppingList) {
            return response.status(500).json({
                status:false,
                message:'Name already in use'
            })
        } else{

            const id = mongoose.Types.ObjectId();
            const sListName = ShoppingListName;

            const _shoppingListName = new ShoppingList({
                _id:id,
                ShoppingListName:sListName
            });

            return _shoppingListName
            .save()
            .then((sList) => {
                return response.status(200).json({
                    status:true,
                    message:sList
                })
            })

        }
    })
    .catch(err => {
        return response.status(500).json({
            status:false,
            message:err
        })
    })
});


// Get All Shopping Lists
router.get('/getList', async(request,response) => {
    ShoppingList.find()
    .then(async (results) => {
        return response.status(200).json({
            results
        })
    })
    .catch(err => {
        return response.status(500).json({
            status:false,
            meesage:err
        })
    })
})

router.get('/:listId/getItems',async (request,response) => {
    const lId = request.params.listId;

    ShoppingList.findById(lId)
    .then(results => {
        return response.status(200).json({
            message:results.Items
        })
    })
    .catch(err => {
        return response.status(500).json({
            status:false,
            message:err
        })
    })
})
// Delete a Shopping List
router.delete('/delete/:id',async (request,response) => {
    const listId = request.params.id;
    ShoppingList.findByIdAndDelete(listId)
    .then(results => {
        return response.status(200).json({
            message:results
        })
    })
    .catch(err => {
        return response.status(500).json({
            status:false,
            message:err
        })
    })
})

router.put('/updateShoppingList/:id',async (request,response) => {
    const sListId = request.params.id;

    const items = request.body;
    const itemId = mongoose.Types.ObjectId();

    console.log(items.name)

    const shoppingList = await ShoppingList.findById(sListId);

    const newItem = {
        _id:itemId,
        name:items.name
    }

    let item = shoppingList.Items;

    item.push(newItem)
    shoppingList.save()
    .then(results => {
        return response.status(200).json({
            status:true,
            message:results
        })
    })
    .catch(err => {
        return response.status(500).json({
            status:false,
            message:err
        })
    })
})

//     const ListId = request.params.listId;
//     const itemId = request.params.itemID;

//     ShoppingList.findById(ListId).findById(itemId)
//     .then(results => {
//         response.send(results)
//     })
//     .catch(err => {
//         return response.status(500).json({
//             status:false,
//             message:err
//         })
//     })
// })

// remove item from list

// delete one item from specific list
router.delete('/deleteItemFromList/:listId/:itemId',async(request,response) => {
    const listID = request.params.listId;
    const itemID = request.params.itemId;

    try {
        ShoppingList.findOneAndUpdate(
            {_id:listID},
            {
                $pull: { 'Items' : { _id : itemID } }
            }, function(err,model){
                if(err) {
                    return response.status(500).json({
                        status:false,
                        message:err
                    })
                } else {
                    return response.status(200).json({
                        status:true,
                        message:model
                    })
                }
            }
        )
    } catch (error) {
        return response.status(500).json({
            status:false,
            message:error
        })
    }
})

router.get('/getItems/:listId', async(request,response) => {
    const listId = request.params.listId;

    ShoppingList.findById(listId)
    .then(results => {
        return response.status(200).json({
            status:true,
            message:results
        })

    })
    .catch(err => {
        return response.status(500).json({
            status:false,
            message:err
        })
    })
})



export default router;
