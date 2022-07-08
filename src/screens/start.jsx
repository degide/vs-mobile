import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import tw from 'twrnc';

const StartScreen = ({ navigation }) => {

  return (
    <View style={tw`h-full w-full px-6 flex justify-evenly items-center bg-white`}>
      <View>
        <View style={tw`flex justify-center items-center`}>
          <Image style={tw`w-[160px] h-[150px]`} source={require("../../assets/nec.jpeg")}/>
        </View>
        <Text style={tw`font-bold text-xl text-center mt-4`}>NEC VOTING SYSTEM</Text>
      </View>
      <View style={tw`w-full pr-3`}>
        <Text style={tw`font-medium text-sm text-center mt-12`}>Choose Account Type:</Text>
        <View style={tw`mt-4 flex flex-row w-full px-4`}>
          <Pressable style={tw`w-1/2`} onPress={()=> navigation.navigate('AdminLogin')}>
            <View style={tw`py-3 px-6 bg-blue-500 w-full flex justify-center items-center rounded`}>
                <Text style={tw`text-white font-bold`}>Admin</Text>
            </View>
          </Pressable>
          <Pressable style={tw`w-1/2`} onPress={()=> navigation.navigate('VoterLogin')}>
            <View style={tw`py-3 px-6 bg-green-500 w-full flex justify-center items-center rounded ml-4`}>
              <Text style={tw`text-white font-bold`}>Voter</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default StartScreen
