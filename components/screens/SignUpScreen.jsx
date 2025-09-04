import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PRIMARY_COLOR = '#D90429';

export default function SignUpScreen({ navigation }) {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>SignUp</Text>
        <Text style={styles.subtitle}>Please signup to continue our app</Text>

        <TextInput style={styles.input} placeholder="Emma Johnson" />
        <TextInput style={styles.input} placeholder="emma.johnson@gmail.com" keyboardType="email-address" />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
            <Ionicons name={isPasswordVisible ? "eye-off" : "eye"} size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirm Password"
            secureTextEntry={!isConfirmPasswordVisible}
          />
          <TouchableOpacity onPress={() => setConfirmPasswordVisible(!isConfirmPasswordVisible)}>
            <Ionicons name={isConfirmPasswordVisible ? "eye-off" : "eye"} size={24} color="gray" />
          </TouchableOpacity>
        </View>
        <Text style={styles.hint}>Password must be 8 character</Text>

        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => navigation.navigate('VerifyAccount')}
        >
          <Text style={styles.signupButtonText}>SignUp</Text>
        </TouchableOpacity>

        <Text style={styles.loginText}>
          If you already have an account, please{' '}
          <Text style={styles.loginLink} onPress={() => { /* TODO: Navigate to Login */ }}>
            Log in
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    content: { flex: 1, padding: 25, paddingTop: 60, },
    title: { fontSize: 32, fontWeight: 'bold', marginBottom: 10, },
    subtitle: { fontSize: 16, color: 'gray', marginBottom: 40, },
    input: {
        backgroundColor: '#F6F7FB',
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 20,
    },
    passwordContainer: {
        backgroundColor: '#F6F7FB',
        height: 58,
        marginBottom: 10,
        borderRadius: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    passwordInput: { flex: 1, fontSize: 16, },
    hint: { fontSize: 13, color: 'gray', alignSelf: 'flex-start', marginLeft: 5, marginBottom: 30, },
    signupButton: {
        backgroundColor: PRIMARY_COLOR,
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    signupButtonText: { fontSize: 18, fontWeight: 'bold', color: 'white', },
    loginText: { marginTop: 40, textAlign: 'center', color: 'gray', },
    loginLink: { color: PRIMARY_COLOR, fontWeight: 'bold', },
});