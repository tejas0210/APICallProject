import {
  View,
  Text,
  FlatList,
  Image,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';

const ProductListingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    getProducts();
  }, []);

  StatusBar.setBackgroundColor('#000');

  const getProducts = () => {
    const url = 'https://dummyjson.com/products';

    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong');
        }
        return res.json();
      })
      .then(responseJson => {
        return responseJson.products;
      })
      .then(data => {
        // const imageData = data.map(product => product.images);
        // console.log(data);
        setProduct(data);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        setError(error.message);
      });
  };

  return (
    <View className="h-full justify-center items-center">
      {isLoading ? (
        <ActivityIndicator color="blue-700" size="large" />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={product}
          renderItem={({item}) => (
            <View className="flex bg-blue-200 border-black-300 rounded-[7px] m-3 justify-center  p-6">
              <Image
                source={{uri: item.thumbnail}}
                className="w-100% h-[250px] relative rounded-[7px]"
              />
              <Text className="text-2xl mt-2 text-black font-bold ">
                {item.title}
              </Text>
              <Text className="text-sm uppercase text-blue-800 font-bold">
                {item.brand} ({item.category})
              </Text>

              <Text
                className="mt-2 text-black-700 font-normal text-sm"
                numberOfLines={3}>
                {item.description}
              </Text>
              <Text className="text-2xl mt-2 font-bold text-black">
                Rs.{item.price}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default ProductListingScreen;
