import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { block } from 'react-native-reanimated';

import Icon from 'react-native-vector-icons/FontAwesome5';

const MyImageButton = (props) => {
	return (
		<TouchableOpacity style={[styles.button, { backgroundColor: props.btnColor }]} onPress={props.customClick}>
			<Text style={styles.text}>{props.title}</Text>
			<Icon style={styles.icon} name={props.btnIcon} size={30} color="white" />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		color: '#ffffff',
		padding: 10,
		marginLeft: 40,
		marginRight: 40,
		borderRadius: 50,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,

		alignItems: 'center',
		justifyContent: 'space-between',
	},
	text: {
		color: '#ffffff',
		marginBottom: 10,
		fontSize: 20,
		marginLeft: 20,
	},
	icon: {
		fontSize: 20,
		paddingBottom: 5,
		marginRight: 20,
	},
});

export default MyImageButton;
