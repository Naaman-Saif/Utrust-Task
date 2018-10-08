import React from 'react';
import { View, Text, AsyncStorage, FlatList } from 'react-native';
import { Bubbles } from 'react-native-loader';
import { Ionicons } from '@expo/vector-icons';

export default class TransactionList extends React.Component {
    constructor() {
        super();
        this.state = {
            Transactions: 'loading'
        }
    }
    componentDidMount = () => {
        AsyncStorage.getItem("Transactions", (err, Transactions) => {
            if (err) {
                console.log(err);
            } else {
                this.setState({
                    Transactions: Transactions
                })
            }
        });
    }
    render() {
        if (this.state.Transactions == 'loading') {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Bubbles size={10} color="#2f347c" />
                </View>
            );
        }
        if (this.state.Transactions == null) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>No Transactions found</Text>
                    <Ionicons name='md-sad' size={25} color="#2f347c" />
                </View>
            )
        }
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <FlatList
                    data={this.state.Transactions}
                    renderItem={({ item,key }) => {
                        <View>
                            <Text>{item.status}</Text>
                            <Text>{item.TxHash}</Text>
                            <Text>----------------------</Text>
                        </View>
                    }}
                    keyExtractor={(item, index) => index}
                />
            </View>
        )
    }
}