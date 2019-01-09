import React from 'react';
import { connect } from 'react-redux';
import { reviewActions } from '../../_actions/review.actions';

class EditReviewModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            review: props.review
        };

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.base = props.base;
    }

    handleChange(e) {
        // Update the body of the review
        this.setState({
            review: {
                ...this.state.review,
                body: e.target.value
            }
        });
    }

    handleUpdate() {

        var review = this.state.review;

        // Get rating
        // Find out what rating was selected (checking whether 'checked' or not from high to low)
        var stars =
            document.getElementById(`star-5-${review.id}`).checked ? 5 :
                document.getElementById(`star-4-${review.id}`).checked ? 4 :
                    document.getElementById(`star-3-${review.id}`).checked ? 3 :
                        document.getElementById(`star-2-${review.id}`).checked ? 2 :
                            document.getElementById(`star-1-${review.id}`).checked ? 1 :
                                -1;

        review.rating = stars;

        // Perform update
        this.props.updateReview(review);

        // Notify parent to perform update
        //this.base.updateReview(review);
        //this.base.forceUpdate();
    }

    render() {
        // Get review obj from props
        const { review } = this.props;
        return (
            <div className="modal" id={`editReviewModal${review.id}`} tabindex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Editing review</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <table class="table">
                                <tr>
                                    <td><h5>Rating</h5></td>
                                    <td>
                                        <div className="stars row">
                                            <input className="star star-5" id={`star-5-${review.id}`} type="radio" name="star" />
                                            <label className="star star-5" for={`star-5-${review.id}`}></label>
                                            <input className="star star-4" id={`star-4-${review.id}`} type="radio" name="star" />
                                            <label className="star star-4" for={`star-4-${review.id}`}></label>
                                            <input className="star star-3" id={`star-3-${review.id}`} type="radio" name="star" />
                                            <label className="star star-3" for={`star-3-${review.id}`}></label>
                                            <input className="star star-2" id={`star-2-${review.id}`} type="radio" name="star" />
                                            <label className="star star-2" for={`star-2-${review.id}`}></label>
                                            <input className="star star-1" id={`star-1-${review.id}`} type="radio" name="star" />
                                            <label className="star star-1" for={`star-1-${review.id}`}></label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><h5>Review</h5></td>
                                    <td><textarea maxLength="200" id={`reviewBody${review.id}`} className="input" onChange={this.handleChange}>{this.state.review.body}</textarea></td>
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
        updateReview: review => { dispatch(reviewActions.update(review)); },
    }
};

const connectedPage = connect(mapStateToProps, mapDispatchToProps)(EditReviewModal);
export { connectedPage as EditReviewModal };