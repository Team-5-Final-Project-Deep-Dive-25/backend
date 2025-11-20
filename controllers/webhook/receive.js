import dotenv from "dotenv";
dotenv.config();

const receive = async (req, res) => {
  const mytoken = process.env.MYTOKEN;
  let mode = req.query["hub.mode"];
  let challange = req.query["hub.challenge"];
  let token = req.query["hub.verify_token"];

  if (mode && token) {
    if (mode === "subscribe" && token === mytoken) {
      res.status(200).send(challange);
    } else {
      res.status(403);
    }
  }
};

export default receive;
