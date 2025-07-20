import React from 'react';

type ProductProps = {
  params: {
    id: string;
  };
}

 async function ProductDetailPage({ params }: ProductProps) {

    const { id } = params;

    console.log(`Fetching product with ID: ${id}`);



  return (
    <div className="p-6">
      <h1>hello</h1>
    </div>
  );
}

export default ProductDetailPage;