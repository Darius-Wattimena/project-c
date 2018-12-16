import React from 'react';
import { connect } from 'react-redux';
import { wishlistActions } from '../../_actions/wishlist.actions';

class RenameModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            wishlist: props.wishlist
        };

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            wishlist: {
                ...this.state.wishlist,
                name: e.target.value
            }
        });
    }

    handleUpdate() {
        // Perform update
        this.props.updateWishlist(this.state.wishlist);
    }

    render() {
        const { wishlist } = this.props;
        return (
            <div className="modal" id={`renameModal${wishlist.id}`} tabindex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Editing {wishlist.name}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <table class="table">
                                <tr>
                                    <td><h5>Name</h5></td>
                                    <td><input id={`wishlistEdit${wishlist.id}`} className="input" onChange={this.handleChange} value={this.state.wishlist.name} /></td>
                                </tr>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" onClick={this.handleUpdate} data-dismiss="modal" className="btn btn-danger">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { } = state;
    return {

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateWishlist: wishlist => { dispatch(wishlistActions.updateWishlist(wishlist)) },
    }
};

const connectedPage = connect(mapStateToProps, mapDispatchToProps)(RenameModal);
export { connectedPage as RenameModal };