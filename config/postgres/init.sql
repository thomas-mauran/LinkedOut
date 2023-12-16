-- Jobs service
CREATE USER job
    WITH LOGIN
    PASSWORD 'job';

CREATE DATABASE job
    OWNER 'job';

-- Messaging service
CREATE USER messaging
    WITH LOGIN
    PASSWORD 'messaging';

CREATE DATABASE messaging
    OWNER 'messaging';

-- Employer service
CREATE USER employer
    WITH LOGIN
    PASSWORD 'employer';

CREATE DATABASE employer
    OWNER 'employer';

-- Notification service
CREATE USER notification
    WITH LOGIN
    PASSWORD 'notification';

CREATE DATABASE notification
    OWNER 'notification';

-- Profile service
CREATE USER profile
    WITH LOGIN
    PASSWORD 'profile';

CREATE DATABASE profile
    OWNER 'profile';