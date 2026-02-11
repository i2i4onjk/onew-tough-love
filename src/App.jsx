import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, ExternalLink, Heart, Clock, Truck, Gift, ChevronDown, Check, Info, List, Star, LayoutGrid, ArrowRightCircle, ChevronLeft, ChevronRight, X } from 'lucide-react';

/**
 * 앨범 공구 안내 앱 (최종 통합본 v44)
 * - 배지 표시 순서 최종 수정: [미공포/최저가] -> [공구특전] -> [GLOBAL]
 * - Ktown4u의 GLOBAL 배지가 맨 오른쪽으로 이동됨
 */

const ALBUM_INFO = {
  artist: "온유 ONEW",
  title: "5TH EP 'TOUGH LOVE'",
  releaseDate: "2026.03.09",
  
  infoImages: [
    "https://i.postimg.cc/4NJxK3Lm/ateubodeu-1.png", 
    "https://i.postimg.cc/9FzsN5z4/ateubodeu-3.png",
  ],
  
  coverImage: "https://i.postimg.cc/RVPZdVsm/IMG_3543.jpg"
};

const SHOPS_DATA = [
  {
    id: 1,
    name: "Ktown4u",
    visible: true,
    links: [
      { label: "KOR", url: "https://kr.ktown4u.com/eventinfo?eve_no=44020814&biz_no=967" },
      { label: "JP", url: "https://jp.ktown4u.com/eventinfo?eve_no=42668173&biz_no=783" },
      { label: "GLOBAL", url: "https://www.ktown4u.com/eventinfo?eve_no=44021069&biz_no=220" }
    ],
    period: "~03/09 17:00\n~03/15 20:00",
    endDate: "2026-03-09T16:59:59", 
    benefitImage: "https://i.postimg.cc/VNB4vdrG/IMG_3666.jpg",
    goBenefit: "포토카드 2종\n선착순 카라비너 1종",
    goBenefitDetail: "포카(사첵 ver.) 2종\n카라비너(찡냥이 ver.) - 5장 이상 구매 시",
    shopBenefit: "미공포 2종",
    price_note: "₩17,300",
    price_book: "₩17,300",
    price_pocket: "₩9,900",
    price_pocket_donation: "₩9,700", 
    price_towel: "₩19,800",
    price_towel_set: "₩39,600",
    shipping: "3만원 이상 무료",
    tags: ["미공포", "GLOBAL"] 
  },
  {
    id: 2,
    name: "HOTTRACKS",
    visible: true,
    links: [
      { label: "구매 페이지 바로가기", url: "https://hottracks.kyobobook.co.kr/groupbuy/detail/ptoug" }
    ],
    period: "~03/08 23:59\n~03/15 18:00",
    endDate: "2026-03-08T23:59:59",
    benefitImage: "https://i.postimg.cc/HsPTv929/IMG-3668.jpg",
    goBenefit: "포토카드 2종\n선착순 카라비너 1종",
    goBenefitDetail: "포카(착장1 ver.) 2종\n카라비너(찡먹이 ver.) - 5장 이상 구매 시",
    shopBenefit: "미공포 2종",
    price_note: "₩17,500",
    price_book: "₩17,500",
    price_pocket: "₩10,000",
    price_pocket_donation: "-",
    price_towel: "₩20,000",
    price_towel_set: "₩39,400",
    shipping: "2만원 이상 무료",
    tags: ["미공포"]
  },
  {
    id: 3,
    name: "APPLE MUSIC",
    visible: true,
    links: [
      { label: "NOTE Ver.", url: "https://link.gmarket.co.kr/VeGzcBlJgi" },
      { label: "BOOK Ver.", url: "https://link.gmarket.co.kr/ehyhIgjJgi" },
      { label: "POCKET BOOK Ver.", url: "https://link.gmarket.co.kr/uD6K2PjJgi" },
      { label: "TOWEL BOOK Ver.", url: "https://link.gmarket.co.kr/0rXDDllJgi" },
      { label: "TOWEL BOOK SET Ver.", url: "https://link.gmarket.co.kr/SEsXVOmJgi" },
      { label: "기부 Ver.", url: "https://link.gmarket.co.kr/KnGPphmJgi" }
    ],
    period: "~03/08 23:59\n~03/15 20:00",
    endDate: "2026-03-08T23:59:59",
    benefitImage: "https://i.postimg.cc/k5FwGB6Y/IMG_3664.jpg",
    goBenefit: "포토카드 2종\n선착순 카라비너 1종",
    goBenefitDetail: "포카(착장2 ver.) 2종\n카라비너(롭냥이 ver.) - 5장 이상 구매 시",
    shopBenefit: "미공포 2종",
    price_note: "₩17,700",
    price_book: "₩17,700",
    price_pocket: "₩9,700",
    price_pocket_donation: "₩9,500",
    price_towel: "₩20,200",
    price_towel_set: "₩39,800",
    shipping: "2만원 이상 무료",
    tags: ["미공포"]
  },
  {
    id: 4,
    name: "ALLMD",
    visible: true,
    links: [
      { label: "구매 페이지 바로가기", url: "https://m.allmd.com/product/list.html?cate_no=1682" }
    ],
    period: "~03/15 21:00",
    endDate: "2026-03-15T20:59:59",
    benefitImage: "-", 
    goBenefit: "포토카드 2종\n선착순 카라비너 1종",
    goBenefitDetail: "포카(앵콜 ver.) 2종\n카라비너(찡즈 ver.) - 5장 이상 구매 시", 
    shopBenefit: "-",
    price_note: "₩17,200",
    price_book: "₩17,200",
    price_pocket: "₩9,700",
    price_pocket_donation: "₩9,500",
    price_towel: "₩19,600",
    price_towel_set: "₩39,100",
    shipping: "5만원 이상 무료",
    tags: ["최저가"] 
  },
  {
    id: 5,
    name: "SOUNDWAVE",
    visible: false,
    links: [
      { label: "구매 페이지 바로가기", url: "http://www.sound-wave.co.kr" }
    ],
    period: "~03/08 23:59\n~03/15 18:00",
    endDate: "2026-03-08T23:59:59",
    benefitImage: "https://i.postimg.cc/0NdZjbM4/IMG_3663.jpg",
    goBenefit: "-",
    goBenefitDetail: "-",
    shopBenefit: "미공포 2종",
    price_note: "₩16,900",
    price_book: "₩15,600",
    price_pocket: "₩8,800",
    price_pocket_donation: "추후 안내",
    price_towel: "₩19,000",
    price_towel_set: "₩38,600",
    shipping: "5만원 이상 무료",
    tags: ["미공포"]
  },
  {
    id: 6,
    name: "MAKESTAR",
    visible: false, 
    links: [
      { label: "구매 페이지 바로가기", url: "http://www.sound-wave.co.kr" }
    ],
    period: "오픈 예정",
    endDate: "2026-03-08T23:59:59",
    benefitImage: "https://i.postimg.cc/RVPZdVsm/IMG_3543.jpg",
    goBenefit: "-",
    goBenefitDetail: "-",
    shopBenefit: "미공포 2종",
    price_note: "-",
    price_book: "-",
    price_pocket: "-",
    price_pocket_donation: "-",
    price_towel: "-",
    price_towel_set: "-",
    shipping: "국내배송비 무료",
    tags: ["미공포"]
  }
];

