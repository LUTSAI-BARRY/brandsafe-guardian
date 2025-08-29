# Overview

BrandSafe is a brand protection and piracy protection service designed for content creators. The application helps creators monitor, identify, and remove counterfeit content and copyright infringements across the web. It features automated DMCA takedowns, Google delisting capabilities, social media monitoring, and comprehensive reporting dashboards.

This is a full-stack web application built with React frontend and Express.js backend, utilizing PostgreSQL for data persistence and featuring a modern, responsive design with shadcn/ui components.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript in a Vite-based development environment
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query for server state and API data management
- **Forms**: React Hook Form with Zod validation via @hookform/resolvers

## Backend Architecture
- **Runtime**: Node.js with Express.js web framework
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API with /api prefix routing
- **Request Handling**: Express middleware for JSON parsing and request logging
- **Error Handling**: Centralized error handling middleware with structured error responses

## Development Setup
- **Build System**: Vite for frontend bundling, esbuild for backend compilation
- **Hot Reload**: Vite HMR integrated with Express server in development
- **TypeScript**: Unified configuration across client, server, and shared code
- **Path Mapping**: Alias resolution for clean imports (@/, @shared/, @assets/)

## Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: PostgreSQL with Neon Database serverless driver
- **Migrations**: Drizzle Kit for schema migrations
- **Schema**: Centralized schema definitions in shared directory
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development

## Authentication & Session Management
- **Session Store**: PostgreSQL-backed sessions using connect-pg-simple
- **Session Management**: Express sessions with secure configuration

## UI/UX Design
- **Design System**: Custom theme with CSS variables and Tailwind configuration
- **Responsive Design**: Mobile-first approach with breakpoint-aware components
- **Accessibility**: Radix UI primitives ensure ARIA compliance and keyboard navigation
- **Typography**: Inter font family with custom font loading
- **Color Scheme**: Neutral base with primary brand colors and semantic color tokens

# External Dependencies

## Database
- **Neon Database**: Serverless PostgreSQL provider (@neondatabase/serverless)
- **Connection**: PostgreSQL via DATABASE_URL environment variable

## UI Framework
- **Radix UI**: Complete suite of unstyled, accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Lucide React**: Icon library for consistent iconography
- **Embla Carousel**: Touch-friendly carousel component

## Development Tools
- **Vite**: Frontend build tool with React plugin
- **TypeScript**: Type safety across the entire stack
- **PostCSS**: CSS processing with Tailwind integration
- **ESBuild**: Fast JavaScript/TypeScript bundler for production builds

## Validation & Forms
- **Zod**: Runtime type validation and schema definition
- **React Hook Form**: Performant form library with validation integration
- **Drizzle Zod**: Auto-generated Zod schemas from Drizzle database schemas

## Utility Libraries
- **date-fns**: Date manipulation and formatting
- **class-variance-authority**: Component variant management
- **clsx & tailwind-merge**: Conditional CSS class handling
- **nanoid**: Unique ID generation

## Replit Integration
- **Replit Plugins**: Vite plugins for Replit-specific development features
- **Development Banner**: Replit development environment integration