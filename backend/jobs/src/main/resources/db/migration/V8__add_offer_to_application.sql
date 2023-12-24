ALTER TABLE jobapplication
    DROP COLUMN jobId,
    ADD COLUMN offerId UUID REFERENCES joboffer(id);
