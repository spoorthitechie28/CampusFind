
# CampusFind - Where Lost Meets Found

CampusFind is a modern, full-stack web application designed to be the central hub for any college campus's lost and found needs. It provides a seamless and efficient digital platform for students and staff to report lost items, post found items, and connect securely to reunite belongings with their rightful owners.

# 🌐 Live Demo
You can view the live, deployed application here:

https://campus-find-eight.vercel.app/

## ✨ Features

  * **Report Lost & Found Items**: A simple and intuitive form allows users to report items, including details like name, category, location, a description, and an optional image upload.
  * **Community Dashboard**: A central dashboard, or "Reunion Point," where all currently available lost and found items are displayed for the entire community to see.
  * **Secure Private Messaging**: To protect user privacy, the application features a secure, in-app two-way messaging system. Users can contact item owners without revealing personal contact information.
  * **User Authentication**: Secure user sign-up, sign-in, and profile management are handled by [Clerk](https://clerk.com/), providing a robust and easy-to-use authentication experience.
  * **Personal Item Management**: Users have a personal "My Items" page where they can view all the items they've reported, see incoming messages, and manage their posts.
  * **Item Status Control**: Item owners can update the status of their posts to "Reunited" or "Returned," which removes the item from the public dashboard to keep it clean and relevant. They can also delete their posts entirely.

## 🛠️ Technology Stack

This project uses a modern, serverless-first tech stack for real-time functionality and a great developer experience.

  * **Frontend**: Built with **React** and **Vite**, using **Bootstrap** for styling.
  * **Backend & Database**: Powered by **[Convex](https://www.convex.dev/)**, which provides the real-time database, serverless functions, and file storage.
  * **Authentication**: Handled by **[Clerk](https://clerk.com/)** for secure user management and authentication.

## 🚀 Getting Started

Follow these instructions to get a local copy of the project up and running for development and testing purposes.

### Prerequisites

  * **Node.js** (v18 or later recommended)
  * **npm** or **yarn**
  * A free **[Convex](https://www.convex.dev/)** account
  * A free **[Clerk](https://clerk.com/)** account

### Installation & Setup

1.  **Clone the repository:**

    ```sh
    git clone <your-repository-url>
    cd campusfind/frontend
    ```

2.  **Install dependencies:**

    ```sh
    npm install
    ```

3.  **Set up Convex:**

      * Log in to the Convex CLI and initialize a new project:
        ```sh
        npx convex dev
        ```
      * This command will guide you through logging in, creating a project, and it will generate a `.env.local` file with your `VITE_CONVEX_URL`.
      * Keep this process running in a terminal. It automatically syncs your backend functions (`frontend/convex/`) with the Convex servers.

4.  **Set up Clerk:**

      * In your **Clerk Dashboard**, create a new application.
      * Go to **API Keys** and copy the **Publishable key**.
      * Add it to your `frontend/.env.local` file:
        ```
        VITE_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY
        ```
      * In the Clerk Dashboard, go to **User & Authentication** -\> **User Profile** and enable the **First name** and **Last name** fields.
      * Navigate to **JWT Templates**, create a new template using the "Convex" preset, and copy the **Issuer URL**.

5.  **Configure Convex Environment Variables:**

      * In your **Convex Dashboard**, go to your project's **Settings** -\> **Environment Variables**.
      * Add a new variable:
          * **Name**: `CLERK_JWT_ISSUER_DOMAIN`
          * **Value**: Paste the Issuer URL you copied from Clerk.

6.  **Run the application:**

      * Open a new terminal window (while `npx convex dev` is still running).
      * Make sure you are in the `frontend` directory.
      * Start the React development server:
        ```sh
        npm run dev
        ```
      * Open your browser and navigate to the local URL provided (usually `http://localhost:5173`).
