  // ✅ Verificar si el usuario autenticado sigue al usuario mostrado
//   export const verificarSeguimiento = async () => {
//     try {
//         const response = await fetch(
//             `https://dockerapps.pulzo.com/threads/api/usuarios/${usuarioASeguirId}/seguidores`,
//             {
//                 method: "GET",
//                 headers: {
//                     "Authorization": `Bearer ${token}`,
//                 },
//             }
//         );

//         const data = await response.json();

//         if (response.ok && Array.isArray(data)) {
//             const idsSeguidores = data.map((usuario) => usuario.id);
//             setSiguiendo(idsSeguidores.includes(seguidorId));
//         } else {
//             console.error("❌ Error al obtener seguidores:", data.message || data);
//         }
//     } catch (error) {
//         console.error("❌ Error al consultar seguidores:", error);
//     }
// };