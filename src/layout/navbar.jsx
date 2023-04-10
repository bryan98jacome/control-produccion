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
                    <Navbar.Brand href="/">Rey de los Andes</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Inicio</Nav.Link>
                            <NavDropdown title="Añadir" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/addproduction">Producción</NavDropdown.Item>
                                <NavDropdown.Item href="/">Pedido</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/">Reingreso</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/addproduct">Add Producto</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet></Outlet>
        </main>
    );
}