import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import tw from "twrnc";
import { getOrchids } from "../api/axios";
import OrchidCard from "../components/OrchidCard";
import { useNavigation } from "@react-navigation/native";
const HomeScreen = () => {
  const [orchids, setOrchids] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const [category, setCategory] = useState("");
  const [check, setCheck] = useState(true);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);

  console.log(category);
  useEffect(() => {
    getOrchids(category).then((json) => {
      setOrchids(json);
      setIsLoading(false);
    });
  }, [category]);

  const handleRefresh = () => {
    setRefreshing(true);
    getOrchids();
    setRefreshing(false);
  };
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {isLoading ? (
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <>
          <View style={tw`flex-1 px-4 android:mt-20 mb-15`}>
            <View style={tw`flex-row justify-center gap-2 mb-2 mt-2`}>
              <TouchableOpacity
                onPress={() => {
                  setCategory("");
                  setCheck(true);
                  setCheck2(false);
                  setCheck3(false);
                  setCheck4(false);
                }}
              >
                <View
                  style={tw`border p-2 rounded-xl ${
                    check ? "bg-yellow-400" : null
                  }`}
                >
                  <Text>Tất cả</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setCategory("Địa lan");
                  setCheck(false);
                  setCheck2(true);
                  setCheck3(false);
                  setCheck4(false);
                }}
              >
                <View
                  style={tw`border p-2 rounded-xl ${
                    check2 ? "bg-yellow-400" : null
                  }`}
                >
                  <Text>Địa lan</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setCategory("Phong");
                  setCheck(false);
                  setCheck2(false);
                  setCheck3(true);
                  setCheck4(false);
                }}
              >
                <View
                  style={tw`border p-2 rounded-xl ${
                    check3 ? "bg-yellow-400" : null
                  }`}
                >
                  <Text>Phong lan</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setCategory("Bán");
                  setCheck(false);
                  setCheck2(false);
                  setCheck3(false);
                  setCheck4(true);
                }}
              >
                <View
                  style={tw`border p-2 rounded-xl ${
                    check4 ? "bg-yellow-400" : null
                  }`}
                >
                  <Text>Bán địa lan</Text>
                </View>
              </TouchableOpacity>
            </View>
            <SectionList
              sections={orchids}
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
              renderSectionHeader={({ section }) => {
                return (
                  <View style={tw`bg-white flex-row items-center p-2 gap-2`}>
                    <Entypo name="flower" size={24} color="black" />
                    <Text style={tw` text-lg font-bold `}>
                      {section.category}
                    </Text>
                  </View>
                );
              }}
              ItemSeparatorComponent={() => <View style={tw`h-12`} />}
              SectionSeparatorComponent={() => <View style={tw`h-4`} />}
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
