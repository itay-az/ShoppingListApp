import React,{useState,useEffect} from 'react';
import {TouchableOpacity,View,FlatList} from 'react-native';
import styles from '../styles/style';
import ShoppingListItemFlat from './ShoppingListItemFlat';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



const ShoppingListDetails = props => {
  
  
  const listId = props.route.params.list._id


  const getItemsUrl = 'http://localhost:3002/api/getItems/';

  const [data,setData] = useState([]);

  useEffect (() => {
    getItems();
  },[data])

  const getItems = async() => {
    const response = await fetch(getItemsUrl+listId,{method:'get'});
    const data = await response.json();
    setData(data.message.Items);
}

  const handleClick = () => {
      props.navigation.navigate("AddItem",{list:props.route.params})
    }
  
  return(
    <View style={styles.container}>
      <View>
        <FlatList 
          data={data}
          keyExtractor={item => item._id}
          renderItem ={itemList => 
            <ShoppingListItemFlat
              list={itemList} 
              clickMe = {{list:itemList.item,listId}}
              lId = {listId}
            />
          }
        />
        <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handleClick} style={styles.add} >
              <MaterialIcons  style={styles.icon} size={30} color={'#fff'} name="add" />
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default ShoppingListDetails;