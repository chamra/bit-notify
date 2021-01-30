import axios from 'axios';
import React, { useState } from 'react'
import {Container, Row, Col} from 'reactstrap';
import ListItem from './ListItem';


// const ListContainer = () => {

//     const [news, setNews] = useState([])

//     let temp = [
//         {
//             title : "name",
//             date : "2012.2.3",
//             link : "link",
//             id : "1"
//         },
//         {
//             title: "name2",
//             date: "202.2.32",
//             link: "link",
//             id: "2"
//         }
//     ]

//     function addToNew () {



//     }

//     return (
        
//         <Container className="mt-5">
//             <Row>
//                 <Col className="ml-1 mr-l">
//                     {
//                         temp.map((item,index) => {return <ListItem key={item.id} item={item} />})
//                     }
//                 </Col>
//             </Row>
//         </Container>
//     )
// }

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

        try {
            let resp = await axios({
                method : "POST",
                url: "https://europe-west1-bit-notify.cloudfunctions.net/api/announcements",
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            resp.data.forEach(element => localNews.push(element));

            this.setState({
                isLoading: false,
                news: localNews
            })

        } catch (error) {
            this.setState({
                isLoading: false,
                error: "whoops something is wrong"
            })
        }

        

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
                </Container>
            ) 
    }

}



export default ListContainer