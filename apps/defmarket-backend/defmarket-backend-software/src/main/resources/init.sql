create schema if not exists defmarket;

insert into DEFMARKET.JOB (ID, JOB_NAME, VERSION)
values (1, 'Défense Nationale', 0);
insert into DEFMARKET.JOB (ID, JOB_NAME, VERSION)
values (5, 'Armée de l''Air', 0);
insert into DEFMARKET.JOB (ID, JOB_NAME, VERSION)
values (6, 'Armée de Terre', 0);
insert into DEFMARKET.JOB (ID, JOB_NAME, VERSION)
values (7, 'Marine Nationale', 0);
insert into DEFMARKET.JOB (ID, JOB_NAME, VERSION)
values (8, 'Gendarmerie Nationale', 0);

insert into DEFMARKET.JOB (ID, JOB_NAME, VERSION)
values (2, 'Sécurité Intérieure', 0);
insert into DEFMARKET.JOB (ID, JOB_NAME, VERSION)
values (9, 'Police Nationale', 0);
insert into DEFMARKET.JOB (ID, JOB_NAME, VERSION)
values (10, 'Police Municipale', 0);
insert into DEFMARKET.JOB (ID, JOB_NAME, VERSION)
values (11, 'Services des Douanes', 0);
insert into DEFMARKET.JOB (ID, JOB_NAME, VERSION)
values (12, 'Administration Pénitentiaire', 0);
insert into DEFMARKET.JOB (ID, JOB_NAME, VERSION)
values (13, 'Police Ferroviaire (SUGE)', 0);
insert into DEFMARKET.JOB (ID, JOB_NAME, VERSION)
values (14, 'Groupe de protection et de sécurité des réseaux', 0);

insert into DEFMARKET.JOB (ID, JOB_NAME, VERSION)
values (3, 'Sevices de Secours', 0);
insert into DEFMARKET.JOB (ID, JOB_NAME, VERSION)
values (15, 'Sapeurs-Pompiers', 0);
insert into DEFMARKET.JOB (ID, JOB_NAME, VERSION)
values (16, 'SNSM', 0);
insert into DEFMARKET.JOB (ID, JOB_NAME, VERSION)
values (17, 'Croix-Rouge', 0);
insert into DEFMARKET.JOB (ID, JOB_NAME, VERSION)
values (18, 'Protection Civile', 0);



insert into DEFMARKET.JOB (ID, JOB_NAME, VERSION)
values (4, 'Services Sanitaires', 0);
insert into DEFMARKET.JOB (ID, JOB_NAME, VERSION)
values (19, 'Soignants et Assimilés', 0);
insert into DEFMARKET.JOB (ID, JOB_NAME, VERSION)
values (20, 'Personnels Hospitaliers', 0);
insert into DEFMARKET.JOB (ID, JOB_NAME, VERSION)
values (21, 'Personnels en EHPAD', 0);
insert into DEFMARKET.JOB (ID, JOB_NAME, VERSION)
values (22, 'Personnels en Cliniques', 0);
insert into DEFMARKET.JOB (ID, JOB_NAME, VERSION)
values (23, 'Réserve Sanitaire', 0);
insert into DEFMARKET.JOB (ID, JOB_NAME, VERSION)
values (24, 'Ambulanciers', 0);


insert into DEFMARKET.JOB_REF (ID, JOB_ID, JOB_PARENT_ID, DEPTH)
values (1, 1, null, 0);
insert into DEFMARKET.JOB_REF (ID, JOB_ID, JOB_PARENT_ID, DEPTH)
values (2, 2, null, 0);
insert into DEFMARKET.JOB_REF (ID, JOB_ID, JOB_PARENT_ID, DEPTH)
values (3, 3, null, 0);
insert into DEFMARKET.JOB_REF(ID, JOB_ID, JOB_PARENT_ID, DEPTH)
values (4, 4, null, 0);

