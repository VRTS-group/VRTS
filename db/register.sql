insert into users(
    email, 
    password, 
    username, 
    profile_pic, 
    cover_pic, 
    real_name, 
    contact, 
    bio
) values (
    ${email},
    ${password},
    ${username},
    ${profile_pic},
    ${cover_pic},
    ${real_name},
    ${contact},
    ${bio}
)

returning *