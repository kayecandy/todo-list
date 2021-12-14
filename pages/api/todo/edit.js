import FormData from "form-data";
import { login_cookie } from "./_login_cookie";

export default async function handler(req, res) {
  const { todo_id, todo, project } = req.body;

  const cookie = await login_cookie();

  const editReq = await (
    await fetch(process.env.API_URL + "/checkin/edit", {
      method: "POST",
      headers: { cookie },
      body: (() => {
        const formData = new FormData();

        formData.append("activity", todo);
        formData.append("tag_name", project);
        formData.append("checkin_id", todo_id);

        return formData;
      })(),
    })
  ).json();

  console.log(editReq);

  res.status(200).send(editReq);
}
