# GhostLink

GhostLink is a secure, ephemeral file-sharing application designed for simplicity and speed. Built with modern web technologies, it allows users to effortlessly upload files and share them via temporary links.

## 🚀 Features

- **Drag & Drop Uploads**: Intuitive interface for quick file sharing.
- **Secure Storage**: Files are securely stored, ensuring privacy.
- **Instant Sharing**: Generate unique, shareable links instantly.
- **Minimalist Design**: A clean, dark-themed UI focused on usability.
- **Responsive**: Fully optimized for mobile and desktop devices.
- **Real-time Feedback**: Live upload progress tracking.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Backend/Storage**: [Supabase](https://supabase.com/)

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Supabase account

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/kazedevs/GhostLink.git
    cd ghost-link
    ```

2.  **Install dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure Environment Variables**
    Create a `.env.local` file in the root directory and add your Supabase credentials.

    ```bash
    cp .env.example .env.local
    ```

    Update `.env.local` with your actual credentials:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run the development server**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```
ghost-link/
├── app/              # Next.js App Router pages and layouts
│   ├── components/   # Reusable UI components
│   ├── lib/          # Utility functions and Supabase client
│   └── ...
├── public/           # Static assets
└── ...
```

## 📄 License

This project is licensed under the MIT License.
