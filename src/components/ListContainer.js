import axios from 'axios';
import React, { useState } from 'react'
import {Container, Row, Col, Button} from 'reactstrap';
import ListItem from './ListItem';
import './ListContainer.css';

class ListContainer extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            error : null,
            isLoading : false,
            news : []
        }
    }

    async fetchNews(id = null) {
        this.setState({
            isLoading: true
        })

        const { error , isLoading, news} = this.state

        let localNews = news

        let data =  null

        if(id !== null) data = {startAt : id}

        try {

            let resp = await axios.post("https://europe-west1-bit-notify.cloudfunctions.net/api/announcements", data)

            resp.data.forEach(element => localNews.push(element));

            this.setState({
                isLoading: false,
                news: localNews
            })

            if (resp.data.length === 0) this.setState({ isLoading: true})

        } catch (error) {
            this.setState({
                isLoading: false,
                error: "whoops something is wrong"
            })
        }

        

    }

    LoadMoreNews () {

        const {news} = this.state

        let lastId = news[news.length - 1]

        this.fetchNews(lastId.id)

    }

    async componentDidMount() {
        await this.fetchNews()
    }

    render () {

        const { error , isLoading, news} = this.state


            return (
                <Container className="mt-5">
                    <Row>
                        <Col className="ml-1 mr-l">
                            {
                                news.map((item,index) => {return <ListItem key={item.id} item={item} />})
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button disabled={isLoading} onClick={() => this.LoadMoreNews()}>Load More</Button>
                        </Col>
                    </Row>
                </Container>
            ) 
    }

}



export default ListContainer