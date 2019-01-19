import React,{Component} from 'react';
import {graphql} from 'react-apollo';
import {getBooksQuery,deleteBook} from '../queries/queries';
import BookDetails from './BookDetails';

class BookList extends Component{
    constructor(props){
        super(props);
        this.state={
            selected:null,
            deleted:null
        }
    }
    deleteBook(){
        
    }
    displayBooks(){
        var data=this.props.data;
        if(data.loading){
            return (<div>Loading books ...</div>)
        }else{
            return data.books.map(book=>{
                return (
                    <div>
                         <li key={book.id} onClick={(e)=>{this.setState({selected:book.id})}} >{book.name}</li>
                         <button onClick={(e)=>{this.setState({delete:book.id})}}>x</button>
                    </div>
                   
                )
            }
                
            )
        }
    }
    render(){
      
        return(
            <div>
                <ul id="book-list">
                {this.displayBooks()}
                </ul>
                <BookDetails bookId={this.state.selected} />
            </div>
            
            );
        
    }
}
export default graphql(getBooksQuery)(BookList);