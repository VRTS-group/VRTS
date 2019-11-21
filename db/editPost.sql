update posts
set  title = $2, description = $3, tags = $4
where post_id = $1;

select * from posts