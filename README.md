# My Next.js File Upload Application

This project is a file upload application built with Next.js. It allows users to upload files, view a list of uploaded files, and download them. The application uses SQLite for storing file metadata.

## Features

- File upload functionality
- List of uploaded files
- File download capability

## Project Structure

```
my-nextjs-upload-app
├── app
│   ├── page.tsx          # Main entry point for the application
│   └── api
│       ├── upload
│       │   └── route.ts  # Handles file uploads
│       ├── files
│       │   └── route.ts  # Retrieves list of uploaded files
│       └── download
│           └── route.ts  # Handles file downloads
├── lib
│   └── db.ts             # Database connection and setup
├── uploads                # Directory for storing uploaded files
├── public                 # Directory for static assets
├── package.json           # npm configuration file
├── next.config.js        # Next.js configuration settings
├── tsconfig.json         # TypeScript configuration file
├── .env.local            # Environment variables
└── README.md             # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd my-nextjs-upload-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file in the root directory and configure your environment variables as needed.

## Usage

1. Start the development server:
   ```
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000` to access the application.

## Contributing

Feel free to submit issues or pull requests for any improvements or bug fixes.