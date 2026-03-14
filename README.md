# Yatharth Hospitals - Advanced Medical Assistant & Web Platform

A premium, modern web application for Yatharth Hospitals, featuring an advanced AI-powered health assistant named **"nat"**. This project is a comprehensive upgrade of the traditional hospital website, focusing on premium UI/UX, proactive patient interaction, and seamless information access.

![nat Mascot Logo](public/nat.png)

## 🩺 Meet "nat" - Your Personal Health Assistant
**nat** is a professional 3D medical mascot (kitten in scrubs) designed to help patients navigate hospital services.
- **AI-Powered**: Integrated with **Groq Llama-3** for lightning-fast, intelligent medical queries.
- **Silhouette Glow**: Features a custom silhouetted glow effect that enhances visibility and provides a premium feel.
- **Proactive Support**: Helps with appointment booking, finding doctors, and explaining hospital facilities.

## 🚀 Key Features
- **Multi-Page Experience**:
    - **About Us**: Comprehensive overview of Yatharth's mission and history.
    - **Careers**: Interactive job board with real-time application capabilities.
    - **Facilities**: Visual showcase of world-class medical infrastructure.
    - **Online Lab Reports**: Mock portal for efficient patient document access.
- **Premium UI/UX**: Built with **Framer Motion** for smooth transitions and **Vanilla CSS** for precise, state-of-the-art styling.
- **Data Persistence**: Integrated with **Firebase Firestore** to store appointment requests and career applications.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing.

## 🛠️ Tech Stack
- **Frontend**: React 19, Vite 8
- **Styling**: Vanilla CSS, Framer Motion (Animations), Lucide React (Icons)
- **Backend/Storage**: Node.js (Express), Firebase Firestore
- **AI Engine**: Groq SDK (Llama-3-70b)
- **Routing**: React Router DOM v7

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/immohitsaraswat/Yatharth-ChatBot.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root and add your Groq API key:
   ```env
   VITE_GROQ_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🌐 Deployment
The project is configured for continuous deployment on **Vercel**. Every push to the `main` branch triggers a new build.

## 📄 License
This project is developed for educational and professional demonstration purposes.
