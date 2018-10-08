import React from 'react';
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../components/Home';
import StatusScreen from '../components/Status';
import TransactionList from '../components/TransactionList';

const StatusNavigator = createStackNavigator({ Status: StatusScreen })
const AppStack = createBottomTabNavigator({
    Home: HomeScreen,
    Transactions: TransactionList
}, {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = `md-home`;
                } else if (routeName === 'Transactions') {
                    iconName = 'md-list'
                }
                return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: '#2f347c',
            inactiveTintColor: 'gray',
        },
    });
export default createSwitchNavigator(
    {
        App: AppStack,
        Status: StatusNavigator,
    },
    {
        initialRouteName: 'App',
    }
);