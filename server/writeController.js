module.exports = {
  getWrite: async (req, res) => {
    // console.log("hit");
    const db = req.app.get("db");
    let post = await db.getWrite();
    // console.log(post);
    res.status(200).send(post);
  },
  addWrite: async (req, res) => {
    // console.log("hit");
    const db = req.app.get("db");
    const {
      user_id,
      media,
      cover_photo,
      title,
      description,
      tags,
      views,
      saves
    } = req.body;
    db.addWrite([
      user_id,
      media,
      cover_photo,
      title,
      description,
      tags,
      views,
      saves
    ]).then(db => res.status(200).send(db));
  },
  editWrite: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const { title, description, tags, cover_photo, media } = req.body;
    db.editWrite([id, title, description, tags, cover_photo, media]).then(db =>
      res.status(200).send(db)
    );
  },
  deleteWrite: async (req, res) => {
    // console.log("hit");
    const db = req.app.get("db");
    let { id } = req.params;
    db.deleteWrite([id]).then(db => res.status(200).send(db));
  },
  getWriteById: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    db.getWriteById([id])
      .then(db => res.status(200).send(db))
      .catch(err => console.log(err));
  },
  getWriteByUser: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    db.getWritebyUser([id])
      .then(db => res.status(200).send(db))
      .catch(err => console.log(err));
  }
};
