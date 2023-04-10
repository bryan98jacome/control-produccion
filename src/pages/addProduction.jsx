import { useEffect, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { getProducts, getReport } from "../firebase/reed";
import InputGroup from 'react-bootstrap/InputGroup';
import swal from 'sweetalert';
import { updateProduct, updateProduction } from "../firebase/update";

export default function AddProduction() {

    const [filas, setFilas] = useState([]);
    const [productos, setProductos] = useState([]);
    const [fecha, setFecha] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        const res = await getProducts();
        setProductos([...res]);
    }

    const handleChange = (event, index) => {
        if (event.target.name === "nota") {
            const nuevasFilas = filas.map(fila => {
                if (fila.ind === index) {
                    return { ...fila, note: event.target.value };
                } else {
                    return fila;
                }
            });
            setFilas(nuevasFilas);
        } else if (event.target.name === "cantidad") {
            const nuevasFilas = filas.map(fila => {
                if (fila.ind === index) {
                    const valorIngresado = event.target.value;
                    if (valorIngresado < 0) {
                        return { ...fila, cant: 0 };
                    } else {
                        const value = parseInt(event.target.value, 10);
                        return { ...fila, cant: value };
                    }
                } else {
                    return fila;
                }
            });
            setFilas(nuevasFilas);
        } else {
            const nuevasFilas = filas.map(fila => {
                if (fila.ind === index) {
                    const producto = productos.find(p => p.code === event.target.value);
                    if (producto) {
                        return { ...fila, code: event.target.value, name: producto.name };
                    } else {
                        return fila;
                    }
                } else {
                    return fila;
                }
            });
            setFilas(nuevasFilas);
        }
    };

    function handleFecha(e) {
        setFecha([{ date: e.target.value }]);
    }

    const agregarFila = () => {
        setFilas([...filas, {
            ind: filas.length,
            code: '',
            name: '',
            note: '',
            cant: 0
        }]);
    };

    const eliminarFila = (index) => {
        const nuevasFilas = filas.filter(fila => fila.ind !== index);
        const filasFinal = nuevasFilas.map((nuevaFila, indice) => {
            return { ...nuevaFila, ind: indice };
        });
        setFilas(filasFinal);
    };

    async function generarStock() {
        const stock = productos.map(producto => {
            const fila = filas.find(f => f.code === producto.code);
            if (fila) {
                return { ...producto, cant: fila.cant };
            } else {
                return producto;
            }
        });
        await updateProduct(stock);
    }

    async function generarProdu() {
        setIsLoading(true);
        if (fecha.length > 0) {
            const res = await getReport(fecha[0].date);
            if (res.length > 0) {
                swal("Imposible!", "Ya se genero un reporte en esta fecha!", "error");
            } else {
                if (filas.length === 0 || fecha.length === 0) {
                    swal("Imposible!", "No puedes generar un reporte con datos vacio!", "error");
                } else {
                    const datosValidos = filas.every(fila => fila.code && fila.note && fila.cant);
                    if (datosValidos) {
                        await updateProduction(fecha, filas);
                        await generarStock();
                    } else {
                        swal("Imposible!", "No puedes generar un reporte con datos vacios!", "error");
                    }
                }
            }
        } else {
            swal("Imposible!", "No puedes generar un reporte con datos vacios!", "error");
        }
        setIsLoading(false);
    }

    return (
        <main className='main-addProdu'>
            <h1>Añadir Nueva Producción</h1>
            <div className="div-addProdu">
                <h3>Reporte</h3>
                <InputGroup className="mb-3">
                    <Form.Control
                        type="date"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        name="fecha" value={fecha.date} onChange={(e) => { handleFecha(e) }}
                    />
                </InputGroup>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Nota</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>

                        {filas.map((fila, index) => (
                            <tr key={index}>
                                <td>
                                    <Form.Control as="select" value={fila.code} onChange={(e) => { handleChange(e, index) }}>
                                        <option value={false} >Elije</option>
                                        {
                                            productos.map((producto) => (
                                                <option value={producto.code} key={producto.code}>{producto.name}</option>
                                            ))
                                        }
                                    </Form.Control>
                                </td>
                                <td>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            type="number"
                                            aria-label="Default"
                                            aria-describedby="inputGroup-sizing-default"
                                            name="cantidad" value={fila.cant} onChange={(e) => { handleChange(e, index) }}
                                        />
                                    </InputGroup>
                                </td>
                                <td>
                                    <InputGroup className="mb-3 inpt-textarea">
                                        <Form.Control
                                            as="textarea"
                                            aria-label="Default"
                                            aria-describedby="inputGroup-sizing-default"
                                            name="nota" value={fila.note} onChange={(e) => { handleChange(e, index) }}
                                        />
                                    </InputGroup>
                                </td>
                                <td><Button variant="danger" onClick={() => { eliminarFila(fila.ind) }}>Eliminar Fila</Button></td>
                            </tr>
                        ))
                        }
                    </tbody>
                </Table>
                <Button variant="success" onClick={agregarFila}>Agregar Fila</Button>
            </div>
            <div className="div-btnGenerar">
                {isLoading === false ?
                    <Button onClick={generarProdu}>Generar reporte</Button> :
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
            </div>
        </main >
    );
}