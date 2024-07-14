import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./Index.css";
import { Login } from "../../interfaces/Login.model";

const Register = () => {
  const onFinish = (values: Omit<Login, "remember">) => {
    console.log("Received values of form: ", values);
  };
  const [form] = Form.useForm();
  return (
    <div className="login">
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="Email"
          rules={[
            { required: true, message: "Please input your Email!" },
            { type: "email", message: "Please input a valid email!" },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            type="email"
            placeholder="Email"
            required
          />
        </Form.Item>

        <Form.Item
          name="Username"
          rules={[
            { required: true, message: "Please input your username!" },
            { min: 2, message: "Name must be at least 2 characters long!" },
            {
              max: 15,
              message: "username must be at most 20 characters long!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            type="text"
            required
            placeholder="Username"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please input your Password!" },
            { min: 6, message: "Password must be at least 6 characters long!" },
            {
              max: 20,
              message: "Password must be at most 20 characters long!",
            },
            {
              pattern: new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/),
              message:
                "Password must contain at least one letter and one number!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            required
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          rules={[
            { required: true, message: "Please confirm your Password!" },
            {
              validator: (_, value) => {
                if (value !== undefined) {
                  const password = form.getFieldValue("password");
                  if (value !== password) {
                    return Promise.reject("Passwords do not match!");
                  }
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            required
            placeholder="Confirm Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Register
          </Button>
        </Form.Item>
        <Form.Item>
          Or <a href="/login">login now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
