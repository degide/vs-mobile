import React, { useEffect, useState } from "react";
import { Text, View, Pressable } from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import tw from 'twrnc';
import * as SecureStore from 'expo-secure-store';

import Button from "../../../components/button";
import { voterLogin } from "../../../apis/auth";
import Input from "../../../components/input";

const VoterLogin = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [authError, setAuthError] = useState("");

    const initialValues = {
        email: '',
        password: ''
    }
    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email").required('Email is required'),
        password: Yup.string().required('Password is required'),
    })

    const formik = useFormik({
        initialValues,
        validationSchema
    })

    const { handleChange, handleBlur, values, errors, touched, isValid, getFieldProps } = formik;

    const handleSubmit = async () => {
        if(!isValid) return;
        setLoading(true);
        setAuthError("");
        const res = await voterLogin(values);
        setLoading(false);
        if (!res?.success) return setAuthError(res?.message || "Something went wrong");
        await SecureStore.setItemAsync('token', JSON.stringify(res));
        await SecureStore.setItemAsync("user-type", "VOTER");
        navigation.navigate('CandidatesList');
    }

    return (
        <View style={tw`h-[100%] bg-white  justify-end items-center`}>
            <View style={tw`h-[85%] w-full bg-white `}>
                <View style={tw`w-full`}>
                    <Text style={tw`text-center text-blue-500 font-extrabold text-xl`}>NEC VOTING SYSTEM</Text>
                    <Text style={tw`text-center font-extrabold text-lg mt-4`}>Login to continue</Text>
                </View>
                <View style={tw`mt-8`}>
                    <View style={tw`px-6 py-2`}>
                        <View style={tw`mt-4`}>
                        </View>
                        <Input
                            Icon={<Feather name="mail" size={24} color="silver" />}
                            placeholder="Your Email"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            borderColor={touched.email && errors.email ? 'red' : 'gray'}
                        />
                        {touched.email && errors.email && <Text style={tw`text-red-500`}>{errors.email}</Text>}

                        <View style={tw`mt-4`}>
                            <Input
                                Icon={<Feather name="lock" size={24} color="silver" />}
                                placeholder="Password"
                                security={true}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                borderColor={touched.password && errors.password ? 'red' : 'gray'}
                            />
                            {touched.password && errors.password && <Text style={tw`text-red-500`}>{errors.password}</Text>}
                        </View>
                        
                        {authError.length > 0 && <Text style={tw`mt-4 text-red-500 text-center`}>{authError}</Text>}

                        <View style={tw`mt-8`}>
                            <Button
                                className={"bg-blue-500 w-full px-10 py-3 mt-4 rounded"}
                                onPress={handleSubmit}
                            >
                                <Text style={tw`text-white font-bold`}>{loading ? "Logging in ..." : "Login"}</Text>
                            </Button>
                            <Pressable onPress={() => navigation.navigate('VoterRegister')}>
                                <View style={tw`mt-4`}>
                                    <Text style={tw`text-blue-500 mt-4 text-center`}>Have no voting account? Register.</Text>
                                </View>
                            </Pressable>
                            <Pressable onPress={() => navigation.navigate('Home')}>
                                <View style={tw`mt-4`}>
                                    <Text style={tw`text-blue-500 mt-4 text-center`}>Back to start</Text>
                                </View>
                            </Pressable>
                        </View>

                    </View>
                </View>
            </View>
        </View>
    )
}

export default VoterLogin;