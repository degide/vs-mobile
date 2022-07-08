import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import tw from 'twrnc';
import * as SecureStore from "expo-secure-store";
import { getAllCandidates } from "../apis/candidates";
import { Candidate } from '../components/candidate';

const CandidatesListScreen = ({ navigation }) => {
  const [token, setToken] = useState("");
  const [candidates, setCandidates] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  function getCandidates(token){
    setError("");
    getAllCandidates(token, page, 10).then(resBody=> {
      if(resBody.success) {
        setCandidates(resBody.data);
        setLoading(false);
      }
      else setError(resBody.message);
    });
  }

  useEffect(()=> {
    SecureStore.getItemAsync("token").then(token=> {
      if(token) {
        setToken(token);
        getCandidates(token);
      }else{
        navigation.navigate("Home");
      }
    });

    return ()=> {token}
  });

  return (
    <View style={tw`h-full w-full px-6 flex justify-start items-center bg-white`}>
        <Text style={tw`font-bold text-xl text-center mt-4`}>NEC VOTING SYSTEM</Text>
        {/* {candidates?.docs? (
          <View>
          {candidates.docs.map((candidate, index)=> (
            <Candidate key={index} candidate={candidate}/>
          ))}
        </View>
          
        ):  (
          <View style={tw`flex justify-center items-center py-24`}>
            <Text style={tw`text-red-500`}>{error}</Text>
          </View>
        )} */}
    </View>
  )
}

export default CandidatesListScreen
