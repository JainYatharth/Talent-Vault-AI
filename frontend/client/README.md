# TalentVault - CV Repository Application

TalentVault is a modern web application designed to store, manage, and search through CV/resume documents efficiently. This application provides an intuitive interface for uploading, organizing, and retrieving candidate information.

## Features

- User authentication (Login/Signup)
- CV upload and management
- Advanced search functionality
- Interactive dashboard
- Modern and responsive UI built with React
- Beautiful styling with Tailwind CSS

## Tech Stack

- React.js
- Vite (Build tool)
- Tailwind CSS
- ESLint for code quality

## Prerequisites

Before you begin, ensure you have the following installed:
- npm (v6.0.0 or higher)
- Node.js (v14.0.0 or higher)

### Setting up React for the First Time

If you've never worked with React before, follow these steps to set it up:

1. Install Node.js:
   - Download Node.js from [https://nodejs.org/](https://nodejs.org/)
   - Choose the LTS (Long Term Support) version
   - Run the installer and follow the installation wizard
   - Verify installation by opening a terminal and running:
     ```bash
     node --version
     npm --version
     ```

2. Install Create React App globally (Optional):
   ```bash
   npm install -g create-react-app
   ```

3. Install Development Tools:
   - Install a code editor (we recommend Visual Studio Code)
   - Install the following VS Code extensions:
     - ES7+ React/Redux/React-Native snippets
     - ESLint

## Installation

1. Clone the repository:
```bash
git clone https://github.com/EwandzDigitalServices/TalentVault.git
cd talentVault/front-end/client
```

2. Install dependencies:
```bash
npm install
```

## Development

To start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
client/
├── src/
│   ├── assets/        # Static assets and icons
│   ├── components/    # Reusable UI components
│   ├── context/       # React context files
│   ├── pages/         # Application pages/routes
│   ├── services/      # API and service functions
│   ├── App.jsx        # Main application component
│   ├── index.css      # Global styles
│   └── main.jsx       # Application entry point
├── index.html
├── package.json
├── tailwind.config.js # Tailwind CSS configuration
└── vite.config.js     # Vite configuration
```

## Available Scripts

- `npm run dev` - Start development server

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
