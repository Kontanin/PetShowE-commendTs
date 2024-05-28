// import { notFound } from 'next/navigation';
// import products from '../mockData.json';
// import Image from 'next/image';
// import AddToCartButton from './AddToCartButton';
// import PriceTag from '@/components/PriceTag';
// interface ProductPageProps {
//   params: {
//     id: string;
//   };
// }

// export default async function ProductPage({
//   params: { id },
// }: ProductPageProps) {
//   let newp = products.find(product => {
//     if (product.id === id) {
//       return product;
//     }
//   });
//   if (!newp) {
//     console.log('Product not found');
//     return <div>Product not found</div>;
//   }
//   console.log(newp, 'nexp');
//   return (
//     <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
//       <Image
//         src={newp.image}
//         alt={newp.productName}
//         width={500}
//         height={500}
//         className="rounded-lg"
//       />

//       <div>
//         <h1 className="text-5xl font-bold">{newp.productName}</h1>
//         <PriceTag price={newp.unitPrice} className="mt-4" />
//         <p className="py-6">{newp['description ']}</p>
//         <AddToCartButton
//           productId={newp.id}
//           // incrementProductQuantity={incrementProductQuantity}
//         />
//       </div>
//     </div>
//   );
// }
