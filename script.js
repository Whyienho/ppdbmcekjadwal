let data = [];

const audioSuccess = new Audio('success.mp3');
const audioFail = new Audio('fail.mp3');

fetch('jadwal.json')
  .then(response => response.json())
  .then(json => data = json)
  .catch(error => console.error('Gagal memuat data:', error));

function cekKelulusan() {
  const nisn = document.getElementById('nisn').value.trim();
  const password = document.getElementById('password').value.trim();
  const hasilDiv = document.getElementById('hasil');
  const formSection = document.getElementById('form-section');


  const result = data.find(item => item.NISN === nisn && item.PASSWORD === password);

  if (result) {
    audioSuccess.play();
    formSection.style.display = 'none'; // sembunyikan semua (logo, judul, form)

    hasilDiv.innerHTML = `
      <div style="
        background: linear-gradient(135deg, #ffffff, #e9fce8);
        border-radius: 16px;
        padding: 24px;
        box-shadow: 0 6px 20px rgba(0,0,0,0.08);
        margin-top: 24px;
        border: 1px solid #d0e6d2;
      ">
        <p style="font-size: 1.3rem; font-weight: bold; color: #28a745; text-align: center; margin-bottom: 10px; margin-left: -35px; margin-right: -30px;">
          👋Halo, <strong>${result["NAMA LENGKAP"]}</strong>!
        </p>

        <p style="font-weight: bold; margin-bottom: 12px; text-align: center; color: #1e7e34;">
          <i class="fas fa-calendar-alt"></i> Jadwal kamu Verifikasi Berkas dan Tes BTQ:
        </p>

        <p style="margin: 6px 0; text-align: left; color: #000; margin-left: 10px;">
          <strong>Hari / Tanggal :</strong> <strong>${result["HARI / TANGGAL"]}</strong>
        </p>
        <p style="margin: 6px 0; text-align: left; color: #000; margin-left: 10px;">
          <strong>Waktu :</strong> <strong>${result["WAKTU"]}</strong>
        </p>
        <p style="margin: 6px 0 24px 0; text-align: left; color: #000; margin-left: 10px;">
          <strong>Lokasi :</strong> <strong>${result["LOKASI"]}</strong>
        </p>

        <div style="color: red; font-size: 0.85rem; margin-bottom: 16px; margin-top: 10px; text-align: left;">
          <strong>Calon Siswa Wajib Berhadir pada jadwal yang telah ditentukan.</strong><br><br>
          Apabila :<br>
          1. Calon Siswa tidak melakukan pengiriman berkas dan tidak mengikuti Tes BTQ sesuai jadwal yang ditentukan <strong>Tanpa ada Konfirmasi</strong><br>
          2. Calon Siswa Tidak Mampu BTQ<br><br>
          Maka <strong>Dianggap Gugur</strong>
        </div>

        <div style="text-align: center;">
          <button onclick="location.reload()" class="btn-refresh">
            🔁 Kembali
          </button>
        </div>
      </div>
    `;
  } else {
    audioFail.play();
    hasilDiv.innerHTML = `
      <div class="fail" style="margin-top: 16px; color: red;">
        <i class="fas fa-times-circle"></i> NISN atau Password salah.
      </div>
    `;
  }
}

// Enter = klik
document.addEventListener("keydown", e => {
  if (e.key === "Enter") cekKelulusan();
});

// Toggle password visibility
document.getElementById("togglePassword").addEventListener("click", function () {
  const passwordInput = document.getElementById("password");
  const icon = this;

  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  icon.classList.toggle("fa-eye", !isPassword);
  icon.classList.toggle("fa-eye-slash", isPassword);
});
