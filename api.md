# 接口文档

本文档为项目的前后端交互接口文档

## 响应码及状态

所有请求的状态码都为200，根据code区分响应结果

| code | message        | 备注 |
| ---- | -------------- | ----|
| 200  | SUCCESS        | 成功 |
| 400  | INVALID_PARAMS | 无效参数 |
| 500 | ERROR | 服务端错误 |

## 小程序接口

### 基础接口

#### 登录

**URL：**`api/v1/login`

**描述：**微信登陆接口

**方法：**POST

**Body参数：**

| 参数名 | 必选 | 类型   | 说明                          |
| ------ | ---- | ------ | ----------------------------- |
| code   | √    | string | 微信小程序登陆自动生成的 code |

**成功响应：**

```json
{
    code: 200,
    message: 'success',
    data: {
        id: '202000001', // 工号
        name: '小明'
    },
    token: 'xxxxxxxxxxx'
}
```

**失败响应：**

```json
{
    code: 500,
    message: 'error',
    data: []
}
```



#### 注册

**URL：**`api/v1/register`

**描述：**微信注册接口

**方法：**POST

**Body参数：**

| 参数名     | 必选 | 类型   | 说明                          |
| ---------- | ---- | ------ | ----------------------------- |
| nickname   | √    | string | 用户微信昵称                  |
| code       | √    | string | 微信小程序登陆自动生成的 code |
| avatar_url | √    | string | 微信头像 URL                  |
| staff_id   | √    | string | 员工工号                      |

**成功响应：**

```json
{
    code: 200,
    message: 'success',
    data: {
        id: '202000001', // 工号
        name: '小明',
    },
    token: 'xxxxxxxxxxx'
}
```

**失败响应：**

```json
{
    code: 500,
    message: 'error',
    data: []
}
```



### 客户接口

#### 信息提交接口

**URL：**`api/v1/customer`

**描述：**提交客户所填表单，需要知道推销人员的工号，并且标注是否完成支付以及支付金额和对应课程ID

**方法：**POST

**Body参数：**

| 参数名    | 必选 | 类型    | 说明             |
| --------- | ---- | ------- | ---------------- |
| name      | √    | string  | 客户姓名         |
| phone     | √    | string  | 客户联系电话     |
| wechat    | ×    | string  | 客户微信号       |
| school    | √    | string  | 客户孩子所在学校 |
| age       | √    | number  | 孩子年龄         |
| grade     | √    | string  | 孩子年级         |
| course_id | √    | number  | 课程ID           |
| is_paid   | √    | boolean | 是否付费         |
| money     | √    | number  | 支付金额         |
| staff_id  | √    | string  | 推销人员工号     |

**成功响应：**

```json
{
    code: 200,
    message: 'success',
    data: []
}
```

**失败响应：**

```json
{
    code: 500,
    message: 'error',
    data: []
}
```



### 课程接口

#### 获取所有课程

**URL：**`api/v1/course`

**描述：**获取所有的可选课程

**方法：**GET

**参数：**无

**成功响应：**

```json
{
    code: 200,
    message: 'success',
    data: [
        {
            id: 1,
            name: '高一数学下', // 课程名称
            teacher: '小明', // 课程的教师
            price: 1200
        }
    ]
}
```

**失败响应：**

```json
{
    code: 500,
    message: 'error',
    data: []
}
```





## Web端接口

### 员工接口

#### 注册

**URL：**`api/v1/staff/register`

**描述：**注册姓名，获取工号

**方法：**POST

**header参数：**

| 参数名        | 必选 | 类型   | 说明  |
| ------------- | ---- | ------ | ----- |
| Authorization | √    | string | token |

**Body参数：**

| 参数名 | 必选 | 类型   | 说明     |
| ------ | ---- | ------ | -------- |
| name   | √    | string | 员工姓名 |

**成功响应：**

```json
{
    code: 200,
    message: 'success',
    data: {
        id: '202000001', // 工号
    },
}
```

**失败响应：**

```json
{
    code: 500,
    message: 'error',
    data: []
}
```



#### Web端登录

**URL：**`api/v1/staff/login`

**描述：**获取token及用户工号、姓名、昵称

**方法：**POST

**Body参数：**

| 参数名   | 必选 | 类型   | 说明 |
| -------- | ---- | ------ | ---- |
| id       | √    | string | 工号 |
| password | √    | string | 密码 |

**成功响应：**

```json
{
	"code": 200,
	"message": "success",
	"data": {
		"id": 202000000,
		"name": "姬虚空",
		"nickname": "200OK",
		"avatar_url": "https://xxxxxxxx"
	},
	"token": "eyJhxxxxxxxk"
}
```

**失败响应：**

```json
{
	"code": 500,
	"message": "登陆失败，请检查工号/密码",
	"data": null
}
```



#### 查询所有员工

**URL：**`api/v1/staff`

**描述：**查询所有员工

**方法：**GET

**header参数：**

| 参数名        | 必选 | 类型   | 说明  |
| ------------- | ---- | ------ | ----- |
| Authorization | √    | string | token |

**Body参数：**

| 参数名 | 必选 | 类型   | 说明     |
| ------ | ---- | ------ | -------- |
| name   | √    | string | 员工姓名 |

**成功响应：**

```json
{
    "code": 200,
	"message": "success",
	"data": [
		{
			"id": 202000000,
			"name": "姬虚空",
			"nickname": "200OK",
			"avatar_url": "zzzzzzzzz",
			"openid": "sadasdf",
			"password": "dddddsssaasdf"
		},
        //....
	]
}
```

**失败响应：**

```json
{
    code: 500,
    message: 'error',
    data: []
}
```

#### 查询某个员工

**URL：**`api/v1/staff/:id`

**描述：**查询某个员工，包含该员工的客户信息

**方法：**GET

**header参数：**

| 参数名        | 必选 | 类型   | 说明  |
| ------------- | ---- | ------ | ----- |
| Authorization | √    | string | token |

**Params参数：**

| 参数名 | 必选 | 类型   | 说明     |
| ------ | ---- | ------ | -------- |
| id     | √    | string | 员工工号 |

**成功响应：**

```json
{
    "code": 200,
	"message": "success",
	"data": {
		"id": 202000000,
		"name": "姬虚空",
		"nickname": "200OK",
		"avatar_url": "xxxxx",
		"openid": "xxxxxxx",
		"password": "xxxxxxx",
		"customers": [
			{
				"id": 1,
				"name": "圣地亚哥",
				"phone": "11312612311",
				"wechat": "aaa",
				"school": "第一中学",
				"age": 14,
				"grade": "初一",
				"is_paid": false,
				"money": 1200,
				"join_time": "2020/12/21"
			},
            //....
		]
	}
}
```

**失败响应：**

```json
{
    code: 500,
    message: 'error',
    data: []
}
```

