//
MERGE (category1:JobCategory {id: '504fe0a7-a862-4f1a-8ff5-67e925c73f35'})
SET category1.title = 'Agriculture, Viticulture, Pêche'

// category
WITH category1

MERGE (job1:Job {id: '909b8e21-359c-42a1-a983-d31fb078a847', title: 'Ouvrier.e agricole'})
MERGE (job1)-[:BELONGS_TO]->(category1)

MERGE (job2:Job {id: '50fac92d-880f-4703-9158-af8cbc3fcb29', title: 'Chef.fe ouvrier.e agricole'})
MERGE (job2)-[:BELONGS_TO]->(category1)

MERGE (job3:Job {id: '9b0c67b9-bef3-4f24-90eb-9c63f184e3e3', title: 'Conduct.eur.rice d\'engin agricole'})
MERGE (job3)-[:BELONGS_TO]->(category1)

MERGE (job4:Job {id: '559db60a-9f8d-4c05-a770-e4b19e1f1fce', title: 'Ouvrier.e horticole'})
MERGE (job4)-[:BELONGS_TO]->(category1)

MERGE (job5:Job {id: 'b022acef-c45d-47bd-b4e9-8ce9ad417c73', title: 'Paysagiste'})
MERGE (job5)-[:BELONGS_TO]->(category1)

MERGE (job6:Job {id: 'e0a1c557-0df2-4850-90d2-f4b25ba0f766', title: 'Maraîcher.e'})
MERGE (job6)-[:BELONGS_TO]->(category1)

MERGE (job7:Job {id: '50882e8a-14a5-42fa-a717-da0c5a685783', title: 'Mécanicien.ne en matériel agricole'})
MERGE (job7)-[:BELONGS_TO]->(category1)

MERGE (job8:Job {id: '69f41bee-14b3-43ce-aa8b-043fcb2e845f', title: 'Ouvrier.e forestier.e'})
MERGE (job8)-[:BELONGS_TO]->(category1)

MERGE (job9:Job {id: '1e9a49c1-2b72-4baf-b6f0-540d5bada5d5', title: 'Vétérinaire'})
MERGE (job9)-[:BELONGS_TO]->(category1)

MERGE (job10:Job {id: 'b57e484b-d1de-499e-ac3c-ebba44609364', title: 'Marin-Pêcheur'})
MERGE (job10)-[:BELONGS_TO]->(category1)


//
MERGE (category2:JobCategory {id: 'ae0a2695-088b-4aec-9751-d29204f277fd'})
SET category2.title = 'Hôtellerie de plein air, Club vacances, Camping, Animation'

// category
WITH category2

MERGE (job11:Job {id: '5a83d3d8-b2b7-4bc5-827f-01c82a552b0b', title: 'Animat.eur.rice petite enfance'})
MERGE (job11)-[:BELONGS_TO]->(category2)

MERGE (job12:Job {id: '67e0fc4b-2d55-4804-bd7f-ad5de48e817f', title: 'Animat.eur.rice enfants'})
MERGE (job12)-[:BELONGS_TO]->(category2)

MERGE (job13:Job {id: '546207da-11b8-443e-94f4-46e6b8f29d5b', title: 'Responsable animation enfants'})
MERGE (job13)-[:BELONGS_TO]->(category2)

MERGE (job14:Job {id: 'abc77f5d-1f05-4260-b343-4a1dd91126f3', title: 'Animat.eur.rice polyvalent'})
MERGE (job14)-[:BELONGS_TO]->(category2)

MERGE (job15:Job {id: '81c14e94-3155-4d79-8fbe-bfde0f1dc8cb', title: 'Responsable animation'})
MERGE (job15)-[:BELONGS_TO]->(category2)

MERGE (job16:Job {id: '70d50689-0201-4a50-9cb1-64d288fd532e', title: 'Animat.eur.rice sportif'})
MERGE (job16)-[:BELONGS_TO]->(category2)

MERGE (job17:Job {id: '96ba3e09-a792-44c3-bf10-29865657526d', title: 'Animat.eur.rice professionnel'})
MERGE (job17)-[:BELONGS_TO]->(category2)

MERGE (job18:Job {id: 'e0f9c1e6-1009-4073-ba95-babefa46d7f2', title: 'Guide-accompagnateur'})
MERGE (job18)-[:BELONGS_TO]->(category2)

MERGE (job19:Job {id: 'e441c8f8-316e-4a84-82ad-22e3e02034c7', title: 'Directeur d\'exploitation'})
MERGE (job19)-[:BELONGS_TO]->(category2)

MERGE (job20:Job {id: '47afe4c4-eceb-4a8a-9877-a6ed552ed676', title: 'Employé.e de parc de loisirs'})
MERGE (job20)-[:BELONGS_TO]->(category2)

MERGE (job21:Job {id: '690c2859-eddb-44c3-b2c7-2bb063154ab3', title: 'Chorégraphe'})
MERGE (job21)-[:BELONGS_TO]->(category2)

MERGE (job22:Job {id: 'b8b262c8-018d-42df-b762-e5eff5977f25', title: 'Décorat.eur.rice'})
MERGE (job22)-[:BELONGS_TO]->(category2)

MERGE (job23:Job {id: '82510d32-c778-43e8-95c4-9684a7d32704', title: 'Technicien.ne son et lumière'})
MERGE (job23)-[:BELONGS_TO]->(category2)

MERGE (job24:Job {id: '42510d32-a778-43e8-95c4-9684a7d32704', title: 'DJ'})
MERGE (job24)-[:BELONGS_TO]->(category2)


//
MERGE (category3:JobCategory {id: '58f2960e-8536-4454-a713-dbd78670670e'})
SET category3.title = 'Hôtels, cafés, bars, restaurants'

// category
WITH category3

MERGE (job25:Job {id: 'b8f698dc-3b4a-4dc4-b885-890c1b366e29', title: 'Direct.eur.rice d\'hôtel'})
MERGE (job25)-[:BELONGS_TO]->(category3)

MERGE (job26:Job {id: '0264b13f-3795-447e-8b04-b8401a65e7e1', title: 'Assistant.e de direction'})
MERGE (job26)-[:BELONGS_TO]->(category3)

MERGE (job27:Job {id: '594424be-df5a-4d3d-9274-99113bf7e90f', title: 'Responsable d\'hébergement'})
MERGE (job27)-[:BELONGS_TO]->(category3)

