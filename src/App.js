import React from "react";
import { Card } from "antd";
import "./App.css";
import FormTab from "./FormTab/";
import CodeTab from "./CodeTab/";

function App() {
  return (
    <div>
      <Card title="表单Tab">
        <FormTab></FormTab>
      </Card>
      <Card title="表单Tab" style={{ marginTop: 10 }}>
        <CodeTab></CodeTab>
      </Card>
    </div>
  );
}

export default App;
