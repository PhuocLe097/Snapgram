import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // Điều này cho phép server sử dụng địa chỉ IP
    port: 3000, // Bạn có thể thay đổi port nếu muốn
  },
});
