
update users
set username = $2, profile_pic = $3, cover_pic = $4, real_name = $5, contact = $6, bio = $7
where user_id = $1;

select * 
from users
where user_id = $1