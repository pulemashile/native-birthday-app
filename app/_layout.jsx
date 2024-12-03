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
  

  // State to show/hide the card after form submission
  const [submitted, setSubmitted] = useState(false);

  // State for selected background template for the card
  const [backgroundTemplate, setBackgroundTemplate] = useState('template1'); // Default to template1

  // State for edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Handle form submission
  const handleSubmit = () => {
    if (!name || !birthday || !message ) {
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
    setIsEditing(false); // After submission, switch to view mode
  };

  // Background image selector based on the template for the card
  const getCardBackgroundImage = () => {
    switch (backgroundTemplate) {
      case 'template 1':
        return require("../assets/images/ballon.jpg");
      case 'template2':
        return require("../assets/images/blackballons.jpg");
      case 'template3':
        return require("../assets/images/flowers.jpg");
      case 'template4':
        return require("../assets/images/pinkballons.jpg");
      default:
        return require("../assets/images/black.jpg");
    }
  };

  // Handle Edit mode
  const handleEdit = () => {
    setIsEditing(true);
    setSubmitted(false); // Hide the card when editing
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.innerContainer}>
          <Text style={styles.formTitle}>Birthday Card</Text>

          {/* Background Selection Buttons for the Card */}
          <View style={styles.templateSelector}>
            <Pressable onPress={() => setBackgroundTemplate('template1')} style={styles.templateButton}>
              <Text style={styles.templateButtonText}>Template 1</Text>
            </Pressable>
            <Pressable onPress={() => setBackgroundTemplate('template2')} style={styles.templateButton}>
              <Text style={styles.templateButtonText}>Template 2</Text>
            </Pressable>
            <Pressable onPress={() => setBackgroundTemplate('template3')} style={styles.templateButton}>
              <Text style={styles.templateButtonText}>Template 3</Text>
            </Pressable>
            <Pressable onPress={() => setBackgroundTemplate('template4')} style={styles.templateButton}>
              <Text style={styles.templateButtonText}>Template 4</Text>
            </Pressable>
          </View>

          {/* If we're in editing mode, show the form to edit the details */}
          {!submitted || isEditing ? (
            <>
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

              

              <Pressable style={styles.button} onPress={handleSubmit}>
                <Text style={styles.submitText}>{isEditing ? 'Save Changes' : 'Submit'}</Text>
              </Pressable>
            </>
          ) : (
            // If submitted and not in edit mode, show the submitted card with details
            <>
              <View style={[styles.cardContainer, { backgroundColor: 'transparent' }]}>
                <ImageBackground
                  source={getCardBackgroundImage()}
                  style={styles.cardBackgroundImage}
                  resizeMode="cover"
                >
                  <View style={styles.card}>
                    <View style={{ position: "relative", alignItems: "center" }}>
                      <Text style={styles.cardText}>Name: {name}</Text>
                      <Text style={styles.cardText}>Birthday: {birthday}</Text>
                     
                      <Text style={styles.cardText}>Message: {message}</Text>
                    </View>
                  </View>
                </ImageBackground>
              </View>

              {/* Edit Button to switch to editing mode */}
              <Pressable style={styles.editButton} onPress={handleEdit}>
                <Text style={styles.editButtonText}>Edit</Text>
              </Pressable>
            </>
          )}

          <StatusBar backgroundColor="#010709" style="light" />
        </View>
      </ScrollView>

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
  innerContainer: {
    flex: 1,
    padding: 20,
  },
  templateSelector: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  templateButton: {
    padding: 10,
    backgroundColor: "#D91656",
    borderRadius: 5,
  },
  templateButtonText: {
    color: "white",
    fontSize: 16,
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
    height: 500,
    borderRadius: 10,
    backgroundColor: "#F7F7F7", // default background color if the image is not set
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 3,
    //   height: 2,
    // },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardBackgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderRadius: 10,
    elevation: 5,
    padding: 15,
    // backgroundColor: 'rgba(255, 255, 255, 0.7)', // semi-transparent background for text visibility
  },
  cardText: {
    fontSize: 26,
    marginTop: 8,
    color: "white",
    fontFamily: "monospace",
    textAlign: "center",
  },
  editButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#D91656',
    borderRadius: 5,
    alignItems: 'center',
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
