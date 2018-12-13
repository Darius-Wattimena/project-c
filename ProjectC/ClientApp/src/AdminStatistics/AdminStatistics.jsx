import React from 'react';
import { connect } from 'react-redux';
import { AreaChart, Tooltip, Area, CartesianGrid, XAxis, YAxis } from 'recharts';
import DatePicker from "react-datepicker";
import { statisticsActions } from '../_actions';

import 'react-datepicker/dist/react-datepicker-cssmodules.css';

var openDatePickerIndex = 0;
var baseDate = new Date();
var startDate = new Date();
var endDate = new Date();

class AdminStatistics extends React.Component {
    constructor(props) {
        super(props);
        endDate.setDate(baseDate.getDate()+1);
        startDate.setDate(endDate.getDate()-7);

        this.state = {
            updated: false,
            totalOrdersStart: startDate,
            totalOrdersEnd: endDate
        };

        this.onChange = {
            totalOrdersStart: this.handleChange.bind(this, 'totalOrdersStart'),
            totalOrdersEnd: this.handleChange.bind(this, 'totalOrdersEnd')
        }
    }

    componentDidMount() {
        this.props.dispatch(statisticsActions.getOrders(this.state.totalOrdersStart, this.state.totalOrdersEnd));
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.totalOrdersStart !== prevState.totalOrdersStart || this.state.totalOrdersEnd !== prevState.totalOrdersEnd) {
            this.props.dispatch(statisticsActions.getOrders(this.state.totalOrdersStart, this.state.totalOrdersEnd));
          }
    }

    handleChange(name, date) {
        this.setState({ [name]: date });
        this.props.dispatch(statisticsActions.getOrders(this.state.totalOrdersStart, this.state.totalOrdersEnd));
    }

    render() {
        const { statistics } = this.props;
        return (
            <div className="container panel col-md-8" style={{ width: "auto" }}>
                <div className="row">
                    <div className="col-10">
                        <h3>Statistics</h3>
                        <h4>Total orders last 7 days</h4>
                        <AreaChart width={900} height={500} data={statistics.data} animated={true}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area type='monotone' dataKey='uv' stroke='#82ca9d' fill='#82ca9d' />
                        </AreaChart>
                    </div>
                    <div className="col-2">
                        <h6>Start Date</h6>
                        <DatePicker
                            selected={this.state.totalOrdersStart}
                            onChange={this.onChange.totalOrdersStart}
                            maxDate={this.state.totalOrdersEnd}
                        />
                        <h6>End Date</h6>
                        <DatePicker
                            selected={this.state.totalOrdersEnd}
                            onChange={this.onChange.totalOrdersEnd}
                            minDate={this.state.totalOrdersStart}
                        />
                    </div>
                </div>
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

const connectedPage = connect(mapStateToProps)(AdminStatistics);
export { connectedPage as AdminStatistics };
