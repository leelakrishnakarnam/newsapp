import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/everything?q=apple&from=2024-08-30&to=2024-08-30&sortBy=popularity&apiKey=8c547dbf4f014deb866062124be0be9c&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles, 
            totalResults: parsedData.totalResults, 
            loading: false
        })
    }

    handlePrevClick = async ()=>{
        console.log('Prev Clicked')
        let url = `https://newsapi.org/v2/everything?q=apple&from=2024-08-30&to=2024-08-30&sortBy=popularity&apiKey=8c547dbf4f014deb866062124be0be9c&${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            page: this.state.page - 1,
            loading: false
        })
    }

    handleNextClick = async ()=>{
        console.log('Next Clicked')
        if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
            let url = `https://newsapi.org/v2/everything?q=apple&from=2024-08-30&to=2024-08-30&sortBy=popularity&apiKey=8c547dbf4f014deb866062124be0be9c&${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading: true});
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                articles: parsedData.articles,
                page: this.state.page + 1,
                loading: false
            })
        }
    }

    render() {
        return (
            <div className='container my-3'>
                <h1 className='text-center'>newsApp  - Top Headlines</h1>
                {this.state.loading && <Spinner />}
                    <div className='row'>
                        {!this.state.loading && this.state.articles.map((element)=>{
                            return <div className='col-md-4' key={element.url}>
                                <NewsItem title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 90):""} imageUrl={element.urlToImage} newsUrl={element.url} />
                            </div>
                        })}
                    </div>
                    <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                        <button disables={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                    </div>
            </div>
        )
    }
}

export default News