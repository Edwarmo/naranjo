import React from 'react';
import Slider from 'react-slick';

interface Product {
  id: number;
  name: string;
  description: string;
  type: string;
  price: number;
}

interface CarouselProps {
  products: Product[];
}

const Carousel: React.FC<CarouselProps> = ({ products }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <div className="my-8 container mx-auto">
      <h2 className="text-2xl font-bold text-amber-800 mb-4">Productos Destacados</h2>
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className="p-4">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-amber-800 font-bold">${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;