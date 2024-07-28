import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';



export default function Render({ Meeting }) {
    const navigation = useNavigation()
    function NaviHandler(data) {
        navigation.navigate("MeetingDetails", {
            values: data
        });
    }
    function List({ values }) {
        return (
            <Pressable style={styles.items} onPress={() => NaviHandler(values)}>
                <View style={styles.boder}>
                    <View style={styles.sub}>
                        <Text style={styles.head}>{values.MeetingName}</Text>
                        <View style={styles.timeOut}>
                            <Text style={styles.text}>{values.Time}</Text>
                        </View>
                    </View>
                    <Text style={styles.text1}>{values.Date}</Text>
                </View>
            </Pressable>
        );
    }
    if (!Meeting || Meeting.length === 0) {
        return (
            <View style={styles.root}>
                <Text>No Meeting Have added</Text>
            </View>
        )
    }
    return (
        <FlatList style={styles.flat}
            data={Meeting}
            renderItem={({ item }) => <List values={item} />}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};


const styles = StyleSheet.create({
    root: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    items: {
        paddingHorizontal: 25,
        paddingTop: 15,
    },
    boder: {
        borderWidth: 1,
        borderRadius: 9,
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: '#191919',
    },
    head: {
        fontSize: 22,
        color: "white"
    },
    sub: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    timeOut: {
        marginTop: 12,
        borderWidth: 1,
        padding: 8,
        borderRadius: 9,
        backgroundColor: '#BED754'
    },
    text: {
        fontSize: 15,
    },
    text1: {
        color: "white",
    },
    flat: {
        marginBottom: 95
    }
})