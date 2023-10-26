import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import tw from "twrnc";
import { useOrchids } from "../context/OrchidProvider";
import { useNavigation } from "@react-navigation/native";
import OrchidCard from "../components/OrchidCard";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const FavoriteScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { orchids, setOrchids, findOrchids } = useOrchids();
  const navigation = useNavigation();

  const reverseData = (data) => {
    return data.sort((a, b) => {
      const aInt = parseInt(a.time);
      const bInt = parseInt(b.time);
      if (aInt < bInt) return 1;
      if (aInt == bInt) return 0;
      if (aInt > bInt) return -1;
    });
  };

  const reverseOrchids = reverseData(orchids);
  const deleteAll = async () => {
    try {
      // Remove the data from AsyncStorage
      await AsyncStorage.removeItem("orchids");
      console.log("All orchids data deleted.");

      // Retrieve the updated data from AsyncStorage
      const result = await AsyncStorage.getItem("orchids");
      if (result !== null) {
        const orchids = JSON.parse(result);
        setOrchids(orchids);
      } else {
        setOrchids([]); // Set an empty array if there is no data
      }

      setIsModalVisible(false); // Close your modal or set the visibility state as needed
    } catch (error) {
      console.error("Error deleting orchids data: ", error);
    }
  };
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {orchids.length !== 0 ? (
        <View style={tw`flex-1 px-4 android:mt-20 mb-15`}>
          <FlatList
            data={orchids}
            renderItem={({ item }) => {
              return (
                <Pressable
                  onPress={() =>
                    navigation.navigate("Detail", {
                      item,
                    })
                  }
                >
                  <OrchidCard orchid={item} />
                </Pressable>
              );
            }}
            ItemSeparatorComponent={<View style={tw`h-12`} />}
            ListFooterComponent={
              orchids.length > 0 ? (
                <View style={tw`flex-row justify-center mt-10`}>
                  <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                    <View
                      style={tw`bg-red-600 py-2 px-4 rounded-lg flex-row items-center gap-2`}
                    >
                      <AntDesign name="delete" size={24} color="white" />
                      <Text style={tw`text-white font-bold`}>Delete All</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : null
            }
          />
          <Modal
            visible={isModalVisible}
            onRequestClose={() => setIsModalVisible(false)}
            animationType="slide"
            presentationStyle="pageSheet"
          >
            <View style={tw`flex-1 bg-white pt-4 pr-4`}>
              <View style={tw`flex-row justify-end`}>
                <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                  <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <View style={tw`flex-1 justify-center items-center`}>
                <View style={tw`flex items-center gap-5`}>
                  <FontAwesome
                    name="warning"
                    size={60}
                    color="rgb(220 38 38)"
                  />
                  <Text style={tw`text-2xl font-bold`}>Delete All Items</Text>
                  <Text style={tw`text-base text-gray-500`}>
                    Are you sure you want to delete all items
                  </Text>
                  <View style={tw`flex-row justify-center items-center gap-5`}>
                    <Pressable onPress={() => setIsModalVisible(false)}>
                      <Text style={tw`font-bold text-base`}>Cancel</Text>
                    </Pressable>
                    <Pressable onPress={deleteAll}>
                      <View style={tw`bg-red-600 py-2 px-4`}>
                        <Text style={tw`text-white font-bold text-base`}>
                          Yes, delete all items
                        </Text>
                      </View>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      ) : (
        <View style={tw`flex-1 items-center justify-center`}>
          <Image source={require("../assets/empty.jpg")} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default FavoriteScreen;
