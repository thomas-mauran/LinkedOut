CREATE TABLE JobCategory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title varchar(100) NOT NULL,
    UNIQUE(title)
);

CREATE TABLE Company (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name varchar(100) NOT NULL,
    geographicArea varchar(255) NOT NULL,
    UNIQUE(name, geographicArea)
);

CREATE TABLE Job (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title varchar(100) NOT NULL,
    category UUID NOT NULL,
    FOREIGN KEY (category) REFERENCES JobCategory(id),
    UNIQUE(title, category)
);

CREATE TABLE JobOffer (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job UUID NOT NULL,
    title varchar(100) NOT NULL,
    description varchar(1000) NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    company UUID NOT NULL,
    salary INT NOT NULL,
    FOREIGN KEY (company) REFERENCES Company(id),
    FOREIGN KEY (job) REFERENCES Job(id)
);

INSERT INTO
    JobCategory(id, title)
VALUES
    (
        '504fe0a7-a862-4f1a-8ff5-67e925c73f35',
        'Agriculture, Viticulture, Pêche'
    ),
    (
        'ae0a2695-088b-4aec-9751-d29204f277fd',
        'Hôtellerie de plein air, Club vacances, Camping, Animation'
    ),
    (
        '58f2960e-8536-4454-a713-dbd78670670e',
        'Hôtels, cafés, bars, restaurants'
    ),
    (
        '480e8413-1913-4547-b9b8-ed0ecc5d9d2c',
        'Evenementiel'
    ),
    (
        '487e9884-e490-425c-b3e0-b5d2b0029683',
        'Casinos, Parcs d''attraction'
    ),
    (
        'f6602954-76ff-4f1a-99fe-59e2fb5bd32f',
        'Administration, Espaces culturels, Tourisme'
    ),
    --('Zoo, Espaces de loisirs'),
    (
        '3ca13093-7e71-40ba-992e-dbefa380f506',
        'Montagne, Ski'
    ),
    (
        'ce9d817d-9e40-4fef-8a6a-ae58c9948009',
        'Mer, Plongée, Sports/Loisirs Nautiques'
    ),
    --('Jardineries, Graineteries'),
    (
        '778af999-18a8-4343-81f1-410448118469',
        'Sécurité, Gardiennage'
    ),
    (
        '30972914-91da-4dca-8a98-73a2942b0eaf',
        'Logistique, Transport'
    ),
    (
        '45a251b0-f53c-4c0a-acfb-6c1c8f88c477',
        'Baby sitting, Services à la personne'
    ),
    (
        '10823666-4ae8-40a4-a692-b1bd4991bb05',
        'Commerce, Achats, Vente'
    ),
    (
        'e8c82731-2d12-4838-b605-1c626a3115aa',
        'SPA, Esthétique, Coiffure'
    ),
    --('Arts, Festivals, Spectacles'),
    ('8f3432e0-39b7-44ec-877e-4ad56400d7cc', 'Autre');

-- Agriculture, Viticulture, Pêche (Catégorie '504fe0a7-a862-4f1a-8ff5-67e925c73f35') :
insert into
    Job(id, title, category)
