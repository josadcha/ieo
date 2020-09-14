import { History } from 'history';
import * as React from 'react';
import {
    connect,
    MapDispatchToPropsFunction,
    MapStateToProps,
} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { tablePageLimit } from '../../../../api/config';
import {
    AppState,
    CurrencyItem,
    getCurrenciesList,
    selectCurrenciesList,
} from '../../../../modules';
import {
    getListIEO,
    ItemIEO,
    selectIEOList,
    selectIEOListTotal,
} from '../../modules';

interface State {
    page: number;
    rowsPerPage: number;
    filterName: string;
    filterState: string;
    filterCurrencyId: string;
}

interface ReduxProps {
    total: number;
    list: ItemIEO[];
    currencies: CurrencyItem[];
}

interface DispatchProps {
    getListIEO: typeof getListIEO;
    getCurrenciesList: typeof getCurrenciesList;
}

interface HistoryProps {
    history: History;
}

type Props = ReduxProps & DispatchProps & HistoryProps;

class IEOAddScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            page: 0,
            rowsPerPage: tablePageLimit(),
            filterName: '',
            filterState: '',
            filterCurrencyId: '',
        };
    }

    public componentDidMount() {
        this.props.getListIEO({
            page: this.state.page + 1,
            limit: tablePageLimit(),
        });
        this.props.getCurrenciesList();
    }

    public render() {

        return (
            <React.Fragment>
                ADD IEO screen
            </React.Fragment>
        );
    }
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> =
    (state: AppState): ReduxProps => ({
        list: selectIEOList(state),
        total: selectIEOListTotal(state),
        currencies: selectCurrenciesList(state),
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    getListIEO: payload => dispatch(getListIEO(payload)),
    getCurrenciesList: payload => dispatch(getCurrenciesList(payload)),
});

// tslint:disable-next-line:no-any
export const IEOAdd = withRouter(connect(mapStateToProps, mapDispatchToProps)(IEOAddScreen) as any);
