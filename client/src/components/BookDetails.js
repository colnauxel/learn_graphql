import React,{Component} from 'react';
import {graphql} from 'react-apollo';
import {getBookQuery} from '../queries/queries';
import EditBook from './EditBook';
class BookDetails extends Component{
  constructor(props){
    super(props);
    this.state={
      edited:null,
      display:false,
    }
  }
 
   displayBooksDetails(){
     const {book}=this.props.data;

     if(book){
       return (
         <div>
           <h2><label>Name:</label>{book.name}</h2>
           <p><label>Genre:</label>{book.genre}</p>
           <p><label>Author Name:</label>{book.author.name}</p>
           <p>All books by this author:</p>
            <ul className="other-books">
              {
                book.author.books.map(item=>{
                  return <li key={item.id}>{item.name}</li>
                })
              }
            </ul>
          <button onClick={(e)=>{this.setState({edited:book.id})}}>Edit</button>

         </div>
       )
     }else{
       return(
         <div id="book-details">
         
        No book selected
         </div>
       )
     }
   }
    render(){
      // console.log(this.props);
      
        return(
          
            <div id="book-details">
              {this.displayBooksDetails()}
              <EditBook edited={this.state.edited} />
            </div>
            
            );
        
    }
}
export default graphql(getBookQuery,{
  options:(props)=>{
    return {
      variables:{
        id:props.bookId
      }
    }
  }
})(BookDetails);