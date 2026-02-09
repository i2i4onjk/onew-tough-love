import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, ExternalLink, Heart, Clock, Truck, Gift, ChevronDown, Check, Info, List, Star, LayoutGrid, ArrowRightCircle, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * 앨범 공구 안내 앱 (최종 수정본 v19)
 * - "옆으로 스크롤" -> "옆으로 넘겨보기 →" 로 텍스트 변경 (상단 특전, 하단 표 모두)
 * - 안내 문구(* 공구 정보는...) 왼쪽 정렬(text-left)로 복구
 */

const ALBUM_INFO = {
  artist: "온유 ONEW",
  title: "5TH EP 'TOUGH LOVE'",
  releaseDate: "2026.03.09",
  
  // [!] 슬라이드로 보여줄 이미지 목록
  infoImages: [
    "https://i.postimg.cc/RVPZdVsm/IMG_3543.jpg", 
    "https://i.postimg.cc/RVPZdVsm/IMG_3543.jpg",
    "https://i.postimg.cc/RVPZdVsm/IMG_3543.jpg"
  ],
  
  coverImage: "https://i.postimg.cc/RVPZdVsm/IMG_3543.jpg"
};

const SHOPS_DATA = [
  {
    id: 1,
    name: "Ktown4u",
    link: "https://www.ktown4u.com",
    period: "~7/15 17:00\n~7/21 17:00",
    endDate: "2026-03-09T17:00:00", 
    benefitImage: "https://i.postimg.cc/RVPZdVsm/IMG_3543.jpg",
    goBenefit: "포토카드 2종\n카라비너 1종",
    goBenefitDetail: "포카(사첵 ver.) 2종 / 카라비너(찡냥이 ver.)",
    shopBenefit: "미공포 2종",
    price_jewel: "₩14,900",
    price_percent: "₩27,400",
    price_photobook: "₩23,300\n(세트 ₩46,600)",
    price_digipack: "₩13,600\n(세트 ₩27,200)",
    price_donation: "₩13,000",
    shipping: "3만원 이상 무료",
    tags: ["미공포", "공구특전"]
  },
  {
    id: 2,
    name: "HOTTRACKS",
    link: "https://www.hottracks.co.kr",
    period: "~7/15 17:00\n~7/21 17:00",
    endDate: "2026-03-08T23:59:00",
    benefitImage: "https://i.postimg.cc/RVPZdVsm/IMG_3543.jpg",
    goBenefit: "포토카드 2종\n카라비너 1종",
    goBenefitDetail: "포카(착장1 ver.) 2종 / 카라비너(찡먹이 ver.)",
    shopBenefit: "미공포 2종",
    price_jewel: "₩15,000",
    price_percent: "₩27,600",
    price_photobook: "₩23,800",
    price_digipack: "₩13,800",
    price_donation: "-",
    shipping: "2만원 이상 무료",
    tags: ["미공포", "공구특전"]
  },
  {
    id: 3,
    name: "APPLE MUSIC",
    link: "http://www.applemusic.co.kr",
    period: "~7/15 17:00\n~7/21 17:00",
    endDate: "2026-03-08T23:59:00",
    benefitImage: "https://i.postimg.cc/RVPZdVsm/IMG_3543.jpg",
    goBenefit: "포토카드 2종\n카라비너 1종",
    goBenefitDetail: "포카(착장2 ver.) 2종 / 카라비너(롭냥이 ver.)",
    shopBenefit: "미공포 2종",
    price_jewel: "₩14,800",
    price_percent: "₩28,200",
    price_photobook: "₩24,100\n(세트 ₩48,000)",
    price_digipack: "₩13,500\n(세트 ₩26,800)",
    price_donation: "₩13,000",
    shipping: "2만원 이상 무료",
    tags: ["미공포", "공구특전"]
  },
  {
    id: 4,
    name: "SOUNDWAVE",
    link: "http://www.sound-wave.co.kr",
    period: "~7/15 17:00\n~7/21 17:00",
    endDate: "2026-03-08T23:59:00",
    benefitImage: "https://i.postimg.cc/RVPZdVsm/IMG_3543.jpg",
    goBenefit: "포토카드 2종\n카라비너 1종",
    goBenefitDetail: "포카(앵콜 ver.) 2종 / 카라비너(늘어나용 ver.)",
    shopBenefit: "미공포 2종",
    price_jewel: "-",
    price_percent: "-",
    price_photobook: "₩21,500",
    price_digipack: "₩13,200",
    price_donation: "-",
    shipping: "5만원 이상 무료",
    tags: ["미공포", "공구특전"]
  },
  {
    id: 5,
    name: "MAKESTAR",
    link: "https://www.makestar.co",
    period: "~7/15 17:00\n~7/21 17:00",
    endDate: "2026-03-08T23:59:00",
    benefitImage: "https://i.postimg.cc/RVPZdVsm/IMG_3543.jpg",
    goBenefit: "-",
    goBenefitDetail: "-",
    shopBenefit: "미공포 2종",
    price_jewel: "-",
    price_percent: "-",
    price_photobook: "세트 ₩47,000",
    price_digipack: "-",
    price_donation: "-",
    shipping: "국내 배송비 무료",
    tags: ["메이크스타", "무료배송"]
  }
];

