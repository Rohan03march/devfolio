import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  ShieldCheck,
  Layers,
  Cpu,
  Globe,
  CreditCard,
  Clock,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Terminal,
  Activity,
  Smartphone,
  Laptop,
  Box
} from 'lucide-react';

const pricingData = {
  web: [
    {
      name: "Starter Web",
      range: "₹50,000 – ₹80,000",
      duration: "1–2 weeks",
      description: "Ideal for professional landing pages and conversion-focused business sites.",
      features: [
        "Responsive SEO-Optimized Website",
        "React/Vite Performance Stack",
        "Contact Forms & Lead Generation",
        "User Analytics Integration",
        "Basic Admin Panel",
        "Cloud Deployment (Vercel/AWS)",
        "Post-delivery Support"
      ],
      samples: ["Portfolio Sites", "Landing Pages", "Business Info Sites", "Simple Blogs"],
      icon: <Globe size={24} />
    },
    {
      name: "Professional Web",
      range: "₹80,000 – ₹1,50,000",
      duration: "3–5 weeks",
      description: "Scalable web applications with complex logic and database integrations.",
      features: [
        "Advanced Management Dashboards",
        "Full E-commerce Checkout Flow",
        "Secure Payment Gateways",
        "Custom Database Architecture",
        "Role-based User Access",
        "Interactive UI Animations",
        "API Third-party Integrations"
      ],
      samples: ["Rental Portals", "Inventory Systems", "Booking Platforms", "E-commerce Stores"],
      popular: true,
      icon: <Layers size={24} />
    },
    {
      name: "Advanced SaaS",
      range: "₹1,50,000 – ₹3,00,000",
      duration: "6–10 weeks",
      description: "Enterprise-grade SaaS platforms built for high-scale performance.",
      features: [
        "Full-stack Multi-tenant SaaS",
        "Automated Billing & Subscriptions",
        "Real-time Data Processing",
        "AI/ML API Integrations",
        "Advanced Security Audits",
        "Microservices Architecture",
        "Technical Documentation"
      ],
      samples: ["SaaS Product Platforms", "Complex CRM Systems", "Social Media Engines", "Financial Tools"],
      icon: <Cpu size={24} />
    }
  ],
  mobile: [
    {
      name: "Basic App",
      range: "₹70,000 – ₹1,20,000",
      duration: "2–4 weeks",
      description: "User-friendly mobile applications focused on core utility and performance.",
      features: [
        "iOS & Android (Cross-platform)",
        "React Native / Expo Workflow",
        "Smooth Interface Transitions",
        "Push Notification System",
        "Social Login Integration",
        "App Store Submission Support",
        "Basic Cache Optimization"
      ],
      samples: ["Utility Apps", "Educational Apps", "Lifestyle Trackers", "Basic Social Apps"],
      icon: <Smartphone size={24} />
    },
    {
      name: "Pro Mobile App",
      range: "₹1,20,000 – ₹2,50,000",
      duration: "5–8 weeks",
      description: "High-performance apps with complex offline capabilities and custom logic.",
      features: [
        "Native Device API Integration",
        "Advanced State Management",
        "Complex Backend Sync Engine",
        "Real-time Chat & Updates",
        "Custom Animated UI/UX",
        "In-app Purchase Systems",
        "Advanced Performance Tuning"
      ],
      samples: ["Delivery Apps", "Fintech Solutions", "Service Marketplaces", "Healthcare Apps"],
      popular: true,
      icon: <Smartphone size={24} />
    },
    {
      name: "Advanced Mobile",
      range: "₹2,50,000 – ₹4,00,000",
      duration: "8–12 weeks",
      description: "Large-scale mobile ecosystems with proprietary features and high security.",
      features: [
        "High-Security Data Encryption",
        "Enterprise-grade Scalability",
        "Offline-First Architecture",
        "Custom Payment Gateways",
        "Advanced AI Integration",
        "Multi-language Support",
        "Long-term Strategy Planning"
      ],
      samples: ["Enterprise Mobile Tools", "Complex Social Platforms", "Streaming Apps", "B2B Ecosystems"],
      icon: <Cpu size={24} />
    }
  ],
  hybrid: [
    {
      name: "Full Ecosystem",
      range: "₹3,00,000 – ₹5,00,000",
      duration: "10–16 weeks",
      description: "Complete digital ecosystem including Web Platform + Mobile Application.",
      features: [
        "Unified Centralized Backend",
        "Synchronized Web Dashboard",
        "React Native Mobile (iOS/Android)",
        "Cross-platform User Experience",
        "Automated Cloud Infrastructure",
        "Advanced Security Suite",
        "Performance Monitoring Tools"
      ],
      samples: ["Full Startup Product Launch", "Managed Business Ecosystems", "Sync-heavy Platforms"],
      popular: true,
      icon: <Box size={24} />
    },
    {
      name: "Enterprise Solutions",
      range: "₹5,00,000+",
      duration: "Long-term",
      description: "Custom high-scale systems built for companies and full product cycles.",
      features: [
        "Scalable Microservices",
        "AI/Automation Workflows",
        "Analytics & BI Integration",
        "Web + Multi-platform Apps",
        "Dedicated System Maintenance",
        "Legacy Migration Support",
        "Consultancy & Growth Roadmap"
      ],
      samples: ["Total Digital Transformation", "High-scale SaaS Infrastructure", "AI-driven Ecosystems"],
      icon: <Terminal size={24} />
    }
  ]
};

