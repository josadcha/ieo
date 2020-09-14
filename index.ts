
import { TowerPlugin, TowerPluginInterface } from '../TowerPlugin';
import { api, ieoActions, ieoMenuIcons, ieoMenuItems } from './constants';
import { Currencies, ieoRoutes } from './containers';
import { ieoPluginReducer, rootIeoPluginSaga } from './modules';

export * from './modules';

export const IeoPlugin: TowerPluginInterface =
    new TowerPlugin(ieoPluginReducer, rootIeoPluginSaga, ieoRoutes, ieoActions, ieoMenuItems, ieoMenuIcons, api);

export const CustomFactoryMap = {
    Currencies,
};
