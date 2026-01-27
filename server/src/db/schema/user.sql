create table  if not exists users(
uid uuid primary key  default uuid_generate_v4(),
name varchar(20) not null,
email citext not null,
password varchar(20) not null,
created_at   timestamp default current_timestamp 

)

alter  table users add column theater_id uuid references theaters(theater_id)  set default null;
