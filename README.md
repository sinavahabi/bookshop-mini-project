## Bookshop Application
***Technologies***: React JS, JavaScript, HTML5, CSS3, Tailwind, Sass, Axios, JSON-Server

***Topics***: react, javascript, git, sass, html5, css3, react-components, flexbox, form-validation, axios, error-handling, grid-layout, webapi, responsive-design, json-server, react-router-dom, responsive-website, tailwind, fontawesome5, react-hooks

## Instructions
**Create React App**

    npx create-react-app my-app

**Run Development Server**

    npm run start

**Install React Router Dom V6**

    npm install react-router-dom

   **Install Axios**

    npm install axios

**Install JSON-Server**

    npm install json-server
    
*package.json*
> "server-products": "json-server --watch database/products.json --port 5000"
> "server-users": "json-server --watch database/users.json --port 5001"

**Install uuid**

    npm install uuid
    
**Install Jalali Date**

    npm install jalali-date
    
**Install Crypto JS**

    npm install crypto-js

**Install Sass**

    npm install sass

**Install Font Awesome 5**

    npm i --save @fortawesome/free-solid-svg-icons
    npm i --save @fortawesome/free-regular-svg-icons
    npm i --save @fortawesome/free-brands-svg-icons

**Install Tailwind**

    npm install -D tailwindcss
    
**Setup Tailwind Config File**

    npx tailwindcss init

*tailwind.config.js*

    /** @type {import('tailwindcss').Config} */
    module.exports = {
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
    extend: {},
    },
    plugins: [],
    }
    
*index.scss*

    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    