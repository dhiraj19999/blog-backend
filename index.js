
const express = require("express");
const { connect } = require("./config/db");
const app = express();
const cors = require("cors");
const { adminRouter}=require("./routes/Admin.route")
const {AuthorRouter}=require("./routes/Author.route")

const{ productRouter}=require("./routes/blog.route")

const { authenticate } = require("./middelware/auth.middelware");
const { readerRouter}=require('./routes/reader')
require("dotenv").config();
app.use(
    express.static("public", {
      index: false,
      redirect: false,
      setHeaders: (res, path, stat) => {
        res.set(
          "Content-Security-Policy",
          "default-src 'self'; img-src 'self' https:"
        );
      },
    })
  );
  app.use(
    cors({
      origin: "*",
    })
  );

  app.get("/", (req, res) => {
    res.send("This is the Home Page ");
  });


  app.use(express.json());
app.use('/reader',readerRouter)
app.use("/blogs",authenticate, productRouter);

app.use("/author",  AuthorRouter);
app.use("/admin",  adminRouter);

require("dotenv").config();
app.listen(process.env.port, async () => {
    try {
      await connect;
      console.log("connected to db");
    } catch (error) {
      console.log(error);
    }
    console.log(process.env.port);
  });