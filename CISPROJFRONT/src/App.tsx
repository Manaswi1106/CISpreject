import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { 
  Shield, 
  Lock, 
  Upload, 
  Activity, 
  ChevronDown, 
  Server, 
  Database, 
  User, 
  AlertTriangle, 
  CheckCircle2, 
  Menu, 
  X,
  ShieldAlert,
  History,
  Terminal,
  LayoutDashboard,
  Zap,
  BarChart3,
  ChevronRight
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

// --- Types ---

type WAFLog = {
  id: string;
  timestamp: string;
  type: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  source: string;
  action: "Blocked" | "Flagged";
  details: string;
};

type WAFStats = {
  totalBlocks: number;
  criticalThreats: number;
  activeRules: number;
  uptime: string;
};

// --- Components ---

const Navbar = ({ onGetStarted }: { onGetStarted: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "glass py-4" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
            <Shield size={22} />
          </div>
          <span className={`text-xl font-bold tracking-tight ${isScrolled ? "text-slate-900" : "text-white"}`}>SecureAssign</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {["About", "Features", "How it Works", "Security"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className={`text-sm font-semibold transition-colors hover:text-blue-500 ${isScrolled ? "text-slate-600" : "text-white/80"}`}
            >
              {item}
            </a>
          ))}
          <button 
            onClick={onGetStarted}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20"
          >
            Get Started
          </button>
        </div>

        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className={isScrolled ? "text-slate-900" : "text-white"} /> : <Menu className={isScrolled ? "text-slate-900" : "text-white"} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {["About", "Features", "How it Works", "Security"].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-lg font-bold text-slate-900"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onGetStarted();
                }}
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/20"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onGetStarted }: { onGetStarted: () => void }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Animated Background */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-purple-600/10 rounded-full blur-[80px]" />
      </motion.div>

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block px-4 py-1.5 mb-8 text-sm font-bold tracking-widest text-blue-400 uppercase bg-blue-400/10 rounded-full border border-blue-400/20">
            Academic Integrity • Cybersecurity • WAF
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter mb-10 leading-[0.9]">
            Secure <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Assignment</span> <br />
            System
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            The next generation of academic management. Protected by enterprise-grade WAF technology to ensure every submission is safe and verified.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.button
              onClick={onGetStarted}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-2xl shadow-blue-600/40 w-full sm:w-auto text-lg"
            >
              Get Started
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all border border-white/10 w-full sm:w-auto text-lg backdrop-blur-sm"
            >
              Watch Demo
            </motion.button>
          </div>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll to explore</span>
        <ChevronDown size={24} />
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="section-container bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-[3rem] bg-slate-100 overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000" 
              alt="Cybersecurity" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="absolute -bottom-10 -right-10 glass p-8 rounded-[2rem] shadow-2xl max-w-[280px]"
          >
            <div className="flex items-center gap-5 mb-4">
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                <Shield size={28} />
              </div>
              <div>
                <p className="text-lg font-black text-slate-900 leading-none">WAF v3.0</p>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mt-1">Active Shield</p>
              </div>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              Real-time traffic analysis and threat mitigation engine active.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tight">
            Fortifying the <br />
            <span className="text-blue-600">Future of Learning</span>
          </h2>
          <p className="text-xl text-slate-500 mb-10 leading-relaxed font-medium">
            Our system isn't just a portal; it's a fortress. By integrating a multi-layered Web Application Firewall, we protect the entire academic lifecycle from submission to evaluation.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "SQLi Filtering", desc: "Advanced database protection" },
              { title: "XSS Prevention", desc: "Script injection blocking" },
              { title: "DDoS Shield", desc: "High-availability infrastructure" },
              { title: "Payload Scan", desc: "Deep file inspection" }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0 mt-1">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{item.title}</h4>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      title: "Secure Login",
      desc: "Multi-factor authentication with behavioral analysis to prevent unauthorized access.",
      icon: <Lock className="text-blue-600" />,
      color: "bg-blue-50"
    },
    {
      title: "File Validation",
      desc: "Deep packet inspection for all uploads, ensuring no malicious code enters the system.",
      icon: <Upload className="text-indigo-600" />,
      color: "bg-indigo-50"
    },
    {
      title: "WAF Protection",
      desc: "Custom-tuned rulesets that evolve with emerging web threats and vulnerabilities.",
      icon: <Shield className="text-purple-600" />,
      color: "bg-purple-50"
    },
    {
      title: "Attack Detection",
      desc: "Real-time anomaly detection that identifies suspicious patterns instantly.",
      icon: <Activity className="text-rose-600" />,
      color: "bg-rose-50"
    }
  ];

  return (
    <section id="features" className="section-container bg-slate-50">
      <div className="text-center mb-24">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight"
        >
          Uncompromising Security
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-slate-500 max-w-3xl mx-auto font-medium"
        >
          We've built a comprehensive security stack that works silently in the background, keeping your data safe without compromising performance.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -15 }}
            className="glass p-10 rounded-[2.5rem] hover:shadow-3xl transition-all duration-500 group"
          >
            <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
              {feature.icon}
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{feature.title}</h3>
            <p className="text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const DashboardPreview = () => {
  return (
    <section className="section-container bg-white overflow-hidden">
      <div className="text-center mb-20">
        <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">Seamless Experience</h2>
        <p className="text-xl text-slate-500 font-medium">Powerful tools for students, wrapped in a beautiful interface.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 100 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-6xl mx-auto"
      >
        <div className="glass rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-slate-200">
          {/* Mock UI Header */}
          <div className="h-20 bg-slate-50/50 border-b border-slate-200 flex items-center px-10 justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                <Shield size={20} />
              </div>
              <span className="font-black text-xl text-slate-900 tracking-tight">StudentPortal</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden sm:flex items-center gap-3">
                <div className="w-32 h-2.5 bg-slate-200 rounded-full" />
                <div className="w-10 h-10 bg-slate-200 rounded-full" />
              </div>
              <Menu size={24} className="text-slate-400" />
            </div>
          </div>
          
          {/* Mock UI Content */}
          <div className="p-12 bg-white grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              <div className="h-56 bg-slate-50 rounded-[2rem] border border-slate-100 p-8">
                <div className="w-1/4 h-5 bg-slate-200 rounded-full mb-6" />
                <div className="space-y-3">
                  <div className="w-full h-3 bg-slate-100 rounded-full" />
                  <div className="w-full h-3 bg-slate-100 rounded-full" />
                  <div className="w-2/3 h-3 bg-slate-100 rounded-full" />
                </div>
                <div className="mt-10 flex gap-4">
                  <div className="w-32 h-10 bg-blue-600/10 rounded-xl" />
                  <div className="w-32 h-10 bg-slate-200 rounded-xl" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="h-40 bg-blue-50 rounded-[2rem] border border-blue-100 p-8 flex flex-col justify-between">
                  <div className="w-1/2 h-4 bg-blue-200 rounded-full" />
                  <div className="text-4xl font-black text-blue-600">128</div>
                </div>
                <div className="h-40 bg-indigo-50 rounded-[2rem] border border-indigo-100 p-8 flex flex-col justify-between">
                  <div className="w-1/2 h-4 bg-indigo-200 rounded-full" />
                  <div className="text-4xl font-black text-indigo-600">99.9%</div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-full bg-slate-50 rounded-[2rem] border border-slate-100 p-8">
                <div className="w-1/2 h-5 bg-slate-200 rounded-full mb-10" />
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-white rounded-2xl border border-slate-100 shadow-sm" />
                    <div className="flex-1">
                      <div className="w-full h-3 bg-slate-200 rounded-full mb-2" />
                      <div className="w-1/2 h-2 bg-slate-100 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-400/10 rounded-full blur-[100px] -z-10" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-indigo-400/10 rounded-full blur-[100px] -z-10" />
      </motion.div>
    </section>
  );
};

