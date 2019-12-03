update write
set title = $2, description = $3, tags = $4, cover_photo = $5, media = $6
where write_id = $1;

select * from write