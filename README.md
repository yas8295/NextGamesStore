# eCommerce Next Games Store

Welcome to the eCommerce Games Store built with Next.js! This application offers a seamless shopping experience with features like user authentication, a cart, wishlist, checkout, and dedicated pages for orders and game categories.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Sign up and sign in to your account.
- **Cart**: Add games to the cart, view cart items, and update quantities.
- **Wishlist**: Save favorite games to your wishlist for future purchases.
- **Checkout**: A secure checkout process with payment integration.
- **Orders Page**: View past orders and their statuses.
- **Games Categories**: Browse games by categories.

## Demo

[Live Demo](https://nextgamesstore.vercel.app)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yas8295/NextGamesStore.git
    ```

2. Navigate to the project directory:

    ```bash
    cd NextGamesStore
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up environment variables:

    Create a `.env.local` file in the root of the project and add the necessary environment variables. Refer to the `.env.example` file for the required variables.

    ```env
    NEXT_PUBLIC_API_URL=<your-api-url>
    NEXT_PUBLIC_RAWG_API_KEY=<your-rawg-api-key>
    STRIPE_PUBLIC_KEY=<your-stripe-public-key>
    STRIPE_SECRET_KEY=<your-stripe-secret-key>
    ```

5. Run the development server:

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

- **Browse Games**: Navigate through various game categories to find your desired games.
- **User Authentication**: Sign up for a new account or sign in to an existing account.
- **Add to Cart/Wishlist**: Add games to your cart or wishlist for later purchase.
- **Checkout**: Proceed to checkout and complete the purchase using the integrated payment gateway.
- **View Orders**: Access your orders page to track your purchase history.

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **React**: JavaScript library for building user interfaces.
- **Next auth**: for authentication.
- **Stripe**: Payment processing platform.
- **Tailwind**: For styling the components.
- **Ant design**: React UI library that provides a set of high-quality components and tools .
- **Framer motion**: For animation and interactive with elements.
- **react-toastify**: For feedback message.
- **React query**: For making API requests.
- **MongoDB**: NoSQL database for storing data.
- **RAWG API**: For fetching game data.

