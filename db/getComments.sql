select * from comments; 


-- select u.username, u.profile_pic, c.comment from users u full outer join comments c on u.user_id = c.user_id where c.post_id = $1;