const WAFSecurity = () => {
  const [securityLevel, setSecurityLevel] = useState(92);
  const [attacks, setAttacks] = useState([
    { id: 1, type: "SQL Injection", time: "14:22:01", status: "Blocked" },
    { id: 2, type: "XSS Attempt", time: "14:25:44", status: "Blocked" },
    { id: 3, type: "Path Traversal", time: "14:31:12", status: "Blocked" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecurityLevel(prev => {
        const change = Math.random() * 2 - 1;
        return Math.min(Math.max(prev + change, 90), 99);
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="security" className="section-container bg-slate-950 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[1] tracking-tight">WAF Security <br />Intelligence</h2>
          <p className="text-xl text-slate-400 mb-12 leading-relaxed font-medium">
            Our Web Application Firewall is the first line of defense. It inspects every incoming packet, filtering out malicious intent before it ever touches our servers.
          </p>
          
          <div className="space-y-10">
            <div>
              <div className="flex justify-between mb-4">
                <span className="text-xs font-black text-slate-500 uppercase tracking-[0.3em]">System Integrity Index</span>
                <span className="text-lg font-black text-blue-400">{securityLevel.toFixed(1)}%</span>
              </div>
              <div className="h-4 bg-white/5 rounded-full overflow-hidden p-1 border border-white/10">
                <motion.div 
                  animate={{ width: `${securityLevel}%` }}
                  className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              {[
                { label: "Requests/s", val: "4.2k", color: "text-white" },
                { label: "Breaches", val: "0", color: "text-green-400" },
                { label: "Threats", val: "842", color: "text-rose-400" }
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center backdrop-blur-sm">
                  <div className={`text-3xl font-black ${stat.color} tracking-tight`}>{stat.val}</div>
                  <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-slate-900 border border-white/10 rounded-[3rem] overflow-hidden shadow-3xl relative"
        >
          <div className="p-8 border-b border-white/10 flex items-center justify-between bg-white/5">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-rose-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(244,63,94,0.5)]" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Live Threat Feed</span>
            </div>
            <Activity size={20} className="text-blue-400" />
          </div>
          <div className="p-8 space-y-5 min-h-[400px]">
            {attacks.map((attack) => (
              <motion.div 
                key={attack.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500">
                    <AlertTriangle size={24} />
                  </div>
                  <div>
                    <div className="text-lg font-bold tracking-tight">{attack.type}</div>
                    <div className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-0.5">{attack.time}</div>
                  </div>
                </div>
                <div className="px-4 py-1.5 bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-green-500/20">
                  {attack.status}
                </div>
              </motion.div>
            ))}
            
            {/* Mock log lines */}
            <div className="pt-6 space-y-2 opacity-30 font-mono text-[10px]">
              <div className="text-blue-400">INFO: Analyzing packet header from 192.168.1.44...</div>
              <div className="text-slate-500">DEBUG: Payload signature matches SQLi-v2.4 pattern.</div>
              <div className="text-rose-400">WARN: Dropping connection from 192.168.1.44.</div>
              <div className="text-green-400">SUCCESS: Firewall rules updated successfully.</div>
            </div>
          </div>
          <div className="p-8 bg-blue-600/10 text-center border-t border-white/5">
            <span className="text-xs font-black text-blue-400 uppercase tracking-[0.3em]">WAF Engine: Active Shield v3.0</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    { icon: <User size={32} />, label: "User Request", desc: "Student initiates a login or assignment upload request." },
    { icon: <Shield size={32} />, label: "WAF Layer", desc: "Our firewall inspects the request for malicious patterns." },
    { icon: <Server size={32} />, label: "Secure Backend", desc: "Validated requests are processed by our hardened servers." },
    { icon: <Database size={32} />, label: "Encrypted DB", desc: "Data is stored with military-grade encryption protocols." },
  ];

  return (
    <section id="how-it-works" className="section-container bg-white">
      <div className="text-center mb-24">
        <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">The Security Flow</h2>
        <p className="text-xl text-slate-500 font-medium">A multi-layered approach to academic data protection.</p>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Connector Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 hidden lg:block" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center group"
            >
              <div className="w-24 h-24 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white mx-auto mb-8 shadow-2xl shadow-blue-600/30 relative group-hover:scale-110 transition-transform duration-500">
                {step.icon}
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center text-sm font-black border-4 border-white shadow-lg">
                  {i + 1}
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{step.label}</h3>
              <p className="text-slate-500 leading-relaxed font-medium">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Simulation = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 6000);
    }, 2500);
  };

  return (
    <section className="section-container bg-slate-50 relative overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="glass p-16 md:p-24 rounded-[4rem] relative z-10 border-slate-200"
        >
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-[1]">Experience the <br />Power of WAF</h2>
          <p className="text-xl text-slate-500 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
            Don't just take our word for it. Simulate a real-world SQL Injection attack and watch how our Web Application Firewall neutralizes the threat instantly.
          </p>
          
          <motion.button
            onClick={handleSimulate}
            disabled={isSimulating}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className={`px-12 py-6 rounded-2xl font-black text-xl transition-all flex items-center gap-4 mx-auto shadow-2xl ${
              isSimulating 
                ? "bg-slate-200 text-slate-400 cursor-not-allowed" 
                : "bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30"
            }`}
          >
            {isSimulating ? (
              <>
                <Activity className="animate-spin" />
                Analyzing Attack...
              </>
            ) : (
              <>
                <AlertTriangle size={24} />
                Simulate SQLi Attack
              </>
            )}
          </motion.button>
        </motion.div>
      </div>

      {/* Alert Popup */}
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ opacity: 0, y: 100, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 100, x: "-50%" }}
            className="fixed bottom-12 left-1/2 z-50 w-full max-w-lg px-6"
          >
            <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-rose-500/30 flex items-start gap-6 backdrop-blur-xl">
              <div className="w-16 h-16 bg-rose-600 rounded-3xl flex items-center justify-center shrink-0 shadow-lg shadow-rose-600/20">
                <Shield size={32} />
              </div>
              <div>
                <h4 className="font-black text-2xl text-rose-400 tracking-tight">Threat Neutralized</h4>
                <p className="text-slate-400 mt-2 leading-relaxed font-medium">
                  WAF detected a malicious SQL Injection payload in the request body. The connection was terminated immediately and the source IP has been blacklisted for 24 hours.
                </p>
                <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  <Activity size={12} />
                  Signature: SQLi-v3-Payload-Detected
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background blobs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] -z-0" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-rose-400/10 rounded-full blur-[120px] -z-0" />
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-600/20">
              <Shield size={26} />
            </div>
            <span className="text-2xl font-black text-slate-900 tracking-tighter">SecureAssign</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-10 text-sm font-bold text-slate-500 uppercase tracking-widest">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Audit</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
          </div>
        </div>
        
        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm font-medium text-slate-400">
            © 2026 Secure Student Assignment System. Built with enterprise-grade security.
          </div>
          <div className="flex gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-10 h-10 bg-slate-50 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer" />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Functional Components ---

const WAFAlert = ({ message, type = "error", onClose }: { message: string, type?: "error" | "warning", onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.9, y: 20 }}
    className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md px-6"
  >
    <div className={`p-6 rounded-3xl shadow-2xl border flex items-start gap-4 backdrop-blur-xl ${
      type === "error" ? "bg-slate-900 border-rose-500/30 text-white" : "bg-white border-blue-500/30 text-slate-900"
    }`}>
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
        type === "error" ? "bg-rose-600 text-white" : "bg-blue-600 text-white"
      }`}>
        <Shield size={24} />
      </div>
      <div className="flex-1">
        <h4 className={`font-black text-lg tracking-tight ${type === "error" ? "text-rose-400" : "text-blue-600"}`}>
          {type === "error" ? "WAF Security Alert" : "System Notification"}
        </h4>
        <p className={`text-sm mt-1 leading-relaxed font-medium ${type === "error" ? "text-slate-400" : "text-slate-600"}`}>
          {message}
        </p>
        <button 
          onClick={onClose}
          className="mt-4 text-xs font-black uppercase tracking-widest hover:underline"
        >
          Dismiss
        </button>
      </div>
    </div>
  </motion.div>
);

const LoginPage = ({ onLogin, onWafTrigger }: { onLogin: (id: string) => void, onWafTrigger: (msg: string, type: string, sev: WAFLog["severity"]) => void }) => {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
  e.preventDefault();

  // ✅ SAME FRONTEND WAF (only alerts, no return)
  const validIds = ["2420030182", "2420030100", "2420030784", "2420030319"];
  const globalPassword = "klh@1234";

  if (!validIds.includes(studentId)) {
    onWafTrigger(
      "WAF blocked access attempt: Unauthorized Roll Number.",
      "Unauthorized Access",
      "High"
    );
    // ❗ DON'T RETURN
  }

  if (password !== globalPassword) {
    onWafTrigger(
      "WAF detected invalid credentials. Brute force protection active.",
      "Brute Force",
      "Medium"
    );
    // ❗ DON'T RETURN
  }

  // ✅ BACKEND CALL (ALWAYS RUNS)
  try {
    const res = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: studentId })
    });

    const text = await res.text();

    // 🔥 BACKEND WAF RESPONSE
    if (text.includes("Malicious")) {
      onWafTrigger(text, "SQL/XSS Attack", "High");
      return;
    }

  } catch (err) {
    onWafTrigger(
      "Backend not reachable. Server issue.",
      "Server Error",
      "Critical"
    );
    return;
  }

  // ✅ FINAL LOGIN
  onLogin(studentId);
};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-blue-600 to-red-600" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-red-50 rounded-full blur-3xl opacity-50" />

      <div className="mb-12 flex flex-col items-center gap-4 relative z-10">
        <img 
          src="https://klh.edu.in/wp-content/uploads/2023/06/klh-logo-bachupally.png" 
          alt="KLH University Bachupally Campus" 
          className="h-24 md:h-32"
          referrerPolicy="no-referrer"
        />
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-10 md:p-12 rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 relative z-10"
      >
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Student Login</h2>
          <p className="text-slate-500 mt-2 font-medium">Enter your credentials to access the portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">Roll Number</label>
            <input 
              type="text" 
              placeholder="Enter Roll No."
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <button 
            type="submit"
            className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg transition-all text-lg"
          >
            Login
          </button>
        </form>
      </motion.div>
      
      <p className="mt-8 text-slate-400 text-xs font-medium relative z-10">© 2026 KLH University Bachupally Campus. All Rights Reserved.</p>
    </div>
  );
};

const Dashboard = ({ studentId, onLogout }: { studentId: string, onLogout: () => void }) => {
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  const assignments = [
    { id: 1, title: "Cloud Infrastructure Setup", course: "CLOUD INFRASTRUCTURE", dueDate: "Wednesday, 8 April 2026", status: "Pending", type: "Assignment" },
    { id: 2, title: "Design and Analysis of Algorithms - Quiz", course: "DESIGN AND ANALYSIS OF ALGORITHMS", dueDate: "Friday, 10 April 2026", status: "In Progress", type: "Quiz" },
    { id: 3, title: "Capstone Project Report", course: "COMPUTER NETWORKS", dueDate: "Wednesday, 1 April 2026", status: "Overdue", type: "Assignment" },
  ];

 const handleFileUpload = async (e: any) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const allowedExtensions = [".pdf", ".docx"];
  const fileName = file.name.toLowerCase();
  const isValid = allowedExtensions.some(ext => fileName.endsWith(ext));

  // ✅ SAME FRONTEND CHECK
  if (!isValid) {
    window.dispatchEvent(
      new CustomEvent("waf-trigger", {
        detail: {
          msg: `WAF detected malicious file upload attempt: ${file.name}. Only .pdf and .docx files are allowed.`,
          type: "Malicious File Upload",
          severity: "Critical",
        },
      })
    );
    return;
  }

  // ✅ BACKEND CALL (NEW)
  const formData = new FormData();
  formData.append("file", file);

  try {
    setUploading(true);

    const res = await fetch("http://localhost:8080/upload", {
      method: "POST",
      body: formData,
    });

    const text = await res.text();

    setUploading(false);

    if (text.includes("Malicious")) {
      window.dispatchEvent(
        new CustomEvent("waf-trigger", {
          detail: {
            msg: text,
            type: "Malicious File Upload",
            severity: "Critical",
          },
        })
      );
      return;
    }

    alert("Assignment submitted successfully! ✅");

  } catch (err) {
    setUploading(false);
    alert("Upload failed ❌");
  }
};
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Dashboard Nav */}
      <nav className="bg-white py-4 px-10 border-b border-slate-200 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <img 
            src="https://klh.edu.in/wp-content/uploads/2023/06/klh-logo-bachupally.png" 
            alt="KLH University Bachupally Campus" 
            className="h-12"
            referrerPolicy="no-referrer"
          />
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-slate-900">Home</a>
            <a href="#" className="text-slate-900 font-bold border-b-2 border-slate-900 pb-1">Dashboard</a>
            <a href="#" className="hover:text-slate-900">My courses</a>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Roll No</p>
            <p className="font-bold text-slate-900 text-sm">{studentId}</p>
          </div>
          <button 
            onClick={onLogout}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-lg transition-colors text-xs"
          >
            Logout
          </button>
        </div>
      </nav>
      {/* ... rest of the dashboard ... */}

      <div className="max-w-7xl mx-auto p-10 space-y-12">
        <section>
          <h1 className="text-4xl font-bold text-slate-900 mb-10">Dashboard</h1>
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <h2 className="text-xl font-bold text-slate-800">Timeline</h2>
              <div className="flex flex-wrap gap-3">
                <select className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-600 outline-none">
                  <option>All</option>
                </select>
                <select className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-600 outline-none">
                  <option>Sort by dates</option>
                </select>
                <input 
                  type="text" 
                  placeholder="Search by activity type or name"
                  className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-600 outline-none w-full md:w-64"
                />
              </div>
            </div>

            <div className="space-y-8">
              {assignments.map((assignment) => (
                <div key={assignment.id} className="border-b border-slate-100 pb-8 last:border-0 last:pb-0">
                  <p className="text-sm font-bold text-slate-800 mb-4">{assignment.dueDate}</p>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white shrink-0 ${assignment.type === 'Quiz' ? 'bg-rose-500' : 'bg-pink-500'}`}>
                        {assignment.type === 'Quiz' ? <Activity size={24} /> : <Upload size={24} />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-red-900 hover:underline cursor-pointer" onClick={() => setSelectedAssignment(assignment)}>
                            {assignment.title}
                          </h3>
                          {assignment.status === 'Overdue' && (
                            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">Overdue</span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          {assignment.type === 'Quiz' ? 'Quiz closes' : 'Assignment is due'} • <span className="font-bold">{assignment.course}</span>
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedAssignment(assignment)}
                      className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold rounded-lg text-sm transition-colors"
                    >
                      {assignment.type === 'Quiz' ? 'Attempt quiz' : 'Add submission'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">My Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "Cloud Infrastructure", code: "CS301", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400&h=250&auto=format&fit=crop" },
              { name: "Design and Analysis of Algorithms", code: "CS302", image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=400&h=250&auto=format&fit=crop" }
            ].map((course, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
                <div className="h-40 overflow-hidden">
                  <img src={course.image} alt={course.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                </div>
                <div className="p-6">
                  <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">{course.code}</p>
                  <h3 className="text-xl font-bold text-slate-900">{course.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Assignment Detail Modal */}
      <AnimatePresence>
        {selectedAssignment && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAssignment(null)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white p-10 rounded-2xl w-full max-w-xl relative z-10 shadow-2xl border border-slate-200"
            >
              <button 
                onClick={() => setSelectedAssignment(null)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">{selectedAssignment.title}</h2>
              <p className="text-sm text-slate-500 mb-8 font-medium">{selectedAssignment.course}</p>
              
              <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-4">
                  <Upload size={28} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Upload Submission</h3>
                <p className="text-xs text-slate-500 mb-6 font-medium">Accepted formats: .pdf, .docx</p>
                
                <label className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-3 cursor-pointer ${
                  uploading ? "bg-slate-200 text-slate-400" : "bg-slate-900 hover:bg-slate-800 text-white"
                }`}>
                  {uploading ? (
                    <>
                      <Activity className="animate-spin size={18}" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload size={18} />
                      Select File
                    </>
                  )}
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={handleFileUpload}
                    disabled={uploading}
                  />
                </label>
              </div>

              <div className="flex justify-end">
                <button 
                  onClick={() => setSelectedAssignment(null)}
                  className="px-6 py-2 text-slate-500 font-bold hover:text-slate-900 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const WAFDashboard = ({ logs, blockedUsers, onBack }: { logs: WAFLog[], blockedUsers: string[], onBack: () => void }) => {
  const stats: WAFStats = {
    totalBlocks: logs.length,
    criticalThreats: logs.filter(l => l.severity === "Critical").length,
    activeRules: 8,
    uptime: "99.99%"
  };

  const rules = [
    { name: "SQL Injection Protection", status: "Active", description: "Blocks malformed database queries" },
    { name: "XSS Mitigation", status: "Active", description: "Sanitizes script tags in inputs" },
    { name: "Brute Force Protection", status: "Active", description: "Limits repeated login attempts" },
    { name: "File Upload Validator", status: "Active", description: "Enforces .pdf and .docx extensions" },
    { name: "User Suspension Logic", status: "Active", description: "Blocks users after 3 malicious attempts" },
    { name: "DDoS Shield", status: "Active", description: "Rate limits incoming traffic" },
    { name: "Geo-Blocking", status: "Inactive", description: "Restrict access by region" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-600/40">
              <ShieldAlert size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">WAF Security Monitor</h1>
              <p className="text-slate-400 font-medium">Real-time threat intelligence & analytics</p>
            </div>
          </div>
          <button 
            onClick={onBack}
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl font-bold text-sm transition-all flex items-center gap-2"
          >
            <ChevronRight size={18} className="rotate-180" />
            Back to System Selection
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Total Blocks", value: stats.totalBlocks, icon: Shield, color: "text-blue-500" },
            { label: "Critical Threats", value: stats.criticalThreats, icon: AlertTriangle, color: "text-rose-500" },
            { label: "Blocked Users", value: blockedUsers.length, icon: User, color: "text-emerald-500" },
            { label: "System Uptime", value: stats.uptime, icon: Zap, color: "text-amber-500" }
          ].map((stat, i) => (
            <div key={i} className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 bg-slate-950 rounded-xl ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live</span>
              </div>
              <p className="text-3xl font-black">{stat.value}</p>
              <p className="text-sm font-bold text-slate-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Attack Logs */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black flex items-center gap-2">
                <History className="text-blue-500" />
                Recent Attack Logs
              </h2>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Last 24 Hours</span>
            </div>
            
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-950/50 border-b border-slate-800">
                      <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Timestamp</th>
                      <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Attack Type</th>
                      <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Severity</th>
                      <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Source</th>
                      <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {logs.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-10 text-center text-slate-500 font-medium italic">
                          No attack attempts detected yet. System is secure.
                        </td>
                      </tr>
                    ) : (
                      logs.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="p-4 text-sm font-mono text-slate-400">{log.timestamp}</td>
                          <td className="p-4 text-sm font-bold">{log.type}</td>
                          <td className="p-4">
                            <span className={`text-[10px] font-black px-2 py-1 rounded uppercase ${
                              log.severity === 'Critical' ? 'bg-rose-500/20 text-rose-500' :
                              log.severity === 'High' ? 'bg-orange-500/20 text-orange-500' :
                              'bg-blue-500/20 text-blue-500'
                            }`}>
                              {log.severity}
                            </span>
                          </td>
                          <td className="p-4 text-sm font-medium text-slate-400">{log.source}</td>
                          <td className="p-4">
                            <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                              <CheckCircle2 size={14} />
                              {log.action}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Blocked Users Section */}
            {blockedUsers.length > 0 && (
              <div className="space-y-6 pt-6">
                <h2 className="text-xl font-black flex items-center gap-2 text-rose-500">
                  <Lock size={24} />
                  Permanently Suspended Users
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {blockedUsers.map((uid, i) => (
                    <div key={i} className="bg-rose-500/5 border border-rose-500/20 p-4 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-rose-500/20 rounded-lg flex items-center justify-center text-rose-500">
                          <User size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{uid}</p>
                          <p className="text-[10px] font-bold text-rose-500/70 uppercase tracking-widest">Status: Blocked</p>
                        </div>
                      </div>
                      <AlertTriangle size={16} className="text-rose-500" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Rules & Analytics */}
          <div className="space-y-10">
            <div className="space-y-6">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Terminal className="text-emerald-500" />
                Active Rules
              </h2>
              <div className="space-y-4">
                {rules.map((rule, i) => (
                  <div key={i} className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl flex items-start gap-4">
                    <div className={`mt-1 size-2 rounded-full ${rule.status === 'Active' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-slate-700'}`} />
                    <div>
                      <p className="text-sm font-bold">{rule.name}</p>
                      <p className="text-xs text-slate-500 mt-1">{rule.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[2rem] shadow-2xl shadow-blue-600/20 relative overflow-hidden group">
              <div className="relative z-10">
                <BarChart3 size={40} className="text-white/30 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-black text-white mb-2">Threat Intelligence</h3>
                <p className="text-white/70 text-sm font-medium leading-relaxed">
                  Our WAF uses behavioral analysis to track repeated attack patterns across all student endpoints.
                </p>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activePortal, setActivePortal] = useState<"choice" | "student" | "admin">("choice");
  const [studentView, setStudentView] = useState<"login" | "dashboard">("login");
  const [studentId, setStudentId] = useState("");
  const [wafMessage, setWafMessage] = useState<string | null>(null);
  const [wafLogs, setWafLogs] = useState<WAFLog[]>([]);
  const [violationCounts, setViolationCounts] = useState<Record<string, number>>({});
  const [blockedUsers, setBlockedUsers] = useState<string[]>([]);

  // Listen for custom WAF triggers from components
  useEffect(() => {
    const handleTrigger = (e: any) => {
      const { msg, type, severity } = e.detail;
      triggerWaf(msg, type, severity);
    };
    window.addEventListener('waf-trigger', handleTrigger);
    return () => window.removeEventListener('waf-trigger', handleTrigger);
  }, [studentId, violationCounts, blockedUsers]);

  const triggerWaf = (msg: string, type: string, severity: WAFLog["severity"]) => {
    // If user is already blocked, don't do anything else but show the message
    if (studentId && blockedUsers.includes(studentId)) {
      setWafMessage("CRITICAL: Your account has been permanently suspended due to repeated security violations.");
      return;
    }

    setWafMessage(msg);
    const newLog: WAFLog = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      type,
      severity,
      source: studentId || "Anonymous",
      action: "Blocked",
      details: msg
    };
    setWafLogs(prev => [newLog, ...prev]);

    // Handle blocking logic for file uploads
    if (type === "Malicious File Upload" && studentId) {
      const newCount = (violationCounts[studentId] || 0) + 1;
      setViolationCounts(prev => ({ ...prev, [studentId]: newCount }));

      if (newCount >= 3) {
        setBlockedUsers(prev => [...prev, studentId]);
        setWafMessage(`CRITICAL SECURITY ALERT: Student ${studentId} has been PERMANENTLY BLOCKED after 3 malicious upload attempts.`);
        
        // If they are currently in the dashboard, kick them out after a short delay
        if (studentView === "dashboard") {
          setTimeout(() => {
            setStudentId("");
            setStudentView("login");
          }, 3000);
        }
      }
    }
  };

  // --- Portal 1: WAF Security Command Center (Dark Theme) ---
  if (activePortal === "admin") {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-500 selection:text-white">
        <WAFDashboard 
          logs={wafLogs} 
          blockedUsers={blockedUsers}
          onBack={() => setActivePortal("choice")} 
        />
      </div>
    );
  }

  // --- Portal 2: KLH Student Assignment System (Light Theme) ---
  if (activePortal === "student") {
    if (studentView === "dashboard") {
      return (
        <div className="min-h-screen bg-slate-100 selection:bg-blue-600 selection:text-white">
          <Dashboard 
            studentId={studentId} 
            onLogout={() => {
              setStudentId("");
              setStudentView("login");
            }} 
          />
          <AnimatePresence>
            {wafMessage && <WAFAlert message={wafMessage} onClose={() => setWafMessage(null)} />}
          </AnimatePresence>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-slate-50 selection:bg-blue-600 selection:text-white">
        <LoginPage 
          onLogin={(id) => {
            if (blockedUsers.includes(id)) {
              triggerWaf(`Access denied for blocked user: ${id}. This account is permanently suspended.`, "Blocked User Access Attempt", "Critical");
              return;
            }
            setStudentId(id);
            setStudentView("dashboard");
          }} 
          onWafTrigger={triggerWaf}
        />
        <button 
          onClick={() => setActivePortal("choice")}
          className="fixed bottom-6 left-6 px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-500 hover:text-slate-900 shadow-sm transition-all z-50"
        >
          ← Back to System Selection
        </button>
        <AnimatePresence>
          {wafMessage && <WAFAlert message={wafMessage} onClose={() => setWafMessage(null)} />}
        </AnimatePresence>
      </div>
    );
  }

  // --- Initial Portal Selection Screen ---
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      </div>

      <div className="max-w-6xl w-full relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-600/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Shield size={14} />
            Integrated Security Infrastructure
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4"
          >
            System <span className="text-blue-600">Portal</span> Selection
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg font-medium"
          >
            Choose the environment you wish to access
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Student Portal Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => setActivePortal("student")}
            className="group cursor-pointer bg-white rounded-[2.5rem] p-10 flex flex-col items-center text-center hover:scale-[1.02] transition-all duration-500 shadow-2xl"
          >
            <div className="w-24 h-24 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
              <User size={48} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4">Student Portal</h2>
            <p className="text-slate-500 font-medium mb-8 leading-relaxed">
              Access your assignments, submit coursework, and view your academic timeline in a secure environment.
            </p>
            <div className="mt-auto w-full py-5 bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-900 font-black rounded-2xl transition-all flex items-center justify-center gap-2">
              Enter Portal
              <ChevronRight size={20} />
            </div>
          </motion.div>

          {/* Admin WAF Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => setActivePortal("admin")}
            className="group cursor-pointer bg-slate-900 border border-slate-800 rounded-[2.5rem] p-10 flex flex-col items-center text-center hover:scale-[1.02] transition-all duration-500 shadow-2xl"
          >
            <div className="w-24 h-24 bg-slate-800 rounded-3xl flex items-center justify-center text-red-500 mb-8 group-hover:bg-red-600 group-hover:text-white transition-colors duration-500">
              <ShieldAlert size={48} />
            </div>
            <h2 className="text-3xl font-black text-white mb-4">WAF Command Center</h2>
            <p className="text-slate-400 font-medium mb-8 leading-relaxed">
              Monitor real-time threats, analyze attack vectors, and manage security rules for the entire infrastructure.
            </p>
            <div className="mt-auto w-full py-5 bg-slate-800 group-hover:bg-red-600 group-hover:text-white text-white font-black rounded-2xl transition-all flex items-center justify-center gap-2">
              Access SOC
              <ChevronRight size={20} />
            </div>
          </motion.div>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-slate-600 text-xs font-bold uppercase tracking-[0.2em] mt-16"
        >
          © 2026 KLH University Bachupally Campus • Security Operations Center
        </motion.p>
      </div>
    </div>
  );
}


