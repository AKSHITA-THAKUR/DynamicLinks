import React, { useState } from 'react';
import { View, Text, Image, Pressable, Modal, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from '@/redux/productSlice';
import { AppDispatch, RootState } from "@/redux/store";

const Card = ({ item }: { item: any }) => {
    const dispatch: AppDispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.products.cart);
    const [modalVisible, setModalVisible] = useState(false);



    return (
        <View className="flex-1 bg-white rounded-lg m-2 p-3 shadow">
            {/* Product Image */}
            <Image
                source={{ uri: item.thumbnail }}
                className="w-full h-32 rounded-lg"
                resizeMode="contain"
            />
            
            {/* Product Title */}
            <Text className="text-lg font-bold mt-2">{item.title}</Text>
            
            {/* Product Price */}
            <Text className="text-green-600 font-semibold">Rs.{item.price}</Text>
            
            {/* Product Description */}
            <Text className="text-sm text-gray-600" numberOfLines={2}>
                {item.description}
            </Text>
            
            {/* Add to Cart Button */}
            <Pressable
                onPress={() => dispatch(addToCart(item.id))}
                className='p-3 mt-4 bg-sky-400 rounded-lg'>
                <Text style={{ alignSelf: "center" }}>Add to Cart</Text>
            </Pressable>
            
            {/* View Details Button */}
            <Pressable
                onPress={() => setModalVisible(true)}
                className='p-3 mt-4 bg-gray-400 rounded-lg'>
                <Text style={{ alignSelf: "center" }}>View Details</Text>
            </Pressable>

            {/* Modal for Product Details */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {/* Small Round Close Button */}
                        <Pressable
                            style={styles.roundCloseButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.roundCloseButtonText}>×</Text>
                        </Pressable>

                        {/* Modal Content */}
                        <ScrollView>
                            <Image
                                source={{ uri: item.thumbnail }}
                                style={styles.modalImage}
                                resizeMode="contain"
                            />
                            <Text style={styles.modalTitle}>{item.title}</Text>
                            <Text style={styles.modalPrice}>Rs.{item.price}</Text>
                            <Text style={styles.modalDescription}>{item.description}</Text>
                            
                            <Pressable
                                style={styles.shareButton}>
                                <Text style={{ color: "white", textAlign: "center" }}>Share Product</Text>
                            </Pressable>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
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
});


