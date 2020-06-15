import React, { useState, useEffect } from "react";
import { Form, Input, Radio, Button, DatePicker, Select, Space } from "antd";
import { useCallback } from "react";
import moment from "moment";
import Eventjs from "../event";

/* 
1)有 account, gender, birthday, email, interests 字段
2)account: 输入框，输入内容不能有空格；
3)gender：单择框；
4)birthday: 日期选择框，日期格式yyyy-MM-dd。同时显示出他的年龄
5)email: 输入框。招商证券的邮件格式：例如：zhangsan@cmschina.com.cn
6)interests: 多选框。爱好有：篮球，羽毛球，游泳。
7)保存按钮，点击后保存修改后的值。
8)保存前要先检查字段。
9)取消按钮，点击后放弃修改后的值，回到原来的值。
 */

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const validateMessages = {
  required: "${label} is required!",
};

const initialValues = {
  account: "",
  gender: 0,
  birthday: null,
  email: "",
  interests: [],
};
function FormTab() {
  const [form] = Form.useForm();

  // init
  useEffect(() => {
    Eventjs.on("save", (e) => {
      form.setFieldsValue({ ...e });
      form.validateFields();
    });
    return () => {
      Eventjs.off("save");
    };
  }, []);

  const [userData, setUserData] = useState({
    ...initialValues,
  });

  const [grade, setGrade] = useState(0);

  const onFinish = (values) => {
    setUserData({ ...values });
    form.setFieldsValue({ ...values });
  };

  const birthdayOnChange = useCallback(
    (date, dateString) => {
      setGrade(moment().year() - date.year());
      form.setFieldsValue({ birthday: "date" });
    },
    [form]
  );
  return (
    <Form
      form={form}
      {...layout}
      initialValues={initialValues}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item
        name="account"
        label="account"
        rules={[{ required: true }, { whitespace: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="gender" label="gender" rules={[{ required: true }]}>
        <Radio.Group>
          <Radio value={0}>男</Radio>
          <Radio value={1}>女</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="birthday" label="birthday" rules={[{ required: true }]}>
        <Space>
          <DatePicker
            onChange={birthdayOnChange}
            disabledDate={(currentDate) => {
              return currentDate.unix() > moment().unix();
            }}
          />
          <div>年龄：{grade}</div>
        </Space>
      </Form.Item>

      <Form.Item
        name="email"
        label="email"
        rules={[{ type: "email" }, { required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="interests"
        label="interests"
        rules={[{ required: true }]}
      >
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Please select"
        >
          {["篮球", "羽毛球", "游泳"].map((v) => {
            return <Select.Option key={v}>{v}</Select.Option>;
          })}
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Space>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
          <Button
            type="primary"
            onClick={() => {
              form.setFieldsValue({ ...userData });
            }}
          >
            取消
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

export default FormTab;
