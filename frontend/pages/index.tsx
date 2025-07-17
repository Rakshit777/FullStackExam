import { GetServerSideProps } from 'next';
import axios from 'axios';
import Link from 'next/link';

export default function Home({ products }: any) {
  return (
    <div>
      <h1>Product Listing</h1>
      {products.map((product: any) => (
        <div key={product._id}>
          <Link href={`/product/${product._id}`}>{product.name}</Link>
        </div>
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
    console.log("Sample");
    
  const res = await axios.get('http://localhost:5000/products');
  console.log(res);
  return {
    props: {
      products: res.data,
    },
  };
};
