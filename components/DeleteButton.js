import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import { useSelectedTodos } from "./context/SelectedTodosContext";

export default function DeleteButton(props) {
  const [selected] = useSelectedTodos();
  const router = useRouter();

  const handleClick = async () => {
    const deleteRes = await fetch("/api/todo/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: selected.map((s) => s.id),
      }),
    });

    /**
     * Not the best solution, but for this sample,
     * it works
     */
    router.replace(router.asPath);
  };

  return (
    <Button onClick={handleClick} variant="danger">
      <FontAwesomeIcon icon={faTrashAlt} className="me-1"></FontAwesomeIcon>
      Delete
    </Button>
  );
}
