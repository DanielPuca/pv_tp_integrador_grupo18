

const adminService = (() => {

    const admins = [
        { id: 1, nombre: "Daniel Puca", usuario: "Dapuca", contrasena: "Dan1234", rol: "Gerencia" },
        { id: 2, nombre: "Antonella Csongedy", usuario: "Ancsongedy", contrasena: "Ant1234", rol: "Soporte" },
        { id: 3, nombre: "Lucas Velasquez", usuario: "Luvelasquez", contrasena: "Luc1234", rol: "Soporte" }
    ];

    const validarAdmin = (usuario, contrasena) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const encontrado = admins.find(
                    (a) => a.usuario === usuario && a.contrasena === contrasena
                );
                if (encontrado) {
                    resolve(encontrado);
                } else {
                    reject(new Error('Usuario o contraseña incorrectos'));
                }
            }, 800);
        });
    };

    return { validarAdmin };
})();

export default adminService;