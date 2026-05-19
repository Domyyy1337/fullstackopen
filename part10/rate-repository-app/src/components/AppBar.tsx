import { StyleSheet, View } from "react-native";
import Constants from 'expo-constants'
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.barBackground,
  }
})

export default function AppBar() {
  return (
    <View style={styles.container}>
      <Text color="">AppBar Placeholder</Text>
    </View>
  )
}
