-- To start psql client in mac
-- kannappannatarasan ~ % psql postgres
CREATE DATABASE cs_db;
CREATE ROLE cs WITH LOGIN PASSWORD 'cs';
GRANT ALL PRIVILEGES ON DATABASE cs_db TO cs;

-- To check login: psql postgresql://cs:cs@127.0.0.1:5432/cs_db