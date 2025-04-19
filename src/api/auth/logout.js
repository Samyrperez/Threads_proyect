// src/api/auth/logout.js
export function logoutUser() {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
}
