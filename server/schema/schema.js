const graphql=require('graphql');
const _=require('lodash');
const{GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLID,GraphQLInt,GraphQLList}=graphql;

//dummy data
var books=[
    {name:'Name of the wind',genre:'Fantasy',id:'1',authorId:'1'},
    {name:'The final Empire',genre:'Fantasy',id:'2',authorId:'2'},
    {name:'The Long Earth',genre:'Sci-Fi',id:'3',authorId:'3'},
    {name:'Name is that',genre:'Fantasy',id:'4',authorId:'2'},
    {name:'The color',genre:'Fantasy',id:'5',authorId:'3'},
    {name:'The short',genre:'Sci-Fi',id:'6',authorId:'3'}
];
var authors=[
    {name:'le xuan lloc',age:33,id:'1'},
    {name:'nguyen hai hiep',age:23,id:'2'},
    {name:'ho ngoc van',age:14,id:'3'},
]
const BookType=new GraphQLObjectType({
    name:'book',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent,args){
                console.log(parent);
                return _.find(authors,{id:parent.authorId});
                
            }
        }
    })
})
const AuthorType=new GraphQLObjectType({
    name:'Author',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                console.log(parent);
                return _.filter(books,{authorId:parent.id})
                
            }
        }
    })
})


const RootQuery=new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
             return   _.find(books,{id:args.id});
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return _.find(authors,{id:args.id});
            }
        },
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                return books;
            }
        },
        authors:{
            type:new GraphQLList(AuthorType),
            resolve(parent,args){
                return authors;
            }
        }
    }
})

module.exports=new GraphQLSchema({
    query:RootQuery
})