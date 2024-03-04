const express=require('express')
const {ApolloServer}=require('@apollo/server')
const {expressMiddleware}=require('@apollo/server/express4')
const bodyParser=require('body-parser')
const cors=require('cors')
const axios = require('axios')

const {Todo}=require('./Todo')
const {User}=require('./User')

async function StartServer(){
    const app=express()
    const server= new ApolloServer({
        typeDefs:`
            type User{
                id:ID!
                name:String!
                username:String!
                email:String!
                phone:String!
            }
            type Todo{
                id:ID!
                title:String!
                completed:Boolean
                user:User
            }
            type Query{
                getTodos:[Todo]
                getUser:[User]
                getUserByID(id:ID!):User
            }
        `,
        resolvers:{
            Todo:{
                // user:async(todo)=>(await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.id}`)).data,
                user:(todo)=>User.find(e=>e.id===todo.id)
            },
            Query:{
                // getTodos:async()=>(await axios.get('https://jsonplaceholder.typicode.com/todos')).data,
                // getUser:async()=>(await axios.get('https://jsonplaceholder.typicode.com/users')).data,
                // getUserByID:async(parent,{id})=>(await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data

                getTodos:()=>Todo,
                getUser:()=>User,
                getUserByID:(todo)=>User.find(e=>e.id===todo.id)
            }

        }
    })
    app.use(bodyParser.json())
    app.use(cors())

    await server.start()

    app.use('/graphql',expressMiddleware(server))

    app.listen(8000,()=>console.log('Server Started at 8000'))
}

StartServer()

