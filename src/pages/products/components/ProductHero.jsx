// src/pages/products/components/ProductHero.jsx

import { useState, useCallback } from "react";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";

const ProductHero = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  // useCallback is kept as a performance optimization.
  const handleSetSelectedImage = useCallback((index) => {
    setSelectedImage(index);
  }, []);

  return (
    <section className="py-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start">
          <ProductGallery
            images={product.images}
            productName={product.name}
            selectedImage={selectedImage}
          />
          <ProductInfo
            product={product}
            images={product.images}
            selectedImage={selectedImage}
            setSelectedImage={handleSetSelectedImage}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductHero;
