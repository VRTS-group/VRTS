-- select * from posts 
-- where post_id = $1;

-- SELECT P.*, U.username, U.profile_pic 
--  FROM posts P, users U 
--  WHERE P.post_id = $1;

-- SELECT P.*, U.username, U.profile_pic 
--  FROM posts P, users U 
--  WHERE P.user_id = U.user_id and p.user_id = $1;

select p.post_id, p.user_id, p.media, p.title, p.description,
p.tags, p.views, p.saves, u.user_id, u.username, u.profile_pic
from posts p full outer join users u 
on p.user_id = u.user_id
where p.post_id = $1;