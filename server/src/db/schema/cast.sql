create table if not exists moviecast (
    id uuid  primary key default uuid_generate_v4(),
    name text,
    mid int references movies (mid),
    profile_path text
);