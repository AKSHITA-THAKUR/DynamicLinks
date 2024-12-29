import { View, Text , FlatList } from "react-native";
import React from "react";
import CartCard from "@/components/CartCard";
import { useSelector, UseSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Cart = () => {
    const cartProducts = useSelector((state:RootState)=> state.products.cart)
    
  return (
    <View className="flex-1 align-top">
      <View className="items-center justify-center bg-pink-700 h-16 rounded-lg mb-4 flex-row gap-4">
              <Text className="text-2xl text-white font-bold">Your Cart</Text>
            </View>
           {cartProducts.length<=0 && <Text>Your Cart is Empty</Text>}
           <FlatList data={cartProducts} renderItem={({item})=>(<CartCard item={item}/>)}/>
    </View>
  );
};

export default Cart;