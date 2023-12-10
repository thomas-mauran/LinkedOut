CREATE TABLE Message (
                         id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                         messageChannelId UUID NOT NULL,
                         direction INT NOT NULL,
                         message VARCHAR(4096) NOT NULL,
                         created TIMESTAMP NOT NULL DEFAULT NOW(),
                         FOREIGN KEY (messageChannelId) REFERENCES MessageChannel(id),
                         CHECK (direction IN (0, 1))
);
