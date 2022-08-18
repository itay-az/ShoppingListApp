import React from 'react';
import {TouchableOpacity,Text,View, Alert} from 'react-native';
import styles from '../styles/style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const ShoppingListItemFlat = props => {

    const handleClick = async() => {
        const itemId = props.list.item._id
        const listId = props.lId
        const deleteUrl = 'http://localhost:3002/api/deleteItemFromList/'
        const response = await fetch(deleteUrl+listId + `/${itemId}`,{
            method:'delete',
            headers:{ 
              'Content-Type' : 'application/json'
            }
          })
        const data = await response.json();
        if(data.status) {
            Alert.alert('Deleted succesfully')
        } else{
            Alert.alert(data.message)
        }
    }

    return(
        <View style={styles.flatOverall}>
            
            <View style={styles.flatContainer}>
                <Text style={styles.flatBox}>{props.list.item.name}</Text>
            </View>
            <TouchableOpacity onPress={handleClick} stlye={styles.rmv}>
                <MaterialIcons name='backspace' color={'#fff'} size={30}/>
            </TouchableOpacity>
        </View>
    )
}

export default ShoppingListItemFlat;