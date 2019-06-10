const fetch = require("isomorphic-fetch")
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()
// const url = "https://klassi-proto.herokuapp.com/api/users"
// fetch(url)
//     .then(resp => resp.json())
//     .then(json => {
//         const usuarios = json.result.map(element => {
//             console.log(element.nombre)
//         })
//     })
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.get("/", (req, res) => {
//     return res.json({
//         result: "hola mundo"
//     })
// })
// app.listen(3000)

app.get("/", (req, res) => {
    const nombre = req.query.nombre
    const id = req.query.id
    const url = "https://klassi-proto.herokuapp.com/api/users"
    fetch(url)
    .then(resp => resp.json())
    .then(json => {
        if (nombre) {
           const elementName = json.result.find(e => e.nombre === nombre)
           console.log(elementName)
           return res.json(elementName)
        } 
        if (id) {
            const elementId = json.result.find(e => e.id === id)
            return res.json(elementId)
        }
        else {
            res.json(json)
        }
    })
})

// app.get("/", async(req, res) => {
//     const nombre = req.query.nombre
//     if(nombre){
//         const response = await fetch(url)
//         const json = await response.json()
//         const user = json.result.find(e => e.nombre === nombre)
//         return res.json({result: user})
//     }
//     return res.json({result:json})
// })
// app.listen(3000)

// dumy data
const prestamos = [
    {
        id: 1,
        data: 'dummy data'
    },
    {
        id: 2,
        data: 'dummy data'
    },
    {
        id: 3,
        data: 'dummy data'
    }
]
// MIDDLE
app.get('/prestamos', (req, res, next) => {
    console.log('estamos en un middle')
    const prestamo =  prestamos.find(e => e.id === Number(req.query.id))
    if(prestamo){
        req.prestamo = prestamo
        next()
    }else{
        res.redirect('/nope')
    }
});

app.get('/nope', (req, res) => {
    res.json({mensaje: 'usted no puede pasar a esta ruta'})
})
// app.get('/prestamos', (req, res) => {
//     // const value = req.query
//     // const keys = Object.keys(value)
//     // const filter = keys.find(e => e === 'filter')
//     // if(filter){
//     //     const id = value[filter]
//     //     const filterData = prestamos.find(e => e.id === Number(id))
//     //     return res.json({result:filterData})
//     // }
//     console.log(req.prestamo)
//     // console.log('estoy en la ruta')
//     return res.json({result:req.prestamo})
// })

// RUTA DINAMICA
app.get('/prestamos/:id', (req, res) => {
    const id = req.params.id
    const prestamo =  prestamos.find(e => e.id === Number(id))
    return res.json({result:prestamo})
})

// POST 
app.post('/prestamos', (req, res) => {
    const body = req.body
    console.log(body)
    return res.json(prestamos)
})

app.listen(3000)