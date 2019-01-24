import React,{Component} from 'react';
import {graphql,compose} from 'react-apollo';
import {deleteBook, getBooksQuery} from '../queries/queries';

class DeleteBook extends Component{
  constructor(props){
    super(props);
  }
  deleteBook(){
  console.log(this.props.deleteId)
    this.props.deleteBook({
        variables:{
            id:this.props.deleteId
        },
        refetchQueries:[{query:getBooksQuery}]
    })
}
    render(){
      // console.log(this.props);
      
        return(  
              <button onClick={(e)=>{this.deleteBook()}}>x</button>
            );
        
    }
}
export default compose(
  graphql(deleteBook,{name:"deleteBook"})
)(DeleteBook);