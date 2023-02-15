const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const Category = require('../models/Category')




router.post('/addcategory', async (req, res) => {

    const { categoryName } = req.body

    if (!categoryName) {
        return res.status(422).send({ error: "Must provide category Name" })
    }

    const category = await Category.findOne({ categoryName })
    if (category) {
        return res.status(422).send({ error: "This category is already exits" })
    }
    try {
        const newCategory = new Category({ categoryName })
        await newCategory.save()
        res.status(200).send({ success: true, message: 'Category Added successfully', Category: newCategory })
    } catch (error) {
        return res.status(422).send({ error: "server error" })

    }

})



router.post('/updatecategory/:id', async (req, res) => {


    const { categoryName } = req.body
    const { id } = req.params

    Category.findByIdAndUpdate(id, { categoryName }, (err, docs) => {
        if (err) {
            return res.status(422).send({ error: err })
        } else {
            res.status(200).send({ success: true, message: "Category updated successfully", Category: categoryName })
        }
    })
})

router.delete('/deletecategory/:id', async (req, res) => {
    
    const { id } = req.params

    Category.findByIdAndDelete(id, (err, docs) => {
        if (err) {
            return res.status(422).send({ error: err })
        } else {
            res.status(200).send({ success: true, message: "Category delete successfully", })

        }
    })
})




module.exports = router