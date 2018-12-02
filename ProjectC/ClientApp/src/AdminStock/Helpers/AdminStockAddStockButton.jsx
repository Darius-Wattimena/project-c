import React from 'react';

export class AdminStockAddStockButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalActive: props.modalActive
        }
    }

    componentDidUpdate(prevProps) {
        console.log("modal open for button", this.props.modalActive);
        if (this.props.modalActive !== prevProps.modalActive) {
            this.setState((prevState) => ({
                ...prevState,
                modalActive: this.props.modalActive
            }));
        }
    }

    render() {
        return (<button type="button" className="btn btn-success" style={{ float: `right` }} onClick={window.component.onOpenModal.bind(window.component)} data-toggle="modal" data-target={`#Modal${this.props.index}`}>Change Stock</button>);
    }
}