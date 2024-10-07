import React, { useState, useEffect } from 'react';
import CheckoutSteps from '../components/checkoutComponents/CheckoutSteps';
import CheckoutSummary from '../components/checkoutComponents/CheckoutSummary';
import axios from 'axios';
import CheckoutEmpty from './CheckoutEmpty';

const Checkout = () => {
  const [cart, setCart] = useState([]);  // Por defecto, carrito vacío
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para controlar la carga

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/courses/simulate-buy`);
        console.log(response.data);  // Verificar el contenido de la respuesta

        // Solo agregar el curso al carrito si la API lo devuelve
        if (response.data) {
          setCart([response.data]); // Agregar el curso al carrito si hay datos
        }
      } catch (error) {
        console.error('Error fetching course', error);
      } finally {
        setIsLoading(false); // Finaliza la carga independientemente del resultado
      }
    };
  
    fetchCourse();
  }, []);

  const removeCourse = () => {
    // Vaciar el carrito al eliminar el curso
    setCart([]);
  };

  // Mostrar un mensaje de carga mientras se obtienen los datos
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Si el carrito está vacío, mostrar `CheckoutEmpty`
  if (cart.length === 0) {
    return <CheckoutEmpty />;
  }

  return (
    <div className="container mx-auto p-4 py-20">
      <h1 className="font-bold text-[var(--color-black)] text-center pb-16">Checkout</h1>
      <div className="flex flex-col md:flex-row p-6 ">
        {/* Columna izquierda: Pasos del checkout */}
        <div className="md:w-2/3 p-4">
          <CheckoutSteps cart={cart} setCart={setCart} />
        </div>

        {/* Columna derecha: Resumen del carrito */}
        <CheckoutSummary cart={cart} removeCourse={removeCourse} /> 
      </div>
    </div>
  );
};

export default Checkout;
