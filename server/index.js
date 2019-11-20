require('dotenv').config()
const express = require('express')
const massive = require('massive')
const {SERVER_PORT, CONNECTING_STRING, SESSION_SECRET} = process.env
const session = require('express-session')
const UserCTRL = require('./userController')

const app = express()

app.use(express.json())

massive(CONNECTING_STRING).then(db => {
    app.set('db', db);
    console.log('db up my guy')
})

app.use(session({
    resave: false,
     saveUninitialized: true,
     secret: SESSION_SECRET,
     cookie: {
         maxAge: 1000 * 60 *60
     }
}))

app.post('/auth/register', UserCTRL.register)
app.post('/auth/login', UserCTRL.login)
app.post('/auth/logout', UserCTRL.logout)
app.post('/auth/user', UserCTRL.getUser)







// app.get('/auth/getList', ListCTRL.getList)
// app.post('/auth/addList', ListCTRL.addList)
// app.put('/auth/editList/:id', ListCTRL.editList)
// app.delete('/auth/deleteList/:id', ListCTRL.deleteList)




const port = SERVER_PORT
app.listen(port,() => console.log(`we up on ${port} baby!`))