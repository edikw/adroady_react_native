import React from 'react'
import {View, Text, Alert} from 'react-native';
import { Input, Card, Button } from 'react-native-elements';
import axios from 'axios';

export default class Login extends React.Component {
	state = {
		username: '',
		data_login: []
	}

	componentDidMount () {
		axios.get('https://reqres.in/api/login').then(res => {
			this.setState({data_login: res.data.data})
    	});
	}

	handleInput ( value) {
		this.setState({username: value})
	}
	login () {
		if(this.state.username === '') {
			Alert.alert('Warning', 'Username not be empty ! Please try again')
		}else {
			for (var i = 0; i < this.state.data_login.length; i++) {
				if(this.state.data_login[i].name.toLowerCase() == this.state.username.toLowerCase()) {
					this.props.navigation.push('Dashboard')
					break;
				}else {
					Alert.alert('Warning', 'Username is wrong ! Please try again' )
					break;
				}
			}
		}
	}

	render () {
		return (
			<View style={{flex: 1, justifyContent: "center" }}>
				<Card>
					<Text style={{textAlign:'center', fontWeight:'bold'}}> Login</Text>
					<Input placeholder='Username' containerStyle={{marginBottom: 8}} onChangeText={this.handleInput.bind(this)}/>
					<View style={{textAlign:'right'}}>
						<Button 
							containerStyle={{padding: 8}}
						    title='Login' onPress={()=>this.login()}/>
					</View>
				</Card>
			</View>
		)
	}
}