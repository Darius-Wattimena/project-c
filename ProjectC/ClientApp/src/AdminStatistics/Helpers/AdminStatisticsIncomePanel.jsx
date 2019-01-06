import React from 'react';
import { connect } from 'react-redux';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import DatePicker from "react-datepicker";

import { statisticsActions } from '../../_actions';

var startDate = new Date();
var endDate = new Date();

class CustomDatePickerButton extends React.Component {
    render() {
        return (
            <button className="btn btn-outline-primary" onClick={this.props.onClick}>{this.props.value}</button>
        );
    }
}

class AdminStatisticsIncomePanel extends React.Component {
    constructor(props) {
        super(props);

        endDate.setDate(props.baseDate.getDate());
        startDate.setDate(endDate.getDate() - 6);

        this.state = {
            updated: false,
            startDate: startDate,
            endDate: endDate,
            selectedOption: "customInput"
        };

        this.onChange = {
            startDate: this.handleChange.bind(this, "startDate"),
            endDate: this.handleChange.bind(this, "endDate")
        }
    }

    setDateLastWeek() {
        var monday = this.getLastWeekMonday(new Date());
        var sunday = new Date(monday);
        sunday.setDate(sunday.getDate() + 6);

        this.setState({
            startDate: monday,
            endDate: sunday,
            selectedOption: "lastWeek"
        });
    }

    setDateLastMonth() {
        var date = new Date(),
            y = date.getFullYear(),
            m = date.getMonth();
        var firstDay = new Date(y, m - 1, 1);
        var lastDay = new Date(y, m, 0);

        this.setState({
            startDate: firstDay,
            endDate: lastDay,
            selectedOption: "lastMonth"
        });
    }

    setDateCustomInput() {
        this.setState({
            selectedOption: "customInput"
        });
    }

    getLastWeekMonday(d) {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(d.setDate(diff - 7));
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
        this.props.dispatch(statisticsActions.getIncome(this.state.startDate, this.state.endDate));
    }

    handleOptionChange(changeEvent) {
        switch (changeEvent.target.value) {
            case "lastWeek":
                this.setDateLastWeek();
                break;
            case "lastMonth":
                this.setDateLastMonth();
                break;
            case "customInput":
                this.setDateCustomInput();
                break;
            default:
                break;
        }
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
                    <div className="row admin-statistics-panel">
                        <div className="col-9">
                            <h4>Total Income</h4>
                            <AreaChart width={1100} height={300} data={statistics.data.income} animated={true}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="income" stroke="#82ca9d" fill="#82ca9d" />
                            </AreaChart>
                        </div>
                        <div className="col-3">
                            <h4>Date Range</h4>
                            <div className="custom-control custom-radio">
                                <input type="radio" id="incomeLastMonth" value="lastMonth" className="custom-control-input"
                                       checked={selectedOption === "lastMonth"}
                                       onChange={this.handleOptionChange.bind(this)} />
                                <label className="custom-control-label" htmlFor="incomeLastMonth">Last Month</label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input type="radio" id="incomeLastWeek" value="lastWeek" className="custom-control-input"
                                       checked={selectedOption === "lastWeek"}
                                       onChange={this.handleOptionChange.bind(this)} />
                                <label className="custom-control-label" htmlFor="incomeLastWeek">Last Week</label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input type="radio" id="incomeCustomInput" value="customInput" className="custom-control-input"
                                       checked={selectedOption === "customInput"}
                                       onChange={this.handleOptionChange.bind(this)} />
                                <label className="custom-control-label" htmlFor="incomeCustomInput">Custom Input</label>
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

const connectedPage = connect(mapStateToProps)(AdminStatisticsIncomePanel);
export { connectedPage as AdminStatisticsIncomePanel };