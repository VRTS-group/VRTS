require("dotenv").config();
const express = require("express");
const massive = require("massive");
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const session = require("express-session");
const UserCTRL = require("./userController");
const PostCTRL = require("./postController");
const CommentCTRL = require("./commentController");
const MusicCTRL = require("./musicController");
const WriteCTRL = require("./writeController");
const auth = require("./authmiddleware");
const app = express();

app.use(express.json());


app.use( express.static( `${__dirname}/../build` ) );

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
app.get("/api/user", UserCTRL.getSession);
app.delete("/auth/logout", UserCTRL.logout);
app.get("/auth/user", UserCTRL.getUser);
app.put("/auth/edituser/:id", auth.usersOnly, UserCTRL.editUser);
app.get("/auth/getUserById/:id", UserCTRL.getUserById);

app.get("/auth/getPosts", PostCTRL.getPosts);
app.post("/auth/addPosts", auth.usersOnly, PostCTRL.addPosts);
app.put("/auth/editPosts/:id", auth.usersOnly, PostCTRL.editPosts);
app.delete("/auth/deletePosts/:id", auth.usersOnly, PostCTRL.deletePosts);
app.get("/auth/getPostById/:id", PostCTRL.getPostById); //for the popup thing
app.get("/auth/getPostByUser/:id", PostCTRL.getPostByUser);
app.get("/auth/getSavedPosts/:id", auth.usersOnly, PostCTRL.getSavedPost);
app.post("/auth/addSave", auth.usersOnly, PostCTRL.addSave);
app.delete("/auth/deleteSave/:id", auth.usersOnly, PostCTRL.deleteSave);

app.get("/auth/getMusic", MusicCTRL.getMusic);
app.post("/auth/addMusic", auth.usersOnly, MusicCTRL.addMusic);
app.put("/auth/editMusic/:id", auth.usersOnly, MusicCTRL.editMusic);
app.delete("/auth/deleteMusic/:id", auth.usersOnly, MusicCTRL.deleteMusic);
app.get("/auth/getMusicById/:id", MusicCTRL.getMusicById); //for the popup thing
app.get("/auth/getMusicByUser/:id", auth.usersOnly, MusicCTRL.getMusicByUser);

app.get("/auth/getWrite", WriteCTRL.getWrite);
app.post("/auth/addWrite", auth.usersOnly, WriteCTRL.addWrite);
app.put("/auth/editWrite/:id", auth.usersOnly, WriteCTRL.editWrite);
app.delete("/auth/deleteWrite/:id", auth.usersOnly, WriteCTRL.deleteWrite);
app.get("/auth/getWriteById/:id", WriteCTRL.getWriteById); //for the popup thing
app.get("/auth/getWriteByUser/:id", auth.usersOnly, WriteCTRL.getWriteByUser);

app.get("/api/comment", CommentCTRL.getComments);
app.post("/api/comment", auth.usersOnly, CommentCTRL.addComment);
app.delete("/api/comment/:id", auth.usersOnly, CommentCTRL.deleteComment);
app.get("/api/comments/:id", CommentCTRL.getCommentById);

// app.get('/auth/getList', ListCTRL.getList)
// app.post('/auth/addList', ListCTRL.addList)
// app.put('/auth/editList/:id', ListCTRL.editList)
// app.delete('/auth/deleteList/:id', ListCTRL.deleteList)

const port = SERVER_PORT;
app.listen(port, () => console.log(`we up on ${port} baby!`));
