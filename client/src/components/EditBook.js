import React,{Component} from 'react'
import {graphql, Query, compose} from 'react-apollo';
import {editBook,getAuthorsQuery,addBookMutation,getBooksQuery, getBookQuery} from '../queries/queries';

class EditBook extends Component{
    constructor(props){
        super(props);
        
        this.state={
            id:'',
            name:'',
            genre:'',
            authorId:''
        }
 
    }
    displayAuthor(){
        var data=this.props.getAuthorsQuery;
        // console.log(this.props);
        
        if(data.loading){
            return (<option disabled >Loading Authors ...</option>)
        }else{
            return data.authors.map(author=>{
                return (<option key={author.id} value={author.id}>{author.name}</option>)
            })
        }
    }
    submitFrom(e){
        e.preventDefault();
        console.log(this.props);
        const {book}=this.props.data;
        // console.log(this.props);
        this.props.editBook({
            variables:{
                id:book.id,
                name:this.state.name,
                genre:this.state.genre,
                authorId:this.state.authorId
            },
            refetchQueries:[{query:getBooksQuery,getBookQuery}]
        });
        
        
    }
    getbook(){
        
        
       const {book}=this.props.data;
      
       if(book){
           return(
    
            <form  onSubmit={this.submitFrom.bind(this)}>
            <div className="field">
              <label>Book name:</label>
              <input type="text" value={this.state.name} onChange={(e)=>this.setState({name:e.target.value})} />
            </div>

            <div className="field">
              <label>Genre:</label>
              <input type="text"  onChange={(e)=>this.setState({genre:e.target.value})}/>
            </div>

            <div className="field">
              <label>Author:</label>
              <select onChange={(e)=>this.setState({authorId:e.target.value})}  >
                  <option>Select author</option>
                  {this.displayAuthor()}
              </select>
            </div>

            <button>Update</button>
        </form>
           )
         
       }

        
    }
    render(){
       
        
        return(
           <div>{this.getbook()}</div>
           
           )
    }

}
export default compose(
    graphql(editBook,{name:"editBook"}),
    graphql(getAuthorsQuery,{name:"getAuthorsQuery"}),
    graphql(addBookMutation,{name:"addBookMutation"}),
    graphql(getBookQuery,{
        options:(props)=>{
            return{
                variables:{
                    id:props.edited
                }
            }
               
            
        }
    })
)(EditBook);