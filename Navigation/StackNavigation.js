import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import BottomTabNavigation from "./BottomTabNavigation";
import DetailScreen from "../screens/DetailScreen";
const StackNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Tab">
      <Stack.Screen
        name="Tab"
        component={BottomTabNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ headerShown: true, title: "Chi tiêt" }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
