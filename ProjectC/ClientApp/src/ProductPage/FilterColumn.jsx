//node imports
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function RenderCheckbox(props) {
    return (<div class="row">
        <div class="col-sm-1">
            <input type="checkbox" onChange={window.filterComponent.handleFilter} name={props.name} spec={props.spec} />
        </div>
        <div class="col-sm-10">{props.name}</div>
    </div>
    );
}

function RenderCheckboxes(props) {

    let result = [];

    var comp = window.filterComponent;

    for (var type in comp.state) {

        result.push(<h5><b>{type.charAt(0).toUpperCase() + type.slice(1)}</b></h5>);

        if (comp.state.hasOwnProperty(type)) {
            for (var name in comp.state[type]) {
                if (comp.state[type].hasOwnProperty(name)) {
                    result.push(
                        <RenderCheckbox spec={type} name={name} />
                    );
                }
            }
        }

        result.push(<hr />);
    }
    return result;
}

class FilterColumn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.handleFilter = this.handleFilter.bind(this);
        window.filterComponent = this;
    }

    componentDidMount() {
        var products = this.props.products;

        if (products) {
            // Initialize all specifications to false
            var newState = {};

            for (var i = 0; i < products.length; i += 1) {
                var product = products[i];

                if (!product.specifications) continue; // no specifications

                for (var j = 0; j < product.specifications.length; j += 1) {
                    // for each specification
                    var spec = product.specifications[j];

                    // Put the specification filter in the new state (unchecked (false) by default)
                    newState = {
                        ...newState,
                        [spec.name]: {
                            ...newState[spec.name],
                            [spec.value]: false
                        }
                    };
                }
            }

            // Update the state
            this.setState(newState);
        }
    }

    handleFilter(event) {
        // Get attributes
        var spec = event.target.getAttribute("spec");
        var name = event.target.getAttribute("name");
        var checked = event.target.checked;

        console.log(spec + '.' + name + ' = ' + checked);

        // Update (un)checked filter
        this.filter(spec, name, checked);
    }

    filter(type, name, value) {
        this.setState({
            ...this.state,
            [type]: {
                ...this.state[type],
                [name]: value
            }
        },  // Set filters in parent component after state is set
            () => this.props.setFilters(this.state));
    }

    render() {
        return (<RenderCheckboxes />);
    }
}

const mapStateToProps = state => {
    return {
        //...
    }
}

const mapDispatchToProps = dispatch => {
    return {
        //...
    }
}

const connectedFilterColumn = connect(mapStateToProps, mapDispatchToProps)(FilterColumn);
export { connectedFilterColumn as FilterColumn };