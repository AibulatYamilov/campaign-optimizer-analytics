
import React, { useState } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon, Instagram, TikTok, Youtube, MessageCircle, GripVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Type definitions
type Platform = "instagram" | "tiktok" | "youtube" | "telegram" | "vk" | "other";

interface Campaign {
  id: string;
  platform: Platform;
  advertiser: string;
  advertiserLink?: string;
  startDate?: Date;
  cost?: number;
  deeplink: string;
  totalClicks: number;
  last7DaysClicks: number;
  last24HoursClicks: number;
  duration: string;
  adPostLink?: string;
}

interface Product {
  id: string;
  name: string;
  link: string;
  campaigns: Campaign[];
}

const platformIcons: Record<Platform, React.ReactNode> = {
  instagram: <Instagram className="h-4 w-4" />,
  tiktok: <TikTok className="h-4 w-4" />,
  youtube: <Youtube className="h-4 w-4" />,
  telegram: <MessageCircle className="h-4 w-4" />,
  vk: <MessageCircle className="h-4 w-4" />,
  other: <MessageCircle className="h-4 w-4" />,
};

const SortableProductItem = ({ product, index, onAddCampaign }: { product: Product; index: number; onAddCampaign: (productId: string) => void }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: product.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div ref={setNodeRef} style={style} className={cn("mb-6", isDragging ? "opacity-50" : "")}>
      <Accordion type="single" collapsible className="border rounded-lg overflow-hidden">
        <AccordionItem value={product.id} className="border-0">
          <div className="flex items-center px-6 py-4 bg-white">
            <div {...attributes} {...listeners} className="cursor-grab mr-2">
              <GripVertical className="h-5 w-5 text-gray-400" />
            </div>
            <AccordionTrigger className="flex-1 hover:no-underline py-0">
              <div className="flex items-center justify-between w-full">
                <div className="font-medium text-lg">{product.name}</div>
              </div>
            </AccordionTrigger>
            <div className="ml-4 flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => onAddCampaign(product.id)}>
                Добавить кампанию
              </Button>
            </div>
          </div>
          <AccordionContent className="pt-0 pb-0">
            <CampaignTable campaigns={product.campaigns} productId={product.id} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

const SortableCampaignRow = ({ campaign, index }: { campaign: Campaign; index: number }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: campaign.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TableRow ref={setNodeRef} style={style} isDragging={isDragging} className="group">
      <TableCell className="w-10">
        <div {...attributes} {...listeners} className="cursor-grab opacity-0 group-hover:opacity-100 transition-opacity">
          <GripVertical className="h-5 w-5 text-gray-400" />
        </div>
      </TableCell>
      <TableCell className="flex items-center gap-2 w-40">
        <Badge variant="outline" className="gap-1 font-normal">
          {platformIcons[campaign.platform]}
          {campaign.platform.charAt(0).toUpperCase() + campaign.platform.slice(1)}
        </Badge>
      </TableCell>
      <TableCell className="w-40">{campaign.advertiser}</TableCell>
      <TableCell className="w-48 max-w-48 truncate" title={campaign.deeplink}>
        {campaign.deeplink}
      </TableCell>
      <TableCell className="text-center w-32">{campaign.totalClicks}</TableCell>
      <TableCell className="text-center w-32">{campaign.last7DaysClicks}</TableCell>
      <TableCell className="text-center w-32">{campaign.last24HoursClicks}</TableCell>
      <TableCell className="w-36">{campaign.startDate ? format(campaign.startDate, "dd.MM.yyyy") : "-"}</TableCell>
      <TableCell className="w-32">
        {campaign.cost ? (
          <div className="flex items-center">
            {campaign.cost} ₽
          </div>
        ) : (
          "-"
        )}
      </TableCell>
      <TableCell className="w-36">{campaign.duration}</TableCell>
    </TableRow>
  );
};

