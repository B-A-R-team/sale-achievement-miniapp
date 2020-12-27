import React, { useState } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import {
  AtButton,
  AtForm,
  AtInput,
  AtAvatar
} from 'taro-ui'
import './index.less'
import myRequest from '../../api/myRequest'

const Index = () => {
  const onSubmit = async () => {

    const res = await Taro.login()
    if (res.code) {
      const userInfo = await myRequest('/api/v1/login', { method: 'post', data: { code: res.code } })
      if (userInfo.code === 200) {
        Taro.setStorage({
          key: 'token',
          data: userInfo.token,
          success() {
            Taro.navigateTo({
              url: '/pages/course/course'
            })
          },
          fail(err) {
            console.log(err);
          }
        })

      }
    }


  }
  return (
    <View>
      <View className="login_box">
        <AtAvatar
          className="avatar"
          text='凹凸实验室'
          size="large"
          circle
          openData={{ type: 'userAvatarUrl' }}></AtAvatar>
        <AtButton
          type={'secondary'}
          onClick={onSubmit}
          className="login_btn">登录</AtButton>
      </View>
      <Text className="text"
        onClick={() => Taro.navigateTo({
          url: '/pages/register/register'
        })}>绑定工号</Text>

    </View>
  )
}

export default Index