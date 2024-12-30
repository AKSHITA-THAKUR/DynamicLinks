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
    console.log("Dispatching fetchProducts");
    dispatch(fetchProducts());
  }, []);
  if (!data || data.length === 0) {
    return <Text>No products available.</Text>;
  }
  return (
    <View className="flex-1 p-4">
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 15,
          backgroundColor: "#333",
        }}
      >
        <Text style={{ fontSize: 20, color: "#fff" }}>
          Akshita Thakur Store
        </Text>
        <Pressable
          onPress={() => router.push("/Cart")}
          style={{ padding: 10, backgroundColor: "#4CAF50", borderRadius: 5 }}
        >
          <Text style={{ color: "#fff" }}>Cart ({cart.length})</Text>
        </Pressable>
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
