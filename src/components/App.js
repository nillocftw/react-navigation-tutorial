import 'react-native-gesture-handler'; // has to be the top according to docs

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../reducers/PeopleReducer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
            />
            <Button
                title="Go to Details w/ params"
                onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    navigation.navigate('Details', {
                        itemId: 86,
                        otherParam: 'anything you want here',
                    });
                }}
            />
        </View>
    );
}

function DetailsScreen({ route, navigation }) {
    // my little additon, becaue if not params are passed, params key does not exist
    !route.params ? route.params = {} : null;
    const { itemId } = route.params;
    const { otherParam } = route.params;
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
            {itemId ? <Text>itemId: {JSON.stringify(itemId)}</Text> : null}
            {otherParam ? <Text>otherParam: {JSON.stringify(otherParam)}</Text> : null}
            {/* this doesn't do anythign */}
            <Button
                title="Go to Details... again"
                onPress={() => navigation.navigate('Details')}
            />
            {/* but this does */}
            <Button
                title="Go to Details... again for real"
                onPress={() => navigation.push('Details')}
            />
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
            <Button title="Go back" onPress={() => navigation.goBack()} />
            <Button
                title="Go back to first screen in stack"
                onPress={() => navigation.popToTop()}
            />
        </View>
    );
}

type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <Provider store={store}>
                <NavigationContainer>

                    <Stack.Navigator initialRouteName="Home">
                        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Overview' }} />
                        <Stack.Screen name="Details" component={DetailsScreen} />
                    </Stack.Navigator>

                </NavigationContainer>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
