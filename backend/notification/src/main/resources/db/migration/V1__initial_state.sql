CREATE TABLE Notification (
                                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                                seasonworkerId UUID NOT NULL,
                                title VARCHAR(256) NOT NULL,
                                content VARCHAR(1024) NOT NULL,
                                created TIMESTAMP NOT NULL DEFAULT NOW()
);
