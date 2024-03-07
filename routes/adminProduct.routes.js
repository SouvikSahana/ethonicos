const express=require("express")
const router=express.Router()
const authenticate=require("../middleware/authenticate")

const productController=require("../controller/product.controller")

router.post("/",authenticate, productController.createProduct)
router.post("/creates",authenticate,productController.createMultiplePrducts)
router.delete("/:id", authenticate,productController.deleteProduct)
router.put("/:id",authenticate, productController.updateProduct)

module.exports= router;