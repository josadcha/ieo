import { History } from 'history';
import * as React from 'react';
import {
    connect,
    MapDispatchToPropsFunction,
    MapStateToProps,
} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { tablePageLimit } from '../../../../api/config';
import { DataItem } from '../../../../containers/types';
import { getItemFromRequest } from '../../../../helpers';
import {
    AppState,
    changeCurrentRefreshStatus,
    CurrencyItem,
    getCurrenciesList,
    selectCurrenciesList,
    selectCurrenciesListTotal,
    selectCurrentRefreshState,
} from '../../../../modules';
import { FactoryMap } from '../../../../plugins/PluginsTemplate';

interface CurrenciesState {
    page: number;
    rowsPerPage: number;
    filterType: string;
}

interface ReduxProps {
    total: number;
    list: CurrencyItem[];
    refreshStatus: boolean;
}

interface DispatchProps {
    getCurrenciesList: typeof getCurrenciesList;
    changeCurrentRefreshStatus: typeof changeCurrentRefreshStatus;
}

interface HistoryProps {
    history: History;
}

type Props = ReduxProps & DispatchProps & HistoryProps;

class CurrenciesScreen extends React.Component<Props, CurrenciesState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            page: 0,
            rowsPerPage: tablePageLimit(),
            filterType: '',
        };
    }

    private currenciesRows = [
        { key: 'code', alignRight: false, label: 'Code' },
        { key: 'name', alignRight: false, label: 'Name' },
    ];

    private filterData = [
        { property: 'type', value: '', title: 'Type' },
    ];

    public componentDidMount() {
        this.props.getCurrenciesList({
            page: this.state.page + 1,
            limit: tablePageLimit(),
            ordering: 'asc',
        });
    }

    public componentDidUpdate(prevProps: Props) {
        if (this.props.refreshStatus && !prevProps.refreshStatus) {
            this.props.getCurrenciesList({
                page: this.state.page + 1,
                limit: tablePageLimit(),
                ordering: 'asc',
            });

            this.props.changeCurrentRefreshStatus({currentRefreshStatus: false});
        }
    }

    public render() {
        const { page, rowsPerPage } = this.state;
        const { total, list } = this.props;
        const { FilterContainer, Table } = FactoryMap;

        return (
            <React.Fragment>
                <Table
                    dataLength={total}
                    rows={this.currenciesRows}
                    data={list}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={this.handleChangePage}
                    handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                    handleRowOnClick={this.onRowClick}
                />
                <FilterContainer
                    data={this.filterData as DataItem[]}
                    handleSubmit={this.handleSubmitFilter}
                />
             </React.Fragment>
        );
    }

    private handleSubmitFilter = elems => {
        this.setState({
            filterType: getItemFromRequest(elems, 'type'),
            page: 0,
        });

        const payload = {
            type: getItemFromRequest(elems, 'type'),
            page: 1,
            limit: this.state.rowsPerPage,
            ordering: 'asc',
        };

        this.props.getCurrenciesList(payload);
    };

    private onRowClick = currency => {
        this.props.history.push(`/tower/exchange/currencies/${currency.code}/edit`);
    };

    private handleChangePage = (page: number) => {
        const { rowsPerPage } = this.state;
        this.setState({ page });
        this.handleGetCurrencies(rowsPerPage, page);
    };

    private handleChangeRowsPerPage = (rows: number) => {
        this.setState({rowsPerPage: rows, page: 0});
        this.handleGetCurrencies(rows, 0);
    };

    private handleGetCurrencies = (limit: number, page: number) => {
        const payload = {
            type: this.state.filterType,
            page: page + 1,
            limit,
            ordering: 'asc',
        };

        this.props.getCurrenciesList(payload);
    };
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> =
    (state: AppState): ReduxProps => ({
        list: selectCurrenciesList(state),
        total: selectCurrenciesListTotal(state),
        refreshStatus: selectCurrentRefreshState(state),
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    getCurrenciesList: payload => dispatch(getCurrenciesList(payload)),
    changeCurrentRefreshStatus: payload => dispatch(changeCurrentRefreshStatus(payload)),
});

// tslint:disable-next-line:no-any
export const Currencies = withRouter(connect(mapStateToProps, mapDispatchToProps)(CurrenciesScreen) as any);
