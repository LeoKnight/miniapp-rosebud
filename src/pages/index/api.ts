import { request } from '@tarojs/taro'

export const getEncodeBase64 = (rowValue: string) => {
  return request({
    url: `/crypto/base64/encode/${rowValue}`
  })
}

export const getDecodeBase64 = (rowValue: string) => {
  return request({
    url: `/crypto/base64/decode/${rowValue}`
  })
}
