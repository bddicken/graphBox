/**
 * File for creating database
 */

CREATE TABLE user {
    email VARCHAR(30),
    username VARCHAR(20),
    passwordHash VARCHAR(100),
    salt NUMBER
}

CREATE TABLE graph {
    email VARCHAR(30)
}
