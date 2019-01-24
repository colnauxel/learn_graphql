import React,{Component} from 'react';
import {graphql, Query} from 'react-apollo';
import {getBooksQuery,deleteBook} from '../queries/queries';
import BookDetails from './BookDetails';
import EditBook from './EditBook';
import DeleteBook from './DeleteBook';
class BookList extends Component{
    constructor(props){
        super(props);
        this.state={
            selected:null,
            deleted:null
        }
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
                         <DeleteBook deleteId={book.id}/>
                        {/* <EditBook editId={book.id}/> */}
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