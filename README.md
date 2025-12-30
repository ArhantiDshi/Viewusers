# 🎨 User Directory - Modern Next.js Application

A beautiful, feature-rich user management application built with Next.js 16, React 19, TypeScript, Tailwind CSS 4, and Framer Motion.

## ✨ Features

### 🔥 Full CRUD Operations
- **Create**: Add new users with a beautiful animated form
- **Read**: View all users in an elegant card grid layout
- **Update**: Edit user details with the same intuitive form
- **Delete**: Remove users with confirmation dialog

### 🎭 Smooth Animations
- **Page Transitions**: Smooth fade and slide animations using Framer Motion
- **Card Animations**: Staggered entry animations for user cards
- **Hover Effects**: Interactive scale and shadow effects on hover
- **Form Animations**: Modal entrance/exit animations with backdrop blur
- **Loading States**: Animated spinners and skeleton states

### 🎨 Beautiful Tailwind CSS Styling
- **Gradient Backgrounds**: Eye-catching gradient overlays
- **Modern Cards**: Rounded corners with elevation shadows
- **Responsive Design**: Mobile-first design that works on all devices
- **Color Schemes**: Consistent color palette with blue, purple, and indigo gradients
- **Interactive Elements**: Hover states, focus rings, and transitions

### 📱 Additional Features
- **Form Validation**: Email format validation and required field checks
- **Error Handling**: Graceful error states with user-friendly messages
- **Empty States**: Beautiful placeholders when no users exist
- **Interactive Counter**: Fun counter component with animations
- **Responsive Layout**: Grid system that adapts to screen size

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies
```bash
npm install
```

2. Run the development server
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result

## 📁 Project Structure

```
user-directory/
├── app/
│   ├── api/
│   │   └── users/
│   │       ├── route.ts              # GET all users, POST new user
│   │       └── [id]/
│   │           └── route.ts          # GET, PUT, DELETE user by ID
│   ├── users/
│   │   └── [id]/
│   │       ├── page.tsx              # User detail page
│   │       └── loading.tsx           # Loading state
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Home page with user list
│   └── globals.css                   # Global styles
├── components/
│   ├── Counter.tsx                   # Interactive counter component
│   ├── UserCard.tsx                  # User card with actions
│   └── UserForm.tsx                  # Create/Edit user form
└── public/                           # Static assets
```

## 🎯 API Routes

### GET `/api/users`
Fetch all users

### POST `/api/users`
Create a new user
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 234 567 8900",
  "website": "https://example.com"
}
```

### GET `/api/users/[id]`
Fetch a single user by ID

### PUT `/api/users/[id]`
Update a user by ID

### DELETE `/api/users/[id]`
Delete a user by ID

## 🛠️ Technologies Used

- **Framework**: Next.js 16.1.1
- **UI Library**: React 19.2.3
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **API**: Next.js App Router API Routes

## 🎨 Key Components

### UserCard
- Displays user information in a beautiful card
- Hover effects reveal edit and delete buttons
- Gradient background with decorative elements
- Responsive design

### UserForm
- Modal form for creating and editing users
- Form validation with error messages
- Backdrop blur effect
- Smooth entrance and exit animations

### Counter
- Interactive counter with increment/decrement
- Animated number transitions
- Reset functionality
- Gradient buttons with hover effects

## 📝 Features in Detail

### Animations
All animations are powered by Framer Motion:
- `initial`: Starting state
- `animate`: Target state
- `exit`: Exit state
- `whileHover`: Hover interactions
- `whileTap`: Click interactions

### Responsive Design
- Mobile: Single column layout
- Tablet: 2 column grid
- Desktop: 3 column grid
- All breakpoints use Tailwind's responsive utilities

### Color Palette
- Primary: Blue (500-700)
- Secondary: Purple/Indigo (500-700)
- Accent: Green, Red for actions
- Neutral: Gray (50-900)

## 🔮 Future Enhancements

- [ ] Add user search functionality
- [ ] Implement pagination
- [ ] Add user avatars/profile pictures
- [ ] Sort and filter options
- [ ] Export users to CSV
- [ ] Dark mode toggle
- [ ] Persistent storage (database integration)
- [ ] Authentication and authorization

## 📄 Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

Made with ❤️ using Next.js and Tailwind CSS
