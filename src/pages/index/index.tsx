import { ComponentType } from 'react'
import Taro, { Component, Config, getClipboardData, setClipboardData } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTextarea, AtButton, AtTabs, AtTabsPane } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'


import { getEncodeBase64, getDecodeBase64 } from './api'
import ResultPanel from '../components/result-panel'
import './index.scss'

type PageStateProps = {
  counterStore: {
    counter: number,
    increment: Function,
    decrement: Function,
    incrementAsync: Function
  },
  demo: string
}

interface Index {
  props: PageStateProps;
  state: any;
}


const tabList = [{ title: '加密' }, { title: '解密' }]

@inject('counterStore')
@observer
class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '加密/解密'
  }

  constructor() {
    super(...arguments)

    this.state = {
      rowValue: '',
      result: '',
      current: 0
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChangeTab = this.handleChangeTab.bind(this)
  }

  onShareAppMessage() {
    return {
      title: '叮当喵的工具箱',
      path: '/pages/index/index',
      imageUrl: 'http://storage.360buyimg.com/mtd/home/share1535013100318.jpg'
    }
  }

  gotoPanel = e => {
    const { id } = e.currentTarget.dataset
    Taro.navigateTo({
      // url: `/pages/panel/index?id=${id.toLowerCase()}`
      url: `/pages/${id.toLowerCase()}/index`
    })
  }

  componentWillMount() { }

  componentWillReact() {
    console.log('componentWillReact')
  }

  componentDidMount() {
    getClipboardData({
      success: (res)=> {
        const { data } = res;
        if(data){
          this.setState({
            rowValue:data
          })
        }
      }
    })
   }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  handleTextareaChange(stateName, e) {
    this.setState({
      [stateName]: e.target.value
    })
  }
  async handleClick() {
    const { rowValue, current } = this.state;
    if (!rowValue) {
      return false
    }
    let result: any = null
    if (current === 0) {  //加密
      result = await getEncodeBase64(encodeURIComponent(rowValue.trim()))
    } else if (current === 1) { //解密
      result = await getDecodeBase64(decodeURIComponent(rowValue.trim()))
    }

    this.setState({
      result:result.toString()
    },()=>{
      setClipboardData({
        data:result
      })
    })

  }

  handleChangeTab(tabIndex) {
    this.setState({
      current: tabIndex,
      rowValue:'',
      result: ''
    })
  }

  getBtnText(){
    const { current } = this.state;
    if (current === 0) {  //加密
      return "加密"
    } else if (current === 1) { //解密
      return "解密"
    }
    return "出错"
  }

  render() {
    const { current, rowValue, result } = this.state
    return (
      <View className='page page-index'>

        <View className='page-title'>叮当喵的加密/解密工具</View>

        <View className="main">


          <AtTabs current={current} tabList={tabList} onClick={this.handleChangeTab}>
            <AtTabsPane current={current} index={0} >
              <View className="tab-body" >

                <View className='panel'>
                  <View className='panel__title'>原始内容</View>
                  <View className='panel__content'>

                    <View className='example-item'>
                      <AtTextarea
                        value={rowValue}
                        onChange={this.handleTextareaChange.bind(this, 'rowValue')}
                        maxLength={1000}
                        placeholder='您需要加密的内容'
                      />
                    </View>

                  </View>
                </View>

                <ResultPanel result={result}/>

              </View>
            </AtTabsPane>
            <AtTabsPane current={this.state.current} index={1}>
              <View className="tab-body" >
                <View className="tab-body" >

                  <View className='panel'>
                    <View className='panel__title'>原始内容</View>
                    <View className='panel__content'>
                      <View className='example-item'>
                        <AtTextarea
                          value={rowValue}
                          onChange={this.handleTextareaChange.bind(this, 'rowValue')}
                          maxLength={1000}
                          placeholder='您需要解密的内容'
                        />
                      </View>
                    </View>
                  </View>

                  <ResultPanel result={result}/>

                </View>
              </View>
            </AtTabsPane>
          </AtTabs>


          <AtButton
            onClick={this.handleClick}
            className="submit"
          >
            {this.getBtnText()}
          </AtButton>
        </View>


      </View>
    )
  }
}

export default Index as ComponentType
