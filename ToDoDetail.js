import React, { useContext, useState } from 'react';
import { Form, Item, Text, Button, Input } from 'native-base';
import { TodosContext } from './App'
import axios from 'axios';

export default function ToDoDetail({route, navigation}) {    
    const { text } = route.params;

    const [todoText, setTodoText] = useState(text)        
    const {state, dispatch} = useContext(TodosContext); 
    const endpoint = "http://localhost:3000/todos/"
  
    return (
      <Form>
        <Item regular>                
            <Input placeholder="Edit Todo" 
              onChangeText={text => setTodoText(text)} 
              value={todoText} 
            />                
        </Item>
        <Button onPress={async () =>{
            await axios.patch(endpoint+route.params.id,{text:todoText})         
            dispatch({type: 'edit', payload:{...route.params,text:todoText}});
            navigation.navigate('ToDoList');
        }}>
            <Text>Edit</Text>
        </Button>                   
      </Form>
    );
  }
