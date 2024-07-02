import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { ROUTE_PATHS } from 'constants-es';
import { useAppDispatch } from 'libs/redux';

import { MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';

import { useMutationRequestSendEmail } from 'modules/auth/data/queries';

const ForgotPassword = () => {
    const mutationRequestLogin = useMutationRequestSendEmail();
    const [success, setSuccess] = useState(false);

    const handleFinish = ({ email }: any) => {
        if(success) {
            mutationRequestLogin.mutate(
                { email },
                {
                    onSuccess: (response) => {
                        if (response.success) {
                            message.success(response.message+". Please check your Email!");
                        } else {
                            message.error(response.message);
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
            <div className="flex-col px-6 bg-white border rounded shadow-md min-w-fit py-14 ">
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
                            },
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!'
                            }
                        ]}
                    >
                        <Input size="large" type="Email" placeholder="Email" />
                    </Form.Item>
                    <Button
                        loading={mutationRequestLogin.isPending}
                        type="primary"
                        className="w-full p-2 mt-3 "
                        htmlType="submit"
                        size="large"
                    >
                        Forgot Password
                    </Button>
                </Form>
                <div className="flex justify-between mt-5 text-sm text-gray-600">
                    <a href={ROUTE_PATHS.SIGN_IN}>Back to sign-in?</a>
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

export default ForgotPassword;
