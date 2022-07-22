import React, {useState, useEffect,  useCallback} from "react";
import { View, Text, Dimensions, StyleSheet, FlatList, Image, TextInput, TouchableOpacity } from "react-native";
import { apiCallHandler } from "../api";
import { USER_LIST, DELETE_USER } from "../api/urls";
import Loader from "../components/loader";
import { filterQuery } from "../components/utils";
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';

const {height, width} = Dimensions.get('window')

const Users = ({navigation}) => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1)
    const [filterName, setFilterName] = useState()
    const [sort, setSort] = useState()
    const [order, setOrder] = useState()
    const [length, setLengh] = useState(10)

    const PageNumbers = 12

    // useEffect(() => {
    //     loadusers();
    // }, [page, sort, order]);

    useFocusEffect(
        useCallback(() => {
            loadusers();
        }, [page, sort, order])
    );

    const loadusers = async () => {
        setLoading(true)
        const queryParams = {
            '_page' : page,
            'name': filterName,
            '_sort': sort,
            '_order': order
        }
        const queryString = filterQuery(queryParams)
        const usersList = await apiCallHandler('GET',USER_LIST,queryString,'','application/json')
        if (usersList){
            setLengh(usersList.length)
            setUsers(usersList)
            setLoading(false)
        }else{
            setLoading(false)
            console.warn('somthing went wrong');
        }
    }

    const clearsearch = () => {
        setFilterName(); setSort(); setOrder();
    }

    const deleteuser = async (id) => {
        setLoading(true)
        let URL = DELETE_USER+id
        const deleted = await apiCallHandler('DELETE',URL,'','','application/json')
        if (deleted){
            loadusers()
        }else{
            setLoading(false)
            console.warn('somthing went wrong');
        }
    }

    const renderUsersList = ({item, index}) => {
        var dt = new Date(item.createdAt);
        return(
            <TouchableOpacity style={styles.centerBox} onPress={() =>
                navigation.navigate('User Details', {
                  itemId: item.id
                })}>
                <View style={styles.imageWrap}>
                    <Image source={{uri: item.avatarUrl}} style={styles.image}/>
                    <Text style={styles.ageText}>Age: {item.age}</Text>
                </View>
                <View style={styles.contentBox}>
                    <Text style={styles.nameText}>{item.name}</Text>
                    <Text style={styles.subText}>{item.statusMessage}</Text>
                    <Text style={styles.subText}>{dt.toLocaleString()}</Text>
                    <TouchableOpacity style={{padding:5,backgroundColor:"#E5E5E5",width:"100%"}}
                        onPress={()=>deleteuser(item.id)}>
                        <Text style={styles.subText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }

    const renderMoreData = () => {
        if(length == 10)
            setPage(page+1)
    }

    const pageButton = (label,value) => {
        return(
            <TouchableOpacity style={styles.paginate} onPress={()=>paginatedData(value)}>
                <Text>{label}</Text>
            </TouchableOpacity>
        )
    }

    const paginatedData = (value) => {
        if(value <= PageNumbers && value >= 1)
            setPage(value)
    }
 
    const renderFooter = () => {
        return(
            <View style={{height:height*0.05}}/>
        )
    }

    const createUser = () => {
        navigation.navigate('Create User')
    }

    return(
        <View style={styles.container}>
            {loading && <Loader/>}
            <View style={[styles.centerBox,{width:'95%'}]}>
                <View style={{width:'48.5%'}}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setFilterName}
                        value={filterName}
                        placeholder="Search by name"
                        placeholderTextColor={"#000"}
                    />
                    <View style={styles.filter}>
                        <TouchableOpacity style={styles.search} onPress={loadusers}>
                            <Text>Search</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.search} onPress={clearsearch}>
                            <Text>Clear</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{width:'48.5%'}}>
                    <View style={styles.picker}>
                        <Picker
                            key={(index) => index}
                            selectedValue={sort}
                            onValueChange={(itemValue, itemIndex) => setSort(itemValue)}
                        >
                            <Picker.Item label="Sort by" value='0'/>
                            <Picker.Item label="Age" value='age'/>
                            <Picker.Item label="Created at" value='createdAt'/>
                        </Picker>
                    </View>
                    <View style={styles.picker}>
                        <Picker
                            key={(index) => index}
                            selectedValue={order}
                            onValueChange={(itemValue, itemIndex) => setOrder(itemValue)}
                        >
                            <Picker.Item label="Sort order" value='0'/>
                            <Picker.Item label="Asc" value='asc'/>
                            <Picker.Item label="Desc" value='desc'/>
                        </Picker>
                    </View>
                    
                </View>
            </View>
            <View style={styles.screenWrap}>
                <FlatList
                    data={users}
                    keyExtractor={(item,index) => index}
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderUsersList}
                    numColumns={2}
                    ListFooterComponent={renderFooter}
                    // onEndReached={renderMoreData}
                />
            </View>
            <View style={styles.pagination}>
                <View style={{flexDirection:"row"}}>
                    {pageButton('<<<',1)}
                    {pageButton('<',page-1)}
                    {pageButton(page,page)}
                    {pageButton('>',page+1)}
                    {pageButton('>>>',11)}
                </View>
                <TouchableOpacity style={[styles.search,{width:"25%"}]} onPress={createUser}>
                    <Text style={styles.nameText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex:1, backgroundColor:'#FFF'},
    screenWrap: {backgroundColor:'#FFF',flex:1},
    centerBox: {padding:10,width:'46%',backgroundColor: '#FFFFFF', margin: 8, elevation: 2, borderWidth: width*0.002, borderColor: '#E5E5E5', flexDirection:'row',alignSelf:'center',justifyContent:"space-between"},
    imageWrap: {width:'30%', justifyContent:'center', alignItems:'center',backgroundColor:'#E5E5E5'},
    image: {width:'100%', height: 60, resizeMode:'cover'},
    ageText: {fontWeight:'bold',fontSize:width*0.025,paddingVertical:10,color:'#000'},
    contentBox: {width:"67%",justifyContent:"center",alignItems:'center'},
    nameText: {fontSize:width*0.035,fontWeight:'bold',textAlign:"center",color:'#000'},
    subText: {fontSize:width*0.023,fontWeight:'bold',textAlign:'center',color:'#000',paddingVertical:3},
    input: {height: height*.06,borderWidth: 0.5,padding: 10,color:'#000'},
    search: {height: height*.06,padding:10,backgroundColor:"#E5E5E5",marginVertical:5,justifyContent:"center",alignItems:'center',width:'48%'},
    picker: {height: height*.06,borderWidth: 0.5,backgroundColor:"#FFF",justifyContent:"center",marginBottom:5},
    filter: {width:'100%',flexDirection:"row",justifyContent:"space-between"},
    pagination: {padding:5,width:'95%',backgroundColor: '#FFFFFF', flexDirection:'row',alignSelf:'center',justifyContent:"space-between"},
    paginate: {height: height*.06,padding:10,backgroundColor:"#E5E5E5",justifyContent:"center",alignItems:"center",margin:5}
})

export default Users;