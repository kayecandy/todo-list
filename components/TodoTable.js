import { Form, Table } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { useSelectedTodos } from "./context/SelectedTodosContext";

export default function TodoTable({ todos = [] }) {
  const [selected, setSelected] = useSelectedTodos();

  const handleSelect = (row, isSelect) => {
    if (isSelect) {
      setSelected([...selected, row]);
    } else {
      setSelected(selected.filter((_s) => _s != row));
    }
  };

  const handleSelectAll = (isSelect, rows) => {
    if (isSelect) {
      setSelected(rows);
    } else {
      setSelected([]);
    }
  };

  return (
    <BootstrapTable
      bootstrap4
      keyField="id"
      selectRow={{
        mode: "checkbox",
        clickToSelect: true,
        onSelect: handleSelect,
        onSelectAll: handleSelectAll,
      }}
      columns={[
        {
          dataField: "id",
          text: "ID",
          sort: true,
        },
        {
          dataField: "hours",
          text: "Duration",
          sort: true,
        },
        {
          dataField: "tag.name",
          text: "Project",
          sort: true,
        },
        {
          dataField: "activity",
          text: "Todo",
          sort: true,
        },
        {
          dataField: "date",
          text: "Date",
          sort: true,
        },
      ]}
      data={todos}
    ></BootstrapTable>
  );
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th data-field="state" data-checkbox="true" data-sortable="true"></th>
          <th data-field="id" data-sortable="true">
            ID
          </th>
          <th data-field="hours" data-sortable="true">
            Duration
          </th>
          <th data-field="tag.name" data-sortable="true">
            Project
          </th>
          <th data-field="activity" data-sortable="true">
            Todo
          </th>
          <th data-field="date" data-sortable="true">
            Date
          </th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <tr key={todo.id}>
            <td>
              <Form.Check type="checkbox"></Form.Check>
            </td>
            <td>{todo.id}</td>
            <td>{todo.hours}</td>
            <td>{todo.tag.name}</td>
            <td>{todo.activity}</td>
            <td>{todo.date}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
