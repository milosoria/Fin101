import React, { useState, useRef } from 'react';
import {
    Modal,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Dimensions,
    PanResponder,
    Animated,
    Pressable,
    View,
    Text
} from 'react-native';
import { commonStyles } from '../../theme/styles';
import { Transaction } from '../../types';
import { TransactionFormProps } from './types';
import { styles } from './styles';
import { FormInput } from './components/FormInput';
import { TypeSelector } from './components/TypeSelector';
import { CategorySelector } from './components/CategorySelector';
import { FormButtons } from './components/FormButtons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MODAL_HEIGHT = SCREEN_HEIGHT * 0.9;

export const TransactionForm = ({ visible, onClose, onSubmit }: TransactionFormProps) => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState<'ingress' | 'egress'>('egress');
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
            amount: parseFloat(amount) * (type === 'ingress' ? 1 : -1),
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
        setType('egress');
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

                        <FormInput
                            label="Amount"
                            value={amount}
                            onChangeText={setAmount}
                            placeholder="0.00"
                            keyboardType="decimal-pad"
                        />

                        <FormInput
                            label="Description"
                            value={description}
                            onChangeText={setDescription}
                            placeholder="What was this for?"
                        />

                        <TypeSelector
                            type={type}
                            onTypeChange={setType}
                        />

                        <CategorySelector
                            category={category}
                            onCategoryChange={setCategory}
                        />

                        <FormButtons
                            onCancel={onClose}
                            onSubmit={handleSubmit}
                        />
                    </ScrollView>
                </Animated.View>
            </KeyboardAvoidingView>
        </Modal>
    );
}; 