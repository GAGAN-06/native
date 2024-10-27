import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const App = () => {
  const [formData, setFormData] = useState({ language: "", message: "" });
  const [error, setError] = useState("");
  const [translation, setTranslation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [languageStats, setLanguageStats] = useState({});

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const translate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://backend-vaeh.onrender.com/translate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setTranslation(data.translatedText);
      // Update language statistics
      setLanguageStats((prevStats) => ({
        ...prevStats,
        [formData.language]: (prevStats[formData.language] || 0) + 1,
      }));
    } catch (error) {
      setError("An error occurred while translating. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnSubmit = () => {
    if (!formData.message) {
      setError("Please enter the message.");
      return;
    }

    if (!formData.language) {
      setError("Please select a language.");
      return;
    }

    translate();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Language:</Text>
      <Picker
        selectedValue={formData.language}
        onValueChange={(itemValue) => handleInputChange("language", itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Language" value="" />
        <Picker.Item label="Bulgarian" value="bg" />
        <Picker.Item label="Czech" value="cs" />
        <Picker.Item label="Danish" value="da" />
        <Picker.Item label="Dutch" value="nl" />
        <Picker.Item label="English (American)" value="en-US" />
        <Picker.Item label="English (British)" value="en-GB" />
        <Picker.Item label="Estonian" value="et" />
        <Picker.Item label="Finnish" value="fi" />
        <Picker.Item label="French" value="fr" />
        <Picker.Item label="German" value="de" />
        <Picker.Item label="Greek" value="el" />
        <Picker.Item label="Hungarian" value="hu" />
        <Picker.Item label="Indonesian" value="id" />
        <Picker.Item label="Italian" value="it" />
        <Picker.Item label="Japanese" value="ja" />
        <Picker.Item label="Korean" value="ko" />
        <Picker.Item label="Latvian" value="lv" />
        <Picker.Item label="Lithuanian" value="lt" />
        <Picker.Item label="Polish" value="pl" />
        <Picker.Item label="Portuguese (European)" value="pt-PT" />
        <Picker.Item label="Portuguese (Brazilian)" value="pt-BR" />
        <Picker.Item label="Romanian" value="ro" />
        <Picker.Item label="Russian" value="ru" />
        <Picker.Item label="Slovak" value="sk" />
        <Picker.Item label="Slovenian" value="sl" />
        <Picker.Item label="Spanish" value="es" />
        <Picker.Item label="Swedish" value="sv" />
        <Picker.Item label="Turkish" value="tr" />
        <Picker.Item label="Ukrainian" value="uk" />
        <Picker.Item label="Chinese (Simplified)" value="zh" />
        <Picker.Item label="Hindi" value="hi" />
      </Picker>

      <Text style={styles.label}>Model:</Text>
      <Picker
        selectedValue={formData.model}
        onValueChange={(itemValue) => handleInputChange("model", itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Model" value="" />
        <Picker.Item label="GPT-3.5 Turbo" value="gpt-3.5-turbo" />
        <Picker.Item label="GPT-4" value="gpt-4" />
        <Picker.Item label="GPT-4 Turbo" value="gpt-4-turbo" />
        <Picker.Item label="Gemini 1.5 Pro" value="gemini-1.5-pro" />
        <Picker.Item label="Gemini 1.5 Flash" value="gemini-1.5-flash" />
        <Picker.Item label="Gemini 1.5 Pro 2" value="gemini-1.5-pro-002" />
        <Picker.Item label="Gemini 1.5 Flash 2" value="gemini-1.5-flash-002" />
        <Picker.Item label="DeepL" value="deepl" />
      </Picker>

      <Text style={styles.label}>Message:</Text>
      <TextInput
        style={styles.input}
        value={formData.message}
        onChangeText={(text) => handleInputChange("message", text)}
        placeholder="Enter message"
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button title="Translate" onPress={handleOnSubmit} />

      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}

      {translation ? (
        <Text style={styles.translation}>Translation: {translation}</Text>
      ) : null}

      {/* Language Translation Stats Section */}
      <Text style={styles.historyTitle}>Language Translation Stats:</Text>
      {Object.entries(languageStats).map(([language, count]) => (
        <Text key={language}>
          {language}: {count} times
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  translation: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 20,
  },
  historyTitle: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: "bold",
  },
});

export default App;
