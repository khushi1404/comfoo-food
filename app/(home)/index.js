import {
  Alert,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import * as LocationGeocoding from "expo-location";
import { Octicons, Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Carousel from "../../components/Carousel";
import Categories from "../../components/Categories";
import Hotel from "../../components/Hotel";
import { supabase } from "../../supabase";
import hotel from "./hotel";

const index = () => {
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "fetching your location ..."
  );
  const [data,setData] = useState([]);

  useEffect(() => {
    CheckIfLocationEnabled();
    GetCurrentLocation();
  }, []);

  const CheckIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        "Location Services not enabled",
        "Please enable your location services to continue",
        [{ text: "OK" }],
        { cancelable: false }
      );
    } else {
      setLocationServicesEnabled(true);
    }
  };

  const GetCurrentLocation = async () => {
    let { status } = await Location.requestBackgroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission not granted",
        "Allow the app to use the location service",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    console.log(location);
    let { coords } = await Location.getCurrentPositionAsync();
    if (coords) {
      const { latitude, longitude } = coords;

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      const address = await LocationGeocoding.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      const streetAddress = address[0].name;
      for (let item of response) {
        let address = `${item.name}, ${item?.postalCode}, ${item?.city}`;

        setDisplayCurrentAddress(address);
      }
    }
  };
  console.log("my address", displayCurrentAddress);
  const recommended = [
    {
      id: 0,
      name: "Sweet and Salt",
      image:
        "/Users/khushi/Desktop/KHUSHI.png",
      time: "20-25",
      type: "Noida",
    },
    {
      id: 0,
      name: "GFC Biriyani",
      image:
        "https://b.zmtcdn.com/data/pictures/0/20844770/f9582144619b80d30566f497a02e2c8d.jpg?output-format=webp&fit=around|771.75:416.25&crop=771.75:416.25;*,*",
      time: "10 - 35",
      type: "North Indian",
    },
    {
      id: 0,
      name: "Happiness Dhaba",
      image:
        "https://b.zmtcdn.com/data/reviews_photos/2f1/c66cf9c2c68f652db16f2c0a6188a2f1_1659295848.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
      time: "20 - 25",
      type: "North Indian",
    },

    {
      id: 0,
      name: "Chow Chow",
      image:
        "data:image/jpeg;base64,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",
      time: "20 - 25",
      type: "North Indian",
    },
    {
      id: 0,
      name: "DIDI KA DABBA",
      image:
        "https://pr0.nicelocal.ae/OHApEEtzOkC8TGuLfpM5JQ/640x427,q85/4px-BW84_n0QJGVPszge3NRBsKw-2VcOifrJIjPYFYkOtaCZxxXQ2X9Y-ar0o_eJS1rW0zfei3BPOYezGGUm4cI8G4Yb2TCHIC7EcGGIF0CTC2rVBvxtDg",
      time: "20 - 25",
      type: "North Indian",
    },
  ];
  const items = [
    {
      id: "0",
      name: "Offers",
      description: "Upto 50% off",
      image: "https://cdn-icons-png.flaticon.com/128/9356/9356378.png",
    },
    {
      id: "1",
      name: "Legends",
      description: "Across India",
      image: "https://cdn-icons-png.flaticon.com/128/8302/8302686.png",
    },
    {
      id: "2",
      name: "Gourmet",
      description: "Selections",
      image: "https://cdn-icons-png.flaticon.com/128/1065/1065715.png",
    },
    {
      id: "3",
      name: "Healthy",
      description: "Curated dishes",
      image: "https://cdn-icons-png.flaticon.com/128/415/415744.png",
    },
  ];
  const hotels = [
    {
      id: "0",
      featured_image:
        "https://b.zmtcdn.com/data/pictures/2/18820472/b07647252aae32993047faf13a1cccf4.jpg?fit=around|771.75:416.25&crop=771.75:416.25;*,*",
      images: [
        {
          id: "0",
          image:
            "https://b.zmtcdn.com/data/pictures/chains/8/51828/68d04135bbac1e3d5ff5a87d45974da1.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
          description: "Desi Burrito • Rs249",
        },
        {
          id: "0",
          image:
            "encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4rgOs6C9rJuwL_sjJB5n7CeGKEA-Xg2yxIYq025B7_7avmruQHZ0DPpJa8GiSzPkEfas&usqp=CAU",
          description: "Indain Burrito • Rs149",
        },
      ],
      name: "Punjabi kitchen",
      cuisines: "North Indian • Fast Food • 160 for one",
      time: "35 - 40 min • 1Km",
      average_cost_for_two: 1600,
      aggregate_rating: 4.3,
      adress: "s1 112 Supertech czar , Greater noida",
      smalladress: "Supertech czar, Greater noida",
      offer: "₹80 OFF",
      no_of_Delivery: 1500,
      latitude: 12.9916,
      longitude: 77.5712,
    },

    {
      id: "1",
      featured_image:
        "https://b.zmtcdn.com/data/pictures/chains/8/51828/1f8008fc1cec3cd7ea2b559c32b1e642.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
      name: "Mexicana",
      cuisines: "Thai, European, Mexican",
      average_cost_for_two: 1500,
      aggregate_rating: 4.5,
      adress:
        "M21 Eldico Mystic Greens, Greater Noida",
      smalladress: "Mystic Greens, Greater Noida",
      offer: "₹80 OFF",
      no_of_Delivery: 2500,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "20 min",
    },

    {
      id: "2",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTCYsmzl1yfX0MwTN-E_uHC-bk3p181VzjIA&usqp=CAU",
      name: "Shruti Kitchen",
      cuisines: "Cafe, Continental",
      average_cost_for_two: 850,
      aggregate_rating: 4.3,
      adress:
        "Raipur Village Near Bennett Univesity, Greater Noida ",
      smalladress: "Bennett University Greater Noida",
      offer: "₹60 OFF",
      no_of_Delivery: 1800,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "20 min",
    },

    {
      id: "3",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1wuHjGnvTD4Aewe_M2-_5OSwPiPv1kUvMljF-sqoPRzvoFxD06BK2ac2jV-ZmQG6lQTg&usqp=CAU",
      name: "MAAPAA Cafe",
      cuisines: "South Indian, North Indian",
      average_cost_for_two: 1850,
      aggregate_rating: 4.1,
      adress:
        "Wave City Centre Mall, Noida City Centre , Noida",
      smalladress: "Noida City Centre , Noida",
      offer: "₹50 OFF",
      no_of_Delivery: 1700,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "38 min",
    },

    {
      id: "4",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXumfbiH2jcIY8xq9QW6B1QGoh3OJ596SnpQ&usqp=CAU",
      name: "38 Barracks",
      cuisines: "North Indian, Italian, Asian",
      average_cost_for_two: 1600,
      aggregate_rating: 4.4,
      adress: "M-38, Outer Circle, Connaught Place, New Delhi",
      smalladress: "Connaught Place, New Delhi",
      offer: "₹70 OFF",
      no_of_Delivery: 1230,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "51 min",
    },
    {
      id: "5",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREAW6AHZuQtR_1d9WPZn5mjK_jG-aAJxYfLQ&usqp=CAU",
      name: "Terra Mayaa Restaurant",
      cuisines: "North Indian, Continental, Italian",
      aggregate_rating: 3.5,
      adress: "6th Floor, Anil Plaza 2, G.S. Road, Christian Basti",
      smalladress: "Anil Plaza 2, G.S. Road",
      offer: "₹55 OFF",
      no_of_Delivery: 500,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "42 min",
    },
    {
      id: "6",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLvPe-0FZVXXBJkBWf--jnjCcKN6PxD1Zgdw&usqp=CAU",
      name: "Mocha Hotel",
      cuisines: "Cafe, Italian",
      aggregate_rating: 4.2,
      adress: "Christian Basti, Guwahati",
      smalladress: "Christian Basti, Guwahati",
      offer: "₹90 OFF",
      no_of_Delivery: 1100,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "34 min",
    },
    {
      id: "7",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScVnb3JlCmtRJUTXo3Tj3dl_ZPjq2ScYFE6g&usqp=CAU",
      name: "4 Seasons",
      cuisines: "Chinese, North Indian",
      aggregate_rating: 4.5,
      adress:
        "Opposite Institute of Social Science, Bhuban Road, Uzan Bazaar, Guwahati",
      smalladress: "Bhuban Road, Uzan Bazaar, Guwahati",
      offer: "₹55 OFF",
      no_of_Delivery: 1500,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "30 min",
    },
    {
      id: "8",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsboAN558yvuCNpy0Lm40ZMT7iYZRkfbL6xA&usqp=CAU",
      name: "Shanghai Salsa",
      cuisines: "Continental, Fast Food, Chinese",
      aggregate_rating: 4.1,
      adress:
        "37, 1st Floor, Hatigarh Chariali, Mother Teresa Road, Zoo Tiniali Area, Zoo Tiniali, Guwahati",
      smalladress: "Mother Teresa Road,Guwahati",
      offer: "₹75 OFF",
      no_of_Delivery: 1500,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "45 min",
    },
    {
      id: "9",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR30R3IntPKgz0A7WzeylvnDyM8EwmAfE2qXA&usqp=CAU",
      name: "Underdoggs Sports Bar & Grill",
      cuisines: "North Indian, Continental",
      aggregate_rating: 3.9,
      adress:
        "1st Floor, Central Mall, G.S. Road, Sree Nagar, Christian Basti, Guwahati",
      smalladress: "Sree Nagar, Christian Basti, Guwahati",
      offer: "₹70 OFF",
      no_of_Delivery: 2500,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "33 min",
    },
    {
      id: "10",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVdGrJhslCsWFMNhndCotN4HNucd_pm9nQSA&usqp=CAU",
      name: "Fat Belly",
      cuisines: "Asian, Chinese, Tibetan",
      aggregate_rating: 4.5,
      adress:
        "Opposite Rabindra Bhawan, GNB Road, Ambari, Dighalipukhuri East, Uzan Bazaar, Guwahati",
      smalladress: "Dighalipukhuri East, Guwahati",
      offer: "₹60 OFF",
      no_of_Delivery: 900,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "53 min",
    },
    {
      id: "11",
      featured_image:
        "rr",
      name: "Makhan Fish and Chicken Corner",
      cuisines: "Asian, Chinese",
      aggregate_rating: 4.5,
      adress:
        "21-A, Near Madaan Hospital, Majitha Road, Basant Nagar, Amritsar",
      smalladress: "Basant Nagar, Amritsar",
      offer: "₹55 OFF",
      no_of_Delivery: 1200,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "43 min",
    },
    {
      id: "12",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzUsgy4YrizXUafeKLzAWasb93wvT_TSIvgw&usqp=CAU",
      name: "Bharawan Da Dhaba",
      cuisines: "North Indian, Fast Food",
      aggregate_rating: 3.6,
      adress: "Near Amritsar Municipal Corporation, Town Hall, Amritsar",
      smalladress: "Town Hall, Amritsar",
      offer: "₹70 OFF",
      no_of_Delivery: 1600,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "28 min",
    },
    {
      id: "13",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFXsKQIgGajlkt7qydP7TS6xpVD_gKY6ufnw&usqp=CAU",
      name: "The Kulcha Land",
      cuisines: "North Indian,Asian",
      aggregate_rating: 4.3,
      adress:
        "Opposite M.K Hotel, District Shopping Centre, Ranjit Avenue, Amritsar",
      smalladress: "Ranjit Avenue, Amritsar",
      offer: "₹80 OFF",
      no_of_Delivery: 2600,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "32 min",
    },
    {
      id: "14",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu0iR3PZXGiNSyJf8XCMHuF13y9KL2owcNYQ&usqp=CAU",
      name: "Brothers Dhaba",
      cuisines: "North Indian",
      aggregate_rating: 4.6,
      adress:
        "Golden Temple Out Road, Opposite Amritsar Municipal Corporation, Town Hall, Amritsar",
      smalladress: "Amritsar",
      offer: "₹65 OFF",
      no_of_Delivery: 1300,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "42 min",
    },
    {
      id: "15",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHbn8yLak8QNu-M5P4ttVPHFkvKwz4G48x7w&usqp=CAU",
      name: "Charming Chicken",
      cuisines: "North Indian",
      aggregate_rating: 4.6,
      adress:
        "Golden Temple Out Road, Opposite Amritsar Municipal Corporation, Town Hall, Amritsar",
      smalladress: "Near Basant Nagar, Amritsar",
      offer: "₹45 OFF",
      no_of_Delivery: 700,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "28 min",
    },
    {
      id: "16",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsQSJX9mRckG3R7NfvYCRe-08s-z22tX-6nQ&usqp=CAU",
      name: "Beera Chicken Corner",
      cuisines: "North Indian",
      aggregate_rating: 4.4,
      adress:
        "Opposite Bandari Hospital, Sehaj Avenue, Majitha Road, Near White Avenue, Amritsar",
      smalladress: "Near White Avenue, Amritsar",
      offer: "₹80 OFF",
      no_of_Delivery: 1400,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "34 min",
    },
    {
      id: "17",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDOJlhGwhda4tsD8Rgk1A97akTRV8QJJC4DA&usqp=CAU",
      name: "Brothers' Amritsari Dhaba",
      cuisines: "North Indian",
      aggregate_rating: 4.2,
      adress: "Phawara Chowk, Town Hall, Amritsar",
      smalladress: "Town Hall, Amritsar",
      offer: "₹40 OFF",
      no_of_Delivery: 1600,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "40 min",
    },
    {
      id: "18",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjGqVUxo6HO-CtXn-AHgAin1tvN4l8_A0e1Q&usqp=CAU",
      name: "La Roma Pizzeria",
      cuisines: "Fast Food, Italian",
      aggregate_rating: 4.6,
      adress: " Ranjit Avenue, Amritsar",
      smalladress: " Ranjit Avenue, Amritsar",
      offer: "₹40 OFF",
      no_of_Delivery: 2200,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "46 min",
    },
    {
      id: "19",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkpI5t_Hgch4-I9edPRV4YNeZKgMX1iHtQng&usqp=CAU",
      name: "Crystal Restaurant",
      cuisines: "North Indian, Mughlai",
      aggregate_rating: 3.5,
      adress: " Crystal Chowk, Queens Road, INA Colony, Amritsar",
      smalladress: "INA Colony, Amritsar",
      offer: "₹80 OFF",
      no_of_Delivery: 2500,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "22 min",
    },
  ];

  
  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase.from("hotels").select("*");
        console.log("Data:", data);
        if (error) {
          console.error("Error fetching data:", error);
        } else {
          setData(data);
        }
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    }

    fetchData();
  }, []);


  console.log("data",data)

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          padding: 10,
        }}
      >
        <Octicons name="location" size={24} color="#E52850" />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>Deliver To</Text>
          <Text style={{ color: "gray", fontSize: 16, marginTop: 3 }}>
            {displayCurrentAddress}
          </Text>
        </View>
        <Pressable
          style={{
            backgroundColor: "#6CB4EE",
            width: 40,
            height: 40,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>K</Text>
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderWidth: 1,
          borderColor: "#C0C0C0",
          paddingVertical: 8,
          paddingHorizontal: 10,
          borderRadius: 11,
          marginTop: 10,
          marginHorizontal: 10,
        }}
      >
        <TextInput placeholder="Search for food, hotels" />
        <AntDesign name="search1" size={24} color="#E52B50" />
      </View>

      <Carousel />

      <Categories />

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {recommended?.map((item, index) => (
          <View
            style={{
              backgroundColor: "white",
              flexDirection: "row",
              margin: 10,
              borderRadius: 8,
            }}
          >
            <View>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: "cover",
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 7,
                }}
                source={{ uri: item?.image }}
              />
            </View>
            <View style={{ padding: 10, flexDirection: "column" }}>
              <Text style={{ fontSize: 15, fontWeight: "500" }}>
                {item?.name}
              </Text>
              <Text
                style={{
                  flex: 1,
                  marginTop: 3,
                  color: "gray",
                  fontWeight: "500",
                }}
              >
                {item?.type}
              </Text>

              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
              >
                <Ionicons name="ios-time" size={24} color="green" />
                <Text>{item?.time} mins</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <Text
        style={{
          textAlign: "center",
          marginTop: 7,
          letterSpacing: 4,
          marginBottom: 5,
          color: "gray",
        }}
      >
        EXPLORE
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items?.map((item, index) => (
          <View
            key={index}
            style={{
              width: 90,
              borderColor: "#E0E0E0",
              borderWidth: 1,
              paddingVertical: 5,
              paddingHorizontal: 1,
              borderRadius: 5,
              marginLeft:10,
              marginVertical:10,
              alignItems:"center",
              justifyContent:"center",
              backgroundColor:"white"
            }}
          >
            <Image
              style={{ width: 50, height: 50 }}
              source={{ uri: item?.image }}
            />

            <Text style={{fontSize:13,fontWeight:"500",marginTop:6}}>{item?.name}</Text>

            <Text style={{fontSize:12,color:"gray",marginTop:3}}>{item?.description}</Text>
          </View>
        ))}
      </ScrollView>

      <Text style={{textAlign:"center",marginTop:7,letterSpacing:4,marginBottom:5,color:"gray"}}>ALL RESTAURANTS</Text>

      <View style={{marginHorizontal:8}}>
            {data?.map((item,index) => (
                <Hotel key={index} item={item} menu={item?.menu}/>
            ))}
      </View>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({});
