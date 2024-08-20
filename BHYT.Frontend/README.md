# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Prerequisites

Use the `.env.template` file to create a `.env` file in the project root. Fill in the required environment variables:

```env
VITE_API_PROTOCOL=    # The protocol used by the API (e.g., http)
VITE_API_DOMAIN=      # The domain of the API (e.g., localhost)
VITE_API_PORT=        # The port on which the API is running (e.g., 8080)
VITE_API_ROOT_PATH=    # The root path of the API (e.g., /api/v1)
```

This project was created using the following:

- Node 20.10.0 (LTS) (Can be use with Node 18+)
- React ^18.2.0
- Vite ^5.0.0
- TypeScript ^5.3.2

Please note that while the application may work with other versions, these are the versions we know it works with, and using different versions may produce unexpected results.

## Expanding the ESLint configuration

The following configurations have been applied to the `.eslintrc.js` file:

- Configured the top-level `parserOptions` property as follows:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replaced `plugin:@typescript-eslint/recommended` with `plugin:@typescript-eslint/recommended-type-checked` (optionally `plugin:@typescript-eslint/strict-type-checked`)
- Added `plugin:@typescript-eslint/stylistic-type-checked` (optional)
- Installed [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) to dev dependencies and added `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Running the Web Application

To run the web application, open your terminal, navigate to the project directory, and run the following commands:

1. Install the necessary dependencies:

```bash
npm install
```

2. Run the application:

```bash
npm run dev
```

## Contributing

See [the contributing guide](CONTRIBUTING.md) for detailed instructions on how to get involved with the project.
