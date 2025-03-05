
import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Mail, User, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Пожалуйста, введите корректный email адрес");
      setIsErrorDialogOpen(true);
      setLoading(false);
      return;
    }

    // Simulate email verification process
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      toast({
        title: "Проверьте вашу почту",
        description: "Ссылка для подтверждения отправлена на ваш email",
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
                to="/login" 
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Вход
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 pt-32 pb-20 flex justify-center">
        <div className="w-full max-w-md">
          {!isSubmitted ? (
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h1 className="font-display text-2xl font-bold">Регистрация</h1>
                <p className="text-gray-500 mt-2">Создайте аккаунт для доступа ко всем функциям</p>
              </div>
              
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Имя
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10"
                        placeholder="Введите ваше имя"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
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
                        <span>Отправка...</span>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          <span>Зарегистрироваться</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
                
                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    Уже есть аккаунт?{" "}
                    <Link to="/login" className="text-primary hover:text-secondary font-medium">
                      Войти
                    </Link>
                  </p>
                </div>
                
                <div className="mt-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500">Или продолжить с помощью</span>
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
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h1 className="font-display text-2xl font-bold">Проверьте вашу почту</h1>
              </div>
              
              <div className="p-6">
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                  
                  <h2 className="text-xl font-medium mb-2">Подтвердите ваш email</h2>
                  <p className="text-gray-600 mb-6">
                    Мы отправили письмо с ссылкой для подтверждения на <strong>{email}</strong>.
                    Пожалуйста, проверьте вашу почту и нажмите на ссылку для завершения регистрации.
                  </p>
                  
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 mb-6">
                    <p className="text-sm">
                      Если вы не видите письмо, проверьте папку "Спам" или нажмите кнопку ниже, чтобы отправить письмо повторно.
                    </p>
                  </div>
                  
                  <button
                    onClick={() => {
                      toast({
                        title: "Письмо отправлено повторно",
                        description: "Пожалуйста, проверьте вашу почту",
                      });
                    }}
                    className="bg-primary/10 text-primary py-2 px-4 rounded-lg font-medium hover:bg-primary/20 transition-colors"
                  >
                    Отправить письмо повторно
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Error Dialog */}
      <Dialog
        open={isErrorDialogOpen}
        onOpenChange={setIsErrorDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-display text-red-600 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Ошибка регистрации
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-700">{errorMessage}</p>
            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setIsErrorDialogOpen(false)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Закрыть
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Register;
