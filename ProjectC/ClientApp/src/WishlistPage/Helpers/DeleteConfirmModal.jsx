import React from 'react';
import { connect } from 'react-redux';
import { wishlistActions } from '../../_actions/wishlist.actions';

class DeleteConfirmModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { wishlist } = this.props;
        return (
            <div className="modal" id={`deleteModal${wishlist.id}`} tabindex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Deleting {wishlist.name}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete your '{wishlist.name}' wishlist?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" onClick={this.props.deleteWishlist.bind(this, wishlist.id)} data-dismiss="modal" className="btn btn-danger">Delete</button>
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
        deleteWishlist: wishlistId => { dispatch(wishlistActions.deleteWishlist(wishlistId)) },
    }
};

const connectedPage = connect(mapStateToProps, mapDispatchToProps)(DeleteConfirmModal);
export { connectedPage as DeleteConfirmModal };