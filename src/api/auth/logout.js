
export function logoutUser() {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
}
