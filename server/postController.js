module.exports = {
  getPosts: async (req, res) => {
    // console.log("hit");
    const db = req.app.get("db");
    let post = await db.getPost();
    // console.log(post);
    res.status(200).send(post);
  },
  addPosts: async (req, res) => {
    // console.log("hit");
    const db = req.app.get("db");
    const { user_id, media, title, description, tags, views, saves } = req.body;
    db.addPost([
      user_id,
      media,
      title,
      description,
      tags,
      views,
      saves
    ]).then(db => res.status(200).send(db));
  },
  editPosts: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const { title, description, tags } = req.body;
    db.editPost([id, title, description, tags]).then(db =>
      res.status(200).send(db)
    );
  },
  deletePosts: async (req, res) => {
    // console.log("hit");
    const db = req.app.get("db");
    let { id } = req.params;
    db.deletePost([id]).then(db => res.status(200).send(db));
  },
  getPostById: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    // console.log(req.params)
    db.getPostById([+id])

      .then(db => {
        // console.log(db)
        res.status(200).send(db);
      })
      .catch(err => console.log(err));
  },
  getPostByUser: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    db.getPostbyUser([id])
      .then(db => res.status(200).send(db))
      .catch(err => console.log(err));
  },
  getSavedPost: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    db.savedPost([id])
      .then(db => res.status(200).send(db))
      .catch(err => console.log(err));
  },
  addSave: (req, res) => {
    const db = req.app.get("db");
    const { user_id, post_id } = req.body;
    // console.log(req.body);
    db.addSave([user_id, post_id])
      .then(db => res.status(200).send(db))
      .catch(err => console.log(err));
  },
  deleteSave: (req, res) => {
    const db = res.app.get("db");
    const { id } = req.params;
    db.deleteSave([id]).then(db => res.status(200).send(db));
  },
  updateViews: (req, res) => {
    const { post_id, views } = req.body;
    const db = req.app.get("db");
    db.updateViews();
  }
};
