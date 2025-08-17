import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const Header = ({ navigation ,userId}) => {

    console.log(`your id whichh  is getting from home is `+userId);
   
  return (
    <View style={styles.header}>
      <Text style={styles.title}>SAURABH ELECTRONICS</Text>
      <TouchableOpacity style={styles.customButtonNav} onPress={() => navigation.navigate('CartPage' ,{userId})}>
        <Text style={styles.buttonText}>MyCart</Text>
        <Image 
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/1170/1170678.png" }} 
          style={styles.icon} 
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  customButtonNav: {
    backgroundColor: "#070707ff",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonText: { 
    color: "white", 
    fontSize: 12, 
    fontWeight: "bold" 
  },
  icon: {
    height: 20,
    width: 20,
    marginLeft: 6,
    tintColor: 'white' 
  }
})

export default Header
