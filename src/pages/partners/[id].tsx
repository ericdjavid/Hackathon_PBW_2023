import Layout from '@/components/layout';
import Modal from '@/components/modal_box';
import PaymentButton from '@/components/payment_button';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ItemPage = () => {
  const router: any = useRouter();
  const id = router.query.id;

  const [data, setData] = useState([]);
  const [gated, setGated] = useState<boolean>(false)
  const [myNft, setMyNft] = useState()

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
    // console.log(reviews);
    setData(reviews.data);
  }

  useEffect(() => {
    const fetchData = async () => {
      const cookieValue:any = await Cookies.get('nfts') || null;
      setMyNft(cookieValue);
    };

    fetchData()
      
    if (myNft != null) {
      setGated(true)
      console.log("gated is" + gated)
    }
    fetchReview();
  }, []);


  // Récupérez les données de l'élément à partir de votre source de données (API, base de données, etc.)

  return (
    <Layout>
      <div>
        <div className='w-full flex sm:flex-col md:flex-row flex-wrap gap-y-8 my-5'>
          {
            data.map((e: any) => (
              <div className="w-full sm:w-1/4 rounded overflow-hidden shadow-lg bg-white mx-auto sm:mx-4 "
                key={e.name}
              >
                {/* <Link href={`/partners/${e.index}`}> */}
                <Image className="bg-cover object-cover w-full h-52 " src={e.image} alt={e.nom} width={1000} height={1000} />
                <div className="px-6 py-4">
                  <div className="text-black font-bold text-xl mb-2">{e.nom}</div>
                  <p className="text-gray-700 text-base pb-2">
                    Description: {e.description}
                  </p>
                  <div className="pb-2 text-black">
                    Prix: {e.prix} € ({(e.prix / 0.3).toFixed(2)} XRP )
                  </div>
                  <div className="pb-2 text-black">
                    Cashback: {(e.fixCashback / 0.3).toFixed(2)} XRP ({e.fixCashback}€ )
                  </div>
                  {
                    gated ? (
                  <div className="my-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Beware captain!</strong>
                    <span className="block sm:inline"> You don&apos;t have the good NFT to get some cashbacks.</span>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    </span>
                  </div>)
                  : 
                 ( <div className="my-2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Welcome on board ! </strong>
                    <span className="block sm:inline"> You are qualified for the cashbaXx!</span>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    </span>
                  </div>)

                  }
                  <div className='flex justify-start h-full align-bottom gap-x-2'>

                    {e.stripe ? (
                      <button className="bg-blue-500 hover:bg-blue-700 w-1/2 text-white font-bold py-2 px-4 rounded">
                        <a target="_blank" href={e.stripe}>
                          Pay with Stripe
                        </a>
                      </button>
                    ) : null}
                    {/* <button className="bg-gray-400 w-1/2 text-gray-600 font-bold py-2 px-4 rounded cursor-default">
                      Crypto (soon)
                    </button> */}

                    {/* <PaymentButton amount={e.prix / 0.3}/> */}
                  </div>
                </div>

    <Modal amount={(e.prix / 0.3).toFixed(2)}/>
                {/* </Link> */}
              </div>
            ))
          }
        </div>
      </div>
    </Layout>
  );
};


export default ItemPage;