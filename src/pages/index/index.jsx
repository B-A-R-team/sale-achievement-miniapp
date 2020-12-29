import React, { useState } from "react";
import { View, Text, OpenData } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtButton, AtForm, AtInput, AtAvatar } from "taro-ui";
import "./index.less";
import myRequest from "../../api/myRequest";

const Index = () => {
  const onSubmit = async () => {
    const res = await Taro.login();
    if (res.code) {
      const userInfo = await myRequest("/api/v1/login", {
        method: "post",
        data: { code: res.code }
      });
      if (userInfo.code === 200) {
        Taro.setStorage({
          key: "token",
          data: userInfo.token,
          success() {
            Taro.navigateTo({
              url: "/pages/course/course"
            });
          },
          fail(err) {
            console.log(err);
          }
        });
      }
    }
  };
  return (
    <View className="container">
      <View className="info_box">
        <AtAvatar
          className="avatar"
          text="BAR团队"
          size="large"
          circle
          openData={{ type: "userAvatarUrl" }}
        ></AtAvatar>
        <OpenData className="nickname" type="userNickName"></OpenData>
      </View>
      <View className="login_box">
        <AtButton type="primary" onClick={onSubmit} className="btn login_btn">
          微信授权登录
        </AtButton>
        <AtButton
          type="secondary"
          className="btn"
          onClick={() =>
            Taro.navigateTo({
              url: "/pages/register/register"
            })
          }
        >
          绑定工号
        </AtButton>
      </View>
    </View>
  );
};

export default Index;
