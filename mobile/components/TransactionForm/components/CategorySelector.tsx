import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '../../../theme/colors';
import { commonStyles } from '../../../theme/styles';
import { styles } from '../styles';

type CategorySelectorProps = {
  category: string;
  onCategoryChange: (category: string) => void;
};

export const CategorySelector = ({ category, onCategoryChange }: CategorySelectorProps) => {
  return (
    <View style={styles.inputGroup}>
      <Text style={commonStyles.text.medium}>Category</Text>
      <View style={styles.categoryButtons}>
        {Object.entries(colors.categories).map(([key, color]) => (
          <Pressable
            key={key}
            style={[
              styles.categoryButton,
              category === key && { backgroundColor: `${color}20` }
            ]}
            onPress={() => onCategoryChange(key)}
          >
            <Text style={[
              commonStyles.text.small,
              { color: category === key ? color : colors.text.primary }
            ]}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}; 