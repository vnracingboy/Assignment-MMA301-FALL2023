import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useOrchids } from "../context/OrchidProvider";

const OrchidCard = ({ orchid }) => {
  const { orchids, setOrchids, findOrchids } = useOrchids();

  const Id = orchid.Id;
  const linkImg = orchid.linkImg;
  const name = orchid.name;
  const des = orchid.des;
  const category = orchid.category;
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

    const newOrchid = orchids.filter((n) => n.Id !== orchid.Id);
    setOrchids(newOrchid);
    await AsyncStorage.setItem("orchids", JSON.stringify(newOrchid));
  };
  let loved = false;
  for (let i = 0; i < orchids.length; i++) {
    if (orchids[i].Id === orchid.Id) {
      loved = true;
      break;
    }
  }
  return (
    <View style={tw`bg-white rounded-xl`}>
      <Image
        style={tw`w-full h-52 mb-4 rounded-t-xl rounded-tr-xl`}
        source={{ uri: orchid.linkImg }}
        resizeMode="cover"
      />

      <View style={tw`flex-row justify-between items-start mb-8 px-5`}>
        <Text style={tw`text-xl font-bold`}>{orchid.name}</Text>
        {loved ? (
          <Pressable onPress={removeFavorite}>
            <FontAwesome name="heart" size={24} color="#fe2c55" />
          </Pressable>
        ) : (
          <Pressable onPress={handleLove}>
            <FontAwesome name="heart-o" size={24} color="black" />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default OrchidCard;
