insert into music(user_id, media, title, description, tags, views, saves, cover_photo)
values ($1, $2, $3, $4, $5, $6, $7, $8);
select * from music