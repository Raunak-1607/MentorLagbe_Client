# 🎓 MentorLagbe — Tuition & Mentorship Management Platform

**MentorLagbe** is a comprehensive, production-grade tuition and mentorship management ecosystem designed to bridge the gap between students seeking quality education and qualified tutors offering specialized guidance across Bangladesh. Built with modern full-stack web technologies, MentorLagbe streamlines the entire tuition lifecycle — from posting listings and student applications to rigorous administrative moderation, role-based dashboards, verified credentials, and secure subscription payments.

### 🌟 Project Purpose & Core Vision
In conventional tutoring marketplaces, finding verified tutors and credible student listings often lacks structure, safety, and transparency. MentorLagbe solves this by introducing:
- **A Structured Multi-Tier Ecosystem**: Seamless separation of concerns across Students, Tutors, and Platform Administrators.
- **Strict Quality Control & Moderation**: No tuition post goes live without administrative verification, preventing spam and maintaining high academic standards.
- **Fair & Monetized Access**: A freemium model powered by Stripe that balances free entry with scalable Pro subscriptions for power educators.
- **Modern Cloud Media Pipeline**: Zero manual URL pasting with direct-to-cloud image processing via ImgBB for avatars and classroom banners.

---

### 🛡️ The Administrator's Role in MentorLagbe
The **Admin** serves as the central governing authority, guardian of platform integrity, and operational manager of MentorLagbe. Because tuition arrangements involve financial commitments and academic quality, the platform gives Administrators comprehensive supervisory and enforcement tools:

1. **Tuition Listing Moderation & Gatekeeping**:
   - Tutors cannot directly publish listings to the public search catalog. Every newly submitted tuition post enters a **Pending** review queue.
   - Administrators review post details (subject, syllabus, class level, monthly fee, schedule, and uploaded banner imagery).
   - Admins can **Approve** legitimate listings (making them instantly discoverable on `/AllTuition`) or **Reject** inappropriate, incomplete, or spam listings with real-time status synchronization.

2. **User Governance & Role Administration**:
   - Centralized oversight of all registered accounts (Students, Tutors, and staff).
   - Direct capability to view user profiles, registration details, and assigned roles.
   - Ability to modify user privileges and roles (e.g., reassigning or upgrading user roles between Student, Tutor, and Admin) to resolve user misconfigurations or grant elevated privileges.

3. **Financial & Revenue Auditing**:
   - Real-time tracking of all incoming Stripe payments and Pro subscription transactions.
   - Audit trail connecting payment IDs, user identifiers, transaction timestamps, and payment statuses (Success / Failed).
   - Ensures platform subscription revenue transparency and seamless dispute resolution.

4. **Platform Analytics & Health Monitoring**:
   - Dedicated administrative dashboard presenting vital platform metrics at a glance:
     - Total registered user volume and student-to-tutor breakdown
     - Ratio of Free vs. Pro upgraded tutors
     - Queue count of pending approvals vs. active, approved tuition posts
     - Platform-wide listing engagement and application flow.

---

## 🌐 Live URL

🔗 [https://mentor-lagbe-client-phi.vercel.app/](https://mentor-lagbe-client-phi.vercel.app/)

---

## 🔐 Admin Credentials

| Field    | Value                   |
|----------|-------------------------|
| Email    | `biltu@gmail.com`       |
| Password | `Abcdefgh123`                |

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

### 🛡️ Admin Features & Governance Controls
- **Listing Moderation Engine**: Filter listings by `All`, `Pending`, `Approved`, or `Rejected`. Perform 1-click approvals or rejections to control public visibility on `/AllTuition`.
- **User Management & Role Switching**: Full registry view of registered users; capability to dynamically update or correct user roles (Student ⇄ Tutor ⇄ Admin) directly from the dashboard.
- **Financial Audit & Transaction Logs**: Complete record of Stripe subscription events, customer emails, amounts, transaction statuses, and verification logs.
- **Platform Analytics Hub**: High-level statistical summaries detailing user distributions, Pro conversion metrics, and active listing counts.
- **Profile & Brand Management**: Dedicated admin profile management with direct ImgBB photo upload and real-time session caching.

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
