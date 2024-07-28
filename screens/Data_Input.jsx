import { StyleSheet, View, Button } from "react-native";
import Inputs_com from "../components/Inputs_com";
import { useEffect, useLayoutEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import DTPicker from "../components/DateAndTime";
import {
  select,
  update,
  insertOfflineMeeting,
  insertOnlineMeeting,
  selectMeetings,
} from "../components/DataBase";

export default function Inputs({ navigation }) {
  const [isOpen, SetisOpen] = useState(false);
  const [currentValue, setcurrentValue] = useState("Offline");
  const [MeetingName, SetMeeting] = useState();
  const [Room_no, SetRoom_no] = useState();
  const [Link, SetLink] = useState();
  const [Date, SetDate] = useState();
  const [Time, SetTime] = useState();
  const data = [
    { label: "Offline", value: "Offline" },
    { label: "Online", value: "Online" },
  ];
  function DateHandler(Selected) {
    SetDate(Selected);
  }
  function TimeHandler(Selected) {
    SetTime(Selected);
  }
  function LinkHandler(Selected) {
    SetLink(Selected);
  }
  function RoomHandler(Selected) {
    console.log(Selected);
    SetRoom_no(Selected);
  }
  function MeetingNameHandler(Selected) {
    SetMeeting(Selected);
  }

  let screen = (
    <Inputs_com
      Label={"Room No"}
      textConfig={{ onChangeText: RoomHandler.bind(this), value: Room_no }}
    />
  );
  if (currentValue === "Online") {
    screen = (
      <Inputs_com
        Label={"Link"}
        textConfig={{ onChangeText: LinkHandler.bind(this), value: Link }}
      />
    );
  }
  function NaviHandler() {
    navigation.navigate("Meetings");
  }
  function SaveHandler() {
    if (currentValue === "Offline") {
      insertOfflineMeeting(MeetingName, Room_no, Date, Time, currentValue);
    } else if (currentValue === "Online") {
      insertOnlineMeeting(MeetingName, Link, Date, Time, currentValue);
    }
    NaviHandler();
  }

  return (
    <View style={styles.root}>
      <View style={isOpen ? [styles.drop, styles.drop1] : styles.drop}>
        <DropDownPicker
          items={data}
          open={isOpen}
          setOpen={() => SetisOpen(!isOpen)}
          value={currentValue}
          setValue={(val) => setcurrentValue(val)}
          closeOnBackPressed={true}
          itemSeparator={true}
          style={styles.drop2}
          dropDownContainerStyle={styles.drop2}
          labelStyle={styles.text}
          textStyle={styles.text}
          arrowIconStyle={styles.text1}
          tickIconStyle={styles.text1}
        />
      </View>
      <Inputs_com
        Label={"Meeting Name"}
        textConfig={{
          onChangeText: MeetingNameHandler.bind(this),
          value: MeetingName,
        }}
      />
      {screen}
      <View style={styles.D_T}>
        <DTPicker
          mode={"date"}
          icon={"calendar"}
          styler={styles.DT}
          DATEandTIME={DateHandler}
        />
        <DTPicker
          mode={"time"}
          icon={"time"}
          styler={styles.DT}
          DATEandTIME={TimeHandler}
        />
      </View>
      <View style={styles.D_T}>
        <View style={styles.butt}>
          <Button title="Save" color={"#BED754"} onPress={SaveHandler} />
        </View>
        <View style={styles.butt}>
          <Button title="Cancle" color={"#BED754"} />
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
  D_T: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  DT: {
    flex: 1,
  },
  butt: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 20,
  },
  drop: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingRight: 150,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
  },
  drop1: {
    marginBottom: 50,
  },
  drop2: {
    backgroundColor: "#414141",
  },
  text1: {
    tintColor: "white",
  },
  text: {
    color: "white",
  },
});
