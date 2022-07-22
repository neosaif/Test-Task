import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Users from '../screens/users';
import UserDetails from '../screens/userdetails';
import CreateUser from '../screens/createuser';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Users">
                <Stack.Screen name="Users" component={Users} />
                <Stack.Screen name="User Details" component={UserDetails} />
                <Stack.Screen name="Create User" component={CreateUser} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigation;