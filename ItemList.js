import React from 'react'

import {
  List,
  ListItem,
  Left,
  Thumbnail,
  Right,
  Body,
  Text,
  Button,
  Icon
} from 'native-base'

const RepoList = ({ items, removeItem }) => (
  <List style={{ marginVertical: 10 }}>
    { Object.keys(items).map(item => (
      <ListItem key={items[item].id} style={{ marginLeft: 0 }}>
        <Body>
          <Text>{items[item].text}</Text>
        </Body>
        <Right>
          <Button 
            style={{ backgroundColor: 'red' }}
            onPress={() => removeItem(items[item].id)}>
            <Icon name="close" />
          </Button>
        </Right>
      </ListItem>
    )) }
  </List>
)

export default RepoList
