import React from 'react';
import {View, Text, Alert, ScrollView} from 'react-native';
import { Card, Button } from 'react-native-elements';
import axios from 'axios';
import Table from 'react-native-simple-table';

export default class Dashboard extends React.Component {
	constructor () {
		super()
		this.state = {
			tableHead: ['No', 'Name', 'Location'],
			tables_maps: {},
			data_chart:[],
			tables_table: {},
			render: false
		}
	}

	componentDidMount () {
		this.getDataMaps();
		this.getDataChart();
	}

	getDataMaps () {
		let data_maps = []
		let data_table = []
		axios.get('https://randomuser.me/api/?nat=NZ&results=50&inc=name,location,email,nat').then(res => {
			res.data.results.map(data => {
				data_maps.push({
					name: data.name.first,
					location: data.location.city 
				})
				if(data.name.title === 'mr') {
					data_table.push({
						name: data.name.first,
						gender: 'Male',
						location: data.location.city,
						email: data.email
					})
				}else {
					data_table.push({
						name: data.name.first,
						gender: 'Female',
						location: data.location.city,
						email: data.email
					})
				}

			});
			this.setState({tables_maps : {
				columns: [
						{
							title: 'Name',
							dataIndex: 'name',
							width: 150
						},
						{
							title: 'Location',
							dataIndex: 'location',
							width: 150
						}
					],
					rows: data_maps
				},
				tables_table: {
					columns: [
						{
							title: 'Name',
							dataIndex: 'name',
							width: 70
						},
						{
							title: 'Gender',
							dataIndex: 'gender',
							width: 70
						},
						{
							title: 'Location',
							dataIndex: 'location',
							width: 100
						},
						{
							title: 'Email',
							dataIndex: 'email',
							width: 180
						}
					],
					rows: data_table
				},
				render: true
			});
		});
	}

	getDataChart () {
		axios.get('https://randomuser.me/api/nat=NZ&results=50&inc=gender,name,location,nat&seed=abcde').then(res => {
			this.setState({data_chart: res})
		}).catch(err => {
			Alert.alert('Warning', 'Data chart is empty !')
		});
	}

	render () {
		return (
			<View>
				{this.state.render === true ?
					<View>
						<Card>
							<Text style={{marginBottom: 10}}>Chart</Text>
							<Text>Data Chart : {this.state.data_chart.length}</Text>
						</Card>
						<Card containerStyle={{height: 210}}>
							<Text style={{marginBottom: 10}}>Maps</Text>
							<Table height={150} columns={this.state.tables_maps.columns} dataSource={this.state.tables_maps.rows} />
						</Card>
						<Card containerStyle={{height: 210}}>
							<Text style={{marginBottom: 10}}>Table</Text>
							<Table height={150} columns={this.state.tables_table.columns} dataSource={this.state.tables_table.rows} />
						</Card>
					</View>
					: null
				}
			</View>
		)
	}
}