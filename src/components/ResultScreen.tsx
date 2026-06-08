import { Score } from '../data/tracks';
import { outcomeDescriptions, Outcome, Style } from '../data/scoring';

interface Props {
  outcome: Outcome;
  style: Style;
  normalized: Score;
  totalScore: Score;
  trackName: string;
  onRestart: () => void;
}

const outcomeImages: Record<Outcome, string> = {
  'Built to Scale': '/img/result0.jpg',
  'Fast but Fragile': '/img/result1.jpg',
  'Trusted Operator': '/img/result2.jpg',
  'Stuck in Neutral': '/img/result3.jpg',
};

const styleDescriptions: Record<Style, string> = {
  'Consistent Aggressive': 'You backed yourself early and kept pushing. The fact that trust and growth moved together under that kind of pace says something - you have good instincts for knowing when the model can take the pressure.',
  'Consistent Cautious': 'You earned this the patient way. Every move was considered before it was made, and the outcome reflects that discipline. Where others hoped the foundations would hold, you made sure they would.',
  'Situational': 'You knew which moments to push and which to protect. Not every opportunity was worth chasing, and you seemed to know the difference. That kind of read is harder to teach than most people admit.',
};

function StyleIcon({ style }: { style: Style }) {
  if (style === 'Consistent Aggressive') {
    return (
      <svg width="78" height="44" viewBox="0 0 78 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.53003 43.9101C7.03188 43.9101 9.06 41.882 9.06 39.3801C9.06 36.8783 7.03188 34.8501 4.53003 34.8501C2.02818 34.8501 0 36.8783 0 39.3801C0 41.882 2.02818 43.9101 4.53003 43.9101Z" fill="white"/>
        <path d="M32.29 39.4101C34.7919 39.4101 36.8199 37.382 36.8199 34.8801C36.8199 32.3783 34.7919 30.3501 32.29 30.3501C29.7882 30.3501 27.76 32.3783 27.76 34.8801C27.76 37.382 29.7882 39.4101 32.29 39.4101Z" fill="white"/>
        <path d="M56.0601 26.81C58.5619 26.81 60.59 24.7818 60.59 22.28C60.59 19.7781 58.5619 17.75 56.0601 17.75C53.5582 17.75 51.53 19.7781 51.53 22.28C51.53 24.7818 53.5582 26.81 56.0601 26.81Z" fill="white"/>
        <path d="M72.6301 9.06C75.132 9.06 77.1602 7.03182 77.1602 4.52997C77.1602 2.02812 75.132 0 72.6301 0C70.1283 0 68.1001 2.02812 68.1001 4.52997C68.1001 7.03182 70.1283 9.06 72.6301 9.06Z" fill="white"/>
        <path d="M4.53003 39.1898L20.38 37.6098C38.04 35.8498 54.27 27.1098 65.47 13.3398L72.63 4.52979" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
      </svg>
    );
  }
  if (style === 'Situational') {
    return (
      <svg width="78" height="44" viewBox="0 0 78 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.53003 43.9199C7.03188 43.9199 9.06 41.8917 9.06 39.3899C9.06 36.888 7.03188 34.8599 4.53003 34.8599C2.02818 34.8599 0 36.888 0 39.3899C0 41.8917 2.02818 43.9199 4.53003 43.9199Z" fill="white"/>
        <path d="M27.2297 26.4897C29.7315 26.4897 31.7597 24.4616 31.7597 21.9597C31.7597 19.4579 29.7315 17.4297 27.2297 17.4297C24.7278 17.4297 22.6997 19.4579 22.6997 21.9597C22.6997 24.4616 24.7278 26.4897 27.2297 26.4897Z" fill="white"/>
        <path d="M49.9299 32.2997C52.4318 32.2997 54.46 30.2716 54.46 27.7698C54.46 25.2679 52.4318 23.2397 49.9299 23.2397C47.4281 23.2397 45.3999 25.2679 45.3999 27.7698C45.3999 30.2716 47.4281 32.2997 49.9299 32.2997Z" fill="white"/>
        <path d="M72.6301 9.06C75.132 9.06 77.1602 7.03182 77.1602 4.52997C77.1602 2.02812 75.132 0 72.6301 0C70.1283 0 68.1001 2.02812 68.1001 4.52997C68.1001 7.03182 70.1283 9.06 72.6301 9.06Z" fill="white"/>
        <path d="M4.52979 39.3898L27.2297 21.9598L49.9298 27.7698L72.6298 4.52979" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
      </svg>
    );
  }
  // Consistent Cautious
  return (
    <svg width="78" height="10" viewBox="0 0 78 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.53003 9.06C7.03188 9.06 9.06 7.03188 9.06 4.53003C9.06 2.02818 7.03188 0 4.53003 0C2.02818 0 0 2.02818 0 4.53003C0 7.03188 2.02818 9.06 4.53003 9.06Z" fill="white"/>
      <path d="M27.2302 9.06C29.732 9.06 31.7602 7.03188 31.7602 4.53003C31.7602 2.02818 29.732 0 27.2302 0C24.7283 0 22.7002 2.02818 22.7002 4.53003C22.7002 7.03188 24.7283 9.06 27.2302 9.06Z" fill="white"/>
      <path d="M49.9299 9.06C52.4318 9.06 54.46 7.03188 54.46 4.53003C54.46 2.02818 52.4318 0 49.9299 0C47.4281 0 45.3999 2.02818 45.3999 4.53003C45.3999 7.03188 47.4281 9.06 49.9299 9.06Z" fill="white"/>
      <path d="M72.6301 9.06C75.132 9.06 77.1602 7.03188 77.1602 4.53003C77.1602 2.02818 75.132 0 72.6301 0C70.1283 0 68.1001 2.02812 68.1001 4.52997C68.1001 7.03182 70.1283 9.06 72.6301 9.06Z" fill="white"/>
      <path d="M4.52979 4.52979H72.6298" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
    </svg>
  );
}

