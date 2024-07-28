import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Where from "../components/WhereClause";

export default function Second() {
  const [Isopen, SetOpen] = useState(false);
  const [range, Setrange] = useState("Current Day");
  const data = [
    { label: "Current Week", value: "Current Week" },
    { label: "Current Day", value: "Current Day" },
  ];
  const days = new Date();
  let day1 =
    days.getMonth() + 1 + "/" + days.getDate() + "/" + days.getFullYear();
  let day = day1.toString();
  return (
    <View style={styles.root}>
      <View style={styles.drop1}>
        <DropDownPicker
          items={data}
          open={Isopen}
          setOpen={() => SetOpen(!Isopen)}
          value={range}
          setValue={(val) => Setrange(val)}
          style={styles.drop}
          dropDownContainerStyle={styles.drop}
          closeOnBackPressed={true}
          itemSeparator={true}
          labelStyle={styles.text}
          arrowIconStyle={styles.icons}
          tickIconStyle={styles.icons}
          textStyle={styles.text}
          listItemContainerStyle={{ paddingHorizontal: 20 }}
        />
      </View>
      <Where currentValue={day} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "black",
  },
  text: {
    color: "white",
  },
  drop: {
    backgroundColor: "#414141",
  },
  item: {
    color: "white",
    borderColor: "white",
  },
  drop1: {
    marginTop: 17,
    paddingHorizontal: 20,
    paddingRight: 150,
  },
  icons: {
    tintColor: "white",
  },
});
