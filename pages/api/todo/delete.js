import FormData from "form-data";
import { login_cookie } from "./_login_cookie";

export default async function handler(req, res) {
  /**
   * @type {Array}
   */
  const todoIds = req.body.id;

  const cookie = await login_cookie();

  let _res = [];

  for (let id in todoIds) {
    const deleteReq = await (
      await fetch(process.env.API_URL + "/checkin/delete", {
        method: "POST",
        headers: {
          cookie,
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
