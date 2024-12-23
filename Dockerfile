# Step 1: Mengambil image dari Dockerhub
FROM oven/bun:alpine

# Step 2: Setup lokasi tempat app dijalankan
WORKDIR /usr/src/app

# Step 3: Masukan package.json dulu agar rebuilding image bisa menggunakan chance (jika tidak ada perubahan pada package.json)
COPY package.json ./

# Step 4: Menjalankan perintah yang ada pada lokasi WORKDIR
RUN bun install

# Step 5: Copy paste semua file yang ada di folder saat ini ke WORKDIR
COPY . ./

# Step 6: Assign port pada app (hanya sebagai dokumentasi)
EXPOSE 3000

# Step 7: Hanya menjalankan sebuah perintah di WORKDIR ketika container dijalankan
CMD [ "bun", "dev" ]