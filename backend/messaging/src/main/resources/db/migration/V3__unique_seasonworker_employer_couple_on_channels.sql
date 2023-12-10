ALTER TABLE MessageChannel
ADD CONSTRAINT u_message_channel UNIQUE (seasonworkerId, employerId);