// --- 최저가 계산 로직 ---
const getPriceValue = (priceStr) => {
  if (!priceStr || priceStr === '-') return Infinity;
  const singlePrice = priceStr.split('\n')[0];
  const num = parseInt(singlePrice.replace(/[^0-9]/g, ''), 10);
  return isNaN(num) ? Infinity : num;
};

const MIN_PRICES = {
  price_jewel: Math.min(...SHOPS_DATA.map(d => getPriceValue(d.price_jewel))),
  price_percent: Math.min(...SHOPS_DATA.map(d => getPriceValue(d.price_percent))),
  price_photobook: Math.min(...SHOPS_DATA.map(d => getPriceValue(d.price_photobook))),
  price_digipack: Math.min(...SHOPS_DATA.map(d => getPriceValue(d.price_digipack))),
  price_donation: Math.min(...SHOPS_DATA.map(d => getPriceValue(d.price_donation))),
};

const TABLE_ROWS = [
  { label: "공구 기간", key: "period" },
  { label: "공구 특전", key: "goBenefit", highlight: true },
  { label: "예판 특전", key: "shopBenefit" },
  { label: "PHOTOBOOK(2종)", key: "price_photobook" },
  { label: "DIGIPACK(2종)", key: "price_digipack" },
  { label: "Jewel Rabbit(1종)", key: "price_jewel" },
  { label: "PERCENT(1종)", key: "price_percent" },
  { label: "DIGIPACK(기부)", key: "price_donation" },
  { label: "배송비", key: "shipping" },
];

const Badge = ({ text }) => (
  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] bg-gray-100 text-gray-500 font-bold border border-gray-200 uppercase">
    {text}
  </span>
);

