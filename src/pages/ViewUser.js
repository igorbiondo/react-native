import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import { DatabaseConnection } from '../database/database-connection';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import Mytextinput from './components/Mytextinput';

const db = DatabaseConnection.getConnection();

const ViewItem = () => {
	let [inputItemId, setinputItemId] = useState('');
	let [itemData, setItemData] = useState({});

	let searchItem = () => {
		console.log(inputItemId);
		setItemData({});
		db.transaction((tx) => {
			tx.executeSql('SELECT * FROM table_item where item_id = ?', [inputItemId], (tx, results) => {
				var len = results.rows.length;
				console.log('len', len);
				if (len > 0) {
					setItemData(results.rows.item(0));
				} else {
					alert('Item não encontrado!');
				}
			});
		});
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#0c2c3b' }}>
			<View style={{ flex: 1, backgroundColor: '#0c2c3b', top: -65, paddingTop: 70 }}>
				<View style={{ flex: 1 }}>
					<Mytext text="Filtro do Item" />
					<Mytextinput
						placeholder="Entre com o código do Item"
						onChangeText={(inputItemId) => setinputItemId(inputItemId)}
						style={{ padding: 10, color: '#fff' }}
					/>
					<Mybutton title="Buscar Item" customClick={searchItem} />
					<View
						style={{
							marginLeft: 35,
							marginRight: 35,
							marginTop: 10,
						}}
					>
						<Text style={{ color: '#fff' }}>Código : {itemData.item_id}</Text>
						<Text style={{ color: '#fff' }}>Nome : {itemData.item_name}</Text>
						<Text style={{ color: '#fff' }}>Quantidade : {itemData.item_quantidade}</Text>
						<Text style={{ color: '#fff' }}>Preço : {itemData.item_preco}</Text>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default ViewItem;
