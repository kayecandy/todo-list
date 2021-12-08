import { faChartPie, faTable } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormData from "form-data";
import Head from "next/head";
import { Container, Nav, Tab } from "react-bootstrap";
import AddEntryModal from "../components/AddEntryModal";
import { withSelectedTodosContext } from "../components/context/SelectedTodosContext";
import DeleteButton from "../components/DeleteButton";
import TodoTable from "../components/TodoTable";

function Home({ todos }) {
  return (
    <div>
      <Head>
        <title>Todo List</title>
        <meta name="description" content="A simple todo list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <Tab.Container defaultActiveKey="table">
          <h3>
            <span className="d-none d-md-inline">Personal Time Tracker</span>

            <AddEntryModal>Add Entry</AddEntryModal>

            <DeleteButton></DeleteButton>

            <Nav className="cndce-view-nav float-right mb-4">
              <Nav.Item>
                <Nav.Link id="nav-table" eventKey="table">
                  <FontAwesomeIcon
                    className="d-inline-block"
                    icon={faTable}
                  ></FontAwesomeIcon>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link id="nav-pie" eventKey="pie">
                  <FontAwesomeIcon icon={faChartPie}></FontAwesomeIcon>
                </Nav.Link>
              </Nav.Item>
            </Nav>
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

/**
 * NOTE ON LOGIN!!!!
 * The login credentials used is a band-aid solution
 * for maintaining the session in python.
 *
 * Browsers omit the returned cookie after the initial login
 * and so I have manually set the cookie in the example to
 * be able to access the logged in session and have access
 * to certain api's.
 */
export async function getServerSideProps(context) {
  // Manually login
  // Initial API was designed to have a login feature
  // and so a login request is a band-aid solution for
  // getting access to the actual data.
  const loginRequest = await fetch(process.env.API_URL + "/login", {
    method: "POST",
    body: (() => {
      const loginFormData = new FormData();

      loginFormData.append("username", process.env.API_USERNAME);
      loginFormData.append("password", process.env.API_PASSWORD);

      return loginFormData;
    })(),
  });

  const cookie = loginRequest.headers.get("set-cookie");

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

  // console.log(todos);

  return {
    props: {
      todos: todos.checkins,
    },
  };
}
