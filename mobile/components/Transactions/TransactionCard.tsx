import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { Transaction } from '../../types';
import { colors } from '../../theme/colors';
import { commonStyles } from '../../theme/styles';
import { Badge } from './Badge';

type TransactionCardProps = {
  transaction: Transaction;
  index: number;
};

export const TransactionCard = ({ transaction, index }: TransactionCardProps) => {
  const isIngress = transaction.type === 'ingress';

  return (
    <MotiView
      from={{
        opacity: 0,
        translateY: 50,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        translateY: 0,
        scale: 1,
      }}
      transition={{
        type: 'timing',
        duration: 500,
        delay: index * 100,
      }}
    >
      <Pressable
        style={styles.card}
        onPress={() => {
          // Add press animation
          console.log('Card pressed');
        }}
      >
        <View style={styles.cardHeader}>
          <View style={styles.badgesContainer}>
            <Badge color={transaction.bank.color}>
              {transaction.bank.name}
            </Badge>
            <Badge color={colors.categories[transaction.category.id as keyof typeof colors.categories] || colors.categories.shopping}>
              {transaction.category.icon} {transaction.category.name}
            </Badge>
          </View>
          <Text
            style={[
              styles.amountText,
              { color: isIngress ? colors.transaction.ingress : colors.transaction.egress }
            ]}
          >
            {isIngress ? '+' : '-'}${Math.abs(transaction.amount).toLocaleString()}
          </Text>
        </View>

        <Text style={styles.descriptionText}>
          {transaction.description}
        </Text>

        <Text style={styles.dateText}>
          {transaction.date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </Text>
      </Pressable>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(75, 75, 75, 0.5)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  badgesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  descriptionText: {
    color: '#CCCCCC',
    fontSize: 14,
    marginBottom: 4,
  },
  dateText: {
    color: '#666666',
    fontSize: 12,
  },
}); 