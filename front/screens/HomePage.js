import React, { useState, useEffect } from "react";
import { StyleSheet, Image, View, Text, FlatList, TextInput, TouchableOpacity, Alert } from "react-native";
import Header from "./header";

export default function HomePage({ navigation, route }) {
const [items, setItems] = useState([]);
const [searchText, setSearchText] = useState("");
const { userId } = route.params;
console.log("HomePage me userId mila:", userId);

useEffect(() => {
if (!userId) console.log(" Warning: userId undefined hai!");
fetchItems();
}, []);

const fetchItems = async () => {
try {
const response = await fetch("https://backend-8hlu.onrender.com/items");
const data = await response.json();
setItems(data);
} catch (e) {
console.error("Error fetching items:", e);
}
};

const searchByName = async () => {
if (!searchText.trim()) {
fetchItems();
return;
}
try {
const res = await fetch(`https://backend-8hlu.onrender.com/items/search?name=${searchText}`);
const data = await res.json();
setItems(data);
} catch (err) {
console.error(err);
}
};

const addCart = async (item) => {
try {
const resp = await fetch("https://backend-8hlu.onrender.com/addToCart", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ userId, id: item.id }),
});
const result = await resp.json();
if (!resp.ok) {
Alert.alert("Error", result.error);
return;
}
Alert.alert("Success", result.message);
} catch (err) {
console.error("Error adding to cart:", err);
}
};

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: "#f4f4f4",
padding: 10,
paddingTop:45
},
searchContainer: {
flexDirection: "row",
marginBottom: 15,
alignItems: "center",
justifyContent: "space-between"
},
searchInput: {
flex: 1,
borderWidth: 1,
borderColor: "#f38282ff",
padding: 8,
borderRadius: 5,
marginRight: 5,
backgroundColor: "white"
},
cardWrapper: {
flex: 1,
margin: 5,
maxWidth: '48%',
},
card: {
flex: 1,
backgroundColor: "white",
borderRadius: 12,
padding: 10,
alignItems: "center",
justifyContent: "space-between",  
height: 270,
shadowColor: "#000",
shadowOpacity: 0.1,
shadowRadius: 6,
shadowOffset: { width: 0, height: 3 },
elevation: 4,
},
profileImage: {
width: '100%',
height: 120,
borderRadius: 8,
marginBottom: 8,
},
nameText: {
fontWeight: "bold",
fontSize: 14,
textAlign: "center",
},
descriptionText: {
fontSize: 12,
textAlign: "center",
color: "#555",
minHeight: 30,
},
priceText: {
fontSize: 13,
fontWeight: "bold",
color: "#007BFF",
},
customButton: {
backgroundColor: "#14569bff",
paddingVertical: 6,
paddingHorizontal: 12,
borderRadius: 5,
alignSelf: "stretch",
marginTop: 5,
},
buttonText: {
color: "white",
fontSize: 12,
fontWeight: "bold",
textAlign: "center"
},
customButtonNav: {
backgroundColor: "#070707ff",
paddingVertical: 8,
paddingHorizontal: 12,
borderRadius: 5,
marginLeft: 5
},
});

return (
<View style={styles.container}>
<Header navigation={navigation} userId={userId} />
<View style={styles.searchContainer}>
<TextInput
placeholder="Search by Name"
value={searchText}
onChangeText={setSearchText}
style={styles.searchInput}
/>
<TouchableOpacity style={styles.customButtonNav} onPress={searchByName}>
<Text style={styles.buttonText}>SEARCH</Text>
</TouchableOpacity>
</View>
<FlatList
data={items}
keyExtractor={(item) => item.id.toString()}
numColumns={2}
renderItem={({ item }) => (
<View style={styles.cardWrapper}>
<TouchableOpacity
style={styles.card}
onPress={() => navigation.navigate('OpenItem', { item })}
activeOpacity={0.8}
>
<Image
style={styles.profileImage}
source={{ uri: item.images[0] }}
/>
<Text style={styles.nameText}>{item.title}</Text>
<Text style={styles.descriptionText} numberOfLines={2} ellipsizeMode="tail">
{item.shortDescription}
</Text>
<Text style={styles.priceText}>₹{item.price}</Text>
<TouchableOpacity
style={styles.customButton}
onPress={() => addCart(item)}
>
<Text style={styles.buttonText}>Add To Cart</Text>
</TouchableOpacity>
</TouchableOpacity>
</View>
)}
/>
</View>
);
}
