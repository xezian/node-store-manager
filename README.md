# Hello, and welcome to Bamazon!
## 
#### "Bamazon is a CLI (Command Line Interface) App which allows tiered access to a store's database in MySQL"

## How do I use it?
#### Great question!  
## Setting up:
1. First, clone this repository into your directory of choice using `git clone git@github.com:xezian/node-store-manager.git` 
2. Second, type `npm install` in the command line in the directory you cloned the repo into
3. Third, run the `Query.sql` file as a query in your MySQL database management application.
## Running the program:
1. Bamazon Customer Tier
    * Run the program by typing `node bamazonCustomer.js`
    * Follow the prompts allowing you to purchase items from the store!
    
    ![Bamazon Customer](https://thumbs.gfycat.com/AgedDeadlyAmericanratsnake-size_restricted.gif)  
    [Full Screen Link](https://gfycat.com/gifs/detail/ageddeadlyamericanratsnake)
2. Bamazon Manager Tier
    * Run the program by typing `node bamazonManager.js`
    * Follow the prompts allowing you to:
        1. View current inventory
        2. Add to the inventory of existing products
        3. View all the items with low inventory (10 or fewer in stock)
        4. Add a new Product to an existing department (or a new department added by a supervisor)
        
    ![Bamazon Manager](https://thumbs.gfycat.com/SolidSneakyButterfly-size_restricted.gif)

    [Full Screen Link](https://gfycat.com/gifs/detail/solidsneakybutterfly)
3. Bamazon Supervisor Tier
    * Run the program by typing `node bamazonSupervisor.js`
    * Follow the prompts allowing you to:
        1. View a table showing all departments and compares the overhead with sales
        2. Create a new department (to which new products can be added by a manager)

    ![Bamazon Supervisor](https://thumbs.gfycat.com/GratefulAcclaimedAttwatersprairiechicken-size_restricted.gif) 
    
    [Full Screen Link](https://gfycat.com/gifs/detail/gratefulacclaimedattwatersprairiechicken)
## What is the point?
* "Bamazon" is of course a mock store for the purposes of illustrating the functionality of the app, but it's data could very easily be replaced with the MySQL database for a real live store that sells actual products
* Coding this was more of an exercise in communicating with MySQL using Node.js
* On that note, I appreciate any feedback or communication about the app itself or (even better) my code, including any ideas about how I can improve either.

## Thanks for swinging by, 
## and hang in there.

### Copyright
Jason A. Leo (c) 2018. All Rights Reserved.


