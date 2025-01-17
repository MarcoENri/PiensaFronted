import { useState } from "react";
import { Form, Input, Button } from "antd";
import { useAuth } from "../context/AuthContext";

export const LoginPage = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleFinish = (values: any) => {
    setLoading(true);
    // Aquí se deben verificar las credenciales del usuario con tu backend.
    // Si la autenticación es exitosa:
    login(values.username, values.password);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Form onFinish={handleFinish} style={{ width: "300px" }}>
        <Form.Item name="username" rules={[{ required: true, message: "Please input your username!" }]}>
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
