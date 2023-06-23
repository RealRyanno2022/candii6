import React, { useRef } from 'react';
import { View, TextInput, TextInputProps, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import { HelperText } from 'react-native-paper';
import { StyleProp, ViewStyle } from 'react-native';

type FormInputProps = {
  control: any;
  name: string;
  label: string;
  errors: any;
  rules?: any;
  placeholder?: string; // Add placeholder prop to the interface
  setCountry?: any;
  style?: StyleProp<ViewStyle>;
};

const FormInput: React.FC<FormInputProps> = ({ style, control, name, label, errors, rules, placeholder, setCountry }) => {
  const layoutRef = useRef<number | null>(null);
  const inputRef = useRef<TextInput | null>(null);

  return (
    <View
      onLayout={event => {
        layoutRef.current = event.nativeEvent.layout.y;
      }}
    >
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={(value: string) => {
              onChange(value);
              if (setCountry) setCountry(value);
            }}
            value={value}
            ref={inputRef}
            style={styles.input}
            placeholder={placeholder} // Add placeholder prop here
          />
        )}
        name={name}
        defaultValue=""
      />
      {errors && errors[name] && <HelperText type="error">{errors[name].message}</HelperText>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    fontSize: 20,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    fontWeight: 'bold',
  },
});

export default FormInput;