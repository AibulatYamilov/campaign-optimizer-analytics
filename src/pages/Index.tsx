
import { ChartBar, Users, DollarSign, Target, Rocket, Check, BarChart2, LineChart, Link2, ArrowRight, ChevronRight, Star, Sparkles, ArrowUpRight, BarChart, Zap, Shield, LineChartIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

const pulse = {
  scale: [1, 1.02, 1],
  transition: { 
    duration: 2,
    repeat: Infinity,
    repeatType: "reverse" as const
  }
};

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { value: "47%", label: "Увеличение ROI" },
    { value: "8.4X", label: "Возврат инвестиций" },
    { value: "82%", label: "Клиентов довольны" },
    { value: "1200+", label: "Активных пользователей" }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Gradient overlay */}
      <div className="fixed top-0 left-0 right-0 h-[70vh] bg-gradient-to-br from-primary/5 to-secondary/5 -z-10 rounded-b-[50%] opacity-60"></div>
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg z-50 border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Logo />
            </motion.div>
            <motion.div 
              className="flex items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Link to="/links" className="text-gray-600 hover:text-primary transition-colors hover:scale-105 transform duration-200">
                Таблица ссылок
              </Link>
              <Link to="/register" className="text-gray-600 hover:text-primary transition-colors hover:scale-105 transform duration-200">
                Регистрация
              </Link>
              <Link to="/login" className="text-gray-600 hover:text-primary transition-colors hover:scale-105 transform duration-200">
                Вход
              </Link>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="bg-gradient-to-r from-primary to-secondary px-6 py-2 rounded-full text-white font-medium shadow-md hover:shadow-xl transition-all duration-300"
              >
                Начать бесплатно
              </motion.button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 relative overflow-hidden">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="text-left"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div 
                variants={fadeIn} 
                custom={0}
                className="bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-1.5 rounded-full inline-flex items-center gap-2 mb-6 border border-primary/20"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-primary text-sm font-medium">Ваш инструмент аналитики внешней рекламы</span>
              </motion.div>
              
              <motion.h1 
                variants={fadeIn} 
                custom={1}
                className="font-display text-5xl md:text-6xl font-bold mb-6 leading-tight"
              >
                Измеряйте <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">реальную</span> эффективность вашей рекламы
              </motion.h1>
              
              <motion.p 
                variants={fadeIn} 
                custom={2}
                className="text-gray-600 text-xl mb-10"
              >
                Вы платите за рекламу, но не знаете, кто реально приносит трафик? 
                <span className="text-black font-medium block mt-1">Отслеживайте эффективность кампаний в режиме реального времени.</span>
              </motion.p>
              
              <motion.div 
                variants={fadeIn}
                custom={3}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-gradient-to-r from-primary to-secondary px-8 py-3.5 rounded-full text-white font-medium shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transition-all duration-300"
                >
                  Начать бесплатно
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white border border-gray-200 px-8 py-3.5 rounded-full font-medium shadow-sm flex items-center justify-center gap-2 hover:shadow-md hover:border-primary/30 transition-all duration-300"
                >
                  Смотреть демо
                  <ArrowUpRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
              
              <motion.div 
                variants={fadeIn}
                custom={4}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-gray-100 pt-8"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="font-display text-2xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-gray-500 text-sm">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="relative lg:block hidden"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-secondary/20 to-primary/30 rounded-3xl blur-3xl opacity-20 -z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 rounded-3xl transform rotate-1 scale-105 -z-10"></div>
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-4">
                <div className="bg-gray-50 rounded-xl p-8 h-[400px] flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <BarChart2 className="w-16 h-16 text-primary mx-auto opacity-40" />
                    <p className="text-gray-500">Аналитика в реальном времени</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Background decorations */}
        <div className="absolute top-40 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
      </section>

      {/* Trusted by Section */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-10 border-t border-gray-100"
      >
        <div className="container mx-auto px-6">
          <p className="text-center text-gray-500 text-sm mb-8">ДОВЕРЯЮТ КРУПНЕЙШИЕ КОМПАНИИ</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {['WildBerries', 'Ozon', 'АлиЭкспресс', 'СберМаркет', 'Яндекс.Маркет'].map((brand, index) => (
              <div key={index} className="flex items-center gap-1">
                <Star className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 font-medium">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Dashboard Preview */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden relative">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <span className="bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-4">Интуитивный интерфейс</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-6 leading-tight">Вся аналитика в <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">одном месте</span></h2>
            <p className="text-gray-600 text-lg">
              Наша платформа предоставляет полный обзор ваших рекламных кампаний с визуализацией данных для быстрого анализа и принятия решений.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/10 to-primary/20 rounded-3xl blur-3xl opacity-20 -z-10"></div>
            <motion.div 
              animate={pulse}
              className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 rounded-3xl transform rotate-1 scale-105 -z-10"
            ></motion.div>
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="px-6 py-6 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="ml-4 bg-gray-100 rounded-md px-3 py-1 text-xs text-gray-600 font-mono">
                    https://vneshkapro.com/dashboard
                  </div>
                </div>
              </div>
              <div className="p-8 bg-gray-50">
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-sm text-gray-500">Общий ROI</h4>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">+12.5%</span>
                    </div>
                    <p className="text-2xl font-bold">428%</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-sm text-gray-500">Активных кампаний</h4>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">14 новых</span>
                    </div>
                    <p className="text-2xl font-bold">78</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-sm text-gray-500">Конверсия</h4>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">+2.4%</span>
                    </div>
                    <p className="text-2xl font-bold">8.7%</p>
                  </div>
                </div>
                <div className="h-40 bg-white rounded-xl border border-gray-100">
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              {
                icon: <BarChart2 className="w-6 h-6" />,
                title: "Отслеживание в реальном времени",
                description: "Получайте данные о производительности рекламных кампаний сразу же после их запуска.",
                color: "primary"
              },
              {
                icon: <LineChart className="w-6 h-6" />,
                title: "Подробная аналитика",
                description: "Визуализируйте данные и выявляйте тренды, которые помогут вам принимать более эффективные решения.",
                color: "secondary"
              },
              {
                icon: <Link2 className="w-6 h-6" />,
                title: "Управление ссылками",
                description: "Создавайте, отслеживайте и оптимизируйте все ваши рекламные ссылки в одном удобном интерфейсе.",
                color: "primary"
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300"
              >
                <div className={`bg-${feature.color}/10 w-14 h-14 rounded-2xl flex items-center justify-center text-${feature.color} mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="font-display text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Background decorations */}
        <div className="absolute top-40 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-4">Возможности</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-6 leading-tight">
              Все инструменты для <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">максимального успеха</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Мощные инструменты для анализа, оптимизации и масштабирования ваших рекламных кампаний с инфлюенсерами.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <BarChart className="w-6 h-6" />,
                title: "Продвинутая аналитика",
                description: "Отслеживайте метрики эффективности и ROI в реальном времени с детальными инсайтами.",
                delay: 0
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Подбор инфлюенсеров",
                description: "Находите идеальных инфлюенсеров для вашего бренда с помощью технологий AI.",
                delay: 1
              },
              {
                icon: <DollarSign className="w-6 h-6" />,
                title: "Оптимизация ROI",
                description: "Максимизируйте возврат инвестиций с помощью стратегий оптимизации кампаний на основе данных.",
                delay: 2
              },
              {
                icon: <Target className="w-6 h-6" />,
                title: "Отслеживание кампаний",
                description: "Мониторинг производительности кампании и вовлеченности в реальном времени.",
                delay: 3
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Инсайты производительности",
                description: "Получайте практические советы для повышения эффективности кампаний.",
                delay: 4
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Защита от накруток",
                description: "Наша система автоматически определяет и фильтрует ненастоящий трафик.",
                delay: 5
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                custom={feature.delay}
                whileHover={{ scale: 1.03 }}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow hover:shadow-xl transition-all duration-300 group"
              >
                <div className="bg-gradient-to-br from-primary/80 to-secondary/80 w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 transform group-hover:rotate-3 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="font-display text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <div className="flex items-center text-primary font-medium group">
                  <span>Подробнее</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:ml-2 transition-all" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 -z-10"></div>
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-4">Отзывы</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-6 leading-tight">
              Что <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">говорят клиенты</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Узнайте, как наша платформа помогает продавцам маркетплейсов увеличивать продажи и оптимизировать рекламные бюджеты.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10 rounded-3xl blur-3xl opacity-20 -z-10"></div>
            
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-14 border border-gray-100 max-w-4xl mx-auto relative"
            >
              <div className="absolute top-5 right-5">
                <div className="flex">
                  {[0, 1, 2].map((index) => (
                    <button 
                      key={index} 
                      onClick={() => setActiveTestimonial(index)}
                      className={`w-3 h-3 rounded-full mx-1 ${activeTestimonial === index ? 'bg-primary' : 'bg-gray-200'}`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/3">
                  <div className="bg-gray-100 w-28 h-28 rounded-full flex items-center justify-center mx-auto">
                    <Users className="w-12 h-12 text-gray-500" />
                  </div>
                </div>
                <div className="md:w-2/3">
                  {[
                    {
                      quote: "Благодаря ВнешкаПРО мы увеличили ROI наших рекламных кампаний на 47% всего за три месяца. Прозрачность данных позволяет нам оптимизировать каждый аспект рекламных кампаний.",
                      author: "Алексей Смирнов",
                      position: "Директор по маркетингу, BeautyShop"
                    },
                    {
                      quote: "Интуитивно понятный интерфейс и подробная аналитика помогают нам быстро определять самые эффективные каналы. Теперь мы тратим рекламный бюджет только на то, что действительно работает.",
                      author: "Мария Иванова",
                      position: "Владелец, Fashion Store"
                    },
                    {
                      quote: "Платформа полностью изменила наш подход к работе с инфлюенсерами. Теперь мы видим реальные результаты и можем масштабировать то, что действительно приносит продажи.",
                      author: "Дмитрий Козлов",
                      position: "CEO, Gadget World"
                    },
                  ].map((testimonial, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: activeTestimonial === index ? 1 : 0 }}
                      transition={{ duration: 0.5 }}
                      className={`${activeTestimonial === index ? 'block' : 'hidden'}`}
                    >
                      <div className="flex mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-700 italic mb-6 text-lg leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                      <div>
                        <p className="font-bold text-lg">{testimonial.author}</p>
                        <p className="text-primary">{testimonial.position}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-primary via-primary/90 to-secondary rounded-3xl p-12 md:p-20 text-center relative overflow-hidden"
          >
            <motion.div 
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"
            ></motion.div>
            <div className="relative z-10">
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
              >
                Готовы увеличить эффективность<br/>рекламных кампаний?
              </motion.h2>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-white/90 text-xl mb-10 max-w-2xl mx-auto"
              >
                Присоединяйтесь к тысячам продавцов маркетплейсов, которые уже максимизируют свои ROI с нашей платформой.
              </motion.p>
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row justify-center gap-4"
              >
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white text-primary hover:bg-gray-50 px-8 py-4 rounded-full font-medium transition-colors shadow-lg hover:shadow-xl"
                >
                  Начать бесплатно
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20 px-8 py-4 rounded-full font-medium transition-colors"
                >
                  Запросить демо
                </motion.button>
              </motion.div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-24 h-24 rounded-full bg-white/10 blur-2xl"></div>
            <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-white/10 blur-2xl"></div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-4">Почему мы</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Преимущества</span> работы с нами
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Мы предлагаем уникальные решения для увеличения эффективности ваших рекламных кампаний и снижения затрат.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {[
                {
                  title: "Полная прозрачность данных",
                  description: "Получайте детальную информацию о каждой кампании, включая просмотры, клики и конверсии."
                },
                {
                  title: "Удобное управление ссылками",
                  description: "Создавайте, группируйте и отслеживайте все ваши рекламные ссылки в одном интерфейсе."
                },
                {
                  title: "Автоматическая оптимизация",
                  description: "Наши алгоритмы автоматически предлагают улучшения для повышения эффективности кампаний."
                },
                {
                  title: "Интеграция с маркетплейсами",
                  description: "Платформа интегрируется с популярными маркетплейсами для получения данных о продажах."
                },
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4 items-start group"
                >
                  <div className="bg-gradient-to-br from-primary to-secondary rounded-lg p-2 mt-1 shadow-md group-hover:shadow-lg transition-shadow">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative p-8"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-primary/30 rounded-2xl blur-3xl opacity-20"></div>
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 relative z-10">
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-xl mb-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-gray-800">Средняя эффективность</h3>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">+147%</span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">До использования</span>
                        <span className="text-sm font-medium">32%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gray-400 h-2 rounded-full" style={{ width: '32%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">После использования</span>
                        <span className="text-sm font-medium">79%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full" style={{ width: '79%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <span className="text-primary text-xl font-bold block mb-1">87%</span>
                    <span className="text-gray-500 text-sm">Рост конверсии</span>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <span className="text-secondary text-xl font-bold block mb-1">43%</span>
                    <span className="text-gray-500 text-sm">Снижение CPA</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Background decorations */}
        <div className="absolute top-20 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-20 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <Logo />
              <p className="text-gray-600 mt-6 mb-6">
                Оптимизируйте ваши рекламные кампании с помощью аналитики и увеличивайте ROI вашего бизнеса.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-6">Платформа</h3>
              <ul className="space-y-4 text-gray-600">
                <li><a href="#" className="hover:text-primary transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-1" /> Функции</a></li>
                <li><a href="#" className="hover:text-primary transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-1" /> Интеграции</a></li>
                <li><a href="#" className="hover:text-primary transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-1" /> Тарифы</a></li>
                <li><a href="#" className="hover:text-primary transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-1" /> Обновления</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-6">Ресурсы</h3>
              <ul className="space-y-4 text-gray-600">
                <li><a href="#" className="hover:text-primary transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-1" /> Документация</a></li>
                <li><a href="#" className="hover:text-primary transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-1" /> Блог</a></li>
                <li><a href="#" className="hover:text-primary transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-1" /> Руководства</a></li>
                <li><a href="#" className="hover:text-primary transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-1" /> Поддержка</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-6">Компания</h3>
              <ul className="space-y-4 text-gray-600">
                <li><a href="#" className="hover:text-primary transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-1" /> О нас</a></li>
                <li><a href="#" className="hover:text-primary transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-1" /> Карьера</a></li>
                <li><a href="#" className="hover:text-primary transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-1" /> Контакты</a></li>
                <li><a href="#" className="hover:text-primary transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-1" /> Партнерам</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-600">&copy; 2024 ВнешкаПРО. Все права защищены.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">Политика конфиденциальности</a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">Условия использования</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
