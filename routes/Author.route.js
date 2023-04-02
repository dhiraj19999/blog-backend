const express = require("express");
const AuthorRouter = express();
const bcrypt = require("bcrypt");
const {  AuthorModel } =  require("../model/Author")
const jwt = require("jsonwebtoken");





AuthorRouter.post("/register", async (req, res) => {
    const { firstName, lastName, email, password, gender, mobile } = req.body;
    const newuser = await  AuthorModel.find({ email });
    if (newuser.length != 0) {
      res.status(500).json({
        message: "This admin is already signup ,Please login",
        status: "Failed",
      });
      return;
    }
    try {
      bcrypt.hash(password, 6, async (err, hash_pass) => {
        if (err) {
          console.log(err);
          res
            .status(500)
            .json({ message: "Something went wrong", status: "Failed" });
        } else {
          const admin = new  AuthorModel({
            firstName,
            lastName,
            email,
            password: hash_pass,
            gender,
            mobile,
          });
          await admin.save();
          res
            .status(201)
            .json({ message: "Admin register successfully", status: "Success" });
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message, status: "Failed" });
    }
  });
  

  AuthorRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await  AuthorModel.find({ email });
      if (user.length > 0) {
        bcrypt.compare(password, user[0].password, async (err, result) => {
          if (!result) {
            console.log(err);
            return res
              .status(500)
              .json({ message: "Wrong Password", status: "Failed" });
          } else {
            let token = jwt.sign({ userID: user[0]._id }, "flopkart");
            res.status(201).json({
              message: "admin login successfully",
              status: "Success",
              token,
              data: user[0],
            });
          }
        });
      } else {
        return res
          .status(500)
          .json({ message: "Please Signup  first", status: "Failed" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message, status: "Failed" });
    }
  });
  
  // get all the users
  
  
 
  
  /*userRouter.get("/all-admin", async (req, res) => {
    try {
      const users = await UserModel.find();
      res.status(201).json({
        status: "Success",
        data: users,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Something went wrong", status: "Failed" });
    }
  });
  
  
  userRouter.get("/all-admin/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const users = await UserModel.find({ _id: id });
      res.status(201).json({
        status: "Success",
        data: users,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Something went wrong", status: "Failed" });
    }
  });
  
  /**
   * @swagger
   * /user/delete/{id}:
   *    delete:
   *      summary: To delete an existing user
   *      tags: [User]
   *      parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Numeric ID of the user to retrieve.
   *         schema:
   *           type: integer
   *      responses:
   *        200:
   *          description: The user was successfully deleted
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: string
   *                  status:
   *                    type: string
   *                    description: Success
   *        500:
   *          description: Something went wrong
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: string
   *                    description: User register successfully
   *                  status:
   *                    type: string
   *                    description: Failed
   */
  
  /*userRouter.delete("/admin/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const users = await UserModel.findByIdAndDelete({ _id: id });
      res.status(201).json({
        status: "Success",
        message: "User delted Successfully",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Something went wrong", status: "Failed" });
    }
  });
  
  /**
   * @swagger
   * /user/update/{id}:
   *    patch:
   *      summary: To update the details of an existing user
   *      tags: [User]
   *      parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Numeric ID of the user to retrieve.
   *         schema:
   *           type: integer
   *      requestBody:
   *        required: false
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/User'
   *      responses:
   *        200:
   *          description: The user details updated successfully
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: string
   *                    description: User register successfully
   *                  status:
   *                    type: string
   *                    description: Success
   *        500:
   *          description: Something went wrong
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: string
   *                    description: User register successfully
   *                  status:
   *                    type: string
   *                    description: Failed
   */
  
 /* userRouter.patch("/admin/update/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const users = await UserModel.findByIdAndUpdate({ _id: id }, req.body);
      res.status(201).json({
        status: "Success",
        message: "User data updated Successfully",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Something went wrong", status: "Failed" });
    }
  });*/
  module.exports = {
  AuthorRouter,
  };