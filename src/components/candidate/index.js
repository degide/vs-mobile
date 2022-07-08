import React from "react"
import { View } from "react-native"
import tw from 'twrnc';

export const Candidate = ({candidate})=> {
    return (
        <View>
            <Text style={tw`text-blue-500`}>{candidate.firstName}</Text>
        </View>
    );
}