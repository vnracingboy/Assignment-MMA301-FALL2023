import React, { useEffect, useState } from "react";
import { Button, Image, Pressable, Text, View } from "react-native";
import { getOrchidById } from "../api/axios";
import tw from "twrnc";
import { ImageBackground } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useOrchids } from "../context/OrchidProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DetailScreen = ({ route }) => {
  const { item } = route.params;
  const [orchid, setOrchid] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { orchids, setOrchids, findOrchids } = useOrchids();

  let loved = false;
  for (let i = 0; i < orchids.length; i++) {
    if (orchids[i].Id === item.Id) {
      loved = true;
      break;
    }
  }
  const Id = item.Id;
  const linkImg = item.linkImg;
  const name = item.name;
  const des = item.des;
  const category = item.category;
  const handleLove = async () => {
    const orchid = {
      Id,
      linkImg,
      name,
      des,
      category,
      time: Date.now(),
    };
    const updatedOrchids = [...orchids, orchid];
    setOrchids(updatedOrchids);
    await AsyncStorage.setItem("orchids", JSON.stringify(updatedOrchids));
  };
  const removeFavorite = async () => {
    const result = await AsyncStorage.getItem("orchids");
    let orchids = [];
    if (result !== null) orchids = JSON.parse(result);

    const newOrchid = orchids.filter((n) => n.Id !== item.Id);
    setOrchids(newOrchid);
    await AsyncStorage.setItem("orchids", JSON.stringify(newOrchid));
  };
  return (
    <View style={tw`flex-1`}>
      <ImageBackground
        style={tw`flex-1 justify-end`}
        source={{ uri: item.linkImg }}
        resizeMode="cover"
      >
        <View style={tw`bg-white h-1/2 rounded-tr-80px p-5 relative`}>
          <View style={tw`flex-row`}>
            <View
              style={tw`flex-row items-center border-2 gap-2 p-2 rounded-3xl`}
            >
              <Entypo name="flower" size={22} color="black" />
              <Text style={tw`text-base font-bold`}>{item.category}</Text>
            </View>
          </View>
          <Text style={tw`text-3xl mt-2`}>{item.name}</Text>
          <Text style={tw`text-base mt-2`} numberOfLines={7}>
            {item.des}
          </Text>
          {loved ? (
            <View style={tw` absolute bottom-10 left-10 right-10`}>
              <Pressable onPress={removeFavorite}>
                <View style={tw`border-[#fe2c55] border-4 py-2 rounded-3xl`}>
                  <Text
                    style={tw`text-center text-[#fe2c55] text-2xl font-bold`}
                  >
                    Hủy thích
                  </Text>
                </View>
              </Pressable>
            </View>
          ) : (
            <View style={tw`absolute bottom-10 left-10 right-10`}>
              <Pressable onPress={handleLove}>
                <View style={tw`bg-[#fe2c55] py-2 rounded-3xl`}>
                  <Text style={tw`text-center text-white text-2xl font-bold`}>
                    Yêu thích
                  </Text>
                </View>
              </Pressable>
            </View>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

export default DetailScreen;
