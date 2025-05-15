import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../commons/Footer';

// Importación de imágenes
import headerImage from '../../assets/images/3-companies/1.png';
import semicircleImage from '../../assets/images/1-home/6.png';
import testimonialImage1 from '../../assets/images/3-companies/11.png';
import testimonialImage2 from '../../assets/images/3-companies/12.png';
import testimonialImage3 from '../../assets/images/3-companies/13.png';
import icon1 from '../../assets/images/3-companies/5.png';
import icon2 from '../../assets/images/3-companies/6.png';
import icon3 from '../../assets/images/3-companies/7.png';
import icon4 from '../../assets/images/3-companies/8.png';
import icon5 from '../../assets/images/3-companies/9.png';
import icon6 from '../../assets/images/3-companies/10.png';

const Companies = () => {
    const navigate = useNavigate();

    return (
        <>
            <section className="bg-primary-white text-text-black">
                {/* SECCIÓN 1: Header */}
                <div className="min-h-[600px] flex items-center">
                    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-0">
                        <div>
                            <h2 className="text-3xl font-bold text-title-dark mb-6">¿BUSCAS RECLUTAR TALENTO PARA TU EQUIPO?</h2>
                            <p className="text-lg mb-6">
                                Encuentra talento excepcional para tu equipo. Nuestra experiencia en reclutamiento 
                                te brinda los mejores profesionales. Potencia el crecimiento de tu empresa con nosotros.
                            </p>
                            <button className="bg-button-green text-white py-2 px-6 rounded-full hover:bg-green-700">
                                REGÍSTRATE →
                            </button>
                        </div>
                    <div>
                        <img src={headerImage} alt="Empresas" className="w-full h-[480px] object-contain rounded-lg shadow-lg" />
                    </div>
                    </div>
                </div>

                {/* SECCIÓN 2: Cotización en Tiempo Real */}
                <div className="bg-title-dark text-white py-20">
                    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">COTIZA EN TIEMPO REAL</h2>
                            <p className="text-lg mb-6">
                                Una vez que te registres como empresa, podrás acceder a nuestra calculadora 
                                para verificar todas nuestras variables de cotización, asegurando transparencia y optimización.
                            </p>
                            <button className="bg-button-green text-white py-2 px-6 rounded-full hover:bg-green-700">
                                REGÍSTRATE →
                            </button>
                        </div>
                        <div className="relative">
                            <img src={semicircleImage} alt="Semicircle" className="absolute right-0 bottom-0 w-40" />
                        </div>
                    </div>
                </div>

                {/* SECCIÓN 3: Beneficios de INAKAT */}
                <div className="container mx-auto py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-title-dark mb-6">DESCUBRE LOS BENEFICIOS DE INAKAT</h2>
                            <p className="text-lg">
                                Encuentra talento excepcional para tu equipo. Nuestra experiencia en 
                                reclutamiento te brinda los mejores profesionales. Potencia el crecimiento 
                                de tu empresa con nosotros.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {[icon1, icon2, icon3, icon4, icon5, icon6].map((icon, index) => (
                                <div key={index} className="bg-soft-green p-4 rounded-lg text-center shadow-md">
                                    <p className="text-sm font-bold text-white">Beneficio {index + 1}</p>
                                    <img src={icon} alt={`Benefit ${index}`} className="w-16 h-16 mx-auto mb-2" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* SECCIÓN 4: Clientes Satisfechos */}
                <div className="bg-soft-green text-white py-20">
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6">CLIENTES SATISFECHOS</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[testimonialImage1, testimonialImage2, testimonialImage3].map((testimonial, index) => (
                                <div key={index} className="bg-white text-black p-6 rounded-lg shadow-lg">
                                    <img src={testimonial} alt={`Cliente ${index}`} className="w-16 h-16 rounded-full mx-auto mb-4" />
                                    <p className="text-sm">Comentario de cliente {index + 1}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* SECCIÓN 5: Registro de Empresas */}
                <div className="container mx-auto py-20">
                    <h2 className="text-3xl font-bold text-title-dark mb-6 text-center">
                        ÚNETE HOY Y DESCUBRE CÓMO PODEMOS TRANSFORMAR TU EQUIPO
                    </h2>
                    <div className="bg-lemon-green p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className="font-bold">DATOS DEL USUARIO</p>
                            <input type="text" placeholder="Nombre" className="w-full p-3 rounded-lg mb-4" />
                            <input type="text" placeholder="Apellido Paterno" className="w-full p-3 rounded-lg mb-4" />
                            <input type="text" placeholder="Apellido Materno" className="w-full p-3 rounded-lg mb-4" />
                            <button className="bg-button-green text-white py-2 px-6 rounded-full hover:bg-green-700">
                                CARGAR DOCUMENTO →
                            </button>
                        </div>
                        <div>
                            <p className="font-bold">DATOS DE LA EMPRESA</p>
                            <input type="text" placeholder="Nombre de la Empresa" className="w-full p-3 rounded-lg mb-4" />
                            <input type="email" placeholder="Correo Electrónico" className="w-full p-3 rounded-lg mb-4" />
                            <button className="bg-button-green text-white py-2 px-6 rounded-full hover:bg-green-700">
                                CARGAR DOCUMENTO →
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Companies;