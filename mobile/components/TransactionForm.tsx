import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Modal,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  PanResponder,
  Animated
} from 'react-native';
import { colors } from '../theme/colors';
import { commonStyles } from '../theme/styles';
import { Transaction, TransactionType } from '../types';

type TransactionFormProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (transaction: Omit<Transaction, 'id'>) => void;
};

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MODAL_HEIGHT = SCREEN_HEIGHT * 0.70

const TransactionForm = ({ visible, onClose, onSubmit }: TransactionFormProps) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState(TransactionType.EGRESS);
  const [category, setCategory] = useState('shopping');
  const translateY = useRef(new Animated.Value(MODAL_HEIGHT)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > MODAL_HEIGHT * 0.3 || gestureState.vy > 0.5) {
          Animated.timing(translateY, {
            toValue: MODAL_HEIGHT,
            duration: 300,
            useNativeDriver: true,
          }).start(onClose);
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  React.useEffect(() => {
    if (visible) {
      translateY.setValue(MODAL_HEIGHT);
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleSubmit = () => {
    if (!amount || !description) return;

    const newTransaction: Omit<Transaction, 'id'> = {
      amount: parseFloat(amount) * (type === TransactionType.INGRESS ? 1 : -1),
      type,
      category: {
        id: category,
        name: category.charAt(0).toUpperCase() + category.slice(1),
        icon: '💰'
      },
      bank: {
        id: 'manual',
        name: 'Manual',
        color: '#666666'
      },
      date: new Date(),
      description
    };

    onSubmit(newTransaction);
    setAmount('');
    setDescription('');
    setType(TransactionType.EGRESS);
    setCategory('shopping');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <Pressable
          style={styles.overlay}
          onPress={onClose}
        />
        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [{ translateY }],
              height: MODAL_HEIGHT,
            }
          ]}
          {...panResponder.panHandlers}
        >
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>

          <ScrollView style={styles.scrollView}>
            <Text style={commonStyles.text.large}>Add Transaction</Text>

            <View style={styles.inputGroup}>
              <Text style={commonStyles.text.medium}>Amount</Text>
              <TextInput
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
                placeholder="0.00"
                keyboardType="decimal-pad"
                placeholderTextColor={colors.text.tertiary}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={commonStyles.text.medium}>Description</Text>
              <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder="What was this for?"
                placeholderTextColor={colors.text.tertiary}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={commonStyles.text.medium}>Type</Text>
              <View style={styles.typeButtons}>
                <Pressable
                  style={[
                    styles.typeButton,
                    type === TransactionType.INGRESS && styles.typeButtonActive
                  ]}
                  onPress={() => setType(TransactionType.INGRESS)}
                >
                  <Text style={[
                    commonStyles.text.medium,
                    type === TransactionType.INGRESS && { color: colors.transaction.ingress }
                  ]}>
                    Income
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.typeButton,
                    type === TransactionType.EGRESS && styles.typeButtonActive
                  ]}
                  onPress={() => setType(TransactionType.EGRESS)}
                >
                  <Text style={[
                    commonStyles.text.medium,
                    type === TransactionType.EGRESS && { color: colors.transaction.egress }
                  ]}>
                    Expense
                  </Text>
                </Pressable>
              </View>
            </View>

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
                    onPress={() => setCategory(key)}
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

            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, styles.cancelButton]}
                onPress={onClose}
              >
                <Text style={commonStyles.text.medium}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.submitButton]}
                onPress={handleSubmit}
              >
                <Text style={[commonStyles.text.medium, { color: 'white' }]}>
                  Add Transaction
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.background.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  handleContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.ui.border,
    borderRadius: 2,
  },
  scrollView: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    color: colors.text.primary,
    fontSize: 16,
  },
  typeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  typeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
    backgroundColor: colors.background.secondary,
  },
  typeButtonActive: {
    borderWidth: 1,
  },
  categoryButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  categoryButton: {
    padding: 8,
    borderRadius: 8,
    margin: 4,
    backgroundColor: colors.background.secondary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  cancelButton: {
    backgroundColor: colors.background.secondary,
  },
  submitButton: {
    backgroundColor: colors.transaction.ingress,
  },
});

export default TransactionForm; 