export function ResultScreen({ outcome, style, onRestart }: Props) {
  return (
    <div className="min-h-[calc(100vh-var(--topbar-h))] flex items-center justify-center px-6 pt-0 pb-10">
      <div className="w-full max-w-[83.33vw] flex flex-col gap-0">

        {/* Part 1 — Outcome box */}
        <div className="flex rounded-[16px] overflow-hidden" style={{ boxShadow: '5px 5px 10px 0 rgba(0,0,0,0.20)' }}>
          {/* Left — image */}
          <div className="flex-shrink-0" style={{ width: '42.67%' }}>
            <img
              src={outcomeImages[outcome]}
              alt={outcome}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Right — text */}
          <div
            className="flex flex-col justify-center text-white"
            style={{
              flex: 1,
              background: 'linear-gradient(to right, #3D4B98, #000000)',
              padding: '110px 120px 200px 60px',
            }}
          >
            <h1
              style={{
                fontFamily: "'PP Monument Extended'",
                fontWeight: 900,
                fontSize: '40px',
                lineHeight: '48px',
              }}
            >
              {outcome}
            </h1>
            <p
              style={{
                marginTop: '70px',
                fontFamily: "'PP Monument Wide'",
                fontWeight: 400,
                fontSize: '20px',
                lineHeight: '24px',
              }}
            >
              {outcomeDescriptions[outcome]}
            </p>
          </div>
        </div>

        {/* Part 2 — Decision Style card */}
        <div className="flex justify-end relative" style={{ marginBottom: '-70px' }}>
          <div
            className="relative"
            style={{
              width: '720px',
              transform: 'translate(50px, -70px)',
            }}
          >
            {/* Style icon circle */}
            <div
              className="absolute flex items-center justify-center"
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                backgroundColor: '#A586FF',
                top: '20px',
                left: '-96px',
              }}
            >
              <StyleIcon style={style} />
            </div>

            {/* Card */}
            <div
              className="text-[#15154A]"
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                boxShadow: '5px 5px 10px 0 rgba(0,0,0,0.20)',
                padding: '30px 50px 30px 50px',
              }}
            >
              <p
                style={{
                  fontFamily: "'PP Monument Wide'",
                  fontWeight: 400,
                  fontSize: '10px',
                  lineHeight: '12px',
                }}
              >
                Your Decision Style
              </p>
              <h2
                style={{
                  marginTop: '29px',
                  fontFamily: "'PP Monument Extended'",
                  fontWeight: 900,
                  fontSize: '30px',
                  lineHeight: '36px',
                }}
              >
                {style}
              </h2>
              <p
                style={{
                  marginTop: '40px',
                  fontFamily: "'PP Monument Wide'",
                  fontWeight: 400,
                  fontSize: '15px',
                  lineHeight: '18px',
                }}
              >
                {styleDescriptions[style]}
              </p>
            </div>
          </div>
        </div>

        {/* Restart */}
        <div className="flex justify-center mt-[28px]" style={{ position: 'relative', zIndex: 10 }}>
          <button
            onClick={onRestart}
            className="hover:opacity-90 transition-opacity"
            style={{
              fontFamily: "'PP Monument Wide', sans-serif",
              fontWeight: 900,
              fontSize: '20px',
              lineHeight: '24px',
              color: '#FFFFFF',
              background: '#3D4B98',
              width: '200px',
              height: '52px',
              borderRadius: '26px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}
