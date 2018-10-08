import React, { Component } from 'react';
import { View, TextInput, KeyboardAvoidingView, Alert, TouchableOpacity, Text, Image, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Permissions, Contacts } from 'expo';
import styles from './styles';

import fetchTxData from '../../Actions/fetchTxInfo';

class App extends Component {
    constructor() {
        super();
        this.state = {
            TxHash: '',
            ContactNumber: '',
            ContactName: ''
        }
    }
    getContact = async () => {
        // Ask for permission to query contacts.
        var contactName = this.state.ContactName;
        const permission = await Permissions.askAsync(Permissions.CONTACTS);

        if (permission.status !== 'granted') {
            // Permission was denied...
            Alert.alert("Uhoh! Seems like you haven't granted permissions to access the contacts :(");
            return;
        }
        const contacts = await Contacts.getContactsAsync({
            fields: [
                Contacts.PHONE_NUMBERS
            ],
            pageSize: 10000,
            pageOffset: 0,
        });
        if (contacts.total > 0) {
            var selectedContact = contacts.data.filter(function (contact) {
                return contact.name == contactName;
            });
            if (selectedContact.length > 1) {
                Alert.alert("Found more than 1 contact, could you specify it more?");
            } else if (selectedContact.length < 1) {
                Alert.alert("No Contact found sorry.");
            } else {
                this.setState({
                    ContactNumber: selectedContact[0].phoneNumbers[0].number
                });
                console.log(this.state.ContactNumber);
                Alert.alert(
                    `${this.state.ContactNumber}\n`,
                    `This seems to be the number,right?`
                );
            }
        }
    }
    onChangeTxHash = (value) => {
        this.setState({
            TxHash: value
        });
    }
    onChangeContactName = (value) => {
        this.setState({
            ContactName: value
        })
    }
    onSubmit = async () => {
        if (!this.state.ContactNumber) {
            Alert.alert("Uhoh! Contact Number is required!", "It wouldn't be possible to send Ethereum to nobody,right?");
        } else if (!this.state.TxHash) {
            Alert.alert("Uhoh!", "A TxHash is required!");
        } else {
            this.props.fetchTxData(this.state.TxHash);
            try {
                await AsyncStorage.setItem('TxHash', this.state.TxHash);
            } catch (error) {
                console.log(error);
            }
            this.props.navigation.navigate('Status');
        }
    }
    render() {
        const { TxStatus } = this.props;
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <Image style={{ height: 60, width: 60, marginBottom: 20 }} source={require('../../../assets/icon.png')}></Image>
                <View style={styles.inputContainer}>
                    <TextInput underlineColorAndroid='rgba(0,0,0,0)' style={styles.input} placeholder='Please Enter your TxHash' onChangeText={this.onChangeTxHash} placeholderTextColor="#8f98a9" />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput underlineColorAndroid='rgba(0,0,0,0)' style={styles.input} placeholder="Please Enter Recipient's name" onChangeText={this.onChangeContactName} placeholderTextColor="#8f98a9" />
                </View>
                <TouchableOpacity style={styles.button} onPress={this.getContact}><Text style={styles.buttonText}>Search Contact</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={this.onSubmit}><Text style={styles.buttonText}>Make the Transaction</Text></TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}
function mapStateToProps(state) {
    return {
        TxStatus: state.TxStatus
    }
}
export default connect(mapStateToProps, { fetchTxData })(App)