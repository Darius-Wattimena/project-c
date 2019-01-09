import React from 'react';
import { connect } from 'react-redux';
import { Tooltip, CartesianGrid, XAxis, YAxis, Legend, Area, AreaChart } from 'recharts';

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
        const products = Object.keys(data[0]).reduce((result, currentKey) => {
            if (currentKey !== "date") {
                result.push(currentKey);
            }
            return result;
        }, []);
        const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
        return (
            <div className="row">
                <div className="col-10">
                    <h4>Total Products Sold</h4>
                    <AreaChart width={1100} height={300} data={data} animated={true}>
                        <CartesianGrid strokeDasharray={products.length + ` ` + products.length} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {products.map((product, index) =>
                            <Area type="monotone" dataKey={product} stroke={colors[index % colors.length]} fill={colors[index % colors.length]} />
                        )}
                    </AreaChart>
                </div>
                <AdminStatisticsDateRange base={base} loading={loading} selectedOption={selectedOption} name="totalProducts" />
            </div>);
    }
}

class AdminStatisticsProductsPanel extends React.Component {
    constructor(props) {
        super(props);

        var week = dateHelper.getLastWeek();

        this.state = {
            updated: false,
            startDate: week.monday,
            endDate: week.sunday,
            selectedOption: "lastWeek"
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
        this.props.dispatch(statisticsActions.getTotalProductsSold(this.state.startDate, this.state.endDate));
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
                    <CustomPanel loading={statistics.data.totalProductsLoading}
                        data={statistics.data.totalProducts} base={this}
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

const connectedPage = connect(mapStateToProps)(AdminStatisticsProductsPanel);
export { connectedPage as AdminStatisticsProductsPanel };