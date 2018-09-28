import React from 'react';

import Item from './productItem';

export default function ListProducts(props) {
    return <div>
    {
        props.data.map(phone => (
            <Item phone={phone}/>
        ))
                             
    }
    </div>
}