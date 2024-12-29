import { View, Text, Image , Pressable } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { removeFromCart , increaseQunatity,decreaseQuantity } from "@/redux/productSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import React from "react";

const CartCard = ({ item }: { item: any }) => {
    const dispatch:AppDispatch = useDispatch();
  return (
    <View className="flex-row items-center bg-gray-100  p-3 mb-3 ">
      <Image
        source={{ uri: item.thumbnail }}
        className="w-24 h-24 rounded-lg mr-3"
        resizeMode="contain"
      />

      <View className="flex-1">
        <Text className="text-lg font-semibold">{item.title}</Text>
        <Text className="text-green-500 text-sm">Rs. {item.price}</Text>
        <Text className="text-gray-500 text-xs mb-2" numberOfLines={2}>
          {item.description}
        </Text>

        <View className="flex-row items-center space-x-4">
          <Pressable onPress={()=>dispatch(decreaseQuantity(item.id))} className="p-2">
            <Ionicons name="remove-circle-outline" size={24} color="gray" />
          </Pressable>
          <Text className="text-lg font-bold">{item.quantity}</Text>
          <Pressable onPress={()=>dispatch(increaseQunatity(item.id))} className="p-2">
            <Ionicons name="add-circle-outline" size={24} color="gray" />
          </Pressable>
        </View>
      </View>

   
      <Pressable  onPress={()=> dispatch(removeFromCart(item.id))} className="bg-red-500 p-2 rounded-lg">
        <Ionicons name="trash" size={20} color="white" />
      </Pressable>
    </View>
  );
};

export default CartCard;