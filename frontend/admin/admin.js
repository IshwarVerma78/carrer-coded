// Admin auth check
if (localStorage.getItem("isAdmin") !== "true") {
  window.location.href = "./admin-login.html";
}



const API_BASE = "http://localhost:5000"; // deploy pe change karna

async function loadDashboard() {
  try {
    /* ======================
       CALLBACKS
    ====================== */
    const res = await fetch(`${API_BASE}/api/callbacks`);
    const data = await res.json();

    const callbacks = data.data || [];

    // Stats
    document.getElementById("totalCallbacks").innerText = callbacks.length;

    const today = new Date().toDateString();
    const todayCount = callbacks.filter(c =>
      new Date(c.createdAt).toDateString() === today
    ).length;

    document.getElementById("todayCallbacks").innerText = todayCount;

    // Table
    const table = document.getElementById("callbackTable");
    table.innerHTML = "";

    callbacks.forEach(cb => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td class="px-6 py-4">${cb.name}</td>
        <td class="px-6 py-4">${cb.email}</td>
        <td class="px-6 py-4">${cb.phone}</td>
        <td class="px-6 py-4">${cb.college}</td>
        <td class="px-6 py-4">${cb.degree}</td>
        <td class="px-6 py-4">${cb.interest || "-"}</td>
        <td class="px-6 py-4 text-muted">
          ${new Date(cb.createdAt).toLocaleDateString()}
        </td>
        <td class="px-6 py-4">
            <button onclick="deleteCallback('${cb._id}')" class="text-red-600 font-medium hover:underline">
                Delete
            </button>
        </td>
      `;

      table.appendChild(row);
    });

    /* ======================
       VISITOR COUNT
    ====================== */
    const visitorRes = await fetch(`${API_BASE}/api/visitor`);
    const visitorData = await visitorRes.json();

    document.getElementById("visitorCount").innerText =
      visitorData.count || 0;

  } catch (err) {
    console.error("Dashboard error:", err);
  }
}


// Delete a callback
async function deleteCallback(id) {
  const confirmDelete = confirm("Are you sure you want to delete this callback?");
  if (!confirmDelete) return;

  try {
    await fetch(`${API_BASE}/api/callbacks/${id}`, {
      method: "DELETE"
    });

    // Reload dashboard after delete
    loadDashboard();
  } catch (error) {
    console.error("Delete failed", error);
  }
}


//logout

function logoutAdmin() {
  localStorage.removeItem("isAdmin");
  window.location.href = "./admin-login.html";
}


// Initial load
loadDashboard();







// const API_BASE = "http://localhost:5000"; // deploy pe change karna

// async function loadDashboard() {
//   try {
//     const res = await fetch(`${API_BASE}/api/callbacks`);
//     const data = await res.json();

//     const callbacks = data.data || [];

//     // Stats
//     document.getElementById("totalCallbacks").innerText = callbacks.length;

//     const today = new Date().toDateString();
//     const todayCount = callbacks.filter(c =>
//       new Date(c.createdAt).toDateString() === today
//     ).length;
//     document.getElementById("todayCallbacks").innerText = todayCount;

//     // Table
//     const table = document.getElementById("callbackTable");
//     table.innerHTML = "";

//     callbacks.forEach(cb => {
//       const row = document.createElement("tr");

//       row.innerHTML = `
//         <td class="px-6 py-4">${cb.name}</td>
//         <td class="px-6 py-4">${cb.email}</td>
//         <td class="px-6 py-4">${cb.phone}</td>
//         <td class="px-6 py-4">${cb.college}</td>
//         <td class="px-6 py-4">${cb.degree}</td>
//         <td class="px-6 py-4">${cb.interest || "-"}</td>
//         <td class="px-6 py-4 text-muted">
//           ${new Date(cb.createdAt).toLocaleDateString()}
//         </td>
//       `;

//       table.appendChild(row);
//     });

//   } catch (err) {
//     console.error("Dashboard error:", err);
//   }
// }

// // Initial load
// loadDashboard();


// // Fetch visitor count (ADMIN - NO INCREMENT)
// const visitorRes = await fetch(`${API_BASE}/api/visitor`);
// const visitorData = await visitorRes.json();

// document.getElementById("visitorCount").innerText =
//   visitorData.count || 0;