MERGE (job28:Job {id: '343cb67a-227b-4de7-87a2-b0d44282fcf5', title: 'Chef.fe réception'})
MERGE (job28)-[:BELONGS_TO]->(category3)

MERGE (job29:Job {id: '5d90aefc-2acb-4415-b141-8baea8689b3c', title: 'Réceptionniste'})
MERGE (job29)-[:BELONGS_TO]->(category3)

MERGE (job30:Job {id: 'a03f8b85-2bd4-4765-84d7-22de857f5186', title: 'Night Auditor'})
MERGE (job30)-[:BELONGS_TO]->(category3)

MERGE (job31:Job {id: 'ea4aff1e-e317-4be8-8ab3-f7eba8238d81', title: 'Chef.fe concierge'})
MERGE (job31)-[:BELONGS_TO]->(category3)

MERGE (job32:Job {id: 'dc20a544-22a9-4a19-a8cc-f15d490d4a48', title: 'Concierge'})
MERGE (job32)-[:BELONGS_TO]->(category3)

MERGE (job33:Job {id: '47650051-3086-46e3-b9b3-bd0214a4c549', title: 'Portier.e'})
MERGE (job33)-[:BELONGS_TO]->(category3)

MERGE (job34:Job {id: '38cfe907-ae7e-41f4-907f-654c0f43118d', title: 'Chasseur'})
MERGE (job34)-[:BELONGS_TO]->(category3)

MERGE (job35:Job {id: '6980117e-4fee-4365-835b-b19ffbcafca2', title: 'Voiturier.e'})
MERGE (job35)-[:BELONGS_TO]->(category3)

MERGE (job36:Job {id: '41bf9e8e-5616-448a-9cec-390ae6e13148', title: 'Bagagiste'})
MERGE (job36)-[:BELONGS_TO]->(category3)

MERGE (job37:Job {id: 'fcc91a31-c23f-4028-8085-b5caba549e02', title: 'Guest relation'})
MERGE (job37)-[:BELONGS_TO]->(category3)

MERGE (job38:Job {id: 'a898bcf9-a2be-445b-aef5-e2d42bca8c0d', title: 'Majordome'})
MERGE (job38)-[:BELONGS_TO]->(category3)

MERGE (job39:Job {id: '551b7e24-2325-4fed-a8ea-67ef10d8ac06', title: 'Responsable blanchisserie/lingerie'})
MERGE (job39)-[:BELONGS_TO]->(category3)

MERGE (job40:Job {id: 'f2dbf89a-488d-448c-af53-70f65088a463', title: 'Employé.e de blanchisserie/lingerie'})
MERGE (job40)-[:BELONGS_TO]->(category3)

MERGE (job41:Job {id: '6b533470-ec83-4b41-bbc2-e8ef8ba477af', title: 'Employé.e d\'étages'})
MERGE (job41)-[:BELONGS_TO]->(category3)

MERGE (job42:Job {id: '8daa0d27-e0ea-4f10-9f93-892dcc043ba3', title: 'Assistant.e gouvernant.e'})
MERGE (job42)-[:BELONGS_TO]->(category3)

MERGE (job43:Job {id: 'b86de3a4-4b72-4ec7-9739-ab2b695440c4', title: 'Gouvernant.e'})
MERGE (job43)-[:BELONGS_TO]->(category3)

MERGE (job44:Job {id: '89da70fb-194b-4d4d-b90d-5dcc779f51be', title: 'Gouvernant.e général.e'})
MERGE (job44)-[:BELONGS_TO]->(category3)

MERGE (job45:Job {id: 'ff6d2b39-8559-42a6-8b05-712345f68dcf', title: 'Employé.e polyvalent'})
MERGE (job45)-[:BELONGS_TO]->(category3)

MERGE (job46:Job {id: '3c4aba81-5756-4827-b4ab-4861e51cdff1', title: 'Equipier.e'})
MERGE (job46)-[:BELONGS_TO]->(category3)

MERGE (job47:Job {id: '563d37bd-8644-424c-9b8f-dae43aa48261', title: 'Responsable de maintenance'})
MERGE (job47)-[:BELONGS_TO]->(category3)

MERGE (job48:Job {id: '603f1712-92c8-454e-a924-0316afc180bc', title: 'Agent de maintenance'})
MERGE (job48)-[:BELONGS_TO]->(category3)

MERGE (job49:Job {id: '2769e5c0-22b6-47c1-bc4d-53014b7f0786', title: 'House keeping'})
MERGE (job49)-[:BELONGS_TO]->(category3)

MERGE (job50:Job {id: 'd85dabcc-ca99-4ef4-8e14-10676fb3088c', title: 'Jardinier.e paysagiste'})
MERGE (job50)-[:BELONGS_TO]->(category3)

MERGE (job51:Job {id: '32788e69-9f5a-4263-8991-25cb08c43c4e', title: 'Manager F&B'})
MERGE (job51)-[:BELONGS_TO]->(category3)

MERGE (job52:Job {id: '3d7c081e-31f1-48f1-bab7-54de3873a5e1', title: 'Direct.eur.rice de restauration'})
MERGE (job52)-[:BELONGS_TO]->(category3)

MERGE (job53:Job {id: 'bc67c2c3-7a66-4857-9f94-ac4b2372900e', title: 'Maitre.sse d\'hôtel'})
MERGE (job53)-[:BELONGS_TO]->(category3)

MERGE (job54:Job {id: 'eef8330b-a03b-49b9-8867-e9f17b78d5c5', title: 'Assistant.e Maitre.sse d\'hôtel'})
MERGE (job54)-[:BELONGS_TO]->(category3)

MERGE (job55:Job {id: '89cfc022-3f53-4f7d-95fe-5930adf803e6', title: 'Chef.fe de rang'})
MERGE (job55)-[:BELONGS_TO]->(category3)

MERGE (job56:Job {id: '2b9597a8-13bc-4a76-a5d3-04ff850c798f', title: 'Commis/Runner'})
MERGE (job56)-[:BELONGS_TO]->(category3)

MERGE (job57:Job {id: 'af907197-2486-4908-9ecc-dffecb9ad675', title: 'Chef.fe sommelier'})
MERGE (job57)-[:BELONGS_TO]->(category3)

MERGE (job58:Job {id: 'ed9c2f8a-0cc9-42a1-a2a2-eefd2f8b58cd', title: 'Sommelier'})
MERGE (job58)-[:BELONGS_TO]->(category3)