insert into DEFMARKET.JOB_REF(ID, JOB_ID, JOB_PARENT_ID, DEPTH)
values (5, 5, 1, 1);
insert into DEFMARKET.JOB_REF(ID, JOB_ID, JOB_PARENT_ID, DEPTH)
values (6, 6, 1, 1);
insert into DEFMARKET.JOB_REF(ID, JOB_ID, JOB_PARENT_ID, DEPTH)
values (7, 7, 1, 1);
insert into DEFMARKET.JOB_REF(ID, JOB_ID, JOB_PARENT_ID, DEPTH)
values (8, 8, 1, 1);

insert into DEFMARKET.JOB_REF(ID, JOB_ID, JOB_PARENT_ID, DEPTH)
values (9, 9, 2, 1);
insert into DEFMARKET.JOB_REF(ID, JOB_ID, JOB_PARENT_ID, DEPTH)
values (10, 10, 2, 1);
insert into DEFMARKET.JOB_REF(ID, JOB_ID, JOB_PARENT_ID, DEPTH)
values (11, 11, 2, 1);
insert into DEFMARKET.JOB_REF(ID, JOB_ID, JOB_PARENT_ID, DEPTH)
values (12, 12, 2, 1);
insert into DEFMARKET.JOB_REF(ID, JOB_ID, JOB_PARENT_ID, DEPTH)
values (13, 13, 2, 1);
insert into DEFMARKET.JOB_REF(ID, JOB_ID, JOB_PARENT_ID, DEPTH)
values (14, 14, 2, 1);

insert into DEFMARKET.JOB_REF(ID, JOB_ID, JOB_PARENT_ID, DEPTH)
values (15, 15, 3, 1);
insert into DEFMARKET.JOB_REF(ID, JOB_ID, JOB_PARENT_ID, DEPTH)
values (16, 16, 3, 1);
insert into DEFMARKET.JOB_REF(ID, JOB_ID, JOB_PARENT_ID, DEPTH)
values (17, 17, 3, 1);
insert into DEFMARKET.JOB_REF(ID, JOB_ID, JOB_PARENT_ID, DEPTH)
values (18, 18, 3, 1);

insert into DEFMARKET.JOB_REF(ID, JOB_ID, JOB_PARENT_ID, DEPTH)
values (19, 19, 4, 1);
insert into DEFMARKET.JOB_REF(ID, JOB_ID, JOB_PARENT_ID, DEPTH)
values (20, 20, 4, 1);
insert into DEFMARKET.JOB_REF(ID, JOB_ID, JOB_PARENT_ID, DEPTH)
values (21, 21, 4, 1);
insert into DEFMARKET.JOB_REF(ID, JOB_ID, JOB_PARENT_ID, DEPTH)
values (22, 22, 4, 1);
insert into DEFMARKET.JOB_REF(ID, JOB_ID, JOB_PARENT_ID, DEPTH)
values (23, 23, 4, 1);
insert into DEFMARKET.JOB_REF(ID, JOB_ID, JOB_PARENT_ID, DEPTH)
values (24, 24, 4, 1);

