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
);

CREATE TABLE availability
(
    id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id            UUID         NOT NULL,
    start_date         DATE         NOT NULL,
    end_date           DATE         NOT NULL,
    address_first_line VARCHAR(128) NOT NULL,
    address_zip        VARCHAR(20)  NOT NULL,
    address_city       VARCHAR(64)  NOT NULL,
    range              INT          NOT NULL,
    job_category_id    UUID         NOT NULL
);

CREATE TABLE reference
(
    id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id            UUID         NOT NULL,
    first_name         VARCHAR(64)  NOT NULL,
    last_name          VARCHAR(64)  NOT NULL,
    address_first_line VARCHAR(128) NOT NULL,
    address_zip        VARCHAR(20)  NOT NULL,
    address_city       VARCHAR(64)  NOT NULL,
    phone              VARCHAR(20)  NOT NULL,
    email              VARCHAR(256) NOT NULL,
    company_id         UUID         NOT NULL
);

CREATE TABLE experience
(
    id                         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id                    UUID         NOT NULL,
    start_date                 DATE         NOT NULL,
    end_date                   DATE         NOT NULL,
    company_address_first_line VARCHAR(128) NOT NULL,
    company_address_zip        VARCHAR(20)  NOT NULL,
    company_address_city       VARCHAR(64)  NOT NULL,
    company_id                 UUID         NOT NULL,
    job_id                     UUID         NOT NULL
);

CREATE TABLE evaluation
(
    id          UUID PRIMARY KEY       DEFAULT gen_random_uuid(),
    user_id     UUID          NOT NULL,
    employer_id UUID          NOT NULL,
    score       INT           NOT NULL,
    comment     VARCHAR(1024) NOT NULL,
    created_at  TIMESTAMP     NOT NULL DEFAULT NOW()
);
