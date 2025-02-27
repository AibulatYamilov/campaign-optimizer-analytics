
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { ChevronDown, Trash2, Home } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

const Collapsible = CollapsiblePrimitive.Root;
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

interface LinkItem {
  id: string;
  title: string;
  url: string;
  views: number;
}

const LinksTable = () => {
  const [links] = useState<LinkItem[]>([
    {
      id: "1",
      title: "Бусы из натуральных камней Горный Хрусталь",
      url: "https://www.wildberries.ru/catalog/225963900/detail.aspx",
      views: 0,
    },
    {
      id: "2",
      title: "Ссылка 1",
      url: "https://vneshka.pro/toplink/a1ba3b4a-4677-41b8-9de4-9ef5bb3f1a98",
      views: 0,
    },
    {
      id: "3",
      title: "Ссылка 2",
      url: "https://vneshka.pro/toplink/d1872c4e-1bab-499b-8e47-b01f9fa6328b",
      views: 0,
    },
  ]);

  const [openCollapsible, setOpenCollapsible] = useState<string | null>(null);

  const toggleCollapsible = (id: string) => {
    if (openCollapsible === id) {
      setOpenCollapsible(null);
    } else {
      setOpenCollapsible(id);
    }
  };

  // Компонент таблицы с диплинками для повторного использования
  const LinksTableContent = () => (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mt-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60%]">Диплинк</TableHead>
            <TableHead className="text-right">Просмотры</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {links.map((link) => (
            <TableRow key={link.id} className="group">
              <TableCell className="font-medium">
                <div className="flex flex-col gap-1">
                  <span className="text-gray-900">{link.title}</span>
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-secondary transition-colors text-sm truncate"
                  >
                    {link.url}
                  </a>
                </div>
              </TableCell>
              <TableCell className="text-right">{link.views}</TableCell>
              <TableCell>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-gray-100 rounded-lg">
                  <Trash2 className="w-4 h-4 text-gray-500" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

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
            <button className="bg-primary px-6 py-2 rounded-full text-white font-medium hover:bg-secondary transition-colors">
              Добавить
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 pt-32 pb-20">
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h1 className="font-display text-2xl font-bold">Диплинки товаров</h1>
          </div>
        </div>

        {/* Collapsible Sections */}
        <div className="mt-8 space-y-2">
          {[
            "Сухой корм PERFECT FIT™ для стерилизованных кошек, с курицей, 2.5кг",
            "Кроссовки New Balance 725",
            "Гантели",
            "Кросы",
            "Эрик, привет! Смотри что нашел для тебя",
            "Эрик, привет! Смотри, что нашел, это ты на фотография? photo_tusa_40bab_i_1mujik.apk"
          ].map((title, index) => (
            <Collapsible
              key={index}
              open={openCollapsible === String(index)}
              onOpenChange={() => toggleCollapsible(String(index))}
            >
              <CollapsibleTrigger className="w-full">
                <div className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 text-left hover:border-primary/20 transition-colors group">
                  <span className="font-medium text-gray-900">{title}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 group-hover:text-primary transition-all ${
                      openCollapsible === String(index) ? "transform rotate-180" : ""
                    }`}
                  />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {title === "Гантели" && <LinksTableContent />}
                {title !== "Гантели" && (
                  <div className="p-4 bg-white border border-t-0 border-gray-100 rounded-b-xl">
                    <p className="text-gray-600">Содержимое для "{title}" будет здесь...</p>
                  </div>
                )}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LinksTable;
