
import { AccountBalanceWallet } from '@material-ui/icons';
import * as React from 'react';
import { HeaderActions, MenuItem } from '../TowerPlugin';
import { IEOHeaderActions } from './components';

export const ieoMenuItems: MenuItem[] = [
    { key: '/tower/plugins/ieo', value: 'Ieo', isLink: true },
];

export const ieoMenuIcons = (name: string) => {
    switch (name) {
        case '/tower/plugins/ieo':
            return (
                <AccountBalanceWallet />
            );
        default: return;
    }
};

export const pagesWithFilter = ['/tower/plugins/ieo'];
export const pagesWithRefresh = ['/tower/plugins/ieo'];
export const pagesWithExport = ['/tower/plugins/ieo'];

export const ieoActions: HeaderActions = {
    pagesWithFilter,
    pagesWithRefresh,
    pagesWithExport,
    customHeaderActions: <IEOHeaderActions />,
};

export const api = true;
