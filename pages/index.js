import { faChartPie, faTable } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormData from "form-data";
import Head from "next/head";
import { Container, Nav, Tab } from "react-bootstrap";
import AddEntryModal from "../components/AddEntryModal";
import { withSelectedTodosContext } from "../components/context/SelectedTodosContext";
import DeleteButton from "../components/DeleteButton";
import TodoTable from "../components/TodoTable";
import { login_cookie } from "./api/todo/_login_cookie";

function Home({ todos }) {
  return (
    <div>
      <Head>
        <title>Todo List</title>
        <meta name="description" content="A simple todo list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container className="py-4">
        <Tab.Container defaultActiveKey="table">
          <h3 className="mb-4">
            <span className="d-none d-md-inline">Todo List</span>

            <AddEntryModal>Add Entry</AddEntryModal>

            <DeleteButton></DeleteButton>
          </h3>

          <Tab.Content>
            <Tab.Pane eventKey="table">
              <TodoTable todos={todos}></TodoTable>
            </Tab.Pane>
            <Tab.Pane eventKey="pie">pie chart</Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
    </div>
  );
}

export default withSelectedTodosContext(Home);

export async function getServerSideProps(context) {
  const cookie = await login_cookie();

  const todos = await (
    await fetch(process.env.API_URL + "/checkin/table", {
      // Manually add cookie from login response to this
      // request to be able to keep logged in session.
      // Otherwise, this will return unauthorized error.
      headers: {
        cookie: cookie,
      },
    })
  ).json();

  return {
    props: {
      todos: todos.checkins,
    },
  };
}
