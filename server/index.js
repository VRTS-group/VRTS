require("dotenv").config();
const express = require("express");
const massive = require("massive");
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const session = require("express-session");
const UserCTRL = require("./userController");
const PostCTRL = require("./postController");
const CommentCTRL = require("./commentController");
const MusicCTRL = require("./musicController")
const WriteCTRL = require("./writeController")

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
app.delete("/auth/logout", UserCTRL.logout);
app.get("/auth/user", UserCTRL.getUser);
app.put("/auth/edituser/:id", UserCTRL.editUser);
app.get("/auth/getUserById/:id", UserCTRL.getUserById);

app.get("/auth/getPosts", PostCTRL.getPosts);
app.post("/auth/addPosts", PostCTRL.addPosts);
app.put("/auth/editPosts/:id", PostCTRL.editPosts);
app.delete("/auth/deletePosts/:id", PostCTRL.deletePosts);
app.get("/auth/getPostById/:id", PostCTRL.getPostById); //for the popup thing
app.get("/auth/getPostByUser/:id", PostCTRL.getPostByUser);
app.get("/auth/getSavedPosts/:id", PostCTRL.getSavedPost);
app.post("/auth/addSave", PostCTRL.addSave);


app.get("/auth/getMusic", MusicCTRL.getMusic);
app.post("/auth/addMusic", MusicCTRL.addMusic);
app.put("/auth/editMusic/:id", MusicCTRL.editMusic);
app.delete("/auth/deleteMusic/:id", MusicCTRL.deleteMusic);
app.get("/auth/getMusicById/:id", MusicCTRL.getMusicById); //for the popup thing
app.get("/auth/getMusicByUser/:id", MusicCTRL.getMusicByUser);

app.get("/auth/getWrite", WriteCTRL.getWrite);
app.post("/auth/addWrite", WriteCTRL.addWrite);
app.put("/auth/editWrite/:id", WriteCTRL.editWrite);
app.delete("/auth/deleteWrite/:id", WriteCTRL.deleteWrite);
app.get("/auth/getWriteById/:id", WriteCTRL.getWriteById); //for the popup thing
app.get("/auth/getWriteByUser/:id", WriteCTRL.getWriteByUser);


app.get("/api/comment", CommentCTRL.getComments);
app.post("/api/comment", CommentCTRL.addComment);
app.delete("/api/comment/:id", CommentCTRL.deleteComment);
app.get("/api/comments/:id", CommentCTRL.getCommentById);

// app.get('/auth/getList', ListCTRL.getList)
// app.post('/auth/addList', ListCTRL.addList)
// app.put('/auth/editList/:id', ListCTRL.editList)
// app.delete('/auth/deleteList/:id', ListCTRL.deleteList)

const port = SERVER_PORT;
app.listen(port, () => console.log(`we up on ${port} baby!`));
