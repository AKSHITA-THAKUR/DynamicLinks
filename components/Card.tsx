import React, { useState } from 'react';
import { View, Text, Image, Pressable,  StyleSheet, ScrollView, Share } from 'react-native'; // Added Clipboard import
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'expo-router';
import { addToCart } from '@/redux/productSlice';
import { AppDispatch, RootState } from "@/redux/store";

const Card = ({ item }: { item: any }) => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  return (
    <View className="flex-1 bg-white rounded-lg m-2 p-3 shadow">
      {/* Product Image */}
      <Image
        source={{ uri: item.thumbnail }}
        className="w-full h-32 rounded-lg"
        resizeMode="contain"
      />
      
      <Text className="text-lg font-bold mt-2">{item.title}</Text>
      
      <Text className="text-green-600 font-semibold">Rs.{item.price}</Text>
      
      <Text className="text-sm text-gray-600" numberOfLines={2}>
        {item.description}
      </Text>
      
      <Pressable
        onPress={() => dispatch(addToCart(item.id))}
        className='p-3 mt-4 bg-sky-400 rounded-lg'>
        <Text style={{ alignSelf: "center" }}>Add to Cart</Text>
      </Pressable>
      
      <Pressable
            onPress={() => router.push({
              pathname: '/product-details',
              params: { item: JSON.stringify(item) }, 
            })}
            className="bg-blue-500 rounded-lg mt-4 p-3"
          >
            <Text className="text-white text-center">View Details</Text>
          </Pressable>


    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    position: "relative",
  },
  modalImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  modalPrice: {
    fontSize: 18,
    color: "green",
    fontWeight: "600",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
  roundCloseButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "white",
    borderRadius: 50,
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  roundCloseButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  shareButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  generatedLinkText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  linkText: {
    fontSize: 14,
    color: 'blue',
    marginBottom: 10,
  },
  copyButton: {
    backgroundColor: 'green',
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
  },
});
