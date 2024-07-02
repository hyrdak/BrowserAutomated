import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from 'constants-es';
import { useAppDispatch } from 'libs/redux';

import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from 'antd';

import { setAuth } from 'helpers/auth';
import { setAuthUser } from 'data/store';
import { useMutationRequestRegister } from 'modules/auth/data/queries';

export interface RequestRegisterBody {
    email: string
    password: string
    data: { full_name: string };
}
const SignUp = () => {
    const mutationRequestRegister = useMutationRequestRegister();
    const [success, setSuccess] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleFinish = (values: any) => {
        if (values.password === values.confirm_password) {
            if(success) {
                const dataSignUp:RequestRegisterBody = {
                    email: values.email,
                    password: values.password,
                    data: { full_name: values.name },
                }
                mutationRequestRegister.mutate(
                    { ...dataSignUp },
                    {
                        onSuccess: (response: any) => {
                            if (response.status === 200) {
                                message.success(response.message);
                                setAuth(response.data.accessToken);
        
                                dispatch(
                                    setAuthUser({
                                        user: response.data.user
                                    })
                                );
                                navigate(ROUTE_PATHS.WORK_FLOWS);
                            } else {
                                message.error(response.message+". Please try again!");
                            }
                        },
                        onError: (error: any) => {
                            message.error(error.message);
                        }
                    }
                );
            } else {
                message.error('Please verify the reCAPTCHA');
            }
        } else {
            message.error('The password and confirmation password do not match. Please try again!');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex-col px-6 bg-white border rounded shadow-md min-w-fit py-14 ">
                <div className="flex justify-center mb-5">
                    <img className="w-24" src="/logo200x200.png" alt="" />
                </div>
                <Form className="flex flex-col text-sm rounded-md" onFinish={handleFinish}>
                    <div className="flex text-xm text-center text-gray-400">
                        <UserOutlined className="ml-2 mr-1 mb-1" />Display Name:
                    </div>
                    <Form.Item
                        name={'name'}
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: 'Please input display name!'
                            }
                        ]}
                    >
                        <Input size="large" type="Name" placeholder='Display Name' />
                    </Form.Item>
                    <div className="flex text-xm text-center text-gray-400">
                        <MailOutlined className="ml-2 mr-1" />Email:
                    </div>
                    <Form.Item
                        name={'email'}
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: 'Please input your email!'
                            }
                        ]}
                    >
                        <Input size="large" type="Email" placeholder="Email" />
                    </Form.Item>
                    <div className="flex text-xm text-center text-gray-400">
                        <LockOutlined className="ml-2 mr-1 mb-1" />Password:
                    </div>
                    <Form.Item
                        name={'password'}
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: 'Please input your password!'
                            }
                        ]}
                    >
                        <Input.Password size="large" type="password" placeholder="Password" />
                    </Form.Item>
                    <div className="flex text-xm text-center text-gray-400">
                        <LockOutlined className="ml-2 mr-1 mb-1" />Confirm Password:
                    </div>
                    <Form.Item
                        name={'confirm_password'}
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: 'Please input confirm password!'
                            }
                        ]}
                    >
                        <Input.Password size="large" type="password" placeholder="Confirm Password" />
                    </Form.Item>
                    <Button
                        loading={mutationRequestRegister.isPending}
                        type="primary"
                        className="w-full p-2 mt-3 "
                        htmlType="submit"
                        size="large"
                    >
                        Sign Up
                    </Button>
                </Form>
                <div className="flex justify-between mt-5 text-sm text-gray-600">
                    <a href={ROUTE_PATHS.SIGN_IN}>Back to sign in</a>
                </div>
                <div className="mt-5" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
                    <ReCAPTCHA
                        sitekey={process.env.REACT_APP_SITE_KEY + ''}
                        onChange={() => { setSuccess(true); }}
                        onErrored={() => { setSuccess(false); }}
                        onExpired={() => { setSuccess(false); }}
                    />
                </div>
                <div className="mt-5 flex text-sm text-center text-gray-400">
                    <p>
                        This site is protected by reCAPTCHA and the Google <br />
                        <a className="underline" href="https://policies.google.com/privacy" target="_blank">
                            Privacy Policy
                        </a>{' '}
                        and{' '}
                        <a className="underline" href="https://policies.google.com/terms" target="_blank">
                            Terms of Service
                        </a>{' '}
                        apply.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
