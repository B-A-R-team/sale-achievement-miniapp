import React, { useState, useEffect } from "react";
import { View, Text } from "@tarojs/components";
import { AtInput, AtButton } from "taro-ui";
import myRequest from "../../api/myRequest";
import Taro, { useRouter } from "@tarojs/taro";
import "./customer.less";

const Customer = () => {
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    wechat: "",
    school: "",
    age: "",
    grade: "",
    course_id: 0,
    is_paid: "false",
    money: 0,
    staff_id: "0"
  });
  const router = useRouter();

  useEffect(() => {
    Taro.hideHomeButton();
    const courseId = +router.params.cid;
    const staffId = router.params.sid;

    console.log(courseId, staffId);

    myRequest("/api/v1/course", {}).then(res => {
      const { price } = res.data.find(item => item.id === courseId);
      setCustomerInfo({
        ...customerInfo,
        course_id: courseId,
        staff_id: staffId,
        money: price
      });
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

  const submitCustomer = async () => {
    const { code, message } = await myRequest("/api/v1/customer", {
      method: "POST",
      data: { ...customerInfo }
    });
    if (code === 200) {
      Taro.redirectTo({
        url: "/pages/finish/finish"
      });
      return;
    }
    Taro.showModal({
      title: "提交失败",
      content: message
    });
  };

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
      // Taro.showModal({
      //   title: "支付",
      //   content: customerInfo.money + "元"
      // });
      Taro.showModal({
        title: "提示",
        content: "确认提交信息？",
        success: function(res) {
          if (res.confirm) {
            submitCustomer();
          }
        }
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
        提交
      </AtButton>
    </View>
  );
};

export default Customer;
