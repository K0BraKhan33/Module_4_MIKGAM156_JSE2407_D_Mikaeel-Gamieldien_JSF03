# Module_4_MIKGAM156_JSE2407_D_Mikaeel-Gamieldien_JSF03
# Vue Project

## Project Overview

This Vue project is designed for a product listing and detail view application with sorting and filtering functionalities. The project also integrates Tailwind CSS for styling and uses Vue Router for routing between components.

## Folder Structure

The project directory structure is as follows:

/src
/components
Filters.vue
ProductDetail.vue
ProductList.vue
SortControls.vue
/assets
/views
App.vue
main.js
/public
index.html
.gitignore
package.json
README.md
tailwind.config.js
vite.config.js

markdown
Copy code

## Installation

To get started with this project, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/yourrepository.git
    cd yourrepository
    ```

2. **Install the dependencies:**

    ```bash
    npm install
    ```

3. **Start the development server:**

    ```bash
    npm run dev
    ```

4. **Open the application in your browser:**

    Navigate to `http://localhost:5173` to view the application.

## Usage

### Product List

- The `ProductList.vue` component displays a list of products fetched from an API. 
- Products can be sorted by price or title and filtered by category using the `SortControls.vue` component.

### Product Detail

- The `ProductDetail.vue` component shows detailed information about a single product when selected from the product list.

### Sorting and Filtering

- The `SortControls.vue` component allows users to sort products by price or title and filter by category. It also includes a reset button to clear filters.

## API Integration

The project uses the following API endpoint to fetch product data:

- **API Endpoint:** `https://fakestoreapi.com/products`

## Components

### Filters.vue

Handles the filtering and sorting of products.

### ProductDetail.vue

Displays detailed information about a selected product.

### ProductList.vue

Shows a list of products and integrates with `SortControls.vue` for sorting and filtering.

### SortControls.vue

Provides sorting and filtering options for products. Includes reset functionality.

## Tailwind CSS

The project uses Tailwind CSS for styling. Ensure Tailwind CSS is installed and configured by following the setup instructions in the `tailwind.config.js` file.

## Vue Router

Vue Router is used for routing between `ProductList` and `ProductDetail` components. Ensure Vue Router is configured in `main.js`.

## Development

For development purposes, you can use the following commands:

- **Run Development Server:** `npm run dev`
- **Build for Production:** `npm run build`
- **Run Tests:** `npm test`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please follow the standard pull request workflow and ensure all tests pass before submitting.
