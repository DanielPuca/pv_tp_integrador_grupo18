

const clienteServices = (() => {


    const URL = 'https://fakestoreapi.com/users';

    const crearCliente = async (cliente) => {

        const respuesta = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        });

        if (!respuesta.ok) {
            throw new Error('Error al crear cliente');
        }

        return await respuesta.json();
    };

    const eliminarCliente = async (id) => {

        const respuesta = await fetch(`${URL}/${id}`, {
            method: 'DELETE'
        });

        if (!respuesta.ok) {
            throw new Error('No se pudo eliminar el cliente');
        }

        return await respuesta.json();
    };

    return {
        crearCliente,
        eliminarCliente
    };

})();

export default clienteServices;