# E-Commerce App
A app made to practice NodeJS, Mongoose. 

routes: 

1. POST /api/v1/auth/register -> requires name, email, password and phoneno. The password is first hashed and then store in the database. You also need to specify your role as buyer or seller. A jwt token is generated.

2. POST /api/v1/auth/login -> requires email and password. If the email and password are correct, then a token is returned. From that token you can access the rest of the API endpoints. Otherwise not. 

3. POST /api/v1/auth/logout -> requires token. If the token is correct, then the token is deleted and the user gets logged out.

3. PATCH  /api/v1/auth/update-credentials -> requires field you want to update. You need to send it in the req.body.

4. Here we have many models connected to each other by ref. The models are: 
-  Buyer: name, email, password, phoneno, tokens.
-  Seller: name, email, password, phoneno, catalog(ref to Catalog), tokens.
-  Catalog: owner(ref to Seller), name, price.
-  Order: buyer(ref to Buyer), seller(ref to Seller), order(list of items if found in catalog of particular seller).

5. GET /api/v1/buyer/list-of-sellers -> returns a list of all the sellers in a paginated manner.

6. GET /api/v1/buyer/seller-catalog/:sellerid -> returns a list of all the items in the catalog of a particular seller.

7. POST /api/v1/buyer/create-order/:sellerid -> requires a list of items. The list of items should be presend in the seller catalog so that he can buy. After that validation, an order is created.

8. POST /api/v1/seller/create-catalog -> requires a list of items along with its name and price. If the catalog is already present then it will not be created. You need to update then.

9. GET /api/v1/seller/orders -> returns a list of all the orders recieved by the seller.

10. GET /api/v1/seller/catalog -> returns a list of all the items in the catalog of the particular seller.

There are many more endpoints. But these are the major one rest of update and deleting you can find in the code itself. 

Below is the .env file for the same 

PORT=3000
JWT_SECRET=hellohybrid
MONGODB_URL=mongodb://127.0.0.1:27017/ecommerce

- run the database in your local machine using  mongod --dbpath=/opt/homebrew/var/mongodb. Not sure about the windows. 



