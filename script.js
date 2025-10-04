const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbws54Jlhuj3ulQa6WLRzKHrZ7rs_7gVMDfBbgqCwac6hOKt-bv5Mqlc4v2V5CJ7pasgOQ/exec";

document.getElementById('daftarForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const form = e.target;
  const fileInput = form.querySelector('input[name="buktiTransferFile"]');
  
  if(fileInput.files.length === 0){
    alert("Harap pilih file bukti transfer!");
    return;
  }

  const formData = new FormData(form);
  formData.set("jumlahTransfer", "1000000"); // Pastikan jumlah tetap 1 juta

  // Convert file ke blob
  const file = fileInput.files[0];
  formData.set("buktiTransferFile", file);

  const plainObject = {};
  formData.forEach((value, key) => {
    plainObject[key] = value;
  });

  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(plainObject),
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
    document.getElementById('response').innerText = "Terjadi kesalahan saat mengirim data.";
  }
});
