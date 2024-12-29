import { Pressable, Text, View, FlatList, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Card from "@/components/Card";
import { useEffect } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchProducts } from "@/redux/productSlice";
import { useRouter } from "expo-router";

export default function Index() {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const data = useSelector((state: RootState) => state.products.products);
  const cart = useSelector((state: RootState) => state.products.cart);
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <View className="flex-1 p-4">
      <View className="items-center justify-center bg-gray-700 h-16 rounded-lg mb-4 flex-row gap-4">
        <Text className="text-2xl text-white font-bold">My Shopping Hall</Text>
        <Pressable onPress={()=> router.push("/Cart")} className="p-2 bg-blue-300"><Text>Cart {cart.length}</Text></Pressable>
      </View>
      <FlatList
        data={data}
        numColumns={2}
        renderItem={({ item }) => <Card item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 10 }}
      />
    </View>
  );
}