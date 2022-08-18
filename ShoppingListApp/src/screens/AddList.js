import React,{useState} from 'react';
import {Alert, View, TextInput, TouchableOpacity,Text} from 'react-native';
import styles from '../styles/style';


const AddList = props => {

    const [listName,setListName] = useState("")
    
    const addList = async() => {
        if(listName.length<1) {
            Alert.alert('Name of list too short')
        } else{
            const response = await fetch('http://localhost:3002/api/AddShoppingList', {
                method: 'post',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    ShoppingListName:listName
                })
            });
            const data = await response.json();
            if(data.status) {
                Alert.alert("Product succesfully added!");
            }
            else {
                Alert.alert(data.message)
                console.log(data.message)
            }
            props.navigation.navigate("Home")
        }
    }

    
    return(
        <View style={styles.container}>

                <TextInput style={styles.input}  onChangeText={(text) => setListName(text)}
                    placeholder='Enter list Name' placeholderTextColor={'#fff'}
                 />

                <TouchableOpacity  style={styles.btn} onPress={addList}>
                    <Text style={styles.txtBtn} >Add List</Text>
                </TouchableOpacity>
            </View>
    )
}


export default AddList