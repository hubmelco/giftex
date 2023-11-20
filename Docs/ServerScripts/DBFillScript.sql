use wishwell;
-- insert the users
-- Password for everything is: 123
insert into users (email, password, name, dob, private, createdAt, updatedAt)
values("Email1@email.com", "$2a$10$x39zCi/HLL4Pr4BR0XF1vuZMIrqwco8Z.iCdlKQtt4PCRzOCRy0Pq", "chloe1", "2000-12-15", 0, NOW(), NOW());

insert into users (email, password, name, dob, private, createdAt, updatedAt)
values("Email2@email.com", "$2a$10$x39zCi/HLL4Pr4BR0XF1vuZMIrqwco8Z.iCdlKQtt4PCRzOCRy0Pq", "chloe2", "2000-12-15", 0, NOW(), NOW());

insert into users (email, password, name, dob, private, createdAt, updatedAt)
values("Email3@email.com", "$2a$10$x39zCi/HLL4Pr4BR0XF1vuZMIrqwco8Z.iCdlKQtt4PCRzOCRy0Pq", "chloe3", "2000-12-15", 0, NOW(), NOW());

insert into users (email, password, name, dob, private, createdAt, updatedAt)
values("Email4@email.com", "$2a$10$x39zCi/HLL4Pr4BR0XF1vuZMIrqwco8Z.iCdlKQtt4PCRzOCRy0Pq", "chloe4", "2000-12-15", 0, NOW(), NOW());

insert into users (email, password, name, dob, private, createdAt, updatedAt)
values("Email5@email.com", "$2a$10$x39zCi/HLL4Pr4BR0XF1vuZMIrqwco8Z.iCdlKQtt4PCRzOCRy0Pq", "chloe5", "2000-12-15", 1, NOW(), NOW());


-- insert 2 gifts per user so 10 gifts
insert into gifts (name, description, price, progress, thumbnail, receiverId, receiverName, createdAt, updatedAt, userId, deadline)
values("peppa", "pig", 200, 0, "https://media.istockphoto.com/photos/cute-pig-leaning-on-railing-of-his-cot-picture-id140462837?k=20&m=140462837&s=612x612&w=0&h=PM_57ox9n_WE_1Q7JdgNeg7kK5SI4Y8C8Z3UYM1m_JY=", 4, "chloe4", DATE_ADD(NOW(), INTERVAL 2 HOUR), DATE_ADD(NOW(), INTERVAL 6 HOUR), 5, "2030-01-01");

insert into gifts (name, description, price, progress, thumbnail, receiverId, receiverName, createdAt, updatedAt, userId, deadline)
values("2 Bitcoin", "#cryptoFan", 20000000, 1, "https://a.c-dn.net/c/content/dam/publicsites/igcom/uk/images/Rebrand/Hero/Other/Bitcoin_trading_Desktop.jpg", 4, "chloe4", DATE_ADD(NOW(), INTERVAL 2 HOUR), DATE_ADD(NOW(), INTERVAL 6 HOUR), 5,"2029-02-01");

insert into gifts (name, description, price, progress, thumbnail, receiverId, receiverName, createdAt, updatedAt, userId, deadline)
values("A single grape", "yup, just one", 5, 0, "https://media.istockphoto.com/photos/picture-with-a-fresh-red-grape-picture-id176059641?k=20&m=176059641&s=612x612&w=0&h=bFaY12_dTkCzF5zVyx95evgaSSLlFpqz8jc3jWXXcCo=", 4, "chloe4", DATE_ADD(NOW(), INTERVAL 2 HOUR), DATE_ADD(NOW(), INTERVAL 6 HOUR), 4, "2030-01-05");

insert into gifts (name, description, price, progress, thumbnail, receiverId, receiverName, createdAt, updatedAt, userId, deadline)
values("Big Mouth Billy Bass", "my favorite fish", 20, 5, "https://cdn.vox-cdn.com/thumbor/8mQlql5JvwmTTuvONB4zKbcIqnw=/0x0:1700x1000/1200x800/filters:focal(714x364:986x636)/cdn.vox-cdn.com/uploads/chorus_image/image/62420500/big_mouth_billy_bass_bigger.0.jpg", 4, "chloe4", DATE_ADD(NOW(), INTERVAL 2 HOUR), DATE_ADD(NOW(), INTERVAL 6 HOUR), 4, "2030-03-07");

