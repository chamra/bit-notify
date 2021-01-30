import React from 'react'
import './ListItem.css';

const ListItem = (props) => {
    return (
        <div className="ListItem mt-4">
            <h1>{props.item.title}</h1>
        </div>
    )
}

export default ListItem
