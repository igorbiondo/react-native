import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import DeleteUser from './src/pages/DeleteUser';
import HomeScreen from './src/pages/HomeScreen';
import RegisterUser from './src/pages/RegisterUser';
import UpdateUser from './src/pages/UpdateUser';
import ViewAllUser from './src/pages/ViewAllUser';
import ViewUser from './src/pages/ViewUser';
import Header from './src/pages/components/header';

const Stack = createStackNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="HomeScreen" screenOptions={screenOptions}>
				<Stack.Screen
					name="HomeScreen"
					component={HomeScreen}
					options={{ header: () => <Header title="Estoque-It" /> }}
				/>
				<Stack.Screen
					name="Register"
					component={RegisterUser}
					options={{ header: () => <Header title="Registar" /> }}
				/>
				<Stack.Screen name="Update" component={UpdateUser} options={{ header: () => <Header title="Atualizar" /> }} />
				<Stack.Screen name="View" component={ViewUser} options={{ header: () => <Header title="Item" /> }} />
				<Stack.Screen
					name="ViewAll"
					component={ViewAllUser}
					options={{ header: () => <Header title="Todos os Itens" /> }}
				/>
				<Stack.Screen name="Delete" component={DeleteUser} options={{ header: () => <Header title="Excluir" /> }} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

const screenOptions = {
	headerStyle: {
		backgroundColor: '#B6F2E1',
		height: 150,
		borderBottomLeftRadius: 66.5,
		borderBottomRightRadius: 66.5,
	},
	headerTintColor: '#29444D',
	headerTitleStyle: {
		fontWeight: 'bold',
		textAlign: 'center',
		marginRight: 'auto',
		marginLeft: 'auto',
	},
};

export default App;
