ALTER TABLE evaluation
ADD CONSTRAINT u_evaluation UNIQUE (employer_id, user_id);
