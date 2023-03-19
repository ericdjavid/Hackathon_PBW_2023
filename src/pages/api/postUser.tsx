import clientPromise from "../../lib/mongodb";

 const postUser = async (req:any, res:any) => {
  try {
    const client:any = await clientPromise;
    const db = client.db("pbw");

    let bodyObject = JSON.parse(req.body);
    console.log(req.body);
    let review = await db.collection("user").insertOne(bodyObject);
    res.json({ status: 200, data: review });
  } catch (e:any) {
    console.error(e);
    throw new Error(e).message;
  }
};

export default postUser