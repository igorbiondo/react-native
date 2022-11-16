import React, { useState } from 'react';
import { Alert, SafeAreaView, View } from 'react-native';

import { DatabaseConnection } from '../database/database-connection';
import Mybutton from './components/Mybutton';
import Mytextinput from './components/Mytextinput';

const db = DatabaseConnection.getConnection();

const DeleteItem = ({ navigation }) => {
	let [inputItemId, setinputItemId] = useState('');

	let deleteItem = () => {
		db.transaction((tx) => {
			tx.executeSql('DELETE FROM  table_item where item_id=?', [inputItemId], (tx, results) => {
				console.log('Results', results.rowsAffected);
				if (results.rowsAffected > 0) {
					Alert.alert(
						'Sucesso',
						'Item excluído com Sucesso !',
						[
							{
								text: 'Ok',
								onPress: () => navigation.navigate('HomeScreen'),
							},
						],
						{ cancelable: false }
					);
				} else {
					alert('Por favor entre com um código válido !');
				}
			});
		});
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#0c2c3b' }}>
			<View style={{ flex: 1, backgroundColor: '#0c2c3b', top: -65, paddingTop: 70 }}>
				<View style={{ flex: 1 }}>
					<Mytextinput
						placeholder="Entre com o código do Item"
						onChangeText={(inputItemId) => setinputItemId(inputItemId)}
						style={{ padding: 10, color: '#fff' }}
					/>
					<Mybutton title="Excluir Item" customClick={deleteItem} />
				</View>
			</View>
		</SafeAreaView>
	);
};

export default DeleteItem;
