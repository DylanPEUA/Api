const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Erreur de connexion");
      return;
    }

    // Sauvegarde du token JWT
    localStorage.setItem("token", data.token);

    // Redirection vers le tableau de bord
    window.location.href = "/dashboard.html";
  } catch (err) {
    alert("Erreur réseau : " + err.message);
  }
});