insert into DEFMARKET.STORE_CATEGORY (ID, NAME, DESCRIPTION, STORE_TYPE, VERSION)
values (1, 'Alimentaire & Ménager', 'Alimentaire & Ménager', 'PHYSICAL_AND_E_COMMERCE', 0);
insert into DEFMARKET.STORE_CATEGORY (ID, NAME, DESCRIPTION, STORE_TYPE, VERSION)
values (2, 'Loisirs & Culture', 'Loisirs & Culture', 'PHYSICAL_AND_E_COMMERCE', 0);
insert into DEFMARKET.STORE_CATEGORY (ID, NAME, DESCRIPTION, STORE_TYPE, VERSION)
values (3, 'Séjours & Vacances', 'Séjours & Vacances', 'PHYSICAL_AND_E_COMMERCE', 0);
insert into DEFMARKET.STORE_CATEGORY (ID, NAME, DESCRIPTION, STORE_TYPE, VERSION)
values (4, 'Mode & Accessoires', 'Mode & Accessoires', 'PHYSICAL_AND_E_COMMERCE', 0);
insert into DEFMARKET.STORE_CATEGORY (ID, NAME, DESCRIPTION, STORE_TYPE, VERSION)
values (5, 'Maison & Jardin', 'Maison & Jardin', 'PHYSICAL_AND_E_COMMERCE', 0);
insert into DEFMARKET.STORE_CATEGORY (ID, NAME, DESCRIPTION, STORE_TYPE, VERSION)
values (6, 'Beauté & Bien-être', 'Beauté & Bien-être', 'PHYSICAL_AND_E_COMMERCE', 0);
insert into DEFMARKET.STORE_CATEGORY (ID, NAME, DESCRIPTION, STORE_TYPE, VERSION)
values (7, 'Services & Professionnels', 'Services & Professionnels', 'PHYSICAL_AND_E_COMMERCE', 0);

insert into DEFMARKET.PERMISSION(ID, VERSION, NAME) values (1, 0, 'HOME');
insert into DEFMARKET.PERMISSION(ID, VERSION, NAME) values (2, 0, 'COMPANY');
insert into DEFMARKET.PERMISSION(ID, VERSION, NAME)
values (3, 0, 'STORE');
insert into DEFMARKET.PERMISSION(ID, VERSION, NAME)
values (4, 0, 'OFFER');
insert into DEFMARKET.PERMISSION(ID, VERSION, NAME)
values (5, 0, 'CONTACT');
insert into DEFMARKET.PERMISSION(ID, VERSION, NAME)
values (6, 0, 'ANNOUNCE');
insert into DEFMARKET.PERMISSION(ID, VERSION, NAME)
values (7, 0, 'NOTIFICATION');
insert into DEFMARKET.PERMISSION(ID, VERSION, NAME)
values (8, 0, 'PROFILE');
insert into DEFMARKET.PERMISSION(ID, VERSION, NAME)
values (9, 0, 'NEWSLETTER');
insert into DEFMARKET.PERMISSION(ID, VERSION, NAME)
values (10, 0, 'ADMIN');

insert into DEFMARKET.DEFAULT_ROLE(ID, VERSION, NAME, TARGET) values (1, 0, 'Admin', 'ADMIN');
insert into DEFMARKET.DEFAULT_ROLE(ID, VERSION, NAME, TARGET) values (2, 0, 'Trader', 'TRADER');

--Admin
insert into DEFMARKET.DEFAULT_ROLE_PERMISSIONS(ROLE_ID, PERMISSION_ID, can_write, can_read, can_update, can_delete, is_admin)
values (1, 1, true, true, true, true, true);
insert into DEFMARKET.DEFAULT_ROLE_PERMISSIONS(ROLE_ID, PERMISSION_ID, can_write, can_read, can_update, can_delete, is_admin)
values (1, 2, true, true, true, true, true);
insert into DEFMARKET.DEFAULT_ROLE_PERMISSIONS(ROLE_ID, PERMISSION_ID, can_write, can_read, can_update, can_delete, is_admin)
values (1, 3, true, true, true, true, true);
insert into DEFMARKET.DEFAULT_ROLE_PERMISSIONS(ROLE_ID, PERMISSION_ID, can_write, can_read, can_update, can_delete, is_admin)
values (1, 4, true, true, true, true, true);
insert into DEFMARKET.DEFAULT_ROLE_PERMISSIONS(ROLE_ID, PERMISSION_ID, can_write, can_read, can_update, can_delete, is_admin)
values (1, 5, true, true, true, true, true);
insert into DEFMARKET.DEFAULT_ROLE_PERMISSIONS(ROLE_ID, PERMISSION_ID, can_write, can_read, can_update, can_delete, is_admin)
values (1, 6, true, true, true, true, true);
insert into DEFMARKET.DEFAULT_ROLE_PERMISSIONS(ROLE_ID, PERMISSION_ID, can_write, can_read, can_update, can_delete, is_admin)
values (1, 7, true, true, true, true, true);
insert into DEFMARKET.DEFAULT_ROLE_PERMISSIONS(ROLE_ID, PERMISSION_ID, can_write, can_read, can_update, can_delete, is_admin)
values (1, 8, true, true, true, true, true);
insert into DEFMARKET.DEFAULT_ROLE_PERMISSIONS(ROLE_ID, PERMISSION_ID, can_write, can_read, can_update, can_delete, is_admin)
values (1, 9, true, true, true, true, true);

