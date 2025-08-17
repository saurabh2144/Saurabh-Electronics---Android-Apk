import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, Alert } from "react-native";

export default function CartPage({ navigation, route }) {
  const [cartItems, setCartItems] = useState([]);
  const { userId } = route.params;

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await fetch(`https://backend-8hlu.onrender.com/getCart/${userId}`);
      const data = await response.json();
      if (!data || data.length === 0) {
        Alert.alert("No items is available in your cart");
      }
      setCartItems(data);
    } catch (err) {
      console.error("Error fetching cart items:", err);
    }
  };

  const removeFromCart = async (cartId) => {
    try {
      await fetch(`https://backend-8hlu.onrender.com/removeFromCart/${cartId}`, {
        method: "DELETE",
      });
      Alert.alert("Item removed");
      fetchCartItems(); // Refresh cart
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };


  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, backgroundColor: "#f4f4f4", marginTop: 60 },
    card: {
      flexDirection: "row",
      backgroundColor: "white",
      borderRadius: 10,
      padding: 10,
      marginVertical: 5,
      alignItems: "center",
      elevation: 3,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
    },
    image: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
    info: { flex: 1 },
    title: { fontWeight: "bold", fontSize: 14 },
    price: { color: "#007BFF", fontWeight: "bold", marginTop: 5 },
    removeButton: { backgroundColor: "red", padding: 5, borderRadius: 5 },
    buttonText: { color: "white", fontSize: 12, textAlign: "center" },
    footer: {
      marginTop: 15,
      padding: 15,
      backgroundColor: "white",
      borderRadius: 10,
      elevation: 3,
    },
    totalText: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 10,
      textAlign: "center",
    },
    buyButton: {
      backgroundColor: "#28a745",
      paddingVertical: 12,
      borderRadius: 8,
    },
    buyText: {
      color: "white",
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 16,
    },
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.cartId.toString()} 
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              style={styles.image}
              source={{ uri: item.images[0] }}
            />
            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>₹{item.price}</Text>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeFromCart(item.cartId)} 
            >
              <Text style={styles.buttonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

    
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total Amount: ₹{totalAmount}</Text>
        <TouchableOpacity
          style={styles.buyButton}
          onPress={() => Alert.alert("Proceeding to Checkout...")}
        >
          <Text style={styles.buyText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
