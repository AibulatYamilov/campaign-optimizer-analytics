
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="font-display text-xl font-bold flex items-center gap-2">
      <div className="flex items-center justify-center bg-primary p-1.5 rounded-md text-white">
        <BookOpen className="w-5 h-5" />
      </div>
      <span>Внешка<span className="text-primary">ПРО</span></span>
    </Link>
  );
};

export default Logo;
