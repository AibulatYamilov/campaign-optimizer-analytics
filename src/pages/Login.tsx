import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Key, LogIn } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import Logo from "@/components/Logo";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Login = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [showNotRegisteredDialog, setShowNotRegisteredDialog] = useState(false);
  const navigate = useNavigate();

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Симуляция проверки существования email (в реальном приложении это будет API запрос)
    setTimeout(() => {
      // Для демонстрации используем email test@example.com как "незарегистрированный"
      if (email === "test@example.com") {
        setLoading(false);
        setShowNotRegisteredDialog(true);
      } else {
        // Имитация отправки кода
        setLoading(false);
        setCodeSent(true);
        toast({
          title: "Код отправлен",
          description: `Код подтверждения отправлен на ${email}`,
        });
      }
    }, 1500);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Имитация проверки кода
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Вход выполнен",
        description: "Добро пожаловать в CampaignOptimizer!",
      });
      // Перенаправление на страницу с ссылками
      navigate("/links");
    }, 1500);
  };

  const handleCloseDialog = () => {
    setShowNotRegisteredDialog(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg z-50 border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Logo />
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
              <p className="text-gray-500 mt-2">
                {codeSent 
                  ? "Введите код, отправленный на ваш email" 
                  : "Введите ваш email для получения кода доступа"
                }
              </p>
            </div>
            
            <div className="p-6">
              {!codeSent ? (
                <form onSubmit={handleSendCode} className="space-y-4">
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
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary hover:bg-secondary transition-colors py-2 px-4 rounded-lg text-white font-medium flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <span>Отправка кода...</span>
                      ) : (
                        <>
                          <Mail className="w-5 h-5" />
                          <span>Отправить код</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleVerifyCode} className="space-y-4">
                  <div>
                    <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-1">
                      Код подтверждения
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Key className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="verificationCode"
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Введите код"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary hover:bg-secondary transition-colors py-2 px-4 rounded-lg text-white font-medium flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <span>Проверка кода...</span>
                      ) : (
                        <>
                          <LogIn className="w-5 h-5" />
                          <span>Войти</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="text-center">
                    <button 
                      type="button" 
                      onClick={() => setCodeSent(false)}
                      className="text-primary hover:text-secondary font-medium"
                    >
                      Изменить email
                    </button>
                  </div>
                </form>
              )}
              
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Нет аккаунта?{" "}
                  <Link to="/register" className="text-primary hover:text-secondary font-medium">
                    Зарегистрироваться
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog for unregistered email */}
      <Dialog open={showNotRegisteredDialog} onOpenChange={setShowNotRegisteredDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Аккаунт не найден</DialogTitle>
            <DialogDescription>
              Пользователь с email {email} не зарегистрирован в системе.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
            <button
              onClick={handleCloseDialog}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2"
            >
              Попробовать другой email
            </button>
            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2"
            >
              Зарегистрироваться
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;
