import React, { useState } from "react";
import { Text, View, Pressable, ScrollView } from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import tw from 'twrnc';
import Button from "../../../components/button";
import Input from "../../../components/input";
import { voterRegister } from "../../../apis/auth";

const VoterSignUp = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [authError, setAuthError] = useState("");

    const initialValues = {
        firstName: "",
        middleName: "",
        lastName: "",
        phone: "",
        national_id: "",
        address: "",
        email: "",
        password: ""
    }
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().min(3).max(40).required(),
        middleName: Yup.string().max(40).optional(),
        lastName: Yup.string().min(3).max(40).required(),
        phone: Yup.string().min(10).max(13).required(),
        national_id: Yup.string().min(16).max(16).required(),
        address: Yup.string().min(3).max(200).required(),
        email: Yup.string().email().max(40).required(),
        password: Yup.string().min(6).max(80).required()
    })

    const formik = useFormik({
        initialValues,
        validationSchema
    })

    const { handleChange, handleBlur, values, errors, touched, isValid, getFieldProps } = formik;

    const handleSubmit = async () => {
        if (!isValid) return;
        setLoading(true);
        setAuthError("");
        let data;
        if(values.middleName) {
            data = values;
        }else{
            data = {...values};
            delete data.middleName;
        }
        const res = await voterRegister(data);
        setLoading(false);
        if (!res?.success) return setAuthError(res?.message || "Something went wrong");
        navigation.navigate('VoterLogin');
    }


    return (
        <View style={tw`h-full bg-white  justify-end items-center`}>
            <ScrollView style={tw`h-full w-full bg-white`}>
                <View style={tw`w-full`}>
                    <Text style={tw`text-center font-extrabold text-xl text-blue-500 mt-12`}>NEC VOTING SYSTEM</Text>
                    <Text style={tw`text-center font-extrabold text-xl mt-6`}>Create A Voter Account</Text>
                </View>
                <View style={tw`mt-2`}>
                    <View style={tw`px-6 py-2`}>
                        <View>
                            <Input
                                Icon={<MaterialIcons name="person-outline" size={20} color="silver" />}
                                placeholder="First Name"
                                onChangeText={handleChange('firstName')}
                                onBlur={handleBlur('firstName')}
                                value={values.firstName}
                                borderColor={touched.firstName && errors.firstName ? 'red' : 'gray'}
                            />
                            {touched.firstName && errors.firstName && (<Text style={tw`text-red-500 mt-2`}>*{errors.firstName}*</Text>)}
                        </View>
                        <View style={tw`mt-4`}>
                            <Input
                                Icon={<MaterialIcons name="person-outline" size={20} color="silver" />}
                                placeholder="Middle Name"
                                onChangeText={handleChange('middleName')}
                                onBlur={handleBlur('middleName')}
                                value={values.middleName}
                                borderColor={touched.middleName && errors.middleName ? 'red' : 'gray'}
                            />
                            {touched.middleName && errors.middleName && (<Text style={tw`text-red-500 mt-2`}>*{errors.middleName}*</Text>)}
                        </View>
                        <View style={tw`mt-4`}>
                            <Input
                                Icon={<MaterialIcons name="person-outline" size={20} color="silver" />}
                                placeholder="Last Name"
                                onChangeText={handleChange('lastName')}
                                onBlur={handleBlur('lastName')}
                                value={values.lastName}
                                borderColor={touched.lastName && errors.lastName ? 'red' : 'gray'}
                            />
                            {touched.lastName && errors.lastName && (<Text style={tw`text-red-500 mt-2`}>*{errors.lastName}*</Text>)}
                        </View>
                        <View style={tw`mt-4`}>
                            <Input
                                Icon={<MaterialIcons name="card-membership" size={20} color="silver" />}
                                placeholder="National ID"
                                onChangeText={handleChange('national_id')}
                                onBlur={handleBlur('national_id')}
                                value={values.national_id}
                                borderColor={touched.national_id && errors.national_id ? 'red' : 'gray'}
                            />
                            {touched.national_id && errors.national_id && (<Text style={tw`text-red-500 mt-2`}>*{errors.national_id}*</Text>)}
                        </View>
                        <View style={tw`mt-4`}>
                            <Input
                                Icon={<MaterialIcons name="phone" size={20} color="silver" />}
                                placeholder="Phone Number"
                                onChangeText={handleChange('phone')}
                                onBlur={handleBlur('phone')}
                                value={values.phone}
                                borderColor={touched.phone && errors.phone ? 'red' : 'gray'}
                            />
                            {touched.phone && errors.phone && (<Text style={tw`text-red-500 mt-2`}>*{errors.phone}*</Text>)}
                        </View>
                        <View style={tw`mt-4`}>
                            <Input
                                Icon={<MaterialIcons name="location-pin" size={20} color="silver" />}
                                placeholder="Address"
                                onChangeText={handleChange('address')}
                                onBlur={handleBlur('address')}
                                value={values.address}
                                borderColor={touched.address && errors.address ? 'red' : 'gray'}
                            />
                            {touched.address && errors.address && (<Text style={tw`text-red-500 mt-2`}>*{errors.address}*</Text>)}
                        </View>
                        <View style={tw`mt-4`}>
                            <Input
                                Icon={<Feather name="mail" size={20} color="silver" />}
                                placeholder="Your Email"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                borderColor={touched.email && errors.email ? 'red' : 'gray'}
                            />
                            {touched.email && errors.email && <Text style={tw`text-red-500 mt-2`}>*{errors.email}*</Text>}
                        </View>
                        <View style={tw`mt-4`}>
                            <Input
                                Icon={<Feather name="lock" size={20} color="silver" />}
                                placeholder="Password"
                                security={true}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                borderColor={touched.password && errors.password ? 'red' : 'gray'}
                            />
                            {touched.password && errors.password && <Text style={tw`text-red-500 mt-2`}>*{errors.password}*</Text>}
                        </View>

                        {authError.length > 0 && <Text style={tw`mt-4 text-red-500 text-center`}>{authError}</Text>}

                        <View style={tw`mt-4`}>
                            <Button
                                className={"bg-blue-500 w-full px-10 py-3 mt-4 rounded"}
                                onPress={handleSubmit}
                            >
                                <Text style={tw`text-white font-bold`}>{loading ? "Registering..." : "Register"}</Text>
                            </Button>

                            <Pressable onPress={() => navigation.navigate('VoterLogin')}>
                                <View style={tw`mt-4`}>
                                    <Text style={tw`text-blue-500 mt-4 text-center mb-4`}>Have a voter account? Login</Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default VoterSignUp;