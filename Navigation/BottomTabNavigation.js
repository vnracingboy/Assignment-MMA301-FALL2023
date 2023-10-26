import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect } from "react";
import tw from "twrnc";
import HomeScreen from "../screens/HomeScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import { Platform, Text, View } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useOrchids } from "../context/OrchidProvider";

const BottomTabNavigation = () => {
  const Tab = createBottomTabNavigator();
  const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      elevation: 0,
      height: Platform.OS == "ios" ? 80 : 60,
      background: "#000000",
    },
  };

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={tw`items-center justify-center ios:mt-1`}>
                <View
                  style={tw`items-center justify-center ${
                    focused ? "border-t-2 border-[#e74c3c]" : ""
                  } pt-2`}
                >
                  <Octicons
                    name="home"
                    size={24}
                    color={focused ? "#e74c3c" : "black"}
                  />
                  <Text
                    style={tw`text-xs text-[${
                      focused ? "#e74c3c" : "#000000"
                    }]`}
                  >
                    Trang chủ
                  </Text>
                </View>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={tw`items-center justify-center ios:mt-1`}>
                <View
                  style={tw`items-center justify-center ${
                    focused ? "border-t-2 border-[#e74c3c]" : ""
                  } pt-2`}
                >
                  <MaterialIcons
                    name="favorite-border"
                    size={24}
                    color={focused ? "#e74c3c" : "black"}
                  />
                  <Text
                    style={tw`text-xs text-[${
                      focused ? "#e74c3c" : "#000000"
                    }]`}
                  >
                    Yêu thích
                  </Text>
                </View>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
