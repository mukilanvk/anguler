import { productModal } from "../modals/productModal.js";

export class ProductController {
  async productIndex(req, res) {
    try {
      const products = await productModal.find();
      res.json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async productStore(req, res) {
    
    try {
      const event = req.body;
      const productImage = req.files?.map(file => file.path) || [];
        const newOrderData = {
          ...event,
          productImage,
        };
      const newProduct = new productModal(newOrderData);
      const savedProduct = await newProduct.save();
      console.log(savedProduct);
      res.json({ status: true, result: savedProduct });
    } catch (err) {
      res.send({ status: false, message: "Product already exists with this name or code" });
    }
  }


  async productEdit(req,res){
    const{id} = req.params;
    const data = req.body;
    try{
      const productImage = req.files?.map(file => file.path) || [];
      const newOrderData = {
        ...data,
        productImage,
      };
      const updatedProduct = await productModal.findByIdAndUpdate(id,newOrderData,{new:true});
        if (!updatedProduct) {
          return res.send({ status: false, message: "No product found" });
        }
        res.json({ status: true, message:"product Updated Successfully" });
      } catch (err) {
        res.send({ status: false, message: err.message });
      }
  }

  async productDelete(req,res){
    const { id } = req.params;
    try{
      const deleteProduct = await productModal.findByIdAndDelete(id,{new:true});
        if (!deleteProduct) {
          return res.send({ status: false, message: "No product found" });
        }
        res.json({ status: true, result: deleteProduct, message:"product Deleted Successfully" });
      } catch (err) {
        res.send({ status: false, message: err.message });
      }
  
  }

 
}
