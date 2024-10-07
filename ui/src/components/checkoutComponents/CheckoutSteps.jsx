import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CheckoutSteps = ({ cart }) => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: 'Test Name',
    email: 'testemail@test.com',
    address: 'Far Far Away',
    cardNumber: '4111 1111 1111 1111', 
    expiryDate: '12/25',               
    cvv: '123',                       

  });
  const [errors, setErrors] = useState({});

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.address) newErrors.address = 'Address is required';
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;  // Solo validar estos campos en el paso 1
  };


  const nextStep = () => {
    if (step === 1 && !validateStep1()) {
      console.log("Validation failed for step 1", errors);  // Añadir log para comprobar errores
      return;
    }
    setStep(step + 1);
  };
  

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleConfirmOrder = async () => {
    try {
      
      // Crear el usuario en el backend o continuar si ya existe
      const registerResponse = await axios.post('/api/auth/register', {
        name: formData.name,  // Nombre del usuario
        email: formData.email,  // Email del usuario
        password: '1234'  // Contraseña fija para todos los usuarios registrados durante este testeo
      });
  

      
      // Iniciar sesión automáticamente después de crear el usuario
      const loginResponse = await axios.post('/api/auth/login', {
        email: formData.email,
        password: '1234'
      });
      

      
      // Intentar asignar el curso al usuario autenticado
      try {
        await axios.put(`/api/courses/67001dc00f968533a71ee9e7/assign`, {
          userId: loginResponse.data.user._id  // ID del usuario autenticado
        });
        console.log("Course assigned successfully");
      } catch (assignError) {
        // Si el curso ya está asignado, simplemente continuar
        if (assignError.response && assignError.response.data.message === "Course already assigned to this user") {
          console.log("Course already assigned, continuing to success page");
        } else {
          // Si es otro error, lanzarlo
          throw assignError;
        }
      }
    
      // Redirigir a la página de confirmación
      navigate('/confirmationcoursebought', { state: { email: formData.email, password: '1234' } });
    } catch (error) {
      console.error("Error creating user or assigning course:", error.response?.data || error.message);
    }
  };
  
  
  
  
  

  return (
    <div className="p-4 pr-20 ">
      <div className="mb-8">
        <div className="flex items-center">
          <div className={`flex-1 border-t-2 ${step >= 1 ? 'border-[var(--color-yellow)]' : 'border-gray-300'}`} />
          <div
            className={`px-4 py-2 rounded-full cursor-pointer ${step >= 1 ? 'bg-[var(--color-yellow)] text-white' : 'bg-gray-300 text-gray-600'}`}
            onClick={() => setStep(1)}
          >
            1
          </div>
          <div className={`flex-1 border-t-2 ${step >= 2 ? 'border-[var(--color-yellow)]' : 'border-gray-300'}`} />
          <div
            className={`px-4 py-2 rounded-full cursor-pointer ${step >= 2 ? 'bg-[var(--color-yellow)] text-white' : 'bg-gray-300 text-gray-600'}`}
            onClick={() => setStep(2)}
          >
            2
          </div>
          <div className={`flex-1 border-t-2 ${step >= 3 ? 'border-[var(--color-yellow)]' : 'border-gray-300'}`} />
          <div
            className={`px-4 py-2 rounded-full cursor-pointer ${step >= 3 ? 'bg-[var(--color-yellow)] text-white' : 'bg-gray-300 text-gray-600'}`}
            onClick={() => setStep(3)}
          >
            3
          </div>
          <div className="flex-1 border-t-2 border-gray-300" />
        </div>
      </div>
      {step === 1 && (
        <div>
          <p className="font-bold text-2xl pt-6 my-4">Step 1: Personal Information</p>
          <form>
            <div className="mb-4">
              <label className="block text-lg font-medium mb-2" htmlFor="name">Name</label>
              <input 
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="field " 
                id="name" 
                name="name" 
                required 
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium mb-2" htmlFor="email">Email</label>
              <input 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="field" 
                id="email" 
                name="email" 
                required 
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium mb-2" htmlFor="address">Address</label>
              <input 
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="field" 
                id="address" 
                name="address" 
                required 
              />
              {errors.address && <p className="text-red-500">{errors.address}</p>}
            </div>
            <button type="button" onClick={nextStep} className="flex btn mt-6 ml-auto">Next</button>
          </form>
        </div>
      )}
      {step === 2 && (
        <div>
          <p className="font-bold text-3xl pt-6 my-4">Step 2: Payment Method</p>
          <form>
            <div className="mb-4">
              <label className="block text-lg font-medium mb-2" htmlFor="cardNumber">Card Number</label>
              <input 
                type="text"
                value={formData.cardNumber}
                onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                className="field" 
                id="cardNumber" 
                name="cardNumber" 
                required 
              />
              {errors.cardNumber && <p className="text-red-500">{errors.cardNumber}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium mb-2" htmlFor="expiryDate">Expiry Date</label>
              <input 
                type="text"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="field" 
                id="expiryDate" 
                name="expiryDate" 
                required 
              />
              {errors.expiryDate && <p className="text-red-500">{errors.expiryDate}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium mb-2" htmlFor="cvv">CVV</label>
              <input 
                type="text"
                value={formData.cvv}
                onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                className="field" 
                id="cvv" 
                name="cvv" 
                required 
              />
              {errors.cvv && <p className="text-red-500">{errors.cvv}</p>}
            </div>
            <div className="flex justify-between ">
              <button type="button" onClick={prevStep} className="btn bg-gray-400 mt-4">Back</button>
              <button type="button" onClick={nextStep} className="btn mt-4">Next</button>
            </div>
          </form>
        </div>
      )}
      {step === 3 && (
        <div>
          <p className="font-bold text-2xl pt-6 my-4">Step 3: Review & Confirm</p>
          <div>
            <h3 className="font-bold text-xl">Order Summary</h3>
            {/* Resumen de la orden con los detalles del carrito */}
            {cart.map((item, index) => (
  <div key={item._id || index} className="flex justify-between">
    <div>
      <p>x1</p> {/* Mostrar siempre "x1" */}
      <p>Python Programming</p> {/* Nombre del curso estático */}
    </div>
    <div>
      <p>Price: 49,99 €</p> {/* Precio del curso estático */}
    </div>
  </div>
))}





          </div>
          <div className="flex justify-between mt-8">
            <button type="button" onClick={prevStep} className="btn bg-gray-400 mt-4">Back</button>
            <button type="button" onClick={handleConfirmOrder} className="btn mt-4">Confirm Order</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutSteps;