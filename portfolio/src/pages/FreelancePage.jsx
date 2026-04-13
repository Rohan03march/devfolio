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
  HelpCircle,
  Box
} from 'lucide-react';

const pricingData = {
  web: [
    {
      name: "Starter Web",
      range: "₹25,000 – ₹45,000",
      duration: "10 – 20 Days",
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
      monthlyBreakdown: [
        { month: "Phase 1", focus: "Design, Frontend & Hosting" }
      ],
      icon: <Globe size={24} />
    },
    {
      name: "Professional Web",
      range: "₹50,000 – ₹85,000",
      duration: "4 – 8 Weeks",
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
      monthlyBreakdown: [
        { month: "Phase 1", focus: "Core Architecture & Backend" },
        { month: "Phase 2", focus: "Frontend, API & Beta Testing" }
      ],
      popular: true,
      icon: <Layers size={24} />
    },
    {
      name: "Advanced SaaS",
      range: "₹90,000 – ₹1,50,000+",
      duration: "3 – 5 Months",
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
      monthlyBreakdown: [
        { month: "Phase 1", focus: "Discovery & Infrastructure" },
        { month: "Phase 2", focus: "Module Development & API" },
        { month: "Phase 3+", focus: "Scale Tuning & Deployment" }
      ],
      icon: <Cpu size={24} />
    }
  ],
  mobile: [
    {
      name: "Basic App",
      range: "₹35,000 – ₹60,000",
      duration: "3 – 4 Weeks",
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
      monthlyBreakdown: [
        { month: "Phase 1", focus: "UI/UX & Core Functionality" }
      ],
      icon: <Smartphone size={24} />
    },
    {
      name: "Pro Mobile App",
      range: "₹70,000 – ₹1,20,000",
      duration: "8 – 12 Weeks",
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
      monthlyBreakdown: [
        { month: "Phase 1", focus: "Feature Set A & API Sync" },
        { month: "Phase 2", focus: "Feature Set B & UI Polish" }
      ],
      popular: true,
      icon: <Smartphone size={24} />
    },
    {
      name: "Advanced Mobile",
      range: "₹1,30,000 – ₹2,20,000+",
      duration: "5 – 7 Months",
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
      monthlyBreakdown: [
        { month: "Phase 1-2", focus: "Native APIs & Core Logic" },
        { month: "Phase 3-4", focus: "Encryption & Enterprise Sync" }
      ],
      icon: <Cpu size={24} />
    }
  ],
  hybrid: [
    {
      name: "Full Ecosystem",
      range: "₹1,50,000 – ₹2,80,000+",
      duration: "6 – 10 Months",
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
      monthlyBreakdown: [
        { month: "Phase 1-3", focus: "Unified Backend & Web" },
        { month: "Phase 4-6", focus: "Mobile Apps & Ecosystem Sync" }
      ],
      popular: true,
      icon: <Box size={24} />
    },
    {
      name: "Enterprise Solutions",
      range: "₹3,50,000+",
      duration: "6+ Months (Custom)",
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
      monthlyBreakdown: [
        { month: "Milestones", focus: "Dedicated Support & Roadmap" }
      ],
      icon: <Terminal size={24} />
    }
  ]
};

