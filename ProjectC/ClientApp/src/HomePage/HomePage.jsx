import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
        const { users } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi!</h1>

                <p><a href="checkout">Shopping cart
                    <span>
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAMAAAAPdrEwAAAAZlBMVEX///8AAACJiYk9PT2Pj4/s7OygoKDY2NhMTEykpKR6enrn5+fz8/PPz8+pqanMzMzExMSvr69fX19aWlpoaGje3t5UVFSYmJi+vr4wMDC2trb5+flDQ0MWFhY4ODhxcXEMDAwiIiLublIIAAACGklEQVRYhe2Y25aCIBSG3Yii5jEDq9Gc3v8lJ4VNa0bNwLyZxXcjsuN3HzhonudwOBwOh+MfUmQjRfpxZQ6K08elkar72kv6AHwvaQ+a3aST227SBeyW7BTOe0l7QlCi0I0FqGGAIfiKFlpsdTfsvD07L3Awk+YQ6AB0J9WL9PCcQUfj5QUhtnodMNH+nUv9EChMpRMfW1QLPqWJXlIUTJW9Ug+J2VQ60akBaiydAsbMcuyjOv/HpweGRRxo64aOJIIqIqIazV3ZGr82V/aaLpDwUyobacJUV0ZUF9OxmcB0qHp26VyXV9WIzYs4ALFqRBPpECtrUcSBHiUJVo/8jaOw3NfPGGyF+dTPwNodhWfFASrOHvCKjlfG+5JJTrIjg+u6zCxtW8Ujfj5e8rqR902dy3u7Ij6geNTgAsGEZJW8dsRWWk8/rBqWMczkE2xWogKUdyT9La0WfL/hAD0pdyn/LS232cC6iA9yVaZSbcl4FMjcV9ZFHP16iXURB25tHC7SBOsCy9B2y+iXFLDJs5dsmQQr1Pu9aOdbJthrOLD1H1lysTtG3uHY1UJEMwgh6nx9/DL3cdn1yZTRcLFXlgJzZ2soLYmt8tcdHm9+Edynb9CXweMIvm0/MIPRYQrdRCD9Hhyes7yLD1CWAP7UIgDO5ZZkX2VGZ75rSmnZsA/Ew/hqzlINlk1fl2mx9FfAssXhcDgcDse/4Qc4xRdAyaOZqAAAAABJRU5ErkJggg=="
                            style={{ width: '20px', height:'20px'}}
                        />
                    </span>
                    </a>
                </p>

                <p>Register <a href="register">here</a></p>
                <h3>All registered users:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <table class="table">
                        <tr>
                        <th scope="col">ID</th>
                            <th scope="col">Username</th>
                            <th scope="col">Firstname</th>
                            <th scope="col">Lastname</th>
                            <th scope="col">Actions</th>
                        </tr>
                        {users.items.map((user, index) =>
                            <tr>
                                <td scope="row">{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td>{
                                    user.deleting ? <em> - Deleting...</em>
                                        : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                            : <span> Edit - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                                }</td>
                            </tr>
                        )}
                                
                    </table>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users } = state;
    return {
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };