import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PRIMARY_COLOR = '#D90429';

export default function VerifyAccountScreen({ navigation }) {
  const [code, setCode] = useState(['', '', '', '']);
  const inputs = useRef([]);

  const handleInputChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Move to next input if a digit is entered
    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={28} color="black" />
      </TouchableOpacity>
      
      <View style={styles.content}>
        <Text style={styles.title}>Verify Account</Text>
        <Text style={styles.subtitle}>
          Code has been send to <Text style={{fontWeight: 'bold'}}>emma.johnson@gmail.com</Text>.
          Enter the code to verify your account.
        </Text>

        <View style={styles.codeInputContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputs.current[index] = ref)}
              style={styles.codeInput}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={(text) => handleInputChange(text, index)}
              value={digit}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.verifyButton}>
          <Text style={styles.verifyButtonText}>Verify</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
            <Text style={styles.resendText}>
            Didn&#39;t receive code?{' '}
            <Text style={styles.resendLink}>Resend code</Text>
            </Text>
            <Text style={styles.timer}>00:50</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    backButton: { position: 'absolute', top: 55, left: 20, zIndex: 1, },
    content: { flex: 1, padding: 25, paddingTop: 120, alignItems: 'center' },
    title: { fontSize: 32, fontWeight: 'bold', marginBottom: 10 },
    subtitle: { fontSize: 16, color: 'gray', textAlign: 'center', marginBottom: 40, lineHeight: 24, },
    codeInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 40,
    },
    codeInput: {
        width: 60,
        height: 60,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
    },
    verifyButton: {
        backgroundColor: PRIMARY_COLOR,
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    verifyButtonText: { fontSize: 18, fontWeight: 'bold', color: 'white', },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 30,
    },
    resendText: { color: 'gray' },
    resendLink: { color: PRIMARY_COLOR, fontWeight: 'bold' },
    timer: { color: 'gray' }
});