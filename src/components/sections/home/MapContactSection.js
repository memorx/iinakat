import React from 'react';
import ContactForm from '../../commons/ContactForm';
import mapImage from '../../../assets/images/2-about/27.png';

const MapContact = () => {
    return (
        <section className="bg-custom-beige py-20">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
                
                {/* Columna Izquierda: Mapa y Texto */}
                <div className="bg-title-dark text-white p-10 pl-9 pr-9 rounded-3xl shadow-lg w-full h-full flex flex-col">
                    <h2 className="text-3xl font-bold mb-4">
                        TENEMOS PRESENCIA EN LA MAYORÍA DE LOS ESTADOS DE LA REPÚBLICA MEXICANA
                    </h2>
                    <p className="text-lg mb-6">
                        Contamos con conexiones estratégicas para abarcar cualquier necesidad, sin importar la localización.
                    </p>
                    <img src={mapImage} alt="Mapa de México" className="w-full rounded-2xl mt-auto" />
                </div>

                {/* Columna Derecha: Formulario de Contacto */}
                <ContactForm />
            </div>
        </section>
    );
};

export default MapContact;