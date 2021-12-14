import FormData from "form-data";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export default function EditEntryModal({ children = "Edit", entry = {} }) {
  const [show, setShow] = useState();
  const router = useRouter();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleEdit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append("todo_id", entry.id);

    const editRes = await fetch("/api/todo/edit", {
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
      <Button onClick={handleShow}>{children}</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Modal</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleEdit}>
            <b>Todo</b>
            <Form.Control
              name="todo"
              placeholder="Activity"
              defaultValue={entry.activity}
            ></Form.Control>
            <br />

            <b>Project</b>
            <Form.Control
              name="project"
              placeholder="Project"
              defaultValue={entry.tag.name}
            ></Form.Control>
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
