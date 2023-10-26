import { SafeAreaView } from "react-native";
import OrchidProvider from "./context/OrchidProvider";

import AppNav from "./Navigation/AppNav";

export default function App() {
  return (
    <OrchidProvider>
      <AppNav />
    </OrchidProvider>
  );
}
