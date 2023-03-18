import { useRouter } from 'next/router';

const ItemPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // Récupérez les données de l'élément à partir de votre source de données (API, base de données, etc.)

  const itemData = {
    id: 1,
    name: 'Item 1',
    description: 'Ceci est la description de l\'Item 1.',
  };

  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
};

export default ItemPage;