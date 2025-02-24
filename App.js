import React from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";  
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import MoviesScreen from "./components/Movie.jsx";
import MovieDetailScreen from "./components/MovieDetail.jsx";
import TVShowsScreen from "./components/TVShows.jsx"; 
import Search from "./components/Search";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function MoviesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MoviesList"
        component={MoviesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Detail" component={MovieDetailScreen} />
    </Stack.Navigator>
  );
}

function TVShowsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TVShowsList"
        component={TVShowsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Detail" component={MovieDetailScreen} />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchList"
        component={Search}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Detail" component={MovieDetailScreen} />
    </Stack.Navigator>
  );
}


export default function AppNavigator() {
  return (
    <NavigationContainer>  
      <Tab.Navigator screenOptions={{
      tabBarStyle: { 
        backgroundColor: '#1E1E1E',
        paddingTop: 42,
      },
      tabBarActiveTintColor: '#FF6347',
      tabBarInactiveTintColor: '#B0B0B0',
      tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
    }}>
        <Tab.Screen name="Movies" component={MoviesStack} />
        <Tab.Screen name="TV Shows" component={TVShowsStack} />
        <Tab.Screen name="Search" component={SearchStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
