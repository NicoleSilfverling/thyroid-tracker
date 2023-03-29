// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, TextInput, View, Button } from "react-native";
// import axios from "axios";
// import { useState, useEffect } from "react";

// export default function App() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/users")
//       .then((response) => {
//         setData(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [age, setAge] = useState("");

//   const handleSubmit = () => {
//     axios
//       .post(
//         "http://localhost:8080/save/user",
//         JSON.stringify({ firstName, lastName, age }),
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       )
//       .then((response) => {
//         console.log(response);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
//   return (
//     <View style={styles.container}>
//       <Text>Lets gooo!</Text>
//       <StatusBar style="auto" />
//       {data.map((item) => (
//         <View key={item.id}>
//           <Text>{item.firstName + " " + item.lastName + " " + item.age}</Text>
//         </View>
//       ))}
//       <View>
//         <TextInput
//           placeholder="First Name"
//           onChangeText={(text) => setFirstName(text)}
//           value={firstName}
//         />
//         <TextInput
//           placeholder="Last Name"
//           onChangeText={(text) => setLastName(text)}
//           value={lastName}
//         />
//         <TextInput
//           placeholder="Age"
//           onChangeText={(text) => setAge(text)}
//           value={age}
//         />
//         <Button title="Submit" onPress={handleSubmit} />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
