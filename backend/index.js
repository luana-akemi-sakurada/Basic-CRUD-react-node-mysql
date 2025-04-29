import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express(); // cria uma instância do express

app.use(express.json()); // permite enviar dados no corpo da requisição
app.use(cors()); // frontend acesse o backend


const db = mysql.createConnection({ // cria uma conexão com o banco
    host: "localhost",
    user: "root",
    password: "A992176566kemi_",
    database: "db_crud_node"
});

app.get("/", (req, res) => { 
    res.json("Hello world!"); // porta 8000"Hello world!"
})

app.listen(8000, () => { // porta 8000
    console.log("Server is running on port 8000");
});

app.get("/users", (req, res) => { // get para o backend
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})  

app.delete("/users/:id", (req, res) => { // delete para o backend
    const sql = "DELETE FROM users WHERE `id` = ?"; 
    db.query(sql, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
});


app.post("/users", (req, res) => { // post para o backend
    const sql = "INSERT INTO users (`email`, `password`) VALUES (?)";
    const values = [
        req.body.email,
        req.body.password
    ];
    db.query(sql, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.put("/users/:id", (req, res) => { // put para o backend
    const sql = "UPDATE users SET `email` = ?, `password` = ? WHERE `id` = ?";
    const values = [
        req.body.email,
        req.body.password

    ];
    db.query(sql, [...values, req.params.id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})


