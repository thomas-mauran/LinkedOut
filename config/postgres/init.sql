-- Jobs service
CREATE USER job
    WITH LOGIN
    PASSWORD 'job';

CREATE DATABASE job
    OWNER 'job';
