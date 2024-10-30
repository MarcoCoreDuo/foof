import { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";

import * as Location from "expo-location";

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }
      // Start watching location changes
      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 500, // Update every 5 seconds
          distanceInterval: 10, // Update every 10 meters
        },
        (newLocation) => {
          setLocation(newLocation);
          setLatitude(newLocation.coords.latitude);
          setLongitude(newLocation.coords.longitude);
        },
      );
      return () => subscription.remove(); // Clean up subscription on unmount
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{errorMsg}</Text>
      <Text style={styles.paragraph}>{text}</Text>
      <Text style={styles.paragraph}>{latitude}</Text>
      <Text style={styles.paragraph}>{longitude}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
});