MERGE (job59:Job {id: '0d192ff2-31a0-4f8a-9f61-259f16f0077c', title: 'Limonadier'})
MERGE (job59)-[:BELONGS_TO]->(category3)

MERGE (job60:Job {id: '565cb4eb-94e8-4a49-bc99-7023cd1192c4', title: 'Chef.fe bar.wo.man'})
MERGE (job60)-[:BELONGS_TO]->(category3)

MERGE (job61:Job {id: 'd3fd6af1-a227-4dcc-9178-0259b51670d9', title: 'Bar.wo.man'})
MERGE (job61)-[:BELONGS_TO]->(category3)

MERGE (job62:Job {id: '1b23c925-c0f2-480f-b3f3-c8da949d4bd3', title: 'Commis de Bar'})
MERGE (job62)-[:BELONGS_TO]->(category3)

MERGE (job63:Job {id: '1b49db23-c9ac-492e-9fb4-4c9b5c7e753d', title: 'Responsable Room Service'})
MERGE (job63)-[:BELONGS_TO]->(category3)

MERGE (job64:Job {id: '798f5b5e-7b31-4bdf-bad9-12986087adec', title: 'Room Service'})
MERGE (job64)-[:BELONGS_TO]->(category3)

MERGE (job65:Job {id: 'a2a8b7ad-d283-44ec-ab7b-a78f14c11a84', title: 'Responsable petit déjeuner'})
MERGE (job65)-[:BELONGS_TO]->(category3)

MERGE (job66:Job {id: 'a5eda6ac-4762-4480-b658-632884deb7b4', title: 'Hôte.sse d\'accueil'})
MERGE (job66)-[:BELONGS_TO]->(category3)

MERGE (job67:Job {id: 'f5604028-9902-4216-a0c9-7d427148c6a4', title: 'Chef.fe de cuisine'})
MERGE (job67)-[:BELONGS_TO]->(category3)

MERGE (job68:Job {id: 'a2bb0795-b31f-41f5-b118-4113e2a22639', title: 'Second de cuisine'})
MERGE (job68)-[:BELONGS_TO]->(category3)

MERGE (job69:Job {id: '54c69344-ec6f-4431-8871-09aab02d7c1d', title: 'Chef.fe de partie'})
MERGE (job69)-[:BELONGS_TO]->(category3)

MERGE (job70:Job {id: '47d63372-cad1-4f23-a87a-ab58a94f8992', title: 'Demi chef.fe de partie'})
MERGE (job70)-[:BELONGS_TO]->(category3)

MERGE (job71:Job {id: '91117f19-3413-4b18-857a-372abcf2aedf', title: 'Commis de cuisine plongeur'})
MERGE (job71)-[:BELONGS_TO]->(category3)

MERGE (job72:Job {id: 'c8fc65f3-7c4e-4f11-9fca-9e314ece7a2f', title: 'Boulanger.e'})
MERGE (job72)-[:BELONGS_TO]->(category3)

MERGE (job73:Job {id: '2f86025a-3a0e-4cf0-8e4c-7eb5ec019dcd', title: 'Chef.fe pâtissier.e'})
MERGE (job73)-[:BELONGS_TO]->(category3)

MERGE (job74:Job {id: 'b47a0521-f87f-4032-92ed-db6bfe31a7d7', title: 'Second de pâtissier.e'})
MERGE (job74)-[:BELONGS_TO]->(category3)

MERGE (job75:Job {id: '6fd94b9c-7e79-45ab-9370-f422fefb5386', title: 'Pâtissier.e'})
MERGE (job75)-[:BELONGS_TO]->(category3)

MERGE (job76:Job {id: 'fd4dab09-0c5d-4682-b200-6b95330bcbbc', title: 'Chef.fe chocolatier'})
MERGE (job76)-[:BELONGS_TO]->(category3)

MERGE (job77:Job {id: '626a7185-b74d-4401-a166-036c10ae87bd', title: 'Chocolatier'})
MERGE (job77)-[:BELONGS_TO]->(category3)

MERGE (job78:Job {id: '35aaa7a6-fb6a-4b8d-99e9-946b7c0b28ee', title: 'Pizzaiolo'})
MERGE (job78)-[:BELONGS_TO]->(category3)

MERGE (job79:Job {id: 'a002fbfb-a062-4f16-90b3-be21498719bb', title: 'Crêpier.e'})
MERGE (job79)-[:BELONGS_TO]->(category3)

MERGE (job80:Job {id: 'd582c19b-b581-45dd-8390-33832b325d2a', title: 'Glacier'})
MERGE (job80)-[:BELONGS_TO]->(category3)

MERGE (job81:Job {id: '3118e2cf-8301-405e-861b-ce57bd345b3e', title: 'Plagiste'})
MERGE (job81)-[:BELONGS_TO]->(category3)

//
MERGE (category4:JobCategory {id: '480e8413-1913-4547-b9b8-ed0ecc5d9d2c'})
SET category4.title = 'Evenementiel'

// category
WITH category4

MERGE (job82:Job {id: '2855a6c9-f001-4d77-9c09-814cc1c6d715', title: 'Directeur.rice de foire, salon, congrès, exposition'})
MERGE (job82)-[:BELONGS_TO]->(category4)

MERGE (job83:Job {id: '3db8c9d9-c507-4e9c-82d6-44ede4be7a78', title: 'Directeur.rice de cirque'})
MERGE (job83)-[:BELONGS_TO]->(category4)

MERGE (job84:Job {id: '4f6fc60d-e22f-42d6-8b80-af1a0677eca6', title: 'Directeur.rice d\'agence évènementielle'})
MERGE (job84)-[:BELONGS_TO]->(category4)

MERGE (job85:Job {id: '2562ada8-d07b-43ac-8f5f-09536fce9320', title: 'Chef.fe de projet événementiel'})
MERGE (job85)-[:BELONGS_TO]->(category4)

MERGE (job86:Job {id: '073425e8-1197-40f8-8cb6-3e1985936071', title: 'Chargé.e de communication événementielle'})
MERGE (job86)-[:BELONGS_TO]->(category4)

MERGE (job87:Job {id: 'bd119ec6-99c3-47c2-bc50-12fbb2272780', title: 'Organisateur.rice de spectacles'})
MERGE (job87)-[:BELONGS_TO]->(category4)

