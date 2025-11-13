export function setUser(user) {
  try {
    localStorage.setItem("tems_user", JSON.stringify(user));
  } catch (e) {}
}
export function getUser() {
  try {
    const s = localStorage.getItem("tems_user");
    return s ? JSON.parse(s) : null;
  } catch (e) {
    return null;
  }
}
export function logout() {
  try {
    localStorage.removeItem("tems_user");
  } catch (e) {}
}