insert into gifts (name, description, price, progress, thumbnail, receiverId, receiverName, createdAt, updatedAt, userId, deadline)
values("Hedgehog", "so cute!", 200, 0, "https://www.thesprucepets.com/thmb/nuRZVBLSTh8yjg7Z6ATVnQZ2vLU=/1927x1445/smart/filters:no_upscale()/GettyImages-626916125-5b3a4a8046e0fb00379f682d.jpg", 4, "chloe4", DATE_ADD(NOW(), INTERVAL 2 HOUR), DATE_ADD(NOW(), INTERVAL 6 HOUR), 3, "2029-01-15");

insert into gifts (name, description, price, progress, thumbnail, receiverId, receiverName, createdAt, updatedAt, userId, deadline)
values("dog water", "lol", 10000000, 0, "https://iheartdogs.com/wp-content/uploads/2018/09/chihuahua-1351026_640.jpg", 4, "chloe4", DATE_ADD(NOW(), INTERVAL 2 HOUR), DATE_ADD(NOW(), INTERVAL 6 HOUR), 3, "2080-05-09");

insert into gifts (name, description, price, progress, thumbnail, receiverId, receiverName, createdAt, updatedAt, userId, deadline)
values("Kirkland Signature Marinara Sauce", "its a good deal", 15, 1, "https://images.costcobusinessdelivery.com/ImageDelivery/imageService?profileId=12028466&itemId=159491&recipeName=680", 4, "chloe4", DATE_ADD(NOW(), INTERVAL 2 HOUR), DATE_ADD(NOW(), INTERVAL 6 HOUR), 2, "2030-01-23");

insert into gifts (name, description, price, progress, thumbnail, receiverId, receiverName, createdAt, updatedAt, userId, deadline)
values("Flarp", "farting putty haha", 8, 0, "https://m.media-amazon.com/images/I/71p5p2IQ-uL._AC_SX425_.jpg", 4, "chloe4", DATE_ADD(NOW(), INTERVAL 2 HOUR), DATE_ADD(NOW(), INTERVAL 6 HOUR), 2, "2030-01-07");

insert into gifts (name, description, price, progress, thumbnail, receiverId, receiverName, createdAt, updatedAt, userId, deadline)
values("20 lb gummy worm", "big boy", 30, 0, "https://images.vat19.com/covers/large/worlds-largest-gummy-worm.jpg", 4, "chloe4", DATE_ADD(NOW(), INTERVAL 2 HOUR), DATE_ADD(NOW(), INTERVAL 6 HOUR), 1, "2030-10-18");

insert into gifts (name, description, price, progress, thumbnail, receiverId, receiverName, createdAt, updatedAt, userId, deadline)
values("The pyramids", "is this even possible?", 50000000000, 0, "https://www.history.com/.image/t_share/MTU3ODc5MDg2NDMxODcyNzM1/egyptian-pyramids-hero.jpg", 4, "chloe4", DATE_ADD(NOW(), INTERVAL 2 HOUR), DATE_ADD(NOW(), INTERVAL 6 HOUR), 1, "2030-11-06");

-- inserting 2 events per user so 10 events
insert into events (name, description, end_date, createdAt, updatedAt, userId)
values("My Birthday!", "it's my birthday", "2030-01-05", DATE_ADD(NOW(), INTERVAL 2 HOUR), DATE_ADD(NOW(), INTERVAL 6 HOUR), 1);

insert into events (name, description, end_date, createdAt, updatedAt, userId)
values("Divorce Party", "See ya later!", "2030-01-05", DATE_ADD(NOW(), INTERVAL 2 HOUR), DATE_ADD(NOW(), INTERVAL 6 HOUR), 1);

