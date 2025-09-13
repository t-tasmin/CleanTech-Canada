CREATE TABLE IF NOT EXISTS supply (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    hour INT NOT NULL,
    generator VARCHAR(100),
    fuel VARCHAR(50),
    measurement VARCHAR(50),
    value NUMERIC
);
