CREATE DATABASE incidents;

CREATE USER dev with password 'docker';

GRANT ALL PRIVILEGES ON DATABASE incidents TO dev;
