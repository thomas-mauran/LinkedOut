CREATE TABLE Notification (
                                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                                seasonworkerId UUID NOT NULL,
                                content VARCHAR(1024) NOT NULL
);
