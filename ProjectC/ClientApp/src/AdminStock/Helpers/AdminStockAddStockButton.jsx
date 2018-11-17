import React from 'react';

function AddButton({ active, index }) {
    if (!active) {
        return <button type="button" class="btn btn-success" style={{float: `right`}} onClick={window.component.addButtonOnClick.bind(window.component)} data-toggle="modal" data-target={`#Modal${index}`}>Change Stock</button>;
    } else {
        return <button type="button" class="btn btn-success" style={{float: `right`}} disabled>Change Stock</button>;
    }
}

export class AdminStockAddStockButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalActive: props.modalActive
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.modalActive !== this.props.modalActive) {
            this.setState({
                modalActive: this.props.modalActive
            });
        }
    }

    render() {
        const { modalActive } = this.state;
        return <AddButton active={modalActive} index={this.props.index} />;
    }
}