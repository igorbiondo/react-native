import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, SafeAreaView, ScrollView, Text, View } from 'react-native';

import { DatabaseConnection } from '../database/database-connection';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import Mytextinput from './components/Mytextinput';

const db = DatabaseConnection.getConnection();

const UpdateItem = ({ route, navigation }) => {
	let [inputItemId, setinputItemId] = useState('');
	let [itemName, setitemName] = useState('');
	let [itemId, setitemId] = useState('');
	let [itemQuantidade, setitemQuantidade] = useState('');
	let [itemPreco, setitemPreco] = useState('');

	let updateAllStates = (name, quantidade, preco) => {
		setitemName(name);
		setitemQuantidade(quantidade);
		setitemPreco(preco);
	};

	if (route.params) {
		inputItemId = route.params.itemId;
		console.log(itemId);
	}

	let searchItem = () => {
		console.log(inputItemId);
		db.transaction((tx) => {
			tx.executeSql('SELECT * FROM table_item where item_id = ?', [inputItemId], (tx, results) => {
				var len = results.rows.length;
				if (len > 0) {
					let res = results.rows.item(0);
					updateAllStates(res.item_name, res.item_quantidade, res.item_preco);
				} else {
					alert('Item não encontrado!');
					updateAllStates('', '', '');
				}
			});
		});
	};
	let updateItem = () => {
		console.log(inputItemId, itemName, itemQuantidade, itemPreco);

		if (!inputItemId) {
			alert('Por Favor informe o código do item!');
			return;
		}
		if (!itemName) {
			alert('Por favor informe o nome do item!');
			return;
		}
		if (!itemQuantidade) {
			alert('Por Favor informe a quantidade do item!');
			return;
		}
		if (!itemPreco) {
			alert('Por Favor informe o preço do item!');
			return;
		}

		db.transaction((tx) => {
			tx.executeSql(
				'UPDATE table_item set item_name=?, item_quantidade=? , item_preco=? where item_id=?',
				[itemName, itemQuantidade, itemPreco, inputItemId],
				(tx, results) => {
					console.log('Results', results.rowsAffected);
					if (results.rowsAffected > 0) {
						Alert.alert(
							'Sucesso',
							'Item atualizado com sucesso !!',
							[
								{
									text: 'Ok',
									onPress: () => navigation.navigate('HomeScreen'),
								},
							],
							{ cancelable: false }
						);
					} else alert('Erro ao atualizar o Item');
				}
			);
		});
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#0c2c3b' }}>
			<View style={{ flex: 1, backgroundColor: '#0c2c3b', top: -65, paddingTop: 70 }}>
				<View style={{ flex: 1 }}>
					<ScrollView keyboardShouldPersistTaps="handled">
						<KeyboardAvoidingView behavior="padding" style={{ flex: 1, justifyContent: 'space-between' }}>
							<Mytext text="Filtro de Item" />
							<Mytextinput
								value={String(inputItemId)}
								placeholder={'Entre com o código do Item'}
								style={{ padding: 10, color: '#fff' }}
								onChangeText={(inputItemId) => setinputItemId(inputItemId)}
							/>
							<Mybutton title="Buscar Item" customClick={searchItem} />
							<Mytextinput
								placeholder="Entre com o nome do produto"
								value={itemName}
								style={{ padding: 10, color: '#fff' }}
								onChangeText={(itemName) => setitemName(itemName)}
							/>
							<Mytextinput
								placeholder="Entre com a quantidade do produto"
								value={'' + itemQuantidade}
								onChangeText={(itemQuantidade) => setitemQuantidade(itemQuantidade)}
								maxLength={10}
								style={{ padding: 10, color: '#fff' }}
								keyboardType="numeric"
							/>
							<Mytextinput
								value={'' + itemPreco}
								placeholder="Entre com o preço do produto"
								onChangeText={(itemPreco) => setitemPreco(itemPreco)}
								maxLength={225}
								multiline={true}
								style={{ textAlignVertical: 'top', padding: 10, color: '#fff' }}
							/>
							<Mybutton title="Atualizar Produto" customClick={updateItem} />
						</KeyboardAvoidingView>
					</ScrollView>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default UpdateItem;
