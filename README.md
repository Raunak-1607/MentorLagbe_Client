# MentorLagbe

**MentorLagbe** is a full-stack tuition management platform that connects students with tutors in Bangladesh. Students can discover and apply for tuition listings, while tutors can post and manage their classes — all within a role-based dashboard system backed by secure authentication and payment integration.

---

## 🌐 Live URL

🔗 [https://mentor-lagbe-client-phi.vercel.app/](https://mentor-lagbe-client-phi.vercel.app/)

---

## 🔐 Admin Credentials

| Field    | Value                   |
|----------|-------------------------|
| Email    | `biltu@gmail.com`       |
| Password | `123456`                |

---

## 🛠️ Technologies Used

### Frontend
| Technology | Purpose |
|---|---|
| **Next.js 16** | React framework with App Router, SSR & SSG |
| **React 19** | UI component library |
| **TypeScript** | Type-safe development |
| **Tailwind CSS v4** | Utility-first styling |
| **Shadcn/UI** | Accessible component library |
| **HeroUI** | Toast notifications & UI components |
| **Base UI** | Headless UI primitives |
| **Lucide React** | Icon library |
| **Recharts** | Charts & analytics |
| **Embla Carousel** | Carousel/slider component |

### Backend & Auth
| Technology | Purpose |
|---|---|
| **Better Auth** | Full-stack authentication (email/password + Google OAuth) |
| **MongoDB** | NoSQL database for users, tuitions, applications |
| **Better Auth Mongo Adapter** | MongoDB adapter for Better Auth sessions |

### Payments
| Technology | Purpose |
|---|---|
| **Stripe** | Payment processing for Pro plan subscriptions |
| **@stripe/stripe-js** | Stripe client-side SDK |

### Media
| Technology | Purpose |
|---|---|
| **ImgBB API** | Direct image file upload for profile photos and tuition banners |

---

## ✨ Key Features

### 🧑‍🎓 Student Features
- Browse and search all available tuition listings
- View detailed tuition pages (subject, fee, schedule, tutor info)
- Apply for tuitions with one click
- Track all submitted applications and their status (pending / accepted / rejected)
- Upgrade to **Pro plan** via Stripe for unlimited applications
- Update profile photo (direct upload via ImgBB)

### 📚 Tutor Features
- Post new tuition listings with title, subject, class, mode, location, fee, schedule, and banner image
- Upload banner images directly via ImgBB API (no URL pasting needed)
- **Free plan**: up to 2 tuition posts; **Pro plan**: unlimited posts
- Manage posted tuitions — view, edit status
- View and manage all student applicants per tuition
- Accept or reject student applications
- Update profile photo (direct ImgBB upload)

### 🛡️ Admin Features
- View all users (students and tutors) on the platform
- **Approve or reject** tuition listings submitted by tutors
- Monitor all transactions and payment history
- Update admin profile photo

### 🔐 Authentication
- Email & password sign-up with role selection (Student / Tutor)
- **Google OAuth** sign-in with post-auth onboarding for role selection
- Auto sign-in after registration — no need to log in twice
- JWT-based session tokens via Better Auth
- Redirect guards: authenticated users are redirected away from sign-in/sign-up pages

### 💳 Subscription Plans
| Plan | Tutor Posts | Student Applications |
|---|---|---|
| Free | Up to 2 | Standard |
| Pro | Unlimited | Priority |

---

## 📦 NPM Packages Used

### Dependencies
| Package | Version | Description |
|---|---|---|
| `next` | ^16.4.6 | Full-stack React framework |
| `react` | 19.3.0 | UI library |
| `react-dom` | 19.3.0 | React DOM renderer |
| `typescript` | ^5 | TypeScript language support |
| `better-auth` | ^1.7.26 | Authentication framework |
| `@better-auth/mongo-adapter` | ^1.7.26 | MongoDB adapter for Better Auth |
| `mongodb` | ^7.9.0 | MongoDB Node.js driver |
| `stripe` | ^23.2.0 | Stripe server-side SDK |
| `@stripe/stripe-js` | ^10.3.0 | Stripe client-side SDK |
| `@heroui/react` | ^3.2.7 | Toast & UI components |
| `@heroui/styles` | ^3.2.7 | HeroUI styles |
| `@base-ui/react` | ^1.9.0 | Headless UI primitives |
| `@shadcn/react` | ^0.3.1 | Shadcn UI components |
| `shadcn` | ^4.23.0 | Shadcn CLI |
| `lucide-react` | ^1.75.0 | Icon set |
| `tailwindcss` | 4.3.3 | CSS utility framework |
| `tw-animate-css` | ^1.4.0 | Tailwind animation utilities |
| `class-variance-authority` | ^0.7.1 | Variant-based className utility |
| `cn` | ^0.5.2 | ClassName merge helper |
| `recharts` | ^3.8.0 | Charting library |
| `embla-carousel-react` | ^8.6.0 | Carousel/slider |
| `react-day-picker` | ^10.0.2 | Date picker component |
| `react-resizable-panels` | ^4.24.1 | Resizable panel layouts |
| `cmdk` | ^1.1.1 | Command menu component |
| `input-otp` | ^1.5.0 | OTP input component |
| `date-fns` | ^4.4.0 | Date utility library |
| `shiki` | ^4.6.0 | Syntax highlighter |

### Dev Dependencies
| Package | Version | Description |
|---|---|---|
| `@tailwindcss/turbopack` | 4.3.3 | Tailwind + Turbopack integration |
| `eslint` | ^9 | JavaScript/TypeScript linter |
| `eslint-config-next` | 16.4.6 | Next.js ESLint config |
| `babel-plugin-react-compiler` | 1.0.0 | React compiler Babel plugin |
| `@types/node` | ^20 | Node.js type definitions |
| `@types/react` | ^19 | React type definitions |
| `@types/react-dom` | ^19 | React DOM type definitions |

---

## 🗂️ Project Structure

```
src/
├── app/
│   ├── (Auth)/
│   │   ├── SignIn/         # Sign-in page with Google OAuth
│   │   └── SignUp/         # Sign-up page with role selection
│   ├── AllTuition/         # Public tuition listings
│   │   └── [id]/           # Individual tuition detail page
│   ├── dashboard/
│   │   ├── admin/          # Admin dashboard (users, approvals, transactions)
│   │   ├── student/        # Student dashboard (applications, profile, pricing)
│   │   └── Tutor/          # Tutor dashboard (post, manage, applicants, pricing)
│   ├── onboarding/         # Google sign-in role & phone setup
│   ├── how-it-works/       # Public info page
│   ├── pricing/            # Public pricing page
│   └── api/                # API routes (auth, tuitions, checkout, users)
├── components/             # Shared UI components
├── lib/                    # Auth, DB, helpers, server actions
└── types/                  # TypeScript type definitions
```

---

## 🚀 Running Locally

```bash
# Clone the repository
git clone https://github.com/Raunak-1607/MentorLagbe_Client.git
cd MentorLagbe_Client

# Install dependencies
npm install

# Set up environment variables (copy and fill in .env)
cp .env.example .env

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Required Environment Variables

```env
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URL=
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_IMGBB_API_KEY=
```
