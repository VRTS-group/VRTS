module.exports = {
  getComments: async (req, res) => {
    console.log("hit");
    const db = req.app.get("db");
    let data = await db.getComments();
    console.log(data);
    res.status(200).send(data);
  },
  addComment: (req, res) => {
    const db = req.app.get("db");
    const { user_id, post_id, comment } = req.body;
    db.addComment([user_id, post_id, comment])
      .then(db => res.status(200).send(db))
      .catch(err => {
        res.send(err).status(500);
      });
  },
  deleteComment: (req, res) => {
    const db = req.app.get("db");
    let { id } = req.params;
    db.deleteComment(id)
      .then(db => res.status(200).send(db))
      .catch(err => console.log(err));
  },
  getCommentById: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    db.getCommentById([id])
      .then(db => res.status(200).send(db))
      .catch(err => console.log(err));
    // console.log(res);
  }
};
