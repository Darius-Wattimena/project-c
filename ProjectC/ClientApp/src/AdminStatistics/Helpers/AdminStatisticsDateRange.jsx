import React from 'react';
import DatePicker from "react-datepicker";
import { dateHelper } from "../../_helpers";

class CustomDatePickerButton extends React.Component {
    render() {
        return (
            <button className="btn btn-outline-primary" onClick={this.props.onClick}>{this.props.value}</button>
        );
    }
}

export class AdminStatisticsDateRange extends React.Component {
    constructor(props) {
        super(props);
        
        this.onChange = {
            startDate: props.base.handleChange.bind(props.base, 'startDate'),
            endDate: props.base.handleChange.bind(props.base, 'endDate')
        }
    }

    setDateLastWeek() {
        var week = dateHelper.getLastWeek();
        this.props.base.setDateState(week.monday, week.sunday, "lastWeek");
    }

    setDateCurrentWeek() {
        var week = dateHelper.getCurrentWeek();
        this.props.base.setDateState(week.monday, week.sunday, "thisWeek");
    }

    setDateLastMonth() {
        var month = dateHelper.getLastMonth();
        this.props.base.setDateState(month.firstDay, month.lastDay, "lastMonth");
    }

    setDateThisMonth() {
        var month = dateHelper.getCurrentMonth();
        this.props.base.setDateState(month.firstDay, month.lastDay, "thisMonth");
    }

    setDateCustomInput() {
        this.props.base.setState({
            selectedOption: "customInput"
        });
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
        const { base, loading, selectedOption, name } = this.props;
        return (
            <div className="col-2">
                <h4>Date Range</h4>
                <div className="custom-control custom-radio">
                    <input disabled={loading} type="radio" id={name + `LastMonth`} value="lastMonth" className="custom-control-input"
                           checked={selectedOption === "lastMonth"}
                           onChange={this.handleOptionChange.bind(this)}/>
                    <label className="custom-control-label" htmlFor={name + `LastMonth`}>Last Month</label>
                </div>
                <div className="custom-control custom-radio">
                    <input disabled={loading} type="radio" id={name + `ThisMonth`} value="thisMonth" className="custom-control-input"
                           checked={selectedOption === "thisMonth"}
                           onChange={this.handleOptionChange.bind(this)}/>
                    <label className="custom-control-label" htmlFor={name + `ThisMonth`}>Current Month</label>
                </div>
                <div className="custom-control custom-radio">
                    <input disabled={loading} type="radio" id={name + `LastWeek`} value="lastWeek" className="custom-control-input"
                           checked={selectedOption === "lastWeek"}
                           onChange={this.handleOptionChange.bind(this)}/>
                    <label className="custom-control-label" htmlFor={name + `LastWeek`}>Last Week</label>
                </div>
                <div className="custom-control custom-radio">
                    <input disabled={loading} type="radio" id={name + `ThisWeek`} value="thisWeek" className="custom-control-input"
                           checked={selectedOption === "thisWeek"}
                           onChange={this.handleOptionChange.bind(this)}/>
                    <label className="custom-control-label" htmlFor={name + `ThisWeek`}>Current Week</label>
                </div>
                <div className="custom-control custom-radio">
                    <input disabled={loading} type="radio" id={name + `CustomInput`} value="customInput" className="custom-control-input"
                           checked={selectedOption === "customInput"}
                           onChange={this.handleOptionChange.bind(this)}/>
                    <label className="custom-control-label" htmlFor={name + `CustomInput`}>Custom Input</label>
                </div>

                {selectedOption === "customInput" &&
                    <div>
                        <h6>Start</h6>
                        <DatePicker
                            selected={base.state.startDate}
                            onChange={this.onChange.startDate}
                            maxDate={base.state.endDate}
                            customInput={<CustomDatePickerButton />}/>
                        <h6>End</h6>
                        <DatePicker
                            selected={base.state.endDate}
                            onChange={this.onChange.endDate}
                            minDate={base.state.startDate}
                            customInput={<CustomDatePickerButton />}/>
                    </div>
                }
            </div>
        );
    }
}