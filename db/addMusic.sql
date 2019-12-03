insert into music(user_id, media, title, description, tags, views, saves)
values ($1, $2, $3, $4, $5, $6, $7);
select * from music