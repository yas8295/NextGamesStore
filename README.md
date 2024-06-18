eCommerce Games Store
Welcome to the eCommerce Games Store built with Next.js! This application offers a seamless shopping experience with features like user authentication, a cart, wishlist, checkout, and dedicated pages for orders and game categories.

Table of Contents
Features
Demo
Installation
Usage
Technologies Used
Contributing
License
Features
User Authentication: Sign up and sign in to your account.
Cart: Add games to the cart, view cart items, and update quantities.
Wishlist: Save favorite games to your wishlist for future purchases.
Checkout: A secure checkout process with payment integration.
Orders Page: View past orders and their statuses.
Games Categories: Browse games by categories.
Fetch Games: Fetch game data from the RAWG API.
Demo
Live Demo

Installation
Clone the repository:
bash
Copy code
git clone https://github.com/yourusername/ecommerce-games-store.git
Navigate to the project directory:
bash
Copy code
cd ecommerce-games-store
Install dependencies:
bash
Copy code
npm install
Set up environment variables:
Create a .env.local file in the root of the project and add the necessary environment variables. Refer to the .env.example file for the required variables.

env
Copy code
NEXT_PUBLIC_API_URL=<your-api-url>
NEXT_PUBLIC_RAWG_API_KEY=<your-rawg-api-key>
STRIPE_PUBLIC_KEY=<your-stripe-public-key>
STRIPE_SECRET_KEY=<your-stripe-secret-key>
Run the development server:
bash
Copy code
npm run dev
Open http://localhost:3000 with your browser to see the result.

Usage
Browse Games: Navigate through various game categories to find your desired games.
User Authentication: Sign up for a new account or sign in to an existing account.
Add to Cart/Wishlist: Add games to your cart or wishlist for later purchase.
Checkout: Proceed to checkout and complete the purchase using the integrated payment gateway.
View Orders: Access your orders page to track your purchase history.
Technologies Used
Next.js: React framework for server-side rendering and static site generation.
React: JavaScript library for building user interfaces.
Stripe: Payment processing platform.
Styled-components: For styling the components.
Axios: For making API requests.
MongoDB: NoSQL database for storing data.
Mongoose: ODM for MongoDB.
RAWG API: For fetching game data.
Contributing
We welcome contributions! Please follow these steps:

Fork the repository.
Create a new branch:
bash
Copy code
git checkout -b feature/your-feature-name
Make your changes and commit them:
bash
Copy code
git commit -m 'Add some feature'
Push to the branch:
bash
Copy code
git push origin feature/your-feature-name
Open a pull request.
License
This project is licensed under the MIT License. See the LICENSE file for details.
