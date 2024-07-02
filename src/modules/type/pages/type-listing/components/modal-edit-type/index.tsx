import { useEffect, useState } from 'react';
import { QUERY_KEYS } from 'constants-es';
import { useAppSelector } from 'libs/redux';

import { PlusOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Form, Input, message, Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';

import { useMutationUpdateType } from 'modules/type/data/queries';
import { initialNodes } from 'components/common/react-flows/constants';

export const ModalEditType = (e:any) => {
    const [form] = useForm();
    const [open, setOpen] = useState(true);
    const { user } = useAppSelector((state) => state.auth);
    const queryClient = useQueryClient();

    const mutationUpdateType = useMutationUpdateType();
    const loading = mutationUpdateType.isPending;

    const handleSubmit = (values: any) => {
        const dataCreated = {
            id: e.obj.id,
            name: values.name,
        };
        mutationUpdateType.mutate(dataCreated, {
            onSuccess: (response: any) => {
                if (response.success) {
                    message.success('Edit type instance successfully');
                    queryClient.invalidateQueries({
                        queryKey: [QUERY_KEYS.TYPES]
                    });
                    setOpen(false);
                } else {
                    message.error(response.message);
                    setOpen(false);
                }
            }
        });

    };

    return (
        <Modal
            open={open}
            confirmLoading={loading}
            afterClose={() => form.resetFields()}
            title={'Update type instance'}
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
                    <Input placeholder="Name" defaultValue={e.obj.name}/>
                </Form.Item>
            </Form>
        </Modal>
    );
};