import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, animate } from "framer-motion";
import {
  Phone, Mail, Facebook, MapPin, Clock, ArrowRight, Check, Star, Menu, X,
  Dumbbell, Flame, HeartPulse, Droplets, Music2, Coffee, Wind, ChevronRight, Shield,
} from "lucide-react";
import { TridentLogo } from "@/components/TridentLogo";
import PaymentModal from "@/components/PaymentModal";

import heroAthlete from "@/assets/hero-building.jpg";
import realMale from "@/assets/real-trainer-male.jpg";
import realFemale from "@/assets/real-trainer-female.jpg";
import realBoxing from "@/assets/real-boxing.jpg";
import realCardio from "@/assets/real-cardio.jpg";
import realStrength from "@/assets/real-strength.jpg";
import realYoga from "@/assets/real-yoga.jpg";

const aboutTrainer = realMale;
const trainer1 = realMale;
const trainer2 = realFemale;
const gGym = realStrength;
const gSauna = realStrength;
const gJacuzzi = realCardio;
const gCardio = realCardio;
const gRooftop = realYoga;
const gZumba = realFemale;
const gSteam = realStrength;
const gLobby = realMale;
const classBoxing = realBoxing;
const classHiit = realStrength;
const classYoga = realYoga;
const classStrength = realMale;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Trident Fitness Ghorahi — Premium Gym, Sauna, Steam, Jacuzzi & Zumba" },
      { name: "description", content: "Ghorahi's #1 premium fitness center. Gym, Sauna, Steam, Cardio, Jacuzzi, Zumba & Rooftop Coffee Shop. Join Trident Fitness today." },
      { property: "og:title", content: "Trident Fitness Ghorahi — Your Strength, Your Legacy" },
      { property: "og:description", content: "Premium gym in Ghorahi, Nepal with Sauna, Steam, Jacuzzi, Zumba and Rooftop Café." },
      { property: "og:image", content: heroAthlete },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

const NAV = [
  ["Home", "#home"],
  ["Services", "#services"],
  ["Classes", "#classes"],
  ["Trainers", "#trainers"],
  ["BMI", "#bmi"],
  ["Pricing", "#pricing"],
  
  ["Contact", "#contact"],
] as const;

