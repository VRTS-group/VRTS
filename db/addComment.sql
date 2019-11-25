insert into comments(user_id, post_id, comment)
values($1, $2, $3);
-- select * from comments where post_id = $1;
select * from comments;