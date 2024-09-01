import { Logout } from '@store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Mainnavbar = () => {
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="categories">
              Categories
            </Nav.Link>
            <Nav.Link as={NavLink} to="about-us">
              About
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!token ? (
              <>
                <Nav.Link as={NavLink} to="login">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="register">
                  Register
                </Nav.Link>
              </>
            ) : (
              <NavDropdown
                title={`welcome ${user.firstName} ${user.lastName}`}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item to="profile" end as={NavLink}>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item to="profile/orders" as={NavLink}>
                  Orders
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => dispatch(Logout())}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Mainnavbar;
