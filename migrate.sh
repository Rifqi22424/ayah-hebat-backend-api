#!/bin/bash

# Memastikan script berhenti jika ada error
set -e

echo "🚀 Memulai proses migrasi Prisma..."

# Pilih mode migrasi
echo "Pilih opsi migrasi:"
echo "1) Reset & Deploy (Hapus data, jalankan ulang semua migrasi)"
echo "2) Fresh Start (Hapus folder migrations, buat migrasi baru dari nol)"
read -p "Masukkan pilihan (1/2): " choice

case $choice in
  1)
    echo "🔄 Melakukan reset database..."
    npx prisma migrate reset --force
    ;;
  2)
    echo "⚠️ Menghapus folder migrations lama..."
    rm -rf prisma/migrations
    echo "🆕 Membuat migrasi awal yang baru..."
    npx prisma migrate dev --name init
    ;;
  *)
    echo "❌ Pilihan tidak valid."
    exit 1
    ;;
esac

echo "🛠️ Melakukan Generate Prisma Client..."
npx prisma generate

echo "✅ Selesai! Database kamu sudah sinkron dengan schema terbaru."