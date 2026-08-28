export interface Score {
  growth: number;
  trust: number;
  control: number;
  momentum: number;
}

export interface Option {
  id: 'A' | 'B' | 'C';
  title: string;
  description: string;
  feedback: string;
  score: Score;
  aggressive?: boolean;
}

export interface Scenario {
  id: number;
  title: string;
  description: string;
  insight: string;
  options: [Option, Option, Option];
}

export interface Track {
  id: string;
  name: string;
  intro: string[];
  scenarios: Scenario[];
}

export const tracks: Track[] = [
  // ─── FINTECH ───
  {
    id: "fintech",
    name: "Fintech",
    intro: ["You’ve built a fintech with a new card proposition ready to hit the market. Make the right calls, manage the risk, and turn early momentum into a card business that scales. This is where fintechs break out or burn out.", "Do you have what it takes?"],
    scenarios: [
      {
        id: 1,
        title: "Launch the Card",
        description: "Launch is close, and this new card could be a breakout win or a costly miss. You’re aiming to give customers smarter ways to spend, faster payouts, and instant digital access to their money. Interest is building, partners are circling, and now you have to decide what to build, what to own, and what to risk before you go live.\n\nWhat’s your move?",
        insight: "Modern card processing technology enables issuers to launch or update card products in a matter of days, making it easier to roll out new services and digital innovations quickly.",
        options: [
          { id: "A", title: "Partner Up", description: "Move fast with a lead partner and cut launch complexity.", feedback: "You hit the market faster, but become more dependent on partner fit and coordination.", score: { growth: 2, trust: 0, control: -1, momentum: 2 }, aggressive: true },
          { id: "B", title: "Own the Stack", description: "Build more of the card programme in-house and keep greater control.", feedback: "You stay in control, but take on a slower, tougher road to launch.", score: { growth: 2, trust: 1, control: 0, momentum: 0 } },
          { id: "C", title: "Launch One Use Case", description: "Focus on one customer need to keep initial scope and risk down.", feedback: "You lower the risk of launch, but cap early growth and reach.", score: { growth: 0, trust: 1, control: 2, momentum: -1 } },
        ],
      },
      {
        id: 2,
        title: "Fix User Drop-Off",
        description: "The card is live, but cracks are showing. Even though interest is real, users are dropping off before they become active customers. If the leak continues, the business burns capital, misses revenue targets, and loses momentum fast.\n\nWhat do you do?",
        insight: "Cardholder onboarding requires Know Your Customer (KYC) checks to meet Anti-Money Laundering (AML) requirements. These checks can only be performed by a bank sponsor or BIN sponsor with the regulatory authorisation to do so.",
        options: [
          { id: "A", title: "Open the Funnel", description: "Ease onboarding requirements to help more users become active customers.", feedback: "You lift activation, but invite more risk in at the front door.", score: { growth: 2, trust: 0, control: -2, momentum: 2 }, aggressive: true },
          { id: "B", title: "Hold the Line", description: "Keep existing onboarding checks in place to protect against risk.", feedback: "You safeguard trust, but lose more users before they convert.", score: { growth: 0, trust: 2, control: 2, momentum: -1 } },
          { id: "C", title: "Upgrade the Flow", description: "Rebuild the onboarding journey with smarter tools to improve activation and fix weak spots.", feedback: "You create a stronger path to activation, but add cost and operational load.", score: { growth: 2, trust: 1, control: 1, momentum: 1 } },
        ],
      },
      {
        id: 3,
        title: "Win Customers",
        description: "You are through launch and early activation, but long-term success depends on who you are really building the card for. Different customer bases bring very different trade-offs in revenue, complexity, and defensibility. Now you have to decide not just who you can reach, but who gives this fintech the strongest path to growth.\n\nWho do you back?",
        insight: "Security, real-time data, personalisation, and adaptable technology can all play a role in building a stronger fintech ecosystem. Specialist partners can bring these capabilities together faster, helping fintechs innovate while staying close to customer needs.",
        options: [
          { id: "A", title: "Back SMEs", description: "Focus on small and underbanked businesses that need simpler tools and better ways to manage day-to-day money movement.", feedback: "You reach businesses with real unmet needs, but their varied use cases make them more complex to serve.", score: { growth: 2, trust: 1, control: 0, momentum: 0 } },
          { id: "B", title: "Back Diaspora", description: "Build for customers with cross-border needs, from sending and receiving to holding and spending money in different markets.", feedback: "You solve a clear, high-friction need, but take on more complexity across compliance, corridors, and customer expectations.", score: { growth: 2, trust: 0, control: -1, momentum: 2 }, aggressive: true },
          { id: "C", title: "Back Consumers", description: "Go after mainstream retail customers with a card built for simple, convenient everyday use.", feedback: "You target the biggest addressable market, but compete in a much more crowded space.", score: { growth: 1, trust: 1, control: 2, momentum: 0 } },
        ],
      },
      {
        id: 4,
        title: "Deepen the Offer",
        description: "You have a clearer customer base now, but one product is rarely enough to build a lasting business. Customers want more utility, more flexibility, and more reasons to stay. Now you have to decide what to add next without losing what made the card work in the first place.\n\nWhat’s your next move?",
        insight: "APAC is emerging as one of the most important regions for crypto card adoption, driven by real consumer and business needs rather than hype. Crypto cards can help fill gaps that legacy payment systems do not always serve well.",
        options: [
          { id: "A", title: "Add Credit", description: "Introduce lending, instalments, or short-term credit to unlock new sources of revenue.", feedback: "You open a stronger revenue path, but take on more risk, regulatory pressure, and product complexity.", score: { growth: 2, trust: 0, control: -1, momentum: 2 }, aggressive: true },
          { id: "B", title: "Add Card Utility", description: "Launch or expand features like virtual cards, wallet use, and day-to-day spend tools to give customers more flexibility.", feedback: "You give customers more ways to use the product day to day, but increase delivery and servicing complexity.", score: { growth: 2, trust: 2, control: 0, momentum: 1 } },
          { id: "C", title: "Add Digital Assets", description: "Introduce crypto, stablecoin, or tokenised-money features for customers who want more choice and borderless options.", feedback: "You create new opportunities for innovation, but take on more uncertainty around regulation, trust, and operational complexity.", score: { growth: 0, trust: 1, control: -1, momentum: 2 } },
        ],
      },
      {
        id: 5,
        title: "Manage Fraud Spike",
        description: "A customer has posted about their card being wrongly declined, and similar complaints are starting to pile up 😱\n\nUsage is rising, but fraud is climbing, and your support team is feeling the strain. One bad week of false declines could turn a fraud issue into a full-blown trust crisis.\n\nHow do you respond?",
        insight: "Virtual cards add even more control with features like spend limits, expiry dates, and merchant-specific use. Tokenisation offers another layer of protection, replacing card details with a unique token so the real card number is never exposed during a transaction.",
        options: [
          { id: "A", title: "Lock It Down", description: "Tighten controls fast and reduce exposure before it spreads.", feedback: "You cut losses quickly, but add friction that frustrates genuine users.", score: { growth: -1, trust: 1, control: 2, momentum: -1 } },
          { id: "B", title: "Push Through", description: "Keep growth moving, accept the added risk, and resist slamming on the brakes.", feedback: "You preserve momentum, but leave more room for fraud and trust issues to build.", score: { growth: 2, trust: -1, control: -2, momentum: 2 }, aggressive: true },
          { id: "C", title: "Target the Risk", description: "Use targeted controls and faster response tools to limit wider disruption.", feedback: "You strike a better balance, but put more pressure on operations.", score: { growth: 2, trust: 2, control: 1, momentum: 1 } },
        ],
      },
      {
        id: 6,
        title: "Enter New Markets",
        description: "You’ve gained traction, confidence, and momentum, but now the real test begins 🥲\n\nExpectations are rising, new markets are opening up, and you have to scale the business without rebuilding it every time.\n\nWhich path do you take?",
        insight: "No issuer processor can claim truly global coverage yet, as licensing and compliance still vary by market. But next-generation processors are often better equipped to navigate that complexity, using modern payment rails and strategic partnerships to help issuers expand internationally.",
        options: [
          { id: "A", title: "Push Ahead", description: "Enter new markets fast and chase growth while the window is still open.", feedback: "You gain expansion speed, but lose grip on consistency across markets.", score: { growth: 2, trust: 0, control: -1, momentum: 2 }, aggressive: true },
          { id: "B", title: "Build Local", description: "Adapt to each market’s customers, needs, and conditions to stay relevant.", feedback: "You improve local fit, but complexity starts stacking up fast.", score: { growth: 2, trust: 1, control: 1, momentum: 0 } },
          { id: "C", title: "Standardise the Model", description: "Use a consistent model across markets and localise only where it counts.", feedback: "You make scaling easier, but may miss some market-specific needs.", score: { growth: 1, trust: 1, control: 2, momentum: -1 } },
        ],
      },
    ],
  },

  // ─── GOVERNMENT ───
  {
    id: "government",
    name: "Government",
    intro: ["You’re running a public payment programme that gets government funds into people’s hands. The decisions you make impact real lives, with real consequences. Make the right calls, balance speed with control, and build a system people can rely on.", "Do you have what it takes?"],
    scenarios: [
      {
        id: 1,
        title: "Pay Benefits",
        description: "A service review has laid it bare: your benefits programme is still getting payments out, but the experience is falling behind. It feels slow, fragmented, and far from what citizens now expect. People are losing patience, and trust is starting to wear thin.\n\nHow do you respond?",
        insight: "Many legacy card issuers still run on technology built decades ago, which can make it harder to innovate and keep up with changing consumer expectations.",
        options: [
          { id: "A", title: "Go Digital First", description: "Start shifting routine benefit payments into digital channels right away.", feedback: "You build momentum fast, but increase the risk of early rollout issues.", score: { growth: 0, trust: 0, control: -1, momentum: 2 }, aggressive: true },
          { id: "B", title: "Stabilise the Core", description: "Keep the current delivery model in place and focus on making benefit payments more reliable.", feedback: "You protect continuity and reduce disruption, but give citizens fewer visible signs of progress.", score: { growth: 0, trust: 1, control: 2, momentum: -1 } },
          { id: "C", title: "Blend the Channels", description: "Improve the experience with a deliberate mix of digital, assisted, and existing delivery routes.", feedback: "You create a more balanced transition, but take a slower road to full modernisation.", score: { growth: 0, trust: 2, control: 2, momentum: 1 } },
        ],
      },
      {
        id: 2,
        title: "Deliver Crisis Relief",
        description: "A crisis is hitting, and you need to get money out fast, at scale, and under intense public scrutiny. Households need support immediately, but urgency is colliding with verification, delivery, and system limits. Even a reliable programme can start to crack when pressure spikes. Now you have to decide how this programme responds when relief cannot wait.\n\nWhat’s your call?",
        insight: "At the height of the COVID-19 pandemic, Paymentology helped transform a stored-value transit card into a powerful financial tool, delivering essential relief quickly to millions of people across Hong Kong.",
        options: [
          { id: "A", title: "Build for Speed", description: "Push relief out as fast as possible so support reaches affected people without delay.", feedback: "You improve crisis response, but put more pressure on controls and verification, increasing the risk of misuse.", score: { growth: 2, trust: 1, control: -1, momentum: 2 }, aggressive: true },
          { id: "B", title: "Build for Precision", description: "Keep stronger verification and eligibility checks in place to make sure relief reaches the right people.", feedback: "You protect control and reduce misuse, but risk looking too slow when urgency is highest.", score: { growth: 0, trust: 2, control: 2, momentum: 0 } },
          { id: "C", title: "Build for Flexibility", description: "Adapt the programme so it can shift between rapid response and tighter control depending on the need.", feedback: "You build a more adaptable crisis model, but take on more complexity and give up some speed.", score: { growth: 2, trust: 2, control: 1, momentum: 1 } },
        ],
      },
      {
        id: 3,
        title: "Set Spend Rules",
        description: "As digital payments play a bigger role in delivering relief, scrutiny is growing over how that support is spent. Policymakers want proof that it is going towards its intended purpose, from groceries and utilities to other essentials. Now the controls are in your hands. You decide how tight they should be.\n\nWhat’s your approach?",
        insight: "Paymentology’s FAST Feed gives you instant access to the data that matters at every point in the journey. With real-time, actionable insights, you can optimise operations, reduce fraud risk, and improve user experiences.",
        options: [
          { id: "A", title: "Lock It Down", description: "Restrict spending to tightly defined merchant categories.", feedback: "You strengthen control and policy alignment, but make the programme less flexible for users.", score: { growth: 0, trust: 2, control: 2, momentum: 0 } },
          { id: "B", title: "Keep It Broad", description: "Allow support to be spent more freely across a wider set of merchants.", feedback: "You make the programme easier to use, but increase the risk of misuse and scrutiny.", score: { growth: 0, trust: 0, control: -1, momentum: 2 }, aggressive: true },
          { id: "C", title: "Track the Outliers", description: "Allow broader spending, but watch closely for unusual or suspicious patterns.", feedback: "You keep more flexibility for users, but take on more responsibility to spot problems quickly.", score: { growth: 0, trust: 2, control: 1, momentum: 1 } },
        ],
      },
      {
        id: 4,
        title: "Reach Everyone",
        description: "The programme is taking shape, but the job isn’t done if whole groups still struggle to use it. Rural citizens, older people, under-documented users, and others with lower digital confidence can all be left behind if reach becomes an afterthought. Now the challenge is getting the programme to work for everyone, not just those who are easiest to reach.\n\nHow do you close the gap?",
        insight: "Social benefits and remittances can be paid directly into mobile wallets, giving recipients faster access to funds and a digital transaction history that unlocks access to additional financial services.",
        options: [
          { id: "A", title: "Phygital-Led", description: "Expand assisted and in-person support alongside digital channels so more citizens can access the programme in the way that works for them.", feedback: "You widen practical access for harder-to-serve groups, but add more delivery complexity and cost.", score: { growth: 1, trust: 2, control: 1, momentum: 0 } },
          { id: "B", title: "Data-Led", description: "Use existing public-sector data to spot excluded groups, target outreach more precisely, and remove barriers that are keeping people out.", feedback: "You improve inclusion, but expose the complexity of digitising, matching, and relying on government data at scale.", score: { growth: 2, trust: 2, control: 1, momentum: 0 } },
          { id: "C", title: "Incentive-Led", description: "Use programme-linked digital incentives, such as faster payout or digital vouchers to encourage harder-to-reach groups onto the rail.", feedback: "You accelerate uptake through the programme itself, but risk behaviour that depends more on incentives than lasting confidence.", score: { growth: 1, trust: 1, control: 0, momentum: 2 }, aggressive: true },
        ],
      },
      {
        id: 5,
        title: "Expand Government Flows",
        description: "You’ve proven the programme can handle citizen-facing payments. Now the opportunity is getting bigger. More government payment flows could run through the same infrastructure, turning one successful programme into a core public rail. The next move could take it even further.\n\nWhat do you add next?",
        insight: "Prepaid payroll cards offer a safer, faster alternative, giving employees instant access to wages, everyday spending power, and a foothold in the digital economy.",
        options: [
          { id: "A", title: "Add Public Payroll", description: "Extend the programme into government wages, allowances, and other workforce-related payment flows.", feedback: "You make the programme more central to government operations, but raise the pressure for consistent, error-free delivery at payroll scale.", score: { growth: 2, trust: 1, control: 1, momentum: 2 }, aggressive: true },
          { id: "B", title: "Add Government Operations", description: "Extend the programme into operational flows like supplier payments, stipends, departmental reimbursements, or field-worker disbursements.", feedback: "You bring more of the state's payment flows onto a managed rail, but coordinating across departments adds real complexity.", score: { growth: 2, trust: 2, control: 2, momentum: 1 } },
          { id: "C", title: "Add Public Collections", description: "Extend the programme into payments coming back to government, such as taxes, fees, fines, permits, or service payments.", feedback: "You enable two-way public money movement, but add more complexity around reconciliation, user experience, and agency coordination.", score: { growth: 2, trust: 1, control: 1, momentum: 0 } },
        ],
      },
      {
        id: 6,
        title: "Fit the Rails",
        description: "You started with a government payments programme. Now it is big enough to shape how public money moves far more broadly. For the final challenge, you need to decide how much further the programme should expand. This choice determines whether it remains a government function or becomes infrastructure in its own right.\n\nWhich path do you take?",
        insight: "Paymentology’s API framework enables multi-rail payment options, so users can move money in the way that suits them: card to card, card to account, or account to account. That flexibility helps make payments faster, more secure, and better suited to different needs.",
        options: [
          { id: "A", title: "Keep It Purpose-Built", description: "Keep the focus tight around core government payments and service delivery.", feedback: "You protect clarity and public accountability, but limit how much broader value the programme can create.", score: { growth: 1, trust: 2, control: 2, momentum: 0 } },
          { id: "B", title: "Expand the Public Rail", description: "Develop the programme into broader public financial infrastructure that supports more of everyday civic life.", feedback: "You increase the rail’s strategic value across the state, but take on more scope, governance pressure, and delivery complexity.", score: { growth: 2, trust: 2, control: 0, momentum: 1 } },
          { id: "C", title: "Open to Ecosystem", description: "Let approved banks, fintechs, employers, and service providers build on top of the programme under clear rules and oversight.", feedback: "You expand innovation and utility around the rail, but make outcomes more dependent on ecosystem quality and governance.", score: { growth: 2, trust: 1, control: -1, momentum: 2 }, aggressive: true },
        ],
      },
    ],
  },

  // ─── TELCO ───
  {
    id: "telco",
    name: "Telco",
    intro: ["You’ve built a telco and already have what most financial players want: reach, frequency, and a place in customers’ everyday lives. But if you want to become a bigger part of how they manage and move their money, utility alone is not enough. To build a financial ecosystem people trust and stick with, you’ll need to make the right calls, deepen the customer relationship, and expand beyond the wallet.", "Do you have what it takes?"],
    scenarios: [
      {
        id: 1,
        title: "Enter the Market",
        description: "You can see the opportunity in financial services, but before deciding what to launch, you need to determine how to enter the market. The route you choose will shape how quickly you can move and how much control you keep.\n\nWhat’s your first move?",
        insight: "Partnering with SaaS providers can give telcos a faster path into financial services, and unlock capabilities like instant card issuance, AI-driven decisioning, instalments, and POS-level add-ons. It can also make it easier to scale, reduce costs, and stay future-ready.",
        options: [
          { id: "A", title: "Buy In", description: "Acquire an existing financial services player or capability to establish a faster position in the market.", feedback: "You gain speed and capability, but take on a bigger integration challenge and a higher upfront cost.", score: { growth: 2, trust: 0, control: -1, momentum: 2 }, aggressive: true },
          { id: "B", title: "Partner Up", description: "Work with fintechs, embedded finance players, and regulated institutions to fill gaps and launch faster.", feedback: "You accelerate entry and unlock specialist capability, but make success more dependent on partner fit and alignment.", score: { growth: 2, trust: 2, control: 0, momentum: 1 } },
          { id: "C", title: "Build It", description: "Develop the capability in-house so you keep tighter control over the product, operations, and integration with the core business.", feedback: "You keep more strategic ownership, but take on higher build cost, longer lead times, and more execution risk.", score: { growth: 1, trust: 2, control: 2, momentum: 0 } },
        ],
      },
      {
        id: 2,
        title: "Choose the Customer",
        description: "You’ve made your move into financial services. Now you have to decide who you are really building for. Market size is only part of the equation. You also need to find the right balance between revenue potential, servicing cost, and long-term fit.\n\nWhich customer base do you target?",
        insight: "Around 1.4 billion adults still lacked access to formal financial services in 2021, according to the World Bank. With 5.4 billion unique mobile subscribers worldwide, telcos are uniquely placed to close that gap through mobile-led accounts, remittances, credit, and agent networks that reach underserved communities.",
        options: [
          { id: "A", title: "Back the Underserved", description: "Focus on underbanked customers who need simple, accessible services like wallets, savings, remittances, and basic credit.", feedback: "You open up a large and important market, but face lower margins and constant pressure to keep costs down.", score: { growth: 2, trust: 2, control: 1, momentum: 1 }, aggressive: true },
          { id: "B", title: "Go Upmarket", description: "Target higher-income customers with more advanced needs like cross-border payments, lending, or wealth services.", feedback: "You move toward a higher-value segment, but take on higher acquisition and servicing costs.", score: { growth: 2, trust: 1, control: 0, momentum: 1 } },
          { id: "C", title: "Own a Niche", description: "Pick a specific underserved need and build a targeted proposition around it.", feedback: "You create a sharper entry point, but limit how broadly you can scale the offer at first.", score: { growth: 1, trust: 2, control: 1, momentum: 0 } },
        ],
      },
      {
        id: 3,
        title: "Win the Customer",
        description: "Choosing the right customer is only half the game. Now you need an experience that drives growth and keeps them coming back. In a market shaped by instant access, real-time visibility, and seamless journeys, you have to decide what will win them over.\n\nWhat’s your approach?",
        insight: "Telcos sit on a powerful advantage: customer behaviour data across devices, channels, and journeys. When those insights are connected through Customer Relationship Management (CRM), web, and mobile, they can power more relevant wallet and card experiences, and a much clearer view of the full customer journey.",
        options: [
          { id: "A", title: "Go Instant", description: "Lead with instant onboarding, immediate wallet access, and faster first-use journeys.", feedback: "You make the service faster and easier to adopt, but put more pressure on fulfilment, servicing, and digital execution.", score: { growth: 2, trust: 1, control: 0, momentum: 2 }, aggressive: true },
          { id: "B", title: "Make It Personal", description: "Use telco data and customer insight to tailor offers, promotions, and product journeys more closely to behaviour.", feedback: "You make the proposition more relevant and sticky, but take on more complexity in data use and execution.", score: { growth: 2, trust: 2, control: 1, momentum: 2 } },
          { id: "C", title: "Smooth Operator", description: "Focus on making onboarding, payments, account management, and support feel simpler and more intuitive.", feedback: "You improve the experience end to end, but take a steadier path to growth than a more aggressive digital push.", score: { growth: 1, trust: 2, control: 0, momentum: 1 } },
        ],
      },
      {
        id: 4,
        title: "Expand the Use Case",
        description: "The service has grown beyond airtime and simple transfers, and customers expect more from mobile money. Now you need to decide how far to expand and what role it should play in customers’ lives.\n\nWhat do you build next?",
        insight: "Paymentology partnered with Safaricom to turn M-PESA from a local wallet in Kenya into a gateway for global commerce, giving 30 million users a way to pay internationally through a secure virtual card. By 2023, more than 1 million cards had been activated.",
        options: [
          { id: "A", title: "Own the Wallet", description: "Keep the focus on wallet-led utility like payments, transfers, bill pay, and stored value.", feedback: "You build a clearer, more scalable core proposition, but limit how far the service stretches into broader financial needs.", score: { growth: 1, trust: 2, control: 1, momentum: 0 } },
          { id: "B", title: "Build the Bank", description: "Expand into fuller banking-style services like savings, lending, and a broader account relationship.", feedback: "You open up a deeper, more valuable financial role, but take on more regulation, servicing, and operating complexity.", score: { growth: 2, trust: 1, control: 0, momentum: 2 }, aggressive: true },
          { id: "C", title: "Beyond the Wallet", description: "Use financial services to power a wider ecosystem of lifestyle, commerce, and digital services.", feedback: "You increase strategic upside and customer embeddedness, but take on the broadest product and ecosystem complexity.", score: { growth: 2, trust: 1, control: -1, momentum: 1 } },
        ],
      },
      {
        id: 5,
        title: "Scale the Controls",
        description: "More transactions, more stored value, and broader use cases are making the service more important and more exposed. And as the financial layer grows, managing fraud, compliance, agent risk, and transaction monitoring only gets harder. Now you need a control model that can handle the added pressure.\n\nHow do you strengthen your control model?",
        insight: "Paymentology’s Fraud Control Services gives issuers layered, real-time control. It combines upfront checks, a powerful decision engine, and BIN-level monitoring with customisable rules, continuous oversight, and pre-defined alerts to help keep fraud risk in check at scale.",
        options: [
          { id: "A", title: "Build the Engine", description: "Expand in-house fraud, monitoring, and risk operations so you own more of the control model directly.", feedback: "You build stronger internal capability, but take on more cost and operational complexity.", score: { growth: 1, trust: 2, control: 2, momentum: 0 } },
          { id: "B", title: "Bring in the Specialists", description: "Use fraud, identity, and monitoring partners to strengthen control faster.", feedback: "You improve protection more quickly, but make performance more dependent on partner quality and integration.", score: { growth: 1, trust: 2, control: 2, momentum: 1 }, aggressive: true },
          { id: "C", title: "Tighten the Flow", description: "Use stricter limits, stronger verification, and tighter decisioning to cut exposure faster.", feedback: "You reduce risk more quickly, but increase friction for genuine users.", score: { growth: 0, trust: 0, control: 2, momentum: -1 } },
        ],
      },
      {
        id: 6,
        title: "Back the Future",
        description: "You have built a meaningful foothold in financial services. Integration is getting easier, customer expectations keep shifting, and new models are opening up, from embedded finance to crypto to API-led platforms. The next wave of growth will come from the future you choose to back.\n\nWhere do you place your next bet?",
        insight: "As financial technology becomes easier to integrate, telcos can move beyond basic payments and build services around embedded finance, DeFi, crypto, and open APIs that let third parties innovate on top of their wallets.",
        options: [
          { id: "A", title: "Power the Ecosystem", description: "Use payments, lending, and financial tools to support a wider network of everyday telco services.", feedback: "You make financial services more central to the wider ecosystem, but take on more complexity across products, journeys, and partnerships.", score: { growth: 2, trust: 2, control: 0, momentum: 1 } },
          { id: "B", title: "Push the Edge", description: "Experiment with DeFi, crypto, or stablecoin-based services to unlock new use cases and tap emerging demand.", feedback: "You move closer to the edge of innovation, but take on more uncertainty around regulation, adoption, and trust.", score: { growth: 1, trust: 0, control: -1, momentum: 2 }, aggressive: true },
          { id: "C", title: "Open the Platform", description: "Let developers and partners build on top of your wallet and financial infrastructure through open APIs.", feedback: "You expand the platform’s reach and innovation potential, but make success more dependent on ecosystem quality and coordination.", score: { growth: 1, trust: 1, control: 0, momentum: 2 } },
        ],
      },
    ],
  },

  // ─── REMITTANCE ───
  {
    id: "remittance",
    name: "Remittance",
    intro: ["You’ve built a service people trust with money that matters. But in remittance, reliability is only the starting point. Now you need to build beyond the transfer, creating more value for customers and becoming harder to replace. Make the right calls and defend your relevance.", "Do you have what it takes?"],
    scenarios: [
      {
        id: 1,
        title: "Fight Fee Pressure",
        description: "A rival has just entered one of your key corridors with lower fees and louder pricing. Your service is trusted and transfers are still flowing, but the pressure is building fast. Misjudge this moment, and you either lose volume or start bleeding margin just to stay visible.\n\nHow do you fight back?",
        insight: "The cost of sending remittances has been falling for years. World Bank data shows the global average dropped from 8.36% in Q1 2014 to 6.35% in Q1 2024.",
        options: [
          { id: "A", title: "Cost Lead", description: "Drop prices aggressively and take the fight head-on.", feedback: "You stay competitive on cost, but squeeze your margin in the process.", score: { growth: 2, trust: 0, control: 0, momentum: 2 }, aggressive: true },
          { id: "B", title: "Quality Signal", description: "Compete on speed, transparency, and reliability instead of chasing the lowest price.", feedback: "You strengthen trust in the core offer, but take a slower path to volume growth.", score: { growth: 2, trust: 2, control: 0, momentum: 0 } },
          { id: "C", title: "Corridor Focus", description: "Concentrate investment on the corridors where trust and economics are already strongest.", feedback: "You protect your strongest positions, but limit how broadly you respond to price pressure.", score: { growth: 0, trust: 1, control: 2, momentum: 0 } },
        ],
      },
      {
        id: 2,
        title: "Rethink Cash",
        description: "A key local payout network is shifting hard toward digital disbursement, where costs are lower and delivery scales faster. But cash still holds trust in important corridors. Now you have to choose what kind of payout model survives the next phase.\n\nWhat’s your play?",
        insight: "In-person financial services still matter in many parts of the world, especially for underbanked communities with limited access to traditional bank accounts.",
        options: [
          { id: "A", title: "Lead with Digital", description: "Make digital payout the default, with cash there as a fallback.", feedback: "You start changing user behaviour, but risk resistance where cash still feels safer and more familiar.", score: { growth: 1, trust: 0, control: 0, momentum: 2 } },
          { id: "B", title: "Keep Cash Strong", description: "Prioritise cash payout in corridors where recipients still rely on it most.", feedback: "You defend usability where it matters, but keep more cost and operational drag in the model.", score: { growth: 1, trust: 2, control: 0, momentum: 0 } },
          { id: "C", title: "Build the Destination", description: "Create a digital destination for funds, such as a wallet, card, or stored-value account.", feedback: "You create a stronger digital proposition, but take on more product and servicing complexity.", score: { growth: 2, trust: 1, control: 0, momentum: 1 }, aggressive: true },
        ],
      },
      {
        id: 3,
        title: "Back New Rails",
        description: "The payout model is getting squeezed from every direction. Cash still matters in some corridors, but digital rails are advancing fast. The challenge is choosing which rails can best respond to those pressures. Customers may never see the infrastructure behind their payout, but they will feel every difference in speed, cost, and convenience.\n\nWhere do you place your bet?",
        insight: "Stablecoins can move money around the world at very low cost, often faster than traditional remittance transfers.",
        options: [
          { id: "A", title: "Back Stablecoins", description: "Use stablecoin-based flows where they could reduce cost, improve speed, or make cross-border movement more flexible.", feedback: "You have move closer to a potentially cheaper and faster future, but take on more regulatory, partner, and execution risk early.", score: { growth: 1, trust: 0, control: -1, momentum: 2 }, aggressive: true },
          { id: "B", title: "Double Down on Accounts", description: "Lean further into bank-account and account-based payout routes as the most familiar and scalable digital destination.", feedback: "You keep the model easier to explain and widely usable, but may look less flexible in markets where account access is uneven.", score: { growth: 0, trust: 2, control: 2, momentum: -1 } },
          { id: "C", title: "Build the Wallet", description: "Make wallets a more central payout destination, with stronger integrations and a more useful digital recipient experience.", feedback: "You make payout more convenient and digital-first, but increase dependency on wallet adoption and the strength of your local partner network.", score: { growth: 2, trust: 2, control: 0, momentum: 1 } },
        ],
      },
      {
        id: 4,
        title: "Move Beyond the Transfer",
        description: "You’ve made decisions on how the money moves. Now focus shifts to the people behind those transfers. Many remittance customers are migrants supporting families back home, who can face wider financial challenges like opening accounts, proving identity, or accessing credit in a new country.\n\nWhat role do you play next in their journey?",
        insight: "Remittance users are far from one-size-fits-all, from expats and migrant workers to entrepreneurs, relocated families, and people seeking safer stores of value across borders.",
        options: [
          { id: "A", title: "Build the Arrival Layer", description: "Create services that help newcomers get set up from day one, from onboarding and identity checks to credit recognition and multi-currency tools.", feedback: "You make the proposition more valuable at a life-changing moment, but add more complexity across infrastructure, compliance, data-sharing, and partnerships.", score: { growth: 2, trust: 2, control: -1, momentum: 1 } },
          { id: "B", title: "Own Everyday Use", description: "Make remittance funds more useful through cards, wallets, bill pay, and day-to-day spending tools.", feedback: "You make the service more relevant in daily life, but raise the pressure to deliver a broader, smoother customer experience.", score: { growth: 1, trust: 1, control: 0, momentum: 2 }, aggressive: true },
          { id: "C", title: "Grow Family Money Tools", description: "Add tools for shared support, recurring transfers, household budgeting, and other family money needs across borders.", feedback: "You unlock a bigger role in family finances, but take on more complexity in access, permissions, and support.", score: { growth: 2, trust: 2, control: 1, momentum: 1 } },
        ],
      },
      {
        id: 5,
        title: "Build Stickiness",
        description: "Customers are starting to expect more than a one-off transfer. Some want practical tools that make the service useful between payments. Others are comparing you with wallets, superapps, and digital platforms that already give them more ways to hold, use, or stretch money across borders.\n\nHow do you give customers stronger reasons to stay?",
        insight: "Remittance firms are going beyond the transfer to build stronger customer loyalty. They’re bundling in other services, tailoring products to specific needs, offering perks and rewards, and adding smarter tools that make the experience harder to leave.",
        options: [
          { id: "A", title: "Build the Toolkit", description: "Create tailored financial products around how customers actually send, receive, and manage money across borders.", feedback: "You build a more differentiated proposition, but take on more product complexity and a broader servicing burden.", score: { growth: 2, trust: 1, control: 0, momentum: 0 }, aggressive: true },
          { id: "B", title: "Bridge the Gap", description: "Offer small, tightly scoped credit or advance features to help customers handle short-term gaps between payments.", feedback: "You add value when it matters most, but take on more risk, regulation, and servicing complexity.", score: { growth: 1, trust: 0, control: -1, momentum: 0 } },
          { id: "C", title: "Unlock the Spend", description: "Launch cards or loyalty benefits tied to remittance behaviour, such as better FX, transfer-linked perks, or recipient-side benefits", feedback: "You give customers another reason to stay, but risk weaker loyalty if the benefits do too much of the work.", score: { growth: 1, trust: 2, control: 0, momentum: 1 } },
        ],
      },
      {
        id: 6,
        title: "Choose Your Future",
        description: "The business is no longer judged only on whether it can move money reliably. Pricing pressure, customer expectations, added services, and the rails underneath them have all expanded what’s possible. Your trusted remittance service could now become something bigger.\n\nWhat kind of business do you build from here?",
        insight: "The remittance industry is facing a shake-up on the scale of the telegraph’s arrival 180 years ago. Once dominant banks and money transfer firms are losing ground to fintechs, local players, superapps, retailers, and telcos. Paymentology’s Remittance Revolution report explores how remittance firms can adapt and thrive through this disruption.",
        options: [
          { id: "A", title: "Go Premium", description: "Build a higher-value service with stronger support, faster delivery, and premium features for customers who need more than a basic transfer.", feedback: "You create a more differentiated offer, but narrow the audience and raise the bar on service quality.", score: { growth: 1, trust: 2, control: 0, momentum: 0 } },
          { id: "B", title: "Build the All-in-One", description: "Develop a broader cross-border product that brings transfers, stored value, cards, bill pay, and everyday money tools into one place.", feedback: "You make the proposition harder to replace, but take on much more product and operational complexity.", score: { growth: 2, trust: 1, control: 0, momentum: 0 }, aggressive: true },
          { id: "C", title: "Own a Niche", description: "Stay focused on a specific market, corridor, or customer segment and serve it better than anyone else.", feedback: "You sharpen your position, but limit how broadly you can scale.", score: { growth: 0, trust: 1, control: 0, momentum: 2 } },
        ],
      },
    ],
  },

  // ─── DIGITAL BANKS ───
  {
    id: "digital-banks",
    name: "Digital Banks",
    intro: ["You’ve built a digital bank people like. Now you need to become the one they rely on. Make the right calls, drive deeper usage, and turn a polished product into the customer’s primary financial home.", "Do you have what it takes?"],
    scenarios: [
      {
        id: 1,
        title: "Drive Demand",
        description: "The bank is live, but demand is not coming fast enough. Acquisition is expensive, sign-ups are slower than expected, and a polished product is not yet turning into real momentum.\n\nHow do you get more people through the door?",
        insight: "Paymentology powers GoTyme, a digital bank serving the underbanked in the Philippines. It issues virtual and physical Visa debit cards in minutes through its app and digital kiosks, delivering the speed, scale, and security needed for rapid growth.",
        options: [
          { id: "A", title: "Push Incentives", description: "Use cashback, rewards, or joining offers to drive sign-ups faster.", feedback: "You accelerate acquisition, but risk attracting customers who only show up for the offer.", score: { growth: 2, trust: 0, control: 0, momentum: 2 }, aggressive: true },
          { id: "B", title: "Go Phygital", description: "Blend digital sign-up with human support to help customers discover, trust, and join the bank with confidence.", feedback: "You make the product easier to adopt, but add more servicing cost and complexity.", score: { growth: 1, trust: 2, control: 1, momentum: 0 } },
          { id: "C", title: "Broaden the Offer", description: "Add a few complementary features or products to make the bank more compelling from the start.", feedback: "You widen the appeal, but add complexity before the core product has fully proved itself.", score: { growth: 2, trust: 1, control: 0, momentum: 1 } },
        ],
      },
      {
        id: 2,
        title: "Build Spend Habit",
        description: "Sign-ups are climbing, but too many customers still aren’t building a real spending habit. They may have the account, even the card, but if first spend doesn’t turn into repeat spend, the bank risks becoming a nice idea instead of a useful one.\n\nHow do you get customers spending?",
        insight: "For digital banks to thrive, modern API-driven, event-based platforms are becoming essential for delivering more personalised customer experiences and adapting quickly as the market shifts.",
        options: [
          { id: "A", title: "Skip the Plastic", description: "Let customers start spending digitally right away, without waiting for the physical card to arrive.", feedback: "You speed up first use, but depend more on customers being comfortable starting fully digital.", score: { growth: 1, trust: 0, control: 0, momentum: 2 }, aggressive: true },
          { id: "B", title: "Build the Habit", description: "Use budgeting tools, spend nudges, and simple money features to encourage repeat use.", feedback: "You build a stronger path to lasting behaviour, but take a slower route to spend growth.", score: { growth: 2, trust: 2, control: 1, momentum: 1 } },
          { id: "C", title: "Add Cash Access", description: "Give customers easier access to cash through local networks or merchants, making the account more useful day-to-day.", feedback: "You make the account more useful in the real world, but add more partner and operational complexity.", score: { growth: 1, trust: 2, control: 1, momentum: 1 } },
        ],
      },
      {
        id: 3,
        title: "Become the Main Account",
        description: "Customers are spending more, but their financial centre of gravity still sits somewhere else. Salaries land with another bank, government payments go elsewhere, and the most important inflows still bypass your account. Until more of that money starts landing here, the product risks staying useful, but secondary.\n\nHow do you become the main account?",
        insight: "Many successful digital banks start simple, launching with one strong card proposition, then expanding as customer demand becomes clearer. With the right data, they can shape smarter product roadmaps instead of overwhelming users with too much, too soon.",
        options: [
          { id: "A", title: "Win Salary", description: "Make this the account where salaries land, using incentives or stronger product value.", feedback: "You move closer to primary-account status, but getting customers to reroute salary is still a high-friction ask.", score: { growth: 2, trust: 0, control: 0, momentum: 2 }, aggressive: true },
          { id: "B", title: "Capture Disbursements", description: "Go after government payments, benefits, or other regular inflows that can make the account more active and more essential.", feedback: "You build a stronger inflow engine, but take on more complexity in partnerships, compliance, and public-sector fit.", score: { growth: 1, trust: 1, control: 0, momentum: 0 } },
          { id: "C", title: "Own the Relationship", description: "Strengthen trust and preference through clearer positioning, more transparent communication, and a more reassuring customer experience.", feedback: "You build trust and brand pull, but it may take longer - and cost more - to turn that into primary-account behaviour.", score: { growth: 1, trust: 2, control: 0, momentum: -1 } },
        ],
      },
      {
        id: 4,
        title: "Serve Small Business",
        description: "A new opportunity is opening up around the bank. Freelancers, sole traders, and micro-business owners are turning up because traditional providers still do not serve them well. Some cannot open an account easily. Some are battling uneven cashflow. Others just want simple tools that match how they actually run their business. The demand is real.\n\nWhere do you place your bet?",
        insight: "SMEs power roughly two-thirds of the global economy, yet many are still underserved by payment services. What they need are flexible, affordable systems that combine fast integration, useful data, compliance support, fraud defence, and room to scale - without the cost of building from scratch.",
        options: [
          { id: "A", title: "Lower the Barriers", description: "Simplify onboarding and account access for freelancers and small operators blocked by traditional banking requirements.", feedback: "You make the bank easier to access for underserved businesses, but take on more onboarding, verification, and support risk.", score: { growth: 2, trust: 1, control: -1, momentum: 0 }, aggressive: true },
          { id: "B", title: "Lend to Grow", description: "Offer small, practical credit products to help underbanked operators manage cashflow and keep trading.", feedback: "You make the bank more useful when it matters, but take on more credit risk and exposure.", score: { growth: 2, trust: 2, control: 0, momentum: 0 } },
          { id: "C", title: "Run the Business", description: "Focus on lightweight tools like invoicing, expense controls, and cashflow visibility to help small operators manage money better.", feedback: "You make the product more useful day to day, but stop short of solving access and funding gaps directly.", score: { growth: 1, trust: 1, control: 2, momentum: 1 } },
        ],
      },
      {
        id: 5,
        title: "Fight the Fraud Wave",
        description: "More usage, more value, and deeper engagement have made the bank more attractive to fraudsters. Suspicious activity is rising, disputes are getting louder, and weak controls are becoming harder to hide. This is no longer background noise. It is a live test of whether the bank can scale trust as fast as it scales usage.\n\nHow do you fight back?",
        insight: "Fraud patterns keep evolving, and legacy systems often react too slowly. Next-generation processors use real-time data, smarter detection, and built-in controls to help issuers spot threats faster, respond sooner, and prevent more risk before it spreads.",
        options: [
          { id: "A", title: "Build the Fraud Engine", description: "Strengthen your in-house fraud, risk, and trust capability with better tools, faster decisioning, and a bigger specialist team.", feedback: "You build stronger internal defence, but take on more cost and operational complexity.", score: { growth: 1, trust: 1, control: 2, momentum: 0 }, aggressive: true },
          { id: "B", title: "Partner for Protection", description: "Bring in specialist fraud, identity, or transaction-monitoring partners to improve detection and response faster.", feedback: "You improve protection more quickly, but increase dependency on vendors and integration quality.", score: { growth: 0, trust: 2, control: 2, momentum: 1 } },
          { id: "C", title: "Redesign the Risk Points", description: "Rework onboarding, authentication, transaction limits, and user prompts to reduce exposure where it matters most.", feedback: "You reduce risk through smarter product design, but add more friction to sensitive moments in the journey.", score: { growth: 0, trust: 1, control: 2, momentum: 0 } },
        ],
      },
      {
        id: 6,
        title: "Face the Superapp Threat",
        description: "A new competitor is pulling more of daily financial life into one place: payments, rewards, budgeting, credit, and more. Customers are starting to compare usefulness, not just UX. The competitive bar has moved, and standing still risks leaving your bank behind.\n\nWhat’s your competitive play?",
        insight: "For digital banks and fintechs, a successful card programme is about far more than issuing plastic. Today’s cardholders expect a payment experience that feels seamless, adaptable, and in step with how they live, spend, and manage money.",
        options: [
          { id: "A", title: "Match the Superapp", description: "Fight back with stronger rewards, sharper pricing, or broader product value.", feedback: "You make the proposition more competitive, but increase pressure on margins, execution, and control.", score: { growth: 2, trust: -1, control: -1, momentum: 1 }, aggressive: true },
          { id: "B", title: "Stay Narrow", description: "Focus on a smaller niche and defend it well instead of broadening too far.", feedback: "You protect focus, but limit how central the product can become.", score: { growth: 0, trust: 2, control: 2, momentum: 0 } },
          { id: "C", title: "Become the Hub", description: "Add the tools, connections, and partnerships that make the bank a more central place in everyday financial life.", feedback: "You make the product harder to replace, but take a slower and more demanding path to competitive defence.", score: { growth: 2, trust: 2, control: 0, momentum: 2 } },
        ],
      },
    ],
  },

  // ─── BANKS ───
  {
    id: "banks",
    name: "Banks",
    intro: ["You’re running a card business with real scale, real trust, and a lot worth protecting. But the market is moving faster than the bank, and legacy complexity is getting harder to hide. Make the right calls, modernise what matters, and prove this business can still compete.", "Do you have what it takes?"],
    scenarios: [
      {
        id: 1,
        title: "Reinvent the Card Experience",
        description: "Your card business has scale, but the experience is starting to feel dated. Too much still feels slow, rigid, and tied to legacy processes, and customers now expect instant digital issuance, smoother global spending, and more control over how their card works day to day.\n\nWhich part of the card experience do you reinvent first?",
        insight: "Modern card issuance lets banks give customers instant virtual or physical cards, simpler multi-currency spending, secure contactless payments, and real-time controls like freezing cards, setting limits, and managing tokenized transactions.",
        options: [
          { id: "A", title: "Issue Instantly", description: "Prioritise instant digital issuance so customers can access and use the card right away.", feedback: "You make the card feel faster and more modern, but raise the pressure on digital servicing and fulfilment to keep up.", score: { growth: 1, trust: 1, control: 0, momentum: 2 } },
          { id: "B", title: "Spend Borderless", description: "Build around multi-currency support and smoother global spending.", feedback: "You make the proposition more relevant for travel and international spend, but add complexity in pricing, servicing, and operations.", score: { growth: 2, trust: 1, control: -1, momentum: 1 }, aggressive: true },
          { id: "C", title: "Show More Control", description: "Give customers better visibility and self-serve tools, from card freezing to spend limits and transaction settings.", feedback: "You make the card feel more transparent and manageable, but stop short of fixing the deeper systems behind it.", score: { growth: 1, trust: 2, control: 2, momentum: 0 } },
        ],
      },
      {
        id: 2,
        title: "Modernise the Backbone",
        description: "The bank can improve the card experience on the surface, but underneath it still runs on infrastructure built for a slower era. Core systems are hard to update, delivery takes too long, and every improvement creates more strain behind the scenes.\n\nWhat’s your modernisation play?",
        insight: "Next-generation processors are typically cloud-based, which often makes pricing more transparent and cost-effective. That’s a big advantage for issuers trying to improve efficiency without losing control of costs.",
        options: [
          { id: "A", title: "Move to the Cloud", description: "Prioritise cloud-based infrastructure and more scalable architecture.", feedback: "You build a stronger long-term foundation, but take on a bigger transformation before customers feel the payoff.", score: { growth: 0, trust: 1, control: 2, momentum: 0 } },
          { id: "B", title: "Layer Around Legacy", description: "Keep core legacy systems in place, but add modern layers around them where customers feel it most.", feedback: "You accelerate visible progress, but keep more long-term complexity alive underneath.", score: { growth: 2, trust: 1, control: 0, momentum: 1 }, aggressive: true },
          { id: "C", title: "Fix the Pressure Points", description: "Target the parts of the backbone causing the most drag, without transforming the whole stack at once.", feedback: "You reduce operational pain, but accept a slower path to deeper modernisation.", score: { growth: 1, trust: 1, control: 1, momentum: 0 } },
        ],
      },
      {
        id: 3,
        title: "Secure the Card",
        description: "The bank already has fraud and security controls in place, but the card model is evolving faster than the protection around it. Issuance is becoming more digital, servicing is becoming more immediate, and customers expect more control. Older fraud and risk setups are starting to show their limits.\n\nWhere do you strengthen your defences?",
        insight: "As payments digitise, fraud is moving faster than many legacy banks can keep up. Advanced analytics and AI at the processor level can help banks spot suspicious behaviour in real time, strengthen fraud defences, and build more modern, customer-focused services.",
        options: [
          { id: "A", title: "Strengthen the Engine", description: "Invest more heavily in fraud detection, monitoring, and risk controls behind the scenes.", feedback: "You improve protection at scale, but add more cost and complexity while customers may not feel the benefits as directly.", score: { growth: 0, trust: 2, control: 2, momentum: 0 } },
          { id: "B", title: "Step Up the Response", description: "Focus on faster alerts, quicker intervention, and better support when security issues hit.", feedback: "You improve trust in the moments that matter most, but add more servicing pressure and operational dependency.", score: { growth: 0, trust: 2, control: 0, momentum: 1 }, aggressive: true },
          { id: "C", title: "Tighten the Rules", description: "Use stricter decisioning, thresholds, and authentication to reduce exposure as the card model becomes more digital.", feedback: "You cut risk faster, but increase friction and false positives for genuine customers.", score: { growth: -1, trust: 1, control: 2, momentum: -1 } },
        ],
      },
      {
        id: 4,
        title: "Upgrade Wealth Management",
        description: "You’ve modernised the card business, but your most valuable clients now expect more. Family offices want real-time visibility, tighter governance, and less manual work across cards, currencies, and complex structures.\n\nHow do you upgrade the wealth experience without losing control?",
        insight: "Paymentology’s cloud-native platform combines secure APIs with rich real-time data, making it easier for banks to launch tailored programmes fast. With 120+ transaction data points in every FAST Message feed, banks can power smarter money tools, sharper insights, and more personalised loyalty experiences.",
        options: [
          { id: "A", title: "Connect Spend to Wealth", description: "Link card activity more directly into wealth reporting, spending visibility, and consolidated dashboards.", feedback: "You give clients and advisers a clearer whole-picture view, but take on more data, integration, and reporting complexity.", score: { growth: 2, trust: 2, control: 0, momentum: 1 } },
          { id: "B", title: "Tighten Governance", description: "Build stronger controls, approvals, monitoring, and audit-ready oversight for family-office-style spending and delegation.", feedback: "You improve governance and reduce blind spots, but make the servicing model more structured and operationally heavier.", score: { growth: 1, trust: 2, control: 2, momentum: 0 } },
          { id: "C", title: "Design for the Next-Gen", description: "Create a more digital-first wealth experience with better mobile access, real-time visibility, and smoother day-to-day interaction.", feedback: "You make the proposition feel more modern and relevant, but take a less immediate path to deeper governance and reporting.", score: { growth: 2, trust: 1, control: 0, momentum: 2 }, aggressive: true },
        ],
      },
      {
        id: 5,
        title: "Move the Base",
        description: "A huge part of the portfolio still sits on old products, legacy servicing journeys, and outdated operating rules. The new setup may be better, but its full benefits are out of reach while so many live customers remain on the old estate.\n\nHow boldly do you move the base onto the new model?",
        insight: "You do not need to rip and replace to modernise. Legacy banks can migrate onto our platform in phases, upgrade existing programmes on-platform, and add new card programmes and services through an API-driven issuer processor. Legacy systems and other processors can keep running in parallel.",
        options: [
          { id: "A", title: "Push the Migration", description: "Move customers across quickly to simplify the estate and unlock the new model faster.", feedback: "You accelerate simplification, but raise the risk of disruption and migration fatigue.", score: { growth: 2, trust: -1, control: 0, momentum: 2 }, aggressive: true },
          { id: "B", title: "Protect the Legacy Base", description: "Keep more customers on legacy products for longer while the new model proves itself.", feedback: "You reduce short-term disruption, but keep more cost, complexity, and duplication alive.", score: { growth: 0, trust: 2, control: 2, momentum: -1 } },
          { id: "C", title: "Move by Segment", description: "Migrate customers by product type, value tier, or readiness instead of treating the whole base the same way.", feedback: "You make the migration more tailored, but add more complexity to how the transition is managed.", score: { growth: 2, trust: 2, control: 1, momentum: 1 } },
        ],
      },
      {
        id: 6,
        title: "Redefine the Future",
        description: "You have started moving customers onto the new model, but the market is still shifting around you. Digital players, embedded finance, and ecosystem partnerships are reshaping how customers access financial services.\n\nWhat role does your bank play in that future?",
        insight: "CaaS is powering embedded finance far beyond banking, helping ecommerce brands, retailers, and ride-sharing platforms launch their own payment experiences. In markets with limited banking access, it is also opening the door to prepaid cards, digital wallets, and other services that can widen financial inclusion.",
        options: [
          { id: "A", title: "Compete Head-On", description: "Double down on your own digital experience, speed, and product strength to compete more directly.", feedback: "You make the bank more competitive on its own terms, but increase pressure on execution, margins, and complexity.", score: { growth: 2, trust: 1, control: -1, momentum: 2 }, aggressive: true },
          { id: "B", title: "Power the Ecosystem", description: "Work with platforms, apps, and partners so the bank becomes the trusted financial layer behind more customer journeys.", feedback: "You expand reach and relevance, but make success more dependent on partner performance and distribution quality.", score: { growth: 2, trust: 2, control: 0, momentum: 1 } },
          { id: "C", title: "Focus Upmarket", description: "Step back from the mass-market fight and concentrate on premium and business banking, where relationships and service still matter most.", feedback: "You focus the bank on higher-value segments, but accept a smaller role in the broader consumer market.", score: { growth: 1, trust: 2, control: 1, momentum: 0 } },
        ],
      },
    ],
  },

];
