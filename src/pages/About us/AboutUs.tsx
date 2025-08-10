import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <section style={{backgroundColor: 'rgb(119, 116, 101)'}} id="about" className="bg-gray-900 text-white py-16 px-6 md:px-12 lg:px-32">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-yellow-400">Acerca de Nosotros</h2>
        <p className="text-lg leading-relaxed">
          En <span className="font-semibold text-white">Alforja Café</span>, fusionamos la creatividad, la ciencia y el sabor
          para ofrecerte una experiencia única en cada taza. Nuestro café no solo despierta tus sentidos,
          también rinde homenaje al espíritu innovador que desafía lo convencional.
        </p>
        <p className="text-lg leading-relaxed mt-4">
          Desde nuestros inicios, nos hemos comprometido con ingredientes de alta calidad,
          prácticas sostenibles y un ambiente acogedor donde cada cliente se sienta parte de la historia.
          Ya sea que vengas por tu espresso favorito o por una charla interesante,
          estás en el lugar indicado.
        </p>
        <p className="text-lg leading-relaxed mt-4 italic text-gray-300">
          “No somos solo un café, somos una creación con propósito.”
        </p>
      </div>
    </section>
  );
  
};


export default AboutUs;
