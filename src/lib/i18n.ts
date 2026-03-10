export type Lang = "en" | "ar";

export const translations = {
    en: {
        // Nav
        navOpenApp: "Open Application",
        navAllRoles: "← All Roles",
        navServices: "Services",
        navAbout: "About",
        navClients: "Clients",
        navContact: "Contact",
        navJobs: "Jobs",

        // Hero
        heroBadge: "We're hiring",
        heroTitle1: "Shape the Future",
        heroTitle2: "With Us",
        heroSubtitle: (count: number) =>
            `We're building something extraordinary. Join our creative, ambitious team and make your mark across ${count} open positions.`,
        statRoles: "Open Roles",
        statWork: "Flexible Work",
        statWorkVal: "Remote",
        statGrowth: "Growth",
        statGrowthVal: "Fast",

        // Job card
        applyNow: "Apply Now →",
        viewDetails: "View Details",
        hideDetails: "Close Details",
        respTitle: "Responsibilities",
        reqsTitle: "Requirements",

        // Footer
        footerText: (year: number) => `© ${year} remark®. All rights reserved.`,
        footerTagline: "BE.DO.HAVE",
        footerServices: "Services",
        footerCompany: "Company",
        footerConnect: "Connect",
        footerAbout: "About Us",
        footerTeam: "Our Team",
        footerCareers: "Careers",
        footerEmail: "Email Us",
        footerCall: "Call Us",
        footerVisit: "Visit Us",

        // === MAIN WEBSITE SECTIONS ===

        // Main Hero
        mainHeroTag: "Growth & AI Business Development",
        mainHeroTitle1: "We Don't Just Market.",
        mainHeroTitle2: "We Build Growth Engines.",
        mainHeroSub: "Business Development × AI Solutions × Creative Production — under one roof.",
        mainHeroCta1: "Explore Services",
        mainHeroCta2: "Start a Project",

        // Services
        servicesTag: "What We Do",
        servicesTitle: "Our Services",
        servicesSub: "Three pillars working together to build unstoppable growth engines for your business.",
        servicesExplore: "Explore",
        servicesCollapse: "Collapse",
        servicesApply: "Apply for Service",

        svc1Title: "Business Development",
        svc1Sub: "Strategic planning and execution to accelerate revenue, enter new markets, and build lasting partnerships.",
        svc1Items: [
            { title: "Market Entry Strategy", desc: "Research-backed plans to enter new markets, identify opportunities, and position your brand for maximum impact." },
            { title: "Revenue Operations", desc: "Optimize your sales funnel, streamline processes, and implement systems that drive predictable revenue growth." },
            { title: "Partnership Development", desc: "Forge high-value strategic alliances, joint ventures, and distribution partnerships that multiply your reach." },
            { title: "Business Model Innovation", desc: "Design and validate new revenue streams, pricing strategies, and go-to-market approaches for sustainable growth." },
        ],

        svc2Title: "AI Solutions",
        svc2Sub: "Harness the power of artificial intelligence to automate operations, surface insights, and create intelligent products.",
        svc2Items: [
            { title: "AI-Powered Automation", desc: "Eliminate manual bottlenecks with intelligent workflows, chatbots, and process automation that run 24/7." },
            { title: "Intelligent Data Analytics", desc: "Transform raw data into actionable dashboards, predictive models, and real-time business intelligence." },
            { title: "Custom AI Tools", desc: "Build bespoke AI models tailored to your unique challenges — from NLP to computer vision to recommendation engines." },
            { title: "AI-Driven CX", desc: "Create deeply personalized customer journeys powered by machine learning, real-time segmentation, and smart targeting." },
        ],

        svc3Title: "Growth Marketing & Creative Production",
        svc3Sub: "Full-spectrum marketing and creative services — from strategy and brand identity to video production and music.",
        svc3Items: [
            { title: "Strategic Marketing Planning", desc: "Data-driven marketing roadmaps that align channels, budgets, and KPIs to your business objectives." },
            { title: "Visual Identity & Branding", desc: "Craft distinctive brand identities — logos, guidelines, packaging, and visual systems that command attention." },
            { title: "Video Production & Cinema", desc: "Professional cinematography, commercial production, and documentary filmmaking with 20+ years of expertise." },
            { title: "Digital Campaigns & Performance", desc: "High-ROI paid campaigns across Meta, Google, TikTok, and programmatic channels optimized daily." },
            { title: "Celebrity & Artist Branding", desc: "Personal brand strategy for public figures — image management, content creation, and audience growth." },
            { title: "Music & Auditory Identity", desc: "Original scores, jingles, sonic logos, and audio branding that make your brand unforgettable." },
            { title: "TV & Social Media Ads", desc: "Concept-to-delivery ad production for television broadcasts and social platforms with viral potential." },
            { title: "Graphic Design & Photography", desc: "Eye-catching design assets and professional photography for campaigns, social media, and print." },
        ],

        // Impact
        impactTag: "Our Impact",
        impactTitle: "Results That Speak.",
        impactStat1Val: "30+",
        impactStat1Label: "Brands Scaled",
        impactStat2Val: "9+",
        impactStat2Label: "Years of Experience",
        impactStat3Val: "3",
        impactStat3Label: "Growth Pillars",
        impactStat4Val: "50+",
        impactStat4Label: "Projects Delivered",

        // Clients
        clientsTag: "Trusted By",
        clientsTitle: "Powering Growth for Leading Brands.",

        // About
        aboutTag: "Who We Are",
        aboutTitle: "Built to Scale Businesses.",
        aboutP1: "Remark is a Growth & AI Business Development company based in Baghdad, Iraq. We combine business strategy, artificial intelligence, and creative production to deliver measurable outcomes.",
        aboutP2: "Our commitment lies in understanding every client's vision and transforming it into tangible, scalable reality — through advanced techniques, cutting-edge production, and unparalleled execution.",
        aboutTeamTitle: "Leadership",
        aboutShowMore: "View Profile",
        aboutShowLess: "Close Profile",
        teamStrengths: "Core Strengths",
        team: [
            {
                name: "Mustafa Z. Khalaf", role: "CEO & Founder", years: "9+",
                bio: "A marketing executive with 9+ years of experience, Mustafa founded Remark with a vision to merge business development, AI, and creative production into one powerhouse. He leads company strategy and client acquisition.",
                strengths: ["Brand Strategy & Positioning", "Market Analysis & Planning", "Team Leadership & Scaling", "Client Acquisition & Retention"],
            },
            {
                name: "Yousef Khadim", role: "COO", years: "9+",
                bio: "Yousef oversees all operational activities, ensuring projects are delivered on time and to the highest standard. His expertise spans process optimization, team management, and strategic execution at scale.",
                strengths: ["Process Optimization", "Project & Operations Management", "Strategic Execution", "Team Scaling & Development"],
            },
            {
                name: "Bayan Nabil", role: "Head of Production", years: "20+",
                bio: "A veteran cinematographer with over 20 years in the industry, Bayan leads all visual and commercial production. His work spans documentaries, brand films, and large-scale advertising shoots.",
                strengths: ["Cinematography & Film Direction", "Commercial Production", "Visual Storytelling", "Equipment & Studio Management"],
            },
            {
                name: "Ahmed Fareeq", role: "Marketing & Strategy Lead", years: "5+",
                bio: "Ahmed brings 5+ years of experience in digital marketing, graphic design, and photography. He leads strategy execution and ensures every campaign aligns with the brand's core message.",
                strengths: ["Digital Marketing Campaigns", "Graphic Design & Visual Branding", "Photography Direction", "Campaign Strategy & Analytics"],
            },
            {
                name: "Ahmed Maher", role: "Creative Ideas Lead", years: "5",
                bio: "With 5 years in creative and design, Ahmed Maher leads overall creative direction — from ideation to execution. He specializes in brand identity design and innovative concept development.",
                strengths: ["Creative Direction & Ideation", "Brand Identity Design", "Concept Development", "Art Direction & Visual Systems"],
            },
            {
                name: "Hassanein Abd Al-Sayed", role: "Production Coordinator", years: "10",
                bio: "Hassanein brings 10 years of experience in technical and creative production coordination. He manages logistics, timelines, and resources across multiple concurrent projects.",
                strengths: ["Production Planning & Logistics", "Technical Coordination", "Resource & Budget Management", "Multi-Project Execution"],
            },
        ],

        // Contact
        contactTag: "Get in Touch",
        contactTitle: "Let's Build Something Remarkable.",
        contactSub: "Ready to scale? Tell us about your project and we'll craft a growth plan tailored to your goals.",
        contactName: "Your Name",
        contactEmail: "Email Address",
        contactMessage: "Tell us about your project",
        contactSend: "Send Message",
        contactInfoEmail: "info@remark-agency.com",
        contactInfoPhone: "0772 880 888",
        contactInfoAddress: "Karrada Al-Jawazat, Baghdad, Iraq",
        contactInfoWeb: "@remark.iq",

        // Apply page header
        applyTitle: "Join Our Team",
        applySubtitle: "Tell us about yourself — we'd love to meet you.",

        // Form labels
        fieldRole: "Role",
        fieldRolePlaceholder: "— Select a role —",
        fieldFullName: "Full Name",
        fieldFullNamePlaceholder: "Jane Doe",
        fieldWorkType: "Work Preference",
        fieldWorkTypePlaceholder: "— Select Work Type —",
        workTypeRemote: "Remote",
        workTypeHybrid: "Hybrid",
        workTypeOnSite: "On-site",
        fieldPhone: "Phone",
        fieldPhonePlaceholder: "+964 7XX XXX XXXX",
        fieldEmail: "Email",
        fieldEmailPlaceholder: "jane@example.com",
        fieldCity: "City",
        fieldCityPlaceholder: "Baghdad",
        fieldYearsExp: "Years of Experience",
        fieldYearsExpPlaceholder: "3",
        fieldSalary: "Expected Salary",
        fieldSalaryPlaceholder: "1,500,000 IQD / month",
        fieldPortfolio: "Portfolio / LinkedIn URL",
        fieldPortfolioPlaceholder: "https://yourportfolio.com",
        fieldCv: "CV / Resume (PDF)",
        fieldCvUpload: "Click to upload your CV (PDF only)",
        fieldSkill: "Strongest Skill",
        fieldSkillPlaceholder: "e.g. Facebook Ads, Motion Graphics, Copywriting…",
        fieldWhyJoin: "Why do you want to join?",
        fieldWhyJoinPlaceholder: "Tell us what excites you about this opportunity…",
        submitBtn: "Submit Application",
        submittingBtn: "Submitting…",
        confidential: "Your information is kept strictly confidential.",

        // Success
        successTitle: "Application Submitted!",
        successMsg:
            "Thank you for applying. We'll review your application and get back to you within 5–7 business days.",
        successBtn: "Submit Another",
        successBackBtn: "Return to Roles",

        // Roles
        roles: {
            "marketing-manager": {
                title: "Marketing Manager",
                description: "Lead multi-channel campaigns, define brand positioning, and drive measurable growth across all marketing funnels.",
                responsibilities: [
                    "Develop and execute comprehensive marketing strategies across digital and traditional channels.",
                    "Manage marketing budgets, allocate resources, and track ROI carefully.",
                    "Collaborate with sales, product, and creative teams to align on goals.",
                    "Analyze market trends, customer behavior, and competitor activities."
                ],
                requirements: [
                    "5+ years of experience in marketing management or a similar role.",
                    "Deep understanding of digital marketing channels (SEO, PPC, email, social).",
                    "Strong analytical skills to interpret data and translate it into actionable insights.",
                    "Excellent leadership and communication abilities."
                ]
            },
            "marketing-coordinator": {
                title: "Marketing Coordinator",
                description: "Coordinate marketing initiatives, manage project timelines, and keep cross-functional teams aligned on deliverables.",
                responsibilities: [
                    "Assist in the development and implementation of marketing campaigns.",
                    "Maintain project schedules and coordinate with team members to ensure timely delivery.",
                    "Prepare reports on campaign performance and track key metrics.",
                    "Organize and maintain marketing assets and promotional materials."
                ],
                requirements: [
                    "1-3 years of proven experience in a marketing coordination or administrative role.",
                    "Exceptional organizational and time-management skills.",
                    "Familiarity with marketing tools and project management software.",
                    "Strong attention to detail and ability to multitask effectively."
                ]
            },
            "social-media-specialist": {
                title: "Social Media Specialist",
                description: "Craft compelling content calendars, grow our community, and turn followers into brand advocates.",
                responsibilities: [
                    "Develop and maintain engaging content calendars for platforms including Instagram, TikTok, LinkedIn, and Twitter.",
                    "Engage with our followers, respond to comments, and moderate community discussions.",
                    "Analyze engagement data to optimize posting schedules and content formats.",
                    "Collaborate with graphic designers and videographers to produce high-quality visual assets."
                ],
                requirements: [
                    "2+ years of experience managing brand social media accounts.",
                    "Excellent copywriting skills with a strong grasp of platform-specific tone of voice.",
                    "Proficiency with social media analytics and scheduling tools.",
                    "Creative mindset with an eye for current trends."
                ]
            },
            "media-buyer": {
                title: "Media Buyer",
                description: "Plan, purchase, and optimize paid media across Meta, Google, TikTok and beyond to maximize ROAS.",
                responsibilities: [
                    "Create and execute paid advertising campaigns across major platforms (Meta, Google Ads, TikTok Ads).",
                    "Monitor budgets daily, perform A/B testing on creatives, and optimize campaigns for ROAS.",
                    "Identify target audiences and plan media buying strategies accordingly.",
                    "Generate detailed performance reports and provide strategic recommendations."
                ],
                requirements: [
                    "3+ years of hands-on experience in paid media buying and optimization.",
                    "Demonstrated success managing large ad budgets and hitting CPA/ROAS targets.",
                    "Advanced knowledge of ad platforms, tracking pixels, and attribution models.",
                    "Strong analytical mindset and proficiency in Excel/Google Sheets."
                ]
            },
            "creative-director": {
                title: "Creative Director",
                description: "Set the visual and conceptual direction of the brand, overseeing design, copy, and creative production.",
                responsibilities: [
                    "Lead the creative team to develop innovative concepts for brand campaigns and client projects.",
                    "Ensure all creative output aligns with brand guidelines and quality standards.",
                    "Mentors designers, copywriters, and video producers to elevate their work.",
                    "Pitch creative concepts to internal stakeholders and key clients."
                ],
                requirements: [
                    "7+ years of creative experience with at least 3 years in a leadership/directional role.",
                    "A stunning portfolio showcasing successful, multi-channel creative campaigns.",
                    "Deep understanding of design, typography, video production, and copywriting.",
                    "Stellar presentation and communication skills."
                ]
            },
            copywriter: {
                title: "Copywriter",
                description: "Write persuasive, on-brand copy for ads, landing pages, emails, and everything in between.",
                responsibilities: [
                    "Write compelling, clear, and action-oriented copy for varied marketing channels.",
                    "Adapt tone and style to suit different platforms, products, and target audiences.",
                    "Collaborate closely with designers to ensure copy and visuals work seamlessly together.",
                    "Proofread and edit content for accuracy, grammar, and brand voice consistency."
                ],
                requirements: [
                    "2-5 years of professional copywriting experience, ideally in an agency or dynamic brand.",
                    "Excellent command of the English language.",
                    "Strong portfolio demonstrating versatility in writing styles.",
                    "Ability to grasp complex concepts and translate them into simple, engaging text."
                ]
            },
            "account-manager": {
                title: "Account Manager",
                description: "Build lasting client relationships, manage expectations, and ensure exceptional delivery across every account.",
                responsibilities: [
                    "Serve as the primary point of contact for assigned clients, building strong, trusted relationships.",
                    "Understand client objectives and coordinate with internal teams to deliver successful campaigns.",
                    "Manage project timelines, scope, and client expectations proactively.",
                    "Identify opportunities for account growth and upselling additional services."
                ],
                requirements: [
                    "3+ years of account management or client success experience in an agency setting.",
                    "Exceptional interpersonal, negotiation, and conflict-resolution skills.",
                    "Proven ability to manage multiple client accounts simultaneously.",
                    "Strong understanding of digital marketing services."
                ]
            },
            videographer: {
                title: "Videographer",
                description: "Shoot high-quality video content for brand campaigns, social media, and product storytelling.",
                responsibilities: [
                    "Capture professional-grade video footage on set and on location.",
                    "Set up and operate lighting, audio, and camera equipment.",
                    "Collaborate with the creative director to storyboard and plan shoots.",
                    "Maintain and organize all camera equipment and raw footage files."
                ],
                requirements: [
                    "3+ years of professional experience as a videographer or cinematographer.",
                    "Proficiency with cinema cameras, lighting kits, and professional audio setups.",
                    "A strong reel showcasing technical skill and creative storytelling.",
                    "Ability to work dynamically on location and adapt to changing environments."
                ]
            },
            "video-editor": {
                title: "Video Editor",
                description: "Transform raw footage into polished, engaging videos with sharp cuts, motion graphics, and sound design.",
                responsibilities: [
                    "Edit raw video footage into polished, compelling narratives for various platforms.",
                    "Create and integrate motion graphics, lower thirds, and visual effects.",
                    "Perform color grading and audio mixing to ensure broadcast-quality output.",
                    "Manage multiple editing projects and meet tight delivery deadlines."
                ],
                requirements: [
                    "3+ years of experience in video editing and post-production.",
                    "Mastery of Adobe Premiere Pro, After Effects, and standard post-production workflows.",
                    "Strong sense of pacing, storytelling, and rhythm in video.",
                    "Attention to detail and ability to take constructive creative feedback."
                ]
            },
        } as Record<string, { title: string; description: string; responsibilities: string[]; requirements: string[] }>,
    },

    ar: {
        // Nav
        navOpenApp: "قدّم الآن",
        navAllRoles: "→ جميع الوظائف",
        navServices: "الخدمات",
        navAbout: "من نحن",
        navClients: "عملاؤنا",
        navContact: "تواصل معنا",
        navJobs: "الوظائف",

        // Hero
        heroBadge: "نحن نوظّف",
        heroTitle1: "اصنع المستقبل",
        heroTitle2: "معنا",
        heroSubtitle: (count: number) =>
            `نحن نبني شيئاً استثنائياً. انضم إلى فريقنا المبدع الطموح وأثبت نفسك في ${count} وظيفة شاغرة.`,
        statRoles: "وظيفة شاغرة",
        statWork: "عمل مرن",
        statWorkVal: "عن بُعد",
        statGrowth: "نمو",
        statGrowthVal: "سريع",

        // Job card
        applyNow: "قدّم الآن ←",
        viewDetails: "عرض التفاصيل",
        hideDetails: "إخفاء التفاصيل",
        respTitle: "المسؤوليات:",
        reqsTitle: "المتطلبات:",

        // Footer
        footerText: (year: number) => `© ${year} remark®. جميع الحقوق محفوظة.`,
        footerTagline: "كُن. افعل. امتلك.",
        footerServices: "الخدمات",
        footerCompany: "الشركة",
        footerConnect: "تواصل",
        footerAbout: "من نحن",
        footerTeam: "فريقنا",
        footerCareers: "الوظائف",
        footerEmail: "راسلنا",
        footerCall: "اتصل بنا",
        footerVisit: "زورنا",

        // === أقسام الموقع الرئيسي ===

        // Main Hero
        mainHeroTag: "تطوير الأعمال والذكاء الاصطناعي",
        mainHeroTitle1: "لا نسوّق فقط.",
        mainHeroTitle2: "نبني محركات نمو.",
        mainHeroSub: "تطوير أعمال × حلول ذكاء اصطناعي × إنتاج إبداعي — تحت سقف واحد.",
        mainHeroCta1: "استكشف خدماتنا",
        mainHeroCta2: "ابدأ مشروعك",

        // Services
        servicesTag: "ماذا نقدم",
        servicesTitle: "خدماتنا",
        servicesSub: "ثلاثة محاور تعمل معاً لبناء محركات نمو لا يمكن إيقافها لأعمالك.",
        servicesExplore: "استكشف",
        servicesCollapse: "إغلاق",
        servicesApply: "التقديم على الخدمة",

        svc1Title: "تطوير الأعمال",
        svc1Sub: "التخطيط الاستراتيجي والتنفيذ لتسريع الإيرادات ودخول أسواق جديدة وبناء شراكات دائمة.",
        svc1Items: [
            { title: "استراتيجية دخول السوق", desc: "خطط مدعومة بالأبحاث لدخول أسواق جديدة وتحديد الفرص ووضع علامتك التجارية لتحقيق أقصى تأثير." },
            { title: "عمليات الإيرادات", desc: "تحسين مسار المبيعات وتبسيط العمليات وتنفيذ أنظمة تدفع نمو الإيرادات المتوقع." },
            { title: "تطوير الشراكات", desc: "بناء تحالفات استراتيجية عالية القيمة ومشاريع مشتركة وشراكات توزيع تضاعف وصولك." },
            { title: "ابتكار نماذج الأعمال", desc: "تصميم والتحقق من تدفقات إيرادات جديدة واستراتيجيات تسعير ونماذج دخول السوق للنمو المستدام." },
        ],

        svc2Title: "حلول الذكاء الاصطناعي",
        svc2Sub: "تسخير قوة الذكاء الاصطناعي لأتمتة العمليات واستخراج الرؤى وإنشاء منتجات ذكية.",
        svc2Items: [
            { title: "أتمتة مدعومة بالـ AI", desc: "إزالة الاختناقات اليدوية من خلال أتمتة ذكية وروبوتات محادثة وعمليات تعمل على مدار الساعة." },
            { title: "تحليلات بيانات ذكية", desc: "تحويل البيانات الخام إلى لوحات معلومات قابلة للتنفيذ ونماذج تنبؤية وذكاء أعمال في الوقت الفعلي." },
            { title: "أدوات AI مخصصة", desc: "بناء نماذج AI مصممة لتحدياتك الفريدة — من معالجة اللغة إلى الرؤية الحاسوبية إلى محركات التوصية." },
            { title: "تجربة عملاء مدعومة بالـ AI", desc: "إنشاء رحلات عملاء مخصصة بعمق مدعومة بتعلم الآلة والتقسيم في الوقت الفعلي والاستهداف الذكي." },
        ],

        svc3Title: "التسويق الإبداعي والإنتاج",
        svc3Sub: "خدمات تسويقية وإبداعية شاملة — من الاستراتيجية والهوية إلى إنتاج الفيديو والموسيقى.",
        svc3Items: [
            { title: "التخطيط التسويقي الاستراتيجي", desc: "خرائط طريق تسويقية مبنية على البيانات تنسق القنوات والميزانيات ومؤشرات الأداء مع أهداف أعمالك." },
            { title: "الهوية البصرية والعلامة التجارية", desc: "صياغة هويات تجارية مميزة — شعارات وإرشادات وتغليف وأنظمة بصرية تجذب الانتباه." },
            { title: "إنتاج الفيديو والسينما", desc: "تصوير سينمائي احترافي وإنتاج تجاري وأفلام وثائقية بخبرة 20+ سنة في المجال." },
            { title: "الحملات الرقمية والأداء", desc: "حملات مدفوعة عالية العائد عبر ميتا وجوجل وتيك توك وقنوات برمجية محسّنة يومياً." },
            { title: "العلامة الشخصية للمشاهير", desc: "استراتيجية بناء العلامة الشخصية للشخصيات العامة — إدارة الصورة وإنشاء المحتوى ونمو الجمهور." },
            { title: "الإنتاج الموسيقي والهوية السمعية", desc: "مقطوعات أصلية وأناشيد وشعارات صوتية وهوية سمعية تجعل علامتك لا تُنسى." },
            { title: "إعلانات التلفزيون والسوشيال ميديا", desc: "إنتاج إعلاني من الفكرة إلى التسليم للبث التلفزيوني ومنصات التواصل الاجتماعي." },
            { title: "التصميم الجرافيكي والتصوير", desc: "تصاميم لافتة وتصوير احترافي للحملات ووسائل التواصل والمطبوعات." },
        ],

        // Impact
        impactTag: "أثرنا",
        impactTitle: "نتائج تتحدث.",
        impactStat1Val: "+30",
        impactStat1Label: "علامة تجارية تم تطويرها",
        impactStat2Val: "+9",
        impactStat2Label: "سنوات من الخبرة",
        impactStat3Val: "3",
        impactStat3Label: "محاور نمو",
        impactStat4Val: "+50",
        impactStat4Label: "مشروع تم تسليمه",

        // Clients
        clientsTag: "يثقون بنا",
        clientsTitle: "ندعم نمو أبرز العلامات التجارية.",

        // About
        aboutTag: "من نحن",
        aboutTitle: "بُنينا لتوسيع الأعمال.",
        aboutP1: "ريمارك هي شركة تطوير أعمال وذكاء اصطناعي مقرها بغداد، العراق. نجمع بين استراتيجية الأعمال والذكاء الاصطناعي والإنتاج الإبداعي لتحقيق نتائج قابلة للقياس.",
        aboutP2: "التزامنا يكمن في فهم رؤية كل عميل وتحويلها إلى واقع ملموس وقابل للتوسع — من خلال تقنيات متقدمة وإنتاج رائد وتنفيذ لا مثيل له.",
        aboutTeamTitle: "القيادة",
        aboutShowMore: "عرض الملف الشخصي",
        aboutShowLess: "إغلاق",
        teamStrengths: "نقاط القوة",
        team: [
            {
                name: "مصطفى زيد خلف", role: "الرئيس التنفيذي والمؤسس", years: "+9",
                bio: "مسؤول تسويق بخبرة أكثر من 9 سنوات، أسس مصطفى ريمارك برؤية لدمج تطوير الأعمال والذكاء الاصطناعي والإنتاج الإبداعي في قوة واحدة. يقود استراتيجية الشركة واكتساب العملاء.",
                strengths: ["استراتيجية العلامة التجارية وتحديد المواقع", "تحليل السوق والتخطيط", "قيادة الفريق والتوسع", "اكتساب العملاء والاحتفاظ بهم"],
            },
            {
                name: "يوسف كاظم", role: "مدير العمليات", years: "+9",
                bio: "يشرف يوسف على جميع الأنشطة التشغيلية ويضمن تسليم المشاريع في الوقت المحدد وبأعلى المعايير. تمتد خبرته في تحسين العمليات وإدارة الفرق والتنفيذ الاستراتيجي.",
                strengths: ["تحسين العمليات", "إدارة المشاريع والعمليات", "التنفيذ الاستراتيجي", "توسيع وتطوير الفرق"],
            },
            {
                name: "بيان نبيل", role: "رئيس الإنتاج", years: "+20",
                bio: "مصور سينمائي محترف بخبرة تزيد عن 20 عاماً في المجال، يقود بيان جميع عمليات الإنتاج البصري والتجاري. تشمل أعماله الأفلام الوثائقية والإعلانات التجارية الكبرى.",
                strengths: ["التصوير السينمائي وإخراج الأفلام", "الإنتاج التجاري", "السرد البصري", "إدارة المعدات والاستوديو"],
            },
            {
                name: "أحمد فريق", role: "قائد التسويق والاستراتيجية", years: "+5",
                bio: "يجلب أحمد خبرة 5+ سنوات في التسويق الرقمي والتصميم الجرافيكي والتصوير. يقود تنفيذ الاستراتيجيات ويضمن توافق كل حملة مع الرسالة الأساسية للعلامة.",
                strengths: ["حملات التسويق الرقمي", "التصميم الجرافيكي والهوية البصرية", "إدارة التصوير", "استراتيجية وتحليلات الحملات"],
            },
            {
                name: "أحمد ماهر", role: "قائد الأفكار الإبداعية", years: "5",
                bio: "مع 5 سنوات في الإبداع والتصميم، يقود أحمد ماهر التوجه الإبداعي الشامل — من التفكير إلى التنفيذ. متخصص في تصميم الهوية البصرية وتطوير المفاهيم المبتكرة.",
                strengths: ["التوجيه الإبداعي والتفكير", "تصميم الهوية البصرية", "تطوير المفاهيم", "الإخراج الفني والأنظمة البصرية"],
            },
            {
                name: "حسنين عبد السيد", role: "منسق الإنتاج", years: "10",
                bio: "يمتلك حسنين 10 سنوات من الخبرة في تنسيق الإنتاج التقني والإبداعي. يدير اللوجستيات والجداول الزمنية والموارد عبر مشاريع متعددة متزامنة.",
                strengths: ["تخطيط ولوجستيات الإنتاج", "التنسيق التقني", "إدارة الموارد والميزانيات", "تنفيذ مشاريع متعددة"],
            },
        ],

        // Contact
        contactTag: "تواصل معنا",
        contactTitle: "لنبنِ شيئاً استثنائياً معاً.",
        contactSub: "مستعد للنمو؟ أخبرنا عن مشروعك وسنصمم خطة نمو مخصصة لأهدافك.",
        contactName: "اسمك",
        contactEmail: "البريد الإلكتروني",
        contactMessage: "أخبرنا عن مشروعك",
        contactSend: "إرسال الرسالة",
        contactInfoEmail: "info@remark-agency.com",
        contactInfoPhone: "0772 880 888",
        contactInfoAddress: "الكرادة / الجوازات، بغداد، العراق",
        contactInfoWeb: "@remark.iq",

        // Apply page header
        applyTitle: "انضم إلى فريقنا",
        applySubtitle: "أخبرنا عن نفسك — يسعدنا التعرف عليك.",

        // Form labels
        fieldRole: "الوظيفة",
        fieldRolePlaceholder: "— اختر وظيفة —",
        fieldFullName: "الاسم الكامل",
        fieldFullNamePlaceholder: "محمد علي",
        fieldWorkType: "طبيعة العمل المفضلة",
        fieldWorkTypePlaceholder: "— اختر طبيعة العمل —",
        workTypeRemote: "عن بُعد (Remote)",
        workTypeHybrid: "هجين (Hybrid)",
        workTypeOnSite: "مكتبي (On-site)",
        fieldPhone: "رقم الهاتف",
        fieldPhonePlaceholder: "+964 7XX XXX XXXX",
        fieldEmail: "البريد الإلكتروني",
        fieldEmailPlaceholder: "example@email.com",
        fieldCity: "المدينة",
        fieldCityPlaceholder: "بغداد",
        fieldYearsExp: "سنوات الخبرة",
        fieldYearsExpPlaceholder: "3",
        fieldSalary: "الراتب المتوقع",
        fieldSalaryPlaceholder: "مثال: 1,500,000 د.ع / شهر",
        fieldPortfolio: "رابط الملف الشخصي / LinkedIn",
        fieldPortfolioPlaceholder: "https://portfolio.com",
        fieldCv: "السيرة الذاتية (PDF)",
        fieldCvUpload: "انقر لرفع سيرتك الذاتية (PDF فقط)",
        fieldSkill: "أبرز مهاراتك",
        fieldSkillPlaceholder: "مثال: إعلانات فيسبوك، تصميم حركي، كتابة إبداعية…",
        fieldWhyJoin: "لماذا تريد الانضمام إلينا؟",
        fieldWhyJoinPlaceholder: "أخبرنا ما الذي يُحمسك في هذه الفرصة…",
        submitBtn: "إرسال الطلب",
        submittingBtn: "جارٍ الإرسال…",
        confidential: "معلوماتك تُحفظ بسرية تامة.",

        // Success
        successTitle: "!تم إرسال طلبك",
        successMsg:
            "شكراً لتقديمك. سنراجع طلبك ونتواصل معك خلال 5–7 أيام عمل.",
        successBtn: "تقديم طلب آخر",
        successBackBtn: "العودة للوظائف",

        // Roles
        roles: {
            "marketing-manager": {
                title: "مدير التسويق",
                description: "قيادة حملات تسويقية متعددة القنوات، وتحديد موقع العلامة التجارية، وتحقيق نمو قابل للقياس.",
                responsibilities: [
                    "تطوير وتنفيذ استراتيجيات تسويقية شاملة عبر القنوات الرقمية والتقليدية.",
                    "إدارة ميزانيات التسويق وتخصيص الموارد وتتبع العائد على الاستثمار.",
                    "التعاون مع فرق المبيعات والمنتجات والإبداع لتحقيق الأهداف.",
                    "تحليل اتجاهات السوق وسلوك العملاء وأنشطة المنافسين."
                ],
                requirements: [
                    "خبرة 5+ سنوات في إدارة التسويق أو دور مشابه.",
                    "فهم عميق لقنوات التسويق الرقمي (SEO، PPC، البريد الإلكتروني، सोशल ميديا).",
                    "مهارات تحليلية قوية لتفسير البيانات وتحويلها إلى أفكار قابلة للتنفيذ.",
                    "قدرات ممتازة في القيادة والتواصل."
                ]
            },
            "marketing-coordinator": {
                title: "منسّق التسويق",
                description: "تنسيق المبادرات التسويقية وإدارة الجداول الزمنية للمشاريع للحفاظ على انسجام الفرق.",
                responsibilities: [
                    "المساعدة في تطوير وتنفيذ الحملات التسويقية.",
                    "الحفاظ على جداول المشاريع والتنسيق مع أعضاء الفريق لضمان التسليم في الوقت المحدد.",
                    "إعداد تقارير عن أداء الحملات وتتبع المقاييس الرئيسية.",
                    "تنظيم وصيانة الأصول التسويقية والمواد الترويجية."
                ],
                requirements: [
                    "خبرة 1-3 سنوات في التنسيق التسويقي أو دور إداري.",
                    "مهارات استثنائية في التنظيم وإدارة الوقت.",
                    "الإلمام بأدوات التسويق وبرامج إدارة المشاريع.",
                    "انتباه شديد للتفاصيل وقدرة على تعدد المهام بفعالية."
                ]
            },
            "social-media-specialist": {
                title: "متخصص وسائل التواصل الاجتماعي",
                description: "إنشاء تقاويم محتوى جذابة، وتنمية المجتمع، وتحويل المتابعين إلى مؤيدين للعلامة.",
                responsibilities: [
                    "تطوير تقاويم محتوى تفاعلية لمنصات مثل إنستجرام، تيك توك، ولينكد إن.",
                    "التفاعل مع المتابعين والرد على التعليقات وإدارة المناقشات.",
                    "تحليل بيانات التفاعل لتحسين أوقات النشر وأنماط المحتوى.",
                    "التعاون مع المصممين وصناع الفيديو لإنتاج محتوى مرئي عالي الجودة."
                ],
                requirements: [
                    "خبرة سنتين فأكثر في إدارة حسابات العلامات التجارية.",
                    "مهارات كتابة إبداعية ممتازة مع فهم نبرة كل منصة.",
                    "إجادة استخدام أدوات الجدولة وتحليلات السوشيال ميديا.",
                    "عقلية إبداعية ومواكبة للمستجدات والتريندات."
                ]
            },
            "media-buyer": {
                title: "مشتري الوسائط الإعلانية",
                description: "التخطيط والشراء والتحسين للإعلانات المدفوعة عبر ميتا وجوجل وتيك توك لتعظيم العائد.",
                responsibilities: [
                    "إنشاء وإدارة حملات إعلانية مدفوعة عبر المنصات الكبرى.",
                    "مراقبة الميزانيات يومياً وعمل اختبارات A/B لتحسين العائد (ROAS).",
                    "تحديد الجماهير المستهدفة وتخطيط استراتيجيات الشراء.",
                    "إعداد تقارير أداء تفصيلية وتقديم توصيات استراتيجية."
                ],
                requirements: [
                    "خبرة 3+ سنوات عملية في إطلاق وتحسين الإعلانات المدفوعة.",
                    "سجل حافل في إدارة ميزانيات كبيرة وتحقيق أهداف الـ CPA و ROAS.",
                    "معرفة متقدمة بمنصات الإعلانات ونماذج الإحالة (Attribution).",
                    "مهارات تحليلية قوية في استخدام الجداول الإلكترونية لمعالجة البيانات."
                ]
            },
            "creative-director": {
                title: "المدير الإبداعي",
                description: "تحديد التوجه البصري والإبداعي للعلامة التجارية والإشراف على التصميم والإنتاج.",
                responsibilities: [
                    "قيادة الفريق الإبداعي لتطوير أفكار مبتكرة لحملات العلامة التجارية.",
                    "ضمان توافق جميع المخرجات الإبداعية مع إرشادات العلامة ومعايير الجودة.",
                    "توجيه المصممين والكتاب وصناع الفيديو لرفع مستوى أعمالهم.",
                    "عرض الأفكار الإبداعية على أصحاب المصلحة الداخليين والعملاء."
                ],
                requirements: [
                    "خبرة 7+ سنوات في المجال الإبداعي، منها 3 سنوات على الأقل في دور قيادي.",
                    "محفظة أعمال مبهرة تستعرض حملات ناجحة.",
                    "فهم عميق للتصميم والتوصيف وإنتاج الفيديو وتأليف الإعلانات.",
                    "مهارات عرض وتواصل استثنائية."
                ]
            },
            copywriter: {
                title: "كاتب محتوى",
                description: "كتابة نصوص مقنعة ومتوافقة مع هوية العلامة للإعلانات والصفحات المقصودة والبريد الإلكتروني.",
                responsibilities: [
                    "كتابة نصوص مقنعة وواضحة لقنوات التسويق المختلفة.",
                    "تكييف النبرة والأسلوب لتناسب مختلف المنصات والمنتجات والجمهور المستهدف.",
                    "التعاون عن كثب مع المصممين لضمان انسجام النصوص والصور.",
                    "تدقيق وتعديل المحتوى لضمان الدقة والقواعد اللغوية."
                ],
                requirements: [
                    "خبرة 2-5 سنوات ككاتب محتوى، يفضل في وكالة إعلانية.",
                    "إجادة تامة للغة العربية (والإنجليزية ميزة إضافية).",
                    "محفظة أعمال متنوعة الأساليب الكتابية.",
                    "القدرة على تبسيط المفاهيم المعقدة في نصوص جذابة ومباشرة."
                ]
            },
            "account-manager": {
                title: "مدير الحسابات",
                description: "بناء علاقات طويلة الأمد مع العملاء وضمان تقديم خدمة استثنائية لكل حساب.",
                responsibilities: [
                    "العمل كنقطة اتصال رئيسية للعملاء، وبناء علاقات قوية وموثوقة.",
                    "فهم أهداف العملاء والتنسيق مع الفرق للتنفيذ بنجاح.",
                    "إدارة الجداول الزمنية والنطاقات وتوقعات العملاء بشكل استباقي.",
                    "تحديد فرص لنمو الحسابات أو بيع خدمات إضافية."
                ],
                requirements: [
                    "خبرة 3+ سنوات في إدارة حسابات العملاء داخل بيئة وكالات التسويق.",
                    "مهارات استثنائية في التواصل والتفاوض وحل المشكلات.",
                    "القدرة المثبتة على إدارة ملفات عملاء متعددة في وقت واحد.",
                    "فهم قوي لخدمات التسويق الرقمي وحلولها."
                ]
            },
            videographer: {
                title: "مصوّر فيديو",
                description: "تصوير محتوى فيديو عالي الجودة لحملات العلامة التجارية ووسائل التواصل والقصص.",
                responsibilities: [
                    "تصوير مواد بصرية عالية الجودة في الاستوديو والمواقع الخارجية.",
                    "إعداد وتشغيل معدات الإضاءة والصوت والكاميرات.",
                    "التعاون مع المدير الإبداعي لرسم الستوري بورد وتخطيط جلسات التصوير.",
                    "المحافظة على معدات التصوير وتنظيم الملفات الأولية."
                ],
                requirements: [
                    "خبرة احترافية تزيد عن 3 سنوات في تصوير الفيديو.",
                    "كفاءة في التعامل مع الكاميرات السينمائية ومعدات الإضاءة والصوت المتقدمة.",
                    "ملف أعمال قوي يعكس المهارة الفنية وأسلوب سرد القصص المرئي.",
                    "المرونة والقدرة العالية على العمل في مواقع متعددة متغيرة بمهارة."
                ]
            },
            "video-editor": {
                title: "مونتير فيديو",
                description: "تحويل اللقطات الخام إلى فيديوهات احترافية جذابة بتقطيع دقيق ورسوم متحركة.",
                responsibilities: [
                    "تحرير اللقطات الخام لتكوين فيديوهات سردية وجذابة למختلف المنصات.",
                    "إنشاء ودمج الرسومات المتحركة (Motion Graphics) والمؤثرات البصرية.",
                    "تنفيذ تصحيح الألوان (Color Grading) ومزج الأصوات باحترافية.",
                    "إدارة مشاريع متعددة الأبعاد والالتزام بالمواعيد النهائية الصارمة."
                ],
                requirements: [
                    "خبرة تزيد عن 3 سنوات في تحرير الفيديو والـ Post-production.",
                    "إتقان العمل على برامج مثل Adobe Premiere Pro و After Effects.",
                    "إحساس عالٍ بالإيقاع وسرد القصص في الفيديو.",
                    "اهتمام دقيق بالتفاصيل والقدرة على استيعاب التوجيهات الفنية."
                ]
            },
        } as Record<string, { title: string; description: string; responsibilities: string[]; requirements: string[] }>,
    },
} as const;

export type Translations = (typeof translations)["en"];
