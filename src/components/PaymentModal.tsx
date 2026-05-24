import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Shield, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { TridentLogo } from "./TridentLogo";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  planPrice: number;
}

type Method = "esewa" | "khalti" | null;

const ESEWA = "#60BB46";
const KHALTI = "#5C2D91";

function Confetti({ color }: { color: string }) {
  const pieces = Array.from({ length: 40 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 0.3;
        const dur = 1.4 + Math.random() * 1.2;
        const rot = Math.random() * 360;
        const c = i % 3 === 0 ? "#E01E37" : i % 3 === 1 ? color : "#FFFFFF";
        return (
          <motion.span
            key={i}
            initial={{ y: -20, opacity: 1, rotate: 0 }}
            animate={{ y: 600, opacity: 0, rotate: rot }}
            transition={{ duration: dur, delay, ease: "easeOut" }}
            className="absolute top-0 w-2 h-3 rounded-sm"
            style={{ left: `${left}%`, background: c }}
          />
        );
      })}
    </div>
  );
}

function ESewaLogo({ size = 18 }: { size?: number }) {
  return (
    <div className="bg-white rounded-md px-2 py-1 inline-flex items-center gap-1.5">
      <span className="rounded-full" style={{ width: size * 0.7, height: size * 0.7, background: ESEWA }} />
      <span className="font-extrabold tracking-tight" style={{ color: ESEWA, fontSize: size * 0.85 }}>eSewa</span>
    </div>
  );
}

function KhaltiLogo({ size = 18 }: { size?: number }) {
  return (
    <div className="bg-white rounded-md px-2 py-1 inline-flex items-center gap-1.5">
      <span className="rotate-45 inline-block" style={{ width: size * 0.6, height: size * 0.6, background: KHALTI }} />
      <span className="font-extrabold tracking-tight" style={{ color: KHALTI, fontSize: size * 0.85 }}>Khalti</span>
    </div>
  );
}

