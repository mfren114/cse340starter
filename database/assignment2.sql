--INSERT Query
INSERT INTO public.account 
(
account_firstname,
account_lastname,
account_email, 
account_password
)
VALUES
(
'Tony',
'Stark',
'tony@starkent.com',
'Iam1ronM@n'
)

--UPDATE Query
UPDATE public.account
SET account_type = 'Admin'
WhERE account_id = 1;

--DELETE Query
DELETE FROM public.account WHERE account_id = 1;

--Hummer UPDATE Query
UPDATE public.inventory
SET inv_description = REPLACE(inv_description, 'small', 'huge')
WHERE inv_id = 10;

--JOIN Query
SELECT inv_make, inv_model, classification_name
FROM inventory
JOIN classification ON inventory.classification_id = classification.classification_id;

--Path Update Query
UPDATE public.inventory
SET 
	inv_image = REPLACE(inv_image, '/images', '/images/vehicles'),
	inv_thumbnail = REPLACE(inv_thumbnail, '/images', '/images/vehicles')
WHERE 
	inv_image LIKE '/images%'OR inv_thumbnail LIKE '/images%';
