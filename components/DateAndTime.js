import { View, Text, Pressable, StyleSheet } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from "react";

export default function DTPicker({ mode, icon, styler, DATEandTIME }) {
    const [picker, setPicker] = useState(new Date());
    const [show, setShow] = useState(false);
    const [selectedMode, setSelectedMode] = useState(mode); // Changed state name to avoid confusion

    function pickerHandler(selected) {
        setPicker(new Date(selected));
        setShow(false);
    }
    useEffect(() => {
        function DataTanser() {
            if (selectedMode === 'time') {
                DATEandTIME(picker.toLocaleTimeString());
            }
            else {
                DATEandTIME(picker.toLocaleDateString());
            }
        }
        DataTanser()
    }, [picker])
    function modeHandler(selectedMode) {
        setShow(true);
        setSelectedMode(selectedMode); // Update selectedMode state
    }
    return (
        <View style={[styles.root, styler]}>
            <Text style={styles.text}>{selectedMode}</Text>
            <View style={styles.DandT}>
                <Pressable onPress={() => modeHandler(mode)}>
                    <Ionicons name={icon} size={21} color="black" />
                </Pressable>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={picker}
                        mode={selectedMode}
                        is24Hour={false}
                        onChange={(event, selectedDate) => pickerHandler(selectedDate)}
                    />
                )}
                <Text style={styles.text1}>{mode === 'time' ? picker.toLocaleTimeString() : picker.toLocaleDateString()}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        marginTop: 25,
        paddingHorizontal: 20,
    },
    text: {
        fontSize: 19,
        paddingBottom: 6,
        color: 'white'
    },
    DandT: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: "#BED754",
        borderBottomLeftRadius: 9,
        borderBottomRightRadius: 9
    },
    text1: {
        fontSize: 17,
        color: 'white'
    }
})
