insert into comments(user_id, post_id, comment)
values($3, $2, $1)
select * from comments where post_id = $2;