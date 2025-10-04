const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbws54Jlhuj3ulQa6WLRzKHrZ7rs_7gVMDfBbgqCwac6hOKt-bv5Mqlc4v2V5CJ7pasgOQ/exec";

document.getElementById('daftarForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const form = e.target;
  const fileInput = form.querySelector('input[name="buktiTransferFile"]');
  
  if(fileInput.files.length === 0){
    alert("Harap pilih file bukti transfer!");
    return;
  }

  const file = fileInput.files[0];
  const base64File = await toBase64(file);

  // Kumpulkan semua data form
  const data = {
    namaTim: form.querySelector('input[name="namaTim"]').value,
    alamat: form.querySelector('input[name="alamat"]').value,
    officialTeam: form.querySelector('input[name="officialTeam"]').value,
    nomorWA: form.querySelector('input[name="nomorWA"]').value,
    email: form.querySelector('input[name="email"]').value,
    jumlahTransfer: "1000000",
    buktiTransferFile: base64File,
    buktiTransferFileType: file.type,
    buktiTransferFileName: file.name
  };

  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();
    if(result.status === "success"){
      document.getElementById('response').innerText = "✅ Pendaftaran berhasil! ID: " + result.idPendaftaran;
      form.reset();
    } else {
      document.getElementById('response').innerText = "⚠️ Error: " + result.message;
    }
  } catch(err){
    console.error(err);
    document.getElementById('response').innerText = "❌ Terjadi kesalahan saat mengirim data.";
  }
});

// Fungsi konversi file → base64
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
