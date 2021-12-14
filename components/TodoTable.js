import BootstrapTable from "react-bootstrap-table-next";
import { useSelectedTodos } from "./context/SelectedTodosContext";
import EditEntryModal from "./EditEntryModal";

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
        // clickToSelect: true,
        onSelect: handleSelect,
        onSelectAll: handleSelectAll,
      }}
      classes="table-layout-auto"
      columns={[
        {
          dataField: "id",
          text: "ID",
          sort: true,
        },
        {
          dataField: "tag.name",
          text: "Project",
          sort: true,
          style: {
            lineBreak: "anywhere",
          },
        },
        {
          dataField: "activity",
          text: "Todo",
          sort: true,
        },
        {
          dataField: "date",
          text: "Date Added",
          sort: true,
          sortValue: (a, b) => new Date(a),
        },
        {
          text: "",
          dataField: "",
          formatter: (a, entry) => (
            <EditEntryModal key={entry.id} entry={entry}>
              Edit
            </EditEntryModal>
          ),
        },
      ]}
      data={todos}
    ></BootstrapTable>
  );
}
