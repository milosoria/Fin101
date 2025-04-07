import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

type BudgetProgressProps = {
  budget: {
    amount: number;
    startDate: Date;
    endDate: Date;
    spent: number;
    remaining: number;
  };
};

export const BudgetProgress = ({ budget }: BudgetProgressProps) => {
  const progress = (budget.spent / budget.amount) * 100;

  return (
    <View style={styles.budgetContainer}>
      <View style={styles.budgetHeader}>
        <Text style={styles.budgetText}>Monthly Budget</Text>
        <Text style={styles.budgetText}>
          ${budget.remaining.toLocaleString()} remaining
        </Text>
      </View>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${progress}%` }
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  budgetContainer: {
    backgroundColor: '#2C2C2C',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.ui.border,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  budgetText: {
    color: 'white',
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#1E1E1E',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2196F3',
    borderRadius: 4,
  },
}); 