// 리스트의 각 공구처 박스
const ShopCard = ({ shop, isFavorite, toggleFavorite, elementId, isHighlighted }) => {
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
      id={elementId} // 스크롤 타겟 ID
      className={`bg-white rounded-[1.5rem] shadow-sm border border-gray-100 p-5 mb-4 transition-all duration-500 ${isHighlighted ? 'ring-2 ring-[#86A5DC] scale-[1.02]' : 'hover:shadow-md'}`}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2 leading-none">
            {shop.name}
            {shop.goBenefit !== "-" && (
              <span className="bg-[#86A5DC]/15 text-[#86A5DC] text-[10px] px-2 py-0.5 rounded-full font-bold">공구특전</span>
            )}
          </h3>
          <div className="flex flex-wrap gap-1 mt-2">
            {shop.tags.map((tag, idx) => <Badge key={idx} text={`#${tag}`} />)}
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
            {renderPriceRow("Photobook", "price_photobook")}
            {renderPriceRow("Digipack", "price_digipack")}
            {renderPriceRow("Jewel Rabbit", "price_jewel")}
            {renderPriceRow("Percent", "price_percent")}
            {renderPriceRow("DIGIPACK(기부)", "price_donation")}
         </div>
         
        <div className="flex justify-between mt-3 pt-3 border-t border-gray-200 text-xs text-gray-400">
          <span className="font-bold">배송비</span>
          <span className="font-medium text-gray-600">{shop.shipping}</span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-start gap-2">
          <Gift size={15} className="text-gray-400 mt-0.5 shrink-0" />
          <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap"><span className="font-bold text-gray-500">예판특전:</span> {shop.shopBenefit}</p>
        </div>
        
        {shop.goBenefit !== "-" && (
          <div className="flex items-start gap-2">
            <Star size={15} className="text-[#86A5DC] mt-0.5 shrink-0" />
            <p className="text-xs text-gray-700 leading-relaxed"><span className="font-bold text-[#86A5DC]">공구특전:</span> {shop.goBenefitDetail || shop.goBenefit}</p>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs font-black text-orange-500 bg-orange-50 px-3 py-2 rounded-xl shrink-0">
          <Clock size={14} /> {timeLeft}
        </div>
        <a 
          href={shop.link} 
          target="_blank" 
          rel="noreferrer" 
          className="flex-1 bg-gray-900 text-white py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors"
        >
          구매하기 <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
};

// --- 특전 모아보기 카드 ---
const GalleryCard = ({ shop, onNavigate }) => {
  return (
    <div 
      onClick={() => onNavigate(shop.id)} // 클릭 시 리스트로 이동
      className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95"
    >
      <div className="mb-2 flex justify-between items-center">
        <span className="font-bold text-sm text-gray-900 truncate">{shop.name}</span>
        <ArrowRightCircle size={16} className="text-gray-300" />
      </div>
      {/* 1:1 정방형 비율 (aspect-square) */}
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
  
  // 이미지 슬라이더를 위한 상태
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('album_mate_favs');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('album_mate_favs', JSON.stringify(favorites));
  }, [favorites]);

  // 특전 갤러리 클릭 시 실행되는 함수
  const handleNavigateToList = (shopId) => {
    setActiveTab('list');
    setTargetShopId(shopId);
  };

  // 리스트 탭으로 변경되었을 때 스크롤 이동 처리
  useEffect(() => {
    if (activeTab === 'list' && targetShopId) {
      // 약간의 지연을 주어 탭 전환 애니메이션 후 스크롤
      setTimeout(() => {
        const element = document.getElementById(`shop-${targetShopId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // 하이라이트 효과를 위해 잠시 후 타겟 해제
          setTimeout(() => setTargetShopId(null), 2000);
        }
      }, 100);
    }
  }, [activeTab, targetShopId]);

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  // 슬라이더 이전/다음 함수
  const nextSlide = () => {
    setCurrentImgIdx((prev) => (prev + 1) % ALBUM_INFO.infoImages.length);
  };
  const prevSlide = () => {
    setCurrentImgIdx((prev) => (prev - 1 + ALBUM_INFO.infoImages.length) % ALBUM_INFO.infoImages.length);
  };

  const filteredData = useMemo(() => {
    if (activeTab === 'favorite') return SHOPS_DATA.filter(s => favorites.includes(s.id));
    return SHOPS_DATA;
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

      <div className="w-full max-w-md bg-white min-h-screen sm:min-h-[850px] sm:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col border border-gray-100">
        
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
              <Info size={14} /> 공지
            </button>
            <button 
              onClick={() => setActiveTab('list')} 
              className={`flex-1 min-w-[70px] py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1 ${activeTab === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400'}`}
            >
              <List size={14} /> 리스트
            </button>
            <button 
              onClick={() => setActiveTab('gallery')} 
              className={`flex-1 min-w-[70px] py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1 ${activeTab === 'gallery' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400'}`}
            >
              <LayoutGrid size={14} /> 특전
            </button>
            <button 
              onClick={() => setActiveTab('favorite')} 
              className={`flex-1 min-w-[70px] py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1 ${activeTab === 'favorite' ? 'bg-[#86A5DC] text-white shadow-md' : 'text-gray-400'}`}
            >
              <Heart size={14} fill={activeTab === 'favorite' ? "white" : "none"} /> 찜 ({favorites.length})
            </button>
          </div>
        </div>

        <div className="flex-1 px-6 pt-4 pb-6 overflow-y-auto bg-gray-50/50 custom-scrollbar">
          {activeTab === 'info' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                 {/* 상단 텍스트 "옆으로 넘겨보기" 적용 */}
                 <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 font-bold text-sm text-gray-800 flex justify-between items-center">
                    <span>💝 공구 특전</span>
                    <span className="text-[10px] text-[#86A5DC] font-bold animate-pulse">옆으로 넘겨보기 →</span>
                 </div>
                 
                 {/* 이미지 슬라이더 영역 */}
                 <div className="relative group">
                    {/* 비율을 정방형(aspect-square)으로 변경 */}
                    <div className="aspect-square bg-gray-100 overflow-hidden">
                      <img 
                        src={ALBUM_INFO.infoImages[currentImgIdx]} 
                        alt={`Info ${currentImgIdx + 1}`} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    {/* 이전 버튼 */}
                    <button 
                      onClick={prevSlide}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 rounded-full shadow-md text-gray-800 hover:bg-white active:scale-95 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    
                    {/* 다음 버튼 */}
                    <button 
                      onClick={nextSlide}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 rounded-full shadow-md text-gray-800 hover:bg-white active:scale-95 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight size={20} />
                    </button>

                    {/* 하단 점(Indicator) */}
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

              {/* 정렬을 왼쪽(text-left)으로 복구 */}
              <p className="text-left text-[11px] text-gray-400 font-medium px-4">
                * 공구 정보는 실시간으로 업데이트됩니다.
              </p>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 font-bold text-sm text-gray-800 flex justify-between items-center">
                  <span>💰 상세 가격 비교</span>
                  {/* 텍스트 변경: 옆으로 넘겨보기 → */}
                  <span className="text-[10px] text-[#86A5DC] font-bold animate-pulse">옆으로 넘겨보기 →</span>
                </div>
                <div className="overflow-x-auto pb-3 custom-scrollbar">
                  <table className="w-full text-[11px] text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="bg-gray-100 text-gray-500 border-b border-gray-200">
                        <th className="p-3 font-bold bg-gray-50 sticky left-0 z-10 border-r border-gray-200 w-24 whitespace-nowrap">구분</th>
                        {SHOPS_DATA.map(shop => (
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
                          {SHOPS_DATA.map(shop => {
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
                {SHOPS_DATA.map(shop => (
                  <ShopCard 
                    key={shop.id}
                    elementId={`shop-${shop.id}`} // 스크롤 이동을 위한 ID
                    shop={shop} 
                    isFavorite={favorites.includes(shop.id)} 
                    toggleFavorite={toggleFavorite}
                    isHighlighted={targetShopId === shop.id} // 타겟일 때 강조 효과
                  />
                ))}
            </div>
          )}

          {/* 특전 모아보기 갤러리 탭 */}
          {activeTab === 'gallery' && (
            <div className="grid grid-cols-2 gap-3 animate-in slide-in-from-bottom-2 duration-300">
              {SHOPS_DATA.map(shop => (
                <GalleryCard 
                  key={shop.id} 
                  shop={shop} 
                  onNavigate={handleNavigateToList} // 리스트 이동 함수 전달
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
          © 2026 피치 @__I2I4
        </div>
      </div>
    </div>
  );
}