MERGE (job88:Job {id: '5e959996-0b63-4e6c-bf1b-2b38997c852a', title: 'Commissaire de salon/d\'exposition'})
MERGE (job88)-[:BELONGS_TO]->(category4)

MERGE (job89:Job {id: 'a960d23f-38f7-4e38-825f-3ef76beda1c2', title: 'Organisateur.rice de business event'})
MERGE (job89)-[:BELONGS_TO]->(category4)

MERGE (job90:Job {id: '359e9ac3-015c-42ed-a12d-6b54f5cce11a', title: 'Organisateur.rice d\'événements'})
MERGE (job90)-[:BELONGS_TO]->(category4)

MERGE (job91:Job {id: 'b5700fbd-653d-49bd-a28f-14accc233af3', title: 'Chef.fe de projet artistique et culturel'})
MERGE (job91)-[:BELONGS_TO]->(category4)

MERGE (job92:Job {id: '1aff2e70-f8e9-4011-a1d8-9dd51ac40d22', title: 'Organisateur.rice d\'événements culturels et artistiques'})
MERGE (job92)-[:BELONGS_TO]->(category4)

MERGE (job93:Job {id: 'b2153f65-2adb-40ab-90fa-687a95412fa9', title: 'Organisateur.rice d\'événements sportifs'})
MERGE (job93)-[:BELONGS_TO]->(category4)

MERGE (job94:Job {id: 'be879a0b-5950-415f-93b1-3c6902805f71', title: 'Directeur.rice de production événementielle'})
MERGE (job94)-[:BELONGS_TO]->(category4)

MERGE (job95:Job {id: '6b9cb30e-e515-44e8-9c51-efcc14047103', title: 'Médiateur.rice culturel'})
MERGE (job95)-[:BELONGS_TO]->(category4)

MERGE (job96:Job {id: '132b8e04-e2cc-4cc1-a275-23e54210964f', title: 'Directeur.rice de festival'})
MERGE (job96)-[:BELONGS_TO]->(category4)

MERGE (job97:Job {id: '8cdedd38-813a-4a63-9faf-27c4f39300ba', title: 'Photographe'})
MERGE (job97)-[:BELONGS_TO]->(category4)

MERGE (job98:Job {id: 'eacabd48-c4fd-4f38-b072-fd887fbe138e', title: 'Modèle Mannequinat'})
MERGE (job98)-[:BELONGS_TO]->(category4)

MERGE (job99:Job {id: '2588681e-c0fa-401d-8c45-25a4c41e6032', title: 'Hôte.sse'})
MERGE (job99)-[:BELONGS_TO]->(category4)


//
MERGE (category5:JobCategory {id: '487e9884-e490-425c-b3e0-b5d2b0029683'})
SET category5.title = 'Casinos, Parcs dattraction'

// category
WITH category5

MERGE (job100:Job {id: '6b1d407a-f335-44d3-b5c6-33e16f1b4a64', title: 'Direct.eur.rice de parc zoologique'})
MERGE (job100)-[:BELONGS_TO]->(category5)

MERGE (job101:Job {id: '3af4ba85-5845-468a-885f-2945fcd3764d', title: 'Vétérinaire'})
MERGE (job101)-[:BELONGS_TO]->(category5)

MERGE (job102:Job {id: '74f3e4bb-f3e7-49c4-bad2-30449970f078', title: 'Chef.fe animalier'})
MERGE (job102)-[:BELONGS_TO]->(category5)

MERGE (job103:Job {id: '6622e775-d718-45c7-91c1-688ccefba58e', title: 'Soignant.e animalier'})
MERGE (job103)-[:BELONGS_TO]->(category5)

MERGE (job104:Job {id: '0006c2c7-f333-474b-a3e7-e12cafb3025a', title: 'Auxiliaire spécialisé vétérinaire'})
MERGE (job104)-[:BELONGS_TO]->(category5)

MERGE (job105:Job {id: '15eaea1e-99e1-46cd-8629-c1679a0b7ec3', title: 'Jardinier'})
MERGE (job105)-[:BELONGS_TO]->(category5)

MERGE (job106:Job {id: '282296f9-62ef-4f00-816d-8b15c8d84e78', title: 'Eleveur animalier'})
MERGE (job106)-[:BELONGS_TO]->(category5)

MERGE (job107:Job {id: '6f8c62fd-b60a-45b7-a245-89234e5ef04b', title: 'Fauconnier'})
MERGE (job107)-[:BELONGS_TO]->(category5)

MERGE (job108:Job {id: 'ecb1368e-55ed-4218-ba53-b1aa8df0a3da', title: 'Direct.eur.rice de parc d\'attraction'})
MERGE (job108)-[:BELONGS_TO]->(category5)

MERGE (job109:Job {id: '79c5feeb-10d8-4548-ac65-ff47bd4b5e5b', title: 'Responsable d\'un secteur d\'attraction'})
MERGE (job109)-[:BELONGS_TO]->(category5)

MERGE (job110:Job {id: '2521b230-fce0-4a43-a43f-1dded9aa4fe6', title: 'Pilote d\'attractions'})
MERGE (job110)-[:BELONGS_TO]->(category5)

MERGE (job111:Job {id: 'd05240c3-2899-442f-b725-07c674c44199', title: 'Hôte.sse de salle de jeux électroniques'})
MERGE (job111)-[:BELONGS_TO]->(category5)

MERGE (job112:Job {id: '1636d4fb-d784-46ee-a412-4485b482f3d8', title: 'Conduct.eur.rice de manège'})
MERGE (job112)-[:BELONGS_TO]->(category5)

MERGE (job113:Job {id: '8b88fae0-9681-483c-80ea-069c1dff7b91', title: 'Responsable des attractions'})
MERGE (job113)-[:BELONGS_TO]->(category5)

MERGE (job114:Job {id: 'a2bac2c3-cb1c-4143-ba2e-5b3559c05d06', title: 'Opérat.eur.rice d\'attraction'})
MERGE (job114)-[:BELONGS_TO]->(category5)

MERGE (job115:Job {id: '48e2283d-ff9c-41fe-b90e-fc3d8c5153e9', title: 'Hôte.sse de patinoire'})
MERGE (job115)-[:BELONGS_TO]->(category5)

MERGE (job116:Job {id: 'fb363b2e-30cb-4045-b961-4f224e833d0f', title: 'Hôte.sse de manège'})
MERGE (job116)-[:BELONGS_TO]->(category5)

