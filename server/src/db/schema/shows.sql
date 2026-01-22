create table shows if not exists(
    sid uuid primary key default uuid_generate_v4(),
    mid uuid  not null references movies(mid),
    showPrice Numeric(5,2) not null,
    showDateTime timetamp not null
);

create table if not exists seatsOccupied(
showId uuid not null references shows(sid),
seatId text not null,
primary key(showId, seatId)

);