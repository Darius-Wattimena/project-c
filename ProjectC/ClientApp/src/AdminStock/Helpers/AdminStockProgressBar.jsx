import React from 'react';

export class AdminStockProgressBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stock: 0,
            color: "danger"
        }
    }

    componentDidMount() {
        this.determineProgressBarColor();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.stock !== this.props.stock) {
            this.determineProgressBarColor();
        }
    }

    determineProgressBarColor() {
        let stock = this.props.stock;
        let color = "danger";

        if (stock > 25 && stock <= 50) {
            color = "warning";
        } else if (stock > 50) {
            color = "success";
        }

        this.setState({
            stock,
            color
        });
    }

    render() {
        const { stock, color } = this.state;
        return (
            <div className="admin-stock-progress-bar progress">
                <div className={`progress-bar bg-${color}`} role="progressbar" style={{ width: stock + '%' }} aria-valuenow={`${stock}`} aria-valuemin="0" aria-valuemax="100">
                    {stock}
                </div>
            </div>
        );
    }
}