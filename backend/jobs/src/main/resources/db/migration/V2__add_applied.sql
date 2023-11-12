CREATE TABLE JobApplication (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     jobId UUID NOT NULL,
     userId UUID NOT NULL,
     status BOOLEAN NOT NULL DEFAULT FALSE,
     FOREIGN KEY (jobId) REFERENCES Job(id)
);