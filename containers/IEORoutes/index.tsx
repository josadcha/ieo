import * as React from 'react';
import { IEOList } from '..';
import { PrivateRoute } from '../../../../router';
import { IEOAdd } from '../IEOAdd';

export const ieoRoutes = (userLoading, isCurrentSession) => {
    return ([
            <PrivateRoute
                loading={userLoading}
                isLogged={isCurrentSession}
                exact={true}
                path="/tower/plugins/ieo"
                component={IEOList}
            />,
            <PrivateRoute
                loading={userLoading}
                isLogged={isCurrentSession}
                exact={true}
                path="/tower/plugins/ieo/add"
                component={IEOAdd}
            />,
    ]);
};