MERGE (job117:Job {id: 'dbfbffd4-ca6f-443a-afc6-8f8a411df720', title: 'Employé.e de parc de loisirs'})
MERGE (job117)-[:BELONGS_TO]->(category5)

MERGE (job118:Job {id: '1b766a35-cadb-4111-852c-9b8005f34bad', title: 'Ouvreu.r.se de salle de spectacles'})
MERGE (job118)-[:BELONGS_TO]->(category5)

MERGE (job119:Job {id: '3d2e7564-81f2-4145-b509-a4cedeac8999', title: 'Pilote de manège'})
MERGE (job119)-[:BELONGS_TO]->(category5)

MERGE (job120:Job {id: 'ab070132-2643-44ad-9383-1e0141b516c8', title: 'Opérat.eur.rice de manège'})
MERGE (job120)-[:BELONGS_TO]->(category5)

MERGE (job121:Job {id: 'b3e4c6e7-7800-421c-911f-8ef802858f7d', title: 'Ouvreu.r.se placeu.r.se de salle de spectacles'})
MERGE (job121)-[:BELONGS_TO]->(category5)

MERGE (job122:Job {id: 'e18f662d-7424-4091-80a0-77c4c2e7deb0', title: 'Employé.e de manège forain'})
MERGE (job122)-[:BELONGS_TO]->(category5)

MERGE (job123:Job {id: '2ae74c69-1fdc-4973-ad75-172c123a8351', title: 'Agent.e d\'exploitation des attractions'})
MERGE (job123)-[:BELONGS_TO]->(category5)

MERGE (job124:Job {id: '1e9b35de-e07a-4a70-9e59-d1e4badd30c8', title: 'Agent.e de contrôle de salle de spectacles'})
MERGE (job124)-[:BELONGS_TO]->(category5)

MERGE (job125:Job {id: '00aebcc6-f4d9-4fd2-aba1-7a7cf1eb0279', title: 'Assistant.e de zone d\'attraction'})
MERGE (job125)-[:BELONGS_TO]->(category5)

MERGE (job126:Job {id: '444c83f1-f813-4fc3-a7b4-efb6712c2793', title: 'Conduct.eur.rice d\'attraction'})
MERGE (job126)-[:BELONGS_TO]->(category5)

MERGE (job127:Job {id: '29456810-40f4-4eb0-a40b-1e05e33073a7', title: 'Hôte.sse d\'attractions'})
MERGE (job127)-[:BELONGS_TO]->(category5)

MERGE (job128:Job {id: 'd9dccbf1-9109-42f5-b409-bbbd83d2d0eb', title: 'Employé.e de loisirs ou d\'attractions'})
MERGE (job128)-[:BELONGS_TO]->(category5)

MERGE (job129:Job {id: '8b63dea3-323f-43b3-9aeb-a80829147f40', title: 'Animat.eur.rice de parc de loisirs'})
MERGE (job129)-[:BELONGS_TO]->(category5)

MERGE (job130:Job {id: 'ecb2efce-8fc0-42d3-bf38-f67006e7e2d2', title: 'Animat.eur.rice de personnage de parc de loisirs'})
MERGE (job130)-[:BELONGS_TO]->(category5)

MERGE (job131:Job {id: 'ad3cfbf6-b26c-4b6f-a1a7-4217867eb837', title: 'Animat.eur.rice d\'attractions'})
MERGE (job131)-[:BELONGS_TO]->(category5)

MERGE (job132:Job {id: '7ce82b61-61de-462a-b424-a15741c95530', title: 'Opérat.eur.rice de parcours acrobatique dans les arbres'})
MERGE (job132)-[:BELONGS_TO]->(category5)

MERGE (job133:Job {id: 'b97d0138-ec6b-4df0-ac61-ff2617361c4c', title: 'Hôte.sse de golf/mini-golf'})
MERGE (job133)-[:BELONGS_TO]->(category5)

MERGE (job134:Job {id: 'fc108d85-99e0-44b9-8a38-4c52b5db75cf', title: 'Billettiste'})
MERGE (job134)-[:BELONGS_TO]->(category5)

MERGE (job135:Job {id: '1cdf3487-cb13-4766-beeb-8d2d8706d4e2', title: 'Direct.eur.rice de casino'})
MERGE (job135)-[:BELONGS_TO]->(category5)

MERGE (job136:Job {id: '05e8a53c-f896-45c5-8422-bef743fc2e7b', title: 'Chef.fe croupier.re'})
MERGE (job136)-[:BELONGS_TO]->(category5)

MERGE (job137:Job {id: 'ca3a314e-8188-4590-ab94-0a59f544d404', title: 'Croupier.re'})
MERGE (job137)-[:BELONGS_TO]->(category5)

MERGE (job138:Job {id: 'aca91e47-80d9-49ec-a585-128c3e629454', title: 'Responsable clientèle'})
MERGE (job138)-[:BELONGS_TO]->(category5)

MERGE (job139:Job {id: '4d7d0a3d-f2ca-4e55-9805-cfc8e35d4c8c', title: 'Agent de sécurité'})
MERGE (job139)-[:BELONGS_TO]->(category5)

MERGE (job140:Job {id: 'afb88773-1eac-4732-98ba-83bf21514ced', title: 'Opérat.eur.rice de vidéosurveillance'})
MERGE (job140)-[:BELONGS_TO]->(category5)

MERGE (job141:Job {id: '08c12d97-9bff-4bd3-9d14-e8cc80d97a86', title: 'Banquier'})
MERGE (job141)-[:BELONGS_TO]->(category5)

MERGE (job142:Job {id: '9783c7a6-15d5-4b72-9515-2253f42f32e9', title: 'Gestionnaire de fond'})
MERGE (job142)-[:BELONGS_TO]->(category5)

MERGE (job143:Job {id: '484d98fa-3eee-49b1-b317-6775b671da5b', title: 'Technicien machine à sous'})
MERGE (job143)-[:BELONGS_TO]->(category5)

MERGE (job144:Job {id: 'a0530cf4-7ebd-4e46-bedb-1c4a540672d1', title: 'Contrôleur auditeur de machines à sous'})
MERGE (job144)-[:BELONGS_TO]->(category5)

//
MERGE (category6:JobCategory {id: 'f6602954-76ff-4f1a-99fe-59e2fb5bd32f'})
SET category6.title = 'Administration, Espaces culturels, Tourisme'

// category
WITH category6

