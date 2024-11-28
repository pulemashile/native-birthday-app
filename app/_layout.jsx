import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, TextInput, ScrollView, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Toast from 'react-native-toast-message';  // Import toast

export default function RootLayout() {
  // State to store form input values
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [message, setMessage] = useState('');
  const [age, setAge] = useState('');

  // State to show/hide the card after form submission
  const [submitted, setSubmitted] = useState(false);

  // Handle form submission
  const handleSubmit = () => {
    if (!name || !birthday || !message || !age) {
      alert('Please fill in all the fields');
      return;
    }

    // Show success toast
    Toast.show({
      type: 'success',
      text1: 'Form submitted successfully!',
      text2: 'Your information has been saved.',
      position: 'bottom',  // Position of the toast (bottom, top, etc.)
      visibilityTime: 3000,  // Duration in ms
    });

    setSubmitted(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/images/ballon.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.innerContainer}>
            <Text style={styles.formTitle}>Birthday Card</Text>

            {/* Form Inputs */}
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              placeholder="Enter your name"
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholderTextColor="black"
            />

            <Text style={styles.label}>Date of Birthday</Text>
            <TextInput
              placeholder="Enter the date here"
              style={styles.input}
              value={birthday}
              onChangeText={setBirthday}
              placeholderTextColor="black"
            />

            <Text style={styles.label}>Message to the Celebrated</Text>
            <TextInput
              placeholder="Enter what you wish for them"
              style={styles.input}
              value={message}
              onChangeText={setMessage}
              placeholderTextColor="black"
            />

            <Text style={styles.label}>Age</Text>
            <TextInput
              placeholder="Enter your age"
              style={styles.input}
              value={age}
              onChangeText={setAge}
              placeholderTextColor="black"
            />

            <Pressable style={styles.button} onPress={handleSubmit}>
              <Text style={styles.submitText}>Submit</Text>
            </Pressable>

            <StatusBar backgroundColor="#010709" style="light" />
          </View>

          {/* Conditionally render the card after submission */}
          {submitted && (
            <View style={styles.cardContainer}>
              <View style={styles.card}>
                <View style={{ position: "relative", alignItems: "center" }}>
                  <Text style={styles.cardText}>Name: {name}</Text>
                  <Text style={styles.cardText}>Birthday: {birthday}</Text>
                  <Text style={styles.cardText}>Age: {age}</Text>
                  <Text style={styles.cardText}>Message: {message}</Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </ImageBackground>

      {/* Toast Container */}
      <Toast ref={(ref) => Toast.setRef(ref)} />  {/* Attach Toast to ref */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFAEE",
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
  },
  innerContainer: {
    flex: 1,
    padding: 20,
  },
  submitText: {
    color: "white",
    fontSize: 18,
    marginTop: 10,
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    backgroundColor: "white",
    fontFamily: "serif",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#D91656",
  },
  label: {
    color: "black",
    fontFamily: "serif",
    fontSize: 18,
  },
  formTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#D91656",
    fontFamily: "serif",
  },
  cardContainer: {
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#F7F7F7",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  card: {
    borderRadius: 10,
    elevation: 5,
  },
  cardText: {
    fontSize: 16,
    marginTop: 8,
    color: "black",
    fontFamily: "serif",
  },
});
