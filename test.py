import requests
import pandas as pd
from requests.exceptions import RequestException
import concurrent.futures # Import modul untuk threading

# ==========================================================
# === 1. KONFIGURASI (WAJIB DIUBAH) ===
# ==========================================================
# Ganti dengan nama file Excel Anda
NAMA_FILE_INPUT = "products-2025-11-07_01_22_05.xls" 

# Ganti dengan nama header kolom yang berisi URL
# Dari gambar Anda, mungkin namanya bukan 'link', 
# tapi bisa jadi 'item group link' atau 'mobile link'.
# Periksa lagi dan pastikan namanya TEPAT.
NAMA_KOLOM_URL = "link" 
# ==========================================================


# Header User-Agent agar tidak diblokir, menyamar sebagai browser
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

# === 2. Fungsi untuk Cek SATU URL ===
# Kita pindahkan logika pengecekan ke dalam fungsi
def check_url(url):
    """Mengecek status satu URL dan mengembalikan dictionary hasil."""
    
    # Pengecekan dasar jika data di excel bukan URL
    if not isinstance(url, str) or not url.startswith('http'):
        return {
            "URL": url,
            "Status Code": None,
            "Status": "Invalid URL format",
            "Final Redirect": None
        }

    try:
        response = requests.head(url, allow_redirects=True, timeout=10, headers=HEADERS)
        status_code = response.status_code
        final_url = response.url
        status = "OK" if status_code == 200 else "Redirected" if status_code in [301, 302] else "Error"
    
    except RequestException as e:
        status_code = None
        final_url = None
        status = f"Failed ({e.__class__.__name__})"

    return {
        "URL": url,
        "Status Code": status_code,
        "Status": status,
        "Final Redirect": final_url
    }

# === 3. Baca File Excel Input ===
try:
    print(f"Membaca file: {NAMA_FILE_INPUT}...")
    df_input = pd.read_excel(NAMA_FILE_INPUT)
except FileNotFoundError:
    print(f"❌ ERROR: File tidak ditemukan di '{NAMA_FILE_INPUT}'")
    print("Pastikan nama file sudah benar dan file ada di folder yang sama dengan script.")
    exit()
except Exception as e:
    print(f"❌ ERROR: Gagal membaca file Excel. {e}")
    exit()

# === 4. Ambil List URL dari Kolom ===
if NAMA_KOLOM_URL not in df_input.columns:
    print(f"❌ ERROR: Kolom '{NAMA_KOLOM_URL}' tidak ditemukan di file Excel.")
    print(f"Kolom yang tersedia: {list(df_input.columns)}")
    print("Silakan perbarui variabel NAMA_KOLOM_URL di bagian atas script.")
    exit()

# Ambil URL, hapus baris kosong (NaN), ubah ke string, dan jadikan list
urls = df_input[NAMA_KOLOM_URL].dropna().astype(str).tolist()

if not urls:
    print("Tidak ada URL yang valid ditemukan di kolom tersebut.")
    exit()

print(f"✅ Ditemukan {len(urls)} URL untuk dicek.")

# === 5. Cek setiap URL (Menggunakan Threading agar cepat) ===
print("Memulai pengecekan URL (ini mungkin butuh waktu beberapa menit untuk 1500 URL)...")
results = []

# Kita gunakan ThreadPoolExecutor untuk menjalankan 20 pengecekan sekaligus
# Ini akan jauh lebih cepat daripada loop satu per satu
with concurrent.futures.ThreadPoolExecutor(max_workers=20) as executor:
    # executor.map akan menjalankan fungsi 'check_url' untuk setiap item di list 'urls'
    results = list(executor.map(check_url, urls))

print("\nProses pengecekan URL selesai.")

# === 6. Simpan ke Excel ===
print("Menyimpan hasil ke Excel...")
df_output = pd.DataFrame(results)
df_output.to_excel("url_status_results.xlsx", index=False)

print("✅ Cek selesai! Hasil disimpan di file: url_status_results.xlsx")