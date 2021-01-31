import React from 'react'
import './ListItem.css';
import {Row, Col} from "reactstrap"
import items  from './items.png'


const ListItem = (props) => {
    const {item} = props
    return (
        <div className="ListItem mt-4" onClick={() => window.open(item.link)}>
            <Row>
                <Col className="col-sm-2 col-md-1">
                    <img src={items} alt="news" className="img-fluid"/>
                </Col>
                <Col>
                    <h2>{item.title}</h2>
                    <p>{item.postDate}</p>
                </Col>
            </Row>
        </div>
    )
}

export default ListItem
