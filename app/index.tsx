import { Text, View } from "react-native";
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
        <Link href={"/tracking-test"}>Go to Tracking Test Screen</Link>
        <Link href={"/tracking-test-background"}>Go to Tracking Test Background Screen</Link>
    </View>
  );
}
