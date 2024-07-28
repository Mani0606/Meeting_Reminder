import { View, Text, TextInput, StyleSheet } from "react-native";

export default function Inputs_com({ Label, textConfig, styler }) {
  return (
    <View style={[style.root, styler]}>
      <Text style={style.text}>{Label}</Text>
      <TextInput {...textConfig} style={style.input} />
    </View>
  );
}

const style = StyleSheet.create({
  root: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 19,
    paddingBottom: 6,
    color: "white",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#BED754",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    color: "white",
  },
});
