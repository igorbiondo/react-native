import React, { useEffect, useState } from 'react';
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { DatabaseConnection } from '../database/database-connection';
import MyImageButton from './components/MyImageButton';

const db = DatabaseConnection.getConnection();
const ViewAllItems = ({ navigation }) => {
	function confirmUserUpdate(item) {
		Alert.alert('Editar Item', 'Deseja editar o item?', [
			{
				text: 'Sim',
				onPress() {
					navigation.navigate('Update', {
						itemId: item.item_id,
					});
				},
			},

			{
				text: 'Não',
			},
		]);
	}
	let [flatListItems, setFlatListItems] = useState([]);
	let [inputItemId, setinputItemId] = useState('');
	let deleteItem = (item) => {
		db.transaction((tx) => {
			tx.executeSql('DELETE FROM  table_item where item_id=?', [item.item_id], (tx, results) => {
				console.log('Results', results.rowsAffected);
				if (results.rowsAffected > 0) {
					Alert.alert(
						'Sucesso',
						'Item excluído com Sucesso !',
						[
							{
								text: 'Ok',
								onPress: () => {
									navigation.goBack(), navigation.navigate('ViewAll');
								},
							},
						],
						{ cancelable: false }
					);
				} else {
					console.log(item.item_id);
					alert('Por favor entre com um código válido !');
				}
			});
		});
	};

	const UpdateItem = ({ navigation }) => {
		let [inputItemId, setinputItemId] = useState('');
		let [itemName, setitemName] = useState('');
		let [itemQuantidade, setitemQuantidade] = useState('');
		let [itemPreco, setitemPreco] = useState('');

		let updateAllStates = (name, quantidade, preco) => {
			setitemName(name);
			setitemQuantidade(quantidade);
			setitemPreco(preco);
		};

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

		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: '#0c2c3b' }}>
				<View style={{ flex: 1, backgroundColor: '#0c2c3b', top: -65, paddingTop: 70 }}>
					<View style={{ flex: 1 }}>
						<ScrollView keyboardShouldPersistTaps="handled">
							<KeyboardAvoidingView behavior="padding" style={{ flex: 1, justifyContent: 'space-between' }}>
								<Mytext text="Filtro de Item" />
								<Mytextinput
									placeholder="Entre com o código do Item"
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
									value={itemPreco}
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

	useEffect(() => {
		db.transaction((tx) => {
			tx.executeSql('SELECT * FROM table_item', [], (tx, results) => {
				var temp = [];
				for (let i = 0; i < results.rows.length; ++i) temp.push(results.rows.item(i));
				setFlatListItems(temp);
			});
		});
	}, []);

	let listItemView = (item) => {
		return (
			<View key={item.item_id} style={styles.constainer}>
				<View>
					<Text style={styles.textheader}>Código: {item.item_id}</Text>
					<Text style={styles.textheader}>Nome do item: {item.item_name}</Text>
					<Text style={styles.textheader}>Quantidade do item: {item.item_quantidade}</Text>
					<Text style={styles.textheader}>Preço do item: R$ {item.item_preco}</Text>
				</View>
				<View
					style={{
						display: 'flex',
						height: 100,
						alignItems: 'flex-end',
						justifyContent: 'space-around',
					}}
				>
					<MyImageButton btnIcon="trash" customClick={() => deleteItem(item)} />
					<MyImageButton btnIcon="pen" customClick={() => confirmUserUpdate(item)} />
				</View>
			</View>
		);
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#0c2c3b' }}>
			<View style={{ flex: 1, backgroundColor: '#0c2c3b', top: -65, paddingTop: 70 }}>
				<View style={{ flex: 1 }}>
					<FlatList
						style={{ marginTop: 30 }}
						contentContainerStyle={{ paddingHorizontal: 20 }}
						data={flatListItems}
						keyExtractor={(item, index) => index.toString()}
						renderItem={({ item }) => listItemView(item)}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	constainer: {
		backgroundColor: '#53A68E',
		marginTop: 20,
		padding: 20,
		borderRadius: 10,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 100,
	},
	textheader: {
		color: '#fff',
		fontSize: 12,
		fontWeight: '700',
	},
	textbottom: {
		color: '#fff',
		fontSize: 18,
	},
});

export default ViewAllItems;
