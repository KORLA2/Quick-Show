create table if not exists bookings(
    bid uuid primary key default uuid_generate_v4(),
    uid uuid not null ,
    showId uuid not null,
    isPaid boolean default false,
    paymentLink text ,
    bookeddate timetamp default now()
);

