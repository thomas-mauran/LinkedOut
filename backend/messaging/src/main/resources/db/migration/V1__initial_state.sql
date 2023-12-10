CREATE TABLE MessageChannel (
                                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                                seasonworkerId UUID NOT NULL,
                                employerId UUID NOT NULL,
                                CONSTRAINT u_message_channel UNIQUE (seasonworkerId, employerId)
);