MERGE (job145:Job {id: 'fbc3bdd6-514c-42d7-ba29-33b503888eda', title: 'Directeur.rice d\'office de tourisme'})
MERGE (job145)-[:BELONGS_TO]->(category6)

MERGE (job146:Job {id: 'd4507f6c-7869-4879-9cfa-7f4b1095aefe', title: 'Directeur.rice de site culturel'})
MERGE (job146)-[:BELONGS_TO]->(category6)

MERGE (job147:Job {id: 'a7f851a5-cbff-4ada-9620-92182c4350ef', title: 'Responsable de réservation'})
MERGE (job147)-[:BELONGS_TO]->(category6)

MERGE (job148:Job {id: 'fe381dc8-353c-4e3c-aab6-7dc08bf0837a', title: 'Agent d\'accueil'})
MERGE (job148)-[:BELONGS_TO]->(category6)

MERGE (job149:Job {id: 'b0de531b-0eb8-4d99-8937-5474a507b0e7', title: 'Agent polyvalent'})
MERGE (job149)-[:BELONGS_TO]->(category6)

MERGE (job150:Job {id: '8db64d02-f019-42f0-a121-39d56f498a93', title: 'Guide accompagnateur'})
MERGE (job150)-[:BELONGS_TO]->(category6)

MERGE (category7:JobCategory {id: '3ca13093-7e71-40ba-992e-dbefa380f506'})
SET category7.title = 'Montagne, Ski'

// category
WITH category7

MERGE (job151:Job {id: '0a134493-28fb-4162-8a2c-950610f8eaf7', title: 'Chef.fe d\'exploitation de remontée mécanique'})
MERGE (job151)-[:BELONGS_TO]->(category7)

MERGE (job152:Job {id: '0267ad63-f4da-4c92-a3fe-fa34b0add2a1', title: 'Electromécanicien.ne en remontée mécanique'})
MERGE (job152)-[:BELONGS_TO]->(category7)

MERGE (job153:Job {id: 'f1fe6bed-5f89-403f-aebe-65ea407ba615', title: 'Installateur en remontée mécanique'})
MERGE (job153)-[:BELONGS_TO]->(category7)

MERGE (job154:Job {id: 'e38921b7-8a4e-4281-81c6-0138049ae248', title: 'Conducteu.r.se de remontée mécanique'})
MERGE (job154)-[:BELONGS_TO]->(category7)

MERGE (job155:Job {id: '77290bb2-ad99-4975-aacb-74e630c145dc', title: 'Caissier.e en remontée mécanique'})
MERGE (job155)-[:BELONGS_TO]->(category7)

MERGE (job156:Job {id: 'f02ce9c0-dca9-48fd-bd64-e1fcba5bfe55', title: 'Agent d\'accueil'})
MERGE (job156)-[:BELONGS_TO]->(category7)

MERGE (job157:Job {id: 'f17b2627-b0c2-4b78-ad2d-14c094036b43', title: 'Employé.e d\'équipement de sports et de loisirs'})
MERGE (job157)-[:BELONGS_TO]->(category7)

MERGE (job158:Job {id: '1236cf52-bcb4-4f16-be51-9c633f8fafab', title: 'Accompagnat.eur.rice en montagne'})
MERGE (job158)-[:BELONGS_TO]->(category7)

MERGE (job159:Job {id: '3fad9127-95de-4212-b64a-9681addb00bc', title: 'Moniteur.e de ski'})
MERGE (job159)-[:BELONGS_TO]->(category7)

MERGE (job160:Job {id: 'a6e194f9-c54d-491d-a3b0-849729bf6445', title: 'Moniteur.e de randonnée'})
MERGE (job160)-[:BELONGS_TO]->(category7)

MERGE (job161:Job {id: '17e7160a-e191-48eb-b0ae-a2862215f9ce', title: 'Moniteur.e d\'escalade'})
MERGE (job161)-[:BELONGS_TO]->(category7)

MERGE (job162:Job {id: '8196860a-e0a9-4569-97c5-24b4bdf67dca', title: 'Moniteur.e de moto neige'})
MERGE (job162)-[:BELONGS_TO]->(category7)

MERGE (job163:Job {id: '41586e40-2af5-4865-bf3f-9c0545efc03a', title: 'Ski.wo.man'})
MERGE (job163)-[:BELONGS_TO]->(category7)

MERGE (job164:Job {id: '1be34468-8c71-4081-97e2-e9849a48a80b', title: 'Conducteur d\'engins de Damage'})
MERGE (job164)-[:BELONGS_TO]->(category7)

MERGE (job165:Job {id: '53dcd804-366f-4a6f-9e29-19e79889c28b', title: 'Perc histe'})
MERGE (job165)-[:BELONGS_TO]->(category7)

MERGE (job166:Job {id: 'ff463280-0fde-43c3-badf-5eab93766de7', title: 'Pisteu.r.se secouriste'})
MERGE (job166)-[:BELONGS_TO]->(category7)

MERGE (job167:Job {id: 'cecfb53c-03a0-4296-af87-c2697153cdab', title: 'Nivocult.eur.rice'})
MERGE (job167)-[:BELONGS_TO]->(category7)

MERGE (job168:Job {id: '1b28496e-b4ff-4f9b-adab-303cd9535fdb', title: 'Artificier.e'})
MERGE (job168)-[:BELONGS_TO]->(category7)

MERGE (job169:Job {id: '038c2fc3-1d97-45f2-a658-602889055fdd', title: 'Maitre.sse chien d\'avalanche'})
MERGE (job169)-[:BELONGS_TO]->(category7)

MERGE (category8:JobCategory {id: 'ce9d817d-9e40-4fef-8a6a-ae58c9948009'})
SET category8.title = 'Mer, Plongée, Sports/Loisirs Nautiques'

// category
WITH category8

MERGE (job170:Job {id: '1c8ab8bd-e0ec-459f-ac26-0afb0c234f84', title: 'Plagiste'})
MERGE (job170)-[:BELONGS_TO]->(category8)

MERGE (job171:Job {id: '6839f8dd-ae68-4984-864c-74834ce00e77', title: 'Vendeu.r.se ambulant.e de glace ou de beignets'})
MERGE (job171)-[:BELONGS_TO]->(category8)

MERGE (job172:Job {id: 'faa68526-857b-4d9c-8c71-47cc6ea1d6a3', title: 'Animat.eur.rice de club de plage'})
MERGE (job172)-[:BELONGS_TO]->(category8)

