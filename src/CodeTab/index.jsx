import React from "react";
import { Input } from "antd";
import { useEffect } from "react";
import Eventjs from "../event";

/*
1）用json格式展示用户信息。
2）按ctrl + s可以保存用户信息。更新后的信息可以在第一个Tab显示出来
3）保存前要先检查，如果字段名或者字段值不符合规范，弹出提示信息。 
*/
function CodeTab() {
  let val = "";
  // init
  useEffect(() => {
    // 简单的绑定一个    Input.TextArea 在获取焦点绑定 失去焦点解绑这个
    const cb = function (e) {
      if (
        e.keyCode === 83 &&
        (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)
      ) {
        e.preventDefault();
        let _val = null;
        console.log();
        try {
          _val = JSON.parse(val);
        } catch (error) {
          alert(`json 解析错误 ${error}`);
        }

        if (_val !== null) {
          // 展示页面
          Eventjs.emit("save", _val);
        }
      }
    };
    document.addEventListener("keydown", cb);

    return () => {
      document.removeEventListener("keydown", cb);
    };
  }, []);

  const onChange = (e) => {
    val = e.target.value;
  };

  return (
    <div>
      {/*
      // json 格式例子
      {
        "account": "",
        "gender": 1,
        "birthday": null,
        "email": "",
        "interests": []
        } 
    */}
      <Input.TextArea
        rows={10}
        placeholder="请输入标准json格式"
        allowClear
        onChange={onChange}
      />
    </div>
  );
}

export default CodeTab;
