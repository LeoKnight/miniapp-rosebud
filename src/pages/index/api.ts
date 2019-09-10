// import { request } from '@tarojs/taro'
import * as CryptoJS  from 'crypto-js';

export const getEncodeBase64 = (rowValue: string) => {
  var wordArray = CryptoJS.enc.Utf8.parse(rowValue);
  var base64 = CryptoJS.enc.Base64.stringify(wordArray);
  return base64
  // request({
  //   url: `/crypto/base64/encode/${rowValue}`
  // })
}

export const getDecodeBase64 = (rowValue: string,unicode:string = 'utf8') => {
  var parsedWordArray = CryptoJS.enc.Base64.parse(rowValue);
  var parsedStr = parsedWordArray.toString(CryptoJS.enc.Utf8);
  return parsedStr
  // request({
  //   url: `/crypto/base64/decode/${rowValue}`
  // })
}
