import React, {useState, useEffect} from "react";
import { View, Text, Dimensions, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import {USER_DETAILS,UPDATE_USER } from "../api/urls";
import { apiCallHandler } from "../api";
import Loader from "../components/loader";
import { Picker } from '@react-native-picker/picker';

const {height, width} = Dimensions.get('window')

const UserDetails = ({route,navigation}) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const [Id, setId] = useState();
    const [name, setName] = useState();
    const [status, setStatus] = useState('working from home');
    const [email, setEmail] = useState();
    const [bio, setBio] = useState();
    const [age, setage] = useState();
    
    useEffect(() => {
        const { itemId } = route.params;
        setId(itemId)
        loaduserdata(itemId)
    },[])

    const loaduserdata = async (id) => {
        setLoading(true)
        let URL = USER_DETAILS+id
        const usersDetail = await apiCallHandler('GET',URL,'','','application/json')
        if (usersDetail){
            setData(usersDetail)
            setName(usersDetail.name); setStatus(usersDetail.statusMessage);
            setEmail(usersDetail.email); 
            setBio(usersDetail.bio);
            setage(usersDetail.age);
            setLoading(false)
        }else{
            setLoading(false)
            console.warn('somthing went wrong');
        }
    }

    const savechanges = async () => {
        setLoading(true)
        var updatedata = JSON.stringify({
            "age": age,
            "avatarUrl": data.avatarUrl,
            "bio": bio,
            "color": data.color,
            "createdAt": data.createdAt,
            "email": email,
            "isPublic": data.isPublic,
            "name": name,
            "statusMessage": status
        });
        let URL = UPDATE_USER+Id
        const success = await apiCallHandler('PUT',URL,'',updatedata,'application/json')
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
            {data ?
            <View>
                <View style={styles.centerBox}>
                    <View style={styles.imageWrap}>
                        <Image source={{uri: data.avatarUrl}} style={styles.image}/>
                    </View>
                    <View style={styles.contentBox}>
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
                                <Picker.Item label="Working from home" value='working from home'/>
                                <Picker.Item label="Watching Netflix" value='atching Netflix'/>
                            </Picker>
                        </View>  
                        <TextInput
                            style={styles.input}
                            onChangeText={setEmail}
                            value={email}
                            placeholder="Email"
                            placeholderTextColor={"#000"}
                        />  
                        <TextInput
                            keyboardType="numeric"
                            style={styles.input}
                            onChangeText={setage}
                            value={age? age.toString() : ''}
                            placeholder="Age"
                            placeholderTextColor={"#000"}
                        />  
                        <TextInput
                            style={styles.input}
                            onChangeText={setBio}
                            value={bio}
                            placeholder="Bio"
                            placeholderTextColor={"#000"}
                        />
                    </View>
                </View>
                <TouchableOpacity style={styles.search} onPress={savechanges}>
                    <Text>Save</Text>
                </TouchableOpacity>
            </View>
            :null}
        </View>
    )
}

const styles = StyleSheet.create({
    search: {height: height*.06,padding:10,backgroundColor:"#E5E5E5",marginVertical:5,justifyContent:"center",alignItems:'center',width:'48%',alignSelf:"center"},
    input: {height: height*.06,borderWidth: 0.5,padding: 10,color:'#000'},
    container: {flex:1, backgroundColor:'#FFF'},
    centerBox: {padding:10,width:'95%',backgroundColor: '#FFFFFF', margin: 8, elevation: 2, borderWidth: width*0.002, borderColor: '#E5E5E5', flexDirection:'row',alignSelf:'center',justifyContent:"space-between"},
    imageWrap: {width:'30%', justifyContent:'center', alignItems:'center',backgroundColor:'#E5E5E5'},
    image: {width:'100%', height: height*0.22, resizeMode:'cover'},
    contentBox: {width:"67%"},
    nameText: {fontSize:width*0.04,fontWeight:'bold',color:'#000'},
    subText: {fontSize:width*0.025,fontWeight:'bold',color:'#000',paddingVertical:5},
    picker: {height: height*.06,borderWidth: 0.5,backgroundColor:"#FFF",justifyContent:"center"},
})

export default UserDetails;