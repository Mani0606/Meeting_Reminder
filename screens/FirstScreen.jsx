import Render from "../components/Rendering";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { selectMeetings } from "../components/DataBase";
import { StyleSheet, View } from "react-native";

export default function First() {
  const [loadedMeeting, SetLoadedMetting] = useState([]);
  const fousced = useIsFocused();
  useEffect(() => {
    async function fetch() {
      const Values = await selectMeetings();
      SetLoadedMetting(Values.data);
    }
    if (fousced) {
      fetch();
    }
  }, [fousced]);

  return (
    <View style={styles.root}>
      <Render Meeting={loadedMeeting} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "black",
  },
});
