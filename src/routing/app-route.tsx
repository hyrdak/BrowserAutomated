import {
    BrowserRouter,
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Outlet,
    Route,
    RouterProvider,
    Routes
} from 'react-router-dom';
import { ROUTE_PATHS } from 'constants-es';
import { useAppSelector } from 'libs/redux';

import { useAuth } from 'data/store/auth/use-auth';
import ForgotPassword from 'modules/auth/pages/forgot-password';
import RecoveryPassword from 'modules/auth/pages/recovery-password';
import Login from 'modules/auth/pages/sign-in';
import SignUp from 'modules/auth/pages/sign-up';
import ElementListingRoot from 'modules/elements/pages/element-listing';
import KindListingRoot from 'modules/kinds/pages/kind-listing';
import NodeListingRoot from 'modules/nodes/pages/node-listing';
import TypeListingRoot from 'modules/type/pages/type-listing';
import WorkflowDetail from 'modules/work-flows/pages/work-flow-detail';
import WorkflowListingRoot from 'modules/work-flows/pages/work-flow-listing';
import AppLayout from 'components/layouts/app-layout';
import PrivateLayout from 'components/layouts/private-layout';

import PrivateRoute from './private-route';

const AppRoutes = () => {
    const { isAuthenticated } = useAuth();
    const { user, isFetched } = useAppSelector((state) => state.auth);
    const router = createBrowserRouter(
        createRoutesFromElements(
            isAuthenticated ? (
                <Route
                    element={
                        <PrivateLayout>
                            <Outlet />
                        </PrivateLayout>
                    }
                >
                    {   
                        isFetched ? (
                            <Route index path={ROUTE_PATHS.WORK_FLOWS} element={<WorkflowListingRoot id={user?.id} />} />
                        ) : (
                            <Route index path={ROUTE_PATHS.WORK_FLOWS}/>
                        )
                    }
                    <Route path={'*'} element={<Navigate to={ROUTE_PATHS.WORK_FLOWS} />} />
                    <Route path={ROUTE_PATHS.WORK_FLOWS_DETAIL} element={<WorkflowDetail />} />
                    <Route path={ROUTE_PATHS.NODES} element={<NodeListingRoot />} />
                    <Route path={ROUTE_PATHS.KINDS} element={<KindListingRoot />} />
                    <Route path={ROUTE_PATHS.TYPES} element={<TypeListingRoot />} />
                    <Route path={ROUTE_PATHS.ELEMENTS} element={<ElementListingRoot />} />
                    <Route path={ROUTE_PATHS.SIGN_IN} element={<Navigate to={ROUTE_PATHS.WORK_FLOWS} />} />
                </Route>
            ) : (
                <Route>
                    <Route path={ROUTE_PATHS.SIGN_IN} element={<Login />} />
                    <Route path={ROUTE_PATHS.SIGN_UP} element={<SignUp />} />
                    <Route path={ROUTE_PATHS.FORGOT_PASSWORD} element={<ForgotPassword />} />
                    <Route path={ROUTE_PATHS.RECOVERY_PASSWORD} element={<RecoveryPassword />} />
                    <Route path={'/*'} element={<Navigate to={ROUTE_PATHS.SIGN_IN} />} />
                </Route>
            )
        )
    );

    return <RouterProvider router={router} />;
};

export default AppRoutes;