const FreelancePage = () => {
  const [activeCategory, setActiveCategory] = useState('web');
  const [selectedPlan, setSelectedPlan] = useState(pricingData.web[0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setSelectedPlan(pricingData[activeCategory][0]);
  }, [activeCategory]);

  const getLowerLimit = (range) => {
    return range.split('–')[0].trim();
  };

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
              PROJECT <span style={{ color: '#00f5ff' }}>PRICING</span>
            </h1>
            <p style={{
              maxWidth: '800px',
              margin: '0 auto',
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '1.1rem',
              lineHeight: 1.6
            }}>
              Choose the right development path for your business. From individual apps to full ecosystems.
              <br />
              <span style={{ color: 'rgba(0, 245, 255, 0.8)', fontWeight: 700 }}>One-Time Project Costs</span> — Milestone-based payments with zero monthly fees.
            </p>

            {/* Core Principles Row */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              marginTop: '3.5rem',
              flexWrap: 'wrap'
            }}>
              {[
                { icon: <ShieldCheck size={20} />, title: "FIXED BUDGET", desc: "Know the total cost upfront" },
                { icon: <Activity size={20} />, title: "PROGRESS PAYMENTS", desc: "Pay only as we hit goals" },
                { icon: <Layers size={20} />, title: "FEATURE-DRIVEN", desc: "Price scales with complexity" }
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem 1.5rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px'
                }}>
                  <div style={{ color: '#00f5ff' }}>{item.icon}</div>
                  <div style={{ textAlign: 'left' }}>
                    <div className="mono" style={{ fontSize: '0.75rem', fontWeight: 800, color: '#fff' }}>{item.title}</div>
                    <div style={{ fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.4)' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* How it Works: The Simple 5-Step Process */}
        <div style={{ marginBottom: '6rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="mono" style={{ fontSize: '1.2rem', color: '#00f5ff', letterSpacing: '0.2em' }}>
              HOW_IT_WORKS
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.9rem' }}>A simple, transparent path from idea to launch.</p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1.5rem',
            position: 'relative'
          }}>
            {[
              { id: "01", title: "Discovery", desc: "We discuss your features and requirements." },
              { id: "02", title: "Fixed Quote", desc: "You get a total project price (no strings)." },
              { id: "03", title: "50% Deposit", desc: "We start building immediately." },
              { id: "04", title: "Milestones", desc: "You review work in stages." },
              { id: "05", title: "Final Launch", desc: "Pay balance and go live!" }
            ].map((step, i) => (
              <div key={i} className="hologram-card technical-border" style={{ padding: '1.5rem', background: 'rgba(255, 255, 255, 0.02)' }}>
                <div className="mono" style={{ color: '#00f5ff', fontSize: '1.2rem', fontWeight: 900, marginBottom: '0.5rem' }}>{step.id}</div>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#fff' }}>{step.title}</h4>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.5)', margin: 0, lineHeight: 1.5 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Category Switcher Tabs */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '5rem'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '2rem'
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
                {cat === 'hybrid' ? 'WEB + MOBILE' : cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Static High-Contrast Banner */}
          <div className="mono" style={{
            background: 'linear-gradient(90deg, #00f5ff 0%, #00d2ff 100%)',
            padding: '0.82rem 2.5rem',
            borderRadius: '100px',
            fontSize: '0.75rem',
            fontWeight: 900,
            color: '#000',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            boxShadow: '0 0 40px rgba(0, 245, 255, 0.3)'
          }}>
            <ShieldCheck size={16} />
            FIXED PROJECT QUOTES: NO MONTHLY FEES, NO HIDDEN COSTS.
          </div>
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
                onClick={() => setSelectedPlan(plan)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: selectedPlan.name === plan.name ? 1.02 : 1,
                  borderColor: selectedPlan.name === plan.name ? '#00f5ff' : plan.popular ? 'rgba(0, 245, 255, 0.3)' : 'rgba(0, 245, 255, 0.1)'
                }}
                whileHover={{ scale: selectedPlan.name === plan.name ? 1.02 : 1.01 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="hologram-card technical-border"
                style={{
                  padding: '2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  background: selectedPlan.name === plan.name ? 'rgba(0, 245, 255, 0.05)' : plan.popular ? 'rgba(0, 245, 255, 0.03)' : 'rgba(8, 8, 12, 0.4)',
                  boxShadow: selectedPlan.name === plan.name ? '0 0 30px rgba(0, 245, 255, 0.2)' : plan.popular ? '0 0 30px rgba(0, 245, 255, 0.1)' : 'none',
                  cursor: 'pointer',
                  position: 'relative'
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
                  <div className="mono" style={{ fontSize: '0.65rem', color: 'rgba(0, 245, 255, 0.5)', marginBottom: '0.3rem', letterSpacing: '0.05em' }}>
                    // INVESTMENT_RANGE
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#00f5ff' }}>
                    {plan.range}
                  </div>
                  <div className="mono" style={{ fontSize: '0.6rem', color: 'rgba(255, 255, 255, 0.3)', marginTop: '0.2rem' }}>
                    TOTAL PROJECT COST
                  </div>
                  <div className="mono" style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.4)', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Clock size={12} /> DELIVERY GOAL: {plan.duration}
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

                  <div className="mono" style={{ fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '1.2rem' }}>
                    // PROJECT_MILESTONES
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {plan.monthlyBreakdown.map((item, i) => (
                      <div key={i} style={{
                        position: 'relative',
                        paddingLeft: '1.8rem',
                        borderLeft: i === plan.monthlyBreakdown.length - 1 ? 'none' : '1px dashed rgba(0, 245, 255, 0.2)',
                        paddingBottom: i === plan.monthlyBreakdown.length - 1 ? '0' : '1.5rem'
                      }}>
                        <div style={{
                          position: 'absolute',
                          left: '-6px',
                          top: '0',
                          width: '11px',
                          height: '11px',
                          borderRadius: '50%',
                          background: '#010103',
                          border: '2px solid #00f5ff',
                          zIndex: 1
                        }} />
                        <span className="mono" style={{ color: '#00f5ff', fontWeight: 800, display: 'block', fontSize: '0.7rem', marginBottom: '0.2rem' }}>{item.month}:</span>
                        <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.8rem', lineHeight: 1.4 }}>{item.focus}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mono" style={{ fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.4)', marginTop: '2rem', marginBottom: '1rem' }}>
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

        {/* Pricing Model FAQ Section */}
        <div className="grid-responsive" style={{ gap: '2rem' }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="hologram-card technical-border"
            style={{ padding: '2.5rem', background: 'rgba(2, 2, 4, 0.6)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', color: '#00f5ff' }}>
              <HelpCircle size={24} />
              <h3 className="mono" style={{ margin: 0 }}>Model_Clarification_FAQ</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <div className="mono" style={{ color: '#00f5ff', fontSize: '0.75rem', marginBottom: '0.4rem' }}>Q: Is this a monthly subscription?</div>
                <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  NO. All prices shown are for the <span style={{ color: '#fff' }}>TOTAL project</span>. You pay for the completed product, not for the time spent every month.
                </div>
              </div>
              <div>
                <div className="mono" style={{ color: '#00f5ff', fontSize: '0.75rem', marginBottom: '0.4rem' }}>Q: Why is there a price range?</div>
                <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  Final cost depends on <span style={{ color: '#fff' }}>features and complexity</span>. A simple app is ₹X, while an app with AI and custom dashboards is ₹Y.
                </div>
              </div>
              <div>
                <div className="mono" style={{ color: '#00f5ff', fontSize: '0.75rem', marginBottom: '0.4rem' }}>Q: Who owns the final codebase?</div>
                <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  <span style={{ color: '#fff' }}>You do.</span> Upon final payment, 100% of the Intellectual Property and raw code is transferred to your organization.
                </div>
              </div>
              <div>
                <div className="mono" style={{ color: '#00f5ff', fontSize: '0.75rem', marginBottom: '0.4rem' }}>Q: Is Fixed-Price better than Hourly?</div>
                <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  YES. Hourly billing lead to surprise costs. Fixed quotes give you <span style={{ color: '#fff' }}>100% budget certainty</span> from day one.
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="hologram-card technical-border"
            style={{ padding: '2.5rem', background: 'rgba(2, 2, 4, 0.6)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', color: '#00f5ff' }}>
              <Activity size={24} />
              <h3 className="mono" style={{ margin: 0 }}>Milestone_Protocol</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <div className="mono" style={{ color: '#00f5ff', fontSize: '0.75rem', marginBottom: '0.4rem' }}>Q: When do payments happen?</div>
                <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  Our standard protocol is <span style={{ color: '#fff' }}>50% upfront</span> to initiate. The remaining <span style={{ color: '#fff' }}>50% is milestone-based</span>, paid as deliverables are approved.
                </div>
              </div>
              <div>
                <div className="mono" style={{ color: '#00f5ff', fontSize: '0.75rem', marginBottom: '0.4rem' }}>Q: What if the scope changes?</div>
                <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  Significant feature additions result in a <span style={{ color: '#fff' }}>scope revision</span> and a corresponding update to the project estimate.
                </div>
              </div>
              <div>
                <div className="mono" style={{ color: '#00f5ff', fontSize: '0.75rem', marginBottom: '0.4rem' }}>Q: How do we track progress?</div>
                <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  We provide <span style={{ color: '#fff' }}>Weekly Syncs</span> and a private Staging URL where you can test the live progress of your build.
                </div>
              </div>
              <div>
                <div className="mono" style={{ color: '#00f5ff', fontSize: '0.75rem', marginBottom: '0.4rem' }}>Q: Is there post-launch support?</div>
                <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  YES. Every project includes a <span style={{ color: '#fff' }}>30-day maintenance window</span> to fix any bugs and ensure a smooth transition.
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Clarification Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          style={{
            marginTop: '4rem',
            padding: '2.5rem',
            background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.05) 0%, rgba(0, 245, 255, 0.01) 100%)',
            border: '1px solid rgba(0, 245, 255, 0.2)',
            borderRadius: '12px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '4px',
            height: '100%',
            background: '#00f5ff'
          }} />
          
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'start' }}>
            <div style={{ 
              background: 'rgba(0, 245, 255, 0.1)', 
              padding: '0.8rem', 
              borderRadius: '8px',
              color: '#00f5ff'
            }}>
              <ShieldCheck size={28} />
            </div>
            <div style={{ flex: 1 }}>
              <h4 className="mono" style={{ color: '#00f5ff', margin: '0 0 1rem 0', fontSize: '1.1rem', letterSpacing: '0.1em' }}>
                // PROJECT_CLARIFICATION_PROTOCOL
              </h4>
              <p style={{ 
                color: 'rgba(255, 255, 255, 0.8)', 
                lineHeight: 1.7, 
                fontSize: '1rem',
                margin: 0,
                maxWidth: '1000px'
              }}>
                Please note that all listed pricing represents the <span style={{ color: '#00f5ff', fontWeight: 700 }}>Total Project Estimate</span> based on the initial scope. 
                Our engagements operate on a <span style={{ color: '#00f5ff', fontWeight: 700 }}>Fixed Project Price Model</span> — they are <span style={{ color: '#ff4d4d', fontWeight: 700, textDecoration: 'underline' }}>not monthly salaries or monthly rates</span>.
                <br /><br />
                The final project cost is <span style={{ color: '#fff' }}>milestone-based</span> and covers the entire development lifecycle, including design, building, testing, and deployment. 
                The actual pricing will <span style={{ color: '#fff', fontWeight: 700 }}>vary accordingly based on the specific features</span>, technical complexity, and scale of the project. 
                <br /><br />
                Just to clarify, any estimates provided are project-wide totals. If the project scope increases or if it transitions into a long-term engagement, the pricing structure will be revised to reflect the new requirements.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Final Call To Action */}
        <div style={{ textAlign: 'center', marginTop: '6rem' }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '1.5rem 4rem',
              background: '#00f5ff',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 900,
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              boxShadow: '0 0 50px rgba(0, 245, 255, 0.2)'
            }}
          >
            READY TO START? GET A CUSTOM QUOTE
          </motion.button>
          <div className="mono" style={{ color: 'rgba(255, 255, 255, 0.3)', fontSize: '0.7rem', marginTop: '1.5rem' }}>
             // DIRECT_COMM_LINK_ENCRYPTED
          </div>
        </div>

        {/* Info Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          style={{
            marginTop: '4rem',
            padding: '1rem',
            background: 'rgba(255, 255, 255, 0.02)',
            borderLeft: '2px solid rgba(255, 255, 255, 0.1)',
            fontSize: '0.8rem',
            color: 'rgba(255, 255, 255, 0.4)',
            fontFamily: 'var(--font-mono)',
            textAlign: 'center'
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
