import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '../../../theme/colors';
import { commonStyles } from '../../../theme/styles';
import { styles } from '../styles';

type TypeSelectorProps = {
  type: 'ingress' | 'egress';
  onTypeChange: (type: 'ingress' | 'egress') => void;
};

export const TypeSelector = ({ type, onTypeChange }: TypeSelectorProps) => {
  return (
    <View style={styles.inputGroup}>
      <Text style={commonStyles.text.medium}>Type</Text>
      <View style={styles.typeButtons}>
        <Pressable
          style={[
            styles.typeButton,
            type === 'ingress' && styles.typeButtonActive
          ]}
          onPress={() => onTypeChange('ingress')}
        >
          <Text style={[
            commonStyles.text.medium,
            type === 'ingress' && { color: colors.transaction.ingress }
          ]}>
            Income
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.typeButton,
            type === 'egress' && styles.typeButtonActive
          ]}
          onPress={() => onTypeChange('egress')}
        >
          <Text style={[
            commonStyles.text.medium,
            type === 'egress' && { color: colors.transaction.egress }
          ]}>
            Expense
          </Text>
        </Pressable>
      </View>
    </View>
  );
}; 