# Deep Dive E-commerce Backend

A robust, scalable Node.js backend for a modern ecommerce platform. Built with Express, MongoDB (Mongoose), and best practices for validation, authentication, image handling, and soft deletion. Supports deployment on Vercel and other cloud platforms.

## Features

- **User Management**: Registration, login, profile update, password change, role management (admin/user), soft delete.
- **Product Management**: CRUD operations, image upload (Cloudinary), validation, soft delete, stock management.
- **Category & Discount**: CRUD, validation, product/category association, discount application, soft delete.
- **Cart & Order**: Add/update/delete cart items, order creation, stock update on order, pagination, soft delete.
- **Wishlist**: Add/remove products, prevent duplicates, soft delete.
- **Contact & About**: CRUD for contact messages and about info, validation, soft delete.
- **Image Handling**: Upload, delete, and update product images (single/multiple), Cloudinary integration.
- **Validation**: Express-validator for all models, custom error messages, numeric conversion, field length checks.
- **Soft Delete**: All major models support soft deletion via `deleted_at` field.
- **Pagination**: Efficient pagination for getAll endpoints.
- **Role-Based Access**: Admin/user separation for sensitive endpoints.
- **Error Handling**: Centralized error middleware, clean API responses.

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **Cloudinary** (image upload)
- **Multer & Sharp** (file upload/compression)
- **Express-validator** (validation)
- **JWT** (authentication)
- **Vercel** (deployment)

## API Endpoints (Highlights)

- `/api/users` - User registration, login, profile, admin controls
- `/api/products` - Product CRUD, image upload, filtering, pagination
- `/api/categories` - Category CRUD, validation
- `/api/discounts` - Discount CRUD, product/category association
- `/api/carts` - Cart CRUD, add/update/remove items
- `/api/orders` - Order CRUD, stock update, pagination
- `/api/wishlist` - Wishlist CRUD, prevent duplicates
- `/api/contact` - Contact form CRUD
- `/api/about` - About info CRUD

## Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/Team-5-Final-Project-Deep-Dive-25/BackEnd.git
   cd BackEnd
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Configure environment**
   - Create a `.env` file with MongoDB URI, JWT secret, Cloudinary keys, etc.
4. **Run locally**
   ```bash
   npm run dev
   ```
5. **Deploy**
   - Ready for Vercel or other cloud platforms.

## Folder Structure

```
app.js
package.json
vercel.json
config/
controllers/
docs/
middlewares/
models/
routes/
utilities/
```

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT

---

**Built with ❤️ by Team 5 - Deep Dive 25**
