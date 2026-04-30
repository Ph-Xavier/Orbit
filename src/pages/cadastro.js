import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  View,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from "@expo/vector-icons/Entypo";
import * as Location from "expo-location";
import { styles } from "../styles";

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  const [loading, setLoading] = useState(false);

  const handleCadastro = async () => {
    if (!nome || !email || !password || !rua || !numero || !cidade || !estado) {
      Alert.alert("Aviso", "Preencha todos os campos do formulário!");
      return;
    }

    setLoading(true);
    const enderecoCompleto = `${rua}, ${numero}, ${cidade}, ${estado}`;

    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão Negada", "Precisamos de acesso à localização.");
        setLoading(false);
        return;
      }

      const resultado = await Location.geocodeAsync(enderecoCompleto);

      if (resultado.length > 0) {
        const coords = {
          latitude: resultado[0].latitude,
          longitude: resultado[0].longitude,
        };

        const newUser = {
          id: Math.random().toString(),
          nome,
          email,
          password,
          coords,
        };

        const usersStorage = await AsyncStorage.getItem("usuarios");
        const usersList = usersStorage ? JSON.parse(usersStorage) : [];

        usersList.push(newUser);
        await AsyncStorage.setItem("usuarios", JSON.stringify(usersList));

        Alert.alert("Sucesso", "Conta criada e localização guardada no mapa!");
        navigation.navigate("Login");
      } else {
        Alert.alert(
          "Erro",
          "Endereço não encontrado. Detalhe mais a cidade e a UF.",
        );
      }
    } catch (error) {
      Alert.alert("Erro do Sistema", `Falha no GPS: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/space.jpg")}
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.overlay}>
          <View style={styles.logoContainer}>
            <Entypo name="globe" size={60} color="#FFF" />
          </View>
          <Text style={styles.title}>Criar Conta</Text>

          <TextInput
            style={styles.input}
            placeholder="Nome Completo"
            value={nome}
            onChangeText={setNome}
          />
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
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <Text style={styles.label}>Endereço de Localização:</Text>
          <TextInput
            style={styles.input}
            placeholder="Rua"
            value={rua}
            onChangeText={setRua}
          />

          <View style={styles.row}>
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 8 }]}
              placeholder="Nº"
              value={numero}
              onChangeText={setNumero}
              keyboardType="numeric"
            />
            <TextInput
              style={[styles.input, { flex: 2, marginRight: 8 }]}
              placeholder="Cidade"
              value={cidade}
              onChangeText={setCidade}
            />
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="UF"
              value={estado}
              onChangeText={setEstado}
              maxLength={2}
              autoCapitalize="characters"
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleCadastro}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Cadastrar e Marcar</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
