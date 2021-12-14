import FormData from "form-data";
import { login_cookie } from "./_login_cookie";

export default async function handler(req, res) {
  const { todo, project } = req.body;

  console.log(req.body);

  const cookie = await login_cookie();

  const addReq = await (
    await fetch(process.env.API_URL + "/checkin/add", {
      method: "POST",
      headers: {
        cookie,
      },
      body: (() => {
        const addFormData = new FormData();

        addFormData.append("activity", todo);
        addFormData.append("tag_name", project);

        /**
         * Add -1 hours to todo as substitute
         * for checkin database
         */
        addFormData.append("hours", -1);

        return addFormData;
      })(),
    })
  ).json();

  res.status(200).send(addReq);
}
