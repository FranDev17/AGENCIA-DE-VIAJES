import React, { useState } from 'react';
import { motion } from 'framer-motion';
import loginImage from '../../assets/LOGIN.png'; 
import { use } from 'react';
export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

const handleSubmit = async (e) => {
  e.preventDefault();

  const url = isLogin
    ? 'http://localhost:5251/api/user/login'
    : 'http://localhost:5251/api/user/register';

  const data = isLogin
    ? { email, password }
    : { name, email, password };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error('Error en la solicitud');
    }

    const result = await res.json();
    console.log('✅ Éxito:', result);
    // redirigir o mostrar mensaje de éxito

  } catch (error) {
    console.error('❌ Error:', error);
    // mostrar mensaje de error
  }
};


  // Estados para los campos del formulario
  const [name,setname] = useState('');
  const [email,setemail] = useState('');
  const [password,setpassword] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Fondo animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent"></div>
        {/* Elementos flotantes decorativos */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-20 left-20 w-24 h-24 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-6xl h-[650px] mx-4"
      >
        {/* Contenedor principal */}
        <div className="relative w-full h-full bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-white/20">
          {/* Panel visual izquierdo/derecho */}
          <motion.div
            initial={false}
            animate={{
              x: isLogin ? 0 : '100%',
            }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="absolute top-0 left-0 h-full w-1/2 z-10"
          >
            <div className="relative h-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-12 flex flex-col justify-center items-center text-white overflow-hidden">
              {/* Patrones decorativos */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-20 h-20 border border-white/30 rounded-full"></div>
                <div className="absolute top-32 right-16 w-16 h-16 border border-white/20 rounded-full"></div>
                <div className="absolute bottom-20 left-20 w-12 h-12 border border-white/40 rounded-full"></div>
                <div className="absolute bottom-32 right-12 w-24 h-24 border border-white/15 rounded-full"></div>
              </div>

              {/* Contenido */}
              <motion.div
                key={isLogin ? 'login' : 'signup'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center z-10"
              >
                
                <div className="w-60 h-60 mx-auto mb-6">
                  <img
                    src={loginImage}
                    alt="Login"
                    className="w-full h-full object-contain"
                  />
                </div>

                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent">
                  {isLogin ? '¡Hola de nuevo!' : 'Únete a nosotros'}
                </h2>

                <p className="text-cyan-100 mb-8 text-lg leading-relaxed max-w-xs">
                  {isLogin
                    ? 'Donde tus viajes se convierten en experiencias inolvidables'
                    : 'Comienza tu aventura y descubre lugares increíbles'}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full text-white font-medium transition-all duration-300 hover:shadow-lg"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? 'Crear cuenta nueva' : 'Ya tengo cuenta'}
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* Panel de formulario */}
          <motion.div
            initial={false}
            animate={{
              x: isLogin ? '100%' : 0,
            }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="absolute top-0 left-0 h-full w-1/2 bg-white/95 backdrop-blur-sm"
          >
            <div className="h-full p-12 flex flex-col justify-center">
              <motion.div
                key={isLogin ? 'login-form' : 'signup-form'}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="mb-8">
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">
                    {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                  </h3>
                  <p className="text-gray-600">
                    {isLogin ? 'Accede a tu cuenta' : 'Únete a Aqua Scape hoy'}
                  </p>
                </div>

                <div className="space-y-5">
                  {!isLogin && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <input
                        type="text"
                        placeholder="Nombre Completo"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        className="w-full px-4 py-4 bg-blue-50 border border-blue-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-blue-100"
                      />
                    </motion.div>
                  )}

                  <div>
                    <input
                      type="email"
                      placeholder="Correo Electrónico"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                      className="w-full px-4 py-4 bg-blue-50 border border-blue-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-blue-100"
                    />
                  </div>

                  <div>
                    <input
                      type="password"
                      placeholder="Contraseña"
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                      className="w-full px-4 py-4 bg-blue-50 border border-blue-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-blue-100"
                    />
                  </div>

            

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                  </motion.button>
                </div>

                
              

               
                
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}