module.exports = {
  getComments: (req, res) => {
    const db = req.app.get("db");
    let comments = db.getComments();
    res.status(200).send(comments);
  },
  addComment: (req, res) => {
    const db = req.app.get("db");
    let { user_id, post_id, comment } = req.body;
    db.addComment(user_id, post_id, comment)
      .then(db => res.status(200).send(db))
      .catch(err => console.log(err));
  },
  deleteComment: (req, res) => {
    const db = req.app.get("db");
    let { comment_id } = req.params;
    db.deleteComment(comment_id)
      .then(db => res.status(200).send(db))
      .catch(err => console.log(err));
  }
};
