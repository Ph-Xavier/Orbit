import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useLocation from "../hooks/useLocation";

export default function Main({ navigation }) {
  const { coords: initialCoords, errorMsg } = useLocation();
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const usersStorage = await AsyncStorage.getItem("usuarios");
      if (usersStorage) {
        setUsuarios(JSON.parse(usersStorage));
      }
    }
    loadUsers();
  }, []);

  const handleLogout = () => {
    navigation.replace("Login");
  };

  if (errorMsg) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red", fontSize: 16 }}>{errorMsg}</Text>
      </View>
    );
  }

  if (!initialCoords || !initialCoords.latitude) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F0F2F5",
        }}
      >
        <ActivityIndicator size="large" color="#2F80ED" />
        <Text style={{ marginTop: 10, fontSize: 16, color: "#666" }}>
          A obter o seu GPS atual...
        </Text>
      </View>
    );
  }

  const gerarMapaHTML = () => {
    const marcadores = usuarios
      .filter((u) => u.coords && u.coords.latitude)
      .map(
        (u) => `
        L.marker([${u.coords.latitude}, ${u.coords.longitude}]).addTo(map)
         .bindPopup("<b>${u.nome}</b><br/>${u.email}");
      `,
      )
      .join("");

    return `
      <!DOCTYPE html>
      <html>
      <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
          <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
          <style>
              body { padding: 0; margin: 0; }
              html, body, #map { height: 100%; width: 100vw; }
          </style>
      </head>
      <body>
          <div id="map"></div>
          <script>
              var map = L.map('map').setView([${initialCoords.latitude}, ${initialCoords.longitude}], 14);

              L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                  maxZoom: 19,
                  attribution: '© OpenStreetMap'
              }).addTo(map);

              // Marcador da SUA localização (Vermelho)
              var myIcon = L.icon({
                  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
              });
              L.marker([${initialCoords.latitude}, ${initialCoords.longitude}], {icon: myIcon}).addTo(map)
               .bindPopup("<b>Você está aqui</b>").openPopup();

              // Marcadores dos utilizadores cadastrados
              ${marcadores}
          </script>
      </body>
      </html>
    `;
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ html: gerarMapaHTML() }}
        style={{ flex: 1 }}
        originWhitelist={["*"]}
      />

      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 30,
          right: 20,
          backgroundColor: "#FFF",
          paddingVertical: 12,
          paddingHorizontal: 30,
          borderRadius: 30,
          elevation: 5,
        }}
        onPress={handleLogout}
      >
        <Text style={{ color: "#2F80ED", fontWeight: "bold", fontSize: 16 }}>
          Sair
        </Text>
      </TouchableOpacity>
    </View>
  );
}
