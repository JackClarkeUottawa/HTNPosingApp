create table if not exists games(
	id SERIAL PRIMARY key,
	listOfUsers Integer[12],
	currentRound Integer,
	picturesPerRound Integer[12][12]
	
);

create table if not exists pictures(
	id SERIAL primary key,
	userID char(26),
	picture bytea 

);

create table if not exists users(
	id SERIAL primary key,
	userName char(26)
	
)
