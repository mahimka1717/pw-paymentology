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
  intro: string;
  scenarios: Scenario[];
}

export const tracks: Track[] = [
  // ─── FINTECH ───
  {
    id: 'fintech',
    name: 'Fintech',
    intro: "This is where fintechs break out or burn out. Make the right calls, manage the risk, and turn early momentum into a card business that scales. Do you have what it takes?",
    scenarios: [
      {
        id: 1,
        title: 'First Launch',
        description: "Launch is close, and this new card could be a breakout win or a costly miss. You're aiming for smarter spend, faster payouts, and instant digital money access. Interest is building, partners are circling, and now you have to decide what to build, own, and what to risk on day one.",
        insight: "Modern card processing infrastructure can help issuers launch or update products in days, making it much easier to roll out new services and digital innovations quickly.",
        options: [
          { id: 'A', title: 'Partner Up', description: 'Move fast with a lead partner and cut launch complexity.', feedback: 'You hit the market faster, but made the business more dependent on partner fit and coordination.', score: { growth: 2, trust: 0, control: -1, momentum: 2 }, aggressive: true },
          { id: 'B', title: 'Own the Stack', description: 'Keep more of the stack in-house and call the shots yourself.', feedback: 'You stay in control, but take on a slower, tougher road to launch.', score: { growth: 2, trust: 1, control: 0, momentum: 0 } },
          { id: 'C', title: 'Launch One Use Case', description: 'Start narrow and keep the first move focused.', feedback: 'You lower the risk of launch, but cap early growth and reach.', score: { growth: 0, trust: 1, control: 2, momentum: -1 } },
        ],
      },
      {
        id: 2,
        title: 'Fix Drop-Off',
        description: "The card is live, but cracks are showing. Users are dropping off before they become active customers. Interest is real, but activation is fragile. If the leak continues, the business burns capital, misses revenue targets, and loses momentum fast.",
        insight: "Onboarding cardholders means carrying out Know Your Customer (KYC) checks to meet Anti-Money Laundering (AML) requirements. These checks can only be performed by a bank sponsor or BIN sponsor with the regulatory authorisation to do so.",
        options: [
          { id: 'A', title: 'Open the Funnel', description: 'Get more users in by easing friction upfront.', feedback: 'You lift activation, but invite more risk in at the front door.', score: { growth: 2, trust: 0, control: -2, momentum: 2 }, aggressive: true },
          { id: 'B', title: 'Hold the Line', description: 'Keep onboarding tight and protect the journey from day one.', feedback: 'You safeguard trust, but lose more users before they convert.', score: { growth: 0, trust: 2, control: 2, momentum: -1 } },
          { id: 'C', title: 'Upgrade the Flow', description: 'Rebuild the journey with smarter tools and fewer weak spots.', feedback: 'You create a stronger path to activation, but add cost and operational load.', score: { growth: 2, trust: 1, control: 1, momentum: 1 } },
        ],
      },
      {
        id: 3,
        title: 'Win Customers',
        description: "You are through launch and early activation, but long-term growth depends on who you are really building for. Different customer bases bring very different trade-offs in revenue, complexity, and defensibility. Now you have to decide not just who you can reach, but who gives this fintech the strongest path to growth.",
        insight: "By partnering with specialists in security, real-time data, personalisation, and adaptable technology, digital banks can build stronger ecosystems faster — accelerating growth and innovation while staying closer to what customers actually need.",
        options: [
          { id: 'A', title: 'Back SMEs', description: 'Focus on small and underbanked businesses that need simpler tools, easier access, and better day-to-day money movement.', feedback: 'You open up a customer base with real unmet needs, but take on more servicing complexity and a more fragmented set of use cases.', score: { growth: 2, trust: 1, control: 0, momentum: 0 } },
          { id: 'B', title: 'Back Diaspora', description: 'Build for customers with cross-border lives and needs, from sending and receiving to holding and spending money across markets.', feedback: 'You create a sharper proposition around a high-friction use case, but take on more complexity across compliance, corridors, and customer expectations.', score: { growth: 2, trust: 0, control: -1, momentum: 2 }, aggressive: true },
          { id: 'C', title: 'Back Consumers', description: 'Go after mainstream retail customers with a broader proposition built on simplicity, convenience, and everyday relevance.', feedback: 'You target the biggest addressable market, but step into a more crowded and competitive fight.', score: { growth: 1, trust: 1, control: 2, momentum: 0 } },
        ],
      },
      {
        id: 4,
        title: 'Deepen the Offer',
        description: "You have a clearer customer base now, but one product rarely builds a lasting business on its own. Customers want more utility, more flexibility, and more reasons to stay. Now you have to decide what to add next without losing what made the proposition work in the first place.",
        insight: "APAC is emerging as one of the most important regions for crypto card adoption, not because of hype, but because it reflects real consumer and business needs that legacy payment systems do not always serve well.",
        options: [
          { id: 'A', title: 'Add Credit', description: 'Introduce lending, instalments, or short-term credit to unlock stronger revenue and broader customer use.', feedback: 'You open a stronger revenue path, but take on more risk, regulatory pressure, and product complexity.', score: { growth: 2, trust: 0, control: -1, momentum: 2 }, aggressive: true },
          { id: 'B', title: 'Add Card Utility', description: 'Launch or expand card-based features like virtual cards, wallet use, and day-to-day spend tools.', feedback: 'You make the proposition more relevant across more customer moments, but increase delivery and servicing complexity.', score: { growth: 2, trust: 2, control: 0, momentum: 1 } },
          { id: 'C', title: 'Add Digital Assets', description: 'Introduce crypto, stablecoin, or tokenised-money features for customers who want more flexible or borderless options.', feedback: 'You open a more innovative expansion path, but take on more uncertainty around regulation, trust, and operational complexity.', score: { growth: 0, trust: 1, control: -1, momentum: 2 } },
        ],
      },
      {
        id: 5,
        title: 'Fraud Spike',
        description: "Usage is rising, but fraud is climbing, and your support team is feeling the strain. One bad week of false declines could turn a fraud issue into a full-blown trust crisis.",
        insight: "Virtual cards add even more control with features like spend limits, expiry dates, and merchant-specific use. Tokenization protects card details by replacing them with a unique token, so the real card number is never exposed during a transaction.",
        options: [
          { id: 'A', title: 'Lock It Down', description: 'Tighten controls fast and reduce exposure before it spreads.', feedback: 'You cut losses quickly, but add friction that frustrates genuine users.', score: { growth: -1, trust: 1, control: 2, momentum: -1 } },
          { id: 'B', title: 'Push Through', description: 'Keep growth moving and resist slamming on the brakes.', feedback: 'You preserve momentum, but leave more room for fraud and trust issues to build.', score: { growth: 2, trust: -1, control: -2, momentum: 2 }, aggressive: true },
          { id: 'C', title: 'Target the Risk', description: 'Use targeted controls and faster response tools.', feedback: 'You strike a better balance, but the pressure on operations goes up.', score: { growth: 2, trust: 2, control: 1, momentum: 1 } },
        ],
      },
      {
        id: 6,
        title: 'New Markets',
        description: "You've gained traction, confidence, and momentum, but now the real test begins. Expectations are rising, new markets are opening up, and you have to scale the business without rebuilding it every time.",
        insight: "No issuer processor can claim truly global coverage yet, as licensing and compliance still vary by market. But next-generation processors are often better equipped to navigate that complexity, using modern payment rails and strategic partnerships to help issuers expand internationally with more confidence.",
        options: [
          { id: 'A', title: 'Push Ahead', description: 'Enter fast and chase growth while the window is still open.', feedback: 'You gain expansion speed, but lose grip on consistency across markets.', score: { growth: 2, trust: 0, control: -1, momentum: 2 }, aggressive: true },
          { id: 'B', title: 'Build Local', description: 'Adapt market by market to win on relevance.', feedback: 'You improve local fit, but complexity starts stacking up fast.', score: { growth: 2, trust: 1, control: 1, momentum: 0 } },
          { id: 'C', title: 'Standardise the Model', description: 'Keep the model tight and localise only where it counts.', feedback: 'You make scaling easier, but accept that not every market will get a perfect fit.', score: { growth: 1, trust: 1, control: 2, momentum: -1 } },
        ],
      },
    ],
  },

  // ─── GOVERNMENT ───
  {
    id: 'government',
    name: 'Government',
    intro: "You're running a public payment programme that impacts real lives, with real consequences. Make the right calls, balance speed with control, and build a system people can rely on. Do you have what it takes?",
    scenarios: [
      {
        id: 1,
        title: 'Pay Benefits',
        description: "A review has laid it bare: the benefits system still functions, but people are losing patience. Payments arrive, yet the experience feels slow, fragmented, and far behind what citizens now expect. The legacy system still works — just not well enough to keep trust intact.",
        insight: "Many legacy card issuers still run on technology built decades ago, which can make it harder to innovate and keep up with changing consumer expectations.",
        options: [
          { id: 'A', title: 'Go Digital First', description: 'Start shifting routine benefit payments into digital channels now.', feedback: 'You build momentum fast, but increase the risk of early rollout issues.', score: { growth: 0, trust: 0, control: -1, momentum: 2 }, aggressive: true },
          { id: 'B', title: 'Stabilise the Core', description: 'Keep the current delivery model in place while improving reliability, continuity, and service consistency.', feedback: 'You protect continuity and reduce disruption, but give citizens fewer visible signs of progress.', score: { growth: 0, trust: 1, control: 2, momentum: -1 } },
          { id: 'C', title: 'Blend the Channels', description: 'Improve the experience through a more deliberate mix of digital, assisted, and existing delivery routes.', feedback: 'You create a more balanced transition, but accept a slower road to full modernisation.', score: { growth: 0, trust: 2, control: 2, momentum: 1 } },
        ],
      },
      {
        id: 2,
        title: 'Crisis Relief',
        description: "A crisis is hitting now, and you need to get money out fast, at scale, and under intense public scrutiny. Households need support immediately, but urgency is colliding with verification, delivery, and system limits.",
        insight: "At the height of the COVID-19 pandemic, Paymentology helped transform a stored-value transit card into a powerful financial tool, delivering essential relief quickly to millions of people across Hong Kong.",
        options: [
          { id: 'A', title: 'Build for Speed', description: 'Push relief out as fast as possible so support reaches affected people without delay.', feedback: 'You improve crisis response, but put more pressure on controls, verification, and the risk of misuse.', score: { growth: 2, trust: 1, control: -1, momentum: 2 }, aggressive: true },
          { id: 'B', title: 'Build for Precision', description: 'Keep stronger verification, eligibility, and checks in place even as relief needs to move quickly.', feedback: 'You protect control and reduce misuse, but risk looking too slow when urgency is highest.', score: { growth: 0, trust: 2, control: 2, momentum: 0 } },
          { id: 'C', title: 'Build for Flexibility', description: 'Adapt the programme so it can shift between rapid response and tighter control depending on the need.', feedback: 'You build a more adaptable crisis model, but take on more complexity and give up some speed.', score: { growth: 2, trust: 2, control: 1, momentum: 1 } },
        ],
      },
      {
        id: 3,
        title: 'Spend Rules',
        description: "Digital relief is moving faster, but that is bringing new scrutiny with it. As more targeted support goes out through digital payments, policymakers want proof the money is being spent as intended — on groceries, utilities, or other essentials.",
        insight: "Paymentology's FAST Feed gives you instant access to the data that matters at every point in the journey. With real-time, actionable insights, you can optimise operations, reduce fraud risk, and improve user experiences.",
        options: [
          { id: 'A', title: 'Lock It Down', description: 'Restrict spending to tightly defined merchant categories.', feedback: 'You strengthen control and policy alignment, but make the programme less flexible for users.', score: { growth: 0, trust: 2, control: 2, momentum: 0 } },
          { id: 'B', title: 'Keep It Broad', description: 'Allow support to be spent more freely across a wider set of merchants.', feedback: 'You make the programme easier to use, but increase the risk of misuse and scrutiny.', score: { growth: 0, trust: 0, control: -1, momentum: 2 }, aggressive: true },
          { id: 'C', title: 'Track the Outliers', description: 'Allow broader spending, but watch closely for unusual or suspicious patterns.', feedback: 'You keep more flexibility for users, but take on more responsibility to spot problems quickly.', score: { growth: 0, trust: 2, control: 1, momentum: 1 } },
        ],
      },
      {
        id: 4,
        title: 'Reach Everyone',
        description: "The programme is taking shape, but it fails its public purpose if whole groups still cannot use it properly. Rural citizens, older people, under-documented users, and others with lower digital confidence can all be left behind.",
        insight: "Social benefits and remittances can be paid directly into mobile wallets, giving recipients faster access to funds and a digital transaction history that unlocks access to additional financial services.",
        options: [
          { id: 'A', title: 'Phygital-Led', description: 'Expand assisted and in-person support alongside digital channels so more citizens can access the programme in the way that works for them.', feedback: 'You widen practical access for harder-to-serve groups, but add more delivery complexity and cost.', score: { growth: 1, trust: 2, control: 1, momentum: 0 } },
          { id: 'B', title: 'Data-Led', description: 'Use existing public-sector data to spot excluded groups, target outreach more precisely, and remove avoidable barriers to access.', feedback: 'You improve inclusion more intelligently, but expose the complexity of digitising, matching, and relying on government data at scale.', score: { growth: 2, trust: 2, control: 1, momentum: 0 } },
          { id: 'C', title: 'Incentive-Led', description: 'Use programme-linked digital incentives, such as faster payout or digital vouchers to encourage harder-to-reach groups onto the rail.', feedback: 'You accelerate uptake through the programme itself, but risk behaviour that depends more on incentives than lasting confidence.', score: { growth: 1, trust: 1, control: 0, momentum: 2 }, aggressive: true },
        ],
      },
      {
        id: 5,
        title: 'Expand Government Flows',
        description: "You have proven the programme can handle citizen-facing payments, and now the opportunity is getting bigger. If the same infrastructure starts carrying more of how money moves across the state, this stops being just one programme. It starts becoming a core public rail.",
        insight: "Prepaid payroll cards offer a safer, faster alternative, giving employees instant access to wages, everyday spending power, and a foothold in the digital economy.",
        options: [
          { id: 'A', title: 'Add Public Payroll', description: 'Extend the programme into government wages, allowances, and other workforce-related payment flows.', feedback: 'You have made the programme more central to government operations, but raised the pressure for consistent, error-free delivery at payroll scale.', score: { growth: 2, trust: 1, control: 1, momentum: 2 }, aggressive: true },
          { id: 'B', title: 'Add Government Operations', description: 'Extend the programme into operational flows like supplier payments, stipends, departmental reimbursements, or field-worker disbursements.', feedback: 'You have brought more of the state\'s payment flows onto a managed rail, but the coordination across departments adds real complexity.', score: { growth: 2, trust: 2, control: 2, momentum: 1 } },
          { id: 'C', title: 'Add Public Collections', description: 'Extend the programme into payments coming back to government, such as taxes, fees, fines, permits, or service payments.', feedback: 'You enable two-way public money movement, but add more complexity around reconciliation, user experience, and agency coordination.', score: { growth: 2, trust: 1, control: 1, momentum: 0 } },
        ],
      },
      {
        id: 6,
        title: 'Fit the Rails',
        description: "You started with a government payments programme. Now it is big enough to shape how public money moves far more broadly. The final call is whether you keep it tightly bound, turn it into a wider public rail, or open it up so approved banks, fintechs, employers, and service providers can build around it.",
        insight: "Paymentology's API framework enables multi-rail payment options, so users can move money in the way that suits them — whether card to card, card to account, or account to account.",
        options: [
          { id: 'A', title: 'Keep It Purpose-Built', description: 'Keep the focus tight around core government payments and service delivery.', feedback: 'You protect clarity and public accountability, but limit how much broader value the infrastructure can create.', score: { growth: 1, trust: 2, control: 2, momentum: 0 } },
          { id: 'B', title: 'Expand the Public Rail', description: 'Develop the programme into broader public financial infrastructure that supports more of everyday civic life.', feedback: 'You increase the rail\'s strategic value across the state, but take on more scope, governance pressure, and delivery complexity.', score: { growth: 2, trust: 2, control: 0, momentum: 1 } },
          { id: 'C', title: 'Open to Ecosystem', description: 'Let approved banks, fintechs, employers, and service providers build on top of the programme under clear rules and oversight.', feedback: 'You expand innovation and utility around the rail, but make outcomes more dependent on ecosystem quality and governance.', score: { growth: 2, trust: 1, control: -1, momentum: 2 }, aggressive: true },
        ],
      },
    ],
  },

  // ─── TELCO ───
  {
    id: 'telco',
    name: 'Telco',
    intro: "You already have what most financial players want: reach, frequency, and a place in customers' everyday lives. But utility alone is not enough. Make the right calls, expand beyond the wallet, and turn everyday usage into a financial ecosystem people trust and stick with. Do you have what it takes?",
    scenarios: [
      {
        id: 1,
        title: 'Enter the Market',
        description: "You can see the opportunity in financial services, but the first call is not what to launch. It is how to get in. Some telcos buy their way in. Some partner to move faster. A few build from the ground up and keep tighter control.",
        insight: "Partnering with SaaS providers can give telcos a faster path into financial services — unlocking capabilities like instant card issuance, AI-driven decisioning, instalments, and POS-level add-ons.",
        options: [
          { id: 'A', title: 'Buy In', description: 'Acquire an existing financial services player or capability to establish a faster position in the market.', feedback: 'You gain speed and capability, but take on a bigger integration challenge and a higher upfront cost.', score: { growth: 2, trust: 0, control: -1, momentum: 2 }, aggressive: true },
          { id: 'B', title: 'Partner Up', description: 'Work with fintechs, embedded finance players, and regulated institutions to fill gaps and launch faster.', feedback: 'You accelerate entry and unlock specialist capability, but make success more dependent on partner fit and alignment.', score: { growth: 2, trust: 2, control: 0, momentum: 1 } },
          { id: 'C', title: 'Build It', description: 'Develop the capability in-house so you keep tighter control over the product, operations, and integration with the core business.', feedback: 'You keep more strategic ownership, but take on higher build cost, longer lead times, and more execution risk.', score: { growth: 1, trust: 2, control: 2, momentum: 0 } },
        ],
      },
      {
        id: 2,
        title: 'Choose the Customer',
        description: "Getting into financial services is only the beginning. Now you have to decide who you are really building for. The right entry point is not just about market size. It is about finding the balance between revenue potential, servicing cost, and long-term fit.",
        insight: "Mobile money has driven financial inclusion across emerging markets, with telcos often being the first and only financial touchpoint for millions of previously unbanked customers.",
        options: [
          { id: 'A', title: 'Back the Underserved', description: 'Focus on underbanked customers who need simple, accessible services like wallets, savings, remittances, and basic credit.', feedback: 'You open up a large and important market, but face lower margins and constant pressure to keep costs down.', score: { growth: 2, trust: 2, control: 1, momentum: 1 }, aggressive: true },
          { id: 'B', title: 'Go Upmarket', description: 'Target higher-income customers with more advanced needs like cross-border payments, lending, or wealth services.', feedback: 'You move toward a higher-value segment, but take on higher acquisition and servicing costs.', score: { growth: 2, trust: 1, control: 0, momentum: 1 } },
          { id: 'C', title: 'Own a Niche', description: 'Pick a specific underserved need and build a targeted proposition around it.', feedback: 'You create a sharper entry point, but limit how broadly you can scale the offer at first.', score: { growth: 1, trust: 2, control: 1, momentum: 0 } },
        ],
      },
      {
        id: 3,
        title: 'Win the Customer',
        description: "You have chosen your customers, but reaching them is only half the battle. Now you need to decide how to win them. In a market full of competing offers, the experience of getting started often decides whether a customer sticks around or moves on.",
        insight: "In competitive markets, how quickly and seamlessly a customer can start using a financial service often matters more than the product features themselves.",
        options: [
          { id: 'A', title: 'Go Instant', description: 'Make sign-up and first use happen as fast as possible, removing every unnecessary step.', feedback: 'You win on speed and simplicity, but may sacrifice depth and personalisation.', score: { growth: 2, trust: 1, control: 0, momentum: 2 }, aggressive: true },
          { id: 'B', title: 'Make It Personal', description: 'Tailor onboarding and early experiences to individual customer needs and behaviours.', feedback: 'You build stronger early relationships, but add complexity and slow the path to scale.', score: { growth: 2, trust: 2, control: 1, momentum: 2 } },
          { id: 'C', title: 'Smooth Operator', description: 'Focus on making every touchpoint reliable, clear, and easy to navigate.', feedback: 'You build trust through consistency, but may not stand out in a crowded market.', score: { growth: 1, trust: 2, control: 0, momentum: 1 } },
        ],
      },
      {
        id: 4,
        title: 'Expand the Use Case',
        description: "The wallet is working, customers are active, and daily transactions are growing. But a wallet alone is not a financial business. Now you have to decide what comes next — and how far beyond payments this telco is willing to go.",
        insight: "Telcos that expand beyond basic mobile money into cards, lending, and savings are seeing significantly higher engagement and revenue per user.",
        options: [
          { id: 'A', title: 'Own the Wallet', description: 'Make the wallet richer and more useful with savings, merchant payments, and loyalty features.', feedback: 'You deepen the wallet experience, but stay within a familiar product boundary.', score: { growth: 1, trust: 2, control: 1, momentum: 0 } },
          { id: 'B', title: 'Build the Bank', description: 'Launch lending, savings, insurance, or other bank-like products inside the telco ecosystem.', feedback: 'You unlock bigger revenue potential, but take on significantly more regulatory and operational complexity.', score: { growth: 2, trust: 1, control: 0, momentum: 2 }, aggressive: true },
          { id: 'C', title: 'Beyond the Wallet', description: 'Expand into adjacent services like bill pay, transport, or merchant tools.', feedback: 'You increase daily relevance, but spread resources across more product surfaces.', score: { growth: 2, trust: 1, control: -1, momentum: 1 } },
        ],
      },
      {
        id: 5,
        title: 'Scale the Controls',
        description: "More users, more money, and more services mean more exposure. Fraud, compliance gaps, and operational risk are all growing alongside the business. Now you need to decide how to scale your controls without slowing down the momentum you have built.",
        insight: "Paymentology's Fraud Control Services gives issuers layered, real-time control — combining upfront checks, a powerful decision engine, and BIN-level monitoring with customisable rules, continuous oversight, and pre-defined alerts to help keep fraud risk in check at scale.",
        options: [
          { id: 'A', title: 'Build the Engine', description: 'Invest in a proprietary fraud and risk engine built around your own data and customer patterns.', feedback: 'You build a long-term competitive advantage, but take on high upfront cost and complexity.', score: { growth: 1, trust: 2, control: 2, momentum: 0 } },
          { id: 'B', title: 'Bring in the Specialists', description: 'Partner with specialist fraud, identity, and compliance providers to strengthen the controls faster.', feedback: 'You get protection faster, but add vendor dependencies and integration complexity.', score: { growth: 1, trust: 2, control: 2, momentum: 1 }, aggressive: true },
          { id: 'C', title: 'Tighten the Flow', description: 'Reduce exposure by adding stricter limits, step-up checks, and tighter transaction rules.', feedback: 'You cut risk quickly, but increase friction for legitimate users.', score: { growth: 0, trust: 0, control: 2, momentum: -1 } },
        ],
      },
      {
        id: 6,
        title: 'Back the Future',
        description: "You have built a meaningful foothold in financial services, but the next wave of growth will come from the future you choose to back. Integration is getting easier, customer expectations keep shifting, and new models are opening up — from embedded finance to crypto to API-led platforms.",
        insight: "As financial technology becomes easier to integrate, telcos can move beyond basic payments and build services around embedded finance, DeFi, crypto, and open APIs that let third parties innovate on top of their wallets.",
        options: [
          { id: 'A', title: 'Power the Ecosystem', description: 'Use payments, lending, and financial tools to support a wider network of everyday telco services.', feedback: 'You make financial services more central to the wider ecosystem, but take on more complexity across products, journeys, and partnerships.', score: { growth: 2, trust: 2, control: 0, momentum: 1 } },
          { id: 'B', title: 'Push the Edge', description: 'Experiment with DeFi, crypto, or stablecoin-based services to unlock new use cases and tap emerging demand.', feedback: 'You move closer to the edge of innovation, but take on more uncertainty around regulation, adoption, and trust.', score: { growth: 1, trust: 0, control: -1, momentum: 2 }, aggressive: true },
          { id: 'C', title: 'Open the Platform', description: 'Let developers and partners build on top of your wallet and financial infrastructure through open APIs.', feedback: 'You expand the platform\'s reach and innovation potential, but make success more dependent on ecosystem quality and coordination.', score: { growth: 1, trust: 1, control: 0, momentum: 2 } },
        ],
      },
    ],
  },

  // ─── REMITTANCE ───
  {
    id: 'remittance',
    name: 'Remittance',
    intro: "You've built a service people trust with money that matters. But in remittance, reliability is only the starting point. Make the right calls, defend your relevance, and turn a trusted transfer service into something harder to replace. Do you have what it takes?",
    scenarios: [
      {
        id: 1,
        title: 'Fee Fight',
        description: "A rival has just entered one of your key corridors with lower fees and louder pricing. Your service is trusted and transfers are still flowing, but the pressure is building fast. Misjudge this moment, and you either lose volume or start bleeding margin just to stay visible.",
        insight: "The cost of sending remittances has been falling for years. World Bank data shows the global average dropped from 8.36% in Q1 2014 to 6.35% in Q1 2024.",
        options: [
          { id: 'A', title: 'Cost Lead', description: 'Drop prices aggressively and take the fight head-on.', feedback: 'You stay competitive on cost, but squeeze your margin in the process.', score: { growth: 2, trust: 0, control: 0, momentum: 2 }, aggressive: true },
          { id: 'B', title: 'Quality Signal', description: 'Compete on speed, transparency, and reliability instead of chasing the lowest price.', feedback: 'You strengthen trust in the core offer, but take a slower path to volume growth.', score: { growth: 2, trust: 2, control: 0, momentum: 0 } },
          { id: 'C', title: 'Corridor Focus', description: 'Concentrate investment on the corridors where trust and economics are already strongest.', feedback: 'You protect your strongest positions, but limit how broadly you respond to price pressure.', score: { growth: 0, trust: 1, control: 2, momentum: 0 } },
        ],
      },
      {
        id: 2,
        title: 'Less Cash',
        description: "A key local payout network is shifting hard toward digital disbursement, where costs are lower and delivery scales faster. But in key corridors, cash still holds trust. Now you have to choose what kind of payout model survives the next phase.",
        insight: "In-person financial services still matter in many parts of the world, especially for underbanked communities with limited access to traditional bank accounts.",
        options: [
          { id: 'A', title: 'Lead with Digital', description: 'Make digital payout the default, with cash there as a fallback.', feedback: 'You start changing user behaviour, but risk resistance where cash still feels safer and more familiar.', score: { growth: 1, trust: 0, control: 0, momentum: 2 } },
          { id: 'B', title: 'Keep Cash Strong', description: 'Protect cash access in the corridors where recipients still rely on it most.', feedback: 'You defend usability where it matters, but keep more cost and operational drag in the model.', score: { growth: 1, trust: 2, control: 0, momentum: 0 } },
          { id: 'C', title: 'Build the Destination', description: 'Create a better digital destination for funds, such as a wallet, card, or stored-value account.', feedback: 'You make digital payout more compelling, but take on more product and servicing complexity.', score: { growth: 2, trust: 1, control: 0, momentum: 1 }, aggressive: true },
        ],
      },
      {
        id: 3,
        title: 'New Rails',
        description: "The payout model is getting squeezed from every direction. Cash still matters in some corridors, but digital rails are advancing fast — from wallets and account-based payout to stablecoin-powered flows.",
        insight: "Stablecoins can move money around the world at very low cost, often faster than traditional remittance transfers.",
        options: [
          { id: 'A', title: 'Back Stablecoins', description: 'Use stablecoin-based flows where they could reduce cost, improve speed, or make cross-border movement more flexible.', feedback: 'You have moved closer to a potentially cheaper and faster future, but taken on more regulatory, partner, and execution risk early.', score: { growth: 1, trust: 0, control: -1, momentum: 2 }, aggressive: true },
          { id: 'B', title: 'Double Down on Accounts', description: 'Lean further into bank-account and account-based payout routes as the most familiar and scalable digital destination.', feedback: 'You have kept the model easier to explain and widely usable, but may look less flexible in markets where account access is uneven.', score: { growth: 0, trust: 2, control: 2, momentum: -1 } },
          { id: 'C', title: 'Build the Wallet', description: 'Make wallets a more central payout destination, with stronger integrations and a more useful digital recipient experience.', feedback: 'You make payout more convenient and digital-first, but increase dependency on wallet adoption and the strength of your local partner network.', score: { growth: 2, trust: 2, control: 0, momentum: 1 } },
        ],
      },
      {
        id: 4,
        title: 'Beyond the Transfer',
        description: "You already move money, but your customers need more than a transfer. Many migrants and their families still struggle to open accounts, prove identity, access credit, or get financially settled in a new country.",
        insight: "Remittance users are far from one-size-fits-all — from expats and migrant workers to entrepreneurs, relocated families, and people seeking safer stores of value across borders.",
        options: [
          { id: 'A', title: 'Build the Arrival Layer', description: 'Create services that help newcomers get set up from day one, from onboarding and identity checks to credit recognition and multi-currency tools.', feedback: 'You make the proposition more valuable at a life-changing moment, but add more complexity across infrastructure, compliance, data-sharing, and partnerships.', score: { growth: 2, trust: 2, control: -1, momentum: 1 } },
          { id: 'B', title: 'Own Everyday Use', description: 'Make remittance funds more useful after arrival through cards, wallets, bill pay, and day-to-day spending tools.', feedback: 'You make the service more relevant in daily life, but raise the pressure to deliver a broader, smoother customer experience.', score: { growth: 1, trust: 1, control: 0, momentum: 2 }, aggressive: true },
          { id: 'C', title: 'Grow Family Money Tools', description: 'Add tools for shared support, recurring transfers, household budgeting, and other family money needs across borders.', feedback: 'You unlock a bigger role in family finances, but take on more complexity in access, permissions, and support.', score: { growth: 2, trust: 2, control: 1, momentum: 1 } },
        ],
      },
      {
        id: 5,
        title: 'Build Stickiness',
        description: "Customers are starting to expect more than a one-off transfer. Some want practical tools that make the service more useful between payments. Others are comparing you with wallets, superapps, and digital platforms.",
        insight: "Remittance firms are going beyond the transfer to build stronger customer loyalty by bundling in other services, tailoring products to specific user needs, offering perks and rewards, and adding smarter tools.",
        options: [
          { id: 'A', title: 'Build the Toolkit', description: 'Create tailored financial products around how customers actually send, receive, and manage money across borders.', feedback: 'You build a more differentiated proposition, but take on more product complexity and a broader servicing burden.', score: { growth: 2, trust: 1, control: 0, momentum: 0 }, aggressive: true },
          { id: 'B', title: 'Bridge the Gap', description: 'Offer small, tightly scoped credit or advance features to help customers handle short-term gaps between payments.', feedback: 'You add value when it matters most, but take on more risk, regulation, and servicing complexity.', score: { growth: 1, trust: 0, control: -1, momentum: 0 } },
          { id: 'C', title: 'Unlock the Spend', description: 'Launch cards or loyalty benefits tied to remittance behaviour, such as better FX, transfer-linked perks, or recipient-side benefits.', feedback: 'You have given customers another reason to stay, but risk building weaker loyalty if the benefits do too much of the work.', score: { growth: 1, trust: 2, control: 0, momentum: 1 } },
        ],
      },
      {
        id: 6,
        title: 'Go Beyond',
        description: "The business is no longer judged only on whether it can move money reliably. Pricing pressure, customer expectations, added services, and the rails underneath them are all shaping what comes next. Now you have to decide what kind of cross-border business this really becomes.",
        insight: "The remittance industry is facing a shake-up on the scale of the telegraph's arrival 180 years ago. Once dominant banks and money transfer firms are losing ground to fintechs, local players, superapps, retailers, and telcos.",
        options: [
          { id: 'A', title: 'Go Premium', description: 'Build a higher-value service with stronger support, faster delivery, and premium features for customers who need more than a basic transfer.', feedback: 'You create a more differentiated offer, but narrow the audience and raise the bar on service quality.', score: { growth: 1, trust: 2, control: 0, momentum: 0 } },
          { id: 'B', title: 'All-in-One', description: 'Develop a broader cross-border product that brings transfers, stored value, cards, bill pay, and everyday money tools into one place.', feedback: 'You make the proposition harder to replace, but take on much more product and operational complexity.', score: { growth: 2, trust: 1, control: 0, momentum: 0 }, aggressive: true },
          { id: 'C', title: 'Own a Niche', description: 'Stay focused on a specific market, corridor, or customer segment and serve it better than anyone else.', feedback: 'You sharpen your position, but limit how broadly you can scale.', score: { growth: 0, trust: 1, control: 0, momentum: 2 } },
        ],
      },
    ],
  },

  // ─── DIGITAL BANKS ───
  {
    id: 'digital-banks',
    name: 'Digital Banks',
    intro: "You've built a digital bank people like. Now you need to become the one they rely on. Make the right calls, drive deeper usage, and turn a polished product into the customer's primary financial home. Do you have what it takes?",
    scenarios: [
      {
        id: 1,
        title: 'Drive Demand',
        description: "The card is live, but demand is not coming fast enough. Acquisition is expensive, sign-ups are slower than expected, and a polished product is not yet turning into real momentum. Now you have to decide what gets more people through the door.",
        insight: "Paymentology powers GoTyme — a digital bank serving the underbanked in the Philippines — to issue virtual and physical Visa debit cards in minutes through its app and digital kiosks, delivering the speed, scale, and security needed for rapid growth.",
        options: [
          { id: 'A', title: 'Push Incentives', description: 'Use cashback, rewards, or joining offers to drive sign-ups faster.', feedback: 'You accelerate acquisition, but risk attracting customers who only show up for the offer.', score: { growth: 2, trust: 0, control: 0, momentum: 2 }, aggressive: true },
          { id: 'B', title: 'Go Phygital', description: 'Build a more guided, blended journey to help customers discover, trust, and sign up with confidence.', feedback: 'You make the product easier to adopt, but add more servicing cost and complexity.', score: { growth: 1, trust: 2, control: 1, momentum: 0 } },
          { id: 'C', title: 'Broaden the Offer', description: 'Add a few complementary features or products to make the bank more compelling from the start.', feedback: 'You widen the appeal, but add complexity before the core product has fully proved itself.', score: { growth: 2, trust: 1, control: 0, momentum: 1 } },
        ],
      },
      {
        id: 2,
        title: 'Build Spend Habit',
        description: "Sign-ups are climbing, but too many customers still are not turning the account into a real spending habit. They may have the account, even the card, but the product is still too easy to leave in the background.",
        insight: "For digital banks to thrive, modern API-driven, event-based platforms are becoming essential in delivering more personalised customer experiences and adapting quickly as the market shifts.",
        options: [
          { id: 'A', title: 'Skip the Plastic', description: 'Let customers start spending digitally right away, without waiting for the physical card to arrive.', feedback: 'You speed up first use, but depend more on customers being comfortable starting fully digital.', score: { growth: 1, trust: 0, control: 0, momentum: 2 }, aggressive: true },
          { id: 'B', title: 'Build the Habit', description: 'Use budgeting tools, spend nudges, and simple money features to encourage repeat use.', feedback: 'You build a stronger path to lasting behaviour, but take a slower route to spend growth.', score: { growth: 2, trust: 2, control: 1, momentum: 1 } },
          { id: 'C', title: 'Add Cash Access', description: 'Partner with local networks or merchants so customers can withdraw cash more easily when they need it.', feedback: 'You make the account more useful in the real world, but add more partner and operational complexity.', score: { growth: 1, trust: 2, control: 1, momentum: 1 } },
        ],
      },
      {
        id: 3,
        title: 'Become the Main Account',
        description: "Customers are spending more, but their financial centre of gravity still sits somewhere else. Salaries land with another bank, government payments go elsewhere, and the most important inflows still bypass your account.",
        insight: "Many successful digital banks start simple, launching with one strong card proposition, then expanding as customer demand becomes clearer.",
        options: [
          { id: 'A', title: 'Win Salary', description: 'Make this the account where salaries land, using incentives or stronger product value.', feedback: 'You move closer to primary-account status, but getting customers to reroute salary is still a high-friction ask.', score: { growth: 2, trust: 0, control: 0, momentum: 2 }, aggressive: true },
          { id: 'B', title: 'Capture Disbursements', description: 'Go after government payments, benefits, or other regular inflows that can make the account more active and more essential.', feedback: 'You build a stronger inflow engine, but take on more complexity in partnerships, compliance, and public-sector fit.', score: { growth: 1, trust: 1, control: 0, momentum: 0 } },
          { id: 'C', title: 'Own the Relationship', description: 'Strengthen trust and preference through clearer positioning, more transparent communication, and a more reassuring customer experience.', feedback: 'You build trust and brand pull, but it may take longer to turn that into primary-account behaviour.', score: { growth: 1, trust: 2, control: 0, momentum: -1 } },
        ],
      },
      {
        id: 4,
        title: 'Serve Small Business',
        description: "A new opportunity is opening up around the bank. Freelancers, sole traders, and micro-business owners are turning up because traditional providers still do not serve them well.",
        insight: "SMEs power roughly two-thirds of the global economy, yet many are still underserved by payments. What they need are flexible, affordable systems that combine fast integration, useful data, compliance support, fraud defence, and room to scale.",
        options: [
          { id: 'A', title: 'Lower the Barriers', description: 'Simplify onboarding and account access for freelancers and small operators blocked by traditional banking requirements.', feedback: 'You make the bank easier to access for underserved businesses, but take on more onboarding, verification, and support risk.', score: { growth: 2, trust: 1, control: -1, momentum: 0 }, aggressive: true },
          { id: 'B', title: 'Lend to Grow', description: 'Offer small, practical credit products to help underbanked operators manage cashflow and keep trading.', feedback: 'You make the bank more useful when it matters, but take on more credit and risk exposure.', score: { growth: 2, trust: 2, control: 0, momentum: 0 } },
          { id: 'C', title: 'Run the Business', description: 'Focus on lightweight tools like invoicing, expense controls, and cashflow visibility to help small operators manage money better.', feedback: 'You make the product more useful day to day, but stop short of solving access and funding gaps directly.', score: { growth: 1, trust: 1, control: 2, momentum: 1 } },
        ],
      },
      {
        id: 5,
        title: 'Fraud Wave',
        description: "More usage, more value, and deeper engagement have made the bank more useful, and more attractive to fraudsters. Suspicious activity is rising, disputes are getting louder, and weak controls are becoming harder to hide.",
        insight: "Fraud patterns keep evolving, and legacy systems often react too slowly. Next-generation processors use real-time data, smarter detection, and built-in controls to help issuers spot threats faster.",
        options: [
          { id: 'A', title: 'Build the Fraud Engine', description: 'Strengthen your in-house fraud, risk, and trust capability with better tools, faster decisioning, and a bigger specialist team.', feedback: 'You build stronger internal defence, but take on more cost and operational complexity.', score: { growth: 1, trust: 1, control: 2, momentum: 0 }, aggressive: true },
          { id: 'B', title: 'Partner for Protection', description: 'Bring in specialist fraud, identity, or transaction-monitoring partners to improve detection and response faster.', feedback: 'You improve protection more quickly, but increase dependency on vendors and integration quality.', score: { growth: 0, trust: 2, control: 2, momentum: 1 } },
          { id: 'C', title: 'Redesign the Risk Points', description: 'Rework onboarding, authentication, transaction limits, and user prompts to reduce exposure where it matters most.', feedback: 'You reduce risk through smarter product design, but add more friction to sensitive moments in the journey.', score: { growth: 0, trust: 1, control: 2, momentum: 0 } },
        ],
      },
      {
        id: 6,
        title: 'Superapp Threat',
        description: "A new competitor is pulling more of daily financial life into one place — payments, rewards, budgeting, credit, and more. Customers are starting to compare usefulness, not just UX. It's no longer about whether they like your product, it is whether they would miss it if it disappeared.",
        insight: "For digital banks and fintechs, a successful card programme is about far more than issuing plastic. Today's cardholders expect a payment experience that feels seamless, adaptable, and in step with how they live, spend, and manage money.",
        options: [
          { id: 'A', title: 'Match the Superapp', description: 'Fight back with stronger rewards, sharper pricing, or broader product value.', feedback: 'You make the proposition more competitive, but increase pressure on margins, execution, and control.', score: { growth: 2, trust: -1, control: -1, momentum: 1 }, aggressive: true },
          { id: 'B', title: 'Stay Narrow', description: 'Focus on a smaller niche and defend it well instead of broadening too far.', feedback: 'You protect focus, but limit how central the product can become.', score: { growth: 0, trust: 2, control: 2, momentum: 0 } },
          { id: 'C', title: 'Become the Hub', description: 'Add the tools, connections, and partnerships that make the bank a more central place in everyday financial life.', feedback: 'You make the product harder to replace, but take a slower and more demanding path to competitive defence.', score: { growth: 2, trust: 2, control: 0, momentum: 2 } },
        ],
      },
    ],
  },

  // ─── BANKS ───
  {
    id: 'banks',
    name: 'Banks',
    intro: "You're running a card business with real scale, real trust, and a lot worth protecting. But the market is moving faster than the bank, and legacy complexity is getting harder to hide. Make the right calls, modernise what matters, and prove this business can still compete. Do you have what it takes?",
    scenarios: [
      {
        id: 1,
        title: 'Reinvent the Card Experience',
        description: "The card still has scale, but the experience is starting to feel dated. Customers expect instant digital issuance, smoother global spending, and more control over how their card works day to day.",
        insight: "Modern card issuance lets banks give customers instant virtual or physical cards, simpler multi-currency spending, secure contactless payments, and real-time controls like freezing cards, setting limits, and managing tokenized transactions.",
        options: [
          { id: 'A', title: 'Issue Instantly', description: 'Prioritise instant digital issuance so customers can access and use the card right away.', feedback: 'You make the card feel faster and more modern, but raise the pressure on digital servicing and fulfilment to keep up.', score: { growth: 1, trust: 1, control: 0, momentum: 2 } },
          { id: 'B', title: 'Spend Borderless', description: 'Build around multi-currency support and smoother global spending.', feedback: 'You make the proposition more relevant for travel and international spend, but add complexity in pricing, servicing, and operations.', score: { growth: 2, trust: 1, control: -1, momentum: 1 }, aggressive: true },
          { id: 'C', title: 'Show More Control', description: 'Give customers better visibility and self-serve tools, from card freezing to spend limits and transaction settings.', feedback: 'You make the card feel more transparent and manageable, but stop short of fixing the deeper systems behind it.', score: { growth: 1, trust: 2, control: 2, momentum: 0 } },
        ],
      },
      {
        id: 2,
        title: 'Modernise the Backbone',
        description: "The bank can improve the card experience on the surface, but underneath it still runs on infrastructure built for a slower era. Core systems are hard to update, delivery takes too long, and every improvement creates more strain behind the scenes.",
        insight: "Next-generation processors are typically cloud-based, which often makes pricing more transparent and cost-effective — a big advantage for issuers trying to improve efficiency without losing control of costs.",
        options: [
          { id: 'A', title: 'Move to the Cloud', description: 'Prioritise cloud-based infrastructure and more scalable architecture.', feedback: 'You build a stronger long-term foundation, but take on a bigger transformation before customers feel the payoff.', score: { growth: 0, trust: 1, control: 2, momentum: 0 } },
          { id: 'B', title: 'Layer Around Legacy', description: 'Keep core legacy systems in place, but add modern layers around them where customers feel it most.', feedback: 'You accelerate visible progress, but keep more long-term complexity alive underneath.', score: { growth: 2, trust: 1, control: 0, momentum: 1 }, aggressive: true },
          { id: 'C', title: 'Fix the Pressure Points', description: 'Target the parts of the backbone causing the most drag, without transforming the whole stack at once.', feedback: 'You reduce operational pain, but accept a slower path to deeper modernisation.', score: { growth: 1, trust: 1, control: 1, momentum: 0 } },
        ],
      },
      {
        id: 3,
        title: 'Secure the Card',
        description: "The bank already has fraud and security controls in place, but the card model is evolving faster than the protection around it. Issuance is becoming more digital, servicing is becoming more immediate, and customers expect more control.",
        insight: "As payments digitise, fraud is moving faster than many legacy banks can keep up, but with advanced analytics and AI at the processor level, banks can spot suspicious behaviour in real time.",
        options: [
          { id: 'A', title: 'Strengthen the Engine', description: 'Invest more heavily in fraud detection, monitoring, and risk controls behind the scenes.', feedback: 'You improve protection at scale, but add more cost and complexity while customers may not feel the benefits as directly.', score: { growth: 0, trust: 2, control: 2, momentum: 0 } },
          { id: 'B', title: 'Step Up the Response', description: 'Focus on faster alerts, quicker intervention, and better support when security issues hit.', feedback: 'You improve trust in the moments that matter most, but add more servicing pressure and operational dependency.', score: { growth: 0, trust: 2, control: 0, momentum: 1 }, aggressive: true },
          { id: 'C', title: 'Tighten the Rules', description: 'Use stricter decisioning, thresholds, and authentication to reduce exposure as the card model becomes more digital.', feedback: 'You cut risk faster, but increase friction and false positives for genuine customers.', score: { growth: -1, trust: 1, control: 2, momentum: -1 } },
        ],
      },
      {
        id: 4,
        title: 'Modernise Wealth Management',
        description: "You have upgraded the card experience but your most valuable clients now expect more. Family offices want real-time visibility, tighter governance, and less manual work across cards, currencies, and complex structures.",
        insight: "Paymentology's cloud-native platform combines secure APIs with rich real-time data, making it easier for banks to launch tailored programmes fast. With 120+ transaction data points in every FAST Message feed, banks can power smarter money tools, sharper insights, and more personalised loyalty experiences.",
        options: [
          { id: 'A', title: 'Connect Spend to Wealth', description: 'Link card activity more directly into wealth reporting, spending visibility, and consolidated dashboards.', feedback: 'You give clients and advisers a clearer whole-picture view, but take on more data, integration, and reporting complexity.', score: { growth: 2, trust: 2, control: 0, momentum: 1 } },
          { id: 'B', title: 'Tighten Governance', description: 'Build stronger controls, approvals, monitoring, and audit-ready oversight for family-office-style spending and delegation.', feedback: 'You improve governance and reduce blind spots, but make the servicing model more structured and operationally heavier.', score: { growth: 1, trust: 2, control: 2, momentum: 0 } },
          { id: 'C', title: 'Design for the Next-Gen', description: 'Create a more digital-first wealth experience with better mobile access, real-time visibility, and smoother day-to-day interaction.', feedback: 'You make the proposition feel more modern and relevant, but take a less immediate path to deeper governance and reporting.', score: { growth: 2, trust: 1, control: 0, momentum: 2 }, aggressive: true },
        ],
      },
      {
        id: 5,
        title: 'Move the Base',
        description: "A huge part of the portfolio still sits on old products, legacy servicing journeys, and outdated operating rules. The new setup may be better, but you do not fully feel the benefit while so many live customers are still stuck on the old estate.",
        insight: "You do not need to rip and replace to modernise. Legacy banks can migrate onto our platform in phases, upgrade existing programmes on-platform, and add new card programmes and services through an API-driven issuer processor.",
        options: [
          { id: 'A', title: 'Push the Migration', description: 'Move customers across quickly to simplify the estate and unlock the new model faster.', feedback: 'You accelerate simplification, but raise the risk of disruption and migration fatigue.', score: { growth: 2, trust: -1, control: 0, momentum: 2 }, aggressive: true },
          { id: 'B', title: 'Protect the Legacy Base', description: 'Keep more customers on legacy products for longer while the new model proves itself.', feedback: 'You reduce short-term disruption, but keep more cost, complexity, and duplication alive.', score: { growth: 0, trust: 2, control: 2, momentum: -1 } },
          { id: 'C', title: 'Move by Segment', description: 'Migrate customers by product type, value tier, or readiness instead of treating the whole base the same way.', feedback: 'You make the migration more tailored, but add more complexity to how the transition is managed.', score: { growth: 2, trust: 2, control: 1, momentum: 1 } },
        ],
      },
      {
        id: 6,
        title: 'Redefine the Future',
        description: "You have started moving customers onto the new model, but the market is still shifting around you. Digital players, embedded finance, and ecosystem partnerships are reshaping how customers access financial services.",
        insight: "CaaS is powering embedded finance far beyond banking, helping ecommerce brands, retailers, and ride-sharing platforms launch their own payment experiences. In markets with limited banking access, it is also opening the door to prepaid cards, digital wallets, and other services that can widen financial inclusion.",
        options: [
          { id: 'A', title: 'Compete Head-On', description: 'Double down on your own digital experience, speed, and product strength to compete more directly.', feedback: 'You make the bank more competitive on its own terms, but increase pressure on execution, margins, and complexity.', score: { growth: 2, trust: 1, control: -1, momentum: 2 }, aggressive: true },
          { id: 'B', title: 'Power the Ecosystem', description: 'Work with platforms, apps, and partners so the bank becomes the trusted financial layer behind more customer journeys.', feedback: 'You expand reach and relevance, but make success more dependent on partner performance and distribution quality.', score: { growth: 2, trust: 2, control: 0, momentum: 1 } },
          { id: 'C', title: 'Focus Upmarket', description: 'Step back from the mass-market fight and concentrate on premium and business banking, where relationships and service still matter most.', feedback: 'You focus the bank on higher-value segments, but accept a smaller role in the broader consumer market.', score: { growth: 1, trust: 2, control: 1, momentum: 0 } },
        ],
      },
    ],
  },
];
