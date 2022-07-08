import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CandidatesListScreen from '../screens/candidates';
import VoterRegisterScreen from '../screens/auth/register/voter';
import VoterLoginScreen from '../screens/auth/login/voter';
import AdminLoginScreen from '../screens/auth/login/admin';
import StartScreen from '../screens/start';

const Stack = createNativeStackNavigator();
const { Navigator, Screen } = Stack;

const AppStack = () => {
  return (
    <Navigator initialRouteName="Home">
      <Screen name="Home" component={StartScreen} options={{ headerShown: true, title: "Home" }}/>
      <Screen name="VoterRegister" component={VoterRegisterScreen} options={{ headerShown: false }} />
      <Screen name="AdminLogin" component={AdminLoginScreen} options={{ headerShown: false }} />
      <Screen name="VoterLogin" component={VoterLoginScreen} options={{ headerShown: false }} />
      <Screen name="CandidatesList" component={CandidatesListScreen} options={{ headerShown: true, title: "Candidates" }} />
    </Navigator>
  );
}

export default AppStack;