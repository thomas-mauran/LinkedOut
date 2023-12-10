CREATE TABLE Employer (
                             id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                             firstName VARCHAR(64) NOT NULL,
                             lastName VARCHAR(64) NOT NULL,
                             picture VARCHAR(1024) NOT NULL,
                             phone VARCHAR(20) NOT NULL
);

INSERT INTO Employer(id, firstName, lastName, picture, phone)
VALUES
    ('c80f53f4-0a33-4fe3-bf7f-a755c6e2235b', 'Nicolas', 'Sarkozy', 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Flickr_-_europeanpeoplesparty_-_EPP_Summit_October_2010_(105)-(cropped).jpg', '0677096463'),
    ('0dc07c97-fc40-4ac2-a9f6-0b0bbbe6057e', 'François', 'Hollande', 'https://peopleauquotidien.com/wp-content/uploads/2022/12/JTA19T-1-e1670495723208.jpg', '0632789456'),
    ('8102b0f0-c03c-4f66-bd99-a2522625d11c', 'John', 'Cena', 'https://i.pinimg.com/736x/2d/8d/dd/2d8ddd5b89a7e067c2d3404773549a4d.jpg', '0742569874'),
    ('4d40844c-4db9-45d3-bffd-18804411a69c', 'Noé', 'Tarbouret', 'https://vectorseek.com/wp-content/uploads/2023/03/Golang-Gopher-Logo-Vector.jpg', '0647932568');
