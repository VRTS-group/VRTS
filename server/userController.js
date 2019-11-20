module.exports = {
    register: async(req,res) => {
        const {email, password, username, bio, cover_pic, profile_pic, contact, real_name} = req.body;
        const db = req.app.get('db')

        let foundUser = await db.checkEmail(email);
        foundUser = foundUser[0]
        if(foundUser){
            res.status(409).send("Email already in use :[")
        }
        else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password,salt)

            let newUser = await db.register({username, cover_pic, password:hash, email, bio, Cover, profile_pic, contact, real_name});
            newUser = newUser[0];
            req.session.user = {...newUser};
            res.status(200).send(req.session.user)
        }
    },
    login: async(req,res) => {
        const{Email, password} = req.body;
        const db = req.app.get('db')
        let foundUser = await db.checkEmail(Email);
        foundUser = foundUser[0];
        if(!foundUser){
            res.status(401).send("Username does not exists")
        }
        const authenticated = bcrypt.compareSync(password, foundUser.password)
        if(authenticated){
            delete foundUser.password;
            req.session.user = foundUser;
            res.status(200).send(req.session.user)
        } else {
            res.status(401).send("incorrect password")
        }
    },
    logout: (req,res) => {
        req.session.destroy()
        res.sendStatus(200)
    },
    getUser: (req,res) => {
        if(req.session.user){
            res.status(200).send(req.session.user)
        }
    }
}
