import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 5,
    padding: 12,
    marginVertical: 8,
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
  },
  button: {
    backgroundColor: "#2F80ED",
    borderRadius: 5,
    padding: 15,
    width: "100%",
    alignItems: "center",
    marginTop: 15,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  buttonOutline: {
    marginTop: 20,
    padding: 10,
  },
  buttonOutlineText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 15,
    textDecorationLine: "underline",
  },
  label: {
    alignSelf: "flex-start",
    color: "#FFF",
    marginTop: 15,
    marginBottom: 5,
    fontWeight: "bold",
  },

  // Estilos específicos da Main (Mapa)
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F2F5",
    padding: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  map: {
    flex: 1,
    width: "100%",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
});
