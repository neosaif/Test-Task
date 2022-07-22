import React, {useState, useEffect} from "react";
import { View, Text, Dimensions, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import { CREATE_USER } from "../api/urls";
import { apiCallHandler } from "../api";
import Loader from "../components/loader";
import { Picker } from '@react-native-picker/picker';

const {height, width} = Dimensions.get('window')

const CreateUser = ({navigation}) => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState();
    const [status, setStatus] = useState();
    const [email, setEmail] = useState();
    const [age, setAge] = useState();
    const [bio, setBio] = useState();
    
    const createuser = async () => {
        setLoading(true)
        var data = JSON.stringify({
            "name": name,
            "statusMessage": status,
            "age": age,
            "createdAt" :new Date(),
            "avatarUrl": 'https://i.pravatar.cc/150?u=40792',
            "bio": bio,
            "color": '#FFFF',
            "email": email,
            "isPublic": true,
          });
        const success = await apiCallHandler('POST',CREATE_USER,'',data,'application/json')
        if (success){
            setLoading(false)
            navigation.navigate('Users')
        }else{
            setLoading(false)
            console.warn('somthing went wrong');
        }
    }

    return(
        <View style={styles.container}>
            {loading && <Loader/>}
            <View style={styles.centerBox}>
                <TextInput
                    style={styles.input}
                    onChangeText={setName}
                    value={name}
                    placeholder="Name"
                    placeholderTextColor={"#000"}
                />  
                <View style={styles.picker}>
                    <Picker
                        key={(index) => index}
                        selectedValue={status}
                        onValueChange={(itemValue, itemIndex) => setStatus(itemValue)}
                    >
                        <Picker.Item label="Status Messege" value='0'/>
                        <Picker.Item label="Working from home" value='working from home'/>
                        <Picker.Item label="Watching Netflix" value='atching Netflix'/>
                    </Picker>
                </View>  
                <TextInput
                    style={styles.input}
                    onChangeText={setAge}
                    value={age}
                    placeholder="Age"
                    placeholderTextColor={"#000"}
                    keyboardType='number-pad'
                />  
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Email"
                    placeholderTextColor={"#000"}
                />  
                <TextInput
                    style={styles.input}
                    onChangeText={setBio}
                    value={bio}
                    placeholder="Bio"
                    placeholderTextColor={"#000"}
                />
                <TouchableOpacity style={styles.search} onPress={createuser}>
                    <Text>Create</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    search: {height: height*.06,padding:10,backgroundColor:"#E5E5E5",marginVertical:5,justifyContent:"center",alignItems:'center',width:'48%',alignSelf:"center"},
    input: {height: height*.06,borderWidth: 0.5,padding: 10,color:'#000'},
    container: {flex:1, backgroundColor:'#FFF'},
    centerBox: {padding:10,width:'95%',backgroundColor: '#FFFFFF', margin: 8, elevation: 2, borderWidth: width*0.002, borderColor: '#E5E5E5',alignSelf:'center',justifyContent:"space-between"},
    picker: {height: height*.06,borderWidth: 0.5,backgroundColor:"#FFF",justifyContent:"center"},

})

export default CreateUser;