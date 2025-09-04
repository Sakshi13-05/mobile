import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, Platform, PermissionsAndroid } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

const HospitalRegistration: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    occupation: '',
    caption: '',
  });
  const [file, setFile] = useState<any>(null);

  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission',
              message: 'App needs access to your storage to select files',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Storage permission denied');
          }
        } catch (err) {
          console.warn('Error requesting permission:', err);
        }
      }
    };
    requestPermissions();
  }, []);

  const handleChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    // Check that all fields are filled
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.age.trim() ||
      !form.gender.trim() ||
      !form.occupation.trim() ||
      !form.caption.trim() ||
      !file
    ) {
      Alert.alert("Error", "Please fill in all fields and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("age", form.age);
    formData.append("gender", form.gender);
    formData.append("occupation", form.occupation);
    formData.append("caption", form.caption);
    formData.append("file", {
      uri: file.uri,
      type: file.type,
      name: file.fileName || 'file.jpg',
    }as any);

    try {
      // Replace with your server IP
      await axios.post("http://192.168.0.102:3000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Alert.alert("Success", "Form submitted successfully!");
      setForm({ name: '', email: '', age: '', gender: '', occupation: '', caption: '' });
      setFile(null);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to submit form.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>User Information Form</Text>

      <TextInput style={styles.input} placeholder="Name" value={form.name} onChangeText={text => handleChange('name', text)} />
      <TextInput style={styles.input} placeholder="Email" value={form.email} keyboardType="email-address" onChangeText={text => handleChange('email', text)} />
      <TextInput style={styles.input} placeholder="Age" value={form.age} keyboardType="numeric" onChangeText={text => handleChange('age', text)} />
      <TextInput style={styles.input} placeholder="Gender" value={form.gender} onChangeText={text => handleChange('gender', text)} />
      <TextInput style={styles.input} placeholder="Occupation" value={form.occupation} onChangeText={text => handleChange('occupation', text)} />
      <TextInput style={styles.input} placeholder="Caption" value={form.caption} onChangeText={text => handleChange('caption', text)} />

      <View style={styles.buttonContainer}>
        <Button
          title={file ? "Change Selected Image" : "Select Image"}
          onPress={async () => {
            try {
              const result = await launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 });
              if (result.assets && result.assets.length > 0) {
                setFile(result.assets[0]);
                Alert.alert('Image Selected', result.assets[0].fileName || 'Image selected');
              }
            } catch (err) {
              Alert.alert('Error', 'Failed to pick image');
            }
          }}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  buttonContainer: {
    marginBottom: 16,
  },
});

export default HospitalRegistration;


// Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass