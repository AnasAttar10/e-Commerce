# eCommerce Project !
The eCommerce Project is a web application built with [typescript , react and json server as backend ] where users can browse categories , products, add items to the cart,
make purchases and can add the items to the wishlist.

## live Demo :
https://www.youtube.com/watch?v=QgQCosCiqo0&t=8s

# Installation
To run the eCommerce Project, Follow these steps to install and set up the project:
   1. Clone the repository
   2. Install dependencies: npm install
   3. Start the application : npm run dev

## Registration Page :
Registration  page enables users to independently register and gain access to system by enter userName and email , password .

## Login Page :
The Login page provides authentication functionality. Users can log in using their credentials to access the application. 

## Categories Page :
The Categories page lists all product categories in the system. you can choose your favorite category to explore it  .

## Products Page :
The Products page displays a list of all products in the system. you can perform the following actions:
 1. View products details, including the product name, image, price, is Arrived to max limit , is liked  .
 2. add the product to your cart , if the product arrived to the max limit we will prevent the user from adding this product to his cart again by change "add button" status to disabled . 
 3. add/remove the product to/from your wishlist
 4.  when you add product to your cart/wishlist the number of products in your cart/wishlist will show in the header .

## cart Page :
  1. cart page will lists the products 
  2. Change the quantity of added products.
  3. Remove products from the cart.
  4. show the total
  5. cart page has a checkout button to finalize the purchase.
     
## Wishlist Page :
The wishlist page lists all your favorite products in the system. 

## Profile Page :
The Profile page show the account information  .

## Orders Page :
The Orders page lists all your orders in the system. you can choose any order to see all information about it  .

# Technologies Used :- 
   1. Frontend : Html , Css  , typescript ,  React , React presist , React-router-dom , Redux-selectors , Redux-tolkit (rtq query to handle requests ) , react-hook-form , zod validation.
   2. Backend : json-server-auth .
   3. other : git .

# skills :
  1. I used app skeleton to show my components in loading status .
  2. optimiszation : prevent unnessary re-rendering + divied the components in best way .
  3. I used some Design patterns .
  4. I used Daynamic Components Idea .
  5. Guards and protected routes
