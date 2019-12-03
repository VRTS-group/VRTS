-- select * from posts

select p.post_id, p.user_id, p.media, p.title, p.description,
p.tags, p.views, p.saves, u.user_id, u.username, u.profile_pic
from posts p full outer join users u 
on p.user_id = u.user_id