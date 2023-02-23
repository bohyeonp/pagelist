import React, {useEffect} from "react";
import { LockOutlined, MailOutlined} from '@ant-design/icons';
import { Button, Form, Input} from 'antd';
import {auth} from "../firebase/Firebase"
import {setModal} from "../app/slice";
import { signInWithEmailAndPassword} from "firebase/auth";
import {useDispatch} from "react-redux";

const Login = () => {
    const dispatch = useDispatch();
    const layout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 16,
        },
    };

    const onFinishEP = async (values) => {
        try {
            await signInWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );
        } catch (error) {
            switch(error.code){
                case "auth/user-not-found":
                    dispatch(setModal({show: true, type: "auth/user-not-found"}));
                    break;
                case "auth/wrong-password":
                    dispatch(setModal({show: true, type: "auth/wrong-password"}));
                    break;
                default:
                    dispatch(setModal({show: true, type: "login-fail"}));
                    break;
            }
        }
    };

    return (
        <>
            <div>
                <Form
                    {...layout}
                    style={{maxWidth: '600px', margin: '0 auto', paddingTop: '10%'}}
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinishEP}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                required: true,
                                message: '이메일 형식에 맞게 작성해주세요.'
                            },
                        ]}
                    >
                        <Input placeholder="이메일을 입력해주세요." prefix={<MailOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}/>
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" style={{ color: 'rgba(0, 0, 0, 0.25)' }}/>}
                            placeholder="비밀번호를 입력해주세요."
                            type="password"
                            autoComplete="on"
                        />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 4,
                            span: 16,
                        }}
                    >
                        <div>
                            <Button style={{width : "100%", marginTop : '10px', marginRight : '10px'}} type="primary" htmlType="submit">
                                LOGIN
                            </Button>
                            <div style={{float : 'right', display : 'flex'}}>
                                <div onClick={() => dispatch(setModal({show: true, type: 'join'}))} style={{textDecoration: "underline", marginTop : '15px'}}> JOIN</div>
                            </div>
                        </div>

                    </Form.Item>
                </Form>
            </div>
        </>
    )
}
export default Login;
