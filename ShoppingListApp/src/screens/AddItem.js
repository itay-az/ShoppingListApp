import React,{useState} from 'react';
import {Alert, View, TextInput, TouchableOpacity,Text} from 'react-native';
import styles from '../styles/style';


const AddItem = props => {

    const [itemName,setItemName] = useState("")
    
    const addList = async() => {
        if(itemName.length<1) {
            Alert.alert('Name of item too short')
        } else{
            const listId = props.route.params.list.list._id
            const response = await fetch(`http://localhost:3002/api//updateShoppingList/${listId}`, {
                method: 'put',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    name:itemName
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
             props.navigation.navigate("ShoppingListDetails",{list:props.route.params.list.list})
        }
    }

    
    return(
        <View style={styles.container}>

                <TextInput style={styles.input}  onChangeText={(text) => setItemName(text)}
                    placeholder='Enter item Name' placeholderTextColor={'#fff'}
                 />

                <TouchableOpacity  style={styles.btn} onPress={addList}>
                    <Text style={styles.txtBtn} >Add Item</Text>
                </TouchableOpacity>
            </View>
    )
}


export default AddItem;