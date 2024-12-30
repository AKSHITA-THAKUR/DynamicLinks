import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Share,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchProducts } from "@/redux/productSlice";
import * as Linking from "expo-linking";

const ProductDetails = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const [found, setFound] = useState<any>(null); // Allow object or null
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const { item, id, name } = useLocalSearchParams();

  console.log("The name of the product is ", name);

  const productList = useSelector(
    (state: RootState) => state.products.products
  );

  // Product derivation logic
  const product = item
    ? JSON.parse(item as string)
    : id && name
    ? found
    : null;

  const shareLink = async () => {
    const url = Linking.createURL("/product-details", {
      queryParams: { id: product.id, name: product.title },
    });

    try {
      await Share.share({
        message: `Check out this product: ${product.title}\n\n${url}`,
        title: "Share Product Link",
      });
    } catch (error) {
      console.error("Error sharing link:", error);
    }
  };

  useEffect(() => {
    const fetchMatchedProduct = async () => {
      setIsLoading(true); // Show loader during fetch
      await dispatch(fetchProducts());
      const foundProduct = productList.find(
        (product) => product.title === name
      );
      if (foundProduct) {
        setFound(foundProduct); 
        setIsLoading(false);// Update the found product
      }
 // Hide loader after fetch
    };

    if (id && name) {
      fetchMatchedProduct();
    } else {
      setIsLoading(false); // Hide loader if no id or name
    }
  }, [id, name]); // Remove `product` from dependencies

  console.log("The product you are finding is ", found);

  // Show loader if loading
  if (isLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {product.thumbnail ? (
        <Image
          source={{ uri: product.thumbnail }}
          style={styles.image}
          resizeMode="contain"
          onError={(e) =>
            console.error("Image load error:", e.nativeEvent.error)
          }
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>No Image Available</Text>
        </View>
      )}
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>Rs.{product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Pressable onPress={shareLink} style={styles.button}>
        <Text style={styles.buttonText}>Share Product</Text>
      </Pressable>
      <Pressable onPress={() => router.back()} style={[styles.button]}>
        <Text style={styles.buttonText}>Go back</Text>
      </Pressable>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
  },
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  image: {
    width: "100%",
    height: 256,
    borderRadius: 8,
    backgroundColor: "#E5E7EB",
  },
  imagePlaceholder: {
    width: "100%",
    height: 256,
    borderRadius: 8,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#9CA3AF",
    fontSize: 14,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
    color: "#111827",
  },
  price: {
    fontSize: 18,
    color: "#10B981",
    fontWeight: "600",
    marginTop: 8,
  },
  description: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 16,
  },
  button: {
    backgroundColor: "#3B82F6",
    borderRadius: 8,
    padding: 12,
    marginTop: 24,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
