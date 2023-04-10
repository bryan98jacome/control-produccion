import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import swal from 'sweetalert';
import Spinner from 'react-bootstrap/Spinner';
import { existProduct } from '../firebase/reed';
import { createProduct } from '../firebase/update';

export default function AddProduct() {

    const [nombre, setNombre] = useState('');
    const [codigo, setCodigo] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit() {
        setIsLoading(true);
        if (nombre === '' || codigo === '') {
            swal("Imposible!", "Debes llenar los campos!", "warning");
        } else {
            if (await existProduct(nombre, codigo)) {
                await createProduct(nombre, codigo);
            } else { swal("Imposible!", "El producto ya existe!", "warning"); }
        }
        setIsLoading(false);
    }

    return (
        <main className='main-addProd'>
            <h1>Añadir Nuevo producto</h1>
            <div className='div-form'>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese un nombre"
                            onChange={(e) => { setNombre(e.target.value.trim()) }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Codigo</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese un codigo"
                            onChange={(e) => { setCodigo(e.target.value.trim()) }}
                        />
                    </Form.Group>
                    {isLoading === false ?
                        <Button variant="primary" onClick={handleSubmit}>Añadir</Button> :
                        <Button variant="primary" disabled>
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            Loading...
                        </Button>}
                </Form>
            </div>
        </main>
    );
}