MERGE (job173:Job {id: '9f600c07-57d2-4f5e-b871-a1d9286df71e', title: 'Nageu.r.se sauveteur'})
MERGE (job173)-[:BELONGS_TO]->(category8)

MERGE (job174:Job {id: '9be0e77c-0be7-42a2-ac76-48158dd3811d', title: 'Monit.eur.rice d\'activités nautiques'})
MERGE (job174)-[:BELONGS_TO]->(category8)

MERGE (job175:Job {id: '1ab645a9-7bc7-4008-9467-f7b0d6307bc5', title: 'Surveillant.e de baignade'})
MERGE (job175)-[:BELONGS_TO]->(category8)

MERGE (job176:Job {id: '497d334f-2e4c-4a4f-987c-0f9937ff36f0', title: 'Monit.eur.rice de plongée'})
MERGE (job176)-[:BELONGS_TO]->(category8)

MERGE (job177:Job {id: '92fd4a0b-3611-48cb-90ac-edc4fd0d257a', title: 'Employé.e de Capitainerie'})
MERGE (job177)-[:BELONGS_TO]->(category8)

MERGE (job178:Job {id: 'cd3946cf-79b3-4094-8242-e7cbffeafb40', title: 'Mécanicien.ne de bateaux'})
MERGE (job178)-[:BELONGS_TO]->(category8)

MERGE (job179:Job {id: '0e473c16-68bf-4877-82e2-742582f900c7', title: 'Equipage de bateaux'})
MERGE (job179)-[:BELONGS_TO]->(category8)

MERGE (category9:JobCategory {id: '778af999-18a8-4343-81f1-410448118469'})
SET category9.title = 'Sécurité, Gardiennage'

// category
WITH category9

MERGE (job180:Job {id: 'ce5d755a-e096-4a30-9adc-4856c891d967', title: 'Garde rapprochée'})
MERGE (job180)-[:BELONGS_TO]->(category9)

MERGE (job181:Job {id: 'dd914846-3a87-4a80-9349-03a746ba0f7f', title: 'Agent de sécurité'})
MERGE (job181)-[:BELONGS_TO]->(category9)

MERGE (job182:Job {id: 'd4dcfa97-c91c-4175-a855-4f7710ac364d', title: 'Opérat.eur.rice de vidéosurveillance'})
MERGE (job182)-[:BELONGS_TO]->(category9)

MERGE (job183:Job {id: 'a663dc4a-0246-4f7f-a747-78382b2c192b', title: 'Maitre.sse de chien'})
MERGE (job183)-[:BELONGS_TO]->(category9)

MERGE (job184:Job {id: '8becb8d7-08e8-4aba-bfc8-cb9009985f18', title: 'ASVP'})
MERGE (job184)-[:BELONGS_TO]->(category9)

MERGE (job185:Job {id: 'a788c5ad-6465-4e6a-8005-219c188de6b3', title: 'Gardien.ne'})
MERGE (job185)-[:BELONGS_TO]->(category9)

MERGE (category10:JobCategory {id: '30972914-91da-4dca-8a98-73a2942b0eaf'})
SET category10.title = 'Logistique, Transport'

// category
WITH category10

MERGE (job186:Job {id: '4ddc8cf9-ced6-4a6c-a9e2-59595f9479c9', title: 'Magasinier.e'})
MERGE (job186)-[:BELONGS_TO]->(category10)

MERGE (job187:Job {id: '12938e6c-7504-4255-9f61-c8b1eabe4a10', title: 'Chef magasinier'})
MERGE (job187)-[:BELONGS_TO]->(category10)

MERGE (job188:Job {id: 'b7c20171-c64a-4682-b6f6-e7f7bef95354', title: 'Préparat.eur.rice de commande'})
MERGE (job188)-[:BELONGS_TO]->(category10)

MERGE (job189:Job {id: 'b55aaf7f-285f-42bc-9672-a89699c2ada8', title: 'Cariste'})
MERGE (job189)-[:BELONGS_TO]->(category10)

MERGE (job190:Job {id: 'f73463d4-4fff-400f-8902-5f15ab1d4d1e', title: 'Manutentionnaire'})
MERGE (job190)-[:BELONGS_TO]->(category10)

MERGE (job191:Job {id: 'c0614fc9-3b80-4886-8b3d-9590daf9cdd0', title: 'Opérat.eur.rice'})
MERGE (job191)-[:BELONGS_TO]->(category10)

MERGE (job192:Job {id: 'd9457048-9a63-4503-83aa-d87bc1430b61', title: 'Chauffeur livreur'})
MERGE (job192)-[:BELONGS_TO]->(category10)

MERGE (job193:Job {id: '087269a0-fadf-4058-b269-3457d328734b', title: 'Chauffeur routier'})
MERGE (job193)-[:BELONGS_TO]->(category10)

MERGE (category11:JobCategory {id: '45a251b0-f53c-4c0a-acfb-6c1c8f88c477'})
SET category11.title = 'Baby sitting, Services à la personne'

// category
WITH category11

MERGE (job194:Job {id: 'd198f766-7981-40bd-bad4-243a4c89d137', title: 'Garde d\'enfants'})
MERGE (job194)-[:BELONGS_TO]->(category11)

MERGE (job195:Job {id: '3f517e80-861a-4ea0-a2dc-98db54ee247c', title: 'Garde périscolaire'})
MERGE (job195)-[:BELONGS_TO]->(category11)

MERGE (job196:Job {id: 'edffe5ae-019f-4a0e-9d5d-ab42a2a3d002', title: 'Aide aux devoirs'})
MERGE (job196)-[:BELONGS_TO]->(category11)

MERGE (job197:Job {id: '84d81658-e33f-4384-88d2-6676bd7226f4', title: 'Animat.eur.rice d\'anniversaire'})
MERGE (job197)-[:BELONGS_TO]->(category11)

MERGE (job198:Job {id: 'a8619fe7-3836-46e9-bcb1-3baaf360aee6', title: 'Accompagnat.eur.rice de vacances'})
MERGE (job198)-[:BELONGS_TO]->(category11)

MERGE (job199:Job {id: 'f40de1e2-47dc-47c1-8cd2-666e303e034f', title: 'Aide à la personne'})
MERGE (job199)-[:BELONGS_TO]->(category11)

