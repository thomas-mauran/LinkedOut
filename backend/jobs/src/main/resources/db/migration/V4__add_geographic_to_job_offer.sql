-- Add the geographicArea and status column to the JobOffer table
ALTER TABLE JobOffer
ADD COLUMN geographicArea varchar(255) NOT NULL default '',
ADD COLUMN status INT NOT NULL default -1;
