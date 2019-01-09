import React from 'react';
import { connect } from 'react-redux';

import { statisticsActions } from '../../_actions';

class AdminStatisticsTopPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        this.props.dispatch(statisticsActions.getTotalUsers());
    }

    render() {
        const { statistics } = this.props;
        return (
            <div>
            {statistics.data &&
                <div className="row admin-statistics-top-row">
                    <div className="col admin-statistics-panel admin-statistics-top-panel text-center">
                        <h4>Total Users</h4>
                        <h5><i className="fas fa-users"/> {statistics.data.totalUsers}</h5>
                    </div>
                    <div className="col admin-statistics-panel admin-statistics-top-panel">
                            
                    </div>
                    <div className="col admin-statistics-panel admin-statistics-top-panel">

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

const connectedPage = connect(mapStateToProps)(AdminStatisticsTopPanel);
export { connectedPage as AdminStatisticsTopPanel };