MERGE (job200:Job {id: '5352c1a6-e1b6-48b1-8c11-355fc777f61d', title: 'Livreur à domicile'})
MERGE (job200)-[:BELONGS_TO]->(category11)

MERGE (job201:Job {id: '7ab462da-4bb2-497f-a212-4ce8294f2a7f', title: 'Chauffeur VTC'})
MERGE (job201)-[:BELONGS_TO]->(category11)

MERGE (job202:Job {id: 'fcb39343-cd2f-4f80-ac8a-fab3348ade51', title: 'Aide au ménage'})
MERGE (job202)-[:BELONGS_TO]->(category11)

MERGE (job203:Job {id: '529fde9b-ec3b-4488-b181-d7424dbe8d72', title: 'Paysagiste jardinier arboriste'})
MERGE (job203)-[:BELONGS_TO]->(category11)

MERGE (category12:JobCategory {id: '10823666-4ae8-40a4-a692-b1bd4991bb05'})
SET category12.title = 'Commerce, Achats, Vente'

// category
WITH category12

MERGE (job204:Job {id: 'f9b70367-7571-44e3-850f-68502e92f7a9', title: 'Billettiste'})
MERGE (job204)-[:BELONGS_TO]->(category12)

MERGE (job205:Job {id: '85246c7e-56e3-4594-a6b6-66e03a3020e6', title: 'Responsable de réservation'})
MERGE (job205)-[:BELONGS_TO]->(category12)

MERGE (job206:Job {id: '4fcdc18b-77fe-43bd-b81d-e3b0e65ad8e8', title: 'Responsable de vente'})
MERGE (job206)-[:BELONGS_TO]->(category12)

MERGE (job207:Job {id: '4962829c-8fd8-474b-b12e-07bc69d6b9f6', title: 'Responsable de magasin'})
MERGE (job207)-[:BELONGS_TO]->(category12)

MERGE (job208:Job {id: '80ddd37a-d708-42f2-a87e-f9ab16941cc3', title: 'Assistant.e responsable magasin'})
MERGE (job208)-[:BELONGS_TO]->(category12)

MERGE (job209:Job {id: '90fe3b5a-7553-43ea-aff4-97ba5fbe521d', title: 'Vend.eur.se'})
MERGE (job209)-[:BELONGS_TO]->(category12)

MERGE (job210:Job {id: 'f7682d92-1461-4221-97ca-98b4d96f14b2', title: 'Négociant.e'})
MERGE (job210)-[:BELONGS_TO]->(category12)


MERGE (category13:JobCategory {id: 'e8c82731-2d12-4838-b605-1c626a3115aa'})
SET category13.title = 'SPA, Esthétique, Coiffure'

// category
WITH category13

MERGE (job211:Job {id: '9139437f-99e3-4896-bec3-82c8852d1955', title: 'SPA manager'})
MERGE (job211)-[:BELONGS_TO]->(category13)

MERGE (job212:Job {id: 'a24b41e9-de8c-4cf7-b3d0-b1c118fcfea6', title: 'Praticien.ne SPA'})
MERGE (job212)-[:BELONGS_TO]->(category13)

MERGE (job213:Job {id: 'a0f158b6-126a-4e67-a34d-64d942c8fd5c', title: 'Hôte.sse d\'accueil'})
MERGE (job213)-[:BELONGS_TO]->(category13)

MERGE (job214:Job {id: '6903831f-15a4-4a05-8120-a8d5fdd095fc', title: 'Esthéticien.ne'})
MERGE (job214)-[:BELONGS_TO]->(category13)

MERGE (job215:Job {id: 'e72142b7-e361-47d0-a85c-d4a8e04ff5d8', title: 'Maquilleu.r.se'})
MERGE (job215)-[:BELONGS_TO]->(category13)

MERGE (job216:Job {id: 'c67911f1-b48e-43ab-84c5-c501f4ed9a3a', title: 'Métiers de l\'onglerie'})
MERGE (job216)-[:BELONGS_TO]->(category13)

MERGE (job217:Job {id: 'c3d51734-d31a-4539-b5ea-22f8a1c72ece', title: 'Masseu.r.se'})
MERGE (job217)-[:BELONGS_TO]->(category13)

MERGE (job218:Job {id: '81655348-1c72-4e38-a751-87b05b612c26', title: 'Coiffeu.r.se'})
MERGE (job218)-[:BELONGS_TO]->(category13)


MERGE (category14:JobCategory {id: '8f3432e0-39b7-44ec-877e-4ad56400d7cc'})
SET category14.title = 'Autre'

// category
WITH category14

MERGE (job218:Job {id: '6d9f5614-7022-49bf-82c2-9f3a2ff61c6e', title: 'Autres métiers'})
MERGE (job218)-[:BELONGS_TO]->(category14)



// jobOffers

WITH job218
MERGE (jobOffer1:JobOffer {
    id: 'f3a617dc-7798-40e6-ae63-739f88b6741d',
    startDate: '2024-01-01',
    salary: 100000,
    geographicalArea: 'San Jose, California'
})

MERGE (jobOffer1)-[:HAS_JOB]->(job218)

WITH 'b5700fbd-653d-49bd-a28f-14accc233af3' AS jobId
MATCH (job91:Job {id: jobId})
MERGE (jobOffer2:JobOffer {
    id: '92c7a573-0b53-4a9c-91dd-5e6af12c9ff6',
    startDate: '2024-04-01',
    salary: 70000,
    geographicalArea: 'Paris, France'
})
MERGE (jobOffer2)-[:HAS_JOB]->(job91)

WITH '35aaa7a6-fb6a-4b8d-99e9-946b7c0b28ee' AS jobId
MATCH (job78:Job {id: jobId})
MERGE (jobOffer3:JobOffer {
    id: 'de8aa118-cabf-4469-9b67-2f37240c51df',
    startDate: '2024-05-01',
    salary: 90000,
    geographicalArea: 'Montreal, Canada'
})
MERGE (jobOffer3)-[:HAS_JOB]->(job78)

WITH '087269a0-fadf-4058-b269-3457d328734b' AS jobId
MATCH (job193:Job {id: jobId})
MERGE (jobOffer4:JobOffer {
    id: '34215d66-e1e0-43a7-861d-acddc2418fd5',
    startDate: '2024-02-01',
    salary: 120000,
    geographicalArea: 'Montpellier, France'
})
MERGE (jobOffer4)-[:HAS_JOB]->(job193)
