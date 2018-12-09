import React from 'react';
import { connect } from 'react-redux';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { statisticsActions } from '../_actions';

const data = [
    { name: 'Page A', uv: 4000 },
    { name: 'Page B', uv: 3000 },
    { name: 'Page C', uv: 2000 },
    { name: 'Page D', uv: 2780 },
    { name: 'Page E', uv: 1890 },
    { name: 'Page F', uv: 2390 },
    { name: 'Page G', uv: 3490 }
];

class AdminStatistics extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(statisticsActions.getOrders());
    }

    render() {
        const { statistics } = this.props;
        return (
            <div class="panel col-md-8" style={{ width: "auto" }}>
                <h3>Statistics</h3>
                <h4>Total orders last 7 days</h4>
                <LineChart width={900} height={500} data={statistics.items}>
                    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                </LineChart>
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