// --- 최저가 계산 로직 ---
const getPriceValue = (priceStr) => {
  if (!priceStr || priceStr === '-') return Infinity;
  const singlePrice = priceStr.split('\n')[0];
  const num = parseInt(singlePrice.replace(/[^0-9]/g, ''), 10);
  return isNaN(num) ? Infinity : num;
};

// [중요] 화면에 보여줄 데이터만 필터링 (visible: true인 것만)
const VISIBLE_SHOPS = SHOPS_DATA.filter(shop => shop.visible);

const MIN_PRICES = {
  price_note: Math.min(...VISIBLE_SHOPS.map(d => getPriceValue(d.price_note))),
  price_book: Math.min(...VISIBLE_SHOPS.map(d => getPriceValue(d.price_book))),
  price_pocket: Math.min(...VISIBLE_SHOPS.map(d => getPriceValue(d.price_pocket))),
  price_pocket_donation: Math.min(...VISIBLE_SHOPS.map(d => getPriceValue(d.price_pocket_donation))),
  price_towel: Math.min(...VISIBLE_SHOPS.map(d => getPriceValue(d.price_towel))),
  price_towel_set: Math.min(...VISIBLE_SHOPS.map(d => getPriceValue(d.price_towel_set))),
};

const TABLE_ROWS = [
  { label: "공구 기간", key: "period" },
  { label: "공구 특전", key: "goBenefit", highlight: true },
  { label: "예판 특전", key: "shopBenefit" },
  { label: "NOTE", key: "price_note" },
  { label: "BOOK", key: "price_book" },
  { label: "POCKET BOOK", key: "price_pocket" },
  { label: "TOWEL BOOK", key: "price_towel" },
  { label: "TOWEL BOOK(SET)", key: "price_towel_set" },
  { label: "POCKETBOOK(기증)", key: "price_pocket_donation" },
  { label: "배송비", key: "shipping" },
];

