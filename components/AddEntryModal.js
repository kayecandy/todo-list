import FormData from "form-data";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

export default function AddEntryModal({ children = "Add Entry" }) {
  const [show, setShow] = useState();
  const router = useRouter();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleAdd = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const addRes = await fetch("/api/todo/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    setShow(false);

    /**
     * Not the best solution, but for this sample,
     * it works
     */
    router.replace(router.asPath);
  };

  return (
    <>
      <Button
        className="w-auto ms-3 me-3"
        variant="outline-primary"
        onClick={handleShow}
      >
        {children}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Todo</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleAdd}>
            <Form.Control name="todo" placeholder="Activity"></Form.Control>
            <br />
            <Form.Control name="project" placeholder="Project"></Form.Control>
            <br />

            <div>
              <Button variant="primary" type="submit" className="w-100">
                Add Todo
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
