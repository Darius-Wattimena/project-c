import React from 'react';
import { connect } from 'react-redux';
import { Tooltip, CartesianGrid, XAxis, YAxis, Bar, BarChart } from 'recharts';
import DatePicker from "react-datepicker";

import { dateHelper } from "../../_helpers"
import { statisticsActions } from '../../_actions';

class CustomDatePickerButton extends React.Component {
    render() {
        return (
            <button className="btn btn-outline-primary" onClick={this.props.onClick}>{this.props.value}</button>
        );
    }
}

class AdminStatisticsOrderPanel extends React.Component {
    constructor(props) {
        super(props);

        var week = dateHelper.getLastWeek();

        this.state = {
            updated: false,
            startDate: week.monday,
            endDate: week.sunday,
            selectedOption: "lastWeek"
        };

        this.onChange = {
            startDate: this.handleChange.bind(this, 'startDate'),
            endDate: this.handleChange.bind(this, 'endDate')
        }
    }

    setDateState(firstDay, lastDay, caseName) {
        this.setState({
            startDate: firstDay,
            endDate: lastDay,
            selectedOption: caseName
        });
    }

    setDateLastWeek() {
        var week = dateHelper.getLastWeek();
        this.setDateState(week.monday, week.sunday, "lastWeek");
    }

    setDateCurrentWeek() {
        var week = dateHelper.getCurrentWeek();
        this.setDateState(week.monday, week.sunday, "thisWeek");
    }

    setDateLastMonth() {

        var month = dateHelper.getLastMonth();
        this.setDateState(month.firstDay, month.lastDay, "lastMonth");
    }

    setDateThisMonth() {
        var month = dateHelper.getCurrentMonth();
        this.setDateState(month.firstDay, month.lastDay, "thisMonth");
    }

    setDateCustomInput() {
        this.setState({
            selectedOption: "customInput"
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

    handleOptionChange(changeEvent) {
        switch (changeEvent.target.value) {
        case "lastWeek":
            this.setDateLastWeek();
            break;
        case "thisWeek":
            this.setDateCurrentWeek();
            break;
        case "lastMonth":
            this.setDateLastMonth();
            break;
        case "thisMonth":
            this.setDateThisMonth();
            break;
        case "customInput":
            this.setDateCustomInput();
            break;
        default:
            break;
        }
    }

    render() {
        const { statistics } = this.props;
        const { selectedOption } = this.state;
        return (
            <div>
                {statistics.data &&
                    <div className="row admin-statistics-panel">
                        <div className="col-10">
                            <h4>Total Orders</h4>
                            <BarChart width={1100} height={300} data={statistics.data.orders} animated={true}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Tooltip/>
                                <Bar dataKey="orders" fill="#82ca9d"/>
                            </BarChart>
                        </div>
                        <div className="col-2">
                            <h4>Date Range</h4>
                        <div className="custom-control custom-radio">
                            <input type="radio" id="ordersLastMonth" value="lastMonth" className="custom-control-input"
                                checked={selectedOption === "lastMonth"}
                                onChange={this.handleOptionChange.bind(this)} />
                            <label className="custom-control-label" htmlFor="ordersLastMonth">Last Month</label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input type="radio" id="ordersThisMonth" value="thisMonth" className="custom-control-input"
                                checked={selectedOption === "thisMonth"}
                                onChange={this.handleOptionChange.bind(this)} />
                            <label className="custom-control-label" htmlFor="ordersThisMonth">Current Month</label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input type="radio" id="ordersLastWeek" value="lastWeek" className="custom-control-input"
                                checked={selectedOption === "lastWeek"}
                                onChange={this.handleOptionChange.bind(this)} />
                            <label className="custom-control-label" htmlFor="ordersLastWeek">Last Week</label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input type="radio" id="ordersThisWeek" value="thisWeek" className="custom-control-input"
                                checked={selectedOption === "thisWeek"}
                                onChange={this.handleOptionChange.bind(this)} />
                            <label className="custom-control-label" htmlFor="ordersThisWeek">Current Week</label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input type="radio" id="ordersCustomInput" value="customInput" className="custom-control-input"
                                checked={selectedOption === "customInput"}
                                onChange={this.handleOptionChange.bind(this)} />
                            <label className="custom-control-label" htmlFor="ordersCustomInput">Custom Input</label>
                        </div>

                            {selectedOption === "customInput" &&
                                <div>
                                    <h6>Start</h6>
                                    <DatePicker
                                        selected={this.state.startDate}
                                        onChange={this.onChange.startDate}
                                        maxDate={this.state.endDate}
                                        customInput={<CustomDatePickerButton />} />
                                    <h6>End</h6>
                                    <DatePicker
                                        selected={this.state.endDate}
                                        onChange={this.onChange.endDate}
                                        minDate={this.state.startDate}
                                        customInput={<CustomDatePickerButton />} />
                                </div>
                            }
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