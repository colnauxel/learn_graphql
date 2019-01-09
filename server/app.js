const express=require('express');
const graphqlHTPP=require('express-graphql');
const schema=require('./schema/schema');
const app=express();

app.use('/graphql',graphqlHTPP({
schema,
graphiql:true
}));

app.listen(4000,()=>{
    console.log('listening for requests on port 4000');
    
})