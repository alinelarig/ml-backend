require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app  = express()


//SWAGGER

const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Itens API",
        version: "0.1.0",
        description:
          "Api de busca dos itens do Mercado Livre"
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
    apis: ["./src/routes/itemRoutes.js"],
  };
  
  const specs = swaggerJsdoc(options);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
  );






var cors = require('cors');

app.use(cors({
    origin: '*'
}));


//padronizando leitura dos jsons
app.use(
    express.urlencoded({
        extended: true,
    })    
)

app.use(express.json())



//registrando rota do item + middleware para append de author e categorias
const itemRoutes = require('./src/routes/itemRoutes.js')
app.use('/items',  itemRoutes)

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)


mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@ml-challange.2fk3l.mongodb.net/ml-items?retryWrites=true&w=majority`  
    )
    .then(()=> {
        console.log('MongoDB Conectado!')
        app.listen(process.env.PORT || 3000);
      }
    ).catch((err) => console.log(err))