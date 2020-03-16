import 'react-native-gesture-handler'; // has to be the top according to docs

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../reducers/PeopleReducer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const Stack = createStackNavigator();

function HomeScreen({ navigation, route }) {
    // create post code, not sure how this works
    // basically makes this run after component renders and post has changed.
    // the second parameter doesnt make a difference in this example.
    React.useEffect(() => {
        if (route.params?.post) {
            // Post updated, do something with `route.params.post`
            // For example, send the post to the server
        }
    }, [route.params?.post]);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Button
                    color="#fff"
                    onPress={() => navigation.navigate('CreatePost')}
                    title="Post"
                />
            ),
        });
    }, [navigation]);

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
            {/* create post code */}
            <Button
                title="Create post"
                onPress={() => navigation.navigate('CreatePost')}
            />
            { /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining */}
            {route.params?.post ? <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text> : null}
            <Button
                title="Go to Profile"
                onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    navigation.navigate('Profile', {
                        name: "Collin"
                    });
                }}
            />
        </View>
    );
}

function DetailsScreen({ navigation, route }) {
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

function CreatePostScreen({ navigation }) {
    const [postText, setPostText] = React.useState('');
    return (
        <>
            <TextInput
                multiline
                placeholder="What's on your mind?"
                style={{ margin: 10, height: 200, padding: 10, backgroundColor: 'white' }}
                value={postText}
                onChangeText={setPostText}
            />
            <Button
                title="Post"
                onPress={() => {
                    // Pass params back to home screen
                    navigation.navigate('Home', { post: postText });
                }}
            />
        </>
    );
}

function ProfileScreen({ navigation }) {
    return (
        <View style={{ margin: 20 }}>
            <Button
                title="Update the title"
                onPress={() => navigation.setOptions({ title: 'Updated!' })}
            />
        </View>
    );
}

function LogoTitle() {
    return (
        <Image
            style={{ width: 25, height: 25 }}
            source={{ uri: 'https://facebook.github.io/react-native/img/tiny_logo.png' }}
        />
    );
}


type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <Provider store={store}>
                <NavigationContainer>

                    <Stack.Navigator
                        initialRouteName="Home"
                        screenOptions={{
                            headerStyle: {
                                backgroundColor: '#1ed7f4',
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        }}
                    >
                        <Stack.Screen
                            name="Home"
                            component={HomeScreen}
                            options={{
                                headerTitle: props => <LogoTitle {...props} />,
                                title: 'Overview',
                                headerStyle: {
                                    backgroundColor: '#f4511e',
                                },
                                headerTintColor: '#fff',
                                headerTitleStyle: {
                                    fontWeight: 'bold',
                                },
                                headerRight: () => (
                                    <Button
                                        onPress={() => alert('This is a button!')}
                                        title="Alert"
                                        color="#fff"
                                    />
                                ),
                            }} />
                        <Stack.Screen name="Details" component={DetailsScreen} />
                        <Stack.Screen
                            name="CreatePost"
                            component={CreatePostScreen}
                            options={{
                                title: 'New Post',
                                headerStyle: {
                                    backgroundColor: '#f4511e',
                                },
                                headerTintColor: '#fff',
                                headerTitleStyle: {
                                    fontWeight: 'bold',
                                },
                            }} />
                        <Stack.Screen
                            name="Profile"
                            component={ProfileScreen}
                            options={({ route }) => ({ title: route.params.name + "'s Profile" })}
                        />
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
