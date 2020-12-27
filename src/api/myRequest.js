/*
 * @Author: lts
 * @Date: 2020-12-26 14:06:49
 * @LastEditTime: 2020-12-27 16:02:17
 * @FilePath: \sale-achievement-miniapp\src\api\myRequest.js
 */
import Taro from '@tarojs/taro'
const BASE_URL = 'https://barteam.cn:2992'

const myRequest = (
    url,
    {
        method = 'get',
        data = {},
        header = { 'content-type': 'application/json' },
        responseType = 'text',
    }) => {
    Taro.showLoading({
        title: '加载中',
    })
    return new Promise((resolve, reject) => {
        Taro.request({
            method,
            url: BASE_URL + url,
            data,
            responseType,
            header,
            success(data) {
                // Taro.hideLoading()
                resolve(data.data)
            },
            fail(err) {
                Taro.showToast({
                    title: err,
                    icon: 'none',
                    duration: 1000
                })
                reject(err)
            },
            complete() {
                Taro.hideLoading()
            }
        })
    })
}
export default myRequest