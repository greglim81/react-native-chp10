import React, { useEffect, useState  } from 'react';
import axios from 'axios'; // npm install axios
import { Content, Spinner, List, ListItem, Left, Thumbnail, Body, Text, Right, Button, Container, Header, Item, Icon, Input } from 'native-base';

function GitHub() {

    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("greg");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() =>{
        getData();
    },[])

    const getData = async() => {
        const res = await axios.get(`https://api.github.com/search/users?q=${searchTerm}`);        
        setData(res.data.items);
        setIsLoading(false);        
    }

    const handleSearch = () => {       
        setIsLoading(true);
        getData();          
    }  



    const listUsers = data.map((user) =>             
        <ListItem key={user.id} thumbnail>
            <Left>
                <Thumbnail square source={{ uri: user.avatar_url }} />
            </Left>
            <Body>
                <Text>Login: {user.login}</Text>
                <Text note numberOfLines={1}>Id: {user.id}</Text>
            </Body>
            <Right>
                <Button onPress={() => { Linking.openURL(user.html_url)}} 
transparent>
                    <Text>View</Text>
                </Button>
            </Right>
        </ListItem>
    ); 
    
    return (
        <Container>
            <Header searchBar rounded>
              <Item>
                <Icon name="ios-search" />
                <Input 
placeholder="Search" 
onChangeText={text => setSearchTerm(text)} 
/>                
                <Icon name="ios-people" />
              </Item>
              <Button onPress={handleSearch} transparent>
                <Text>Search</Text>
              </Button>
            </Header>        
            <Content>
                { isLoading && <Spinner /> }    
                <List>
                    {listUsers}
                </List>
            </Content>
        </Container>
    );

}
export default GitHub;
