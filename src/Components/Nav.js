import React from "react";
import { Navbar, Container } from "react-bootstrap";
import {Nav as MyNav} from "react-bootstrap"



export default function Nav() {
  

  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Secret of the Silver Blades</Navbar.Brand>
        <Navbar.Toggle className="ms-auto" aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-evenly"id="basic-navbar-nav">
            <MyNav className="me-auto">
        <MyNav.Link href="/">Character Editor</MyNav.Link>
        <MyNav.Link href="/inventoryedit/">Inventory Editor</MyNav.Link>

        {/* <MyNav.Link href="/recipes/">Recipes</MyNav.Link>
        <MyNav.Link href="/methods/">Methods</MyNav.Link> */}
        </MyNav>
       
          </Navbar.Collapse>
          </Container>
          </Navbar>
  );
}
