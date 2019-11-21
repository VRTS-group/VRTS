require("dotenv").config();
const express = require("express");
const massive = require("massive");
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const session = require("express-session");
const UserCTRL = require("./userController");
const PostCTRL = require("./postController");
const CommentCTRL = require("./commentController");

const app = express();

app.use(express.json());

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("db up my guy");
});

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60
    }
  })
);

app.post("/auth/register", UserCTRL.register);
app.post("/auth/login", UserCTRL.login);
app.post("/auth/logout", UserCTRL.logout);
app.post("/auth/user", UserCTRL.getUser);
app.put('/auth/edituser', UserCTRL.editUser);
app.get('/auth/getUserById/:id', UserCTRL.getUserById)

app.get("/auth/getPosts", PostCTRL.getPosts);
app.post("/auth/addPosts", PostCTRL.addPosts);
app.put("/auth/editPosts/:id", PostCTRL.editPosts);
app.delete("/auth/deletePosts/:id", PostCTRL.deletePosts);

app.get("/api/comment", CommentCTRL.getComments);
app.post("/api/comment", CommentCTRL.addComment);
app.delete("/api/comment/:id", CommentCTRL.deleteComment);

// app.get('/auth/getList', ListCTRL.getList)
// app.post('/auth/addList', ListCTRL.addList)
// app.put('/auth/editList/:id', ListCTRL.editList)
// app.delete('/auth/deleteList/:id', ListCTRL.deleteList)

const port = SERVER_PORT;
app.listen(port, () => console.log(`we up on ${port} baby!`));
