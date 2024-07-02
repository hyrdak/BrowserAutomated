import React from 'react';
import { QUERY_KEYS, ROUTE_PATHS } from 'constants-es';

import { DeleteOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Popconfirm } from 'antd';
import confirm from 'antd/es/modal/confirm';

import { useMutationDeleteWorkflow } from 'modules/work-flows/data/queries/use-query-remove-workflow';

type Props = { data: any };

const ButtonDelete = ({ data }: Props) => {
    const mutationDelete = useMutationDeleteWorkflow();
    const queryClient = useQueryClient();

    return (
        <Popconfirm
            placement="leftBottom"
            title="Are you sure to delete this type?"
            onConfirm={()=>{
                return mutationDelete.mutateAsync(data.id, {
                    onSuccess: (response: any) => {
                        if (response.success) {
                            queryClient.invalidateQueries({
                                queryKey: [QUERY_KEYS.WORKFLOWS]
                            });
                        }
                    }
                });
            }}
            okText="Yes"
            cancelText="No"
        >
            <Button type="primary" danger icon={<DeleteOutlined />}></Button>
        </Popconfirm>
    );
};

export default ButtonDelete;
