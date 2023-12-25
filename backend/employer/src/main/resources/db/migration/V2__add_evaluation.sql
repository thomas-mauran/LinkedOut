CREATE TABLE evaluation
(
    id          UUID PRIMARY KEY       DEFAULT gen_random_uuid(),
    user_id     UUID          NOT NULL,
    employer_id UUID          NOT NULL REFERENCES employer (id),
    score       INT           NOT NULL,
    comment     VARCHAR(1024) NOT NULL,
    created_at  TIMESTAMP     NOT NULL DEFAULT NOW()
);
