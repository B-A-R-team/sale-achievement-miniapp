import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import {
    AtForm,
    AtInput,
    AtButton
} from 'taro-ui'
import myRequest from '../../api/myRequest'
import './register.less'
const Register = () => {
    const [staffId, setStaffId] = useState('')

    const handleBtn = (e) => {
        console.log(e);
        if (e.detail.userInfo) {
            const { nickName, avatarUrl } = e.detail.userInfo
            Taro.login({
                success: async (res) => {
                    console.log(res);
                    if (res.code) {
                        const params = {
                            nickname: nickName,
                            avatar_url: avatarUrl,
                            code: res.code,
                            staff_id: staffId
                        }
                        const regInfo = await myRequest('/api/v1/register', { method: 'post', data:params })
                        console.log(regInfo);
                        if (regInfo.code === 200) {
                            Taro.showModal({
                                title: '注册成功',
                                icon: 'success',
                                duration: 1000
                            })
                        } else {
                            Taro.showToast({
                                title: '工号填写不正确',
                                icon: 'none'
                            })
                        } 
                    } else {
                        console.log('登录失败！' + res.errMsg)
                    }
                }
            })
        } else {
            Taro.showToast({
                title: '授权失败',
                icon: 'none',
                duration: 1000
            })
        }

    }
    return (
        <AtForm
            className="register"
        >
            <AtInput
                className="my_input"
                name='value'
                title='工号 ：'
                type='text'
                placeholder='请输入工号'
                value={staffId}
                onChange={(e) => setStaffId(e)}
            />
            <AtButton className="my_btn" type={"primary"} openType={"getUserInfo"} onGetUserInfo={handleBtn}>注册</AtButton>
        </AtForm>
    )
}
export default Register