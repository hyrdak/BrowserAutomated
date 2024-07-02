import { useEffect, useState } from 'react';
import { ROUTE_PATHS } from 'constants-es';
import { useAppSelector } from 'libs/redux';

import { useQueryClient } from '@tanstack/react-query';
import { Table } from 'antd';

import { useUIConfig } from 'data/store/ui-config/use-ui-config';
import { useMutationCreateWorkflow } from 'modules/work-flows/data/queries';
import { useMutationDeleteWorkflow } from 'modules/work-flows/data/queries/use-query-remove-workflow';
import { useQueryGetWorkflows } from 'modules/work-flows/data/queries/use-query-workflows';
import { PageHeaderProvider } from 'components/core/page-header-provider';

import { ModalCreateReactFlow } from './components/modal-create-react-flow';
import { getTableColumnsConfig } from './table-config';

import 'reactflow/dist/style.css';


const WorkflowListingRoot = (e:any) => {
    const { data, isFetching } = useQueryGetWorkflows(e?.id);
    const { isSmallScreen } = useUIConfig();
    const columns = getTableColumnsConfig({
        isSmallScreen
    });

    return (
        <div style={{}}>
            <PageHeaderProvider extra={<ModalCreateReactFlow />} />
            <Table loading={isFetching} dataSource={data?.data || []} columns={columns}></Table>
        </div>
    );
};

export default WorkflowListingRoot;
// import { useEffect, useState } from 'react';
// import { QUERY_KEYS, ROUTE_PATHS } from 'constants-es';
// import { useAppSelector } from 'libs/redux';

// import { useQueryClient } from '@tanstack/react-query';
// import { Table } from 'antd';

// import { useUIConfig } from 'data/store/ui-config/use-ui-config';
// import { useQueryUserProfile } from 'modules/auth/data/queries/use-query-user-profile';
// import { useMutationCreateWorkflow } from 'modules/work-flows/data/queries';
// import { useMutationDeleteWorkflow } from 'modules/work-flows/data/queries/use-query-remove-workflow';
// import { useMutatioGetWorkflow } from 'modules/work-flows/data/queries/use-query-workflows';
// import { PageHeaderProvider } from 'components/core/page-header-provider';

// import { ModalCreateReactFlow } from './components/modal-create-react-flow';
// import { getTableColumnsConfig } from './table-config';

// import 'reactflow/dist/style.css';

// const WorkflowListingRoot = () => {
//     const { user } = useAppSelector((state) => state.auth);
//     const mutationGetWorkflow = useMutatioGetWorkflow();
//     const { isSmallScreen } = useUIConfig();
//     const queryClient = useQueryClient();
//     const [data, setData] = useState([]);
//     const columns = getTableColumnsConfig({
//         isSmallScreen
//     });
//     useEffect(() => {
//         mutationGetWorkflow.mutateAsync(user?.id, {
//             onSuccess: (response: any) => {
//                 if (response.success) {
//                     console.log(response);
//                     setData(response.data);
//                     queryClient.invalidateQueries({
//                         queryKey: [QUERY_KEYS.WORKFLOWS]
//                     });
//                 }
//             }
//         });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     },[user])

//     return (
//         <div style={{}}>
//             <PageHeaderProvider extra={<ModalCreateReactFlow />} />
//             <Table dataSource={data || []} columns={columns}></Table>
//         </div>
//     );
// };

// export default WorkflowListingRoot;