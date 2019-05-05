create table operation_types
(
    id          integer primary key AUTOINCREMENT,
    title       varchar(255) not null,
    description text         null
);

INSERT INTO operation_types (id, title, description)
VALUES (1, 'Наращивание ресниц', 'Наращивание ресниц. Длительность от 2 часов.');
INSERT INTO operation_types (id, title, description)
VALUES (2, 'Снятие ресниц', 'Снятие ресниц. Занимает в среднем от 30 минут.');
INSERT INTO operation_types (id, title, description)
VALUES (3, 'Снятие + наращивание ресниц', 'Сначала происходит снятие ресниц, потому уже клиенту наращиваются новые.');

create table clients
(
    id           integer primary key AUTOINCREMENT,
    firstName    varchar(80)  not null,
    lastName     varchar(80)  null,
    nickname     varchar(255) null,
    internetLink text         null,
    phoneNumber  varchar(13)  null,
    avatarPath   text         null,
    status       varchar(13)  not null
);

INSERT INTO clients (id, firstName, lastName, nickname, internetLink, phoneNumber, avatarPath, status)
VALUES (1, 'Екатерина', 'Клочкова', null, 'https://vk.com/ytkonos_perry', '+375255168496', null, 'ACTIVE');


CREATE TABLE operations
(
    id              integer primary key AUTOINCREMENT,
    operationTypeId integer     not null,
    clientId        integer     not null,
    date            date        not null,
    startTime       time        not null,
    finishTime      time        not null,
    price           decimal     not null,
    comment         text        null,
    status          varchar(13) not null
)