create table if not exists bookings(
    bid uuid primary key default uuid_generate_v4(),
    uid uuid not null ,
    showId uuid not null,
    isPaid boolean default false,
    total_price numeric(6,2) not null
    paymentLink text ,
    booked_date timetamp default now()
);


alter table bookings add column expires_at timestamp not null;