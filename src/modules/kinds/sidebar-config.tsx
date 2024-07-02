import { ROUTE_PATHS, SidebarMenuItemType } from 'constants-es';

import { SidebarMenuItem } from 'interfaces/sidebar-menu-item';

export const KindSidebarConfig: SidebarMenuItem[] = [
    {
        id: 'nodes',
        label: 'Kinds',
        path: ROUTE_PATHS.KINDS,
        permissions: [],
        children: []
    }
];
