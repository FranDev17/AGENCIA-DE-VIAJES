import React from 'react';
import sublogoImage from '../assets/LOGOHEADER.png';
import headerImage from '../assets/HEADER.jpg';
import headerImage2 from '../assets/HEADER2.jpg';
import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Header = () => {
  const [userName, setUserName] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [headerImage, headerImage2];

 
  const { scrollY } = useScroll();
  

  const yBg = useTransform(scrollY, [0, 1500], [0, -200]);
  const yContent = useTransform(scrollY, [0, 1200], [0, -100]); 
  const yLogo = useTransform(scrollY, [0, 800], [0, -50]); 
  const scale = useTransform(scrollY, [0, 800], [1, 1.05]); 
  const opacity = useTransform(scrollY, [0, 600], [1, 0.2]); 
  
  
  const blur = useTransform(scrollY, [0, 400], [0, 3]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.name) {
      setUserName(user.name);
    }
  }, []);

 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); 

    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = (index) => {
    setCurrentImageIndex(index);
  };

  const goToPrevious = () => {
    setCurrentImageIndex(currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1);
  };

  const goToNext = () => {
    setCurrentImageIndex(currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1);
  };

  return (
    <>
     
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 -z-50" />
      
      <motion.header 
        className="relative h-screen w-full overflow-hidden"
        style={{ zIndex: 40 }}
      >
        
        <motion.div 
          className="absolute inset-0 will-change-transform"
          style={{ 
            y: yBg, 
            scale,
            filter: blur.get() > 0 ? `blur(${blur.get()}px)` : 'none'
          }}
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              className={`absolute inset-0 transition-all duration-[1500ms] ease-in-out ${
                index === currentImageIndex 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-110'
              }`}
            >
              <img
                src={image}
                alt={`Header background ${index + 1}`}
                className="absolute top-0 left-0 w-full h-[120%] object-cover filter brightness-110 contrast-105"
                style={{ 
                  transform: 'translateZ(0)', 
                  backfaceVisibility: 'hidden'
                }}
              />
            </motion.div>
          ))}
          
         
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-transparent to-teal-900/30"></div>
          
          
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/60"
            style={{ opacity: useTransform(scrollY, [0, 400], [0, 0.6]) }}
          />
        </motion.div>

       
        <motion.div 
          className="absolute inset-0 z-20"
          style={{ opacity }}
        >
          
          <motion.button
            onClick={goToPrevious}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-2xl transition-all duration-300 backdrop-blur-md border border-white/20 hover:border-white/40 hover:scale-110 group"
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="transform group-hover:-translate-x-0.5 transition-transform">&#8249;</span>
          </motion.button>

         
          <motion.button
            onClick={goToNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-2xl transition-all duration-300 backdrop-blur-md border border-white/20 hover:border-white/40 hover:scale-110 group"
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="transform group-hover:translate-x-0.5 transition-transform">&#8250;</span>
          </motion.button>

         
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-4">
            {images.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative transition-all duration-500 ${
                  index === currentImageIndex 
                    ? 'w-12 h-3' 
                    : 'w-3 h-3 hover:w-4'
                } rounded-full overflow-hidden group`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
                  index === currentImageIndex 
                    ? 'bg-gradient-to-r from-yellow-400 to-amber-500 shadow-lg shadow-yellow-400/50' 
                    : 'bg-white/40 hover:bg-white/60 backdrop-blur-sm'
                }`} />
                {index === currentImageIndex && (
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full animate-pulse opacity-60" />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        
        <motion.div 
          className="absolute inset-0 z-5 pointer-events-none"
          style={{ opacity: useTransform(scrollY, [0, 300], [1, 0]) }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${15 + (i * 12)}%`,
                top: `${25 + (i * 8)}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 3 + (i * 0.5),
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>

    
        <motion.div 
          className="relative z-30 h-full flex flex-col justify-between text-white px-6 py-8 will-change-transform"
          style={{ 
            y: yContent, 
            opacity,
            filter: useTransform(scrollY, [0, 300], ["blur(0px)", "blur(1px)"])
          }}
        >
          
          <motion.div 
            className="flex justify-between items-start"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center space-x-4">
              <motion.div 
                className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-3 border border-white/20"
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.15)" }}
              >
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Aqua Scape
                </h1>
              </motion.div>
              {userName && (
                <motion.div 
                  className="bg-gradient-to-r from-yellow-400/20 to-amber-500/20 backdrop-blur-md rounded-xl px-4 py-2 border border-yellow-400/30"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h2 className="text-lg font-semibold text-yellow-200">
                    ¡Hola, {userName}!
                  </h2>
                </motion.div>
              )}
            </div>
            
           
            <motion.div 
              className="bg-black/30 backdrop-blur-md rounded-full px-4 py-2 text-sm font-medium border border-white/20"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.4)" }}
            >
              {currentImageIndex + 1} / {images.length}
            </motion.div>
          </motion.div>

          {/* Contenido central */}
          <motion.div 
            className="text-center relative flex-1 flex items-center justify-center"
            style={{ y: yLogo }}
          >
            <div className="relative">
              
              <motion.div 
                className="relative mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                whileHover={{ 
                  scale: 1.05,
                  rotate: [0, -2, 2, 0],
                  transition: { duration: 0.6 }
                }}
              >
                <motion.img 
                  src={sublogoImage} 
                  alt="SubLogo" 
                  className="w-48 h-48 object-contain mx-auto"
                  style={{
                    filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.8))',
                    y: useTransform(scrollY, [0, 500], [0, -25])
                  }}
                />
                <motion.div 
                  className="absolute inset-0 w-48 h-48 mx-auto rounded-full bg-gradient-to-r from-blue-400/20 to-teal-400/20 blur-xl"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>

             
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <h2 className="text-6xl md:text-8xl font-bold leading-tight">
                  <motion.span 
                    className="block bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 bg-clip-text text-transparent drop-shadow-2xl"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    whileHover={{ 
                      scale: 1.02,
                      textShadow: "0 0 20px rgba(251, 191, 36, 0.5)"
                    }}
                  >
                    Respira
                  </motion.span>
                  <motion.span 
                    className="block text-white drop-shadow-2xl"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    whileHover={{ 
                      scale: 1.02,
                      textShadow: "0 0 20px rgba(255, 255, 255, 0.3)"
                    }}
                  >
                    Tranquilidad
                  </motion.span>
                </h2>
                
                <motion.div 
                  className="h-1 bg-gradient-to-r from-yellow-400 to-amber-500 mx-auto rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "8rem" }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  whileHover={{ width: "10rem" }}
                />
                
                <motion.p 
                  className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed mt-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  Vive experiencias <span className="text-yellow-400 font-semibold">inolvidables</span> con nosotros
                </motion.p>
              </motion.div>

             
              <motion.div 
                className="mt-12"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <motion.button 
                  onClick={() => window.location.href = "/boletos"} 
                  className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-black bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full shadow-2xl shadow-yellow-400/25 hover:shadow-yellow-400/40 transition-all duration-300 overflow-hidden"
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    boxShadow: "0 25px 50px rgba(251, 191, 36, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Explorar Destinos</span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* Footer del header */}
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <motion.div 
              className="bg-white/5 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/10"
              whileHover={{ 
                scale: 1.02, 
                backgroundColor: "rgba(255,255,255,0.08)"
              }}
            >
              <p className="text-sm text-white/70 text-center">
                Desliza para descubrir destinos increíbles
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.header>
    </>
  );
};

export default Header;