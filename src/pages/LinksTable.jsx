import { useState } from "react";
import { Link } from "react-router-dom";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { 
  ChevronDown,
  Home, 
  Plus, 
  Instagram,
  Youtube,
  MessageCircle as Telegram,
  Link2,
  ExternalLink,
  Calendar,
  BarChart,
  Clock,
  Eye,
  Copy,
  Pencil,
  GripVertical,
  Check,
  User,
  RefreshCw
} from "lucide-react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const Collapsible = CollapsiblePrimitive.Root;
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

const SortableProductItem = ({ product, isOpen, onToggle }) => {
  const { 
    attributes, 
    listeners, 
    setNodeRef, 
    transform, 
    transition 
  } = useSortable({ id: product.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className="bg-white rounded-xl border border-gray-200 shadow-md transition-all hover:shadow-lg"
    >
      <div className="flex items-center p-4">
        <div
          {...attributes}
          {...listeners}
          className="mr-2 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
        >
          <GripVertical className="w-5 h-5" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-lg text-gray-800 truncate">{product.title}</h2>
          <div className="flex items-center mt-1">
            <a 
              href={product.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-primary flex items-center gap-1 hover:underline truncate"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="truncate">{product.url}</span>
            </a>
          </div>
        </div>
        
        <div className="flex items-center gap-2 ml-4">
          <CollapsibleTrigger asChild>
            <button
              onClick={onToggle}
              className="ml-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                isOpen ? "transform rotate-180" : ""
              }`} />
            </button>
          </CollapsibleTrigger>
        </div>
      </div>
    </div>
  );
};

const SortableCampaignRow = ({ campaign, productId, onUpdatePostLink }) => {
  const { 
    attributes, 
    listeners, 
    setNodeRef, 
    transform, 
    transition 
  } = useSortable({ id: campaign.id });

  const [isEditingPostLink, setIsEditingPostLink] = useState(false);
  const [postLinkValue, setPostLinkValue] = useState(campaign.postLink || "");

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case "instagram":
        return <Instagram className="w-4 h-4" />;
      case "youtube":
        return <Youtube className="w-4 h-4" />;
      case "telegram":
        return <Telegram className="w-4 h-4" />;
      case "vk":
        return <div className="w-4 h-4 font-bold text-xs">VK</div>;
      case "tiktok":
        return <div className="w-4 h-4 font-bold text-xs">TT</div>;
      default:
        return <Link2 className="w-4 h-4" />;
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Скопировано в буфер обмена");
  };

  const handleSavePostLink = () => {
    onUpdatePostLink(productId, campaign.id, postLinkValue);
    setIsEditingPostLink(false);
  };

  return (
    <TableRow ref={setNodeRef} style={style}>
      <TableCell className="w-[5%]">
        <div 
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
        >
          <GripVertical className="w-5 h-5" />
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/10 text-primary mr-3">
            {getPlatformIcon(campaign.platform)}
          </div>
          <div>
            <div className="font-medium">
              {campaign.advertiserLink ? (
                <a 
                  href={campaign.advertiserLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:underline text-primary"
                >
                  {campaign.advertiser}
                </a>
              ) : (
                campaign.advertiser
              )}
            </div>
            {isEditingPostLink ? (
              <div className="mt-1 flex items-center">
                <Input
                  value={postLinkValue}
                  onChange={(e) => setPostLinkValue(e.target.value)}
                  placeholder="https://instagram.com/p/example"
                  className="text-xs h-7 min-w-[200px]"
                />
                <button
                  onClick={handleSavePostLink}
                  className="ml-2 px-2 py-1 bg-primary text-white text-xs rounded hover:bg-primary/90"
                >
                  Сохранить
                </button>
              </div>
            ) : (
              <div className="flex items-center mt-1">
                {campaign.postLink ? (
                  <a 
                    href={campaign.postLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs text-gray-500 hover:underline flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Ссылка на пост
                  </a>
                ) : (
                  <button
                    onClick={() => setIsEditingPostLink(true)}
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    Добавить ссылку на пост
                  </button>
                )}
              </div>
            )}
            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
              {campaign.startDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {format(campaign.startDate, "dd.MM.yyyy")}
                </div>
              )}
              {campaign.cost && (
                <div className="flex items-center gap-1">
                  <span className="font-medium text-gray-600">{campaign.cost.toLocaleString()}₽</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <div className="max-w-[180px] overflow-hidden">
            <div className="truncate text-gray-500 text-sm">
              {campaign.deeplink}
            </div>
          </div>
          <button 
            onClick={() => copyToClipboard(campaign.deeplink)}
            className="p-1.5 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-full transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
      </TableCell>
      <TableCell>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-gray-50 p-2 rounded-lg">
            <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
              <Eye className="w-3 h-3" />
              Всего
            </div>
            <div className="font-semibold">{campaign.totalViews.toLocaleString()}</div>
          </div>
          <div className="bg-gray-50 p-2 rounded-lg">
            <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
              <BarChart className="w-3 h-3" />
              7 дней
            </div>
            <div className="font-semibold">{campaign.last7DaysViews.toLocaleString()}</div>
          </div>
          <div className="bg-gray-50 p-2 rounded-lg">
            <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              24 часа
            </div>
            <div className="font-semibold">{campaign.lastDayViews.toLocaleString()}</div>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};

const LinksTable = () => {
  const [products, setProducts] = useState([
    {
      id: "1",
      title: "Бусы из натуральных камней Горный Хрусталь",
      url: "https://www.wildberries.ru/catalog/225963900/detail.aspx",
      campaigns: [
        {
          id: "1-1",
          platform: "instagram",
          advertiser: "beauty_blog",
          advertiserLink: "https://instagram.com/beauty_blog",
          startDate: new Date(2023, 5, 15),
          cost: 15000,
          deeplink: "https://vneshka.pro/toplink/a1ba3b4a-4677-41b8-9de4-9ef5bb3f1a98",
          totalViews: 1250,
          last7DaysViews: 320,
          lastDayViews: 42,
          durationDays: 30
        },
        {
          id: "1-2",
          platform: "telegram",
          advertiser: "Fashion Channel",
          startDate: new Date(2023, 6, 10),
          deeplink: "https://vneshka.pro/toplink/d1872c4e-1bab-499b-8e47-b01f9fa6328b",
          totalViews: 850,
          last7DaysViews: 105,
          lastDayViews: 12,
          durationDays: 14
        }
      ]
    },
    {
      id: "2",
      title: "Сумка кожаная женская",
      url: "https://www.wildberries.ru/catalog/18383292/detail.aspx",
      campaigns: [
        {
          id: "2-1",
          platform: "youtube",
          advertiser: "FashionReview",
          advertiserLink: "https://youtube.com/c/fashionreview",
          startDate: new Date(2023, 7, 1),
          cost: 25000,
          deeplink: "https://vneshka.pro/toplink/c2d83b5a-2b88-4c99-ae37-c12e8a4f329a",
          totalViews: 3200,
          last7DaysViews: 580,
          lastDayViews: 65,
          durationDays: 45
        }
      ]
    }
  ]);

  const [openCollapsible, setOpenCollapsible] = useState(null);
  const [newProduct, setNewProduct] = useState({ title: "", url: "" });
  const [newCampaign, setNewCampaign] = useState({
    productId: "",
    platform: "instagram",
    advertiser: "",
    advertiserLink: "",
    startDate: "",
    cost: ""
  });
  
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
  const [isAddCampaignDialogOpen, setIsAddCampaignDialogOpen] = useState(false);
  const [isGeneratedLinkDialogOpen, setIsGeneratedLinkDialogOpen] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [isLimitExceededDialogOpen, setIsLimitExceededDialogOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const userInfo = {
    username: "MarketingSeller",
    linksGenerated: 5,
    linksLimit: 10
  };

  const toggleCollapsible = (id) => {
    if (openCollapsible === id) {
      setOpenCollapsible(null);
    } else {
      setOpenCollapsible(id);
    }
  };

  const handleAddProduct = () => {
    if (!newProduct.title || !newProduct.url) {
      toast.error("Пожалуйста, заполните все обязательные поля");
      return;
    }

    const newProductObj = {
      id: Date.now().toString(),
      title: newProduct.title,
      url: newProduct.url,
      campaigns: []
    };

    setProducts([newProductObj, ...products]);
    setNewProduct({ title: "", url: "" });
    toast.success("Товар успешно добавлен");
    
    setIsAddProductDialogOpen(false);
  };

  const handleAddCampaign = () => {
    if (!newCampaign.productId || !newCampaign.advertiser || !newCampaign.platform) {
      toast.error("Пожалуйста, заполните все обязательные поля");
      return;
    }

    if (userInfo.linksGenerated >= userInfo.linksLimit) {
      setIsAddCampaignDialogOpen(false);
      setIsLimitExceededDialogOpen(true);
      return;
    }

    const generatedDeeplink = `https://vneshka.pro/toplink/${generateRandomString()}`;

    const updatedProducts = products.map(product => {
      if (product.id === newCampaign.productId) {
        const newCampaignObj = {
          id: `${product.id}-${product.campaigns.length + 1}`,
          platform: newCampaign.platform,
          advertiser: newCampaign.advertiser,
          advertiserLink: newCampaign.advertiserLink,
          startDate: newCampaign.startDate ? new Date(newCampaign.startDate) : undefined,
          cost: newCampaign.cost ? Number(newCampaign.cost) : undefined,
          deeplink: generatedDeeplink,
          totalViews: 0,
          last7DaysViews: 0,
          lastDayViews: 0,
          durationDays: 0
        };

        return {
          ...product,
          campaigns: [newCampaignObj, ...product.campaigns]
        };
      }
      return product;
    });

    setProducts(updatedProducts);
    setGeneratedLink(generatedDeeplink);
    userInfo.linksGenerated += 1;
    
    setNewCampaign({
      productId: "",
      platform: "instagram",
      advertiser: "",
      advertiserLink: "",
      startDate: "",
      cost: ""
    });
    
    setIsAddCampaignDialogOpen(false);
    setIsGeneratedLinkDialogOpen(true);
    
    toast.success("Кампания успешно добавлена");
  };

  const updateCampaignPostLink = (productId, campaignId, postLink) => {
    const updatedProducts = products.map(product => {
      if (product.id === productId) {
        const updatedCampaigns = product.campaigns.map(campaign => {
          if (campaign.id === campaignId) {
            return {
              ...campaign,
              postLink
            };
          }
          return campaign;
        });
        
        return {
          ...product,
          campaigns: updatedCampaigns
        };
      }
      return product;
    });
    
    setProducts(updatedProducts);
    toast.success("Ссылка на пост добавлена");
  };

  const moveProduct = (index, direction) => {
    if ((direction === "up" && index === 0) || 
        (direction === "down" && index === products.length - 1)) {
      return;
    }

    const newProducts = [...products];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    [newProducts[index], newProducts[targetIndex]] = [newProducts[targetIndex], newProducts[index]];
    setProducts(newProducts);
  };

  const moveCampaign = (productId, campaignIndex, direction) => {
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex === -1) return;

    const campaigns = [...products[productIndex].campaigns];
    if ((direction === "up" && campaignIndex === 0) || 
        (direction === "down" && campaignIndex === campaigns.length - 1)) {
      return;
    }

    const targetIndex = direction === "up" ? campaignIndex - 1 : campaignIndex + 1;
    [campaigns[campaignIndex], campaigns[targetIndex]] = [campaigns[targetIndex], campaigns[campaignIndex]];

    const updatedProducts = [...products];
    updatedProducts[productIndex] = {
      ...updatedProducts[productIndex],
      campaigns
    };

    setProducts(updatedProducts);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Скопировано в буфер обмена");
  };

  const generateRandomString = () => {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  };

  const deleteProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
    toast.success("Товар удален");
  };

  const deleteCampaign = (productId, campaignId) => {
    const updatedProducts = products.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          campaigns: product.campaigns.filter(c => c.id !== campaignId)
        };
      }
      return product;
    });

    setProducts(updatedProducts);
    toast.success("Кампания удалена");
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case "instagram":
        return <Instagram className="w-4 h-4" />;
      case "youtube":
        return <Youtube className="w-4 h-4" />;
      case "telegram":
        return <Telegram className="w-4 h-4" />;
      case "vk":
        return <div className="w-4 h-4 font-bold text-xs">VK</div>;
      case "tiktok":
        return <div className="w-4 h-4 font-bold text-xs">TT</div>;
      default:
        return <Link2 className="w-4 h-4" />;
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleProductDragEnd = (event) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setProducts((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleCampaignDragEnd = (event, productId) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setProducts((products) => {
        return products.map((product) => {
          if (product.id === productId) {
            const oldIndex = product.campaigns.findIndex((campaign) => campaign.id === active.id);
            const newIndex = product.campaigns.findIndex((campaign) => campaign.id === over.id);
            
            return {
              ...product,
              campaigns: arrayMove(product.campaigns, oldIndex, newIndex),
            };
          }
          return product;
        });
      });
    }
  };

  const refreshCampaignStats = (productId) => {
    setIsRefreshing(true);
    
    setTimeout(() => {
      const updatedProducts = products.map(product => {
        if (product.id === productId) {
          return {
            ...product,
            campaigns: product.campaigns.map(campaign => {
              const totalIncrement = Math.floor(Math.random() * 50) + 1;
              const weekIncrement = Math.floor(Math.random() * 20) + 1;
              const dayIncrement = Math.floor(Math.random() * 5) + 1;
              
              return {
                ...campaign,
                totalViews: campaign.totalViews + totalIncrement,
                last7DaysViews: campaign.last7DaysViews + weekIncrement,
                lastDayViews: campaign.lastDayViews + dayIncrement
              };
            })
          };
        }
        return product;
      });
      
      setProducts(updatedProducts);
      setIsRefreshing(false);
      toast.success("Статистика успешно обновлена");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl z-50 border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="font-display text-xl font-bold flex items-center gap-2 text-gray-900">
                <Home className="w-5 h-5 text-primary" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">CampaignOptimizer</span>
              </Link>
            </div>
            
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full text-primary">
                <Link2 className="w-4 h-4" />
                <span className="text-sm font-medium">Ссылок сгенерировано в этом месяце: {userInfo.linksGenerated}/{userInfo.linksLimit}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">{userInfo.username}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 pt-24 pb-20">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden">
          <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent flex justify-between items-center">
            <div>
              <h1 className="font-display text-2xl font-bold text-gray-900">Ваши товары и рекламные кампании</h1>
              <p className="text-gray-600 mt-1">Ведите учет рекламных кампаний и отслеживайте их эффективность</p>
            </div>
            <Dialog open={isAddProductDialogOpen} onOpenChange={setIsAddProductDialogOpen}>
              <DialogTrigger asChild>
                <button className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all duration-300 px-6 py-2.5 rounded-full text-white font-medium shadow-lg flex items-center gap-2 hover:shadow-xl transform hover:scale-105">
                  <Plus className="w-4 h-4" />
                  Добавить товар
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-xl font-display">Добавить новый товар</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="title" className="text-sm font-medium">
                      Наименование товара *
                    </label>
                    <Input
                      id="title"
                      value={newProduct.title}
                      onChange={(e) => setNewProduct({...newProduct, title: e.target.value})}
                      placeholder="Введите название товара или услуги"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="url" className="text-sm font-medium">
                      Ссылка на товар *
                    </label>
                    <Input
                      id="url"
                      value={newProduct.url}
                      onChange={(e) => setNewProduct({...newProduct, url: e.target.value})}
                      placeholder="https://example.com/product"
                      className="rounded-lg"
                    />
                  </div>
                </div>
                <button 
                  onClick={handleAddProduct}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-colors text-white font-medium py-2.5 rounded-lg shadow-md"
                >
                  Добавить
                </button>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {products.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-200 shadow-md">
              <p className="text-gray-500">У вас пока нет добавленных товаров. Нажмите "Добавить товар", чтобы начать.</p>
            </div>
          ) : (
            <DndContext 
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleProductDragEnd}
            >
              <SortableContext 
                items={products.map(product => product.id)}
                strategy={verticalListSortingStrategy}
              >
                {products.map((product) => (
                  <Collapsible
                    key={product.id}
                    open={openCollapsible === product.id}
                    onOpenChange={() => toggleCollapsible(product.id)}
                  >
                    <SortableProductItem 
                      product={product} 
                      isOpen={openCollapsible === product.id} 
                      onToggle={() => toggleCollapsible(product.id)} 
                    />

                    <CollapsibleContent>
                      <div className="pl-10 pr-2 py-3 animate-fade-up">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-semibold text-gray-700">Рекламные кампании</h3>
                          <Dialog open={isAddCampaignDialogOpen} onOpenChange={setIsAddCampaignDialogOpen}>
                            <DialogTrigger asChild>
                              <button className="bg-gradient-to-r from-primary/20 to-primary/10 hover:from-primary/30 hover:to-primary/20 text-primary transition-colors px-4 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 shadow-sm hover:shadow-md">
                                <Plus className="w-4 h-4" />
                                Добавить кампанию
                              </button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                              <DialogHeader>
                                <DialogTitle className="text-xl font-display">Новая рекламная кампания</DialogTitle>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <input
                                  type="hidden"
                                  value={product.id}
                                  onChange={() => setNewCampaign({...newCampaign, productId: product.id})}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="grid gap-2">
                                    <label htmlFor="platform" className="text-sm font-medium">
                                      Площадка *
                                    </label>
                                    <select
                                      id="platform"
                                      value={newCampaign.platform}
                                      onChange={(e) => setNewCampaign({...newCampaign, productId: product.id, platform: e.target.value})}
                                      className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    >
                                      <option value="instagram">Instagram</option>
                                      <option value="tiktok">TikTok</option>
                                      <option value="youtube">YouTube</option>
                                      <option value="telegram">Telegram</option>
                                      <option value="vk">VK</option>
                                      <option value="other">Другое</option>
                                    </select>
                                  </div>
                                  <div className="grid gap-2">
                                    <label htmlFor="advertiser" className="text-sm font-medium">
                                      Рекламодатель *
                                    </label>
                                    <Input
                                      id="advertiser"
                                      value={newCampaign.advertiser}
                                      onChange={(e) => setNewCampaign({...newCampaign, productId: product.id, advertiser: e.target.value})}
                                      placeholder="Имя блогера или канала"
                                      className="rounded-lg"
                                    />
                                  </div>
                                </div>
                                <div className="grid gap-2">
                                  <label htmlFor="advertiserLink" className="text-sm font-medium">
                                    Ссылка на рекламодателя
                                  </label>
                                  <Input
                                    id="advertiserLink"
                                    value={newCampaign.advertiserLink}
                                    onChange={(e) => setNewCampaign({...newCampaign, productId: product.id, advertiserLink: e.target.value})}
                                    placeholder="https://instagram.com/example"
                                    className="rounded-lg"
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="grid gap-2">
                                    <label htmlFor="startDate" className="text-sm font-medium">
                                      Дата начала
                                    </label>
                                    <Input
                                      id="startDate"
                                      type="date"
                                      value={newCampaign.startDate}
                                      onChange={(e) => setNewCampaign({...newCampaign, productId: product.id, startDate: e.target.value})}
                                      className="rounded-lg"
                                    />
                                  </div>
                                  <div className="grid gap-2">
                                    <label htmlFor="cost" className="text-sm font-medium">
                                      Стоимость (₽)
                                    </label>
                                    <Input
                                      id="cost"
                                      type="number"
                                      value={newCampaign.cost}
                                      onChange={(e) => setNewCampaign({...newCampaign, productId: product.id, cost: e.target.value})}
                                      placeholder="15000"
                                      className="rounded-lg"
                                    />
                                  </div>
                                </div>
                              </div>
                              <button 
                                onClick={handleAddCampaign}
                                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-colors text-white font-medium py-2.5 rounded-lg shadow-md hover:shadow-md"
                              >
                                Создать кампанию
                              </button>
                            </DialogContent>
                          </Dialog>
                        </div>

                        {product.campaigns.length === 0 ? (
                          <div className="text-center py-8 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
                            <p className="text-gray-500">У этого товара пока нет рекламных кампаний</p>
                          </div>
                        ) : (
                          <div className="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
                            <div className="flex justify-between items-center p-4 border-b border-gray-100">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-gray-700">Статистика переходов</h4>
                                <button 
                                  onClick={() => refreshCampaignStats(product.id)}
                                  className={`p-1.5 rounded-full bg-gray-100 text-gray-500 hover:bg-primary/10 hover:text-primary transition-colors ${isRefreshing ? 'animate-spin' : ''}`}
                                  disabled={isRefreshing}
                                  title="Обновить статистику"
                                >
                                  <RefreshCw className="w-4 h-4" />
                                </button>
                              </div>
                              
                              <p className="text-sm text-gray-500">
                                Всего кампаний: {product.campaigns.length}
                              </p>
                            </div>

                            <DndContext
                              sensors={sensors} 
                              collisionDetection={closestCenter}
                              onDragEnd={(event) => handleCampaignDragEnd(event, product.id)}
                            >
                              <SortableContext
                                items={product.campaigns.map(campaign => campaign.id)}
                                strategy={verticalListSortingStrategy}
                              >
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead className="w-[5%]"></TableHead>
                                      <TableHead>Кампания</TableHead>
                                      <TableHead>Реферальная ссылка</TableHead>
                                      <TableHead>Статистика</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {product.campaigns.map((campaign) => (
                                      <SortableCampaignRow 
                                        key={campaign.id} 
                                        campaign={campaign} 
                                        productId={product.id}
                                        onUpdatePostLink={updateCampaignPostLink}
                                      />
                                    ))}
                                  </TableBody>
                                </Table>
                              </SortableContext>
                            </DndContext>
                          </div>
                        )}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>

      <Dialog open={isGeneratedLinkDialogOpen} onOpenChange={setIsGeneratedLinkDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-display">Реферальная ссылка создана</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-between">
              <span className="text-sm text-gray-600 truncate mr-2">{generatedLink}</span>
              <button 
                onClick={() => copyToClipboard(generatedLink)}
                className="p-1.5 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-full transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Используйте эту ссылку для отслеживания трафика с рекламной кампании
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isLimitExceededDialogOpen} onOpenChange={setIsLimitExceededDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-display text-red-500">Достигнут лимит ссылок</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-700">
              Вы достигли лимита в {userInfo.linksLimit} реферальных ссылок в текущем месяце.
            </p>
            <p className="text-gray-500 mt-2">
              Для увеличения лимита перейдите на тарифный план PRO
            </p>
          </div>
          <div className="flex gap-4">
            <button className="flex-1 bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 font-medium py-2.5 rounded-lg">
              Остаться на текущем плане
            </button>
            <button className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-colors text-white font-medium py-2.5 rounded-lg shadow-md">
              Перейти на PRO
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LinksTable;
