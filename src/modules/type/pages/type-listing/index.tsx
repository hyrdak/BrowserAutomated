import { useEffect, useState } from 'react';
import { ROUTE_PATHS } from 'constants-es';

import { NodeCollapseOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Table } from 'antd';

import { useUIConfig } from 'data/store/ui-config/use-ui-config';
import { useQueryGetType } from 'modules/type/data/queries/use-query-types';
import { useMutationCreateWorkflow } from 'modules/work-flows/data/queries';
import { useMutationDeleteWorkflow } from 'modules/work-flows/data/queries/use-query-remove-workflow';
import { PageHeaderProvider } from 'components/core/page-header-provider';

import { ModalCreateType } from './components/modal-create-type';
import getTableColumnsConfig from './table-config';

import 'reactflow/dist/style.css';

const TypeListingRoot = () => {
    const { data, isFetching } = useQueryGetType();
    const { isSmallScreen } = useUIConfig();

    const columns = getTableColumnsConfig();

    return (
        <div style={{}}>
            <PageHeaderProvider extra={<ModalCreateType />} />
            <Button
                icon={<NodeCollapseOutlined/>}
                onClick={() => window.location.href = '/nodes'}
                className='mb-2'
                >Nodes
            </Button>
            <Table loading={isFetching} dataSource={data?.data || []} columns={columns}></Table>
        </div>
    );
};

export default TypeListingRoot;