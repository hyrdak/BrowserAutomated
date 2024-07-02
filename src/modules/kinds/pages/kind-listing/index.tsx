import { useEffect, useState } from 'react';
import { ROUTE_PATHS } from 'constants-es';

import { NodeCollapseOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Table } from 'antd';

import { useUIConfig } from 'data/store/ui-config/use-ui-config';
import { useQueryGetKind } from 'modules/kinds/data/queries/use-query-kinds';
import { useMutationCreateWorkflow } from 'modules/work-flows/data/queries';
import { useMutationDeleteWorkflow } from 'modules/work-flows/data/queries/use-query-remove-workflow';
import { PageHeaderProvider } from 'components/core/page-header-provider';

import { ModalCreateKind } from './components/modal-create-kind';
import getTableColumnsConfig from './table-config';

import 'reactflow/dist/style.css';

const KindListingRoot = () => {
    const { data, isFetching } = useQueryGetKind();
    const { isSmallScreen } = useUIConfig();

    const columns = getTableColumnsConfig();

    return (
        <div style={{}}>
            <PageHeaderProvider extra={<ModalCreateKind />} />
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

export default KindListingRoot;