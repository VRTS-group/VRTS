insert into write(user_id, media, cover_photo, title, description, tags, views, saves)
values ($1, $2, $3, $4, $5, $6, $7, $8);
select * from write