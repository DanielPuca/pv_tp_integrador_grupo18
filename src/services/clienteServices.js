const URL = 'https://fakestoreapi.com/users123';

const crearCliente = async (cliente) => {

    const respuesta = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
    });

    return await respuesta.json();
};

export default {
    crearCliente
};