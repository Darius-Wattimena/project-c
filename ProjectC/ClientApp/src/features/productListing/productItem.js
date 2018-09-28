import React from 'react';
import { Link } from 'react-router-dom';

import './ItemStyling.css';

export default function Item(props) {
    var link = "/product/" + props.phone.id
    return <div class="item">
        <Link to={link}>
        <img src={props.phone.img}/>
        <h4>{props.phone.name}</h4>
        </Link>
        <h3>{props.phone.price},-</h3>
    </div>
}
