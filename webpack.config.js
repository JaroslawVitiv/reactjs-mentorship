import path from 'path';
import { fileURLToPath } from 'url';

// Convert the current module URL to a file path
const __filename = fileURLToPath(import.meta.url);
// Get the directory name from the file path
const __dirname = path.dirname(__filename);

// This is the main Webpack configuration object.
const config = {
  // Set the mode to 'development'. Other options are 'production' and 'none'.
  // This helps Webpack to optimize the bundle accordingly.
  mode: 'development',

  // The entry point of your application.
  // Webpack starts bundling from this file.
  entry: './src/index.tsx',

  // The output configuration tells Webpack where to emit the bundles.
  output: {
    // The filename of the main output file.
    filename: 'bundle.js',
    // The absolute path to the output directory.
    // 'path.resolve' creates an absolute path from the current directory.
    path: path.resolve(__dirname, 'dist'),
  },

  // Module rules determine how different types of files are handled.
  module: {
    rules: [
      {
        // Use a regular expression to match all files ending with .ts or .tsx.
        test: /\.tsx?$/,
        // Use 'ts-loader' to transpile TypeScript to JavaScript.
        // The 'exclude' property prevents the loader from processing files in the 'node_modules' directory.
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  // Resolve options tell Webpack how to resolve modules.
  resolve: {
    // This allows you to import modules without specifying their file extensions.
    // For example, you can write `import MyModule from './MyModule'` instead of `import MyModule from './MyModule.ts'`.
    extensions: ['.tsx', '.ts', '.js'],
  },

  // The devtool option controls if and how source maps are generated.
  // 'inline-source-map' is a good choice for development as it provides mapping from bundled to original code.
  devtool: 'inline-source-map',

  // The webpack-dev-server configuration.
  devServer: {
    // This tells the server to serve files from the 'dist' directory.
    static: './dist',
    // The port number for the development server.
    port: 8080,
    // Open the browser automatically when the server starts.
    open: true,
  },
};

export default config;
