import { React } from "react";
import { Navbar, Container } from "react-bootstrap";
import { Nav as MyNav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function Nav() {
  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Container>
        <LinkContainer to="/home/">
          <Navbar.Brand id="navbrandTitle">
            Curse of the Secret Pools!
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle className="ms-auto" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          className="justify-content-evenly"
          id="basic-navbar-nav"
        >
          <MyNav className="me-auto" variant="tabs">
            <LinkContainer to="/home/">
              <MyNav.Link>Home</MyNav.Link>
            </LinkContainer>
            <LinkContainer to="/poolrad/">
              <MyNav.Link>Pool of Radiance</MyNav.Link>
            </LinkContainer>
            <LinkContainer to="/azure">
              <MyNav.Link>Curse of the Azure Bonds</MyNav.Link>
            </LinkContainer>
            <LinkContainer to="/silverblades/">
              <MyNav.Link>Secret of the Silver Blades</MyNav.Link>
            </LinkContainer>
            <LinkContainer to="/pod/">
              <MyNav.Link>Pools of Darkness</MyNav.Link>
            </LinkContainer>
            <LinkContainer to="/binarytool/">
              <MyNav.Link style={{ fontStyle: "italic" }}>
                Binary File Tool
              </MyNav.Link>
            </LinkContainer>
          </MyNav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
