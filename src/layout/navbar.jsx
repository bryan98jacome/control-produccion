import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Outlet } from 'react-router-dom';

export default function Navigation() {
    return (
        <main>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/control-produccion/">Rey de los Andes</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="me-auto">
                            <Nav.Link href="/control-produccion/">Inicio</Nav.Link>
                            <NavDropdown title="Añadir" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/control-produccion/addproduction">Producción</NavDropdown.Item>
                                <NavDropdown.Item href="/control-produccion/">Pedido</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="./control-produccion/">Reingreso</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/control-produccion/addproduct">Add Producto</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet></Outlet>
        </main>
    );
}