import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Map, LineChart, Search, Users, Settings, LogOut, 
  Bell, User
} from 'lucide-react';
import { getJobs } from './api/axiosClient';

const CircularProgress = ({ value, color = "text-teal-400" }) => {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg className="transform -rotate-90 w-12 h-12">
        <circle cx="24" cy="24" r={radius} stroke="currentColor" strokeWidth="3" fill="transparent" className="text-gray-700" />
        <circle cx="24" cy="24" r={radius} stroke="currentColor" strokeWidth="3" fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={`${color} transition-all duration-1000 ease-out`} />
      </svg>
      <span className="absolute text-[10px] font-bold text-white">{value}%</span>
    </div>
  );
};

export default function App() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getJobs().then(data => {
      if (data && data.length > 0) {
        // Map the backend data to our specific UI structure
        const mappedJobs = data.map((job, idx) => ({
          id: job.id,
          companyName: job.companyName,
          jobTitle: job.jobTitle,
          matchScore: job.matchScore,
          requiredSkills: job.requiredSkills.slice(0, 3) || [],
          applicationLink: job.applicationLink,
          color: idx === 0 ? 'text-teal-400' : (idx === 1 ? 'text-purple-400' : 'text-gray-300'),
          button: idx === 0 ? 'APPLY NOW' : 'VIEW MATCH'
        }));
        setJobs(mappedJobs);
      } else {
        // Fallback dummy data if Database is empty
        setJobs([
          { id: '1', companyName: 'Neural Systems', jobTitle: 'LLM Engineer', matchScore: 94, requiredSkills: ['LLMS', 'PYTHON'], color: 'text-teal-400', button: 'APPLY NOW' },
          { id: '2', companyName: 'Vortex Tech', jobTitle: 'Systems Intern', matchScore: 88, requiredSkills: ['RUST', 'PYTORCH'], color: 'text-purple-400', button: 'VIEW MATCH' },
          { id: '3', companyName: 'AquaGen AI', jobTitle: 'DevOps', matchScore: 72, requiredSkills: ['KUBERNETES'], color: 'text-gray-300', button: 'VIEW MATCH' }
        ]);
      }
    });
  }, []);

  return (
    <div className="flex h-screen bg-[#111115] text-white font-sans overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#18181c] border-r border-[#26262a] flex flex-col pt-8 pb-6 shadow-2xl z-10 shrink-0">
        <div className="px-6 mb-12">
          <h1 className="text-lg font-bold tracking-wider text-purple-200">KINETIC ORACLE</h1>
          <p className="text-[9px] text-gray-500 tracking-widest mt-1 uppercase">Agentic Matchmaker v2.4</p>
        </div>

        <nav className="flex-1 space-y-2">
          <a href="#" className="flex items-center gap-4 px-6 py-3 bg-white/5 border-l-[3px] border-[#c58fff] text-purple-100">
            <LayoutDashboard size={18} className="text-[#c58fff]" /> <span className="text-xs font-semibold tracking-wide">DASHBOARD</span>
          </a>
          <a href="#" className="flex items-center gap-4 px-6 py-3 text-gray-500 hover:text-gray-300 transition-colors">
            <Map size={18} /> <span className="text-xs font-semibold tracking-wide">CAREER PATH</span>
          </a>
          <a href="#" className="flex items-center gap-4 px-6 py-3 text-gray-500 hover:text-gray-300 transition-colors">
            <LineChart size={18} /> <span className="text-xs font-semibold tracking-wide">MARKET INTELLIGENCE</span>
          </a>
          <a href="#" className="flex items-center gap-4 px-6 py-3 text-gray-500 hover:text-gray-300 transition-colors">
            <Settings size={18} /> <span className="text-xs font-semibold tracking-wide">AGENTIC SEARCH</span>
          </a>
          <a href="#" className="flex items-center gap-4 px-6 py-3 text-gray-500 hover:text-gray-300 transition-colors">
            <Users size={18} /> <span className="text-xs font-semibold tracking-wide">NETWORK</span>
          </a>
        </nav>

        <div className="mt-auto space-y-2">
          <a href="#" className="flex items-center gap-4 px-6 py-3 text-gray-500 hover:text-gray-300 transition-colors">
            <Settings size={18} /> <span className="text-xs font-semibold tracking-wide">SETTINGS</span>
          </a>
          <a href="#" className="flex items-center gap-4 px-6 py-3 text-gray-500 hover:text-gray-300 transition-colors">
            <LogOut size={18} /> <span className="text-xs font-semibold tracking-wide">SIGN OUT</span>
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#111115]">
        
        {/* Topbar */}
        <header className="h-[76px] border-b border-[#26262a] bg-[#141418] flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-10">
            <h2 className="text-lg font-semibold text-white tracking-wide">Unified Command Center</h2>
            <nav className="hidden md:flex gap-8 relative top-[1px]">
              <a href="#" className="text-purple-300 border-b-2 border-[#c58fff] pb-[25px] pt-[26px] text-sm font-semibold">Dashboard</a>
              <a href="#" className="text-gray-400 hover:text-white pb-[25px] pt-[26px] text-sm font-semibold transition-colors">Analytics</a>
              <a href="#" className="text-gray-400 hover:text-white pb-[25px] pt-[26px] text-sm font-semibold transition-colors">Strategy</a>
            </nav>
          </div>
          
          <div className="flex items-center gap-5">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                <input 
                  type="text" 
                  placeholder="Search matches..." 
                  className="bg-[#18181c] border border-gray-800 text-xs rounded-md pl-9 pr-4 py-2.5 text-white focus:outline-none focus:border-purple-400 w-56 transition-colors placeholder-gray-500" 
                />
             </div>
             <Bell className="text-gray-400 hover:text-white cursor-pointer" size={18} />
             <Settings className="text-gray-400 hover:text-white cursor-pointer" size={18} />
             <div className="w-8 h-8 bg-teal-900 rounded-md flex items-center justify-center border border-teal-700 ml-2">
               <User className="text-teal-200" size={16} />
             </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-[#19191d] rounded-xl p-6 border border-[#26262a]">
                <h3 className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-3 text-center sm:text-left">Opportunities Found Today</h3>
                <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                  <span className="text-3xl font-bold text-white tracking-tight">1,284</span>
                  <span className="text-[10px] font-bold text-teal-400">+12.4%</span>
                </div>
            </div>
            <div className="bg-[#19191d] rounded-xl p-6 border border-[#26262a]">
                <h3 className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-3 text-center sm:text-left">High-Probability Matches</h3>
                <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                  <span className="text-3xl font-bold text-purple-300 tracking-tight">42</span>
                  <span className="text-[10px] font-bold text-gray-500 tracking-wide uppercase">Ready</span>
                </div>
            </div>
            <div className="bg-[#19191d] rounded-xl p-6 border border-[#26262a]">
                <h3 className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-3 text-center sm:text-left">Upcoming Deadlines</h3>
                <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                  <span className="text-3xl font-bold text-white tracking-tight">06</span>
                  <span className="text-[10px] font-bold text-[#f97316] tracking-wide uppercase">Urgent</span>
                </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Column (Main Stats + Terminal) */}
            <div className="flex-1 flex flex-col gap-6">
              
              {/* Match Intelligence Table */}
              <div className="bg-[#19191d] rounded-xl border border-[#26262a] p-6 lg:p-8">
                
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-lg font-semibold tracking-wide">AI Match Intelligence</h3>
                  <button className="text-[10px] font-semibold text-[#c58fff] tracking-widest hover:text-purple-300 uppercase">
                    Global Filters
                  </button>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-[2fr_1fr_2fr_1fr] gap-4 mb-4 text-[9px] uppercase tracking-widest text-[#6c6c75] font-bold px-2 pb-3">
                   <div>Company Entity</div>
                   <div className="text-center">Match Index</div>
                   <div>Req. Domain Skills</div>
                   <div className="text-right pr-2">Action</div>
                </div>

                {/* Table Rows */}
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div key={job.id} className="grid grid-cols-[2fr_1fr_2fr_1fr] gap-4 items-center px-2 py-1">
                      <div className="flex items-center gap-4">
                        <div className="w-9 h-9 rounded bg-[#26262a] border border-[#303036] flex items-center justify-center font-bold text-gray-400 text-sm">
                          {job.companyName.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-semibold tracking-wide text-gray-100">{job.companyName}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{job.jobTitle}</div>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <CircularProgress value={job.matchScore} color={job.color} />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {job.requiredSkills.map(skill => (
                          <span key={skill} className="px-3 py-1.5 text-[9px] font-bold tracking-widest uppercase bg-[#26262a] text-gray-400 rounded-full border border-gray-800">
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-end items-center">
                         <button 
                           onClick={() => window.open(job.applicationLink, '_blank')}
                           className={`px-4 py-2.5 text-[9px] font-extrabold tracking-widest rounded-md uppercase whitespace-nowrap min-w-[100px] text-center transition-colors ${job.button === 'APPLY NOW' ? 'bg-[#c58fff] text-purple-950 hover:bg-[#b07be6]' : 'bg-[#26262a] text-gray-400 hover:text-white border border-[#303036] hover:bg-[#303036]'}`}
                         >
                           {job.button}
                         </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Terminal / Live Agent Status */}
              <div className="bg-[#111114] rounded-xl border border-[#26262a] p-6 font-mono">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,1)]" />
                    <h3 className="text-[10px] tracking-widest text-[#14b8a6] font-bold uppercase">Live Agent Status</h3>
                  </div>
                  <span className="text-[9px] text-[#55555e] font-sans tracking-widest">NODE_SHARD: 08-ALPHA</span>
                </div>
                
                <div className="space-y-2 text-xs">
                  <div className="text-teal-500">&gt; Scraping LinkedIn Jobs...</div>
                  <div className="text-teal-500">&gt; Scoring talent pool (Batch #442)...</div>
                  <div className="text-gray-500 flex items-center gap-2">
                    &gt; Agent #01: Idle <span className="w-1.5 h-3.5 bg-gray-500 animate-pulse block" />
                  </div>
                </div>

                <div className="mt-8 w-64 h-1 bg-[#26262a] overflow-hidden">
                  <div className="h-full bg-teal-500 w-[60%] shadow-[0_0_10px_rgba(20,184,166,0.5)]" />
                </div>
              </div>

            </div>

            {/* Right Column / Team Review */}
            <div className="w-full lg:w-80 flex flex-col shrink-0">
               <div className="bg-[#19191d] rounded-xl border border-[#26262a] p-6 lg:p-7 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold tracking-wide mb-8">Team Review</h3>
                  
                  <div className="space-y-6 flex-1">
                     <div className="flex items-center gap-4">
                       <div className="relative">
                         <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center overflow-hidden border border-orange-300">
                           <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Aman&backgroundColor=ffedd5`} alt="Aman" />
                         </div>
                         <div className="absolute bottom-0 right-0 w-3 h-3 bg-teal-500 border-2 border-[#19191d] rounded-full" />
                       </div>
                       <div className="flex-1">
                         <div className="text-sm font-semibold text-gray-200">Aman K.</div>
                         <div className="text-[9px] text-teal-400 font-bold tracking-widest uppercase mt-0.5">Active</div>
                       </div>
                       <div className="w-5 h-4 bg-gray-700 rounded-sm opacity-50" />
                     </div>

                     <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center overflow-hidden border border-blue-300">
                           <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Akash&style=circle`} alt="Akash" />
                       </div>
                       <div className="flex-1">
                         <div className="text-sm font-semibold text-gray-200">Akash R.</div>
                         <div className="text-[9px] text-gray-500 font-bold tracking-widest uppercase mt-0.5">Away</div>
                       </div>
                       <div className="w-5 h-4 bg-gray-700 rounded-sm opacity-50" />
                     </div>

                     <div className="flex items-center gap-4">
                       <div className="relative">
                         <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center overflow-hidden border border-green-300">
                             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Chetan&top=shortHair`} alt="Chetan" />
                         </div>
                         <div className="absolute bottom-0 right-0 w-3 h-3 bg-teal-500 border-2 border-[#19191d] rounded-full" />
                       </div>
                       <div className="flex-1">
                         <div className="text-sm font-semibold text-gray-200">Chetan S.</div>
                         <div className="text-[9px] text-teal-400 font-bold tracking-widest uppercase mt-0.5">Active</div>
                       </div>
                       <div className="w-5 h-4 bg-gray-700 rounded-sm opacity-50" />
                     </div>
                  </div>

                  <div className="mt-10 border-t border-[#26262a] pt-8">
                    <h4 className="text-[9px] font-bold tracking-widest uppercase text-gray-500 mb-6">Collaborative Activity</h4>
                    
                    <div className="relative pl-5 border-l border-[#26262a] space-y-7">
                       
                       <div className="relative">
                         <div className="absolute -left-[25px] top-1.5 w-2 h-2 rounded-full bg-[#c58fff] ring-[3px] ring-[#19191d]" />
                         <p className="text-xs text-gray-400 leading-relaxed tracking-wide"><strong className="text-gray-200 font-semibold">Aman</strong> approved <span className="text-[#c58fff]">Neural Systems</span> match for final pipeline.</p>
                         <span className="text-[9px] text-gray-600 mt-2 block font-medium">2m ago</span>
                       </div>

                       <div className="relative">
                         <div className="absolute -left-[25px] top-1.5 w-2 h-2 rounded-full bg-[#3f3f46] ring-[3px] ring-[#19191d]" />
                         <p className="text-xs text-gray-400 leading-relaxed tracking-wide"><strong className="text-gray-200 font-semibold">Chetan</strong> left a note on Vortex Tech role requirements.</p>
                         <span className="text-[9px] text-gray-600 mt-2 block font-medium">14m ago</span>
                       </div>

                       <div className="relative">
                         <div className="absolute -left-[25px] top-1.5 w-2 h-2 rounded-full bg-[#3f3f46] ring-[3px] ring-[#19191d]" />
                         <p className="text-xs text-gray-400 leading-relaxed tracking-wide">System auto-filtered 128 irrelevant applications from <strong className="text-gray-200 font-semibold">AquaGen AI</strong>.</p>
                         <span className="text-[9px] text-gray-600 mt-2 block font-medium">1h ago</span>
                       </div>

                    </div>
                  </div>

                  <button className="w-full mt-10 bg-[#26262a] hover:bg-[#303036] text-[#8e8e99] hover:text-gray-200 text-[10px] font-bold tracking-widest uppercase py-4 rounded-xl transition-colors border border-[#303036]">
                    Archive Feed
                  </button>
               </div>
            </div>
          </div>

        </div>
      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-[#c58fff] rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(197,143,255,0.4)] hover:scale-105 transition-transform z-50">
        <Settings className="text-[#4c2d73]" size={22} strokeWidth={2.5} />
      </button>

    </div>
  );
}
