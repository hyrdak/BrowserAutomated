import { EditFilled } from '@ant-design/icons';
import { Button, Table } from 'antd';

import { useQueryGetNodes } from "modules/nodes/data/queries/use-query-nodes";
import { PageHeaderProvider } from 'components/core/page-header-provider';

import { ModalCreateNode } from './components/modal-create-update-node';
import getTableColumnsConfig from './table-config';

const NodeListingRoot = () => {
    const { data, isFetching } = useQueryGetNodes();
    const columns = getTableColumnsConfig();

    return (
        <>
            <PageHeaderProvider extra={<ModalCreateNode />} />
            <Button
                icon={<EditFilled />}
                onClick={() => window.location.href = '/nodes/types'}
                className='ml-auto'
            >Type
            </Button>
            <Button
                icon={<EditFilled />}
                onClick={() => window.location.href = '/nodes/kinds'}
                className='ml-2 mb-2'
            >Kind
            </Button>
            <Table loading={isFetching} dataSource={data?.data || []} columns={columns} bordered />
        </>
    );
};

export default NodeListingRoot;
