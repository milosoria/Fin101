import { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  RefreshControl,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import { MotiView } from 'moti';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { commonStyles } from '../theme/styles';
import TransactionForm from '../components/TransactionForm';
import { TransactionCard } from '../components/Transactions/TransactionCard';
import { BudgetProgress } from '../components/Transactions/BudgetProgress';
import { mockTransactions, mockBudget, mockTotalBalance } from '../components/Transactions/types';
import { Transaction } from '../types';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    padding: 16,
    backgroundColor: colors.background.primary,
  },
  addCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    padding: 2,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.ui.border,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
});

const TransactionsScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [transactions, setTransactions] = useState(mockTransactions);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    const transactionWithId: Transaction = {
      ...newTransaction,
      id: Date.now().toString(),
    };
    setTransactions(prev => [transactionWithId, ...prev]);
  };

  return (
    <SafeAreaView style={styles.safeArea} >
      <View style={styles.header}>
        <Text style={commonStyles.text.large}>
          ${mockTotalBalance.toLocaleString()}
        </Text>
        <Text style={commonStyles.text.secondary}>Total Balance</Text>
      </View>

      <BudgetProgress budget={mockBudget} />

      <ScrollView
        style={commonStyles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.text.tertiary}
            titleColor={colors.text.tertiary}
          />
        }
      >
        <MotiView
          from={{
            scale: 0.9,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            type: 'spring',
            delay: 500,
          }}
        >
          <Pressable
            style={styles.addCard}
            onPress={() => setShowForm(true)}
          >
            <MaterialCommunityIcons
              name="plus"
              size={20}
              color='whitesmoke'
            />
          </Pressable>
        </MotiView>

        {transactions.map((transaction, index) => (
          <TransactionCard
            key={transaction.id}
            transaction={transaction}
            index={index}
          />
        ))}
      </ScrollView>

      <TransactionForm
        visible={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleAddTransaction}
      />
    </SafeAreaView>
  );
};

export default TransactionsScreen;