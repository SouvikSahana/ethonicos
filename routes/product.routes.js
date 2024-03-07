const express=require("express")
const router=express.Router()
const authenticate=require("../middleware/authenticate")

const productController=require("../controller/product.controller")

router.get("/",productController.getAllProducts)
router.get("/id/:id", productController.findProductById)
//require authentication
router.post("/create",productController.createProduct)
router.get("/category",productController.getCategories)
//require authentication
router.delete("/id/:id",productController.deleteProduct)
//require authectication
router.put("/id/:id",productController.updateProduct)
module.exports=router;