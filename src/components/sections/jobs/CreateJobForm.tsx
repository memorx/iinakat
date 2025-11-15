'use client';

import React, { useState } from 'react';

const CreateJobForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    jobType: 'Tiempo Completo',
    isRemote: false,
    description: '',
    requirements: '',
    companyRating: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          companyRating: formData.companyRating
            ? parseFloat(formData.companyRating)
            : null
        })
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({
          type: 'success',
          message: '¡Vacante creada exitosamente!'
        });

        // Resetear formulario
        setFormData({
          title: '',
          company: '',
          location: '',
          salary: '',
          jobType: 'Tiempo Completo',
          isRemote: false,
          description: '',
          requirements: '',
          companyRating: ''
        });
      } else {
        throw new Error(data.error || 'Error al crear vacante');
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message:
          error instanceof Error ? error.message : 'Error al crear vacante'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6">Publicar Nueva Vacante</h2>

      {submitStatus.type && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            submitStatus.type === 'success'
              ? 'bg-green-100 text-green-800 border-2 border-green-500'
              : 'bg-red-100 text-red-800 border-2 border-red-500'
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Título */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Título del Puesto *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="ej. Desarrollador Full Stack"
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Empresa y Ubicación */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Nombre de la Empresa *
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              placeholder="ej. Tech Corp"
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Ubicación *
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="ej. Monterrey, Nuevo León"
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
        </div>

        {/* Salario y Rating */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Salario *
            </label>
            <input
              type="text"
              value={formData.salary}
              onChange={(e) =>
                setFormData({ ...formData, salary: e.target.value })
              }
              placeholder="ej. $25,000 - $35,000 / mes"
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Rating de la Empresa (opcional)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={formData.companyRating}
              onChange={(e) =>
                setFormData({ ...formData, companyRating: e.target.value })
              }
              placeholder="ej. 4.5"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* Tipo de trabajo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Tipo de Trabajo *
            </label>
            <select
              value={formData.jobType}
              onChange={(e) =>
                setFormData({ ...formData, jobType: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            >
              <option value="Tiempo Completo">Tiempo Completo</option>
              <option value="Medio Tiempo">Medio Tiempo</option>
              <option value="Por Proyecto">Por Proyecto</option>
            </select>
          </div>

          <div className="flex items-center pt-8">
            <input
              type="checkbox"
              id="isRemote"
              checked={formData.isRemote}
              onChange={(e) =>
                setFormData({ ...formData, isRemote: e.target.checked })
              }
              className="w-5 h-5 mr-2"
            />
            <label htmlFor="isRemote" className="font-semibold">
              Trabajo Remoto
            </label>
          </div>
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Descripción del Puesto *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Describe las responsabilidades, el ambiente de trabajo, etc."
            rows={6}
            className="w-full p-3 border border-gray-300 rounded-lg resize-none"
            required
          />
        </div>

        {/* Requisitos */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Requisitos (opcional)
          </label>
          <textarea
            value={formData.requirements}
            onChange={(e) =>
              setFormData({ ...formData, requirements: e.target.value })
            }
            placeholder="Lista los requisitos, habilidades necesarias, experiencia, etc."
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg resize-none"
          />
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-button-green text-white font-bold py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'PUBLICANDO...' : 'PUBLICAR VACANTE'}
        </button>
      </form>
    </div>
  );
};

export default CreateJobForm;
