# OpenDesk 🚀

> A modern, collaborative project and task management platform built with cutting-edge technologies.

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-5.1-90c53f?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.19-13aa52?logo=mongodb)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## ✨ Features

- 📋 **Project Management** - Create, organize, and manage projects effortlessly
- ✅ **Task Tracking** - Break down projects into manageable tasks with real-time updates
- 👥 **User Authentication** - Secure authentication powered by Clerk
- 🔐 **Authorization & Middleware** - Role-based access control with JWT tokens
- 🎨 **Modern UI** - Beautiful, responsive interface built with Tailwind CSS and Radix UI
- 🔗 **GitHub Integration** - Automatic language detection for GitHub projects
- ⚡ **Real-time Updates** - Instant synchronization across all connected clients
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices

## 🏗️ Tech Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) 16.0 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + PostCSS
- **UI Components**: Radix UI with custom components
- **Icons**: Lucide React
- **Authentication**: Clerk Next.js
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 5.1
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Clerk SDK + JWT
- **Security**: bcrypt, CORS, dotenv
- **Development**: Nodemon for hot-reload
- **HTTP Client**: Axios

## 📦 Project Structure

```
opendesk/
├── client/                          # Next.js frontend application
│   ├── app/
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Home page
│   │   ├── about/                  # About page
│   │   ├── projects/               # Projects management
│   │   │   ├── page.tsx
│   │   │   ├── ProjectList.tsx
│   │   │   ├── ProjectForm.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── [id]/               # Project detail page
│   │   │   │   ├── page.tsx
│   │   │   │   ├── TaskList.tsx
│   │   │   │   ├── TaskForm.tsx
│   │   │   │   └── TaskItem.tsx
│   │   │   └── explore/            # Explore projects
│   │   └── components/
│   │       ├── Home.tsx
│   │       └── Navbar.tsx
│   ├── components/                 # Reusable UI components
│   │   └── ui/                     # Radix UI components
│   ├── lib/
│   │   └── utils.ts
│   ├── public/                     # Static assets
│   └── package.json
├── server/                         # Express.js backend
│   ├── index.js                    # Server entry point
│   ├── middleware/
│   │   └── auth.js                 # Authentication middleware
│   ├── models/                     # Mongoose models
│   │   ├── Project.js
│   │   ├── Task.js
│   │   └── User.js
│   ├── routes/                     # API routes
│   │   ├── projectRoutes.js
│   │   └── taskRoutes.js
│   ├── utils/
│   │   └── detectGithubLanguage.js
│   └── package.json
└── package.json                    # Root package configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager
- MongoDB instance (local or cloud)
- Clerk account (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/opendesk.git
   cd opendesk
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create `.env.local` in the `client/` directory:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
   CLERK_SECRET_KEY=your_clerk_secret
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

   Create `.env` in the `server/` directory:
   ```env
   PORT=3001
   MONGODB_URI=your_mongodb_connection_string
   CLERK_API_KEY=your_clerk_api_key
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   This will start both the client (http://localhost:3000) and server (http://localhost:3001) concurrently.

## 📖 Usage

### Creating a Project
1. Navigate to the Projects page
2. Click "New Project"
3. Fill in project details
4. Click "Create"

### Managing Tasks
1. Open a project
2. Click "Add Task"
3. Set task details and priority
4. Track progress in real-time

### Exploring Projects
1. Visit the Explore section
2. Browse community projects
3. Collaborate with team members

## 🔌 API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create a new project
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get task details
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Write clear commit messages
- Test your changes before submitting PR
- Update documentation as needed

## 🧪 Testing

```bash
# Run tests
npm run test

# Run linting
npm run lint

# Build for production
npm run build
```

## 📚 Documentation

- [Client Documentation](client/README.md)
- [Server Documentation](server/README.md)
- [API Documentation](docs/API.md)

## 🐛 Bug Reports

Found a bug? Please open an issue with:
- Clear description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)

## 💡 Feature Requests

Have an idea? We'd love to hear it! Open an issue with:
- Clear description of the feature
- Use case and benefits
- Any relevant mockups or examples

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [GitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Express.js](https://expressjs.com/) - Web framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Clerk](https://clerk.com/) - Authentication
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Radix UI](https://www.radix-ui.com/) - Component library

## 📞 Support

For support, email support@opendesk.com or open an issue on GitHub.

---

<div align="center">

Made with ❤️ by the OpenDesk team

[⭐ Star us on GitHub](https://github.com/yourusername/opendesk)

</div>
