import { useState } from 'react';
import ReactJson from 'react-json-view';
import { QUERY_KEYS } from 'constants-es';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, message, Popconfirm } from 'antd';
import cloneDeep from 'lodash/cloneDeep';

import { useMutationDeleteKind } from 'modules/kinds/data/queries/use-query-remove-kinds';

import { ModalEditKind } from './components/modal-edit-kind';

const GetTableColumnsConfig = () => {
    const mutationDelete = useMutationDeleteKind();
    const queryClient = useQueryClient();
    const [flag, setFlag] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(-1);
    async function handleEdit(e:any) {
        if(e == currentRecord) {
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
            width: 800
        },
        {
          title: 'Actions',
          key: 'actions',
          width: 20,
          render: (text: string, record: any) => (
            <span>
                <Button type="primary" className='mr-1' icon={<EditOutlined />} onClick={()=>{handleEdit(record.id)}}></Button>
                {(flag && currentRecord==record.id)?(
                    <ModalEditKind obj={record}/>
                ):''}
                <Popconfirm
                    placement="leftBottom"
                    title="Are you sure to delete this type?"
                    onConfirm={()=>{
                        return mutationDelete.mutateAsync(record.id, {
                            onSuccess: (response: any) => {
                                if (response.success) {
                                    queryClient.invalidateQueries({
                                         queryKey: [QUERY_KEYS.KINDS]
                                    });
                                    setFlag(false);
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