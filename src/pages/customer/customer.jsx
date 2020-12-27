import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button } from '@tarojs/components'
import {
    AtForm,
    AtInput,
    AtButton
} from 'taro-ui'
import myRequest from '../../api/myRequest'
import './customer.less'
const Customer = () => {
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        phone: '',
        wechat: '',
        school: '',
        age: '',
        grade: '',
        course_id: '',
        is_paid: '',
        money: '',
        staff_id: ''
    })
    //  const inputArr = new Array(6)
    const inputArr = [
        { name: 'name', cname: '姓名' },
        { name: 'phone', cname: '电话' },
        { name: 'wechat', cname: '微信号' },
        { name: 'school', cname: '学校' },
        { name: 'age', cname: '年龄' },
        { name: 'grade', cname: '年级' },
        { name: 'money', cname: '金额' },
    ]

    const handleBtn = () => {
        console.log(customerInfo);
    }
    return (
        <AtForm
            className="pay_form"
        >
            {
                inputArr.map((item, index) => {
                    return (
                        <AtInput
                            key={index}
                            name={item.name}
                            className="my_input"
                            required
                            title={item.cname + ': '}
                            type='text'
                            placeholder={'请输入' + item.cname}
                            value={customerInfo[item.name]}
                            onChange={(e) => {
                                 customerInfo[item.name] = e
                                //  console.log(customerInfo);
                                 return setCustomerInfo(customerInfo)
                            }}
                        />
                    )
                })
            }

            <AtButton className="my_btn" type={'secondary'} openType={"getUserInfo"} onGetUserInfo={handleBtn}>支付</AtButton>
        </AtForm>
    )
}

export default Customer