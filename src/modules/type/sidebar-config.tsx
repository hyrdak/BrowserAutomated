import { ROUTE_PATHS, SidebarMenuItemType } from 'constants-es';

import { SidebarMenuItem } from 'interfaces/sidebar-menu-item';

export const TypeSidebarConfig: SidebarMenuItem[] = [
    {
        id: 'nodes',
        label: 'Types',
        path: ROUTE_PATHS.TYPES,
        permissions: [],
        children: []
    }
];
