import { useEffect, useRef, useState } from "react";
import { Search, Bell, ChevronLeft, ChevronRight } from "lucide-react";
import WelcomeBg from '../assets/WelcomeBg.svg';
import { useNavigate } from "react-router-dom";
import api from '../utils/axios';
import ProfileSettings from "./ProfileSettings";
import img8 from '../assets/img8.png';
import img9 from '../assets/img9.avif';
import Logo from '../assets/Logo.png'

export default function Dashboard() {
  const [user, setUser] = useState({ firstName: "", lastName: "" });
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(0); // 0 for profile, 1 for AI courses
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState('right'); // 'left' or 'right'
  const [showCard, setShowCard] = useState(0); // which card is currently visible (for animation)
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Fetch user info from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user);
      } catch (err) {
        console.error("Error fetching user:", err);
        if (err.code === 'ERR_NETWORK') {
          // Handle connection refused error
          console.error("Cannot connect to server. Please check if the server is running.");
        }
        setUser({ firstName: "R", lastName: "J" });
      }
    };
    fetchUser();
  }, []);

  // Click outside handler for mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Helper to get initials
  const getInitials = () => {
    const { firstName, lastName } = user;
    if (!firstName && !lastName) return "U"; // U for User
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  };

  // Handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/search", { query: search });
      setSearchResult(`You searched for: ${search}`);
      setSearch("");
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  // Scroll to profile section
  const scrollToProfile = () => {
    if (profileRef.current) {
      profileRef.current.scrollIntoView({ behavior: "smooth" });
    }
    // Close mobile menu if open
    setIsMobileMenuOpen(false);
  };

  // Handle logout (example: clear token and reload)
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
    

  };

  // Animation handler
  const handleCardNavigation = (dir) => {
    if (animating) return;
    setDirection(dir === 'next' ? 'right' : 'left');
    setAnimating(true);
    setTimeout(() => {
      setActiveCard(prev => (prev === 0 ? 1 : 0));
      setShowCard(prev => (prev === 0 ? 1 : 0));
      setAnimating(false);
    }, 500); // match animation duration
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Header */}
      <header className="flex items-center p-3 md:p-6 justify-between mb-4 md:mb-10 bg-white shadow-sm">
        {/* Left: CodeEternity Branding */}
        <div className="p-1 rounded-full">
         
          <img className="h-10" src={Logo} ></img>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="block md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu-container absolute top-16 right-0 left-0 bg-white shadow-md z-50 md:hidden">
            <nav className="p-4">
              <ul className="space-y-4">
                <li className="flex items-center cursor-pointer" onClick={() => { navigate("/"); setIsMobileMenuOpen(false); }}>
                  <div className="bg-gray-100 p-1 rounded-full mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  </div>
                  <span className="text-gray-800">Home</span>
                </li>
                <li className="flex items-center cursor-pointer" onClick={scrollToProfile}>
                  <div className="p-1 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                      <path d="M2 12h20"></path>
                    </svg>
                  </div>
                  <span className="text-gray-500">Profile</span>
                </li>
                <li>
                  <form onSubmit={handleSearch} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      placeholder="Search"
                      className="bg-gray-200 rounded-full px-4 py-2 text-gray-700 focus:outline-none w-full"
                    />
                    <button type="submit" className="p-2">
                      <Search className="h-4 w-4 text-gray-500" />
                    </button>
                  </form>
                </li>
              
              </ul>
            </nav>
          </div>
        )}
        
        {/* Desktop Navigation */}
        <div className="hidden  md:flex items-center space-x-4">
          <nav className="bg-white rounded-full px-4 py-2 shadow-sm">
            <ul className="flex items-center space-x-6">
              <li className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
                <div className="bg-gray-100 p-1 rounded-full mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </div>
                <span className="text-gray-800">Home</span>
              </li>
              <li className="flex items-center cursor-pointer" onClick={scrollToProfile}>
                <div className="p-1 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                    <path d="M2 12h20"></path>
                  </svg>
                </div>
                <span className="text-gray-500 hidden lg:inline">Updates Profile</span>
                <span className="text-gray-500 lg:hidden">Profile</span>
              </li>
            </ul>
          </nav>
          <form onSubmit={handleSearch} className="flex items-center space-x-2">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search"
              className="bg-gray-200 rounded-full px-4 py-2 text-gray-700 focus:outline-none w-24 lg:w-auto"
            />
            <button type="submit" className="p-2">
              <Search className="h-4 w-4 text-gray-500" />
            </button>
          </form>
          <button className="p-2" title="Notifications">
            <Bell className="h-5 w-5 text-gray-500" />
          </button>
          {/* Profile Icon with hover menu */}
          <div
            className="relative"
            onMouseEnter={() => setShowProfileMenu(true)}
            onMouseLeave={() => setShowProfileMenu(false)}
          >
            <button
              className="bg-blue-100 text-blue-800 font-medium rounded-full w-8 h-8 flex items-center justify-center text-lg focus:outline-none"
              title="Profile"
            >
              {getInitials()}
            </button>
           
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-3 md:p-6">
        <div className="mb-4 md:mb-6">
          <h1 className="text-xl md:text-3xl font-bold text-gray-800 flex items-center">Hey, {user.firstName || "Rahul"} <span className="ml-2">👋</span></h1>
        </div>

        {/* Carousel Cards with animated transition */}
        <div className="relative mb-6 md:mb-8 min-h-[200px] md:min-h-[200px] overflow-x-hidden">
          {/* Profile Completion Card */}
          <div className={`absolute inset-0 transition-all duration-500 ease-in-out z-10
            ${showCard === 0 && !animating ? 'opacity-100 translate-x-0 pointer-events-auto' : ''}
            ${animating && direction === 'right' && showCard === 0 ? 'opacity-0 -translate-x-32 pointer-events-none' : ''}
            ${animating && direction === 'left' && showCard === 0 ? 'opacity-0 translate-x-32 pointer-events-none' : ''}
            ${showCard === 1 && !animating ? 'hidden' : ''}
          `}>
            <div className="bg-purple-300 rounded-xl p-4 md:p-8 relative overflow-hidden h-full">
              <div className="hidden md:block">
                <img
                  src={img8}
                  alt="Background Pattern"
                  className="absolute right-5 z-30 top-0 h-full max-h-48 object-contain w-auto opacity-100 pointer-events-none"
                />
              </div>
              <div className="flex flex-col md:flex-row relative z-10">
                <div className="w-full md:w-1/2 pr-0 md:pr-4 mb-4 md:mb-0">
                  <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2">Complete your CodeEternity profile</h2>
                  <p className="text-sm md:text-base text-gray-700 mb-4 md:mb-6">
                    Build a strong profile by adding your skills, experience, resume, and links to GitHub or LinkedIn. Make it easier for recruiters to discover your potential.
                  </p>
                  <button className="bg-gray-900 text-white px-3 py-1 md:px-4 md:py-2 rounded-md font-medium text-sm md:text-base">Complete Now</button>
                </div>
                <div className="w-full md:w-1/2 relative min-h-24">
                  <div className="md:absolute right-0 bottom-0 mt-2 md:mt-0">
                    <img 
                      src={img8} 
                      alt="Profile completion" 
                      className="block md:hidden w-full max-h-32 object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* AI Courses Card */}
          <div className={`absolute inset-0 transition-all duration-500 ease-in-out z-10
            ${showCard === 1 && !animating ? 'opacity-100 translate-x-0 pointer-events-auto' : ''}
            ${animating && direction === 'right' && showCard === 1 ? 'opacity-0 translate-x-32 pointer-events-none' : ''}
            ${animating && direction === 'left' && showCard === 1 ? 'opacity-0 -translate-x-32 pointer-events-none' : ''}
            ${showCard === 0 && !animating ? 'hidden' : ''}
          `}>
            <div className="bg-orange-100 rounded-xl p-4 md:p-8 relative overflow-hidden h-full">
              <div className="hidden md:block">
                <img
                  src={img9}
                  alt="AI Courses Background"
                  className="absolute right-5 top-1 scale-105 h-full max-h-48 object-cover w-auto opacity-100 pointer-events-none"
                />
              </div>
              <div className="flex flex-col md:flex-row relative z-10">
                <div className="w-full md:w-1/2 pr-0 md:pr-4 mb-4 md:mb-0">
                  <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2">Explore your potential with our AI-powered course</h2>
                  <p className="text-sm md:text-base text-gray-700 mb-4 md:mb-6">
                    Take the first step toward changing the world with technology. Let CodeEternity guide your journey into the world of Artificial Intelligence.
                  </p>
                  <button className="bg-gray-900 text-white px-3 py-1 md:px-4 md:py-2 rounded-md font-medium text-sm md:text-base">Start Learning Now</button>
                </div>
                <div className="w-full md:w-1/2 relative min-h-24">
                  <div className="md:absolute right-0 bottom-0 mt-2 md:mt-0">
                    <img 
                      src={img9} 
                      alt="AI Courses" 
                      className="block md:hidden w-full max-h-32 object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Navigation Buttons */}
          <div className="absolute bottom-2 md:bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 z-30">
            <button 
              onClick={() => handleCardNavigation('prev')}
              className="bg-white rounded-full p-1 shadow-sm hover:bg-gray-100 transition-colors"
              disabled={animating}
            >
              <ChevronLeft className="h-3 w-3 md:h-4 md:w-4" />
            </button>
            <div className="flex space-x-1">
              <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${activeCard === 0 ? 'bg-gray-800' : 'bg-gray-300'}`}></div>
              <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${activeCard === 1 ? 'bg-gray-800' : 'bg-gray-300'}`}></div>
            </div>
            <button 
              onClick={() => handleCardNavigation('next')}
              className="bg-white rounded-full p-1 shadow-sm hover:bg-gray-100 transition-colors"
              disabled={animating}
            >
              <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
            </button>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Welcome Card */}
          <div className="bg-orange-100 rounded-xl p-4 md:p-6 relative overflow-hidden">
            {/* SVG Background */}
            <img
              src={WelcomeBg}
              alt="Welcome Background"
              className="absolute inset-0 w-full  object-cover opacity-100 pointer-events-none"
              style={{ zIndex: 0 }}
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 opacity-10">
              <div className="absolute top-10 left-10 w-6 h-6 md:w-8 md:h-8 rounded-full bg-yellow-300"></div>
              <div className="absolute top-20 right-20 w-4 h-4 md:w-6 md:h-6 rounded-full bg-blue-300"></div>
              <div className="absolute bottom-10 left-20 w-3 h-3 md:w-4 md:h-4 rounded-full bg-purple-300"></div>
              <div className="absolute bottom-20 right-10 w-4 h-4 md:w-5 md:h-5 rounded-full bg-pink-300"></div>
            </div>
            <div className="mb-3 md:mb-4 flex items-center relative z-10">
              <div className="font-bold text-lg md:text-xl mr-2">CE</div>
              <h2 className="text-base md:text-lg font-medium text-gray-800">Welcome to CodeEternity</h2>
            </div>
            <p className="text-sm md:text-base text-gray-700 mb-3 md:mb-4 relative z-10">
              Here you can track your learning journey, update your skills, and connect with companies actively hiring. Whether you're building a project or applying for a job, we've got you covered!
            </p>
            <p className="text-sm md:text-base text-gray-700 relative z-10">
              <span className="font-medium">Need help?</span> Reach out to our support team or your personal mentor.
            </p>
          </div>

          {/* Getting Started Card */}
          <div className="bg-[#fffbf4] shadow-lg rounded-xl p-4 md:p-6">
            <div className="flex items-center mb-3 md:mb-4">
              <div className="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 md:w-5 md:h-5">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
              </div>
              <h2 className="text-base md:text-lg font-medium text-gray-800">Getting Started</h2>
            </div>

            <ul className="text-sm md:text-base text-gray-700 list-disc list-inside">
              <li>Complete your profile with all required details</li>
              <li>Upload resume, GitHub, and LinkedIn</li>
              <li>Start applying to curated job listings</li>
            </ul>
          </div>
        </div>
        
        {/* Search result display */}
        {searchResult && (
          <div className="mt-4 md:mt-6 text-center text-purple-700 font-semibold text-sm md:text-base">{searchResult}</div>
        )}
      </main>
      
      {/* Profile Settings Section */}
      <div ref={profileRef} className="mt-8 md:mt-12 w-full">
        <ProfileSettings />
      </div>
    </div>
  );
}