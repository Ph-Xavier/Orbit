import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from "@expo/vector-icons/Entypo";
import { styles } from "../styles";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const usersStorage = await AsyncStorage.getItem("usuarios");

      if (!usersStorage) {
        Alert.alert("Erro", "Nenhum utilizador cadastrado no sistema!");
        return;
      }

      const usersList = JSON.parse(usersStorage);
      const userExists = usersList.find(
        (user) => user.email === email && user.password === password,
      );

      if (userExists) {
        navigation.replace("Main");
      } else {
        Alert.alert("Erro", "E-mail ou senha inválidos!");
      }
    } catch (error) {
      Alert.alert("Erro", "Falha ao aceder aos dados.");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/space.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.logoContainer}>
          <Entypo name="globe" size={80} color="#FFF" />
        </View>

        <Text style={styles.title}>Orbit</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          secureTextEntry={true}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonOutline}
          onPress={() => navigation.navigate("Cadastro")}
        >
          <Text style={styles.buttonOutlineText}>Não tem conta? Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
