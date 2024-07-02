import { useState } from 'react';
import ReactJson from 'react-json-view';
import { QUERY_KEYS } from 'constants-es';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, message, Popconfirm } from 'antd';
import cloneDeep from 'lodash/cloneDeep';

import { useMutationDeleteNode } from 'modules/nodes/data/queries/use-query-remove-nodes';

import { ModalCreateNodeEx } from './components/modal-create-update-node/modal-create-update-node';


const GetTableColumnsConfig = () => {
    const mutationDelete = useMutationDeleteNode();
    const queryClient = useQueryClient();
    const [flag, setFlag] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(-1);
    async function handleEdit(e: any) {
        if (e == currentRecord) {
            await setFlag(false);
            setFlag(true);
            setCurrentRecord(e);
        } else {
            setFlag(true);
            setCurrentRecord(e);
        }
    }
    async function handleDelete(id: any) {

    }

    //row
    const columnConfig: any[] = [
        {
            title: '#',
            key: 'id',
            dataIndex: 'id',
            width: 10,
            align: 'center',
            render: (_id: string, _record: any, index: number) => <span className="capitalize">{index + 1}</span>
        },
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            width: 150
        },
        {
            title: 'Type',
            key: 'type',
            dataIndex: 'type',
            width: 100
        },
        {
            title: 'Kind',
            key: 'kind',
            dataIndex: 'kind',
            width: 100,
            render: (kind: string) => <span className="capitalize">{kind}</span>
        },
        {
            title: 'JSON Options',
            key: 'dataOptions',
            dataIndex: 'dataOptions',
            render: (dataOptions: any) => {
                return (
                    <ReactJson
                        // theme={'paraiso'}
                        name={false}
                        src={dataOptions}
                        displayDataTypes={false}
                        collapsed
                        style={{
                            maxHeight: '80vh',
                            overflow: 'auto'
                        }}
                    />
                );
            }
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 180,
            render: (text: string, record: any) => (
                <span>
                    <Button type="primary" className='mr-1' icon={<EditOutlined />} onClick={() => { handleEdit(record.id) }}></Button>
                    {(flag && currentRecord == record.id) ? (
                        <>
                            <ModalCreateNodeEx id={record.id} dataForm={record.dataForm} update={true} />
                        </>
                    ) : ''}
                    <Popconfirm
                        placement="leftBottom"
                        title="Are you sure to delete this type?"
                        onConfirm={() => {
                            return mutationDelete.mutateAsync(record.id, {
                                onSuccess: (response: any) => {
                                    if (response.success) {
                                        queryClient.invalidateQueries({
                                            queryKey: [QUERY_KEYS.NODES]
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
                </span>
            ),
        },
    ];

    return columnConfig;
};
export default GetTableColumnsConfig;