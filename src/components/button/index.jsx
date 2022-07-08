import React from 'react';
import { View, Pressable } from 'react-native';
import tw from 'twrnc';

export default function Button({ className, children, onPress }) {
    return (
        <Pressable style={tw`w-full`} onPress={onPress}>
            <View style={tw`py-3 px-6 bg-blue-500 w-full flex justify-center items-center ${className}`}>
                {children}
            </View>
        </Pressable>
    )
}