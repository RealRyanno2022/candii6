import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  inputBox: {
    width: '100%', 
    color: '#FFFFFF',
    marginTop: 10,
    fontSize: 17,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
});

const CustomTextInput = ({ label, value, onChangeText, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    if (!value) setIsFocused(false);
  };

  return (
    <TextInput
      label={!isFocused && !value ? label : ""}
      value={value}
      onChangeText={onChangeText}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={styles.inputBox}
      theme={{ colors: { text: 'white', primary: 'white' }}}
      {...props}
    />
  );
}

export default CustomTextInput;