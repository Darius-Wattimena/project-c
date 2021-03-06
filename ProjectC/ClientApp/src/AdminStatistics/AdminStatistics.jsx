﻿import React from 'react';
import { connect } from 'react-redux';
import { AdminStatisticsOrderPanel, AdminStatisticsIncomePanel, AdminStatisticsTopPanel, AdminStatisticsProductsPanel } from './Helpers'

import 'react-datepicker/dist/react-datepicker-cssmodules.css';

var baseDate = new Date();

class AdminStatistics extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { statistics } = this.props;
        return (
            <div className="container admin-panel panel col-10" style={{ width: "100vw" }}>
                <h3>Statistics</h3>
                <hr />
                {!statistics.data &&
                    <div className="progress">
                        <div className="indeterminate"></div>
                    </div>
                }
                <AdminStatisticsTopPanel />
                <AdminStatisticsProductsPanel baseDate={baseDate} />
                <AdminStatisticsOrderPanel baseDate={baseDate} />
                <AdminStatisticsIncomePanel baseDate={baseDate} />
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