const FreelancePage = () => {
  const [activeCategory, setActiveCategory] = useState('web');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="freelance-page" style={{
      background: '#010103',
      minHeight: '100vh',
      color: '#fff',
      paddingTop: '100px',
      paddingBottom: '100px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Ambience */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        height: '60%',
        background: 'radial-gradient(circle, rgba(0, 245, 255, 0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="mono" style={{ color: '#00f5ff', fontSize: '0.8rem', display: 'block', marginBottom: '1rem' }}>
              [ SYSTEM.ACCESS // FREELANCE_MOD ]
            </span>
            <h1 className="text-glow" style={{
              fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
              fontWeight: 900,
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em',
              lineHeight: 1
            }}>
              PRICING <span style={{ color: '#00f5ff' }}>HIERARCHY</span>
            </h1>
            <p style={{
              maxWidth: '800px',
              margin: '0 auto',
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '1.1rem',
              lineHeight: 1.6
            }}>
              Select your development trajectory. Specialist solutions for <span style={{ color: '#00f5ff', fontWeight: 700 }}>Mobile, Web,</span> or
              <span style={{ color: '#00f5ff', fontWeight: 700 }}> Complete Ecosystems</span>.
              Transparent pricing scaled for performance and complexity.
            </p>
          </motion.div>
        </div>

        {/* Category Switcher Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '5rem',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          {['web', 'mobile', 'hybrid'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="hologram-card technical-border mono"
              style={{
                padding: '1rem 2.5rem',
                fontSize: '0.8rem',
                fontWeight: 800,
                background: activeCategory === cat ? 'rgba(0, 245, 255, 0.2)' : 'rgba(8, 8, 12, 0.4)',
                color: activeCategory === cat ? '#00f5ff' : 'rgba(255, 255, 255, 0.4)',
                border: activeCategory === cat ? '1px solid #00f5ff' : '1px solid rgba(0, 245, 255, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem'
              }}
            >
              {cat === 'web' && <Laptop size={18} />}
              {cat === 'mobile' && <Smartphone size={18} />}
              {cat === 'hybrid' && <Box size={18} />}
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Pricing Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="grid-responsive"
            style={{ marginBottom: '6rem' }}
          >
            {pricingData[activeCategory].map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="hologram-card technical-border"
                style={{
                  padding: '2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  background: plan.popular ? 'rgba(0, 245, 255, 0.03)' : 'rgba(8, 8, 12, 0.4)',
                  borderColor: plan.popular ? 'rgba(0, 245, 255, 0.3)' : 'rgba(0, 245, 255, 0.1)',
                  boxShadow: plan.popular ? '0 0 30px rgba(0, 245, 255, 0.1)' : 'none'
                }}
              >
                {plan.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: '#00f5ff',
                    color: '#000',
                    padding: '0.2rem 0.6rem',
                    fontSize: '0.6rem',
                    fontWeight: 900,
                    borderRadius: '2px',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    RECOMMENDED
                  </div>
                )}

                <div style={{ color: '#00f5ff', marginBottom: '1.5rem' }}>
                  {plan.icon}
                </div>

                <h3 className="mono" style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#fff' }}>
                  {plan.name}
                </h3>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#00f5ff' }}>
                    {plan.range}
                  </div>
                  <div className="mono" style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.4)', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Clock size={12} /> {plan.duration}
                  </div>
                </div>

                <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '2rem', minHeight: '3.6rem' }}>
                  {plan.description}
                </p>

                <div style={{ flexGrow: 1, marginBottom: '2.5rem' }}>
                  <div className="mono" style={{ fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '1rem' }}>
                    // INCLUDED_SYSTEMS
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem' }}>
                    {plan.features.map((feature, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'start', gap: '0.7rem', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                        <CheckCircle2 size={16} style={{ color: '#00f5ff', flexShrink: 0, marginTop: '0.1rem' }} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mono" style={{ fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '1rem' }}>
                    // SAMPLE_PROJECTS
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {plan.samples.map((sample, i) => (
                      <span key={i} style={{
                        fontSize: '0.7rem',
                        background: 'rgba(0, 245, 255, 0.05)',
                        padding: '0.3rem 0.6rem',
                        borderRadius: '2px',
                        color: 'rgba(0, 245, 255, 0.7)',
                        border: '1px solid rgba(0, 245, 255, 0.1)'
                      }}>
                        {sample}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Process & Policy Section */}
        <div className="grid-responsive" style={{ gap: '2rem' }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="hologram-card technical-border"
            style={{ padding: '2.5rem', background: 'rgba(2, 2, 4, 0.6)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', color: '#00f5ff' }}>
              <Activity size={24} />
              <h3 className="mono" style={{ margin: 0 }}>Workflow_Protocol</h3>
            </div>
            <p style={{ color: 'rgba(255, 255, 255, 0.6)', lineHeight: 1.8, fontSize: '0.95rem' }}>
              Every project follows a defined sequence: <br />
              <span style={{ color: '#fff' }}>01. Requirements Analysis & Scope Definition</span><br />
              <span style={{ color: '#fff' }}>02. Architecture Planning & UX Design</span><br />
              <span style={{ color: '#fff' }}>03. Core Development & System Integration</span><br />
              <span style={{ color: '#fff' }}>04. Testing, Optimization & Debugging</span><br />
              <span style={{ color: '#fff' }}>05. Production Deployment & Documentation</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="hologram-card technical-border"
            style={{ padding: '2.5rem', background: 'rgba(2, 2, 4, 0.6)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', color: '#00f5ff' }}>
              <CreditCard size={24} />
              <h3 className="mono" style={{ margin: 0 }}>Payment_Architecture</h3>
            </div>
            <p style={{ color: 'rgba(255, 255, 255, 0.6)', lineHeight: 1.8, fontSize: '0.95rem' }}>
              Typically, the payment structure is <span style={{ color: '#00f5ff', fontWeight: 700 }}>50% advance</span> to begin development and the remaining amount before final delivery.
              Any additional features requested beyond the agreed scope will be quoted separately.
              Support and maintenance after delivery is provided based on the specific project tier.
            </p>
          </motion.div>
        </div>

        {/* Info Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          style={{
            marginTop: '4rem',
            padding: '1.5rem',
            background: 'rgba(255, 255, 255, 0.02)',
            borderLeft: '4px solid #00f5ff',
            fontSize: '0.9rem',
            color: 'rgba(255, 255, 255, 0.5)',
            fontFamily: 'var(--font-mono)'
          }}
        >
          [SYSTEM_MESSAGE]: Project timelines, final pricing, and deliverables are always defined clearly before starting the project to ensure technical alignment.
        </motion.div>
      </div>

      {/* Decorative Scanlines */}
      <div className="scanner-line" />
    </div>
  );
};

export default FreelancePage;
