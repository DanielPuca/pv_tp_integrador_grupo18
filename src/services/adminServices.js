import usuarios from '../data/usuarios';

const adminService = (() => {

    const validarAdmin = (usuario, contrasena) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const encontrado = usuarios.find(
                    (u) => u.usuario === usuario && u.contrasena === contrasena
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