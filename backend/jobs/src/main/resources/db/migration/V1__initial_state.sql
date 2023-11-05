CREATE TABLE JobCategory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title varchar(100) NOT NULL,
    UNIQUE(title)
);
CREATE TABLE Company (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     name varchar(100) NOT NULL,
     geographicArea varchar(255),
     UNIQUE(name, geographicArea)
);

CREATE TABLE Job (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title varchar(100) NOT NULL,
    category UUID,
    FOREIGN KEY (category) REFERENCES JobCategory(id),
    UNIQUE(title,category)
);

CREATE TABLE JobOffer (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job UUID,
    title varchar(100),
    description varchar(1000),
    start_date DATE,
    end_date DATE,
    company UUID,
    salary INT,
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
    Job(title, category)
values
    (
        'Ouvrier.e agricole',
        '504fe0a7-a862-4f1a-8ff5-67e925c73f35'
    ),
    (
        'Chef.fe ouvrier.e agricole',
        '504fe0a7-a862-4f1a-8ff5-67e925c73f35'
    ),
    (
        'Conduct.eur.rice d''engin agric
ole',
        '504fe0a7-a862-4f1a-8ff5-67e925c73f35'
    ),
    (
        'Ouvrier.e horticole',
        '504fe0a7-a862-4f1a-8ff5-67e925c73f35'
    ),
    (
        'Paysagiste',
        '504fe0a7-a862-4f1a-8ff5-67e925c73f35'
    ),
    (
        'Maraîcher.e',
        '504fe0a7-a862-4f1a-8ff5-67e925c73f35'
    ),
    (
        'Mécanicien.ne en matériel agricole',
        '504fe0a7-a862-4f1a-8ff5-67e925c73f35'
    ),
    ('Ouvrier.e forestier.e', '504fe0a7-a862-4f1a-8ff5-67e925c73f35'),
    (
        'Vétérinaire',
        '504fe0a7-a862-4f1a-8ff5-67e925c73f35'
    ),
    (
        'Marin-Pêcheur',
        '504fe0a7-a862-4f1a-8ff5-67e925c73f35'
    ),

-- Hôtellerie de plein air, Club vacances, Camping, Animation (Catégorie 2) :
    (
        'Animat.eur.rice petite enfance',
        'ae0a2695-088b-4aec-9751-d29204f277fd'
    ),
    (
        'Animat.eur.rice enfants',
        'ae0a2695-088b-4aec-9751-d29204f277fd'
    ),
    (
        'Responsable animation
enfants',
        'ae0a2695-088b-4aec-9751-d29204f277fd'
    ),
    (
        'Animat.eur.rice polyvalent',
        'ae0a2695-088b-4aec-9751-d29204f277fd'
    ),
    (
        'Responsable animation',
        'ae0a2695-088b-4aec-9751-d29204f277fd'
    ),
    (
        'Animat.eur.rice sportif',
        'ae0a2695-088b-4aec-9751-d29204f277fd'
    ),
    (
        'Animat.eur.rice professionnel',
        'ae0a2695-088b-4aec-9751-d29204f277fd'
    ),
    (
        'Guide-accompagnateur',
        'ae0a2695-088b-4aec-9751-d29204f277fd'
    ),
    (
        'Directeur d''exploitation',
        'ae0a2695-088b-4aec-9751-d29204f277fd'
    ),
    (
        'Employé.e de parc de loisirs',
        'ae0a2695-088b-4aec-9751-d29204f277fd'
    ),
    (
        'Chorégraphe',
        'ae0a2695-088b-4aec-9751-d29204f277fd'
    ),
    (
        'Décorat.eur.rice',
        'ae0a2695-088b-4aec-9751-d29204f277fd'
    ),
    (
        'Tech
nicien.ne son et lumière',
        'ae0a2695-088b-4aec-9751-d29204f277fd'
    ),
    ('DJ', 'ae0a2695-088b-4aec-9751-d29204f277fd'),

-- Hôtels, cafés, bars, restaurants (Catégorie 3) :
    (
        'Direct.eur.rice d''hôtel',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Assistant.e de direction',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Responsable d''hébergement',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Chef.fe réception',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Réceptionniste',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Night Auditor',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Chef.fe concierge',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Concierge',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Portier.e',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Chasseur',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Voiturier.e',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Bagagiste',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Guest relation',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Majordome',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Responsable blanchisserie/lingerie',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Employé.e de blanchisserie/lingerie',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Employé.e d''étages',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Assistant.e gouvernant.e',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Gouvernant.e',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Gouvernant.e général.e',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Employé.e polyvalent',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Equipi
er.e',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
(
        'Responsable de maintenance',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Agent de maintenance',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'House keeping',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Jardinier.e paysagiste',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Manager F&B',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Direct.eur.rice de restauration',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Maitre.sse d''hôtel',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Assistant.e Maitre.sse d''hô
tel',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
(
        'Chef.fe de rang',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Commis/Runner',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Chef.fe sommelier',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Sommelier',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Limonadier',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Chef.fe bar.wo.man',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Bar.wo.man',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Commis de Bar',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Responsable Room Service',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Room Service',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Responsa
ble petit déjeuner',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Hôte.sse d''accueil',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Chef.fe de cuisine',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Second de cuisine',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Chef.fe de partie',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Demi chef.fe de partie',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Commis de cuisine plongeur',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Boulanger.e',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Chef.fe pâtissier.e',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Second d
e pâtissier.e',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Pâtissier.e',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Chef.fe chocolatier',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Chocolatier',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Pizzaiolo',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    (
        'Crêpier.e',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),
    ('Glacier', '58f2960e-8536-4454-a713-dbd78670670e'),
    (
        'Plagiste',
        '58f2960e-8536-4454-a713-dbd78670670e'
    ),

-- Evénementiel (Catégorie 4) :
    (
        'Direct.eur.rice de foire, salon, congrès, exposition',
        '480e8413-1913-4547-b9b8-ed0ecc5d9d2c'
    ),
    (
        'Direct.eur.rice de cirque',
        '480e8413-1913-4547-b9b8-ed0ecc5d9d2c'
    ),
    (
        'Direct.eur.rice d''agence évènementielle',
        '480e8413-1913-4547-b9b8-ed0ecc5d9d2c'
    ),
    (
        'Chef.fe de projet événementiel',
        '480e8413-1913-4547-b9b8-ed0ecc5d9d2c'
    ),
    (
        'Chargé.e de communication événementielle',
        '480e8413-1913-4547-b9b8-ed0ecc5d9d2c'
    ),
    (
        'Organis
at.eur.rice de spectacles',
        '480e8413-1913-4547-b9b8-ed0ecc5d9d2c'
    ),
    (
        'Commissaire de salon/d''exposition',
        '480e8413-1913-4547-b9b8-ed0ecc5d9d2c'
    ),
    (
        'Organisat.eur.rice de business event',
        '480e8413-1913-4547-b9b8-ed0ecc5d9d2c'
    ),
    (
        'Organisat.eur.rice d''évé
nements',
        '480e8413-1913-4547-b9b8-ed0ecc5d9d2c'
    ),
    (
        'Chef.fe de projet artistique et culturel',
        '480e8413-1913-4547-b9b8-ed0ecc5d9d2c'
    ),
    (
        'Organisat.eur.rice d''événements culturels et artistiques',
        '480e8413-1913-4547-b9b8-ed0ecc5d9d2c'
    ),
    (
        'Organisat.eur.ric
e d''événements sportifs',
        '480e8413-1913-4547-b9b8-ed0ecc5d9d2c'
    ),
    (
        'Direct.eur.rice de production événementielle',
        '480e8413-1913-4547-b9b8-ed0ecc5d9d2c'
    ),
    (
        'Médiat.eur.rice culturel',
        '480e8413-1913-4547-b9b8-ed0ecc5d9d2c'
    ),
    (
        'Direct.eur.rice de festival',
        '480e8413-1913-4547-b9b8-ed0ecc5d9d2c'
    ),
    (
        'Photographe',
        '480e8413-1913-4547-b9b8-ed0ecc5d9d2c'
    ),
    (
        'Modèle Mannequinat',
        '480e8413-1913-4547-b9b8-ed0ecc5d9d2c'
    ),
    (
        'Hôte.sse',
        '480e8413-1913-4547-b9b8-ed0ecc5d9d2c'
    ),

-- Casinos, Parcs d'attraction (Catégorie '487e9884-e490-425c-b3e0-b5d2b0029683') :
    (
        'Direct.eur.rice de parc zoologique',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'Vétérinaire',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'Chef.fe animalier',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'Soigna
nt.e animalier',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'Auxiliaire spécialisé vétérinaire',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'Jardinier',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'Eleveur animalier',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'Fauconnier',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
(
        'Direct.eur.rice de parc
 d''attraction',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'Responsable d''un secteur d''attraction',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'Pilote d''attractions',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'Hôte.sse de salle de jeux électroniques',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        '
Conduct.eur.rice de manège',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'Responsable des attractions',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'Opérat.eur.rice d''attraction',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'Hôte.sse de patinoire',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'Hôte.sse d
e manège',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'Employé.e de parc de loisirs',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'Ouvreu.r.se de salle de spectacles',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'Pilote de manège',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'Opérat.eur.rice de manège',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'Ouvreu.r.se placeu.r.se de salle de spectacles',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'Employé.e de manège forain',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'Agent.e d''exploitation des attractions',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'Agen
t.e de contrôle de salle de spectacles',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'Assistant.e de zone d''attraction',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'Conduct.eur.rice d''attraction',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'Hôte.sse d''attracti
ons',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'Employé.e de loisirs ou d''attractions',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'Animat.eur.rice de parc de loisirs',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'Animat.eur.rice de personnage de parc de loisi
rs',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'Animat.eur.rice d''attractions',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'Opérat.eur.rice de parcours acrobatique dans les arbres',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'Hôte.sse de golf/mini-golf',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        '
Billettiste',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'Direct.eur.rice de casino',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'Chef.fe croupier.re',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'Croupier.re',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'Responsable clientèle',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'Agent de sécurité
',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'Opérat.eur.rice de vidéosurveillance',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'Banquier',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'Gestionnaire de fond',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'Technicien machine à sous',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),
    (
        'Contrôleur audit
eur de machines à sous',
        '487e9884-e490-425c-b3e0-b5d2b0029683'
    ),

-- Administration, Espaces culturels, Office du Tourisme (Catégorie 'f6602954-76ff-4f1a-99fe-59e2fb5bd32f') :
    (
        'Direct.eur.rice d''office de tourisme',
        'f6602954-76ff-4f1a-99fe-59e2fb5bd32f'
    ),
    (
        'Direct.eur.rice de site culturel',
        'f6602954-76ff-4f1a-99fe-59e2fb5bd32f'
    ),
    (
        'Respon
sable de réservation',
        'f6602954-76ff-4f1a-99fe-59e2fb5bd32f'
    ),
    (
        'Agent d''accueil',
        'f6602954-76ff-4f1a-99fe-59e2fb5bd32f'
    ),
    (
        'Agent polyvalent',
        'f6602954-76ff-4f1a-99fe-59e2fb5bd32f'
    ),
    (
        'Guide accompagnateur',
        'f6602954-76ff-4f1a-99fe-59e2fb5bd32f'
    ),

-- Montagne, Ski (Catégorie '3ca13093-7e71-40ba-992e-dbefa380f506') :
    (
        'Chef.fe d''exploitation de remontée mécanique',
        '3ca13093-7e71-40ba-992e-dbefa380f506'
    ),
    (
        'Electromécanicien.ne en remontée mécan
ique',
        '3ca13093-7e71-40ba-992e-dbefa380f506'
    ),
    (
        'Installateur en remontée mécanique',
        '3ca13093-7e71-40ba-992e-dbefa380f506'
    ),
    (
        'Conducteu.r.se de remontée mécanique',
        '3ca13093-7e71-40ba-992e-dbefa380f506'
    ),
    (
        'Caissier.e en remontée mécanique',
        '3ca13093-7e71-40ba-992e-dbefa380f506'
    ),
    (
        'Agent d
''accueil',
        '3ca13093-7e71-40ba-992e-dbefa380f506'
    ),
    (
        'Employé.e d''équipement de sports et de loisirs',
        '3ca13093-7e71-40ba-992e-dbefa380f506'
    ),
    (
        'Accompagnat.eur.rice en montagne',
        '3ca13093-7e71-40ba-992e-dbefa380f506'
    ),
    (
        'Moniteur.e de ski',
        '3ca13093-7e71-40ba-992e-dbefa380f506'
    ),
    (
        'Moniteur
.e de randonnée',
        '3ca13093-7e71-40ba-992e-dbefa380f506'
    ),
    (
        'Moniteur.e d''escalade',
        '3ca13093-7e71-40ba-992e-dbefa380f506'
    ),
    (
        'Moniteur.e de moto neige',
        '3ca13093-7e71-40ba-992e-dbefa380f506'
    ),
    (
        'Ski.wo.man',
        '3ca13093-7e71-40ba-992e-dbefa380f506'
    ),
    (
        'Conducteur d''engins de Damage',
        '3ca13093-7e71-40ba-992e-dbefa380f506'
    ),
    (
        'Perc
histe',
        '3ca13093-7e71-40ba-992e-dbefa380f506'
    ),
    (
        'Pisteu.r.se secouriste',
        '3ca13093-7e71-40ba-992e-dbefa380f506'
    ),
    (
        'Nivocult.eur.rice',
        '3ca13093-7e71-40ba-992e-dbefa380f506'
    ),
    (
        'Artificier.e',
        '3ca13093-7e71-40ba-992e-dbefa380f506'
    ),
    (
        'Maitre.sse chien d''avalanche',
        '3ca13093-7e71-40ba-992e-dbefa380f506'
    ),

-- Mer, Plongée, Sports/Loisirs Nautiques (Catégorie 'ce9d817d-9e40-4fef-8a6a-ae58c9948009') :
    (
        'Plagiste',
        'ce9d817d-9e40-4fef-8a6a-ae58c9948009'
    ),
    (
        'Vendeu.r.se ambulant.e de glace ou de beignets',
        'ce9d817d-9e40-4fef-8a6a-ae58c9948009'
    ),
    (
        'Animat.eur.rice de clu
b de plage',
        'ce9d817d-9e40-4fef-8a6a-ae58c9948009'
    ),
    (
        'Nageu.r.se sauveteur',
        'ce9d817d-9e40-4fef-8a6a-ae58c9948009'
    ),
    (
        'Monit.eur.rice d''activités nautiques',
        'ce9d817d-9e40-4fef-8a6a-ae58c9948009'
    ),
    (
        'Surveillant.e de baignade',
        'ce9d817d-9e40-4fef-8a6a-ae58c9948009'
    ),
    (
        'Monit.eur.rice de plo
ngée',
        'ce9d817d-9e40-4fef-8a6a-ae58c9948009'
    ),
    (
        'Employé.e de Capitainerie',
        'ce9d817d-9e40-4fef-8a6a-ae58c9948009'
    ),
    (
        'Mécanicien.ne de bateaux',
        'ce9d817d-9e40-4fef-8a6a-ae58c9948009'
    ),
    (
        'Equipage de bateaux',
        'ce9d817d-9e40-4fef-8a6a-ae58c9948009'
    ),

-- Sécurité, Gardiennage (Catégorie '778af999-18a8-4343-81f1-410448118469'):
    (
        'Garde rapprochée',
        '778af999-18a8-4343-81f1-410448118469'
    ),
    (
        'Agent de sécurité',
        '778af999-18a8-4343-81f1-410448118469'
    ),
    (
        'Opérat.eur.rice de vidéosurveillance',
        '778af999-18a8-4343-81f1-410448118469'
    ),
    (
        'Maitre.sse de chien',
        '778af999-18a8-4343-81f1-410448118469'
    ),
    ('ASVP', '778af999-18a8-4343-81f1-410448118469'),
    (
        'Gardien.ne',
        '778af999-18a8-4343-81f1-410448118469'
    ),

-- Logistique, Transport (Catégorie '30972914-91da-4dca-8a98-73a2942b0eaf') :
    (
        'Magasinier.e',
        '30972914-91da-4dca-8a98-73a2942b0eaf'
    ),
    (
        'Chef magasinier',
        '30972914-91da-4dca-8a98-73a2942b0eaf'
    ),
    (
        'Préparat.eur.rice de commande',
        '30972914-91da-4dca-8a98-73a2942b0eaf'
    ),
    (
        'Cariste',
        '30972914-91da-4dca-8a98-73a2942b0eaf'
    ),
    (
        'Manutentionnaire',
        '30972914-91da-4dca-8a98-73a2942b0eaf'
    ),
    (
        'Opérat.eur.rice',
        '30972914-91da-4dca-8a98-73a2942b0eaf'
    ),
    (
        'Chauffeur livreur',
        '30972914-91da-4dca-8a98-73a2942b0eaf'
    ),
    (
        'Chauffeur routier',
        '30972914-91da-4dca-8a98-73a2942b0eaf'
    ),

-- Babysitting, Services à la personne (Catégorie '45a251b0-f53c-4c0a-acfb-6c1c8f88c477') :
    (
        'Garde d''enfants',
        '45a251b0-f53c-4c0a-acfb-6c1c8f88c477'
    ),
    (
        'Garde périscolaire',
        '45a251b0-f53c-4c0a-acfb-6c1c8f88c477'
    ),
    (
        'Aide aux devoirs',
        '45a251b0-f53c-4c0a-acfb-6c1c8f88c477'
    ),
    (
        'Animat.eur.rice
 d''anniversaire',
        '45a251b0-f53c-4c0a-acfb-6c1c8f88c477'
    ),
    (
        'Accompagnat.eur.rice de vacances',
        '45a251b0-f53c-4c0a-acfb-6c1c8f88c477'
    ),
    (
        'Aide à la personne',
        '45a251b0-f53c-4c0a-acfb-6c1c8f88c477'
    ),
    (
        'Livreur à domicile',
        '45a251b0-f53c-4c0a-acfb-6c1c8f88c477'
    ),
    (
        'Chauffeur VTC',
        '45a251b0-f53c-4c0a-acfb-6c1c8f88c477'
    ),
    (
        'Aid
e au ménage',
        '45a251b0-f53c-4c0a-acfb-6c1c8f88c477'
    ),
    (
        'Paysagiste jardinier arboriste',
        '45a251b0-f53c-4c0a-acfb-6c1c8f88c477'
    ),

-- Commerce, Achats, Vente (Catégorie 1'ae0a2695-088b-4aec-9751-d29204f277fd') :
    (
        'Billettiste',
        '10823666-4ae8-40a4-a692-b1bd4991bb05'
    ),
    (
        'Responsable de réservation',
        '10823666-4ae8-40a4-a692-b1bd4991bb05'
    ),
    (
        'Responsable de vente',
        '10823666-4ae8-40a4-a692-b1bd4991bb05'
    ),
    (
        'Respo
nsable de magasin',
        '10823666-4ae8-40a4-a692-b1bd4991bb05'
    ),
    (
        'Assistant.e responsable magasin',
        '10823666-4ae8-40a4-a692-b1bd4991bb05'
    ),
    (
        'Vend.eur.se',
        '10823666-4ae8-40a4-a692-b1bd4991bb05'
    ),
    (
        'Négociant.e',
        '10823666-4ae8-40a4-a692-b1bd4991bb05'
    ),

-- SPA, Esthétique, Coiffure (Catégorie 'e8c82731-2d12-4838-b605-1c626a3115aa') :
    (
        'SPA manager',
        'e8c82731-2d12-4838-b605-1c626a3115aa'
    ),
    (
        'Praticien.ne SPA',
        'e8c82731-2d12-4838-b605-1c626a3115aa'
    ),
    (
        'Hôte.sse d''accueil',
        'e8c82731-2d12-4838-b605-1c626a3115aa'
    ),
    (
        'Esthéticien.ne',
        'e8c82731-2d12-4838-b605-1c626a3115aa'
    ),
    (
        'Maquilleu.r.se',
        'e8c82731-2d12-4838-b605-1c626a3115aa'
    ),
    (
        'Métiers de l''onglerie',
        'e8c82731-2d12-4838-b605-1c626a3115aa'
    ),
    (
        'Masseu.r.se',
        'e8c82731-2d12-4838-b605-1c626a3115aa'
    ),
    (
        'Coiffeu.r.se',
        'e8c82731-2d12-4838-b605-1c626a3115aa'
    ),

-- Autres (Catégorie 14) :
    (
        'Autres métiers',
        '8f3432e0-39b7-44ec-877e-4ad56400d7cc'
    );