import clientPromise from "../../lib/mongodb";

const getData = async (req: any, res: any) => {
  try {
    const client:any = await clientPromise;
    const db:any = client.db("pbw");
    console.log(req?.query)
    let data = await db.collection("produit").find({ partnerIndex: req?.query?.id}).toArray();
    res.json({ status: 200, data: data });
  } catch (e:any) {
    console.error(e);
    throw new Error(e).message;
  }
};

export default getData