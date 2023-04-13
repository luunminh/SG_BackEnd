use nodejs;
show tables;


create table Item(item_id INT AUTO_INCREMENT, name VARCHAR(244) NOT NULL, quantity INT, CHECK (quantity > 0), 
category INT, PRIMARY KEY(item_id),
 FOREIGN KEY(category) REFERENCES category(category_id));
 select * from Item;
 insert into category(category_id, name) values (1,'Ao'), (2,'Quan'), (3,'Vay');
 
insert into Item(name, quantity, category) values ('Ao thun', 1, 1) ,
 ('Ao dai',5,1), ('Quan dui',3,2), ('Mu bao hiem',6,NULL);
 
 select * from Item;
 
 
 select SUM(quantity), category.name from category inner join Item on 
 Item.category = category.category_id GROUP BY category.category_id;
