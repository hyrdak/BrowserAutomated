import { flatten } from 'lodash';

import { SidebarMenuItem } from 'interfaces/sidebar-menu-item';

import { elementSidebarConfig } from './elements';
import { KindSidebarConfig } from './kinds';
import { nodeSidebarConfig } from './nodes';
import { TypeSidebarConfig } from './type';
import { workflowSidebarConfig } from './work-flows';

export const sidebarConfigs: SidebarMenuItem[] = flatten([workflowSidebarConfig, nodeSidebarConfig, KindSidebarConfig, TypeSidebarConfig ]);
