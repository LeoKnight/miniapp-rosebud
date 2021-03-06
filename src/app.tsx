import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import Index from './pages/index'
import '@tarojs/async-await'

import counterStore from './store/counter'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = {
  counterStore
}

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index/>
      </Provider>
    )
  }
}

let domainUrl = ''
if(process.env.NODE_ENV ==="development"){
  domainUrl = "http://localhost:3000/api"
}else if ( process.env.NODE_ENV ==="production" ) {
  domainUrl = "http://leo123.party/api"
}
const interceptor = function (chain) {
  const requestParams = chain.requestParams
  const { method, data, url } = requestParams
  requestParams.url =domainUrl +url
  console.log(`http ${method || 'GET'} --> ${url} data: `, data)
  return chain.proceed(requestParams)
    .then(res => {
      console.log(`http <-- ${url} result:`, res)
      if(res.statusCode !== 200){
        console.error('fetch error')
      }
      return res.data
    })
}

Taro.addInterceptor(interceptor)

Taro.render(<App />, document.getElementById('app'))