insert into events (name, description, end_date, createdAt, updatedAt, userId)
values("Bar Mitzvah", "let's party", "2030-01-05", DATE_ADD(NOW(), INTERVAL 2 HOUR), DATE_ADD(NOW(), INTERVAL 6 HOUR), 2);

insert into events (name, description, end_date, createdAt, updatedAt, userId)
values("Tony's Baptism", "he do be getting dunked in water", "2030-01-05", DATE_ADD(NOW(), INTERVAL 2 HOUR), DATE_ADD(NOW(), INTERVAL 6 HOUR), 2);

insert into events (name, description, end_date, createdAt, updatedAt, userId)
values("College Graduation", "im glad i didnt drop out", "2030-01-05", DATE_ADD(NOW(), INTERVAL 2 HOUR), DATE_ADD(NOW(), INTERVAL 6 HOUR), 3);

insert into events (name, description, end_date, createdAt, updatedAt, userId)
values("Baby Shower", "woop", "2030-01-05", DATE_ADD(NOW(), INTERVAL 2 HOUR), DATE_ADD(NOW(), INTERVAL 6 HOUR), 3);

insert into events (name, description, end_date, createdAt, updatedAt, userId)
values("Retirement", "i am old enough", "2030-01-05", DATE_ADD(NOW(), INTERVAL 2 HOUR), DATE_ADD(NOW(), INTERVAL 6 HOUR), 4);

insert into events (name, description, end_date, createdAt, updatedAt, userId)
values("Promotion", "got a 5 cent raise", "2030-01-05", DATE_ADD(NOW(), INTERVAL 2 HOUR), DATE_ADD(NOW(), INTERVAL 6 HOUR), 4);

insert into events (name, description, end_date, createdAt, updatedAt, userId)
values("Sweet 16", "finally 16!", "2030-01-05", DATE_ADD(NOW(), INTERVAL 2 HOUR), DATE_ADD(NOW(), INTERVAL 6 HOUR), 5);

insert into events (name, description, end_date, createdAt, updatedAt, userId)
values("BBQ", "pls bring some food", "2030-01-05", DATE_ADD(NOW(), INTERVAL 2 HOUR), DATE_ADD(NOW(), INTERVAL 6 HOUR), 5);


-- add gifts to events
insert into `event-gifts` (createdAt, updatedAt, giftId, eventId)
values(NOW(), DATE_ADD(NOW(), INTERVAL 6 HOUR), 1, 1);

insert into `event-gifts` (createdAt, updatedAt, giftId, eventId)
values(NOW(), DATE_ADD(NOW(), INTERVAL 6 HOUR), 2, 2);

insert into `event-gifts` (createdAt, updatedAt, giftId, eventId)
values(NOW(), DATE_ADD(NOW(), INTERVAL 6 HOUR), 3, 3);

insert into `event-gifts` (createdAt, updatedAt, giftId, eventId)
values(NOW(), DATE_ADD(NOW(), INTERVAL 6 HOUR), 4, 4);

insert into `event-gifts` (createdAt, updatedAt, giftId, eventId)
values(NOW(), DATE_ADD(NOW(), INTERVAL 6 HOUR), 5, 5);

insert into `event-gifts` (createdAt, updatedAt, giftId, eventId)
values(NOW(), DATE_ADD(NOW(), INTERVAL 6 HOUR), 6, 6);

insert into `event-gifts` (createdAt, updatedAt, giftId, eventId)
values(NOW(), DATE_ADD(NOW(), INTERVAL 6 HOUR), 7, 7);

insert into `event-gifts` (createdAt, updatedAt, giftId, eventId)
values(NOW(), DATE_ADD(NOW(), INTERVAL 6 HOUR), 8, 8);

insert into `event-gifts` (createdAt, updatedAt, giftId, eventId)
values(NOW(), DATE_ADD(NOW(), INTERVAL 6 HOUR), 9, 9);

insert into `event-gifts` (createdAt, updatedAt, giftId, eventId)
values(NOW(), DATE_ADD(NOW(), INTERVAL 6 HOUR), 10, 10);