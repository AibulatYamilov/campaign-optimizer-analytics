
import { ChartBar, Users, DollarSign, Target, Rocket, Check, BarChart2, LineChart, Link2, ChevronRight, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg z-50 border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-6">
              <Link to="/links" className="text-gray-600 hover:text-primary transition-colors">
                Таблица ссылок
              </Link>
              <Link to="/register" className="text-gray-600 hover:text-primary transition-colors">
                Регистрация
              </Link>
              <Link to="/login" className="text-gray-600 hover:text-primary transition-colors">
                Вход
              </Link>
              <button className="bg-primary px-6 py-2 rounded-full text-white font-medium hover:bg-secondary transition-colors">
                Начать
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <span className="inline-block px-4 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6 animate-fade-up opacity-0" style={{ animationDelay: "0.2s" }}>
                Ваш инструмент анализа эффективности внешней рекламы
              </span>
              <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 animate-fade-up opacity-0" style={{ animationDelay: "0.4s" }}>
                Измеряйте реальную эффективность размещаемой рекламы — получайте <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">точные данные, а не догадки</span>
              </h1>
              <p className="text-gray-600 text-xl mb-8 animate-fade-up opacity-0" style={{ animationDelay: "0.6s" }}>
                Вы платите за рекламу, но не знаете, кто реально приносит трафик? Легко отслеживайте реальные данные по всем кампаниям в одном месте.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-up opacity-0" style={{ animationDelay: "0.8s" }}>
                <button className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all duration-300 px-8 py-3 rounded-full text-white font-medium shadow-lg flex items-center justify-center gap-2 hover:shadow-xl">
                  Поехали!
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="relative animate-fade-up opacity-0" style={{ animationDelay: "1s" }}>
              <div className="absolute -top-8 -left-8 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl"></div>
              <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-secondary/10 rounded-full filter blur-3xl"></div>
              <div className="relative bg-white p-3 rounded-2xl shadow-2xl border border-gray-100">
                <div className="rounded-xl shadow-md w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-primary font-medium">Интуитивный интерфейс</span>
            <h2 className="font-display text-4xl font-bold mt-2 mb-6">Вся аналитика в одном месте</h2>
            <p className="text-gray-600">
              Наша платформа предоставляет полный обзор ваших рекламных кампаний с удобными таблицами и визуализацией данных для быстрого анализа и принятия решений.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 rounded-3xl transform rotate-1 scale-105"></div>
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
              <div className="w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200"></div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center text-primary mb-6">
                <BarChart2 className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Отслеживание в реальном времени</h3>
              <p className="text-gray-600">Получайте данные о производительности рекламных кампаний сразу же после их запуска.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-secondary/10 w-12 h-12 rounded-xl flex items-center justify-center text-secondary mb-6">
                <LineChart className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Подробная аналитика</h3>
              <p className="text-gray-600">Визуализируйте данные и выявляйте тренды, которые помогут вам принимать более эффективные решения.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center text-primary mb-6">
                <Link2 className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Управление ссылками</h3>
              <p className="text-gray-600">Создавайте, отслеживайте и оптимизируйте все ваши рекламные ссылки в одном удобном интерфейсе.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary font-medium">Возможности</span>
            <h2 className="font-display text-4xl font-bold mt-2 mb-4">Все, что нужно для успеха</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Мощные инструменты для анализа, оптимизации и масштабирования ваших рекламных кампаний с инфлюенсерами.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <ChartBar className="w-6 h-6" />,
                title: "Продвинутая аналитика",
                description: "Отслеживайте метрики эффективности и ROI в реальном времени с детальными инсайтами.",
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Подбор инфлюенсеров",
                description: "Находите идеальных инфлюенсеров для вашего бренда с помощью технологий AI.",
              },
              {
                icon: <DollarSign className="w-6 h-6" />,
                title: "Оптимизация ROI",
                description: "Максимизируйте возврат инвестиций с помощью стратегий оптимизации кампаний на основе данных.",
              },
              {
                icon: <Target className="w-6 h-6" />,
                title: "Отслеживание кампаний",
                description: "Мониторинг производительности кампании и вовлеченности в реальном времени.",
              },
              {
                icon: <Rocket className="w-6 h-6" />,
                title: "Инсайты производительности",
                description: "Получайте практические советы для повышения эффективности кампаний.",
              },
              {
                icon: <ChartBar className="w-6 h-6" />,
                title: "Настраиваемые отчеты",
                description: "Генерируйте комплексные отчеты с ключевыми метриками и инсайтами.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="font-display text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary font-medium">Отзывы</span>
            <h2 className="font-display text-4xl font-bold mt-2 mb-4">Что говорят наши клиенты</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Узнайте, как наша платформа помогает продавцам маркетплейсов увеличивать продажи и оптимизировать рекламные бюджеты.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "Благодаря ВнешкаПРО мы увеличили ROI наших рекламных кампаний на 47% всего за три месяца.",
                author: "Алексей Смирнов",
                position: "Директор по маркетингу, BeautyShop",
              },
              {
                quote: "Интуитивно понятный интерфейс и подробная аналитика помогают нам быстро определять самые эффективные каналы.",
                author: "Мария Иванова",
                position: "Владелец, Fashion Store",
              },
              {
                quote: "Платформа полностью изменила наш подход к работе с инфлюенсерами. Теперь мы видим реальные результаты.",
                author: "Дмитрий Козлов",
                position: "CEO, Gadget World",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex-1">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-6">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div>
                    <p className="font-bold">{testimonial.author}</p>
                    <p className="text-gray-500 text-sm">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-br from-primary via-primary/90 to-secondary rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50"></div>
            <div className="relative z-10">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                Готовы оптимизировать ваши кампании?
              </h2>
              <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">
                Присоединяйтесь к тысячам продавцов маркетплейсов, которые уже максимизируют свои ROI с нашей платформой.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-full font-medium transition-colors shadow-lg hover:shadow-xl transform hover:scale-105">
                  Начать сейчас
                </button>
                <button className="bg-white/20 text-white hover:bg-white/30 px-8 py-3 rounded-full font-medium transition-colors">
                  Запросить демо
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary font-medium">Почему мы</span>
            <h2 className="font-display text-4xl font-bold mt-2 mb-4">Преимущества работы с нами</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Мы предлагаем уникальные решения для увеличения эффективности ваших рекламных кампаний и снижения затрат.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-full h-72 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-xl border border-gray-100"></div>
            </div>
            <div>
              <div className="space-y-6">
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
                  <div key={index} className="flex gap-4 items-start">
                    <div className="bg-primary/10 rounded-full p-1 mt-1">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Logo />
              <p className="text-gray-600 mt-4">
                Оптимизируйте ваши рекламные кампании с помощью аналитики и увеличивайте ROI вашего бизнеса.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Платформа</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-primary transition-colors">Функции</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Интеграции</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Тарифы</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Обновления</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Ресурсы</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-primary transition-colors">Документация</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Блог</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Руководства</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Поддержка</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Компания</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Карьера</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Партнерам</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-8 text-center text-gray-600">
            <p>&copy; 2024 ВнешкаПРО. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
