import { View, Text, StyleSheet, Pressable, Linking } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { deleteRowById } from "../components/DataBase";

export default function MeetingDetails({ navigation }) {
  function url(webitelink) {
    Linking.openURL(webitelink);
  }

  async function Delete() {
    console.log("Entered the function");
    await deleteRowById(route.params.values.id);
    navigation.goBack();
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Pressable onPress={Delete}>
            <AntDesign name="delete" size={18} color="black" />
          </Pressable>
        );
      },
    });
  }, [navigation]);
  const route = useRoute();
  console.log(route.params.values.Room_No);
  let screen = (
    <Text style={styles.text}>Room No: {route.params.values.Room_No}</Text>
  );
  if (route.params.values.Mode == "Online") {
    screen = (
      <View style={styles.D_T1}>
        <View>
          <Text style={styles.text}>Link :</Text>
        </View>
        <View style={styles.link}>
          <Pressable onPress={() => url(route.params.values.Link)}>
            <Text style={{ color: "#008DDA", fontSize: 20 }}>
              {route.params.values.Link}
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.root}>
      <View style={styles.root1}>
        <Text style={styles.text}>
          Meeting Name: {route.params.values.MeetingName}
        </Text>
        <Text style={styles.text}>Mode: {route.params.values.Mode}</Text>
        {screen}
        <View style={styles.D_T}>
          <Text style={styles.text}>Date: {route.params.values.Date}</Text>
          <Text style={styles.text}>Time: {route.params.values.Time}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "black",
  },
  root1: {
    marginTop: 80,
    marginHorizontal: 20,
    paddingHorizontal: 25,
    borderWidth: 1,
    backgroundColor: "#31363F",
    borderRadius: 20,
  },
  text: {
    color: "white",
    fontSize: 25,
    paddingBottom: 20,
  },
  D_T: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  D_T1: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  link: {
    flex: 1,
    marginTop: 5,
    marginLeft: 15,
  },
});
