import { useState } from 'react';
import { QUERY_KEYS } from 'constants-es';
import { useAppSelector } from 'libs/redux';

import { PlusOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Form, Input, message, Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';

import { useMutationCreateType } from 'modules/type/data/queries';

export const ModalCreateType = () => {
    const [form] = useForm();
    const [open, setOpen] = useState(false);
    const { user } = useAppSelector((state) => state.auth);
    const queryClient = useQueryClient();

    const mutationCreateType = useMutationCreateType();
    const loading = mutationCreateType.isPending;

    const handleSubmit = (values: any) => {
        const dataCreated = {
            name: values.name,
        };
        mutationCreateType.mutate(dataCreated, {
            onSuccess: (response: any) => {
                if (response.success) {
                    message.success('Create new type instance successfully');
                    setOpen(false);
                    queryClient.invalidateQueries({
                        queryKey: [QUERY_KEYS.TYPES]
                    });
                } else {
                    message.error(response.message);
                    setOpen(false);
                }
            }
        });

    };

    return (
        <>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
                Create
            </Button>
            <Modal
                open={open}
                confirmLoading={loading}
                afterClose={() => form.resetFields()}
                title={'Create new type instance'}
                destroyOnClose
                onCancel={() => setOpen(false)}
                onOk={() => form.submit()}
            >
                <Form form={form} onFinish={handleSubmit} layout="vertical">
                    <Form.Item
                        name={'name'}
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: 'Please input name type!'
                            }
                        ]}
                    >
                        <Input placeholder="Name" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
