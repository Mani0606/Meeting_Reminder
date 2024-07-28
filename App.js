import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import First from './screens/FirstScreen';
import Second from './screens/SecondScreen';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Inputs from './screens/Data_Input';
import Own from './components/Own_Butt';
import { useEffect } from 'react';
import { createMeetingsTable } from './components/DataBase';
import MeetingDetails from './screens/Details_file';

const Stack = createNativeStackNavigator();
const BTab = createBottomTabNavigator();
export default function App() {


  function Add() {
    return (
      <BTab.Navigator initialRouteName='All' screenOptions={{
        tabBarStyle: styles.container, headerStyle: { backgroundColor: "#BED754" }, tabBarActiveTintColor: "#0C0C0C", tabBarInactiveTintColor: "#DDE6ED",
        headerRight: () => <Own />
      }}>
        <BTab.Screen name='All' component={First} options={{
          tabBarLabel: 'Meetings',
          tabBarIcon: ({ focused }) => (
            <MaterialIcons name="meeting-room" size={24} color={focused ? "#0C0C0C" : "#DDE6ED"} />
          )
        }} />
        <BTab.Screen name='Imp' component={Second} options={{
          tabBarLabel: 'Recent',
          tabBarIcon: ({ focused }) => (
            <Entypo name="back-in-time" size={24} color={focused ? "#0C0C0C" : "#DDE6ED"} />
          )
        }} />
      </BTab.Navigator>
    )
  }


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Meetings' component={Add} options={{ headerShown: false }} />
        <Stack.Screen name='Details' component={Inputs} options={{ presentation: 'modal', headerStyle: { backgroundColor: "#BED754" } }} />
        <Stack.Screen name="MeetingDetails" component={MeetingDetails} options={{ headerStyle: { backgroundColor: "#BED754" } }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {//bar Styling component
    flex: 1,
    backgroundColor: "#BED754",
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
    marginRight: 25,
    marginLeft: 25,
    marginBottom: 15,
    borderRadius: 8,
    elevation: 8,
    shadowOffset: { height: 10, width: 10 },
    shadowColor: "#0C0C0C",
    shadowRadius: 10,
    shadowOpacity: 0.86,
    position: 'absolute'
  },
});

