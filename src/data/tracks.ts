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
        description: "Launch is close. The goal: smarter spending, faster payouts and instant digital access to money. Now you need to decide what to build, what to own and what to risk to make it happen.\n\nWhat's your move?",
        insight: "Modern card processing can cut product launches and updates from months to days.",
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
        description: "You're through launch. Now you need the right customers to drive the next stage of growth. Different audiences bring different opportunities, revenues and complexities, so where you focus matters.\n\nWho do you back?",
        insight: "Security, real-time data, personalisation and adaptable technology can help fintechs build stronger ecosystems.",
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
        insight: "APAC is emerging as a major market for crypto cards, driven by practical consumer and business needs.",
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
        insight: "Virtual cards and tokenization add protection by limiting exposure of real card details.",
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
        insight: "Next-generation processors can help issuers navigate different licensing, compliance and payment rails as they expand internationally.",
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
        insight: "Many legacy issuers still rely on decades-old technology, making innovation and changing customer expectations harder to manage.",
        options: [
          { id: "A", title: "Go Digital First", description: "Start shifting routine benefit payments into digital channels right away.", feedback: "You build momentum fast, but increase the risk of early rollout issues.", score: { growth: 0, trust: 0, control: -1, momentum: 2 }, aggressive: true },
          { id: "B", title: "Stabilise the Core", description: "Keep the current delivery model in place and focus on making benefit payments more reliable.", feedback: "You protect continuity and reduce disruption, but give citizens fewer visible signs of progress.", score: { growth: 0, trust: 1, control: 2, momentum: -1 } },
          { id: "C", title: "Blend the Channels", description: "Improve the experience with a deliberate mix of digital, assisted, and existing delivery routes.", feedback: "You create a more balanced transition, but take a slower road to full modernisation.", score: { growth: 0, trust: 2, control: 2, momentum: 1 } },
        ],
      },
      {
        id: 2,
        title: "Deliver Crisis Relief",
        description: "A crisis is hitting, and money needs to move fast and at scale. But verification, delivery and system limits are slowing you down. Even reliable programmes can crack under pressure. Relief cannot wait.\n\nWhat's your call?",
        insight: "During COVID-19, Paymentology helped turn a Hong Kong transit card into a financial tool delivering relief to millions.",
        options: [
          { id: "A", title: "Build for Speed", description: "Push relief out as fast as possible so support reaches affected people without delay.", feedback: "You improve crisis response, but put more pressure on controls and verification, increasing the risk of misuse.", score: { growth: 2, trust: 1, control: -1, momentum: 2 }, aggressive: true },
          { id: "B", title: "Build for Precision", description: "Keep stronger verification and eligibility checks in place to make sure relief reaches the right people.", feedback: "You protect control and reduce misuse, but risk looking too slow when urgency is highest.", score: { growth: 0, trust: 2, control: 2, momentum: 0 } },
          { id: "C", title: "Build for Flexibility", description: "Adapt the programme so it can shift between rapid response and tighter control depending on the need.", feedback: "You build a more adaptable crisis model, but take on more complexity and give up some speed.", score: { growth: 2, trust: 2, control: 1, momentum: 1 } },
        ],
      },
      {
        id: 3,
        title: "Set Spend Rules",
        description: "As digital payments play a bigger role in relief, scrutiny over how funds are spent is growing. Policymakers want support to reach its intended purpose. Now you decide how tightly to control it.\n\nWhat's your approach?",
        insight: "Paymentology’s FAST Feed provides real-time data to optimise operations, reduce fraud risk and improve user experiences.",
        options: [
          { id: "A", title: "Lock It Down", description: "Restrict spending to tightly defined merchant categories.", feedback: "You strengthen control and policy alignment, but make the programme less flexible for users.", score: { growth: 0, trust: 2, control: 2, momentum: 0 } },
          { id: "B", title: "Keep It Broad", description: "Allow support to be spent more freely across a wider set of merchants.", feedback: "You make the programme easier to use, but increase the risk of misuse and scrutiny.", score: { growth: 0, trust: 0, control: -1, momentum: 2 }, aggressive: true },
          { id: "C", title: "Track the Outliers", description: "Allow broader spending, but watch closely for unusual or suspicious patterns.", feedback: "You keep more flexibility for users, but take on more responsibility to spot problems quickly.", score: { growth: 0, trust: 2, control: 1, momentum: 1 } },
        ],
      },
      {
        id: 4,
        title: "Reach Everyone",
        description: "The programme is taking shape, but rural citizens, older people and those with lower digital confidence can still be left behind. Now you need to make it work for everyone.\n\nHow do you close the gap?",
        insight: "Benefits and remittances can be paid directly into mobile wallets, giving recipients faster access to funds and a digital transaction history.",
        options: [
          { id: "A", title: "Phygital-Led", description: "Expand assisted and in-person support alongside digital channels so more citizens can access the programme in the way that works for them.", feedback: "You widen practical access for harder-to-serve groups, but add more delivery complexity and cost.", score: { growth: 1, trust: 2, control: 1, momentum: 0 } },
          { id: "B", title: "Data-Led", description: "Use existing public-sector data to spot excluded groups, target outreach more precisely, and remove barriers that are keeping people out.", feedback: "You improve inclusion, but expose the complexity of digitising, matching, and relying on government data at scale.", score: { growth: 2, trust: 2, control: 1, momentum: 0 } },
          { id: "C", title: "Incentive-Led", description: "Use programme-linked digital incentives, such as faster payout or digital vouchers to encourage harder-to-reach groups onto the rail.", feedback: "You accelerate uptake through the programme itself, but risk behaviour that depends more on incentives than lasting confidence.", score: { growth: 1, trust: 1, control: 0, momentum: 2 }, aggressive: true },
        ],
      },
      {
        id: 5,
        title: "Expand Government Flows",
        description: "You’ve proven the programme can handle citizen payments. Now the opportunity is bigger. More government payment flows could run through the same infrastructure, turning it into a core public rail.\n\nWhere do you take it next?",
        insight: "Prepaid payroll cards can give employees instant access to wages and everyday digital spending.",
        options: [
          { id: "A", title: "Add Public Payroll", description: "Extend the programme into government wages, allowances, and other workforce-related payment flows.", feedback: "You make the programme more central to government operations, but raise the pressure for consistent, error-free delivery at payroll scale.", score: { growth: 2, trust: 1, control: 1, momentum: 2 }, aggressive: true },
          { id: "B", title: "Add Government Operations", description: "Extend the programme into operational flows like supplier payments, stipends, departmental reimbursements, or field-worker disbursements.", feedback: "You bring more of the state's payment flows onto a managed rail, but coordinating across departments adds real complexity.", score: { growth: 2, trust: 2, control: 2, momentum: 1 } },
          { id: "C", title: "Add Public Collections", description: "Extend the programme into payments coming back to government, such as taxes, fees, fines, permits, or service payments.", feedback: "You enable two-way public money movement, but add more complexity around reconciliation, user experience, and agency coordination.", score: { growth: 2, trust: 1, control: 1, momentum: 0 } },
        ],
      },
      {
        id: 6,
        title: "Fit the Rails",
        description: "You started with a government payments programme. Now it could shape how public money moves more broadly. The final challenge is deciding how far to take it.\n\nWhich path do you take?",
        insight: "Paymentology’s API framework supports card-to-card, card-to-account and account-to-account payments.",
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
    intro: ["You’ve built a telco with what most financial players want: reach, frequency and a place in customers’ everyday lives. Now you want to become a bigger part of how they manage and move their money. Make the right calls, deepen the relationship and build a financial ecosystem customers trust and stick with.", "Do you have what it takes?"],
    scenarios: [
      {
        id: 1,
        title: "Enter the Market",
        description: "You can see the opportunity in financial services, but before deciding what to launch, you need to determine how to enter the market. The route you choose will shape how quickly you can move and how much control you keep.\n\nWhat’s your first move?",
        insight: "SaaS partnerships can help telcos enter financial services faster, with capabilities from instant issuance to AI-driven decisioning.",
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
        insight: "Around 1.4 billion adults lacked access to formal financial services in 2021, according to the World Bank. Telcos can help close that gap.",
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
        insight: "Telcos can use customer behaviour data to create more relevant wallet and card experiences.",
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
        insight: "Paymentology helped Safaricom give 30 million M-PESA users access to international payments through a secure virtual card.",
        options: [
          { id: "A", title: "Own the Wallet", description: "Keep the focus on wallet-led utility like payments, transfers, bill pay, and stored value.", feedback: "You build a clearer, more scalable core proposition, but limit how far the service stretches into broader financial needs.", score: { growth: 1, trust: 2, control: 1, momentum: 0 } },
          { id: "B", title: "Build the Bank", description: "Expand into fuller banking-style services like savings, lending, and a broader account relationship.", feedback: "You open up a deeper, more valuable financial role, but take on more regulation, servicing, and operating complexity.", score: { growth: 2, trust: 1, control: 0, momentum: 2 }, aggressive: true },
          { id: "C", title: "Beyond the Wallet", description: "Use financial services to power a wider ecosystem of lifestyle, commerce, and digital services.", feedback: "You increase strategic upside and customer embeddedness, but take on the broadest product and ecosystem complexity.", score: { growth: 2, trust: 1, control: -1, momentum: 1 } },
        ],
      },
      {
        id: 5,
        title: "Scale the Controls",
        description: "More transactions, stored value and use cases are making the service more important, but also more exposed. As the financial layer grows, so do the risks around fraud, compliance and transactions. Now your controls need to keep pace.\n\nHow do you strengthen your control model?",
        insight: "Paymentology’s Fraud Control Services combines real-time decisioning, monitoring and customisable rules to manage fraud at scale.",
        options: [
          { id: "A", title: "Build the Engine", description: "Expand in-house fraud, monitoring, and risk operations so you own more of the control model directly.", feedback: "You build stronger internal capability, but take on more cost and operational complexity.", score: { growth: 1, trust: 2, control: 2, momentum: 0 } },
          { id: "B", title: "Bring in the Specialists", description: "Use fraud, identity, and monitoring partners to strengthen control faster.", feedback: "You improve protection more quickly, but make performance more dependent on partner quality and integration.", score: { growth: 1, trust: 2, control: 2, momentum: 1 }, aggressive: true },
          { id: "C", title: "Tighten the Flow", description: "Use stricter limits, stronger verification, and tighter decisioning to cut exposure faster.", feedback: "You reduce risk more quickly, but increase friction for genuine users.", score: { growth: 0, trust: 0, control: 2, momentum: -1 } },
        ],
      },
      {
        id: 6,
        title: "Back the Future",
        description: "You've built a meaningful foothold in financial services. Now new opportunities are emerging, from embedded finance and crypto to API-led platforms. The next wave of growth depends on what you back.\n\nWhere do you place your next bet?",
        insight: "Embedded finance, DeFi, crypto and open APIs are giving telcos new ways to expand beyond basic payments.",
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
    intro: ["You’ve built a service people trust with money that matters. But in remittance, reliability is just the start. Now you need to move beyond the transfer, create more value for customers and give them more reasons to stay. Make the right calls and build your relevance.", "Do you have what it takes?"],
    scenarios: [
      {
        id: 1,
        title: "Fight Fee Pressure",
        description: "A rival has just entered one of your key corridors with lower fees and louder pricing. Your service is trusted and transfers are still flowing, but the pressure is building fast. Misjudge this moment, and you either lose volume or start bleeding margin just to stay visible.\n\nHow do you fight back?",
        insight: "World Bank data shows the average cost of sending remittances fell from 8.36% in 2014 to 6.35% in 2024.",
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
        insight: "In-person financial services still matter, particularly for underbanked communities with limited access to bank accounts.",
        options: [
          { id: "A", title: "Lead with Digital", description: "Make digital payout the default, with cash there as a fallback.", feedback: "You start changing user behaviour, but risk resistance where cash still feels safer and more familiar.", score: { growth: 1, trust: 0, control: 0, momentum: 2 } },
          { id: "B", title: "Keep Cash Strong", description: "Prioritise cash payout in corridors where recipients still rely on it most.", feedback: "You defend usability where it matters, but keep more cost and operational drag in the model.", score: { growth: 1, trust: 2, control: 0, momentum: 0 } },
          { id: "C", title: "Build the Destination", description: "Create a digital destination for funds, such as a wallet, card, or stored-value account.", feedback: "You create a stronger digital proposition, but take on more product and servicing complexity.", score: { growth: 2, trust: 1, control: 0, momentum: 1 }, aggressive: true },
        ],
      },
      {
        id: 3,
        title: "Back New Rails",
        description: "The payout model is under pressure. Cash still matters in some corridors, but digital rails are advancing fast. The challenge is choosing the right infrastructure to deliver the speed, cost and convenience customers expect.\n\nWhere do you place your bet?",
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
        description: "You’ve decided how the money moves. Now the focus shifts to the people behind the transfers. Many remittance customers are migrants supporting families back home while facing financial challenges of their own, from opening accounts and proving identity to accessing credit.\n\nWhat role do you play next in their journey?",
        insight: "Remittance users range from expats and migrant workers to entrepreneurs and families managing money across borders.",
        options: [
          { id: "A", title: "Build the Arrival Layer", description: "Create services that help newcomers get set up from day one, from onboarding and identity checks to credit recognition and multi-currency tools.", feedback: "You make the proposition more valuable at a life-changing moment, but add more complexity across infrastructure, compliance, data-sharing, and partnerships.", score: { growth: 2, trust: 2, control: -1, momentum: 1 } },
          { id: "B", title: "Own Everyday Use", description: "Make remittance funds more useful through cards, wallets, bill pay, and day-to-day spending tools.", feedback: "You make the service more relevant in daily life, but raise the pressure to deliver a broader, smoother customer experience.", score: { growth: 1, trust: 1, control: 0, momentum: 2 }, aggressive: true },
          { id: "C", title: "Grow Family Money Tools", description: "Add tools for shared support, recurring transfers, household budgeting, and other family money needs across borders.", feedback: "You unlock a bigger role in family finances, but take on more complexity in access, permissions, and support.", score: { growth: 2, trust: 2, control: 1, momentum: 1 } },
        ],
      },
      {
        id: 5,
        title: "Build Stickiness",
        description: "Customers are starting to expect more than a one-off transfer. They want tools that add value between payments, while wallets, superapps and digital platforms are giving them more ways to hold, use and manage money across borders.\n\nHow do you give customers stronger reasons to stay?",
        insight: "Remittance firms are adding tailored products, rewards and money tools to give customers more reasons to stay.",
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
        insight: "Banks and traditional transfer firms are losing ground to fintechs, superapps, retailers and telcos, according to Paymentology’s Remittance Revolution report.",
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
        insight: "Paymentology powers GoTyme to issue virtual and physical Visa debit cards in minutes in the Philippines.",
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
        insight: "Modern API-driven platforms can help digital banks personalise experiences and adapt faster as markets change.",
        options: [
          { id: "A", title: "Skip the Plastic", description: "Let customers start spending digitally right away, without waiting for the physical card to arrive.", feedback: "You speed up first use, but depend more on customers being comfortable starting fully digital.", score: { growth: 1, trust: 0, control: 0, momentum: 2 }, aggressive: true },
          { id: "B", title: "Build the Habit", description: "Use budgeting tools, spend nudges, and simple money features to encourage repeat use.", feedback: "You build a stronger path to lasting behaviour, but take a slower route to spend growth.", score: { growth: 2, trust: 2, control: 1, momentum: 1 } },
          { id: "C", title: "Add Cash Access", description: "Give customers easier access to cash through local networks or merchants, making the account more useful day-to-day.", feedback: "You make the account more useful in the real world, but add more partner and operational complexity.", score: { growth: 1, trust: 2, control: 1, momentum: 1 } },
        ],
      },
      {
        id: 3,
        title: "Become the Main Account",
        description: "Customers are spending more, but their financial lives still sit elsewhere. Salaries land with another bank, government payments go elsewhere, and key inflows bypass your account. Until more money starts landing here, you risk remaining useful, but secondary.\n\nHow do you become the main account?",
        insight: "Many successful digital banks start with one strong card proposition, then expand as customer demand becomes clearer.",
        options: [
          { id: "A", title: "Win Salary", description: "Make this the account where salaries land, using incentives or stronger product value.", feedback: "You move closer to primary-account status, but getting customers to reroute salary is still a high-friction ask.", score: { growth: 2, trust: 0, control: 0, momentum: 2 }, aggressive: true },
          { id: "B", title: "Capture Disbursements", description: "Go after government payments, benefits, or other regular inflows that can make the account more active and more essential.", feedback: "You build a stronger inflow engine, but take on more complexity in partnerships, compliance, and public-sector fit.", score: { growth: 1, trust: 1, control: 0, momentum: 0 } },
          { id: "C", title: "Own the Relationship", description: "Strengthen trust and preference through clearer positioning, more transparent communication, and a more reassuring customer experience.", feedback: "You build trust and brand pull, but it may take longer - and cost more - to turn that into primary-account behaviour.", score: { growth: 1, trust: 2, control: 0, momentum: -1 } },
        ],
      },
      {
        id: 4,
        title: "Serve Small Business",
        description: "A new opportunity is emerging. Freelancers, sole traders and micro-businesses are looking for better ways to manage their money. Some struggle to open accounts, others with uneven cashflow or tools that don't fit how they work. The demand is real.\n\nWhere do you place your bet?",
        insight: "SMEs power roughly two-thirds of the global economy, yet many remain underserved by payment services.",
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
        insight: "Next-generation processors use real-time data and smarter detection to help issuers spot and respond to fraud faster.",
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
        insight: "Today’s cardholders expect payments to be seamless, adaptable and in step with how they manage money.",
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
    intro: ["You’re running a card business with scale, trust and a lot worth protecting. But the market is moving fast, and legacy complexity is holding you back. Make the right calls, modernise what matters and keep the business competitive.", "Do you have what it takes?"],
    scenarios: [
      {
        id: 1,
        title: "Reinvent the Card Experience",
        description: "Your card business has scale, but the experience is starting to feel dated. Customers now expect instant digital issuance, seamless global spending and more control over how their card works. Legacy processes are getting in the way.\n\nWhich part of the card experience do you reinvent first?",
        insight: "Modern card issuance enables instant cards, multi-currency spending and real-time customer controls.",
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
        insight: "Cloud-based next-generation processors can offer issuers more transparent and cost-effective pricing.",
        options: [
          { id: "A", title: "Move to the Cloud", description: "Prioritise cloud-based infrastructure and more scalable architecture.", feedback: "You build a stronger long-term foundation, but take on a bigger transformation before customers feel the payoff.", score: { growth: 0, trust: 1, control: 2, momentum: 0 } },
          { id: "B", title: "Layer Around Legacy", description: "Keep core legacy systems in place, but add modern layers around them where customers feel it most.", feedback: "You accelerate visible progress, but keep more long-term complexity alive underneath.", score: { growth: 2, trust: 1, control: 0, momentum: 1 }, aggressive: true },
          { id: "C", title: "Fix the Pressure Points", description: "Target the parts of the backbone causing the most drag, without transforming the whole stack at once.", feedback: "You reduce operational pain, but accept a slower path to deeper modernisation.", score: { growth: 1, trust: 1, control: 1, momentum: 0 } },
        ],
      },
      {
        id: 3,
        title: "Secure the Card",
        description: "The bank has strong fraud and security controls, but the card model is evolving faster than the protection around it. As issuance becomes more digital and servicing more immediate, older risk setups are starting to show their limits.\n\nWhere do you strengthen your defences?",
        insight: "Advanced analytics and AI at processor level can help banks detect suspicious behaviour in real time.",
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
        insight: "Paymentology’s FAST Feed provides 120+ transaction data points to power smarter insights and personalised experiences.",
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
        insight: "Banks can modernise in phases, running legacy systems alongside new programmes during migration.",
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
        insight: "CaaS is helping ecommerce brands, retailers and ride-sharing platforms launch their own payment experiences.",
        options: [
          { id: "A", title: "Compete Head-On", description: "Double down on your own digital experience, speed, and product strength to compete more directly.", feedback: "You make the bank more competitive on its own terms, but increase pressure on execution, margins, and complexity.", score: { growth: 2, trust: 1, control: -1, momentum: 2 }, aggressive: true },
          { id: "B", title: "Power the Ecosystem", description: "Work with platforms, apps, and partners so the bank becomes the trusted financial layer behind more customer journeys.", feedback: "You expand reach and relevance, but make success more dependent on partner performance and distribution quality.", score: { growth: 2, trust: 2, control: 0, momentum: 1 } },
          { id: "C", title: "Focus Upmarket", description: "Step back from the mass-market fight and concentrate on premium and business banking, where relationships and service still matter most.", feedback: "You focus the bank on higher-value segments, but accept a smaller role in the broader consumer market.", score: { growth: 1, trust: 2, control: 1, momentum: 0 } },
        ],
      },
    ],
  },

];
