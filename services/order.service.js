const cartService=require("./cart.service")
const Address=require("../model/address.model")
const OrderItem=require("../model/orderItems.model")
const Order=require("../model/order.model")

async function createOrder(user,shippAddress){
    let address;
    if(shippAddress._id){
        let existAddress= await Address.findById(shippAddress._id);
        address=existAddress;
    }else{
        address= new Address(shippAddress);
        address.user=user;
        await address.save();

        user.address.push(address)
        await user.save()
    }

    const cart=await  cartService.findUserCart(user._id);
    const orderItems=[];

    for(const item of cart.cartIems){
        const orderItem= new OrderItem({
            price: item.price,
            product: item.product,
            quantity: otem.quantity,
            size: item.size,
            userd: item.userId,
            discountedPrice: item.discountedPrice,
        })
        const createdOrderItem= await orderItem.save()
        orderItems.push(createdOrderItem)
    }
    const createdOrder=new Order({
        user,
        orderItems,
        totalPrice: cart.totalPrice,
        totalDiscountedPrice: cart.totalDiscountedPrice,
        discounte:cart.discounte,
        totalItem: cart.totalItem,
        shippingAddress: address,  
    })

    const saveOrder=await createdOrder.save();

    return saveOrder;
}

async function placeOrder(orderId){
    try{
        const order=await findOrderById(orderId);
        if(order){
            order.orderStatus="PLACED";
            order.paymentDetails.status="COMPLETED";

            return await order.save()
        }
    }catch(error){
        throw new Error(error.message)
    }
}
async function confirmedOrder(orderId){
    try{
        const order=await findOrderById(orderId);
        if(order){
            order.orderStatus="CONFIRMED";
            return await order.save()
        }
    }catch(error){
        throw new Error(error.message)
    }
}
async function shipOrder(orderId){
    try{
        const order=await findOrderById(orderId);
        if(order){
            order.orderStatus="SHIPPED";
            return await order.save()
        }
    }catch(error){
        throw new Error(error.message)
    }
}
async function deliverOrder(orderId){
    try{
        const order=await findOrderById(orderId);
        if(order){
            order.orderStatus="DELIVERED";
            return await order.save()
        }
    }catch(error){
        throw new Error(error.message)
    }
}
async function cancelOrder(orderId){
    try{
        const order=await findOrderById(orderId);
        if(order){
            order.orderStatus="CANCELLED";
            return await order.save()
        }
    }catch(error){
        throw new Error(error.message)
    }
}

async function findOrderById(orderId){
    try{
        const order= await Order.findById(orderId).populate("user").populate({
            path:"orderItems", populate:{path:'product'}
        }).populate("shippingAddress")

        return order;
        
    }catch(error){
        throw new Error(error.message)
    }
}

async function usersOrderHistory(userId){
    try{
        const orders=await Order.find({user:userId, orderStatus:"PLACED"}).populate({path:'orderItems', populate:{path:'product'}}).lean()
        return orders;
    }catch(error){
        throw new Error(error.message)
    }
}

async function getAllOrders(){
    try{
        const orders=await Order.find({}).populate({path:'orderItems', populate:{path:'product'}}).lean()
        return orders;
    }catch(error){
        throw new Error(error.message)
    }
}

async function deleteOrder(orderId){
    try{
        const order= await findOrderById(orderId)
        await Order.findByIdAndDelete(order._id)
    }catch(error){
        throw new Error(error.message)
    }
}

module.exports={
    createOrder, placeOrder,confirmedOrder,shipOrder,deliverOrder,cancelOrder,usersOrderHistory, getAllOrders, deleteOrder
}