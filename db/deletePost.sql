-- delete from posts   
-- where id = $1
-- when user_id = $2;

-- select * from posts

delete from saves where post_id = $1; 

delete from comments where post_id = $1;

delete from posts
where post_id = $1;


select * from posts;