export default function PaymentModal({ isOpen, onClose, planName, planPrice }: PaymentModalProps) {
  const [method, setMethod] = useState<Method>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ref] = useState(() => Math.floor(100000 + Math.random() * 900000));

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setMethod(null);
      setName("");
      setPhone("");
      setEmail("");
      setErrors({});
      setLoading(false);
      setSuccess(false);
    }
  }, [isOpen, planName]);

  const validate = () => {
    const e: typeof errors = {};
    if (!name.trim()) e.name = "Name is required";
    if (!/^98\d{8}$/.test(phone)) e.phone = "Enter a valid 10-digit number starting with 98";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePay = () => {
    if (!method || !validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  const methodColor = method === "esewa" ? ESEWA : method === "khalti" ? KHALTI : "#333";
  const methodName = method === "esewa" ? "eSewa" : method === "khalti" ? "Khalti" : "";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.85, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full sm:w-[480px] sm:max-w-[480px] max-h-[92vh] overflow-y-auto rounded-t-[20px] sm:rounded-2xl"
            style={{
              background: "#111111",
              border: "1px solid #2a2a2a",
              boxShadow: "0 0 60px rgba(224,30,55,0.25), 0 25px 80px rgba(0,0,0,0.6)",
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)",
              backgroundSize: "4px 4px",
            }}
          >
            {/* Red top stripe */}
            <div className="h-[3px] w-full" style={{ background: "#E01E37" }} />

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-5 right-4 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-[#E01E37] flex items-center justify-center transition"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-white" />
            </button>

            {!success ? (
              <div>
                {/* Header */}
                <div className="px-5 py-4 flex items-center justify-between border-b" style={{ background: "#1a1a1a", borderColor: "#2a2a2a" }}>
                  <div className="flex items-center gap-2.5">
                    <TridentLogo className="w-7 h-7 text-[#E01E37]" />
                    <span className="text-white font-bold text-sm">Trident Fitness Pvt. Ltd.</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-full" style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.35)" }}>
                    <Lock className="w-3 h-3" style={{ color: "#22c55e" }} />
                    <span className="text-[10px] font-bold tracking-wider" style={{ color: "#22c55e" }}>SECURE</span>
                  </div>
                </div>

                {/* Plan summary */}
                <div className="px-5 pt-5">
                  <div className="rounded-xl p-3 flex items-center justify-between" style={{ background: "#1e1e1e" }}>
                    <div>
                      <div className="text-white font-bold text-base">{planName}</div>
                      <div className="text-white/50 text-xs">Monthly Membership</div>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-3xl font-bold" style={{ color: "#E01E37" }}>
                        Rs. {planPrice.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="my-4 border-t border-dashed" style={{ borderColor: "rgba(224,30,55,0.35)" }} />
                </div>

                {/* Payment methods */}
                <div className="px-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-1 h-4 rounded-sm" style={{ background: "#E01E37" }} />
                    <h4 className="text-white text-sm font-semibold">Choose Payment Method</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(["esewa", "khalti"] as const).map((m) => {
                      const selected = method === m;
                      const c = m === "esewa" ? ESEWA : KHALTI;
                      const bg = selected ? (m === "esewa" ? "#0a1f0f" : "#120a1f") : "#1a1a1a";
                      return (
                        <button
                          key={m}
                          onClick={() => setMethod(m)}
                          className="relative rounded-xl p-4 text-left transition-all duration-200 min-h-[88px] hover:brightness-125"
                          style={{
                            background: bg,
                            border: `${selected ? 2 : 1.5}px solid ${selected ? c : "#2a2a2a"}`,
                            boxShadow: selected ? `0 0 20px ${c}55` : "none",
                          }}
                        >
                          {selected && (
                            <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: c }}>
                              <CheckCircle2 className="w-4 h-4 text-white" />
                            </span>
                          )}
                          {m === "esewa" ? <ESewaLogo /> : <KhaltiLogo />}
                          <div className="text-white/50 text-xs mt-2">Digital Wallet</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Form */}
                <div className="px-5 pt-5 space-y-3">
                  {[
                    { label: "Full Name", value: name, set: setName, ph: "Sanjay Khatri", err: errors.name, type: "text" },
                    { label: "Phone Number", value: phone, set: setPhone, ph: "+977 98XXXXXXXX", err: errors.phone, type: "tel" },
                  ].map((f) => (
                    <div key={f.label}>
                      <label className="text-white text-xs font-medium mb-1.5 block">{f.label}</label>
                      <input
                        type={f.type}
                        inputMode={f.type === "tel" ? "numeric" : undefined}
                        value={f.value}
                        onChange={(e) => f.set(e.target.value)}
                        placeholder={f.ph}
                        className="w-full px-3.5 py-3 rounded-lg text-white text-sm outline-none transition-all focus:shadow-[0_0_0_3px_rgba(224,30,55,0.15)]"
                        style={{
                          background: "#1e1e1e",
                          border: `1px solid ${f.err ? "#E01E37" : "#2a2a2a"}`,
                        }}
                        onFocus={(e) => !f.err && (e.currentTarget.style.borderColor = "#E01E37")}
                        onBlur={(e) => !f.err && (e.currentTarget.style.borderColor = "#2a2a2a")}
                      />
                      {f.err && <div className="text-[#E01E37] text-xs mt-1">{f.err}</div>}
                    </div>
                  ))}
                  <div>
                    <label className="text-white text-xs font-medium mb-1.5 block">
                      Email Address <span className="text-white/40 ml-1">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full px-3.5 py-3 rounded-lg text-white text-sm outline-none"
                      style={{ background: "#1e1e1e", border: "1px solid #2a2a2a" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#E01E37")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#2a2a2a")}
                    />
                  </div>
                </div>

                {/* Trust badges */}
                <div className="px-5 py-4 flex items-center justify-center gap-3 text-[11px] text-white/50">
                  <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> SSL Secured</span>
                  <span className="text-white/20">•</span>
                  <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> 100% Safe</span>
                  <span className="text-white/20">•</span>
                  <span className="flex items-center gap-1">🇳🇵 Nepal Verified</span>
                </div>

                {/* Pay button */}
                <div className="px-5 pb-5">
                  <button
                    onClick={handlePay}
                    disabled={!method || loading}
                    className="w-full h-[52px] rounded-xl flex items-center justify-center gap-2 text-white font-bold text-base transition-all duration-200"
                    style={{
                      background:
                        method === "esewa"
                          ? "linear-gradient(135deg,#3d9e32,#60BB46)"
                          : method === "khalti"
                          ? "linear-gradient(135deg,#4a1f7a,#5C2D91)"
                          : "#333",
                      opacity: !method ? 0.4 : 1,
                      cursor: !method ? "not-allowed" : "pointer",
                      boxShadow: method ? `0 8px 24px ${methodColor}55` : "none",
                    }}
                    onMouseEnter={(e) => method && (e.currentTarget.style.transform = "scale(1.02)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        {method === "esewa" && <ESewaLogo size={14} />}
                        {method === "khalti" && <KhaltiLogo size={14} />}
                        <span>
                          Pay Rs. {planPrice.toLocaleString()}
                          {methodName && ` via ${methodName}`}
                        </span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative px-6 py-10 text-center"
              >
                <Confetti color={methodColor} />
                <motion.svg
                  width="84"
                  height="84"
                  viewBox="0 0 84 84"
                  className="mx-auto mb-5"
                >
                  <motion.circle
                    cx="42" cy="42" r="38"
                    fill="none" stroke="#22c55e" strokeWidth="4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.path
                    d="M26 44 L38 56 L60 32"
                    fill="none" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  />
                </motion.svg>
                <h3 className="text-white font-bold text-[22px] mb-2">Payment Initiated!</h3>
                <p className="text-white/60 text-sm max-w-[340px] mx-auto">
                  You will be redirected to {methodName} to complete your payment securely.
                </p>
                <div className="mt-5 mx-auto max-w-[300px] rounded-xl p-3" style={{ background: "#1a1a1a", border: "1px solid #2a2a2a" }}>
                  <div className="text-white font-semibold text-sm">{planName} — Rs. {planPrice.toLocaleString()}/month</div>
                  <div className="text-xs mt-1" style={{ color: "#22c55e" }}>Ref: TF-{ref}</div>
                </div>
                <button
                  onClick={onClose}
                  className="mt-6 px-8 py-3 rounded-xl text-white font-bold tracking-wider uppercase text-sm"
                  style={{ background: "#E01E37", boxShadow: "0 8px 24px rgba(224,30,55,0.4)" }}
                >
                  Done
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
