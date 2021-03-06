﻿import React from 'react';
import { connect } from 'react-redux';
import { Tooltip, CartesianGrid, XAxis, YAxis, Bar, BarChart } from 'recharts';

import { dateHelper } from "../../_helpers";
import { statisticsActions } from '../../_actions';

import { AdminStatisticsDateRange } from "./index";

function CustomPanel(props) {
    const { base, loading, data, selectedOption } = props;
    if (loading && !data) {
        return (<div className="progress">
                    <div className="indeterminate"></div>
                </div>);
    } else {
        return (
            <div className="row">
                <div className="col-10">
                    <h4>Total Orders</h4>
                    <BarChart width={1100} height={300} data={data} animated={true}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="orders" fill="#82ca9d" />
                    </BarChart>
                </div>
                <AdminStatisticsDateRange base={base} loading={loading} selectedOption={selectedOption} name="totalOrders" />
            </div>);
    }
}

class AdminStatisticsOrderPanel extends React.Component {
    constructor(props) {
        super(props);

        var week = dateHelper.getCurrentWeek();

        this.state = {
            updated: false,
            startDate: week.monday,
            endDate: week.sunday,
            selectedOption: "thisWeek"
        };
    }

    setDateState(firstDay, lastDay, caseName) {
        this.setState({
            startDate: firstDay,
            endDate: lastDay,
            selectedOption: caseName
        });
    }

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.startDate !== prevState.startDate || this.state.endDate !== prevState.endDate) {
            this.getData();
        }
    }

    getData() {
        this.props.dispatch(statisticsActions.getOrders(this.state.startDate, this.state.endDate));
    }

    handleChange(name, date) {
        this.setState({ [name]: date });
    }

    render() {
        const { statistics } = this.props;
        const { selectedOption } = this.state;
        return (
            <div>
                {statistics.data &&
                    <div className="admin-statistics-panel">
                        <CustomPanel loading={statistics.data.ordersLoading}
                            data={statistics.data.orders} base={this}
                            selectedOption={selectedOption} />
                    </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { statistics } = state;
    return {
        statistics
    };
}

const connectedPage = connect(mapStateToProps)(AdminStatisticsOrderPanel);
export { connectedPage as AdminStatisticsOrderPanel };