with userid as (
insert into users (userid)
values ($1) 
returning id
)
insert into games (listofusers[0])
select id from userid returning id
