import React from 'react';


 async function ProductDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {

    const  {id}  = await params;

    console.log(`Fetching product with ID: ${id}`);



  return (
    <div className="p-6">
      <h1>hello {id} </h1>
    </div>
  );
}

export default ProductDetailPage;