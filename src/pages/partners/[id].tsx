import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ItemPage = () => {
  const router = useRouter();
  console.log(router)
  const { id } = router.query;

  const [data, setData] = useState([]);
  const [theid, setTheId] = useState(0);

  async function fetchReview() {
    let res = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + `/api/getProduct?id=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let reviews = await res.json();
    console.log(reviews);
    setData(reviews.data);
  }

  useEffect(() => {
    fetchReview();
  }, []);


  // Récupérez les données de l'élément à partir de votre source de données (API, base de données, etc.)

  return (
    <div>

      <div className='w-full flex sm:flex-col md:flex-row flex-wrap gap-y-8 m-5'>
        {
          data.map((e: any) => (
            <div className="w-1/4 rounded overflow-hidden shadow-lg bg-white mx-4 "
              key={e.name}
            >
              {/* <Link href={`/partners/${e.index}`}> */}
              {/* <Image className="w-full bg-cover" src={e.image} alt="Sunset in the mountains" width={100} height={100} /> */}
              <div className="px-6 py-4">
                <div className="text-black font-bold text-xl mb-2">{e.nom}</div>
                <p className="text-gray-700 text-base pb-2">
                  Description: {e.description}
                </p>
              <div className="pb-2 text-black">
                Prix: {e.prix} €
              </div>
              <div className="pb-2 text-black">
                Cashback: {e.fixCashback} XRPL
              </div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Order
              </button>
              </div>
              {/* </Link> */}
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default ItemPage;