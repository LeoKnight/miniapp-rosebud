import Taro, { Component,setClipboardData } from '@tarojs/taro'
import { View } from '@tarojs/components'
import "./index.scss"
type Props = {
  result:string
}

interface ResultPanel {
  props:Props;
}

class ResultPanel extends Component<Props>{

  constructor(){
    super(...arguments)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    const { result } = this.props
    if(result){
      setClipboardData({
        data:this.props.result,
        success: function(res) {
          console.log('1111',res)
        }
      })
    }
  }
  render(){
    const { result } = this.props
    return (
      <View className='panel'>

        <View className='panel__title'>结果</View>

        <View
          className='result__content'
          onClick={this.handleClick}
        >
          {result}
        </View>
      </View>

    )
  }
}

export default ResultPanel
