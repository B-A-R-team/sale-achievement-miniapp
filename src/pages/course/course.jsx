import React, { useState, useEffect } from "react";
import { View, Text, Picker, Image, OpenData } from "@tarojs/components";
import Taro, { arrayBufferToBase64 } from "@tarojs/taro";
import "./course.less";
import {
  AtButton,
  AtList,
  AtListItem,
  AtCurtain,
  AtInput,
  AtCard,
  AtAvatar
} from "taro-ui";
import myRequest from "../../api/myRequest";
const Course = () => {
  const [courseArr, setCourseArr] = useState([
    {
      id: null,
      name: "",
      teacher: ""
    }
  ]);
  const [currentCourse, setCurrentCourse] = useState({
    id: null,
    name: "",
    teacher: "选择课程后显示",
    price: "选择课程后显示"
  });
  useEffect(() => {
    myRequest("/api/v1/course", {}).then(res => {
      if (res.code === 200) {
        setCourseArr(res.data);
      }
    });
  }, []);
  const [img, setImgBase64] = useState("");
  const [isOpened, setIsOpen] = useState(false);
  const createCode = async () => {
    if (currentCourse.id) {
      const cid = currentCourse.id;
      const sid = "202000001";
      const token = await Taro.getStorage({ key: "token" });
      const res = await myRequest("/api/v1/staff/qrcode", {
        method: "post",
        header: {
          "content-type": "application/json",
          Authorization: "Bearer " + token.data
        },
        responseType: "arraybuffer",
        data: {
          scene: `?cid=${cid}&sid=${sid}`
          // page:'pages/customer/customer'
        }
      });
      console.log(res);
      setIsOpen(true);
      if (res.byteLength > 10000) {
        const base64 = arrayBufferToBase64(res);
        const img_url = `data:image/qrcode;base64,${base64}`;
        setImgBase64(img_url);
      } else {
        Taro.showToast({
          title: "生成二维码失败",
          icon: "none"
        });
      }
    } else {
      Taro.showToast({
        title: "必须选择课程",
        icon: "none",
        duration: 1000
      });
    }
  };
  const onClose = () => {
    setIsOpen(false);
  };
  const pickerChange = e => {
    console.log(e);
    setCurrentCourse(courseArr[[e.detail.value]]);
  };
  return (
    <View>
      <AtCard className="staff_info">
        <View className="info_container">
          <AtAvatar circle openData={{ type: "userAvatarUrl" }}></AtAvatar>
          <OpenData className="nickname" type="userNickName"></OpenData>
        </View>
      </AtCard>
      <AtCard className="course_box">
        <Picker
          className="my_picker"
          mode="selector"
          border={false}
          range={courseArr}
          rangeKey={"name"}
          onChange={pickerChange}
        >
          <AtList>
            <AtListItem title="点此选择课程" extraText={currentCourse.name} />
          </AtList>
        </Picker>
        <AtInput
          className="my_input"
          title="教师"
          type="text"
          border={false}
          value={currentCourse.teacher}
          disabled
        />
        <AtInput
          className="my_input"
          title="价格"
          border={false}
          value={currentCourse.price}
          type="text"
          disabled
        />
        <AtCurtain isOpened={isOpened} onClose={onClose}>
          <Image className="my_qrcode" mode="aspectFit" src={img} />
        </AtCurtain>
        <AtButton type="primary" className="my_btn" onClick={createCode}>
          生成二维码
        </AtButton>
      </AtCard>
    </View>
  );
};
export default Course;