--Trader
insert into DEFMARKET.DEFAULT_ROLE_PERMISSIONS(ROLE_ID, PERMISSION_ID, can_write, can_read, can_update, can_delete, is_admin)
values (2, 1, false, true, false, false, false);
insert into DEFMARKET.DEFAULT_ROLE_PERMISSIONS(ROLE_ID, PERMISSION_ID, can_write, can_read, can_update, can_delete, is_admin)
values (2, 2, true, true, true, true, false);
insert into DEFMARKET.DEFAULT_ROLE_PERMISSIONS(ROLE_ID, PERMISSION_ID, can_write, can_read, can_update, can_delete, is_admin)
values (2, 3, true, true, true, true, false);
insert into DEFMARKET.DEFAULT_ROLE_PERMISSIONS(ROLE_ID, PERMISSION_ID, can_write, can_read, can_update, can_delete, is_admin)
values (2, 4, true, true, true, true, false);
insert into DEFMARKET.DEFAULT_ROLE_PERMISSIONS(ROLE_ID, PERMISSION_ID, can_write, can_read, can_update, can_delete, is_admin)
values (2, 5, true, true, true, true, false);
insert into DEFMARKET.DEFAULT_ROLE_PERMISSIONS(ROLE_ID, PERMISSION_ID, can_write, can_read, can_update, can_delete, is_admin)
values (2, 6, false, true, false, false, false);
insert into DEFMARKET.DEFAULT_ROLE_PERMISSIONS(ROLE_ID, PERMISSION_ID, can_write, can_read, can_update, can_delete, is_admin)
values (2, 7, false, true, false, true, false);
insert into DEFMARKET.DEFAULT_ROLE_PERMISSIONS(ROLE_ID, PERMISSION_ID, can_write, can_read, can_update, can_delete, is_admin)
values (2, 8, false, true, true, true, false);
insert into DEFMARKET.DEFAULT_ROLE_PERMISSIONS(ROLE_ID, PERMISSION_ID, can_write, can_read, can_update, can_delete, is_admin)
values (2, 9, false, true, false, false, false);

insert into DEFMARKET.DOCUMENTS(VERSION, ID, NAME, PATH) values (0, 1, 'store-default-cover.png', 'file/public/default/store-default-cover.png');
insert into DEFMARKET.DOCUMENTS(VERSION, ID, NAME, PATH) values (0, 2, 'offer-default-image.png', 'file/public/default/offer-default-image.png');
insert into DEFMARKET.DOCUMENTS(VERSION, ID, NAME, PATH) values (0, 3, 'logo.png', 'file/public/assets/logo.png');
insert into DEFMARKET.DOCUMENTS(VERSION, ID, NAME, PATH) values (0, 4, 'flag-fr.png', 'file/public/assets/flag.png');
insert into DEFMARKET.DOCUMENTS(VERSION, ID, NAME, PATH) values (0, 5, 'facebook.png', 'file/public/assets/facebook-light.png');
insert into DEFMARKET.DOCUMENTS(VERSION, ID, NAME, PATH) values (0, 6, 'instagram.png', 'file/public/assets/instagram-light.png');
insert into DEFMARKET.DOCUMENTS(VERSION, ID, NAME, PATH) values (0, 7, 'linkedin.png', 'file/public/assets/linkedin-light.png');
