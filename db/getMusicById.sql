select p.music_id, p.user_id, p.media, p.title, p.description,
p.tags, p.views, p.saves, u.user_id, u.username, u.profile_pic
from music p full outer join users u 
on p.user_id = u.user_id
where p.music_id = $1;