values
    (
        '909b8e21-359c-42a1-a983-d31fb078a847',
        'Ouvrier.e agricole',
        '504fe0a7-a862-4f1a-8ff5-67e925c73f35'
    ),
    (
        '50fac92d-880f-4703-9158-af8cbc3fcb29',
        'Chef.fe ouvrier.e agricole',
        '504fe0a7-a862-4f1a-8ff5-67e925c73f35'

    ),
    (
        '9b0c67b9-bef3-4f24-90eb-9c63f184e3e3',
        'Conduct.eur.rice d''engin agricole',
        '504fe0a7-a862-4f1a-8ff5-67e925c73f35'

    ),
    (
        '559db60a-9f8d-4c05-a770-e4b19e1f1fce',
        'Ouvrier.e horticole',
        '504fe0a7-a862-4f1a-8ff5-67e925c73f35'

    ),
    (
        'b022acef-c45d-47bd-b4e9-8ce9ad417c73',
        'Paysagiste',
        '504fe0a7-a862-4f1a-8ff5-67e925c73f35'

    ),
    (
        'e0a1c557-0df2-4850-90d2-f4b25ba0f766',
        'Maraîcher.e',
        '504fe0a7-a862-4f1a-8ff5-67e925c73f35'

    ),
    (
        '50882e8a-14a5-42fa-a717-da0c5a685783',
        'Mécanicien.ne en matériel agricole',
        '504fe0a7-a862-4f1a-8ff5-67e925c73f35'

    ),
    (
        '69f41bee-14b3-43ce-aa8b-043fcb2e845f',
        'Ouvrier.e forestier.e',
        '504fe0a7-a862-4f1a-8ff5-67e925c73f35'

    ),
    (
        '1e9a49c1-2b72-4baf-b6f0-540d5bada5d5',
        'Vétérinaire',
        '504fe0a7-a862-4f1a-8ff5-67e925c73f35'

    ),
    (
        'b57e484b-d1de-499e-ac3c-ebba44609364',
        'Marin-Pêcheur',
        '504fe0a7-a862-4f1a-8ff5-67e925c73f35'

    ),
    -- Hôtellerie de plein air, Club vacances, Camping, Animation (Catégorie 2) :
    (
        '5a83d3d8-b2b7-4bc5-827f-01c82a552b0b',
        'Animat.eur.rice petite enfance',
        'ae0a2695-088b-4aec-9751-d29204f277fd'
    ),
    (
        '67e0fc4b-2d55-4804-bd7f-ad5de48e817f',
        'Animat.eur.rice enfants',
        'ae0a2695-088b-4aec-9751-d29204f277fd'
    ),
    (
        '546207da-11b8-443e-94f4-46e6b8f29d5b',
        'Responsable animation
enfants',
        'ae0a2695-088b-4aec-9751-d29204f277fd'
    ),
    (
        'abc77f5d-1f05-4260-b343-4a1dd91126f3',
        'Animat.eur.rice polyvalent',
        'ae0a2695-088b-4aec-9751-d29204f277fd'
    ),
    (
        '81c14e94-3155-4d79-8fbe-bfde0f1dc8cb',
        'Responsable animation',
        'ae0a2695-088b-4aec-9751-d29204f277fd'
    ),
    (
        '70d50689-0201-4a50-9cb1-64d288fd532e',
        'Animat.eur.rice sportif',
        'ae0a2695-088b-4aec-9751-d29204f277fd'
    ),
    (
        '96ba3e09-a792-44c3-bf10-29865657526d',
        'Animat.eur.rice professionnel',
        'ae0a2695-088b-4aec-9751-d29204f277fd'
    ),
    (
        'e0f9c1e6-1009-4073-ba95-babefa46d7f2',
        'Guide-accompagnateur',
        'ae0a2695-088b-4aec-9751-d29204f277fd'
    ),
    (
        'e441c8f8-316e-4a84-82ad-22e3e02034c7',
        'Directeur d''exploitation',
        'ae0a2695-088b-4aec-9751-d29204f277fd'
    ),
    (
        '47afe4c4-eceb-4a8a-9877-a6ed552ed676',
        'Employé.e de parc de loisirs',
        'ae0a2695-088b-4aec-9751-d29204f277fd'
    ),
    (
        '690c2859-eddb-44c3-b2c7-2bb063154ab3',
        'Chorégraphe',
        'ae0a2695-088b-4aec-9751-d29204f277fd'
    ),
    (
        'b8b262c8-018d-42df-b762-e5eff5977f25',
        'Décorat.eur.rice',
        'ae0a2695-088b-4aec-9751-d29204f277fd'
    ),
    (
        '82510d32-c778-43e8-95c4-9684a7d32704',
        'Tech
nicien.ne son et lumière',
        'ae0a2695-088b-4aec-9751-d29204f277fd'
    ),
    ('42510d32-a778-43e8-95c4-9684a7d32704', 'DJ', 'ae0a2695-088b-4aec-9751-d29204f277fd'),
    -- Hôtels, cafés, bars, restaurants (Catégorie 3) :
    (
        'b8f698dc-3b4a-4dc4-b885-890c1b366e29',
        'Direct.eur.rice d''hôtel',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        '0264b13f-3795-447e-8b04-b8401a65e7e1',
        'Assistant.e de direction',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        '594424be-df5a-4d3d-9274-99113bf7e90f',
        'Responsable d''hébergement',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        '343cb67a-227b-4de7-87a2-b0d44282fcf5',
        'Chef.fe réception',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        '5d90aefc-2acb-4415-b141-8baea8689b3c',
        'Réceptionniste',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'a03f8b85-2bd4-4765-84d7-22de857f5186',
        'Night Auditor',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'ea4aff1e-e317-4be8-8ab3-f7eba8238d81',
        'Chef.fe concierge',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'dc20a544-22a9-4a19-a8cc-f15d490d4a48',
        'Concierge',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        '47650051-3086-46e3-b9b3-bd0214a4c549',
        'Portier.e',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        '38cfe907-ae7e-41f4-907f-654c0f43118d',
        'Chasseur',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        '6980117e-4fee-4365-835b-b19ffbcafca2',
        'Voiturier.e',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        '41bf9e8e-5616-448a-9cec-390ae6e13148',
        'Bagagiste',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'fcc91a31-c23f-4028-8085-b5caba549e02',
        'Guest relation',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'a898bcf9-a2be-445b-aef5-e2d42bca8c0d',
        'Majordome',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        '551b7e24-2325-4fed-a8ea-67ef10d8ac06',
        'Responsable blanchisserie/lingerie',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'f2dbf89a-488d-448c-af53-70f65088a463',
        'Employé.e de blanchisserie/lingerie',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        '6b533470-ec83-4b41-bbc2-e8ef8ba477af',
        'Employé.e d''étages',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        '8daa0d27-e0ea-4f10-9f93-892dcc043ba3',
        'Assistant.e gouvernant.e',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'b86de3a4-4b72-4ec7-9739-ab2b695440c4',
        'Gouvernant.e',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        '89da70fb-194b-4d4d-b90d-5dcc779f51be',
        'Gouvernant.e général.e',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'ff6d2b39-8559-42a6-8b05-712345f68dcf',
        'Employé.e polyvalent',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        '3c4aba81-5756-4827-b4ab-4861e51cdff1',
        'Equipi
er.e',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        '563d37bd-8644-424c-9b8f-dae43aa48261',
        'Responsable de maintenance',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        '603f1712-92c8-454e-a924-0316afc180bc',
        'Agent de maintenance',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        '2769e5c0-22b6-47c1-bc4d-53014b7f0786',
        'House keeping',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'd85dabcc-ca99-4ef4-8e14-10676fb3088c',
        'Jardinier.e paysagiste',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        '32788e69-9f5a-4263-8991-25cb08c43c4e',
        'Manager F&B',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        '3d7c081e-31f1-48f1-bab7-54de3873a5e1',
        'Direct.eur.rice de restauration',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'bc67c2c3-7a66-4857-9f94-ac4b2372900e',
        'Maitre.sse d''hôtel',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'eef8330b-a03b-49b9-8867-e9f17b78d5c5',
        'Assistant.e Maitre.sse d''hô
tel',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        '89cfc022-3f53-4f7d-95fe-5930adf803e6',
        'Chef.fe de rang',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        '2b9597a8-13bc-4a76-a5d3-04ff850c798f',
        'Commis/Runner',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'af907197-2486-4908-9ecc-dffecb9ad675',
        'Chef.fe sommelier',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'ed9c2f8a-0cc9-42a1-a2a2-eefd2f8b58cd',
        'Sommelier',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        '0d192ff2-31a0-4f8a-9f61-259f16f0077c',
        'Limonadier',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        '565cb4eb-94e8-4a49-bc99-7023cd1192c4',
        'Chef.fe bar.wo.man',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'd3fd6af1-a227-4dcc-9178-0259b51670d9',
        'Bar.wo.man',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        '1b23c925-c0f2-480f-b3f3-c8da949d4bd3',
        'Commis de Bar',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        '1b49db23-c9ac-492e-9fb4-4c9b5c7e753d',
        'Responsable Room Service',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        '798f5b5e-7b31-4bdf-bad9-12986087adec',
        'Room Service',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'a2a8b7ad-d283-44ec-ab7b-a78f14c11a84',
        'Responsa
ble petit déjeuner',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'a5eda6ac-4762-4480-b658-632884deb7b4',
        'Hôte.sse d''accueil',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'f5604028-9902-4216-a0c9-7d427148c6a4',
        'Chef.fe de cuisine',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'a2bb0795-b31f-41f5-b118-4113e2a22639',
        'Second de cuisine',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        '54c69344-ec6f-4431-8871-09aab02d7c1d',
        'Chef.fe de partie',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        '47d63372-cad1-4f23-a87a-ab58a94f8992',
        'Demi chef.fe de partie',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        '91117f19-3413-4b18-857a-372abcf2aedf',
        'Commis de cuisine plongeur',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'c8fc65f3-7c4e-4f11-9fca-9e314ece7a2f',
        'Boulanger.e',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        '2f86025a-3a0e-4cf0-8e4c-7eb5ec019dcd',
        'Chef.fe pâtissier.e',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'b47a0521-f87f-4032-92ed-db6bfe31a7d7',
        'Second d
e pâtissier.e',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        '6fd94b9c-7e79-45ab-9370-f422fefb5386',
        'Pâtissier.e',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'fd4dab09-0c5d-4682-b200-6b95330bcbbc',
        'Chef.fe chocolatier',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        '626a7185-b74d-4401-a166-036c10ae87bd',
        'Chocolatier',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        '35aaa7a6-fb6a-4b8d-99e9-946b7c0b28ee',
        'Pizzaiolo',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'a002fbfb-a062-4f16-90b3-be21498719bb',
        'Crêpier.e',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'd582c19b-b581-45dd-8390-33832b325d2a',
        'Glacier',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        '3118e2cf-8301-405e-861b-ce57bd345b3e',
        'Plagiste',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    -- Evénementiel (Catégorie 4) :
    (
        '2855a6c9-f001-4d77-9c09-814cc1c6d715',
        'Direct.eur.rice de foire, salon, congrès, exposition',
        '480e8413-1913-4547-b9b8-ed0ecc5d9d2c'
    ),
    (
        '3db8c9d9-c507-4e9c-82d6-44ede4be7a78',
        'Direct.eur.rice de cirque',
        '480e8413-1913-4547-b9b8-ed0ecc5d9d2c'
    ),
    (
        '4f6fc60d-e22f-42d6-8b80-af1a0677eca6',
        'Direct.eur.rice d''agence évènementielle',
        '480e8413-1913-4547-b9b8-ed0ecc5d9d2c'
    ),
    (
        '2562ada8-d07b-43ac-8f5f-09536fce9320',
        'Chef.fe de projet événementiel',
        '480e8413-1913-4547-b9b8-ed0ecc5d9d2c'
    ),
    (
        '073425e8-1197-40f8-8cb6-3e1985936071',
        'Chargé.e de communication événementielle',
        '480e8413-1913-4547-b9b8-ed0ecc5d9d2c'
    ),
    (
        'bd119ec6-99c3-47c2-bc50-12fbb2272780',
        'Organis
at.eur.rice de spectacles',
        '480e8413-1913-4547-b9b8-ed0ecc5d9d2c'
    ),
    (
        '5e959996-0b63-4e6c-bf1b-2b38997c852a',
        'Commissaire de salon/d''exposition',
        '480e8413-1913-4547-b9b8-ed0ecc5d9d2c'
    ),
    (
        'a960d23f-38f7-4e38-825f-3ef76beda1c2',
        'Organisat.eur.rice de business event',
        '480e8413-1913-4547-b9b8-ed0ecc5d9d2c'
    ),
    (
        '359e9ac3-015c-42ed-a12d-6b54f5cce11a',
        'Organisat.eur.rice d''évé
nements',
        '480e8413-1913-4547-b9b8-ed0ecc5d9d2c'
    ),
    (
        'b5700fbd-653d-49bd-a28f-14accc233af3',
        'Chef.fe de projet artistique et culturel',
        '480e8413-1913-4547-b9b8-ed0ecc5d9d2c'
    ),
    (
        '1aff2e70-f8e9-4011-a1d8-9dd51ac40d22',
        'Organisat.eur.rice d''événements culturels et artistiques',
        '480e8413-1913-4547-b9b8-ed0ecc5d9d2c'
    ),
    (
        'b2153f65-2adb-40ab-90fa-687a95412fa9',
        'Organisat.eur.ric
e d''événements sportifs',
        '480e8413-1913-4547-b9b8-ed0ecc5d9d2c'
    ),
    (
        'be879a0b-5950-415f-93b1-3c6902805f71',
        'Direct.eur.rice de production événementielle',
        '480e8413-1913-4547-b9b8-ed0ecc5d9d2c'
    ),
    (
        '6b9cb30e-e515-44e8-9c51-efcc14047103',
        'Médiat.eur.rice culturel',
        '480e8413-1913-4547-b9b8-ed0ecc5d9d2c'
    ),
    (
        '132b8e04-e2cc-4cc1-a275-23e54210964f',
        'Direct.eur.rice de festival',
        '480e8413-1913-4547-b9b8-ed0ecc5d9d2c'
    ),
    (
        '8cdedd38-813a-4a63-9faf-27c4f39300ba',
        'Photographe',
        '480e8413-1913-4547-b9b8-ed0ecc5d9d2c'
    ),
    (
        'eacabd48-c4fd-4f38-b072-fd887fbe138e',
        'Modèle Mannequinat',
        '480e8413-1913-4547-b9b8-ed0ecc5d9d2c'
    ),
    (
        '2588681e-c0fa-401d-8c45-25a4c41e6032',
        'Hôte.sse',
        '480e8413-1913-4547-b9b8-ed0ecc5d9d2c'
    ),
    -- Casinos, Parcs d'attraction (Catégorie '487e9884-e490-425c-b3e0-b5d2b0029683') :
    (
        '6b1d407a-f335-44d3-b5c6-33e16f1b4a64',
        'Direct.eur.rice de parc zoologique',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        '3af4ba85-5845-468a-885f-2945fcd3764d',
        'Vétérinaire',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        '74f3e4bb-f3e7-49c4-bad2-30449970f078',
        'Chef.fe animalier',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        '6622e775-d718-45c7-91c1-688ccefba58e',
        'Soigna
nt.e animalier',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        '0006c2c7-f333-474b-a3e7-e12cafb3025a',
        'Auxiliaire spécialisé vétérinaire',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        '15eaea1e-99e1-46cd-8629-c1679a0b7ec3',
        'Jardinier',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        '282296f9-62ef-4f00-816d-8b15c8d84e78',
        'Eleveur animalier',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        '6f8c62fd-b60a-45b7-a245-89234e5ef04b',
        'Fauconnier',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'ecb1368e-55ed-4218-ba53-b1aa8df0a3da',
        'Direct.eur.rice de parc
 d''attraction',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        '79c5feeb-10d8-4548-ac65-ff47bd4b5e5b',
        'Responsable d''un secteur d''attraction',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        '2521b230-fce0-4a43-a43f-1dded9aa4fe6',
        'Pilote d''attractions',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'd05240c3-2899-442f-b725-07c674c44199',
        'Hôte.sse de salle de jeux électroniques',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        '1636d4fb-d784-46ee-a412-4485b482f3d8',
        '
Conduct.eur.rice de manège',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        '8b88fae0-9681-483c-80ea-069c1dff7b91',
        'Responsable des attractions',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'a2bac2c3-cb1c-4143-ba2e-5b3559c05d06',
        'Opérat.eur.rice d''attraction',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        '48e2283d-ff9c-41fe-b90e-fc3d8c5153e9',
        'Hôte.sse de patinoire',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'fb363b2e-30cb-4045-b961-4f224e833d0f',
        'Hôte.sse d
e manège',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'dbfbffd4-ca6f-443a-afc6-8f8a411df720',
        'Employé.e de parc de loisirs',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        '1b766a35-cadb-4111-852c-9b8005f34bad',
        'Ouvreu.r.se de salle de spectacles',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        '3d2e7564-81f2-4145-b509-a4cedeac8999',
        'Pilote de manège',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'ab070132-2643-44ad-9383-1e0141b516c8',
        'Opérat.eur.rice de manège',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'b3e4c6e7-7800-421c-911f-8ef802858f7d',
        'Ouvreu.r.se placeu.r.se de salle de spectacles',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'e18f662d-7424-4091-80a0-77c4c2e7deb0',
        'Employé.e de manège forain',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        '2ae74c69-1fdc-4973-ad75-172c123a8351',
        'Agent.e d''exploitation des attractions',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        '1e9b35de-e07a-4a70-9e59-d1e4badd30c8',
        'Agen
t.e de contrôle de salle de spectacles',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        '00aebcc6-f4d9-4fd2-aba1-7a7cf1eb0279',
        'Assistant.e de zone d''attraction',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        '444c83f1-f813-4fc3-a7b4-efb6712c2793',
        'Conduct.eur.rice d''attraction',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        '29456810-40f4-4eb0-a40b-1e05e33073a7',
        'Hôte.sse d''attracti
ons',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'd9dccbf1-9109-42f5-b409-bbbd83d2d0eb',
        'Employé.e de loisirs ou d''attractions',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        '8b63dea3-323f-43b3-9aeb-a80829147f40',
        'Animat.eur.rice de parc de loisirs',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'ecb2efce-8fc0-42d3-bf38-f67006e7e2d2',
        'Animat.eur.rice de personnage de parc de loisi
rs',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'ad3cfbf6-b26c-4b6f-a1a7-4217867eb837',
        'Animat.eur.rice d''attractions',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        '7ce82b61-61de-462a-b424-a15741c95530',
        'Opérat.eur.rice de parcours acrobatique dans les arbres',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'b97d0138-ec6b-4df0-ac61-ff2617361c4c',
        'Hôte.sse de golf/mini-golf',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'fc108d85-99e0-44b9-8a38-4c52b5db75cf',
        '
Billettiste',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        '1cdf3487-cb13-4766-beeb-8d2d8706d4e2',
        'Direct.eur.rice de casino',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        '05e8a53c-f896-45c5-8422-bef743fc2e7b',
        'Chef.fe croupier.re',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'ca3a314e-8188-4590-ab94-0a59f544d404',
        'Croupier.re',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'aca91e47-80d9-49ec-a585-128c3e629454',
        'Responsable clientèle',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        '4d7d0a3d-f2ca-4e55-9805-cfc8e35d4c8c',
        'Agent de sécurité
',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'afb88773-1eac-4732-98ba-83bf21514ced',
        'Opérat.eur.rice de vidéosurveillance',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        '08c12d97-9bff-4bd3-9d14-e8cc80d97a86',
        'Banquier',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        '9783c7a6-15d5-4b72-9515-2253f42f32e9',
        'Gestionnaire de fond',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        '484d98fa-3eee-49b1-b317-6775b671da5b',
        'Technicien machine à sous',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'a0530cf4-7ebd-4e46-bedb-1c4a540672d1',
        'Contrôleur audit
eur de machines à sous',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    -- Administration, Espaces culturels, Office du Tourisme (Catégorie 'f6602954-76ff-4f1a-99fe-59e2fb5bd32f') :
    (
        'fbc3bdd6-514c-42d7-ba29-33b503888eda',
        'Direct.eur.rice d''office de tourisme',
        'f6602954-76ff-4f1a-99fe-59e2fb5bd32f'
    ),
    (
        'd4507f6c-7869-4879-9cfa-7f4b1095aefe',
        'Direct.eur.rice de site culturel',
        'f6602954-76ff-4f1a-99fe-59e2fb5bd32f'
    ),
    (
        'a7f851a5-cbff-4ada-9620-92182c4350ef',
        'Respon
sable de réservation',
        'f6602954-76ff-4f1a-99fe-59e2fb5bd32f'
    ),
    (
        'fe381dc8-353c-4e3c-aab6-7dc08bf0837a',
        'Agent d''accueil',
        'f6602954-76ff-4f1a-99fe-59e2fb5bd32f'
    ),
    (
        'b0de531b-0eb8-4d99-8937-5474a507b0e7',
        'Agent polyvalent',
        'f6602954-76ff-4f1a-99fe-59e2fb5bd32f'
    ),
    (
        '8db64d02-f019-42f0-a121-39d56f498a93',
        'Guide accompagnateur',
        'f6602954-76ff-4f1a-99fe-59e2fb5bd32f'
    ),
    -- Montagne, Ski (Catégorie '3ca13093-7e71-40ba-992e-dbefa380f506') :
    (
        '0a134493-28fb-4162-8a2c-950610f8eaf7',
        'Chef.fe d''exploitation de remontée mécanique',
        '3ca13093-7e71-40ba-992e-dbefa380f506'
    ),
    (
        '0267ad63-f4da-4c92-a3fe-fa34b0add2a1',
        'Electromécanicien.ne en remontée mécan
ique',
        '3ca13093-7e71-40ba-992e-dbefa380f506'
    ),
    (
        'f1fe6bed-5f89-403f-aebe-65ea407ba615',
        'Installateur en remontée mécanique',
        '3ca13093-7e71-40ba-992e-dbefa380f506'
    ),
    (
        'e38921b7-8a4e-4281-81c6-0138049ae248',
        'Conducteu.r.se de remontée mécanique',
        '3ca13093-7e71-40ba-992e-dbefa380f506'
    ),
    (
        '77290bb2-ad99-4975-aacb-74e630c145dc',
        'Caissier.e en remontée mécanique',
        '3ca13093-7e71-40ba-992e-dbefa380f506'
    ),
    (
        'f02ce9c0-dca9-48fd-bd64-e1fcba5bfe55',
        'Agent d
''accueil',
        '3ca13093-7e71-40ba-992e-dbefa380f506'
    ),
    (
        'f17b2627-b0c2-4b78-ad2d-14c094036b43',
        'Employé.e d''équipement de sports et de loisirs',
        '3ca13093-7e71-40ba-992e-dbefa380f506'
    ),
    (
        '1236cf52-bcb4-4f16-be51-9c633f8fafab',
        'Accompagnat.eur.rice en montagne',
        '3ca13093-7e71-40ba-992e-dbefa380f506'
    ),
    (
        '3fad9127-95de-4212-b64a-9681addb00bc',
        'Moniteur.e de ski',
        '3ca13093-7e71-40ba-992e-dbefa380f506'
    ),
    (
        'a6e194f9-c54d-491d-a3b0-849729bf6445',
        'Moniteur
.e de randonnée',
        '3ca13093-7e71-40ba-992e-dbefa380f506'
    ),
    (
        '17e7160a-e191-48eb-b0ae-a2862215f9ce',
        'Moniteur.e d''escalade',
        '3ca13093-7e71-40ba-992e-dbefa380f506'
    ),
    (
        '8196860a-e0a9-4569-97c5-24b4bdf67dca',
        'Moniteur.e de moto neige',
        '3ca13093-7e71-40ba-992e-dbefa380f506'
    ),
    (
        '41586e40-2af5-4865-bf3f-9c0545efc03a',
        'Ski.wo.man',
        '3ca13093-7e71-40ba-992e-dbefa380f506'
    ),
    (
        '1be34468-8c71-4081-97e2-e9849a48a80b',
        'Conducteur d''engins de Damage',
        '3ca13093-7e71-40ba-992e-dbefa380f506'
    ),
    (
        '53dcd804-366f-4a6f-9e29-19e79889c28b',
        'Perc
histe',
        '3ca13093-7e71-40ba-992e-dbefa380f506'
    ),
    (
        'ff463280-0fde-43c3-badf-5eab93766de7',
        'Pisteu.r.se secouriste',
        '3ca13093-7e71-40ba-992e-dbefa380f506'
    ),
    (
        'cecfb53c-03a0-4296-af87-c2697153cdab',
        'Nivocult.eur.rice',
        '3ca13093-7e71-40ba-992e-dbefa380f506'
    ),
    (
        '1b28496e-b4ff-4f9b-adab-303cd9535fdb',
        'Artificier.e',
        '3ca13093-7e71-40ba-992e-dbefa380f506'
    ),
    (
        '038c2fc3-1d97-45f2-a658-602889055fdd',
        'Maitre.sse chien d''avalanche',
        '3ca13093-7e71-40ba-992e-dbefa380f506'
    ),
    -- Mer, Plongée, Sports/Loisirs Nautiques (Catégorie 'ce9d817d-9e40-4fef-8a6a-ae58c9948009') :
    (
        '1c8ab8bd-e0ec-459f-ac26-0afb0c234f84',
        'Plagiste',
        'ce9d817d-9e40-4fef-8a6a-ae58c9948009'
    ),
    (
        '6839f8dd-ae68-4984-864c-74834ce00e77',
        'Vendeu.r.se ambulant.e de glace ou de beignets',
        'ce9d817d-9e40-4fef-8a6a-ae58c9948009'
    ),
    (
        'faa68526-857b-4d9c-8c71-47cc6ea1d6a3',
        'Animat.eur.rice de clu
b de plage',
        'ce9d817d-9e40-4fef-8a6a-ae58c9948009'
    ),
    (
        '9f600c07-57d2-4f5e-b871-a1d9286df71e',
        'Nageu.r.se sauveteur',
        'ce9d817d-9e40-4fef-8a6a-ae58c9948009'
    ),
    (
        '9be0e77c-0be7-42a2-ac76-48158dd3811d',
        'Monit.eur.rice d''activités nautiques',
        'ce9d817d-9e40-4fef-8a6a-ae58c9948009'
    ),
    (
        '1ab645a9-7bc7-4008-9467-f7b0d6307bc5',
        'Surveillant.e de baignade',
        'ce9d817d-9e40-4fef-8a6a-ae58c9948009'
    ),
    (
        '497d334f-2e4c-4a4f-987c-0f9937ff36f0',
        'Monit.eur.rice de plo
ngée',
        'ce9d817d-9e40-4fef-8a6a-ae58c9948009'
    ),
    (
        '92fd4a0b-3611-48cb-90ac-edc4fd0d257a',
        'Employé.e de Capitainerie',
        'ce9d817d-9e40-4fef-8a6a-ae58c9948009'
    ),
    (
        'cd3946cf-79b3-4094-8242-e7cbffeafb40',
        'Mécanicien.ne de bateaux',
        'ce9d817d-9e40-4fef-8a6a-ae58c9948009'
    ),
    (
        '0e473c16-68bf-4877-82e2-742582f900c7',
        'Equipage de bateaux',
        'ce9d817d-9e40-4fef-8a6a-ae58c9948009'
    ),
    -- Sécurité, Gardiennage (Catégorie '778af999-18a8-4343-81f1-410448118469'):
    (
        'ce5d755a-e096-4a30-9adc-4856c891d967',
        'Garde rapprochée',
        '778af999-18a8-4343-81f1-410448118469'
    ),
    (
        'dd914846-3a87-4a80-9349-03a746ba0f7f',
        'Agent de sécurité',
        '778af999-18a8-4343-81f1-410448118469'
    ),
    (
        'd4dcfa97-c91c-4175-a855-4f7710ac364d',
        'Opérat.eur.rice de vidéosurveillance',
        '778af999-18a8-4343-81f1-410448118469'
    ),
    (
        'a663dc4a-0246-4f7f-a747-78382b2c192b',
        'Maitre.sse de chien',
        '778af999-18a8-4343-81f1-410448118469'
    ),
    (   '8becb8d7-08e8-4aba-bfc8-cb9009985f18',
        'ASVP',
        '778af999-18a8-4343-81f1-410448118469'),
    (
        'a788c5ad-6465-4e6a-8005-219c188de6b3',
        'Gardien.ne',
        '778af999-18a8-4343-81f1-410448118469'
    ),
    -- Logistique, Transport (Catégorie '30972914-91da-4dca-8a98-73a2942b0eaf') :
    (
        '4ddc8cf9-ced6-4a6c-a9e2-59595f9479c9',
        'Magasinier.e',
        '30972914-91da-4dca-8a98-73a2942b0eaf'
    ),
    (
        '12938e6c-7504-4255-9f61-c8b1eabe4a10',
        'Chef magasinier',
        '30972914-91da-4dca-8a98-73a2942b0eaf'
    ),
    (
        'b7c20171-c64a-4682-b6f6-e7f7bef95354',
        'Préparat.eur.rice de commande',
        '30972914-91da-4dca-8a98-73a2942b0eaf'
    ),
    (
        'b55aaf7f-285f-42bc-9672-a89699c2ada8',
        'Cariste',
        '30972914-91da-4dca-8a98-73a2942b0eaf'
    ),
    (
        'f73463d4-4fff-400f-8902-5f15ab1d4d1e',
        'Manutentionnaire',
        '30972914-91da-4dca-8a98-73a2942b0eaf'
    ),
    (
        'c0614fc9-3b80-4886-8b3d-9590daf9cdd0',
        'Opérat.eur.rice',
        '30972914-91da-4dca-8a98-73a2942b0eaf'
    ),
    (
        'd9457048-9a63-4503-83aa-d87bc1430b61',
        'Chauffeur livreur',
        '30972914-91da-4dca-8a98-73a2942b0eaf'
    ),
    (
        '087269a0-fadf-4058-b269-3457d328734b',
        'Chauffeur routier',
        '30972914-91da-4dca-8a98-73a2942b0eaf'
    ),
    -- Babysitting, Services à la personne (Catégorie '45a251b0-f53c-4c0a-acfb-6c1c8f88c477') :
    (
        'd198f766-7981-40bd-bad4-243a4c89d137',
        'Garde d''enfants',
        '45a251b0-f53c-4c0a-acfb-6c1c8f88c477'
    ),
    (
        '3f517e80-861a-4ea0-a2dc-98db54ee247c',
        'Garde périscolaire',
        '45a251b0-f53c-4c0a-acfb-6c1c8f88c477'
    ),
    (
        'edffe5ae-019f-4a0e-9d5d-ab42a2a3d002',
        'Aide aux devoirs',
        '45a251b0-f53c-4c0a-acfb-6c1c8f88c477'
    ),
    (
        '84d81658-e33f-4384-88d2-6676bd7226f4',
        'Animat.eur.rice
 d''anniversaire',
        '45a251b0-f53c-4c0a-acfb-6c1c8f88c477'
    ),
    (
        'a8619fe7-3836-46e9-bcb1-3baaf360aee6',
        'Accompagnat.eur.rice de vacances',
        '45a251b0-f53c-4c0a-acfb-6c1c8f88c477'
    ),
    (
        'f40de1e2-47dc-47c1-8cd2-666e303e034f',
        'Aide à la personne',
        '45a251b0-f53c-4c0a-acfb-6c1c8f88c477'
    ),
    (
        '5352c1a6-e1b6-48b1-8c11-355fc777f61d',
        'Livreur à domicile',
        '45a251b0-f53c-4c0a-acfb-6c1c8f88c477'
    ),
    (
        '7ab462da-4bb2-497f-a212-4ce8294f2a7f',
        'Chauffeur VTC',
        '45a251b0-f53c-4c0a-acfb-6c1c8f88c477'
    ),
    (
        'fcb39343-cd2f-4f80-ac8a-fab3348ade51',
        'Aid
e au ménage',
        '45a251b0-f53c-4c0a-acfb-6c1c8f88c477'
    ),
    (
        '529fde9b-ec3b-4488-b181-d7424dbe8d72',
        'Paysagiste jardinier arboriste',
        '45a251b0-f53c-4c0a-acfb-6c1c8f88c477'
    ),
    -- Commerce, Achats, Vente (Catégorie 1'ae0a2695-088b-4aec-9751-d29204f277fd') :
    (
        'f9b70367-7571-44e3-850f-68502e92f7a9',
        'Billettiste',
        '10823666-4ae8-40a4-a692-b1bd4991bb05'
    ),
    (
        '85246c7e-56e3-4594-a6b6-66e03a3020e6',
        'Responsable de réservation',
        '10823666-4ae8-40a4-a692-b1bd4991bb05'
    ),
    (
        '4fcdc18b-77fe-43bd-b81d-e3b0e65ad8e8',
        'Responsable de vente',
        '10823666-4ae8-40a4-a692-b1bd4991bb05'
    ),
    (
        '4962829c-8fd8-474b-b12e-07bc69d6b9f6',
        'Respo
nsable de magasin',
        '10823666-4ae8-40a4-a692-b1bd4991bb05'
    ),
    (
        '80ddd37a-d708-42f2-a87e-f9ab16941cc3',
        'Assistant.e responsable magasin',
        '10823666-4ae8-40a4-a692-b1bd4991bb05'
    ),
    (
        '90fe3b5a-7553-43ea-aff4-97ba5fbe521d',
        'Vend.eur.se',
        '10823666-4ae8-40a4-a692-b1bd4991bb05'
    ),
    (
        'f7682d92-1461-4221-97ca-98b4d96f14b2',
        'Négociant.e',
        '10823666-4ae8-40a4-a692-b1bd4991bb05'
    ),
    -- SPA, Esthétique, Coiffure (Catégorie 'e8c82731-2d12-4838-b605-1c626a3115aa') :
    (
        '9139437f-99e3-4896-bec3-82c8852d1955',
        'SPA manager',
        'e8c82731-2d12-4838-b605-1c626a3115aa'
    ),
    (
        'a24b41e9-de8c-4cf7-b3d0-b1c118fcfea6',
        'Praticien.ne SPA',
        'e8c82731-2d12-4838-b605-1c626a3115aa'
    ),
    (
        'a0f158b6-126a-4e67-a34d-64d942c8fd5c',
        'Hôte.sse d''accueil',
        'e8c82731-2d12-4838-b605-1c626a3115aa'
    ),
    (
        '6903831f-15a4-4a05-8120-a8d5fdd095fc',
        'Esthéticien.ne',
        'e8c82731-2d12-4838-b605-1c626a3115aa'
    ),
    (
        'e72142b7-e361-47d0-a85c-d4a8e04ff5d8',
        'Maquilleu.r.se',
        'e8c82731-2d12-4838-b605-1c626a3115aa'
    ),
    (
        'c67911f1-b48e-43ab-84c5-c501f4ed9a3a',
        'Métiers de l''onglerie',
        'e8c82731-2d12-4838-b605-1c626a3115aa'
    ),
    (
        'c3d51734-d31a-4539-b5ea-22f8a1c72ece',
        'Masseu.r.se',
        'e8c82731-2d12-4838-b605-1c626a3115aa'
    ),
    (
        '81655348-1c72-4e38-a751-87b05b612c26',
        'Coiffeu.r.se',
        'e8c82731-2d12-4838-b605-1c626a3115aa'
    ),
    -- Autres (Catégorie 14) :
    (
        '6d9f5614-7022-49bf-82c2-9f3a2ff61c6e',
        'Autres métiers',
        '8f3432e0-39b7-44ec-877e-4ad56400d7cc'
    );