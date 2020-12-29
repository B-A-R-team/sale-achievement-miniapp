import React, { useState } from "react";
import Taro from "@tarojs/taro";
import { AtInput, AtButton, AtCard, AtAvatar } from "taro-ui";
import myRequest from "../../api/myRequest";
import "./register.less";
import { Text, View } from "@tarojs/components";
const Register = () => {
  const [staffId, setStaffId] = useState("");

  const handleBtn = e => {
    console.log(e);
    if (e.detail.userInfo) {
      const { nickName, avatarUrl } = e.detail.userInfo;
      Taro.login({
        success: async res => {
          console.log(res);
          if (res.code) {
            const params = {
              nickname: nickName,
              avatar_url: avatarUrl,
              code: res.code,
              staff_id: staffId
            };
            const regInfo = await myRequest("/api/v1/register", {
              method: "post",
              data: params
            });
            console.log(regInfo);
            if (regInfo.code === 200) {
              Taro.showModal({
                title: "绑定成功",
                icon: "success",
                duration: 1000,
                showCancel: false,
                success() {
                  Taro.navigateBack();
                }
              });
            } else {
              Taro.showToast({
                title: "工号填写不正确",
                icon: "none"
              });
            }
          } else {
            console.log("登录失败！" + res.errMsg);
          }
        }
      });
    } else {
      Taro.showToast({
        title: "授权失败",
        icon: "none",
        duration: 1000
      });
    }
  };
  return (
    <View className="container">
      <AtCard
        className="register"
        title="绑定工号"
        renderIcon={
          <AtAvatar
            className="register_icon"
            circle
            size="small"
            openData={{ type: "userAvatarUrl" }}
          ></AtAvatar>
        }
      >
        <AtInput
          className="my_input"
          name="value"
          title="工号"
          type="text"
          placeholder="请输入工号"
          border={false}
          value={staffId}
          onChange={e => setStaffId(e)}
        />
        <AtButton
          className="my_btn"
          type={"primary"}
          openType={"getUserInfo"}
          onGetUserInfo={handleBtn}
        >
          绑定
        </AtButton>
      </AtCard>
      <View className="tips">
        <Text>将微信号与工号绑定在一起</Text>
        <Text>已绑定的工号禁止再次绑定</Text>
      </View>
    </View>
  );
};
export default Register;
