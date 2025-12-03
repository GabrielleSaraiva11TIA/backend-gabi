import express from "express"
import cors from "cors"
import mysql from "mysql2"

const app = express()
const port = 3333

app.use(cors())
app.use(express.json())

app.get("/", (request, response) => {
    const selectCommand = "SELECT name, email, age FROM gabrielledemoraes_02ma"
    database.query(selectCommand, (error, users) => {
        if(error) {
            console.log(error)
            return
        }

        response.json(users)
    })
})

//rota para o login
app.post("/login", (request,response) => {
    //pegar as informações que vem do frontend
    const { email, password } = request.body.user

    //buscar no banco o usuério pelo email
    const selectCommand = "SELECT * FROM gabrielledemoraes_02ma WHERE email = ?"
    database.query(selectCommand, [email], (error, user) => {
        if (error) {
            console.log(error)
            return
        }

        //verificar se o usuário existe ou se a senha é incorreta
        if (user.length === 0 || user[0].password !== password) {
            response.json({ message: "Usuário ou senha incorretos!"})
            return
        }

        response.json({id: user[0].id, name: user[0].name})
    })
})

app.post("/cadastrar", (request, response) => {
    const { name, email, age, nickname, password } = request.body.user


    // cadastrar usuario no banco de dados
    const insertCommand = `
        INSERT INTO gabrielledemoraes_02ma(name, email, age, nickname, password)
        VALUES (?, ?, ?, ?, ?)
    `

    database.query(insertCommand, [name, email, age, nickname, password], (error) => {
        if (error) {
            console.log(error)
            return
        }

            response.status(201).json({message: "Usuário cadastrado com sucesso!"})
    })

})

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}!`)
})

const database = mysql.createPool({
    host: "benserverplex.ddns.net",
    user: "alunos",
    password: "senhaAlunos",
    database: "web_02ma",
    connectionLimit: 10
})
