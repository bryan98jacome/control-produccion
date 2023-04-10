import { useEffect, useState } from "react";
import { Button, Form, InputGroup, Spinner, Table } from "react-bootstrap";
import { getProducts, getReport } from "../firebase/reed";
import swal from 'sweetalert';

export default function Home() {

    const [productos, setProductos] = useState([]);
    const [reporte, setReporte] = useState([]);
    const [fecha, setFecha] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [totalStock, setTotalStock] = useState(0);

    useEffect(() => {
        sumaReport();
    }, [reporte]);

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        sumaStock();
    }, [productos]);

    async function getData() {
        const res = await getProducts();
        setProductos([...res]);
    }

    async function obtenerReporte() {
        setIsLoading(true);
        const res = await getReport(fecha);
        if (res.length !== 0) { setReporte(...res); }
        else {
            setReporte([]);
            swal("Imposible!", "No existe un preporte en esta fecha!", "warning");
        }
        setIsLoading(false);
    }

    function renderStock() {
        if (productos.length === 0) {
            return (<tr><td colSpan={3} className="td-sininfo">Sin información</td></tr>);
        } else {

            return productos.map(producto => (
                <tr key={producto.code}>
                    <td>{producto.code}</td>
                    <td>{producto.name}</td>
                    <td>{producto.cant}</td>
                </tr>
            ));
        }
    }

    function sumaStock() {
        const total = productos.reduce((acc, datos) => {
            return acc + datos.cant;
        }, 0);
        setTotalStock(total);
    }

    function renderReport() {
        if (reporte.length === 0) {
            return (<tr><td colSpan={4} className="td-sininfo">Sin información</td></tr>);
        } else {
            return reporte.map(datos => (
                <tr key={datos.code}>
                    <td>{datos.code}</td>
                    <td>{datos.name}</td>
                    <td>{datos.note}</td>
                    <td>{datos.cant}</td>
                </tr>
            ));
        }
    }

    function sumaReport() {
        const total = reporte.reduce((acc, datos) => {
            return acc + datos.cant;
        }, 0);
        setTotal(total);
    }

    return (
        <main className="main-home">
            <h1>Control de Producción</h1>
            <section className="section-repot">
                <h3>Stock</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Nombre</th>
                            <th>Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderStock()}
                        <tr>
                            <td colSpan={2}>Total</td>
                            <td>{totalStock}</td>
                        </tr>
                    </tbody>
                </Table>
            </section>
            <section className="section-repot">
                <h3>Reporte</h3>
                <div className="div-obrepot">
                    <InputGroup className="mb-3">
                        <Form.Control
                            type="date"
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            name="fecha" value={fecha} onChange={(e) => { setFecha(e.target.value) }}
                        />
                    </InputGroup>
                    {isLoading === false ?
                        <Button variant="primary" onClick={obtenerReporte}>Obtener reporte</Button> :
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
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Nombre</th>
                            <th>Nota</th>
                            <th>Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderReport()}
                        <tr>
                            <td colSpan={3}>Total</td>
                            <td>{total}</td>
                        </tr>
                    </tbody>
                </Table>
            </section>
        </main>
    );
}