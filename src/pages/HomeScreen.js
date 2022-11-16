import React, { useEffect } from 'react';

import { SafeAreaView, View, Image } from 'react-native';

import { DatabaseConnection } from '../database/database-connection';
import MyImageButton from './components/MyImageButton';

const db = DatabaseConnection.getConnection();

const HomeScreen = ({ navigation }) => {
	useEffect(() => {
		db.transaction(function (txn) {
			txn.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='table_item'", [], function (tx, res) {
				console.log('item:', res.rows.length);
				if (res.rows.length == 0) {
					txn.executeSql('DROP TABLE IF EXISTS table_item', []);
					txn.executeSql(
						'CREATE TABLE IF NOT EXISTS table_item(item_id INTEGER PRIMARY KEY AUTOINCREMENT, item_name VARCHAR(20), item_quantidade INT(10), item_preco INT(10))',
						[]
					);
				}
			});
		});
	}, []);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#53A68E' }}>
			<View style={{ flex: 1, backgroundColor: '#53A68E', top: -65, paddingTop: 65 }}>
				<View style={{ flex: 1, justifyContent: 'center' }}>
					<View
						style={{
							flex: 1,
							justifyContent: 'space-evenly',
							maxHeight: 350,
						}}
					>
						<MyImageButton
							title="Registrar Item"
							btnColor="#315259"
							btnIcon="plus"
							customClick={() => navigation.navigate('Register')}
						/>

						<MyImageButton
							title="Atualizar Item"
							btnColor="#315259"
							btnIcon="pen"
							customClick={() => navigation.navigate('Update')}
						/>

						<MyImageButton
							title="Visualizar Item"
							btnColor="#315259"
							btnIcon="box"
							customClick={() => navigation.navigate('View')}
						/>
						<MyImageButton
							title="Todos os Itens"
							btnColor="#315259"
							btnIcon="list"
							customClick={() => navigation.navigate('ViewAll')}
						/>
						<MyImageButton
							title="Excluir Item"
							btnColor="#315259"
							btnIcon="trash"
							customClick={() => navigation.navigate('Delete')}
						/>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default HomeScreen;
