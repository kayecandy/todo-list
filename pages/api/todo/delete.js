import FormData from "form-data";

export default async function handler(req, res) {
  /**
   * @type {Array}
   */
  const todoIds = req.body.id;

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

  let _res = [];

  for (let id in todoIds) {
    const deleteReq = await (
      await fetch(process.env.API_URL + "/checkin/delete", {
        method: "POST",
        headers: {
          cookie: cookie,
        },
        body: (() => {
          const deleteFormData = new FormData();
          deleteFormData.append("checkin_id", todoIds[id]);

          return deleteFormData;
        })(),
      })
    ).json();

    _res.push(deleteReq);
  }

  res.status(200).send({ _res });
}
