# Finance Data Processing API

Bài test: Xây dựng Backend cho hệ thống Quản lý tài chính & Dashboard với phân quyền người dùng.

## 🚀 Công nghệ sử dụng
- **Node.js + Express + TypeScript**
- **Prisma ORM + PostgreSQL (Supabase)**
- **Zod** (Data validation)
- **JWT + bcrypt** (Xác thực & Mã hóa mật khẩu)

## 📁 Cấu trúc thư mục (Layered Architecture)
- `src/config/`: Cấu hình Environment, DB client...
- `src/controllers/`: Tiếp nhận HTTP Request và gửi Response.
- `src/middlewares/`: Global Error Handler, Auth Guard, Role Guard, Validate interceptor.
- `src/routes/`: Khai báo REST endpoints.
- `src/services/`: Nghiệp vụ tính toán (Database query, Auth logic, Dashboard aggregate...).
- `src/validations/`: Chứa các Schema định dạng chuẩn (Zod).

## 🔑 Cài đặt và Khởi chạy
1. **Cài đặt thư viện:**
   ```bash
   npm install
   ```
2. **Cấu hình biến môi trường:**
   Tạo file `.env` (hoặc copy từ `.env.example`) và thay URL kết nối Postgres của bạn vào `DATABASE_URL`.
   ```env
   DATABASE_URL="postgresql://[user]:[password]@[host]:[port]/[database]"
   JWT_SECRET="bi-mat-cua-ban"
   PORT=3000
   ```
3. **Đồng bộ Database (Push Schema):**
   ```bash
   npx prisma db push
   ```
4. **Khởi chạy Server:**
   ```bash
   npm run dev      # Nếu có cấu hình nodemon
   # Hoặc
   npx ts-node src/server.ts
   ```

## 🧪 Kiểm thử (Testing)
Hệ thống đi kèm file `api-test.http`. 
Nếu bạn dùng **VS Code**, hãy cài extension **REST Client** (của Huachao Mao).
Mở file `api-test.http` và bấm vào nút `Send Request` trên các dòng để test toàn bộ Flow từ Đăng ký -> Lấy Token -> Gọi API quản lý theo quyền hạn.

---
**💡 Thiết kế tự động:**
Người dùng Đăng ký (Register) *đầu tiên* sẽ mặc định được gán quyền `ADMIN` để dễ dàng làm quen. Những người sau mặc định là `VIEWER`. Từ tài khoản Admin, bạn có thể phân công (update Role) cho các tài khoản phía sau lên thành `ANALYST` hoặc `ADMIN`.
