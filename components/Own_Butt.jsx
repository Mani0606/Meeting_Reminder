import { Pressable, StyleSheet, View } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Own() {
  const navigation = useNavigation();
  function naviHandler() {
    navigation.navigate("Details");
  }
  return (
    <View style={styles.root}>
      <Pressable onPress={naviHandler}>
        <FontAwesome6 name="add" size={20} color="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingRight: 15,
  },
});
