import React, { Component } from 'react'

import { AsyncStorage } from 'react-native'

import {
  Container,
  Content,
  Header,
  Body,
  Title,
  Form,
  Item,
  Input,
  Icon,
  Button,
  Text
} from 'native-base'

import ItemList from './ItemList'

export default class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      text: '',
      items: {},
    }

    this.addItem = this.addItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
  }

  async componentDidMount() {
    try {
      const response = await AsyncStorage.getItem('items');
      if (response !== null){
        let items = JSON.parse(response)
        this.setState({ items })
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  addItem() {
    if (this.state.text.length > 0) {
      const id = Date.now()
      let items = this.state.items

      const item = {
        text: this.state.text,
        id,
        done: false
      }

      items[id] = item

      AsyncStorage.setItem('items', JSON.stringify(items))
      this.setState({ items, text: '' })    
    }
  }

  removeItem(id) {
    let items = this.state.items
    delete items[id]

    AsyncStorage.setItem('items', JSON.stringify(items))
    this.setState({ items })
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Simple Todo</Title>
          </Body>
        </Header>

        <Content padder>
          <Form>
            <Item last>
              <Icon active name='add'/>
              <Input
                placeholder="Sua mensagem"
                value={this.state.text}
                onChangeText={text => this.setState({ text })} 
                />
            </Item>
          </Form>
          <Button 
            block 
            style={{ marginTop: 10 }}
            onPress={this.addItem}>
            <Text>Adicionar</Text>
          </Button>

          <ItemList 
            removeItem={this.removeItem} 
            items={this.state.items} />
        </Content>
      </Container>
    )
  }
}
