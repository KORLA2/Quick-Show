create table if not exists movies(
    mid uuid primary key default uuid_generate_v4(),
    title text not null,
    overview text not null,
    poster_path text not null,
    backdrop_path text,
    release_date text,
    original_language text,
    tagline text,
    vote_average numeric(2,2),
    vote_count int
    runtime int
    
)

create table if not exists  genres (
    genre_id bigserial primary key,
    name text not null,
)

create table if not exists movie_genre(
    name text not null references genres(name),
    mid uuid not null references movies(mid),
    primary key(mid,name)
);



