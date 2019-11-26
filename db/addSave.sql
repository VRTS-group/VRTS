insert into saves (
    user_id, post_id
) values (
    $1, $2
);

select * from saves;