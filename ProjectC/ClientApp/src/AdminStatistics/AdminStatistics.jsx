import React from 'react';
import { connect } from 'react-redux';
import { AreaChart, Tooltip, Area, CartesianGrid, XAxis, YAxis } from 'recharts';
import { statisticsActions } from '../_actions';

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
                <AreaChart width={900} height={500} data={statistics.items}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type='monotone' dataKey='uv' stroke='#82ca9d' fill='#82ca9d' />
                </AreaChart>
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
