import express from "express"
import cors from "cors"
import { persons } from "./persons.js"

const app = express()
const port = 3333

app.use(cors())
app.use(express.json())

app.get("/", (request, response) => {
    response.json(persons)
})

app.post("/cadastrar", (request, response) => {
    console.log(request.body)
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}!`)
})