const CampaignTable = ({ campaigns, productId }: { campaigns: Campaign[]; productId: string }) => {
  const [items, setItems] = useState(campaigns);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10"></TableHead>
            <TableHead className="w-40">Платформа</TableHead>
            <TableHead className="w-40">Рекламодатель</TableHead>
            <TableHead className="w-48">Ссылка для рекламной кампании</TableHead>
            <TableHead className="text-center w-32">Всего переходов</TableHead>
            <TableHead className="text-center w-32">За 7 дней</TableHead>
            <TableHead className="text-center w-32">За 24 часа</TableHead>
            <TableHead className="w-36">Дата старта</TableHead>
            <TableHead className="w-32">Стоимость</TableHead>
            <TableHead className="w-36">Длительность</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody isDragging={false}>
          <SortableContext items={items.map(c => c.id)} strategy={verticalListSortingStrategy}>
            {items.length > 0 ? (
              items.map((campaign, index) => (
                <SortableCampaignRow key={campaign.id} campaign={campaign} index={index} />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} className="h-32 text-center text-muted-foreground">
                  Нет активных рекламных кампаний
                </TableCell>
              </TableRow>
            )}
          </SortableContext>
        </TableBody>
      </Table>
    </DndContext>
  );
};

const LinksTable = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Умные часы SmartWatch Pro",
      link: "https://example.com/smartwatch-pro",
      campaigns: [
        {
          id: "101",
          platform: "instagram",
          advertiser: "TechReviewer",
          advertiserLink: "https://instagram.com/techreviewer",
          startDate: new Date("2023-04-15"),
          cost: 15000,
          deeplink: "https://example.com/smartwatch-pro?ref=techreviewer",
          totalClicks: 1245,
          last7DaysClicks: 132,
          last24HoursClicks: 23,
          duration: "32 дня",
          adPostLink: "https://instagram.com/p/abcd123",
        },
        {
          id: "102",
          platform: "youtube",
          advertiser: "GadgetMaster",
          startDate: new Date("2023-05-10"),
          cost: 25000,
          deeplink: "https://example.com/smartwatch-pro?ref=gadgetmaster",
          totalClicks: 3562,
          last7DaysClicks: 425,
          last24HoursClicks: 68,
          duration: "17 дней",
        },
      ],
    },
    {
      id: "2",
      name: "Беспроводные наушники SoundPlus",
      link: "https://example.com/soundplus-earbuds",
      campaigns: [
        {
          id: "201",
          platform: "tiktok",
          advertiser: "MusicLover",
          startDate: new Date("2023-06-05"),
          cost: 8000,
          deeplink: "https://example.com/soundplus-earbuds?ref=musiclover",
          totalClicks: 876,
          last7DaysClicks: 221,
          last24HoursClicks: 43,
          duration: "7 дней",
        },
      ],
    },
  ]);
  
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isAddCampaignOpen, setIsAddCampaignOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState({ name: "", link: "" });
  const [newCampaign, setNewCampaign] = useState<{
    platform: Platform;
    advertiser: string;
    advertiserLink: string;
    startDate: Date | undefined;
    cost: string;
  }>({
    platform: "instagram",
    advertiser: "",
    advertiserLink: "",
    startDate: undefined,
    cost: "",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleProductDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setProducts((products) => {
        const oldIndex = products.findIndex((p) => p.id === active.id);
        const newIndex = products.findIndex((p) => p.id === over.id);
        
        return arrayMove(products, oldIndex, newIndex);
      });
    }
  };

  const handleAddCampaign = (productId: string) => {
    setSelectedProductId(productId);
    setIsAddCampaignOpen(true);
  };

  const handleAddProduct = () => {
    if (newProduct.name.trim() && newProduct.link.trim()) {
      const newProductObj: Product = {
        id: Date.now().toString(),
        name: newProduct.name,
        link: newProduct.link,
        campaigns: [],
      };
      setProducts([...products, newProductObj]);
      setNewProduct({ name: "", link: "" });
      setIsAddProductOpen(false);
    }
  };

  const handleAddCampaignSubmit = () => {
    if (selectedProductId && newCampaign.advertiser && newCampaign.platform) {
      const productIndex = products.findIndex((p) => p.id === selectedProductId);
      
      if (productIndex !== -1) {
        const newProducts = [...products];
        const newCampaignObj: Campaign = {
          id: Date.now().toString(),
          platform: newCampaign.platform,
          advertiser: newCampaign.advertiser,
          advertiserLink: newCampaign.advertiserLink,
          startDate: newCampaign.startDate,
          cost: newCampaign.cost ? parseFloat(newCampaign.cost) : undefined,
          deeplink: `${products[productIndex].link}?ref=${newCampaign.advertiser.toLowerCase().replace(/\s+/g, '')}`,
          totalClicks: 0,
          last7DaysClicks: 0,
          last24HoursClicks: 0,
          duration: newCampaign.startDate ? "0 дней" : "-",
        };
        
        newProducts[productIndex].campaigns.push(newCampaignObj);
        setProducts(newProducts);
        setNewCampaign({
          platform: "instagram",
          advertiser: "",
          advertiserLink: "",
          startDate: undefined,
          cost: "",
        });
        setIsAddCampaignOpen(false);
      }
    }
  };

  return (
    <div className="container py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Ваши товары и рекламные кампании</h1>
          <p className="text-gray-500 mt-2">
            Ведите учет рекламных кампаний и отслеживайте их эффективность
          </p>
        </div>
        <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
          <DialogTrigger asChild>
            <Button>Добавить товар</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Добавить новый товар</DialogTitle>
              <DialogDescription>
                Введите информацию о вашем товаре или услуге
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Наименование</Label>
                <Input
                  id="name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="Введите название товара или услуги"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="link">Ссылка</Label>
                <Input
                  id="link"
                  value={newProduct.link}
                  onChange={(e) => setNewProduct({ ...newProduct, link: e.target.value })}
                  placeholder="https://example.com/product"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
                Отмена
              </Button>
              <Button onClick={handleAddProduct}>Добавить</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={isAddCampaignOpen} onOpenChange={setIsAddCampaignOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Добавить рекламную кампанию</DialogTitle>
            <DialogDescription>
              Введите информацию о рекламной кампании для создания диплинка
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="platform">Площадка</Label>
              <Select
                value={newCampaign.platform}
                onValueChange={(value: Platform) =>
                  setNewCampaign({ ...newCampaign, platform: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите площадку" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="youtube">Youtube</SelectItem>
                  <SelectItem value="telegram">Telegram</SelectItem>
                  <SelectItem value="vk">VK</SelectItem>
                  <SelectItem value="other">Другое</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="advertiser">Рекламодатель</Label>
              <Input
                id="advertiser"
                value={newCampaign.advertiser}
                onChange={(e) =>
                  setNewCampaign({ ...newCampaign, advertiser: e.target.value })
                }
                placeholder="Имя блогера или канала"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="advertiserLink">Ссылка на рекламодателя (опционально)</Label>
              <Input
                id="advertiserLink"
                value={newCampaign.advertiserLink}
                onChange={(e) =>
                  setNewCampaign({ ...newCampaign, advertiserLink: e.target.value })
                }
                placeholder="https://instagram.com/example"
              />
            </div>
            <div className="grid gap-2">
              <Label>Дата старта (опционально)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "justify-start text-left font-normal",
                      !newCampaign.startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newCampaign.startDate ? (
                      format(newCampaign.startDate, "dd.MM.yyyy")
                    ) : (
                      <span>Выберите дату</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={newCampaign.startDate}
                    onSelect={(date) =>
                      setNewCampaign({ ...newCampaign, startDate: date })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cost">Стоимость размещения (опционально)</Label>
              <div className="relative">
                <Input
                  id="cost"
                  type="number"
                  value={newCampaign.cost}
                  onChange={(e) =>
                    setNewCampaign({ ...newCampaign, cost: e.target.value })
                  }
                  placeholder="0"
                  className="pl-8"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  ₽
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddCampaignOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleAddCampaignSubmit}>Создать</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleProductDragEnd}>
        <SortableContext items={products.map(p => p.id)} strategy={verticalListSortingStrategy}>
          {products.map((product, index) => (
            <SortableProductItem 
              key={product.id} 
              product={product} 
              index={index} 
              onAddCampaign={handleAddCampaign} 
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default LinksTable;
