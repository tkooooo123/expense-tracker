# 我的記帳本
紀錄日常生活中食衣住行等各種開銷支出
## 功能
- 可以註冊帳號或使用Facebook認證並登入操作
- 瀏覽所有支出紀錄
- 新增支出紀錄
- 修改支出紀錄
- 刪除支出紀錄
- 可以選擇類別以瀏覽不同類別的支出紀錄

# 使用方式
1. 安裝node.js & npm
2. 將此專案clone至本機
   ```Bash
   https://github.com/tkooooo123/restaurant_list.git
   ```
3. 開啟終端機並進入專案資料夾並執行安裝:
   ```Bash
   npm install
   ```
4. 安裝完畢，建立種子資料，輸入：
   ```Bash
   npm run seed
   ```
   成功則顯示：
   ```Bash
   recordSeeder generated!
   ```
5. 移除`.env.example`資料之副檔名`.example`，並設定環境變數資訊  
6. 接者執行專案，輸入：
   ```Bash
   npm run dev
   ```
   成功則顯示：
   ```Bash
   App is running on http://localhost:3000

   ```
## 開發工具
- Node.js: 16.13.0
- Express: 4.17.3
- Express-Handlebars: 6.0.3
- Express-Session: 1.17.1
- body-parser: 1.20.0
- mongoose: 6.2.9
- method-override: 3.0.0
- passport: 0.4.1
- passport-local: 1.0.0
- passport-facebook: 3.0.0
- bcryptjs: 2.4.3
- connect-flash: 0.1.1
- dotenv: 8.2.0