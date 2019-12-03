update music
set title = $2, description = $3, tags = $4, cover_photo = $5
where music_id = $1;

select * from music