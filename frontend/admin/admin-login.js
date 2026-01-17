const API_BASE = "http://localhost:5000";

async function loginAdmin() {
  const password = document.getElementById("adminPassword").value;
  const errorMsg = document.getElementById("errorMsg");

  errorMsg.classList.add("hidden");

  try {
    const res = await fetch(`${API_BASE}/api/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ password })
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("isAdmin", "true");
      window.location.href = "./admin.html";
    } else {
      errorMsg.classList.remove("hidden");
    }

  } catch (err) {
    errorMsg.classList.remove("hidden");
  }
}
