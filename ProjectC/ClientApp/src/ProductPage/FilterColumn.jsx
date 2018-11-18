//node imports
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function ClearFilterButton({ visible }) {
    return (
        visible
        &&
        <button class="btn btn-sm float-right btn-outline-primary" onClick={window.filterComponent.clearFilters}>Clear filters</button>
        ||
        null
    );
}

function RenderCheckbox(props) {
    return (<div class="row">
        <div class="col-sm-1">
            <input class="filterCheckBox" type="checkbox" onChange={window.filterComponent.handleFilter} name={props.name} spec={props.spec} />
        </div>
        <div class="col-sm-10">{props.name}</div>
    </div>
    );
}

function RenderCheckboxes(props) {

    let result = [];

    var comp = window.filterComponent;

    for (var type in comp.state) {
        if (!comp.state.hasOwnProperty(type)) continue;

        result.push(<h5><b>{type.charAt(0).toUpperCase() + type.slice(1)}</b></h5>);

        for (var name in comp.state[type]) {
            if (!comp.state[type].hasOwnProperty(name)) continue;
            result.push(
                <RenderCheckbox spec={type} name={name} />
            );
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
        this.applyFilters = this.applyFilters.bind(this);
        this.clearFilters = this.clearFilters.bind(this);

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

    areFiltersOn() {
        // Returns whether filters are on
        return this.props.products.some(p => p.specifications.some(s => this.state[s.name] && this.state[s.name][s.value] && this.state[s.name][s.value]))
    }

    clearFilters() {
        // Set all filters to false
        for (var type in this.state) {
            if (!this.state.hasOwnProperty(type)) continue;
            for (var name in this.state[type]) {
                if (!this.state[type].hasOwnProperty(name)) continue;
                this.state[type][name] = false;
            }
        }

        // Uncheck all checkboxes
        [...document.getElementsByClassName("filterCheckBox")].forEach((elem, index, array) => {
            elem.checked = false;
        });

        // Apply to update parent
        this.applyFilters();
    }

    applyFilters() {

        // Are any filters on/checkboxes checked?
        if (this.areFiltersOn()) {
            // If any are checked, start the filtering process
            var filteredProducts = [];

            for (var i = 0; i < this.props.products.length; i += 1) {
                // Loop through each product
                var product = this.props.products[i];

                var skip = false; // used to determine whether to skip adding this product

                for (var type in this.state) {
                    var mismatches = 0; // checkboxes that are checked, but do not match this products' specifications
                    var matches = 0;    // checkboxes that are checked and match this products' specs
                    if (!this.state.hasOwnProperty(type)) continue;
                    for (var name in this.state[type]) {
                        if (!this.state[type].hasOwnProperty(name)) continue;

                        if (this.state[type][name]) {
                            // Filter is turned on
                            var category = product.specifications.filter(s => s.name === type); // discard other types
                            var isMatch = category.some(s => s.value === name); // does the specification match our chosen filter?

                            if (isMatch) {
                                matches++;
                            }
                            else {
                                mismatches++;
                            }

                        }

                    } //end of name loop

                    if (mismatches > 0) {
                        if (matches === 0) {
                            // Mismatches without matches in a category, discard this product.
                            skip = true;
                            break;
                        }
                    }

                } //end of type loop

                if (!skip) {
                    // add to filtered products collection
                    filteredProducts.push(product);
                }

            } //end of product loop

            // Pass the filtered products to the parent
            this.props.setFilteredProducts(filteredProducts);
        }
        else {
            // Notify parent that we have no products to filter
            this.props.setFilteredProducts(null);
        }

    }

    filter(type, name, value) {
        this.setState({
            ...this.state,
            [type]: {
                ...this.state[type],
                [name]: value
            }
        },  // Callback to apply filters after state is set
            this.applyFilters);
    }

    render() {
        return (
            <div>
                <ClearFilterButton visible={this.areFiltersOn()} />
                <RenderCheckboxes />
            </div>
        );
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