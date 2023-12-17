CREATE TABLE profile
(
    id                 UUID PRIMARY KEY      DEFAULT gen_random_uuid(),
    user_id            UUID         NOT NULL UNIQUE,
    first_name         VARCHAR(64)  NOT NULL,
    last_name          VARCHAR(64)  NOT NULL,
    gender             INT          NOT NULL,
    birthday           DATE         NOT NULL,
    nationality        VARCHAR(32)  NOT NULL,
    address_first_line VARCHAR(128) NOT NULL,
    address_zip        VARCHAR(20)  NOT NULL,
    address_city       VARCHAR(64)  NOT NULL,
    phone              VARCHAR(20)  NOT NULL,
    email              VARCHAR(256) NOT NULL,
    short_bio          VARCHAR(256) NOT NULL,
    deletion_requested BOOLEAN      NOT NULL DEFAULT FALSE
)
