# WDP Client - Construction Materials Platform

WDP Client là một ứng dụng web hiện đại được xây dựng để quản lý và phân phối vật liệu xây dựng cao cấp. Dự án sử dụng các công nghệ frontend tiên tiến nhất để mang lại trải nghiệm người dùng tối ưu.

## 🚀 Công nghệ Frontend

Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue npm cache

### Framework & Runtime

- **[Next.js 15.5.3](https://nextjs.org)** - React framework với App Router
  - Server-side rendering (SSR)
  - Static site generation (SSG)
  - API routes
  - Image optimization
  - Font optimization với Geist fonts
- **[React 19.1.0](https://react.dev)** - Thư viện UI component
- **[React DOM 19.1.0](https://react.dev)** - React renderer cho web
- **[TypeScript 5](https://www.typescriptlang.org)** - Type-safe JavaScript

### Styling & UI

- **[Tailwind CSS 4.1.13](https://tailwindcss.com)** - Utility-first CSS framework
  - Custom design system với CSS variables
  - Dark/Light theme support
  - Responsive design
- **[PostCSS 8.5.6](https://postcss.org)** - CSS transformation tool
- **[clsx 2.1.1](https://github.com/lukeed/clsx)** - Conditional className utility
- **[tailwind-merge 3.3.1](https://github.com/dcastil/tailwind-merge)** - Merge Tailwind classes
- **[Lucide React 0.544.0](https://lucide.dev)** - Icon library

### State Management

- **[Redux Toolkit 2.9.0](https://redux-toolkit.js.org)** - State management
  - RTK Query cho data fetching
  - createSlice cho reducers
  - configureStore setup
- **[React Redux 9.2.0](https://react-redux.js.org)** - React bindings cho Redux
- **Context API** - Local state management cho Auth và Theme

### Form Management & Validation

- **[React Hook Form 7.62.0](https://react-hook-form.com)** - Performant form library
- **[Yup 1.7.0](https://github.com/jquense/yup)** - Schema validation

### Animation & Motion

- **[Motion 12.23.13](https://motion.dev)** - Animation library cho React

### Development Tools

- **[ESLint 9](https://eslint.org)** - Code linting
  - Next.js ESLint config
  - TypeScript ESLint rules
- **[Husky 9.1.7](https://typicode.github.io/husky)** - Git hooks
- **[Commitlint](https://commitlint.js.org)** - Commit message linting
  - Conventional commits standard
- **[Turbopack](https://turbo.build/pack)** - Fast build tool

## 🏗️ Kiến trúc Dự án

### Folder Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (authenticated)/   # Protected routes
│   ├── (unauthenticated)/ # Public routes
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── common/           # Common components
│   ├── form/             # Form components
│   ├── layouts/          # Layout components
│   └── ui/               # Base UI components
├── features/             # Feature-based modules
├── hooks/                # Custom React hooks
├── redux/                # Redux store & slices
├── services/             # API services
├── contexts/             # React contexts
└── lib/                  # Utilities & helpers
```

### Design Patterns

- **Feature-based Architecture**: Tổ chức code theo tính năng
- **Compound Components**: Component composition patterns
- **Custom Hooks**: Logic tái sử dụng
- **Provider Pattern**: Context và state management
- **Repository Pattern**: API service layer

### TypeScript Configuration

- **Strict Mode**: Type safety tối đa
- **Path Mapping**: Import aliases (@/, @/components, etc.)
- **Module Resolution**: Bundler resolution strategy
- **JSX**: Preserve mode cho Next.js

## 🎨 Design System

### Theme System

- **CSS Variables**: Custom properties cho theming
- **Dark/Light Mode**: Automatic theme switching
- **Color Palette**: Consistent color system
- **Typography**: Geist font family optimization

### Component Library

- **Form Components**: TextField, SelectField, TextAreaField
- **Layout Components**: Header, Footer, Navigation
- **Common Components**: Logo, modals, buttons
- **Authentication Components**: Login/Register forms

## 🔐 Authentication & Security

### Authentication Flow

- **JWT Token Management**: Secure token storage
- **Refresh Token Strategy**: Automatic token renewal
- **Role-based Access Control**: Admin/User permissions
- **Route Protection**: Authentication guards

### Security Features

- **Secure Storage**: Encrypted local storage
- **CORS Configuration**: API security
- **Input Validation**: Client-side validation
- **XSS Protection**: Sanitized inputs

## 📱 Features

### Core Functionality

- **User Authentication**: Login, Register, Forgot Password
- **Materials Management**: Product catalog & inventory
- **Admin Dashboard**: Administrative interface
- **Responsive Design**: Mobile-first approach
- **Internationalization**: Multi-language support (i18n ready)

### User Experience

- **Loading States**: Skeleton screens & spinners
- **Error Handling**: User-friendly error messages
- **Form Validation**: Real-time validation feedback
- **Accessibility**: WCAG compliance
- **Performance**: Optimized images & fonts

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm/yarn/pnpm

### Installation

```bash
# Clone repository
git clone <repository-url>
cd wdp-client

# Install dependencies
npm install

# Run development server
npm run dev
```

### Available Scripts

```bash
npm run dev      # Development server with Turbopack
npm run build    # Production build with Turbopack
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Environment Setup

```env
# Add environment variables
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_APP_ENV=development
```

## 🔧 Development Workflow

### Code Quality

- **Pre-commit Hooks**: Automated linting & formatting
- **Conventional Commits**: Standardized commit messages
- **Type Safety**: Full TypeScript coverage
- **ESLint Rules**: Consistent code style

### Testing Strategy

- **Unit Testing**: Component testing
- **Integration Testing**: API integration
- **E2E Testing**: User flow testing
- **Performance Testing**: Core Web Vitals

## 📖 Documentation

### Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org)

### API Documentation

- RESTful API endpoints
- Authentication flow
- Error handling
- Rate limiting

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Deploy to Vercel
vercel --prod
```

### Docker

```dockerfile
# Multi-stage build for production
FROM node:20-alpine AS builder
# ... build configuration
```

### Environment Variables

- Production environment setup
- API endpoints configuration
- Feature flags management

## 🤝 Contributing

### Development Guidelines

1. Follow TypeScript best practices
2. Write meaningful commit messages
3. Add proper type definitions
4. Test your changes thoroughly
5. Update documentation as needed

### Code Review Process

- Feature branch workflow
- Pull request templates
- Automated testing
- Code review checklist

Code with Nhan Bernie with love
