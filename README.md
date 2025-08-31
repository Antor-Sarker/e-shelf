
# 📚 E-Shelf

E-Shelf is a **Fullstack Online Bookshop** built with **Next.js, MongoDB, and Tailwind CSS**.  
It provides a seamless book shopping experience with search, filtering, authentication, wishlist, and order management.  

## Live Demo: [https://e-shelf-w1za.vercel.app/](https://e-shelf-w1za.vercel.app/)


## ✨ Features

- 📖 **Display Books** – Browse a wide collection of books on the homepage.  
- 🔍 **Search** – Find books quickly by typing the book name.  
- 📑 **Pagination** – Navigate through books page by page.  
- 🗂️ **Filters** – Easily filter by **category, authors, and publications**.  
- 📘 **Book Details** – View detailed information about each book.  
- 🕒 **Recently Viewed** – Keep track of your recently viewed books.  
- 🛒 **Cart** – Add books to your cart for easy checkout.  
- 🔐 **Secure Authentication** – Login system using **JWT tokens (HttpOnly cookies)**.  
- ❤️ **Favorites** – Save books to your favorite list.  
- 🛍️ **Place Orders** – Checkout and confirm your order.  
- 👤 **User Dashboard** – Personalized dashboard for users.  
- 💖 **Wishlist Management** – Add and manage your wishlist items.  
- 📦 **Order Details** – View past order information.  
- 📄 **Download Invoice** – Download your order details as a **PDF file**.  

---

## 🛠️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) (App Router)  
- **Backend**: Next.js API Routes  
- **Database**: [MongoDB](https://www.mongodb.com/)  
- **Authentication**: JWT (HttpOnly cookies)  
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)  
- **PDF Generation**: Server-side PDF export  

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Antor-Sarker/e-shelf.git
cd e-shelf
```
---

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```
---


### 3. Configure Environment Variables

Create a .env file in the root and add:
```bash
DB_USER=your_database_name
DB_PASS=your_database_password
BOOKS_DB=your_database_for_books
USERS_DB=your_database_for_users_db
ORDERS_DB=your_database_orders_db
JWT_SECRET=your_jwt_secret
BASE_URL=http://localhost:3000
```

### 4. Run the Development Server
```bash
npm run dev
```
The app will run at: http://localhost:3000
---

🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request for improvements.

📜 License

This project is licensed under the MIT License.

👨‍💻 Author

Developed by Antor Sarker
🔗 GitHub: [Antor-Sarker](https://github.com/Antor-Sarker)
