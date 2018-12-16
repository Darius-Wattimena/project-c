import React from 'react';
import { connect } from 'react-redux';
import { Tooltip, CartesianGrid, XAxis, YAxis, Bar, BarChart } from 'recharts';
import DatePicker from "react-datepicker";

import { statisticsActions } from '../../_actions';

var startDate = new Date();
var endDate = new Date();

class AdminStatisticsOrderPanel extends React.Component {
    constructor(props) {
        super(props);

        endDate.setDate(props.baseDate.getDate());
        startDate.setDate(endDate.getDate() - 6);

        this.state = {
            updated: false,
            startDate: startDate,
            endDate: endDate
        };

        this.onChange = {
            startDate: this.handleChange.bind(this, 'startDate'),
            endDate: this.handleChange.bind(this, 'endDate')
        }
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
        return (
            <div>
                {statistics.data &&
                    <div className="row admin-statistics-panel">
                        <div className="col-10">
                            <h4>Total Orders</h4>
                            <BarChart width={900} height={300} data={statistics.data.orders} animated={true}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Tooltip/>
                                <Bar dataKey="orders" fill="#82ca9d"/>
                            </BarChart>
                        </div>
                        <div className="col-2">
                            <h4>Date Range</h4>
                            <h6>Start</h6>
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.onChange.startDate}
                                maxDate={this.state.endDate}/>
                            <h6>End</h6>
                            <DatePicker
                                selected={this.state.endDate}
                                onChange={this.onChange.endDate}
                                minDate={this.state.startDate}/>
                        </div>
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