// [신규] 링크 선택 모달
const LinkSelectionModal = ({ shop, onClose }) => {
  if (!shop) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md rounded-t-[2rem] sm:rounded-[2rem] p-6 pb-10 sm:pb-6 animate-in slide-in-from-bottom-10 duration-300">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{shop.name}</h3>
            <p className="text-xs text-gray-500 mt-1">구매하실 품목을 선택해주세요</p>
          </div>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="space-y-3">
          {shop.links.map((link, idx) => (
            <a 
              key={idx}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-[#86A5DC]/10 hover:border-[#86A5DC]/30 hover:text-[#86A5DC] transition-all group"
            >
              <span className="font-bold text-sm text-gray-800 group-hover:text-[#86A5DC]">{link.label}</span>
              <ExternalLink size={16} className="text-gray-400 group-hover:text-[#86A5DC]" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

// 리스트의 각 공구처 박스
const ShopCard = ({ shop, isFavorite, toggleFavorite, elementId, isHighlighted, onOpenLinks }) => {
  const timeLeft = useMemo(() => {
    if (!shop.endDate) return "기간 미정";
    const end = new Date(shop.endDate);
    const now = new Date();
    const diff = end - now;
    if (diff < 0) return "마감됨";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (days === 0) return `${hours}시간 남음`;
    return `D-${days}`;
  }, [shop.endDate]);

  const renderPriceRow = (label, priceKey) => {
    const priceStr = shop[priceKey];
    if (!priceStr || priceStr === '-') return null;
    const isLowest = getPriceValue(priceStr) === MIN_PRICES[priceKey];
    return (
      <div className="flex justify-between items-start py-1">
          <span className="text-gray-500 text-[11px] font-bold uppercase tracking-tight pt-0.5 w-28 shrink-0">{label}</span>
          <span className={`font-bold text-right whitespace-pre-wrap text-sm leading-tight flex-1 ${isLowest ? 'text-[#86A5DC]' : 'text-gray-900'}`}>
            {priceStr}
            {isLowest && <span className="text-[9px] ml-1 align-top text-[#86A5DC] opacity-80">BEST</span>}
          </span>
      </div>
    );
  };

  return (
    <div 
      id={elementId}
      className={`bg-white rounded-[1.5rem] shadow-sm border border-gray-100 p-5 mb-4 transition-all duration-500 ${isHighlighted ? 'ring-2 ring-[#86A5DC] scale-[1.02]' : 'hover:shadow-md'}`}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-lg text-gray-900 leading-none">
            {shop.name}
          </h3>
          
          <div className="flex flex-wrap gap-1 mt-2">
            {/* 1. 미공포 / 최저가 배지 먼저 출력 */}
            {shop.tags.map(tag => {
              if (tag === "미공포") {
                return (
                  <span key={tag} className="inline-flex items-center justify-center h-[16px] px-1.5 rounded-full text-[9px] bg-[#D5A2A1]/15 text-[#D5A2A1] font-bold border border-[#D5A2A1]/20 uppercase">
                    미공포
                  </span>
                );
              }
              if (tag === "최저가") {
                return (
                  <span key={tag} className="inline-flex items-center justify-center h-[16px] px-1.5 rounded-full text-[9px] bg-[#D5A2A1]/15 text-[#D5A2A1] font-bold border border-[#D5A2A1]/20 uppercase">
                    최저가
                  </span>
                );
              }
              return null;
            })}

            {/* 2. 공구특전 배지 출력 */}
            {shop.goBenefit !== "-" && (
              <span className="inline-flex items-center justify-center h-[16px] px-1.5 rounded-full text-[9px] bg-[#86A5DC]/15 text-[#86A5DC] font-bold border border-[#86A5DC]/20 uppercase">
                공구특전
              </span>
            )}

            {/* 3. GLOBAL 배지 출력 (맨 마지막) */}
            {shop.tags.includes("GLOBAL") && (
              <span className="inline-flex items-center justify-center h-[16px] px-1.5 rounded-full text-[9px] bg-gray-100 text-gray-500 font-bold border border-gray-200 uppercase">
                GLOBAL
              </span>
            )}
          </div>
        </div>
        
        <button 
          onClick={() => toggleFavorite(shop.id)} 
          className={`p-2.5 rounded-full transition-colors ${isFavorite ? 'text-[#86A5DC] bg-[#86A5DC]/15' : 'text-gray-200 bg-gray-50'}`}
        >
          <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 mb-3">
         <div className="space-y-1">
            {renderPriceRow("NOTE", "price_note")}
            {renderPriceRow("BOOK", "price_book")}
            {renderPriceRow("POCKET BOOK", "price_pocket")}
            {renderPriceRow("TOWEL BOOK", "price_towel")}
            {renderPriceRow("TOWEL BOOK(SET)", "price_towel_set")}
            {renderPriceRow("POCKETBOOK(기증)", "price_pocket_donation")}
            {renderPriceRow("DIGIPACK(기부)", "price_donation")}
         </div>
         
        <div className="flex justify-between mt-3 pt-3 border-t border-gray-200 text-xs text-gray-400">
          <span className="font-bold">배송비</span>
          <span className="font-medium text-gray-600">{shop.shipping}</span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {shop.shopBenefit !== "-" && (
          <div className="flex items-start gap-2">
            <Gift size={15} className="text-gray-400 mt-0.5 shrink-0" />
            <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap"><span className="font-bold text-gray-500">예판특전:</span> {shop.shopBenefit}</p>
          </div>
        )}
        
        {shop.goBenefit !== "-" && (
          <div className="flex items-start gap-2">
            <Star size={15} className="text-[#86A5DC] mt-0.5 shrink-0" />
            <div className="flex gap-1 text-xs text-gray-700 leading-relaxed">
               <span className="font-bold text-[#86A5DC] shrink-0">공구특전:</span>
               <span className="whitespace-pre-wrap">{shop.goBenefitDetail || shop.goBenefit}</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs font-black text-orange-500 bg-orange-50 px-3 py-2 rounded-xl shrink-0">
          <Clock size={14} /> {timeLeft}
        </div>
        
        <button 
          onClick={() => onOpenLinks(shop)}
          className="flex-1 bg-gray-900 text-white py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors"
        >
          구매하기 <ExternalLink size={16} />
        </button>
      </div>
    </div>
  );
};

// --- 특전 모아보기 카드 ---
const GalleryCard = ({ shop, onNavigate }) => {
  return (
    <div 
      onClick={() => onNavigate(shop.id)} 
      className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95"
    >
      <div className="mb-2 flex justify-between items-center">
        <span className="font-bold text-sm text-gray-900 truncate">{shop.name}</span>
        <ArrowRightCircle size={16} className="text-gray-300" />
      </div>
      <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden relative border border-gray-100">
         <img src={shop.benefitImage} className="w-full h-full object-cover" alt={`${shop.name} 특전`} />
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('info');
  const [favorites, setFavorites] = useState([]);
  const [targetShopId, setTargetShopId] = useState(null);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [selectedShop, setSelectedShop] = useState(null);

  // 로컬 스토리지 불러오기 시 에러 방지
  useEffect(() => {
    try {
      const saved = localStorage.getItem('album_mate_favs');
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load favorites", e);
      localStorage.removeItem('album_mate_favs');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('album_mate_favs', JSON.stringify(favorites));
  }, [favorites]);

  const handleNavigateToList = (shopId) => {
    setActiveTab('list');
    setTargetShopId(shopId);
  };

  const handleOpenLinks = (shop) => {
    if (shop.links && shop.links.length === 1) {
      window.open(shop.links[0].url, '_blank');
    } else {
      setSelectedShop(shop);
    }
  };

  useEffect(() => {
    if (activeTab === 'list' && targetShopId) {
      setTimeout(() => {
        const element = document.getElementById(`shop-${targetShopId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => setTargetShopId(null), 2000);
        }
      }, 100);
    }
  }, [activeTab, targetShopId]);

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const nextSlide = () => {
    setCurrentImgIdx((prev) => (prev + 1) % ALBUM_INFO.infoImages.length);
  };
  const prevSlide = () => {
    setCurrentImgIdx((prev) => (prev - 1 + ALBUM_INFO.infoImages.length) % ALBUM_INFO.infoImages.length);
  };
  
  // 터치 이벤트 핸들러
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null); 
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  const filteredData = useMemo(() => {
    if (activeTab === 'favorite') return VISIBLE_SHOPS.filter(s => favorites.includes(s.id));
    return VISIBLE_SHOPS;
  }, [activeTab, favorites]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-0 sm:py-10">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #86A5DC;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6a8bc4;
        }
      `}</style>

      {selectedShop && (
        <LinkSelectionModal 
          shop={selectedShop} 
          onClose={() => setSelectedShop(null)} 
        />
      )}

      <div className="w-full max-w-md bg-white min-h-screen sm:min-h-[850px] sm:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col border border-gray-100 relative">
        
        <div className="px-6 pt-6 pb-2 bg-white border-b border-gray-50 sticky top-0 z-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm shrink-0 border border-gray-100">
              <img src={ALBUM_INFO.coverImage} alt="Album" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#86A5DC] text-[10px] font-black uppercase tracking-widest mb-1">{ALBUM_INFO.artist}</p>
              <h1 className="text-xl font-bold text-gray-900 truncate leading-tight">{ALBUM_INFO.title}</h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">발매일: {ALBUM_INFO.releaseDate}</p>
            </div>
          </div>

          <div className="flex bg-gray-100 p-1.5 rounded-2xl overflow-x-auto no-scrollbar">
            <button 
              onClick={() => setActiveTab('info')} 
              className={`flex-1 min-w-[70px] py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1 ${activeTab === 'info' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400'}`}
            >
              <Info size={14} /> 
              <span className="pt-[1px]">공지</span>
            </button>
            <button 
              onClick={() => setActiveTab('list')} 
              className={`flex-1 min-w-[70px] py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1 ${activeTab === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400'}`}
            >
              <List size={14} /> 
              <span className="pt-[1px]">리스트</span>
            </button>
            <button 
              onClick={() => setActiveTab('gallery')} 
              className={`flex-1 min-w-[70px] py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1 ${activeTab === 'gallery' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400'}`}
            >
              <LayoutGrid size={14} /> 
              <span className="pt-[1px]">특전</span>
            </button>
            <button 
              onClick={() => setActiveTab('favorite')} 
              className={`flex-1 min-w-[70px] py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1 ${activeTab === 'favorite' ? 'bg-[#86A5DC] text-white shadow-md' : 'text-gray-400'}`}
            >
              <Heart size={14} fill={activeTab === 'favorite' ? "white" : "none"} /> 
              <span className="pt-[1px]">찜 ({favorites.length})</span>
            </button>
          </div>
        </div>

        <div className="flex-1 px-6 pt-4 pb-6 overflow-y-auto bg-gray-50/50 custom-scrollbar">
          {activeTab === 'info' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                 <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 font-bold text-sm text-gray-800 flex justify-between items-center">
                  <span>💝 공구 특전</span>
                  <span className="text-[10px] text-[#86A5DC] font-bold animate-pulse">옆으로 넘겨보기 →</span>
                </div>
                 
                 <div 
                    className="relative group"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                 >
                    <div className="aspect-square bg-gray-100 overflow-hidden">
                      <img 
                        src={ALBUM_INFO.infoImages[currentImgIdx]} 
                        alt={`Info ${currentImgIdx + 1}`} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    <button 
                      onClick={prevSlide}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 rounded-full shadow-md text-gray-800 hover:bg-white active:scale-95 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    
                    <button 
                      onClick={nextSlide}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 rounded-full shadow-md text-gray-800 hover:bg-white active:scale-95 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight size={20} />
                    </button>

                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                      {ALBUM_INFO.infoImages.map((_, idx) => (
                        <div 
                          key={idx}
                          onClick={() => setCurrentImgIdx(idx)}
                          className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all ${idx === currentImgIdx ? 'bg-[#86A5DC] w-3' : 'bg-gray-300'}`}
                        />
                      ))}
                    </div>
                 </div>
              </div>

              <p className="text-left text-[11px] text-gray-400 font-medium px-4">
                * 공구 정보는 실시간으로 업데이트됩니다.
              </p>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 font-bold text-sm text-gray-800 flex justify-between items-center">
                  <span>💰 상세 가격 비교</span>
                  <span className="text-[10px] text-[#86A5DC] font-bold animate-pulse">옆으로 넘겨보기 →</span>
                </div>
                <div className="overflow-x-auto pb-3 custom-scrollbar">
                  <table className="w-full text-[11px] text-left border-collapse min-w-[900px]">
                    <thead>
                      <tr className="bg-gray-100 text-gray-500 border-b border-gray-200">
                        <th className="p-3 font-bold bg-gray-50 sticky left-0 z-10 border-r border-gray-200 w-24 whitespace-nowrap">구분</th>
                        {VISIBLE_SHOPS.map(shop => (
                          <th key={shop.id} className="p-3 font-bold text-gray-700 min-w-[100px] border-r border-gray-100 last:border-0 whitespace-nowrap">
                            {shop.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {TABLE_ROWS.map((row, idx) => (
                        <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50">
                          <td className="p-3 font-bold bg-gray-50 sticky left-0 z-10 border-r border-gray-200 text-gray-600 whitespace-nowrap">
                            {row.label}
                          </td>
                          {VISIBLE_SHOPS.map(shop => {
                            const isPriceRow = row.key.startsWith('price_');
                            const priceVal = getPriceValue(shop[row.key]);
                            const isLowest = isPriceRow && priceVal !== Infinity && priceVal === MIN_PRICES[row.key];
                            const isHighlightCell = (row.highlight && shop[row.key] !== '-') || isLowest;

                            return (
                              <td 
                                key={shop.id} 
                                className={`p-3 align-top whitespace-pre-wrap border-r border-gray-100 last:border-0 
                                  ${isHighlightCell ? 'bg-[#86A5DC]/10 text-gray-900' : 'text-gray-600'} 
                                  ${isLowest ? 'font-black' : (isHighlightCell ? 'font-bold' : '')}`}
                              >
                                {shop[row.key]}
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'list' && (
            <div className="animate-in slide-in-from-bottom-2 duration-300">
                {VISIBLE_SHOPS.map(shop => (
                  <ShopCard 
                    key={shop.id}
                    elementId={`shop-${shop.id}`} 
                    shop={shop} 
                    isFavorite={favorites.includes(shop.id)} 
                    toggleFavorite={toggleFavorite}
                    isHighlighted={targetShopId === shop.id}
                    onOpenLinks={handleOpenLinks} 
                  />
                ))}
            </div>
          )}

          {/* 특전 모아보기 갤러리 탭 */}
          {activeTab === 'gallery' && (
            <div className="grid grid-cols-2 gap-3 animate-in slide-in-from-bottom-2 duration-300">
              {/* 특전 이미지가 있는 항목만 필터링하여 표시 */}
              {VISIBLE_SHOPS.filter(shop => shop.benefitImage && shop.benefitImage !== "-").map(shop => (
                <GalleryCard 
                  key={shop.id} 
                  shop={shop} 
                  onNavigate={handleNavigateToList}
                />
              ))}
            </div>
          )}

          {activeTab === 'favorite' && (
            <div className="animate-in slide-in-from-bottom-2 duration-300">
              {filteredData.length > 0 ? (
                filteredData.map(shop => (
                  <ShopCard 
                    key={shop.id} 
                    shop={shop} 
                    isFavorite={favorites.includes(shop.id)} 
                    toggleFavorite={toggleFavorite}
                    onOpenLinks={handleOpenLinks} 
                  />
                ))
              ) : (
                 <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                  <Heart size={40} className="mb-2 opacity-20" />
                  <p className="font-bold text-sm">찜한 내역이 없습니다.</p>
                  <button onClick={() => setActiveTab('list')} className="mt-2 text-[#86A5DC] text-xs font-bold underline">전체 리스트 보기</button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-4 text-center text-[10px] text-gray-300 font-bold tracking-widest uppercase border-t border-gray-100 bg-white">
          THE TIME WE L♥VE<br />
          © 2026 피치 @__I2I4
        </div>
      </div>
    </div>
  );
}