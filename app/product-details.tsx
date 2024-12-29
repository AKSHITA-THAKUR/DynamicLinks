import React, { useEffect } from 'react';
import { View, Text, Image, Pressable, StyleSheet, Share } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Linking from 'expo-linking';
import { RootState } from '@/redux/store';
const ProductDetails = () => {
  const router = useRouter();
  const { item, id, name } = useLocalSearchParams();

  const product = item
    ? JSON.parse(item as string) // Parse item if it exists
    : id && name
    ? { id, title: name, thumbnail: null, price: null, description: null } // Create a fallback product object
    : null;

  const shareLink = async () => {
    const url = Linking.createURL('/product-details', {
      queryParams: { id: product.id, name: product.title },
    });

    try {
      await Share.share({
        message: `Check out this product: ${product.title}\n\n${url}`,
        title: 'Share Product Link',
      });
    } catch (error) {
      console.error('Error sharing link:', error);
    }
  };

  useEffect(() => {
    if (id && name) {
      console.log(`Product ID: ${id}, Product Name: ${name}`);
    }
  }, [id, name]);

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
          onError={(e) => console.error('Image load error:', e.nativeEvent.error)}
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>No Image Available</Text>
        </View>
      )}
      <Text style={styles.title}>{product.title}</Text>
      {product.price && <Text style={styles.price}>Rs.{product.price}</Text>}
      {product.description && <Text style={styles.description}>{product.description}</Text>}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: 256,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
  },
  imagePlaceholder: {
    width: '100%',
    height: 256,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#111827',
  },
  price: {
    fontSize: 18,
    color: '#10B981',
    fontWeight: '600',
    marginTop: 8,
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 16,
  },
  button: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    padding: 12,
    marginTop: 24,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
