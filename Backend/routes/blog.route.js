const express = require("express");
const {BlogModel}=require('../model/blogmodel');
const productRouter = express.Router();



productRouter.get("/getby", async (req, res) => {
    console.log(req.body);
    try {
      const cart = await BlogModel.find({ authorID: req.body.authorID });
      res.status(201).send({ data: cart, status: "Success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong", status: "Failed" });
    }
  });





productRouter.get("/get", async (req, res) => {
    const limit = req.query.limit || 10;
    const page = Math.max(0, req.query.page || 0);
    const sort = req.query.sortBy;
    let q = req.query.q;
    try {
      if (q && sort) {
        // search functionality
        let a;
        if (sort == "asc") {
          a = 1;
        } else if (sort == "desc") {
          a = -1;
        }
        const product = await BlogModel.find({
          Title: { $regex: q, $options: "$i" },
        })
          .limit(limit)
          .skip(limit * page)
          .sort({ category: a });
        res.status(201).json({ data: product, status: "Success" });
        return;
      } else if (q) {
        const product = await BlogModel.find({
         Title: { $regex: q, $options: "$i" },
        })
          .limit(limit)
          .skip(limit * page);
        res.status(201).json({ data: product, status: "Success" });
        return;
      }
      const product = await BlogModel.find()
        .limit(limit)
        .skip(limit * page);
      res.status(201).json({ data: product, status: "Success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong", status: "Failed" });
    }
  });



  productRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const product = await BlogModel.find({uniq_id:id });
      
      res.status(201).json({ data: product, status: "Success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong", status: "Failed" });
    }
  });


  productRouter.post("/add", async (req, res) => {
    try {
      const product = new BlogModel(req.body);
      product.save();
      res
        .status(201)
        .json({ message: "Product added successfully", status: "Success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong", status: "Failed" });
    }
  });




  productRouter.patch("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const product = await BlogModel.findByIdAndUpdate({ _id: id }, req.body);
      res
        .status(201)
        .json({ message: "Data update successfully", status: "Success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong", status: "Failed" });
    }
  });

  

  productRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const product = await BlogModel.findByIdAndDelete({ _id: id });
      res
        .status(201)
        .json({ message: "Data delete successfully", status: "Success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong", status: "Failed" });
    }
  });
  
  module.exports = {
    productRouter,
  };