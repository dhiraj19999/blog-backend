const express = require("express");
const {BlogModel}=require('../model/blogmodel');
const BlogsRouter = express.Router();









BlogsRouter.get("/get", async (req, res) => {
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


 
  BlogsRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const product = await BlogModel.find({uniq_id:id });
      
      res.status(201).json({ data: product, status: "Success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong", status: "Failed" });
    }
  });


  module.exports = {
    BlogsRouter,
  };
