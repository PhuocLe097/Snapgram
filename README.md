# Các bước để tạo website Snapgram

Link video: `https://www.youtube.com/watch?v=_W3R2VwRyF4&t=1694s&ab_channel=JavaScriptMastery`

# 1. Khởi tạo project

- Tạo mới 1 project Vite bằng lệnh: `npm create vite@latest`
  -> Chọn Ngôn ngữ và Framework muốn dùng và create
  -> Sau khi tạo mới thì: `npm i` để install node module

- Tạo file main.tst, App.tsx, globals.css trong src
  -> Xây dựng phần cơ bản cho web

# 2. Install TailwindCss

- Làm theo hướng dẫn tại: `https://tailwindcss.com/docs/guides/vite`

- Install TailwindCss: `npm install -D tailwindcss postcss autoprefixer`
  -> Tạo file tailwind.config: `npx tailwindcss init -p`
  -> Theme trong tailwind.config.js và global.css lấy từ đây: `https://github.dev/adrianhajdin/social_media_app`
  -> Sau đó install animation của Tailwind : `npm i tailwindcss-animate`

# 3. Install lib UI Shadcn

- Làm theo hướng dẫn tại đây: `https://ui.shadcn.com/docs/installation/vite`

- Thêm code vào vite.config.ts để tránh gặp phải các lỗi đường dẫn: `npm i -D @types/node`
  -> Install Shadcn: `npx shadcn-ui@latest init`
  -> Chọn theo các option sau để cài đặt:
  Would you like to use TypeScript (recommended)? no / `yes`
  Which style would you like to use? › `Default`
  Which color would you like to use as base color? › `Slate`
  Where is your global CSS file? › › `src/globals.css`
  Do you want to use CSS variables for colors? › `no` / yes
  Where is your tailwind.config.js located? › `tailwind.config.js`
  Configure the import alias for components: › `@/components`
  Configure the import alias for utils: › `@/lib/utils`
  Are you using React Server Components? › no / `yes` (no)

- Nếu muốn dùng component nào thì install cái đó vào, vd: `npx shadcn-ui@latest add button`, `npx shadcn-ui@latest add form`,... Xem thêm tại link hướng dẫn

# 4. Tạo UI cho Signin/Signup

- Tạo folder \_auth, \_root để chứa các trang của web
- Tạo đường dẫn (Route) và định tuyến cho đường dẫn

# 5. Kết nối với Appwrite

- Cài đặt Appwrite: `npm i appwrite`
  -> Tạo file dùng để setup trong folder `lib` -> `config`
  -> Tạo file `.env.local` để chứa biến id của Appwirte

- Tạo file `api` để chứa các api sử dụng được Appwrite cung cấp để dùng các chức năng CRUD

- Trên Appwrite tạo database, storage, table, relationship, attribute cho table
  -> Tại file `.env.local` tạo biến chứa id của database, storage, table

# 6. Xây dựng nơi quản lý API và mutation

- Tạo file `api` trong folder appwrite dùng để call các API được Appwrite hỗ trợ thực hiện CRUD

- Install TanStack Query: `npm i @tanstack/react-query`
  -> Tạo file `react-query/queriesAndMutations` trong `lib` để quản lý mutation khi gọi api

# 7. Xây dựng Logic cho Signup/Signin

- Call api xử lý việc tạo Account và save user vào DB

- Tạo file `context/AuthContext` để quản lý việc đăng nhập của user
  -> Tạo file `context/QueryProvider` cùng với `AuthProvider` trong `AuthContext` để bọc ngoài <App/> trong `main.tsx`

# 8. Dựng Layout cho RootLayout
