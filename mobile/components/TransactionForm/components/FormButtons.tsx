import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { commonStyles } from '../../../theme/styles';
import { styles } from '../styles';

type FormButtonsProps = {
  onCancel: () => void;
  onSubmit: () => void;
};

export const FormButtons = ({ onCancel, onSubmit }: FormButtonsProps) => {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={[styles.button, styles.cancelButton]}
        onPress={onCancel}
      >
        <Text style={commonStyles.text.medium}>Cancel</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.submitButton]}
        onPress={onSubmit}
      >
        <Text style={[commonStyles.text.medium, { color: 'white' }]}>
          Add Transaction
        </Text>
      </Pressable>
    </View>
  );
}; 