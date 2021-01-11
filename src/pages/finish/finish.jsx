import React, { useEffect } from "react";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtIcon } from "taro-ui";
import "./finish.less";

const Finish = () => {
  useEffect(() => {
    Taro.hideHomeButton();
  });

  return (
    <View className="container">
      <AtIcon className="success" value="check-circle" size="60"></AtIcon>
      <View>提交成功</View>
    </View>
  );
};

export default Finish;
