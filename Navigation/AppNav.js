import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import StackNavigation from "./StackNavigation";

const AppNav = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
};

export default AppNav;
