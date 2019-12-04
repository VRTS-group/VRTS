update posts
set  media = $2, title = $3, description = $4, tags = $5
where post_id = $1;

select * from posts;