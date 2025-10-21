# 🛡️ BrandSafe - Brand Protection SaaS Platform

A full-stack SaaS application similar to branditscan.com, built with modern technologies for comprehensive brand protection and monitoring.

## 🚀 **LIVE DEMO**

**Frontend**: http://localhost:5000  
**API**: http://localhost:5000/api  
**Pricing Page**: http://localhost:5000/pricing

## ✨ **Features Implemented**

### 🎯 **Pricing Tiers**
- **🥉 Bronze Plan** - $29/month
  - Basic brand monitoring
  - 1 brand protected
  - Weekly reports
  - Email alerts
  - Basic support

- **🥈 Silver Plan** - $59/month
  - Advanced brand monitoring
  - Up to 3 brands
  - Daily monitoring
  - Priority alerts
  - Real-time notifications
  - Priority support
  - Basic analytics

- **🥇 Gold Plan** - $99/month
  - Comprehensive brand protection
  - Unlimited brands
  - Real-time monitoring
  - Advanced analytics
  - Custom alerts
  - 24/7 premium support
  - API access
  - White-label options

### 🛠️ **Technical Stack**

**Backend:**
- Express.js + TypeScript
- Drizzle ORM with PostgreSQL
- JWT Authentication
- RESTful API design

**Frontend:**
- React + TypeScript + Vite
- shadcn/ui components
- Tailwind CSS
- Wouter routing

**Database:**
- PostgreSQL with Drizzle ORM
- Graceful fallback for development

## 🎨 **Design Features**

- **Branditscan.com inspired** modern SaaS design
- **Responsive layout** - works on all devices
- **Clean UI** with shadcn/ui components
- **Gradient effects** and professional branding
- **Interactive elements** with hover animations
- **Plan comparison cards** with clear feature differentiation

## 🚀 **Quick Start**

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/LUTSAI-BARRY/brandsafe-guardian.git
   cd brandsafe-guardian
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/brandsafe_db
   JWT_SECRET=your-super-secret-jwt-key
   VITE_API_URL=http://localhost:5000/api
   PORT=5000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to http://localhost:5000

## 🔄 **User Flow**

1. **Visit Homepage** → See hero section with "Protect Your Brand Online"
2. **Browse Pricing** → View Bronze, Silver, Gold plans with features
3. **Select Plan** → Choose your preferred tier
4. **Sign Up** → Create account with selected plan displayed
5. **Access Dashboard** → View your plan and manage account
6. **Upgrade/Downgrade** → Change plans as needed

## 📁 **Project Structure**

```
brandsafe-guardian/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom hooks
│   │   └── lib/           # Utilities
├── server/                 # Express backend
│   ├── controllers/        # API controllers
│   ├── middleware/         # Auth middleware
│   └── routes.ts          # API routes
├── shared/                 # Shared schemas
├── db/                     # Database configuration
└── migrations/             # Database migrations
```

## 🔧 **API Endpoints**

- `GET /api/plans` - Fetch all pricing plans
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

## 🎯 **Key Features Completed**

✅ **Pricing System** - Complete Bronze/Silver/Gold tiers  
✅ **Modern UI** - Branditscan.com inspired design  
✅ **Authentication** - JWT-based auth system  
✅ **Dashboard** - User plan management  
✅ **Responsive Design** - Mobile-friendly layout  
✅ **API Integration** - Frontend-backend communication  
✅ **TypeScript** - Full type safety  
✅ **Error Handling** - Graceful fallbacks  
✅ **Database Ready** - PostgreSQL with Drizzle ORM  

## 🚀 **Deployment Ready**

The application is configured for easy deployment:

- **Environment variables** properly configured
- **Database migrations** ready with Drizzle
- **Build scripts** for production
- **Static file serving** configured
- **CORS and security** headers included

## 📝 **Recent Updates**

- ✅ Added comprehensive pricing tiers system
- ✅ Created dedicated pricing page with modern design
- ✅ Implemented plans API with fallback data
- ✅ Updated hero section to match branditscan.com
- ✅ Enhanced dashboard with plan display
- ✅ Fixed all TypeScript build errors
- ✅ Added plan selection flow
- ✅ Implemented graceful database handling
- ✅ Updated navigation and routing

## 🤝 **Contributing**

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ for brand protection and monitoring**
