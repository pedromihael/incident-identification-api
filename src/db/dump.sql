CREATE TABLE IF NOT EXISTS provider(
    id text PRIMARY KEY,
    name text NOT NULL
);

CREATE TABLE IF NOT EXISTS severity(
    id text PRIMARY KEY,
    name text NOT NULL,
    weight integer NOT NULL
);

CREATE TABLE IF NOT EXISTS project(
    id text PRIMARY KEY,
    name text NOT NULL,
    responsible text NOT NULL,
    reliability_percentage real,
    hours_effort integer NOT NULL
);

CREATE TABLE IF NOT EXISTS incident(
    id text PRIMARY KEY,
    name text NOT NULL
);

ALTER TABLE project ADD COLUMN fk_provider text REFERENCES provider(id);
ALTER TABLE incident ADD COLUMN fk_project text REFERENCES project(id);
ALTER TABLE incident ADD COLUMN fk_severity text REFERENCES severity(id);
