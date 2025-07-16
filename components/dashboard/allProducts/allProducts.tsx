import React, { useEffect, useState } from "react";

type Product = {
    id: number;
    name: string;
    description: string;
    prices: string;
    images: string[];
    video?: string;
};

const dummyProducts: Product[] = [
    {
        id: 1,
        name: "BANANA CREAM CAKE🍌🍰",
        description: "Creamy,Tart,Fruity Nose: 7/10 Frost: 8/10",
        prices: "3.5g: $30, 7g: $55",
        images: ["https://framerusercontent.com/images/KUF1Ketircgcjo7q2PtYsxZw.png?scale-down-to=1024", "https://framerusercontent.com/images/Qtj2YhEwa15TT1G0aTn4ITQqsQ.png?scale-down-to=1024", "https://framerusercontent.com/images/fNWeKILhqE0bznpp4WcgUvJupSU.png?scale-down-to=1024"],
        video: "https://xgjzloifyvgpbmyonaya.supabase.co/storage/v1/object/public/files/S3g9PlBep0/original",
    },
    {
        id: 2,
        name: "CANDY RAIN💦🍬",
        description: "Sweet,Juicy,Refreshing Nose: 8/10 Frost: 9/10",
        prices: "3.5g: $25, 7g: $50",
        images: ["https://framerusercontent.com/images/b0uvxrbX66bLoFzeZYxhbAjyW0Y.png?scale-down-to=1024", "https://framerusercontent.com/images/LhFshENQ95R5H5IJEHYOIgic.png?scale-down-to=1024", "https://framerusercontent.com/images/NENyveB9IAB6sCDvvohyewqBQ.png?scale-down-to=1024"],
        video: "https://xgjzloifyvgpbmyonaya.supabase.co/storage/v1/object/public/files/S3g9PlBep0/original",
    },
];

const AllProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        // TODO: API call here
        setProducts(dummyProducts);
    }, []);

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => (
                <div key={product.id} className="bg-white/10 backdrop-blur-md border border-gray-700 rounded-lg p-4 shadow hover:shadow-lg transition">
                    <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                    <p className="text-sm mb-2">{product.description}</p>
                    <p className="mb-2 font-medium">{product.prices}</p>

                    <div className="flex gap-2 mb-2">
                        {product.images.map((img, idx) => (
                            <img key={idx} src={img} alt={`${product.name} image ${idx + 1}`} className="w-20 h-20 object-cover rounded" />
                        ))}
                    </div>

                    {product.video && (
                        <video controls className="w-full h-[200px] rounded">
                            <source src={product.video} type="video/mp4" />
                        </video>
                    )}
                </div>
            ))}
        </div>
    );
};

export default AllProducts;