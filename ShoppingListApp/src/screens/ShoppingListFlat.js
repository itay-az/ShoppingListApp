import React,{useState} from 'react';
import {TouchableOpacity,Text,View, Alert,DevSettings} from 'react-native';
import styles from '../styles/style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const ShoppingListFlat = props => {

  const [refresh,setRefresh] = useState(true)

  const deleteUrl = 'http://localhost:3002/api/delete/'


  const handleClick = async () => {
    const listId = props.list.item._id;
    const response = await fetch(deleteUrl+listId,{
      method:'delete',
      headers:{ 
        'Content-Type' : 'application/json'
      }
    })
    const data = await response.json();
    console.log(data);
    if(data.status) {
      Alert.alert('List deleted')
    } else{
      Alert.alert(data.message)
    }
  }

  return(
    <View style={styles.flatOverall}>
      <TouchableOpacity style={styles.flatName} onPress={props.clickMe}>  
        <View style={styles.flatContainer}>
          <Text style={styles.flatBox}>{props.list.item.ShoppingListName}</Text>  
        </View>
      </TouchableOpacity>
        <TouchableOpacity onPress={handleClick} stlye={styles.rmv}>
          <MaterialIcons name='backspace' color={'#fff'} size={30}/>
        </TouchableOpacity>
    </View>
  )
}

export default ShoppingListFlat;