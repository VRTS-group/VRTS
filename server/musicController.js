module.exports = {
    getMusic: async (req, res) => {
      console.log("hit");
      const db = req.app.get("db");
      let post = await db.getMusic();
      console.log(post);
      res.status(200).send(post);
    },
    addMusic: async (req, res) => {
      console.log("hit");
      const db = req.app.get("db");
      const { user_id, media, title, description, tags, views, saves, cover_photo } = req.body;
      db.addMusic([
        user_id,
        media,
        title,
        description,
        tags,
        views,
        saves,
        cover_photo
      ]).then(db => res.status(200).send(db));
    },
    editMusic: async (req, res) => {
      const db = req.app.get("db");
      const { id } = req.params;
      const { title, description, tags, cover_photo } = req.body;
      db.editMusic([id, title, description, tags, cover_photo]).then(db =>
        res.status(200).send(db)
      );
    },
    deleteMusic: async (req, res) => {
      console.log("hit");
      const db = req.app.get("db");
      let { id } = req.params;
      db.delete_music([id]).then(db => res.status(200).send(db));
    },
    getMusicById: (req, res) => {
      const db = req.app.get("db");
      const { id } = req.params;
      db.getMusicById([id])
        .then(db => res.status(200).send(db))
        .catch(err => console.log(err));
    },
    getMusicByUser: (req, res) => {
      const db = req.app.get("db");
      const { id } = req.params;
      db.getMusicbyUser([id])
        .then(db => res.status(200).send(db))
        .catch(err => console.log(err));
    }
    
  };
  