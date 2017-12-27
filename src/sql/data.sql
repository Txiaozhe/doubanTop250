CREATE TABLE books_top250 (
    id      INT PRIMARY KEY AUTO_INCREMENT,
    bid     INT NOT NULL UNIQUE,
    title   TEXT NOT NULL,
    alias   TEXT NOT NULL,
    url     TEXT NOT NULL,
    img     TEXT NOT NULL,
    mark    TEXT NOT NULL,
    judge   TEXT NOT NULL,
    abstract    TEXT NOT NULL,
    info    LONGTEXT NOT NULL
);
