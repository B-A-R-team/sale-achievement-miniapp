import React, { useState, useEffect } from "react";
import { View, Text, Button } from "@tarojs/components";
import { AtForm, AtInput, AtButton } from "taro-ui";
import myRequest from "../../api/myRequest";
import Taro from "@tarojs/taro";
import "./customer.less";
const Customer = props => {
  console.log(props);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    wechat: "",
    school: "",
    age: "",
    grade: "",
    course_id: 1,
    is_paid: "false",
    money: "2000",
    staff_id: "2020"
  });
  useEffect(() => {
    console.log(11);
    customerInfo.course_id = 3;
    myRequest("/api/v1/course", {}).then(res => {
      console.log(res.data);
      const currentItem = res.data.find(
        item => item.id === customerInfo.course_id
      );
      console.log(customerInfo.course_id);
      console.log(currentItem.price);
    });
  }, []);
  //  const inputArr = new Array(6)
  const inputArr = [
    { name: "name", cname: "姓名" },
    { name: "phone", cname: "电话" },
    { name: "wechat", cname: "微信号" },
    { name: "school", cname: "学校" },
    { name: "age", cname: "年龄" },
    { name: "grade", cname: "年级" },
    { name: "money", cname: "金额" }
  ];

  const handleBtn = () => {
    let titleArr = [];
    let titleStr = "";
    for (const key in customerInfo) {
      if (customerInfo[key].length <= 0) {
        titleArr.push(key);
      }
    }
    titleArr.forEach((titleItem, index) => {
      const currItem = inputArr.find(inputItem => inputItem.name === titleItem);
      if (index < titleArr.length - 1) {
        titleStr = titleStr + currItem.cname + "，";
        return;
      }
      titleStr += currItem.cname;
    });
    if (titleStr.length > 1) {
      Taro.showToast({
        title: titleStr + "不能为空",
        icon: "none",
        duration: 1500
      });
    } else {
      Taro.showModal({
        title: "支付",
        content: customerInfo.money + "元"
      });
    }
  };

  const renderInputGroup = (data, groupClass, groupName) => {
    return (
      <>
        <Text className="group_title">{groupName}</Text>
        <View className={`input_group ${groupClass}`}>
          {data.map((item, index) => (
            <AtInput
              key={index}
              name={item.name}
              className={`my_input ${data.length === 1 && "one_line"}`}
              required
              border={false}
              title={item.cname}
              type="text"
              placeholder={"请输入" + item.cname}
              value={customerInfo[item.name]}
              onChange={e => {
                customerInfo[item.name] = e;
                //  console.log(customerInfo);
                return setCustomerInfo(customerInfo);
              }}
              disabled={item.name === "money"}
            />
          ))}
        </View>
      </>
    );
  };

  return (
    <View className="pay_form">
      {renderInputGroup(inputArr.slice(0, 3), "parent_info", "家长信息")}
      {renderInputGroup(inputArr.slice(3, -1), "student_info", "学生信息")}
      {renderInputGroup(inputArr.slice(-1), "student_info", "课程费用")}
      <AtButton
        className="my_btn"
        type="primary"
        openType={"getUserInfo"}
        onGetUserInfo={handleBtn}
      >
        提交并支付
      </AtButton>
    </View>
  );
};

export default Customer;
