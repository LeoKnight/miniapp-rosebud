
import Taro, { Component } from '@tarojs/taro'
import { AtTextarea, AtButton } from 'taro-ui'
import './index.scss'
import { View } from '@tarojs/components';
import { ComponentType } from 'react';

interface Crypto {
  state: any;
}
class Crypto extends Component {


  config = {
    navigationBarTitleText: '加密/解密'
  }

  constructor() {
    super(...arguments)
    this.state = {
      textareaValue: ''
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleTextareaChange(stateName, e) {
    this.setState({
      [stateName]: e.target.value
    })
  }
  async handleClick (){
    console.log('demo')

  }
  render() {
    return (
      <View className='page'>
        <AtButton onClick={this.handleClick}>
          demo
        </AtButton>
        <View className='panel'>
          <View className='panel__title'>Textarea 多行文本框</View>
          <View className='panel__content'>
            <View className='example-item'>
              <AtTextarea
                value={this.state.textareaValue}
                onChange={this.handleTextareaChange.bind(this, 'textareaValue')}
                maxLength={200}
                placeholder='你的问题是...'
              />
            </View>
          </View>
        </View>

        <View className='panel'>
          <View className='panel__title'>Textarea 多行文本框</View>
          <View className='panel__content'>
            <View className='example-item'>
              <AtTextarea
                value={this.state.textareaValue}
                onChange={this.handleTextareaChange.bind(this, 'textareaValue')}
                maxLength={200}
                placeholder='结果'
                disabled={true}
              />
            </View>
          </View>
        </View>
      </View>
    )
  }
}


export default Crypto as ComponentType
