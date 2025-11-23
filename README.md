# 🌍 AI Travel Management

**AI Travel Management** is a cutting-edge, intelligent travel planning application designed to create personalized, day-by-day itineraries tailored to your unique preferences. Powered by advanced AI and secured with modern web technologies, it transforms the way you plan your journeys.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fai-travel-management)
[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge&logo=vercel)](https://ai-travel-planner-app.vercel.app/)

_(Replace the link above with your actual Vercel deployment URL)_

![App Banner](/public/screenshots/home.png)

## ✨ Features

### 🤖 AI-Powered Planning

- **Smart Itinerary Generation**: Generates detailed day-by-day travel plans including hotels, activities, and dining options.
- **Conversational Interface**: Plan your trip through an intuitive, chat-like experience.
- **Personalized Recommendations**: Tailors trips based on budget, travel companions (Solo, Couple, Family, Friends), and interests (Adventure, Culture, Food, etc.).

### 🔐 Security & Authentication

- **Secure Authentication**: Robust user sign-up and login powered by **Clerk**.
- **Advanced Security**: Integrated **Arcjet** for:
  - **Bot Protection**: Blocks automated threats.
  - **Rate Limiting**: Prevents abuse of AI generation endpoints.
  - **SQL/XSS Shield**: Protects against common web attacks.
- **Route Protection**: Client-side and server-side guards ensure only authenticated users access sensitive pages.

### 👤 User Experience

- **Profile Management**: Dedicated profile page to manage personal details and preferences.
- **Trip History**: "My Trips" section to view and revisit all your generated itineraries.
- **Interactive UI**: Beautiful, responsive design built with **Tailwind CSS** and **Radix UI**.
- **Smooth Animations**: Enhanced user interactions using **GSAP** and **Framer Motion**.

### 🛠️ Additional Tools

- **Image Search**: Automatically fetches relevant images for destinations and hotels using **Google Places/SerpAPI**.
- **Toast Notifications**: Real-time feedback for user actions.

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Class Variance Authority (CVA)
- **Authentication**: [Clerk](https://clerk.com/)
- **Database**: MongoDB (via Mongoose)
- **AI Integration**: OpenAI / Gemini API
- **Security**: [Arcjet](https://arcjet.com/)
- **UI Components**: Radix UI, Lucide React
- **Animations**: GSAP, Motion (Framer Motion)
- **HTTP Client**: Axios
- **External APIs**: SerpAPI (Google Images)

## 📦 Installation

Follow these steps to set up the project locally:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/theabdulla0/ai-travel-management.git
    cd ai-travel-management
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root directory and add the following keys:

    ```env
    # Next.js
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
    CLERK_SECRET_KEY=sk_test_...

    # Database
    MONGODB_URI=mongodb+srv://...

    # AI & APIs
    OPENAI_API_KEY=sk-... (or Gemini Key)
    SERPAPI_API_KEY=...

    # Security
    ARCJET_KEY=ajkey_...
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

5.  **Open the app:**
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📸 Screenshots

|                 Home Page                  |                Trip Generation                |
| :----------------------------------------: | :-------------------------------------------: |
| ![Home Page](/public/screenshots/home.png) | ![Trip Gen](/public/screenshots/trip-gen.png) |
|               _Landing Page_               |              _AI Chat Interface_              |

|                     Trip Details                      |                User Profile                 |
| :---------------------------------------------------: | :-----------------------------------------: |
| ![Trip Details](/public/screenshots/trip-details.png) | ![Profile](/public/screenshots/profile.png) |
|                 _Detailed Itinerary_                  |               _User Settings_               |

|                   My Trips                   |     |
| :------------------------------------------: | :-: |
| ![My Trips](/public/screenshots/myTrips.png) |     |
|                _Trip History_                |     |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
