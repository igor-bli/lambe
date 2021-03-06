import React from 'react'
import { 
    createStackNavigator,
    createAppContainer,
    createSwitchNavigator,
    createBottomTabNavigator   
} from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'
//import { createBottomTabNavigator } from 'react-navigation-tabs';
//import { createAppContainer } from '@react-navigation/native';
//import { createStackNavigator } from 'react-navigation-stack';

import Splash from './screens/Splash'
import Feed from './screens/Feed'
import AddPhoto from './screens/AddPhoto'
import Profile from './screens/Profile'
import Login from './screens/Login'
import Register from './screens/Register'
import ChartLambe from './screens/ChartLambe'
//import { tsIntersectionType } from '@babel/types';

const authRouter = createStackNavigator({
    Login: { screen: Login, navigationOptions: { title: 'Login' } },
    Register: { screen: Register, navigationOptions: { title: 'Register' } }
},{
    initialRouteName: 'Login'
})

const loginOrProfileRouter = createSwitchNavigator({
    Profile: Profile,
    Auth: authRouter
},{
    initialRouteName: 'Auth'
})

const MenuRoutes = createBottomTabNavigator({

    Feed: {
        name: 'Feed',
        screen: Feed,
        navigationOptions: {
            title: 'Feed',
            tabBarIcon: ({ tintColor: color }) =>
                <Icon name = 'home' size={30} color={color} />
        }
    },

    Add: {
        name: 'AddPhoto',
        screen: AddPhoto,
        navigationOptions: {
            title: 'Add Picture',
            tabBarIcon: ({ tintColor }) =>
                <Icon name ='camera' size={30} color={tintColor} />
        }
    },

    Profile: {
        name: 'Profile',
        screen: loginOrProfileRouter,
        navigationOptions: {
            title: 'Profile',
            tabBarIcon: ({ tintColor }) =>
                <Icon name ='user' size={30} color={tintColor} />
        }
    },

    ChartLambe: {
        name: 'ChartLambe',
        screen: ChartLambe,
        navigationOptions: {
            title: 'Gráfico do projeto',
            tabBarIcon: ({ tintColor }) =>
                <Icon name = 'pie-chart' size={30} color={tintColor} />
        }
    },
},

{        
    tabBarOptions: {
        showLabel: false,
    },
    initialRouteName: 'Feed',

});

const MenuConfig = {
    initialRouteName: 'Feed',
    tabBarOptions: {
        showLabel: false,
    }
}

//console.disableYellowBox = true;
const MenuNavigator = createAppContainer(MenuRoutes, MenuConfig)

const SplashRouter = createSwitchNavigator  (
    {
        Splash: Splash,
        App: MenuNavigator
    },

    {
        initialRouteName: 'Splash'
    }
);

export default createAppContainer(SplashRouter)
