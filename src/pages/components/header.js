import { faBold } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Text, StyleSheet, Image, View } from 'react-native';
import MyImageButton from './MyImageButton';

const Header = (props) => {
	return (
		<View style={styles.container}>
			<Image style={styles.tinyLogo} source={require('../../../assets/logo.png')} />
			<Text style={styles.text}>{props.title}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 160,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#B6F2E1',
		borderBottomLeftRadius: 66.5,
		borderBottomRightRadius: 66.5,
	},
	tinyLogo: {
		width: 57,
		height: 49,
		marginBottom: 5,
	},
	text: {
		color: '#29444D',
		fontSize: 24,
		fontWeight: 'bold',
	},
});

export default Header;
