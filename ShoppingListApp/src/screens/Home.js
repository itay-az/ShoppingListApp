import React,{ useState,useEffect } from 'react';
import {Text,View, FlatList, TouchableOpacity} from 'react-native';
import styles from '../styles/style';
import ShoppingListFlat from './ShoppingListFlat.js'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const Home = props => {

  const getListUrl = 'http://localhost:3002/api/getList';
  const [data,setData] = useState([]);

  useEffect (() => {
    getList();
  },[data])

  const getList = async() => {
    const response = await fetch(getListUrl,{method:'get'});
    const data = await response.json();
    setData(data.results);
}

const handleClick = () => {
  props.navigation.navigate("AddList")
}


    
  return(
    <View style={styles.container}>
        <View style={styles.headerContainer}><Text style={styles.headerText}>Shopping lists</Text></View>
          <View>
            <FlatList 
              data = {data}
              keyExtractor = {item => item._id}
              extraData={data}
              renderItem = {itemList => 
                <ShoppingListFlat 
                  list = {itemList}
                  clickMe = {() => props.navigation.navigate('ShoppingListDetails',{list:itemList.item})}
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

export default Home;