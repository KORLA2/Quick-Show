create table if not exists  favourites(
uid uuid references users(uid),
mid int references movies(mid),
primary key(uid,mid)
); 
