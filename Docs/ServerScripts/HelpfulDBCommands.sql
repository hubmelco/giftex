# Schema Queries
drop schema wishwell;
create schema wishwell;
use wishwell;

# Table Queries
SELECT * FROM wishwell.gifts;
SELECT * FROM wishwell.users;
SELECT * FROM wishwell.events;
SELECT * FROM wishwell.events_gifts;
SELECT * FROM `user-relationships`;
SELECT * FROM wishwell.notifications;

delete from `user-relationships` where true = true; # Deletes all entries for user-relationships
delete from notifications where true = true; # Deletes all entries for notifications

# Queries for inserting a friend-request directly into the database
insert into notifications(id, sender, receiver, `type`, `read`, createdAt, updatedAt)
values(1, 1, 2, 'friend-request', 0,  NOW(), NOW());

insert into `user-relationships` (id, otherUserId, type, userId, createdAt, updatedAt)
values(1, 2, 'friend-request', 1 ,  NOW(), NOW());

