import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, SafeAreaView, ScrollView, View } from 'react-native';

import { DatabaseConnection } from '../database/database-connection';
import Mybutton from './components/Mybutton';
import Mytextinput from './components/Mytextinput';

const db = DatabaseConnection.getConnection();

const RegisterItem = ({ navigation }) => {
	let [itemName, setitemName] = useState('');
	let [itemQuantidade, setitemQuantidade] = useState('');
	let [itemPreco, setitemPreco] = useState('');

	let register_item = () => {
		console.log(itemName, itemQuantidade, itemPreco);

		if (!itemName) {
			alert('Por favor preencha o nome do produto!');
			return;
		}
		if (!itemQuantidade) {
			alert('Por favor preencha a quantidade do produto!');
			return;
		}
		if (!itemPreco) {
			alert('Por favor preencha o preço do produto!');
			return;
		}

		db.transaction(function (tx) {
			tx.executeSql(
				'INSERT INTO table_item (item_name, item_quantidade, item_preco) VALUES (?,?,?)',
				[itemName, itemQuantidade, itemPreco],
				(tx, results) => {
					console.log('Results', results.rowsAffected);
					if (results.rowsAffected > 0) {
						Alert.alert(
							'Sucesso',
							'Produto Registrado com Sucesso !!!',
							[
								{
									text: 'Ok',
									onPress: () => navigation.navigate('HomeScreen'),
								},
							],
							{ cancelable: false }
						);
					} else alert('Erro ao tentar Registrar o Produto !!!');
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
							<Mytextinput
								placeholder="Nome do Produto"
								onChangeText={(itemName) => setitemName(itemName)}
								style={{ padding: 10, color: '#fff' }}
							/>
							<Mytextinput
								placeholder="Quantidade do Produto"
								onChangeText={(itemQuantidade) => setitemQuantidade(itemQuantidade)}
								maxLength={10}
								keyboardType="numeric"
								style={{ padding: 10, color: '#fff' }}
							/>
							<Mytextinput
								placeholder="Preço do Produto"
								onChangeText={(itemPreco) => setitemPreco(itemPreco)}
								maxLength={10}
								keyboardType="numeric"
								style={{ padding: 10, color: '#fff' }}
							/>
							<Mybutton title="Salvar" customClick={register_item} />
						</KeyboardAvoidingView>
					</ScrollView>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default RegisterItem;
