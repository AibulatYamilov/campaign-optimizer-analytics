
import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Mail, Lock, LogIn } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Имитация процесса входа
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Вход выполнен",
        description: "Добро пожаловать в CampaignOptimizer!",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg z-50 border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="font-display text-xl font-bold flex items-center gap-2">
                <Home className="w-5 h-5" />
                CampaignOptimizer
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                to="/links" 
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Диплинки
              </Link>
              <Link 
                to="/register" 
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Регистрация
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 pt-32 pb-20 flex justify-center">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h1 className="font-display text-2xl font-bold">Вход в аккаунт</h1>
              <p className="text-gray-500 mt-2">Войдите, чтобы получить доступ к вашему аккаунту</p>
            </div>
            
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="example@mail.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Пароль
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Введите пароль"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Запомнить меня
                    </label>
                  </div>
                  <a href="#" className="text-sm font-medium text-primary hover:text-secondary">
                    Забыли пароль?
                  </a>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-secondary transition-colors py-2 px-4 rounded-lg text-white font-medium flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span>Выполняется вход...</span>
                    ) : (
                      <>
                        <LogIn className="w-5 h-5" />
                        <span>Войти</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Нет аккаунта?{" "}
                  <Link to="/register" className="text-primary hover:text-secondary font-medium">
                    Зарегистрироваться
                  </Link>
                </p>
              </div>
              
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Или войти с помощью</span>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-200 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Google
                  </button>
                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-200 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Facebook
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
