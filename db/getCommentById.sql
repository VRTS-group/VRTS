-- select * from comments where post_id = $1;

select u.user_id, u.username, u.profile_pic, c.comment, c.comment_id from users u full outer join comments c on u.user_id = c.user_id where c.post_id = $1;