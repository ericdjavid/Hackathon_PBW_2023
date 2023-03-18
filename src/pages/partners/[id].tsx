import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ItemPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState({});

  async function fetchReview() {
    let res = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/getData",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let reviews = await res.json();
    console.log(reviews);
    setData(reviews);
  }

  useEffect(() => {
    fetchReview();
  }, []);


  // Récupérez les données de l'élément à partir de votre source de données (API, base de données, etc.)

  const itemData = {
    id: 1,
    name: 'Item 1',
    description: 'Ceci est la description de l\'Item 1.',
  };

  return (
    <div>
      <h1>{id}</h1>
      <p>{process.env.NEXT_PUBLIC_ANALYTICS_ID}</p>
    </div>
  );
};

export default ItemPage;