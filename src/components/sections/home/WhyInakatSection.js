import React from 'react';
import { useNavigate } from 'react-router-dom';

import semicircleImage from '../../../assets/images/1-home/6.png';


const WhyInakat = () => {
    const navigate = useNavigate();
        
    return (
        <>
            <section className="bg-soft-green text-white">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative w-full h-full min-h-[400px]">
                        <img
                            src={semicircleImage}
                            alt="Por qué INAKAT"
                            className="absolute w-full h-full object-cover left-[-4em]"
                        />
                    </div>
                    <div className="md:w-4/3 flex flex-wrap justify-center md:justify-start gap-4 mt-6 mb-16 md:mt-0 pt-16">
                        <h2 className="text-3xl font-bold mb-6 text-primary-blue">¿Por qué INAKAT?</h2>
                        <p className="text-lg leading-relaxed mb-6">
                            En INAKAT, nos enorgullece ser líderes en el reclutamiento de 
                            talento altamente calificado en diversas ciudades clave de México. 
                            Con una profunda comprensión de las demandas cambiantes del mercado laboral, 
                            hemos establecido nuestra especialización en reclutamiento para asegurar que
                            las empresas encuentren a los profesionales adecuados para llevar sus proyectos al siguiente nivel.
                        </p>
                        <p className="text-lg leading-relaxed mb-6">
                            Nuestro compromiso es unir a los mejores talentos con las compañías
                            que buscan su experiencia.
                        </p>
                        <p className="text-lg leading-relaxed mb-6">
                            Nos esforzamos por comprender las necesidades únicas de cada
                            cliente y candidato, ofreciendo un enfoque personalizado y centrado
                            en resultados.
                        </p>
                        <button
                            onClick={() => navigate('/about')}
                            className="mt-6 bg-lemon-green text-white py-2 px-6 rounded-full hover:bg-title-dark font-bold">
                                CONOCE NUESTRO PROCESO →
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default WhyInakat;