function Index() {
  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <TopBar />
      <Navbar />
      <Hero />
      <Marquee />
      <BMI />
      <About />
      <Services />
      <Steps />
      <Classes />
      <Schedule />
      <Trainers />
      <Pricing />
      
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

/* ---------------- TOP BAR ---------------- */
function TopBar() {
  return (
    <div className="bg-[#111] text-white/80 text-xs hidden md:block border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-primary" /> +977 970-5534334</span>
          <span className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-primary" /> tridentfitness.ghorahi@gmail.com</span>
          <span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-primary" /> Campus Road, Ghorahi, Nepal 🇳🇵</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-white/50">Follow:</span>
          <a href="https://www.facebook.com/tridentfitnessghorahi/" target="_blank" rel="noreferrer" className="hover:text-primary transition"><Facebook className="h-4 w-4" /></a>
          <a href="https://tiktok.com/@trident_fitness.ghorahi" target="_blank" rel="noreferrer" className="hover:text-primary transition" aria-label="TikTok">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M19.5 7.4a6.3 6.3 0 0 1-3.7-1.2v8.5a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v2.9a2.7 2.7 0 1 0 1.9 2.6V2h2.8a3.5 3.5 0 0 0 3.7 3.5v1.9z"/></svg>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ---------------- NAVBAR ---------------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-xl border-b border-white/10" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group">
          <span className="text-primary"><TridentLogo className="h-9 w-9" /></span>
          <div className="leading-none">
            <div className="font-display text-2xl tracking-wider"><span className="text-primary">TRI</span><span className="text-white">DENT</span></div>
            <div className="text-[10px] tracking-[0.3em] text-white/50">FITNESS PVT. LTD.</div>
          </div>
        </a>
        <nav className="hidden lg:flex items-center gap-7">
          {NAV.map(([label, href]) => (
            <a key={href} href={href} className="text-sm font-medium text-white/80 hover:text-primary transition tracking-wide uppercase">{label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#pricing" className="hidden sm:inline-flex items-center gap-2 gradient-red text-white px-5 py-2.5 font-bold text-sm tracking-wider uppercase shadow-red-glow hover:scale-105 transition">
            Join Now <ArrowRight className="h-4 w-4" />
          </a>
          <button onClick={() => setOpen(!open)} className="lg:hidden text-white p-2" aria-label="menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-white/10">
          <div className="px-6 py-4 flex flex-col gap-3">
            {NAV.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="text-white/80 hover:text-primary py-2 uppercase text-sm tracking-wide">{label}</a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  return (
    <section id="home" ref={ref} className="relative min-h-[100vh] flex items-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <img src={heroAthlete} alt="Powerful athlete at Trident Fitness Ghorahi" className="w-full h-full object-cover" />
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 py-32 w-full">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-primary/15 border-l-4 border-primary px-4 py-1.5 mb-6">
            <span className="h-1.5 w-1.5 bg-primary rounded-full animate-pulse" />
            <span className="text-primary font-semibold text-xs tracking-[0.3em] uppercase">Ghorahi's #1 Fitness Center</span>
          </div>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.85] text-white mb-2">
            YOUR STRENGTH
          </h1>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.85] mb-6">
            <span className="text-primary">YOUR </span><span className="text-white">LEGACY</span>
          </h1>
          <p className="text-white/75 text-lg max-w-xl mb-8 leading-relaxed">
            Transform your body and mind at <span className="text-white font-semibold">Trident Fitness</span> — Ghorahi's most premium gym featuring Sauna, Steam, Cardio, Jacuzzi, Zumba & Rooftop Coffee Shop.
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <a href="#schedule" className="gradient-red text-white px-7 py-4 font-bold tracking-wider uppercase text-sm shadow-red-glow hover:scale-105 transition inline-flex items-center gap-2">
              View Class Schedule <ChevronRight className="h-4 w-4" />
            </a>
            <a href="#services" className="border-2 border-white/40 text-white px-7 py-4 font-bold tracking-wider uppercase text-sm hover:border-white hover:bg-white/10 transition">
              Explore Services
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-8 pt-6 border-t border-white/10">
            <Stat n={500} suffix="+" label="Members" />
            <div className="h-10 w-px bg-white/20" />
            <Stat n={10} suffix="+" label="Expert Trainers" />
            <div className="h-10 w-px bg-white/20" />
            <Stat n={7} label="Premium Facilities" />
          </div>
        </motion.div>
      </div>

      {/* diagonal slash */}
      <div className="absolute -bottom-px left-0 right-0 h-24 bg-primary clip-slash-up" />
      <div className="absolute -bottom-px left-0 right-0 h-20 bg-background clip-slash-up" />
    </section>
  );
}

function Stat({ n, suffix = "", label }: { n: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, n, { duration: 1.8, onUpdate: (v) => setVal(Math.floor(v)) });
    return () => controls.stop();
  }, [inView, n]);
  return (
    <div ref={ref as any}>
      <div className="font-display text-4xl text-primary leading-none">
        <span>{val}</span>{suffix}
      </div>
      <div className="text-xs uppercase tracking-[0.2em] text-white/60 mt-1">{label}</div>
    </div>
  );
}

/* ---------------- MARQUEE ---------------- */
function Marquee() {
  const items = ["GYM", "SAUNA", "STEAM", "CARDIO", "JACUZZI", "ZUMBA", "ROOFTOP COFFEE SHOP", "GHORAHI · NEPAL"];
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className="bg-primary py-5 overflow-hidden border-y-4 border-black">
      <div className="flex whitespace-nowrap marquee">
        {row.map((t, i) => (
          <span key={i} className="font-display text-2xl md:text-3xl text-white tracking-widest px-8 flex items-center gap-8">
            {t} <span className="text-white/40">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- BMI ---------------- */
function BMI() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const result = useMemo(() => {
    const w = parseFloat(weight); const h = parseFloat(height) / 100;
    if (!w || !h) return null;
    const bmi = w / (h * h);
    let cat = "Normal", msg = "Keep up the great work! Maintain with regular workouts.";
    if (bmi < 18.5) { cat = "Underweight"; msg = "Build healthy mass with our Strength & Nutrition program."; }
    else if (bmi >= 25 && bmi < 30) { cat = "Overweight"; msg = "Our Cardio + HIIT program will get you to your goal fast."; }
    else if (bmi >= 30) { cat = "Obese"; msg = "Join our personal trainer program for a guided transformation."; }
    return { bmi: bmi.toFixed(1), cat, msg };
  }, [weight, height]);

  return (
    <section id="bmi" className="py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle eyebrow="Body Mass Index" title="CALCULATE YOUR BMI" />
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mt-14 max-w-5xl mx-auto bg-surface border border-primary/30 shadow-red-glow p-8 md:p-12 grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3 grid sm:grid-cols-2 gap-4">
            <Field label="Weight (kg)" value={weight} onChange={setWeight} type="number" placeholder="70" />
            <Field label="Height (cm)" value={height} onChange={setHeight} type="number" placeholder="170" />
            <Field label="Age" value={age} onChange={setAge} type="number" placeholder="25" />
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">Gender</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)}
                className="w-full bg-background border border-white/15 px-4 py-3.5 text-white focus:border-primary outline-none">
                <option value="male">Male</option><option value="female">Female</option><option value="other">Other</option>
              </select>
            </div>
            <button className="sm:col-span-2 gradient-red text-white font-bold tracking-widest uppercase py-4 mt-2 hover:shadow-red-glow transition">
              Calculate Now
            </button>
          </div>
          <div className="md:col-span-2 bg-background/60 border border-white/10 p-6 flex flex-col justify-center">
            <div className="text-xs uppercase tracking-widest text-white/50 mb-2">Your Result</div>
            {result ? (
              <>
                <div className="font-display text-7xl text-primary leading-none">{result.bmi}</div>
                <div className="font-display text-2xl text-white mt-2 tracking-wider">{result.cat.toUpperCase()}</div>
                <p className="text-white/70 text-sm mt-3 leading-relaxed">{result.msg}</p>
              </>
            ) : (
              <p className="text-white/40 text-sm">Enter your weight and height to see your BMI and a personalized recommendation.</p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full bg-background border border-white/15 px-4 py-3.5 text-white placeholder:text-white/30 focus:border-primary outline-none" />
    </div>
  );
}

/* ---------------- ABOUT ---------------- */
function About() {
  return (
    <section id="about" className="py-28 bg-white text-[#0a0a0a] relative overflow-hidden">
      <div className="absolute top-10 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="relative">
          <div className="absolute -top-6 -left-6 w-32 h-32 border-4 border-primary z-0" />
          <img src={aboutTrainer} alt="Trident Fitness head trainer" loading="lazy" className="relative z-10 w-full h-[560px] object-cover" />
          <div className="absolute -bottom-6 -right-6 bg-primary text-white px-8 py-6 z-20 shadow-red-glow">
            <div className="font-display text-5xl leading-none">15+</div>
            <div className="text-xs uppercase tracking-widest mt-1">Years Experience</div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="h-px w-10 bg-primary" />
            <span className="text-primary font-bold text-xs tracking-[0.3em] uppercase">About Us</span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl leading-[0.95] mb-6">
            We Are Ghorahi's Most <span className="text-primary">Premium</span> Fitness Experience
          </h2>
          <p className="text-black/70 mb-8 leading-relaxed">
            Trident Fitness Pvt. Ltd. was built with one mission — to bring world-class fitness facilities to the heart of Ghorahi. From state-of-the-art gym equipment to relaxing sauna and steam rooms, we offer a complete wellness ecosystem under one roof.
          </p>
          <ul className="space-y-3 mb-8">
            {["Certified Expert Trainers", "World-Class Equipment", "Spa, Sauna, Jacuzzi & Rooftop Café"].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="h-7 w-7 bg-primary text-white flex items-center justify-center"><Check className="h-4 w-4" /></span>
                <span className="font-semibold">{t}</span>
              </li>
            ))}
          </ul>
          <a href="#pricing" className="inline-flex items-center gap-2 gradient-red text-white px-7 py-4 font-bold tracking-widest uppercase text-sm shadow-red-glow hover:scale-105 transition">
            Get Started <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- SERVICES ---------------- */
const SERVICES = [
  { icon: Dumbbell, title: "Gym & Strength Training", desc: "Advanced machines and free weights programmed by certified coaches for every level.", img: gGym, tag: "Most Popular" },
  { icon: HeartPulse, title: "Cardio Zone", desc: "Treadmills, cycles, ellipticals and rowers for endurance, fat-loss and heart health.", img: gCardio, tag: "Open Daily" },
  { icon: Music2, title: "Zumba & Group Classes", desc: "High-energy, instructor-led dance and fitness classes for all ages and abilities.", img: gZumba, tag: "Ladies Friendly" },
  { icon: Wind, title: "Sauna & Steam Room", desc: "Therapeutic heat therapy to relax muscles, detox the body and accelerate recovery.", img: gSauna, tag: "Recovery" },
  { icon: Droplets, title: "Jacuzzi & Hydrotherapy", desc: "Luxury hydrotherapy pool — soothe joints, reduce stress and recover like a pro athlete.", img: gJacuzzi, tag: "Premium" },
  { icon: Coffee, title: "Rooftop Health Café", desc: "Healthy protein shakes, smoothies and snacks with a panoramic Ghorahi skyline view.", img: gRooftop, tag: "New" },
];

const TRUST = [
  { icon: Check, label: "Certified Trainers" },
  { icon: Shield, label: "Hygienic Facilities" },
  { icon: Dumbbell, label: "Modern Equipment" },
  { icon: Clock, label: "Open 7 Days" },
];

function Services() {
  return (
    <section id="services" className="py-28 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
      <div className="max-w-7xl mx-auto px-6 relative">
        <SectionTitle eyebrow="What We Offer" title="OUR PREMIUM SERVICES" center />
        <p className="text-center text-white/60 mt-4 max-w-2xl mx-auto">
          Six world-class facilities under one roof — engineered for serious results, hygienic, safe and trusted by hundreds of Ghorahi members.
        </p>

        {/* Trust bar */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
          {TRUST.map((t) => (
            <div key={t.label} className="flex items-center justify-center gap-2 bg-surface-2 border border-white/10 py-3 px-4">
              <t.icon className="h-4 w-4 text-primary" />
              <span className="text-white/85 text-xs font-semibold tracking-wider uppercase">{t.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative bg-surface-2 border border-white/10 overflow-hidden hover:border-primary/60 hover:shadow-red-glow transition-all duration-500 hover:-translate-y-2 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img src={s.img} alt={s.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-2 via-surface-2/40 to-transparent" />
                {/* Number watermark */}
                <div className="absolute top-3 right-4 font-display text-5xl text-white/20 leading-none select-none">{String(i+1).padStart(2,"0")}</div>
                {/* Tag */}
                <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 shadow-red-glow">{s.tag}</div>
                {/* Icon badge */}
                <div className="absolute -bottom-6 left-6 w-14 h-14 bg-primary flex items-center justify-center shadow-red-glow border-4 border-surface-2">
                  <s.icon className="h-6 w-6 text-white" strokeWidth={2} />
                </div>
              </div>

              {/* Content */}
              <div className="p-7 pt-10 flex-1 flex flex-col">
                <h3 className="font-display text-2xl text-white tracking-wider mb-3">{s.title.toUpperCase()}</h3>
                <p className="text-white/60 text-sm leading-relaxed flex-1">{s.desc}</p>
                <div className="h-px bg-white/10 my-5" />
                <a href="#pricing" className="inline-flex items-center justify-between text-white text-xs font-bold tracking-widest uppercase group-hover:text-primary transition">
                  <span>Included in Membership</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom assurance strip */}
        <div className="mt-14 bg-surface-2 border border-white/10 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/15 border border-primary/40 flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="text-white font-bold tracking-wider">100% Satisfaction Guarantee</div>
              <div className="text-white/55 text-sm">Not happy in your first 7 days? We'll make it right — no questions asked.</div>
            </div>
          </div>
          <a href="#pricing" className="gradient-red text-white px-6 py-3 font-bold tracking-widest uppercase text-xs shadow-red-glow hover:scale-105 transition whitespace-nowrap">
            View Membership
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- STEPS ---------------- */
function Steps() {
  const steps = [
    { n: "01", title: "Join & Assess", desc: "Visit Trident Fitness, meet our team and get a free fitness assessment.", img: gLobby },
    { n: "02", title: "Train Hard", desc: "Train with certified coaches on world-class equipment built for results.", img: classStrength },
    { n: "03", title: "Achieve Results", desc: "Transform your body, mind and confidence — the Trident way.", img: classHiit },
  ];
  return (
    <section className="py-28 bg-white text-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="h-px w-10 bg-primary" />
          <span className="text-primary font-bold text-xs tracking-[0.3em] uppercase">Work Process</span>
          <span className="h-px w-10 bg-primary" />
        </div>
        <h2 className="font-display text-5xl md:text-6xl">Easy Steps To <span className="text-primary">Achieve Your Goals</span></h2>
        <div className="relative mt-20 grid md:grid-cols-3 gap-12">
          <svg className="hidden md:block absolute top-28 left-1/4 right-1/4 h-2 w-1/2 -translate-x-0" viewBox="0 0 800 20" preserveAspectRatio="none">
            <path d="M0 10 Q 200 -10 400 10 T 800 10" stroke="#E01E37" strokeWidth="2" fill="none" strokeDasharray="6 6" />
          </svg>
          {steps.map((s, i) => (
            <motion.div key={s.n} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="relative">
              <div className="relative w-56 h-56 mx-auto">
                <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-primary">
                  <img src={s.img} alt={s.title} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white font-display text-xl px-4 py-1 tracking-widest shadow-red-glow">STEP {s.n}</div>
              </div>
              <h3 className="font-display text-3xl mt-8">{s.title}</h3>
              <p className="text-black/60 mt-3 max-w-xs mx-auto">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CLASSES ---------------- */
const CLASSES = [
  { name: "Zumba", duration: "45 min", img: gZumba },
  { name: "Yoga", duration: "60 min", img: classYoga },
  { name: "HIIT", duration: "30 min", img: classHiit },
  { name: "Strength", duration: "60 min", img: classStrength },
  { name: "Cardio Blast", duration: "45 min", img: gCardio },
  { name: "Boxing Fitness", duration: "50 min", img: classBoxing },
];

function Classes() {
  return (
    <section id="classes" className="py-28 bg-background relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle eyebrow="Train With The Best" title="OUR FITNESS CLASSES" center />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLASSES.map((c, i) => (
            <motion.div key={c.name}
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="group relative h-80 overflow-hidden diagonal-card cursor-pointer">
              <img src={c.img} alt={c.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute top-4 right-4 bg-primary text-white text-xs px-3 py-1 font-bold tracking-widest">{c.duration}</div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-4xl text-white tracking-wider">{c.name.toUpperCase()}</h3>
                <button className="mt-4 inline-flex items-center gap-2 gradient-red text-white px-5 py-2.5 text-xs font-bold tracking-widest uppercase hover:shadow-red-glow transition">
                  Book Now <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- SCHEDULE ---------------- */
function Schedule() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const slots = ["Morning (6–8 AM)", "Afternoon (12–2 PM)", "Evening (5–8 PM)"];
  const data: Record<string, string[]> = {
    Mon: ["Strength", "Yoga", "Zumba"], Tue: ["HIIT", "Cardio", "Boxing"],
    Wed: ["Strength", "Yoga", "Zumba"], Thu: ["HIIT", "Cardio", "Strength"],
    Fri: ["Zumba", "Yoga", "Boxing"], Sat: ["Strength", "HIIT", "Cardio Blast"],
    Sun: ["Yoga", "Open Gym", "Recovery"],
  };
  return (
    <section id="schedule" className="py-28 bg-surface-2 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle eyebrow="Plan Your Week" title="WEEKLY CLASS SCHEDULE" center />
        <div className="mt-14 overflow-x-auto bg-background border border-white/10">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="gradient-red text-white">
                <th className="px-6 py-4 font-display tracking-widest text-sm">Day</th>
                {slots.map((s) => <th key={s} className="px-6 py-4 font-display tracking-widest text-sm">{s}</th>)}
              </tr>
            </thead>
            <tbody>
              {days.map((d, i) => (
                <tr key={d} className={i % 2 ? "bg-surface" : "bg-background"}>
                  <td className="px-6 py-4 font-display text-xl text-primary tracking-wider">{d.toUpperCase()}</td>
                  {data[d].map((c, j) => (
                    <td key={j} className="px-6 py-4 text-white/80 border-l border-white/5">{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ---------------- TRAINERS ---------------- */
const TRAINERS = [
  { name: "Bikash Thapa", role: "Head Strength Coach", img: trainer1 },
  { name: "Anita Gurung", role: "Zumba & Cardio Lead", img: trainer2 },
];

function Trainers() {
  return (
    <section id="trainers" className="py-28 bg-white text-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-10 bg-primary" />
            <span className="text-primary font-bold text-xs tracking-[0.3em] uppercase">Our Team</span>
            <span className="h-px w-10 bg-primary" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl">Meet Our <span className="text-primary">Expert Trainers</span></h2>
        </div>
        <div className="mt-16 grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {TRAINERS.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="group">
              <div className="relative overflow-hidden rounded-t-[50%] aspect-[3/4]">
                <img src={t.img} alt={t.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
              </div>
              <div className="bg-[#0a0a0a] text-white p-5 text-center">
                <h3 className="font-display text-2xl tracking-wider">{t.name}</h3>
                <p className="text-primary text-xs uppercase tracking-[0.2em] mt-1">{t.role}</p>
                <div className="flex justify-center gap-3 mt-4 text-white/60">
                  <Facebook className="h-4 w-4 hover:text-primary cursor-pointer" />
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current hover:text-primary cursor-pointer"><path d="M19.5 7.4a6.3 6.3 0 0 1-3.7-1.2v8.5a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v2.9a2.7 2.7 0 1 0 1.9 2.6V2h2.8a3.5 3.5 0 0 0 3.7 3.5v1.9z"/></svg>
                </div>
                <a href="#contact" className="mt-4 inline-block text-primary text-xs font-bold tracking-widest uppercase hover:underline">View Profile →</a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PRICING ---------------- */
const PLANS = [
  { name: "Basic", price: 1500, popular: false, features: ["Gym Access", "Locker Room", "Basic Equipment", "Free Wi-Fi"] },
  { name: "Pro", price: 2500, popular: true, features: ["All Basic Features", "Cardio Zone", "Zumba Classes", "Steam Room", "Group Classes"] },
  { name: "Elite", price: 4000, popular: false, features: ["All Pro Features", "Sauna Access", "Jacuzzi Pool", "Rooftop Café", "Personal Trainer"] },
];

function Pricing() {
  const [selected, setSelected] = useState<{ name: string; price: number } | null>(null);
  return (
    <section id="pricing" className="py-28 bg-background relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle eyebrow="Membership" title="FIND YOUR PERFECT PLAN" center />
        <p className="text-center text-white/60 mt-4 max-w-2xl mx-auto">Special New Year & Opening Offer — <span className="text-gold font-semibold">20% OFF + Free Admission</span> for new members.</p>
        <div className="mt-14 grid md:grid-cols-3 gap-8 items-stretch">
          {PLANS.map((p, i) => (
            <motion.div key={p.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className={`relative bg-surface p-10 border ${p.popular ? "border-primary shadow-red-glow scale-105 z-10" : "border-white/10"}`}>
              {p.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-black px-5 py-1.5 text-xs font-bold tracking-widest uppercase shadow-gold-glow">★ Most Popular</div>
              )}
              <h3 className="font-display text-4xl tracking-widest text-white">{p.name.toUpperCase()}</h3>
              <div className="mt-6 mb-2">
                <span className="text-white/50 text-sm">Rs.</span>
                <span className="font-display text-6xl text-primary mx-2">{p.price.toLocaleString()}</span>
                <span className="text-white/50 text-sm">/month</span>
              </div>
              <div className="h-px bg-white/10 my-6" />
              <ul className="space-y-3 mb-8">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-white/80 text-sm">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setSelected({ name: `${p.name} Plan`, price: p.price })}
                className={`w-full block text-center py-3.5 font-bold tracking-widest uppercase text-sm transition ${p.popular ? "gradient-red text-white shadow-red-glow" : "border-2 border-white/20 text-white hover:border-primary hover:text-primary"}`}
              >
                Choose Plan
              </button>
            </motion.div>
          ))}
        </div>
      </div>
      <PaymentModal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        planName={selected?.name ?? ""}
        planPrice={selected?.price ?? 0}
      />
    </section>
  );
}

/* ---------------- GALLERY ---------------- */
function Gallery() {
  const items = [
    { img: gGym, span: "row-span-2" },
    { img: gSauna, span: "" },
    { img: gJacuzzi, span: "row-span-2" },
    { img: gCardio, span: "" },
    { img: gRooftop, span: "" },
    { img: gZumba, span: "" },
    { img: gSteam, span: "row-span-2" },
    { img: gLobby, span: "" },
  ];
  return (
    <section id="gallery" className="py-28 bg-surface-2 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle eyebrow="Take A Tour" title="INSIDE TRIDENT FITNESS" center />
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4">
          {items.map((it, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className={`group relative overflow-hidden ${it.span}`}>
              <img src={it.img} alt="Trident Fitness facility" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 text-white font-display text-2xl tracking-widest border-2 border-white px-4 py-2">VIEW</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
const REVIEWS = [
  { name: "Sanjay Khatri", loc: "Ghorahi, Dang", quote: "Best gym in Ghorahi — hands down. The trainers actually care about your progress and the equipment is world-class.", },
  { name: "Priya Shrestha", loc: "Ghorahi, Dang", quote: "I joined for Zumba and stayed for everything. The rooftop café after a workout is my new favorite spot in town.", },
  { name: "Ramesh Oli", loc: "Ghorahi, Dang", quote: "Lost 14 kg in 5 months with the Pro plan. The sauna and steam recovery makes all the difference. Highly recommended.", },
];

function Testimonials() {
  return (
    <section className="py-28 bg-background relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle eyebrow="Member Stories" title="WHAT OUR MEMBERS SAY" center />
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <motion.div key={r.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-surface border-l-4 border-primary p-8 hover:shadow-red-glow transition">
              <div className="flex gap-1 mb-4 text-gold">
                {[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="text-white/80 leading-relaxed italic">"{r.quote}"</p>
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="font-display text-xl text-white tracking-wider">{r.name}</div>
                <div className="text-primary text-xs uppercase tracking-[0.2em] mt-1">{r.loc} 🇳🇵</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */
function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <section id="contact" className="py-28 bg-surface-2 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle eyebrow="Get In Touch" title="VISIT TRIDENT FITNESS" center />
        <div className="mt-14 grid lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-surface border border-primary/30 p-8 md:p-10 shadow-red-glow">
            <h3 className="font-display text-3xl text-white mb-6 tracking-wider">CONTACT INFO</h3>
            <div className="space-y-5">
              {[
                { I: MapPin, t: "Address", v: "Campus Road, Ghorahi-10, Dang, Nepal 🇳🇵" },
                { I: Phone, t: "Phone", v: "+977 970-5534334" },
                { I: Mail, t: "Email", v: "tridentfitness.ghorahi@gmail.com" },
                { I: Clock, t: "Open Now", v: "Monday – Sunday · 5 AM – 10 PM" },
              ].map(({ I, t, v }) => (
                <div key={t} className="flex gap-4">
                  <div className="h-11 w-11 bg-primary/15 border border-primary/40 flex items-center justify-center text-primary flex-shrink-0">
                    <I className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-white/50">{t}</div>
                    <div className="text-white font-medium mt-0.5">{v}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-4">
              <span className="text-white/60 text-sm uppercase tracking-widest">Follow:</span>
              <a href="https://www.facebook.com/tridentfitnessghorahi/" target="_blank" rel="noreferrer" className="h-10 w-10 bg-background border border-white/15 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition"><Facebook className="h-4 w-4" /></a>
              <a href="https://tiktok.com/@trident_fitness.ghorahi" target="_blank" rel="noreferrer" className="h-10 w-10 bg-background border border-white/15 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M19.5 7.4a6.3 6.3 0 0 1-3.7-1.2v8.5a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v2.9a2.7 2.7 0 1 0 1.9 2.6V2h2.8a3.5 3.5 0 0 0 3.7 3.5v1.9z"/></svg>
              </a>
            </div>
            <div className="mt-8 relative h-44 overflow-hidden border border-white/10">
              <img src={heroAthlete} alt="Trident Fitness building, Campus Road, Ghorahi" loading="lazy" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold">Campus Road, Ghorahi-10, Dang</span>
              </div>
            </div>
          </motion.div>

          <motion.form initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you! We'll be in touch shortly.");
              setName("");
              setPhone("");
              setEmail("");
              setMessage("");
            }}
            className="bg-background border border-white/10 p-8 md:p-10">
            <h3 className="font-display text-3xl text-white mb-6 tracking-wider">SEND A MESSAGE</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Name" value={name} onChange={setName} placeholder="Your name" />
              <Field label="Phone" value={phone} onChange={setPhone} placeholder="+977 ..." />
            </div>
            <div className="mt-4"><Field label="Email" value={email} onChange={setEmail} placeholder="you@email.com" /></div>
            <div className="mt-4">
              <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">Message</label>
              <textarea rows={5} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="I want to know more about..." className="w-full bg-surface border border-white/15 px-4 py-3.5 text-white placeholder:text-white/30 focus:border-primary outline-none resize-none" />
            </div>
            <button className="mt-6 w-full gradient-red text-white font-bold tracking-widest uppercase py-4 shadow-red-glow hover:scale-[1.01] transition">
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="bg-[#050505] border-t-4 border-primary relative">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <span className="text-primary"><TridentLogo className="h-11 w-11" /></span>
            <div className="font-display text-3xl tracking-wider"><span className="text-primary">TRI</span><span className="text-white">DENT</span> <span className="text-gold text-base align-top">FITNESS</span></div>
          </div>
          <p className="mt-5 text-white/60 max-w-md leading-relaxed">
            Transform. Achieve. Dominate. Ghorahi's most premium fitness experience under one roof — Gym, Sauna, Steam, Jacuzzi, Zumba, Cardio & Rooftop Café.
          </p>
          <p className="mt-4 text-gold text-sm">🇳🇵 Proudly serving the people of Ghorahi.</p>
        </div>
        <div>
          <h4 className="font-display text-xl text-white tracking-widest mb-5">QUICK LINKS</h4>
          <ul className="space-y-2.5 text-white/60 text-sm">
            {NAV.map(([l, h]) => <li key={h}><a href={h} className="hover:text-primary transition">{l}</a></li>)}
          </ul>
        </div>
        <div>
          <h4 className="font-display text-xl text-white tracking-widest mb-5">CONTACT</h4>
          <ul className="space-y-3 text-white/60 text-sm">
            <li className="flex gap-2"><MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" /> Campus Road, Ghorahi-10, Dang, Nepal</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" /> +977 970-5534334</li>
            <li className="flex gap-2 break-all"><Mail className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" /> tridentfitness.ghorahi@gmail.com</li>
          </ul>
          <div className="flex gap-3 mt-5">
            <a href="https://www.facebook.com/tridentfitnessghorahi/" target="_blank" rel="noreferrer" className="h-9 w-9 bg-surface flex items-center justify-center hover:bg-primary transition"><Facebook className="h-4 w-4 text-white" /></a>
            <a href="https://tiktok.com/@trident_fitness.ghorahi" target="_blank" rel="noreferrer" className="h-9 w-9 bg-surface flex items-center justify-center hover:bg-primary transition">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white"><path d="M19.5 7.4a6.3 6.3 0 0 1-3.7-1.2v8.5a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v2.9a2.7 2.7 0 1 0 1.9 2.6V2h2.8a3.5 3.5 0 0 0 3.7 3.5v1.9z"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-3 text-white/40 text-xs">
          <div>© 2025 Trident Fitness Pvt. Ltd. · Campus Road, Ghorahi, Nepal · All Rights Reserved</div>
          <div className="flex items-center gap-2"><Flame className="h-3.5 w-3.5 text-primary" /> Best in Dang Province</div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- HELPERS ---------------- */
function SectionTitle({ eyebrow, title, center = false }: { eyebrow: string; title: string; center?: boolean }) {
  return (
    <div className={center ? "text-center" : ""}>
      <div className={`inline-flex items-center gap-2 mb-4 ${center ? "" : ""}`}>
        {center && <span className="h-px w-10 bg-primary" />}
        <span className="text-primary font-bold text-xs tracking-[0.3em] uppercase">{eyebrow}</span>
        {center && <span className="h-px w-10 bg-primary" />}
      </div>
      <h2 className={`font-display text-5xl md:text-6xl text-white tracking-wide ${center ? "red-underline" : "red-underline-left"}`}>{title}</h2>
    </div>
  );
}
