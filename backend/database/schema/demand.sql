CREATE TABLE IF NOT EXISTS demand (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    hour INT  NOT NULL,
    market_demand INT,
    ontario_demand INT
);
