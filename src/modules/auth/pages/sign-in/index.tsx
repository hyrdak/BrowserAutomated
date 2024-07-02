import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from 'constants-es';
import { useAppDispatch } from 'libs/redux';

import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';

import { setAuth } from 'helpers/auth';
import { setAuthUser } from 'data/store';
import { useMutationRequestLogin } from 'modules/auth/data/queries';

const SignIn = () => {
    const mutationRequestLogin = useMutationRequestLogin();
    const [success, setSuccess] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleFinish = ({ email, password }: any) => {
        if(success) {
            mutationRequestLogin.mutate(
                { email, password },
                {
                    onSuccess: (response) => {
                        if (response.status === 200) {
                            message.success(response.message);
                            dispatch(
                                setAuthUser({
                                    user: response.data.user,
                                    accessToken: response.data.accessToken,
                                    refreshToken: response.data.refreshToken
                                })
                            );
                            window.location.href = '/work-flows';
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
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex-col px-6 bg-white border rounded shadow-md min-w-fit py-14">
                <div className="flex justify-center mb-8">
                    <img className="w-24" src="/logo200x200.png" alt="" />
                </div>
                <Form className="flex flex-col text-sm rounded-md" onFinish={handleFinish}>
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

                    <Button
                        loading={mutationRequestLogin.isPending}
                        type="primary"
                        className="w-full p-2 mt-3 "
                        htmlType="submit"
                        size="large"
                    >
                        Sign in
                    </Button>
                </Form>
                <div className="flex justify-between mt-5 text-sm text-gray-600">
                    <a href={ROUTE_PATHS.FORGOT_PASSWORD}>Forgot password?</a>
                    <a href={ROUTE_PATHS.SIGN_UP}>Sign up</a>
                </div>
                <div className="mt-5" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
                    <ReCAPTCHA
                        sitekey={process.env.REACT_APP_SITE_KEY + ''}
                        onChange={() => { setSuccess(true); }}
                        onErrored={() => { setSuccess(false); }}
                        onExpired={() => { setSuccess(false); }}
                    />
                </div>
                <div className="flex justify-center mt-5 text-sm">
                    <p className="text-gray-400">or you can sign with</p>
                </div>
                <div className="flex justify-center gap-3 mt-3 ">
                    <img
                        src="/microsoft.png"
                        className="duration-300 scale-105 cursor-pointer h-7 grayscale hover:grayscale-0"
                    />
                </div>
                <div className="flex mt-5 text-sm text-center text-gray-400">
                    <p>
                        This site is protected by reCAPTCHA and the Google <br />
                        <a className="underline" href="">
                            Privacy Policy
                        </a>{' '}
                        and{' '}
                        <a className="underline" href="">
                            Terms of Service
                        </a>{' '}
                        apply.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
