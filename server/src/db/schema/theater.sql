create table if not exists theaters(
    theater_id uuid  primary key default uuid_generate_v4(),
    theater_name text not null,
    theater_area text not null,
    rating numeric(2,1) not null    
)
alter table theaters add column created_at   timestamp default current_timestamp 