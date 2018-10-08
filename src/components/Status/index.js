import React, { Component } from 'react';
import { View, Text, Alert, AsyncStorage, Button } from 'react-native';
import { connect } from 'react-redux';
import { Bubbles, DoubleBounce } from 'react-native-loader'
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';
import { Notifications } from 'expo';

import fetchTxData from '../../Actions/fetchTxInfo';

class StatusScreen extends Component {
    static navigationOptions = {
        header: null
    }
    constructor() {
        super();
        this.state = {
            TxHash: ''
        }

    }
    componentWillMount = async () => {
        try {
            const TxHash = await AsyncStorage.getItem('TxHash');
            if (TxHash !== null) {
                this.setState({
                    TxHash: TxHash
                })
                await AsyncStorage.removeItem("TxHash");
            }
        } catch (error) {
            console.log(error);
        }
        this.checkStatus();
    }
    saveTransaction = async (status) => {
        try {
            var Transactions = await AsyncStorage.getItem("Transactions");
            if (Transactions == null) {
                var TransactionLists = JSON.stringify([{ status: status, TxHash: this.state.TxHash }]);
                await AsyncStorage.setItem("Transactions", TransactionLists);
            } else {
                Transactions = JSON.parse(Transactions); //Necessary to make changes in JS
                Transactions.push({ status: status, TxHash: this.state.TxHash });
            }
        } catch (err) {
            console.log(err);
        }
    }
    checkTransaction = async () => {
        const { TxStatus } = this.props;
        if (!TxStatus.isFetching) {
            if (TxStatus.data.result != undefined && TxStatus.data.result != null) {
                if (TxStatus.data.result.status == "0x0") {
                    this.saveTransaction("Failed");
                } else {
                    this.saveTransaction("Success");
                }
            }
        }
    }
    componentDidUpdate = () => {
        this.checkTransaction();
    }
    checkStatus = () => {
        const { TxStatus } = this.props;
        var localNotification = {
            title: '',
            body: '',
            ios: {
                sound: true
            },
            android:
            {
                sound: true,
                color: "#F00",
                priority: 'high',
                vibrate: true
            }
        };
        var t = new Date();
        t.setSeconds(t.getSeconds() + 1);
        const schedulingOptions = {
            time: t
        };
        if (!TxStatus.isFetching) {
            if (TxStatus.data.error) {
                if (TxStatus.data.error.code == -32602) {
                    Alert.alert("Invalid TxHash!");
                    // this.props.navigation.navigate('Home');
                }
            } else if (TxStatus.data.result == null) {
                setTimeout(() => {
                    this.props.fetchTxData(this.state.TxHash);
                    this.checkStatus();
                }, 1000 * 10);
            } else if (TxStatus.data.result.status == "0x0") {
                localNotification.title = 'Transaction Failed!';
                localNotification.body = 'Your Transaction failed! :(';
                Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
            } else {
                localNotification.title = 'Transaction Success!';
                localNotification.body = 'Your Transaction was successful! :D';
                Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
            }
        }
    }
    render() {
        const { TxStatus } = this.props;
        const { navigate } = this.props.navigation;
        if (TxStatus.isFetching) {
            return (
                <View style={styles.container}>
                    <Bubbles size={10} color="#2f347c" />
                </View>
            )
        }
        if (TxStatus.hasError) {
            return (
                <View style={styles.container}>
                    <Ionicons name="md-close-circle" size={100} color="red" />
                    <Text style={styles.statusText}>Transaction Failed! :(</Text>
                    <Button title="Go back" onPress={() => navigate("Home")} />
                </View>
            );
        }
        if (TxStatus.data.result == null) {
            return (
                <View style={styles.container}>
                    <DoubleBounce size={30} color="#2f347c" />
                    <Text style={styles.statusText}> Transaction Pending</Text>
                    <Text>Leaving the screen would make the progress lose.</Text>
                    <Button title="Go back" onPress={() => navigate("Home")} />
                </View>
            )
        }
        if (TxStatus.data.result.status == "0x0") {
            return (
                <View style={styles.container}>
                    <Ionicons name="md-close-circle" size={100} color="red" />
                    <Text style={styles.statusText}>Transaction Failed! :(</Text>
                    <Button title="Go back" onPress={() => navigate("Home")} />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <Ionicons name="md-checkmark-circle" size={100} color="green" />
                <Text style={styles.statusText}> Your Transaction is confirmed!!!</Text>
                <Button title="Go back" onPress={() => navigate("Home")} />
            </View>
        )
    }
}
function mapStateToProps(state) {
    return {
        TxStatus: state.TxStatus
    }
}
export default connect(mapStateToProps, { fetchTxData })(StatusScreen)