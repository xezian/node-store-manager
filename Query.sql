DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  product_sales DECIMAL(10,2) DEFAULT 0,
  PRIMARY KEY (id)
);
CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(45) NULL,
  overhead_costs DECIMAL(10,2) NULL,
  PRIMARY KEY (department_id)
);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dragon Egg", "Top Shelf", 10000.00, 3), ("Complete Phoenix Ashes", "Top Shelf", 7500, 5), ("Slippers of Speed", "Top Shelf", 3333, 2), ("Insect Legs Various", "Potion Ingredients", 5.00, 250),("Powdered Glowworm", "Potion Ingredients", 7.50, 23), ("Fermented Alpine Moss", "Potion Ingredients", 5.50, 34), ("Fuzzelbub", "Pets", 65.00, 17),("Wibble","Pets",55.00,8),("Brawler Fish", "Pets",90.00,2),("Regular Broom", "Cleaning Supplies", 22.50, 18), ("Crystal Polish", "Cleaning Supplies", 17.00, 45), ("Age Increaser", "Potions", 40.00, 15), ("Age Reducer", "Potions", 40.00, 15), ("Glamourizer", "Potions", 33.33, 15), ("Stout Leather Boots", "Wardrobe", 131.31, 31), ("Goat Skin Knickers", "Wardrobe", 87.65, 3), ("Funky Hat", "Wardrobe", 23.45, 10);