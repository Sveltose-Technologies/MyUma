import React, { useState, useEffect } from "react";
// ✅ FIX 1: यहाँ 'Autocomplete' को 'default' इम्पोर्ट की तरह ट्राई करें
import Autocomplete from "react-google-autocomplete";
import {
  Search,
  MapPin,
  ChevronDown,
  ArrowLeft,
  X,
  Car,
  Bike,
  Briefcase,
} from "lucide-react";
import { getSubCategoriesAPI } from "../services/authService";

const HomeSearchBar = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const [searchState, setSearchState] = useState({
    keyword: "",
    location: "",
    radius: "Radius search",
    category: "All Categories",
  });

  useEffect(() => {
    const loadCats = async () => {
      try {
        const res = await getSubCategoriesAPI();
        if (res.success) {
          setCategoriesData(res.data || []);
        }
      } catch (err) {
        console.error("API Error:", err);
      }
    };
    loadCats();
  }, []);

  const handleSubSelect = (sub) => {
    setSearchState({ ...searchState, category: sub.subcategoryName });
    setIsCatOpen(false);
    setActiveCategory(null);
  };

  return (
    <div className="w-full py-6 flex flex-col items-center justify-center font-sans">
      {/* --- PILL SHAPED SEARCH BAR --- */}
      <div className="w-full max-w-6xl bg-white rounded-full shadow-xl flex flex-col lg:flex-row items-center p-1 border border-gray-200">
        {/* 1. Keyword */}
        <div className="flex-[1.5] w-full px-6 py-2">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="w-full outline-none text-gray-600 text-[14px] bg-transparent"
            onChange={(e) =>
              setSearchState({ ...searchState, keyword: e.target.value })
            }
          />
        </div>

        <div className="hidden lg:block h-8 w-[1px] bg-gray-200"></div>

        {/* 2. Location (Google API) */}
        <div className="flex-1 w-full px-6 py-2 flex items-center justify-between">
          {/* ✅ FIX 2: Autocomplete के लिए undefined चेक */}
          {Autocomplete ? (
            <Autocomplete
              apiKey="YOUR_GOOGLE_MAPS_API_KEY" // अपना असली API की डालें
              onPlaceSelected={(place) =>
                setSearchState({
                  ...searchState,
                  location: place.formatted_address,
                })
              }
              options={{ types: ["(regions)"] }}
              placeholder="Location"
              className="w-full outline-none text-gray-600 text-[14px] bg-transparent"
            />
          ) : (
            <input
              placeholder="Location"
              className="w-full outline-none text-gray-600 text-[14px]"
              onChange={(e) =>
                setSearchState({ ...searchState, location: e.target.value })
              }
            />
          )}
          <MapPin size={16} className="text-gray-400" />
        </div>

        <div className="hidden lg:block h-8 w-[1px] bg-gray-200"></div>

        {/* 3. Radius */}
        <div className="flex-1 w-full px-6 py-2 flex items-center justify-between">
          <select
            className="w-full outline-none text-gray-600 text-[14px] bg-transparent appearance-none cursor-pointer"
            onChange={(e) =>
              setSearchState({ ...searchState, radius: e.target.value })
            }>
            <option>Radius search</option>
            <option>10 km</option>
            <option>50 km</option>
          </select>
          <ChevronDown size={16} className="text-gray-400" />
        </div>

        <div className="hidden lg:block h-8 w-[1px] bg-gray-200"></div>

        {/* 4. Category */}
        <div className="relative flex-1 w-full px-6 py-2">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setIsCatOpen(!isCatOpen)}>
            <span className="text-gray-700 text-[14px] font-medium truncate">
              {searchState.category}
            </span>
            <ChevronDown size={16} className="text-gray-400" />
          </div>

          {isCatOpen && (
            <div className="absolute top-full left-0 mt-4 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 z-[999] overflow-hidden text-left">
              {!activeCategory ? (
                <div className="max-h-[350px] overflow-y-auto">
                  <div className="p-3 bg-gray-50 border-b flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    All Categories
                    <X
                      size={14}
                      className="cursor-pointer"
                      onClick={() => setIsCatOpen(false)}
                    />
                  </div>
                  {categoriesData.map((item) => (
                    <div
                      key={item.categoryId?._id || item._id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveCategory(item);
                      }}
                      className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0">
                      <span className="text-gray-700 text-sm">
                        {item.categoryId?.name}
                      </span>
                      <ChevronDown
                        size={16}
                        className="-rotate-90 text-gray-300"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="max-h-[350px] overflow-y-auto">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCategory(null);
                    }}
                    className="p-3 bg-[#ff1f4b] text-white flex items-center gap-2 cursor-pointer font-semibold text-sm">
                    <ArrowLeft size={16} /> Back
                  </div>
                  <div className="p-3 bg-gray-100 text-[10px] font-bold text-gray-500 uppercase">
                    {activeCategory.categoryId?.name}
                  </div>
                  {activeCategory.subcategories?.map((sub) => (
                    <div
                      key={sub._id}
                      onClick={() => handleSubSelect(sub)}
                      className="px-8 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 text-gray-600 text-sm">
                      {sub.subcategoryName}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 5. Search Button */}
        <button className="bg-[#ff1f4b] hover:bg-red-600 text-white px-10 py-3.5 rounded-full font-bold text-[16px] transition-all m-1 shadow-lg shadow-red-200">
          Search
        </button>
      </div>

      {/* --- FEATURED CATEGORIES --- */}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 text-white cursor-pointer hover:bg-white/30 transition-all">
          <Car size={16} />
          <span className="text-xs font-bold uppercase tracking-wider">
            Cars
          </span>
        </div>
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 text-white cursor-pointer hover:bg-white/30 transition-all">
          <Bike size={16} />
          <span className="text-xs font-bold uppercase tracking-wider">
            Bikes
          </span>
        </div>
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 text-white cursor-pointer hover:bg-white/30 transition-all">
          <Briefcase size={16} />
          <span className="text-xs font-bold uppercase tracking-wider">
            Business
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomeSearchBar;
