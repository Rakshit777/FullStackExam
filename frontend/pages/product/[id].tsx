import { GetServerSideProps } from 'next';
import axios from 'axios';

export default function Product({ product }: any) {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await axios.get(`http://localhost:5000/products/${context.params?.id}`);
  return {
    props: {
      product: res.data,
    },
  };
};
