const express=require("express")
const cors=require("cors")
const { connectDb } = require("./db")
const authRouter=require("./routes/auth.route")
const userRouter=require("./routes/user.route")


const app=express()


app.use(cors()) // can filter which websites can access
app.use(express.json())
const port=process.env.PORT || 5000


//handelling requests
app.get("/",(req,res)=>{
    res.status(200).send("Hello world")
})

app.use("/auth",authRouter);
app.use("/api/users",userRouter)

const productRouter= require("./routes/product.routes")
app.use("/api/products",productRouter)

const adminProductRouter=require("./routes/adminProduct.routes")
app.use("/api/admin/products",adminProductRouter)

const cartRouter=require("./routes/cart.routes")
app.use("/api/cart", cartRouter)

const cartItemRouter= require("./routes/cartItem.routes")
app.use("/api/cart_items",cartItemRouter)

const orderRouter=require("./routes/order.routes")
app.use("/api/orders",orderRouter)

const reviewRouter= require("./routes/review.routes")
app.use("/api/reviews", reviewRouter)

const ratingRouter=require("./routes/rating.routes")
app.use("/api/rating", ratingRouter)

const adminOrderRouter= require("./routes/adminOrder.routes")
app.use("/api/admin/orders", adminOrderRouter)

const imagesRouter= require("./routes/images.routes")
app.use("/image", imagesRouter)

app.listen(port,async ()=>{
    // await connectDb();
    console.log("Server listening on port "+port)
})