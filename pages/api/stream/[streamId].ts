import axios from "axios";

export default async (req, res) => {
  if (req.method === "GET") {
    const authorizationHeader = req.headers && req.headers["authorization"];
    const streamId = req.query.streamId;
    try {
      const streamStatusResponse = await axios.get(
        `https://livepeer.com/api/stream/${streamId}`,
        {
          headers: {
            "content-type": "application/json",
            authorization: authorizationHeader,
          },
        }
      );

      if (streamStatusResponse && streamStatusResponse.data) {
        res.statusCode = 200;
        res.json({ ...streamStatusResponse.data });
      } else {
        res.statusCode = 500;
        res.json({ error: "Something went wrong" });
      }
    } catch (error) {
      res.statusCode = 500;
      res.json({ error });
    }
  }
};
