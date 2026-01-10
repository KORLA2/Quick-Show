create table  if not exists users(
uid uuid primary key  default generate_v4(),
name varchar(20) not null,
email citext not null,
password varchar(20) not null,
created_at   timestamp default current_timestamp 

)