import React, {Component} from 'react'
import {ActivityIndicator, ListView, Text, View} from 'react-native'
import {getPrice} from './prices'

const coins = ['bitcoin', 'ethereum', 'stellar', 'monero', 'bitcoin-cash']

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
    }
  }

  componentDidMount() {
    return Promise.all(coins.map(c => getPrice(c)))
      .then(responses => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.setState(
          {
            isLoading: false,
            dataSource: ds.cloneWithRows(responses),
          },
          function() {
            // do something with new state
          }
        )
      })
      .catch(error => {
        console.error(error)
      })
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View style={{flex: 1, paddingTop: 20}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={rowData =>
            <Text>
              {rowData.name}, {rowData.price_usd}
            </Text>}
        />
      </View>
    )
  }
}
