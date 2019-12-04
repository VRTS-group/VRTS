create table users(
user_id serial primary key, 
email varchar(75), 
password varchar(250),
username varchar(50),
profile_pic text,
cover_pic text, 
real_name varchar(75),
contact text, 
bio text
);

create table posts(
post_id serial primary key,
user_id int references users(user_id),
media text,
title varchar(75),
description varchar(250), 
tags varchar(100), 
views int, 
saves boolean
);

create table comments (
comment_id serial primary key,
user_id int references users(user_id),
post_id int references posts(post_id),
comment text
);

create table saves (
    saves_id serial primary key,
    user_id int references users(user_id),
    post_id int references posts(post_id)
);


create table music (
music_id serial primary key,
user_id int references users(user_id),
media text,
title varchar(75),
description varchar(250), 
tags varchar(100), 
views int, 
saves boolean)
cover_photo text;

create table write (
write_id serial primary key,
user_id int references users(user_id),
media text,
cover_photo text,
title varchar(75),
description varchar(1000), 
tags varchar(100), 
views int,
saves boolean);