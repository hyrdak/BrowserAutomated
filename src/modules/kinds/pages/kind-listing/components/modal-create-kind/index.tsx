import { useState } from 'react';
import { QUERY_KEYS } from 'constants-es';
import { useAppSelector } from 'libs/redux';

import { PlusOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Form, Input, message, Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';

import { useMutationCreateKind } from 'modules/kinds/data/queries';
import { initialNodes } from 'components/common/react-flows/constants';

export const ModalCreateKind = () => {
    const [form] = useForm();
    const [open, setOpen] = useState(false);
    const { user } = useAppSelector((state) => state.auth);
    const queryClient = useQueryClient();

    const mutationCreateKind = useMutationCreateKind();
    const loading = mutationCreateKind.isPending;

    const handleSubmit = (values: any) => {
        const dataCreated = {
            name: values.name,
        };
        mutationCreateKind.mutate(dataCreated, {
            onSuccess: (response: any) => {
                if (response.success) {
                    message.success('Create new kind instance successfully');
                    setOpen(false);
                    queryClient.invalidateQueries({
                        queryKey: [QUERY_KEYS.KINDS]
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
                title={'Create new kind instance'}
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
                                message: 'Please input name kind!'
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
