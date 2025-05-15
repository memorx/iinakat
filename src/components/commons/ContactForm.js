import React from 'react';
import SocialLinks from './SocialLinks';

const ContactForm = () => {
    return (
        <section className="bg-button-green text-white p-10 pl-9 pr-9 rounded-3xl shadow-lg w-full h-full flex flex-col">
            <h2 className="text-2xl font-bold">ESCRÍBENOS</h2>
            <p className="mt-2">
                Contáctanos para impulsar el futuro de tu empresa con talento altamente calificado.
            </p>

            {/* Formulario */}
            <form 
                className="mt-6 space-y-4"
                action="https://formspree.io/f/mqaewpav" 
                method="POST"
            >
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    className="w-full p-3 pr-6 bg-white text-black border border-gray-300 rounded-full input-field"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    className="w-full p-3 pr-6 bg-white text-black border border-gray-300 rounded-full input-field"
                    required
                />
                <input
                    type="tel"
                    name="telefono"
                    placeholder="Teléfono"
                    className="w-full p-3 pr-6 bg-white text-black border border-gray-300 rounded-full input-field"
                />
                <textarea
                    name="mensaje"
                    placeholder="Escribe tu mensaje..."
                    className="w-full p-7 pr-6 bg-white text-black border border-gray-300 rounded-xl input-field"
                    required
                />

                <p className="text-sm mt-2">
                    *Al dar click en el botón, aceptas nuestros términos y condiciones y política de privacidad.
                </p>

                {/* Botón Enviar */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-button-dark-green text-white font-bold py-3 px-6 rounded-full hover:bg-green-900"
                    >
                        ENVIAR →
                    </button>
                </div>
            </form>
        </section>
    );
};

export default ContactForm;