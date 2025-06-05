// Login logic
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim().toLowerCase();
  const password = document.getElementById('password').value.trim();

  const storedEmail = localStorage.getItem('adminEmail');
  const storedPassword = localStorage.getItem('adminPassword');

  if (email === storedEmail && password === storedPassword) {
    localStorage.setItem('currentAdmin', JSON.stringify({ email }));
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid credentials!");
  }
});

// Signup logic
document.getElementById('signupForm')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const newEmail = document.getElementById('newEmail').value.trim().toLowerCase();
  const newPassword = document.getElementById('newPassword').value.trim();

  if (!newEmail || !newPassword) {
    alert("Please fill in all fields.");
    return;
  }

  localStorage.setItem('adminEmail', newEmail);
  localStorage.setItem('adminPassword', newPassword);
  alert("Signup successful! You can now log in.");
  window.location.href = "index.html";
});

// Doctor data
const doctors = [
  {
    name: "dr xyz",
    email: "xyz1234@gmail.com",
    category: "Other",
    verified: "Unverified",
    rating: "3 (6)",
    flagged: true
  }
];

// Load doctors into table
function loadDoctors() {
  const tbody = document.getElementById("doctorsBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  doctors.forEach((doctor, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td><i class="fas fa-user-md"></i> ${doctor.name}</td>
      <td>${doctor.email}</td>
      <td>${doctor.category}</td>
      <td>${doctor.verified}</td>
      <td>★ ${doctor.rating}</td>
      <td class="${doctor.flagged ? 'flagged' : 'unflagged'}">
        ${doctor.flagged ? 'Flagged' : 'Unflagged'}
      </td>
      <td>
        <button onclick="toggleFlag(${index})" class="${doctor.flagged ? 'unflagged' : 'flagged'}">
          ${doctor.flagged ? 'Unflag' : 'Flag'}
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

// Toggle flag status
function toggleFlag(index) {
  doctors[index].flagged = !doctors[index].flagged;
  localStorage.setItem('doctorData', JSON.stringify(doctors));
  loadDoctors();
}

// Load stored flag statuses
function loadFromStorage() {
  const stored = localStorage.getItem('doctorData');
  if (stored) {
    const parsed = JSON.parse(stored);
    parsed.forEach((data, i) => {
      if (doctors[i]) {
        doctors[i].flagged = data.flagged;
      }
    });
  }
}

// Show current admin on dashboard
function showAdminInfo() {
  const info = JSON.parse(localStorage.getItem('currentAdmin'));
  const header = document.querySelector("header");
  if (info && header) {
    const div = document.createElement("div");
    div.className = "admin-info";
    div.innerHTML = `<strong>Welcome,</strong> ${info.email}`;
    header.appendChild(div);
  }
}

// Init on load
window.onload = () => {
  showAdminInfo();
  loadFromStorage();
  loadDoctors();
};    
