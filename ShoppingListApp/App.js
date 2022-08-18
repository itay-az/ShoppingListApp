import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ShoppingListStack } from './src/navigation';


const App = () => {
  return(
    <NavigationContainer>
      <ShoppingListStack />
    </NavigationContainer>
  )
}

export default App;