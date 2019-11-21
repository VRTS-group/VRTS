select user_id, email, password, username, profile_pic,  cover_pic, real_name, contact, bio
from users
where email = $1