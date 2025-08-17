import { View, ScrollView, Image, StyleSheet, Text, FlatList } from 'react-native';
import React from 'react';
import Header from './header';
const OpenItem = ({ route }) => {
  const { item } = route.params;
  console.log(item);

  return (
    <ScrollView style={styles.body}>


      <Header />

      <ScrollView horizontal showsHorizontalScrollIndicator={true} style={styles.imageScroll}>
        {item.images.map((url, index) => (
          <Image key={index} source={{ uri: url }} style={styles.image} />
        ))}
      </ScrollView>


      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>
        Price: R {item.price}
      </Text>
      <Text style={styles.discount}>
        Discount: {item.discount.percentage} % →  {item.discount.priceAfterDiscount}
      </Text>
      <Text style={styles.rating}> Rating - {item.rating} / 5</Text>


      <Text style={styles.shortDesc}>{item.shortDescription}</Text>
      <Text style={styles.fullDesc}>{item.fullDescription}</Text>

      <Text style={styles.sectionTitle}>Reviews:</Text>
      {item.reviews.map((review, index) => (
        <View key={index} style={styles.reviewBox}>
          <Text style={styles.reviewUser}>{review.user}</Text>
          <Text style={styles.reviewComment}>"{review.comment}"</Text>
          <Text style={styles.reviewRating}>Rating :- {review.rating}</Text>
        </View>
      ))}


      <Text style={styles.sectionTitle}>Suggested Products:</Text>
      <ScrollView horizontal style={styles.suggestedScroll}>
        {item.suggestedProducts.map((sp) => (
          <View key={sp.id} style={styles.suggestedBox}>
            <Image source={{ uri: sp.image }} style={styles.suggestedImage} />
            <Text style={styles.suggestedTitle}>{sp.title}</Text>
            <Text style={styles.suggestedPrice}> {sp.price}</Text>
          </View>
        ))}
      </ScrollView>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 16,
    marginTop: 60
  },
  imageScroll: {
    marginBottom: 20,
  },
  image: {
    height: 250,
    width: 250,
    borderRadius: 12,
    marginRight: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007b00',
  },
  discount: {
    fontSize: 16,
    color: 'red',
    marginBottom: 6,
  },
  rating: {
    fontSize: 16,
    marginBottom: 10,
  },
  shortDesc: {
    fontSize: 16,
    marginBottom: 8,
    color: '#444',
  },
  fullDesc: {
    fontSize: 15,
    marginBottom: 12,
    color: '#555',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  reviewBox: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  reviewUser: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  reviewComment: {
    fontStyle: 'italic',
    marginBottom: 4,
  },
  reviewRating: {
    color: '#0804f6ff',
    fontWeight: 'bold',
  },
  suggestedScroll: {
    marginTop: 10,
  },
  suggestedBox: {
    width: 150,
    marginRight: 12,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  suggestedImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginBottom: 6,
  },
  suggestedTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  suggestedPrice: {
    fontSize: 13,
    color: '#007b00',
  },
});

export default OpenItem;
