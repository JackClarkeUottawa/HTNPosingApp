begin;
create table if not exists games(
	id SERIAL PRIMARY key,
	listOfUsers Integer[],
	currentRound Integer,
	picturesPerRound Integer[][],
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
	
);

create table if not exists pictures(
	id SERIAL primary key,
	userID char(26),
	pictureURI char(40)

);

create table if not exists users(
	id SERIAL primary key,
	userID char(26)
	
);


commit;
