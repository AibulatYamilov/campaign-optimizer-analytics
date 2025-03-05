
import { Target } from "lucide-react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="font-display text-xl font-bold flex items-center gap-2">
      <div className="flex items-center justify-center bg-primary p-1.5 rounded-md text-white">
        <Target className="w-5 h-5" />
      </div>
      <span className="tracking-wide">Внешка<span className="text-primary font-extrabold">ПРО</span></span>
    </Link>
  );
};

export default Logo;
