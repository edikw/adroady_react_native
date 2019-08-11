import React, { Component } from 'react';
import Login from './screens/home.js'
import Dashboard from './screens/dashboard.js'
import { createStackNavigator, createAppContainer } from "react-navigation";

const AppNavigator = createStackNavigator({
	Home: {
    	screen: Login,
    	navigationOptions: () => ({
    		header: null
		})
	},
	Dashboard: {
		screen: Dashboard,
		navigationOptions: () => ({
			title: 'Dashboard',
			headerTintColor: 'teal'
		})
	}
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
	render () {
		return <AppContainer />
	}
}
