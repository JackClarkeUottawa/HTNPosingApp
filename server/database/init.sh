#!/bin/bash
set -e
export PGPASSWORD=$POSTGRES_PASSWORD;
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE USER $APP_DB_USER WITH PASSWORD '$APP_DB_PASS';
  CREATE DATABASE $APP_DB_NAME;
  GRANT ALL PRIVILEGES ON DATABASE $APP_DB_NAME TO $APP_DB_USER;
  \connect $APP_DB_NAME $APP_DB_USER
  begin;
 create table if not exists games(
	id SERIAL PRIMARY key,
	listOfUsers Integer[],
	currentRound Integer,
	picturesPerRound Integer[][]
	
);

create table if not exists pictures(
	id SERIAL primary key,
	userID char(26),
	picture bytea 

);

create table if not exists users(
	id SERIAL primary key,
	userID char(26)
	
);
commit;
EOSQL