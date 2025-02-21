import React from "react";
import { NavigationContainer } from "@react-navigation/native";  // Import NavigationContainer
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import MoviesScreen from "./components/Movie";
import MovieDetailScreen from "./components/MovieDetail";
import TVShowsScreen from "./components/TVShows"; 
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
    <NavigationContainer>  {/* Wrap the navigator with NavigationContainer */}
      <Tab.Navigator>
        <Tab.Screen name="Movies" component={MoviesStack} />
        <Tab.Screen name="TV Shows" component={TVShowsStack} />
        <Tab.Screen name="Search" component={SearchStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
