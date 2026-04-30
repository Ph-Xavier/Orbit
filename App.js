import React from "react";
import "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";

// Importação das páginas
import Login from "./src/pages/login";
import Cadastro from "./src/pages/cadastro";
import Main from "./src/pages/main";

const Stack = createStackNavigator();

// Renderização do aplicativo
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#2F80ED" />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: "#2F80ED" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      >
        {/* Login*/}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        {/* Cadastro */}
        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
          options={{ title: "Criar Conta" }}
        />

        {/* Main */}
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            title: "Orbit",
            headerLeft: null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
