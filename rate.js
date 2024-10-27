import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Picker } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Languages = [
  { label: 'Bulgarian', value: 'bg' },
  { label: 'Czech', value: 'cs' },
  { label: 'Danish', value: 'da' },
  { label: 'Dutch', value: 'nl' },
  { label: 'English (American)', value: 'en-US' },
  { label: 'English (British)', value: 'en-GB' },
  { label: 'Estonian', value: 'et' },
  { label: 'Finnish', value: 'fi' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Greek', value: 'el' },
  { label: 'Hungarian', value: 'hu' },
  { label: 'Indonesian', value: 'id' },
  { label: 'Italian', value: 'it' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'ko' },
  { label: 'Latvian', value: 'lv' },
  { label: 'Lithuanian', value: 'lt' },
  { label: 'Polish', value: 'pl' },
  { label: 'Portuguese (European)', value: 'pt-PT' },
  { label: 'Portuguese (Brazilian)', value: 'pt-BR' },
  // Add more languages as needed...
];

const RateTranslations = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const navigation = useNavigation(); // Navigation hook for navigating screens

  const handleSubmit = () => {
    if (selectedLanguage) {
      // Navigate to a new screen or perform rating logic
      navigation.navigate('RatingScreen', { language: selectedLanguage });
    } else {
      alert('Please select a language');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Language:</Text>
      <Picker
        selectedValue={selectedLanguage}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
      >
        {Languages.map((lang) => (
          <Picker.Item key={lang.value} label={lang.label} value={lang.value} />
        ))}
      </Picker>

      <Button title="Rate Translation" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
});

export default RateTranslations;
