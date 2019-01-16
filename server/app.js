const express=require('express');
const graphqlHTPP=require('express-graphql');
const db=require('./config/mongodb');
const schema=require('./schema/schema');
const cors=require('cors');

const app=express();

//allow cross-origin requests
app.use(cors());
app.use('/graphql',graphqlHTPP({
schema,
graphiql:true
}));

app.listen(4000,()=>{
    console.log('listening for requests on port 4000');
    
})