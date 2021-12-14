import FormData from "form-data";

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
export async function login_cookie() {
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

  return loginRequest.headers.get("set-cookie");
}
