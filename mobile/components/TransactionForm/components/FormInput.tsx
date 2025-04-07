import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { colors } from '../../../theme/colors';
import { commonStyles } from '../../../theme/styles';
import { styles } from '../styles';

type FormInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: 'default' | 'decimal-pad';
};

export const FormInput = ({ 
  label, 
  value, 
  onChangeText, 
  placeholder,
  keyboardType = 'default'
}: FormInputProps) => {
  return (
    <View style={styles.inputGroup}>
      <Text style={commonStyles.text.medium}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        placeholderTextColor={colors.text.tertiary}
      />
    </View>
  );
}; 