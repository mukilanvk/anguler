import { orderModal } from "../modals/orderModal.js";
import { productModal } from "../modals/productModal.js";

export class orderController {

  async orderIndex(req, res) {
    try {
        const order = await orderModal.find();
        const ordersWithProductDetails = await Promise.all(
          order.map(async (orderCount) => {
          const productDetails = await Promise.all(
            orderCount.products.map(async (item) => {
              const product = await productModal.findById(item.productId);
              return {
                productId: item.productId,
                name: product?.Name || "Product not found",
                price: product?.price || 0,
                productImage: product?.productImage || "no image found",
                quantity: item.quantity,
              };
            })
          );
  
        return {
          ...orderCount.toObject(),
          products: productDetails,
        };
      })
    );
        res.json({ status: true, result: ordersWithProductDetails });
      } catch (error) {
        res.status(500).json({ status: false, message: "Failed to fetch order with product details", error: error.message});
      }
    };


  
  async orderStore(req, res) {
    const event = req.body;
    try {
      const productCount = event.products.reduce((total,item) => {
        return total +(item.quantity || 0);
      },0 );
      const newOrderData ={
        ...event,
        productCount,
      };
      const newProduct = new orderModal(newOrderData);
      const savedProduct = await newProduct.save();
      res.json({ status: true, result: savedProduct });
    } catch (err) {
      res.send({ status: false, message: "order not placed" });
    }
  }


  async orderEdit(req,res){
    const{id} = req.params;
    const data = req.body;
    try{
      const productCount = data.products.reduce((total,item) => {
        return total +(item.quantity || 0);
      },0 );
      const OrderData ={
        ...data,
        productCount,
      };
      const updatedProduct = await orderModal.findByIdAndUpdate(id,OrderData,{new:true});
        if (!updatedProduct) {
          return res.send({ status: false, message: "No order found" });
        }
        res.json({ status: true, message:"order Updated Successfully" });
      } catch (err) {
        res.send({ status: false, message: err.message });
      }
  }


  async orderDelete(req,res){
    const { id } = req.params;
    try{
      const deleteProduct = await orderModal.findByIdAndDelete(id,{new:true});
        if (!deleteProduct) {
          return res.send({ status: false, message: "No order found" });
        }
        res.json({ status: true, result: deleteProduct, message:"order Deleted Successfully" });
      } catch (err) {
        res.send({ status: false, message: err.message });
      }
  
  }

 
}
