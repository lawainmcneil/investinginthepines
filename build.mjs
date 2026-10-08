// Builds the static pages for investinginthepines.com.
// Run `node build.mjs` after editing; it rewrites the .html files in this folder.
// No dependencies. The header, footer and disclosures live here once so every page stays in step.

import { writeFileSync } from "node:fs";

const SITE = "https://investinginthepines.com";
const PHONE = "910-420-0352";
const EMAIL = "pkisver@kiarosadvisors.com";
const FORM = "https://form.jotform.com/241065123487151";
const FORM_ID = "241065123487151";
const GUIDE = "assets/guide/Your-Money-Your-Future.pdf";
const ETHOS = "https://agents.ethoslife.com/invite/bfaa5";

// Newest first. Add each new issue to the top of this list.
const NEWSLETTERS = [
  ["July", "2026", "https://kiarosjuly2026.pages.dev"],
  ["June", "2026", "https://drive.google.com/file/d/1dM-2vEOiWAUmp31BIep92Wud2FOQgtNR/view"],
  ["May", "2026", "https://drive.google.com/file/d/18XA23ScKNi4lKDaSz53EMsSrQDuj09xn/view"],
  ["April", "2026", "https://drive.google.com/file/d/1U9uDRAa6gT2-Ywnb4pX_ijWljIbAElX1/view"],
  ["March", "2026", "https://drive.google.com/file/d/1XE9rpfjANcou44BVkCDN8SrV8WkAedCd/view"],
  ["February", "2026", "https://drive.google.com/file/d/1qXccyN_SER77UrrV0tkKJj7YAYfzxOWc/view"],
  ["January", "2026", "https://drive.google.com/file/d/15snPkUtmXvUTRD81uTRU8H0H7oS8jEtE/view"],
  ["December", "2025", "https://drive.google.com/file/d/1lS2N9DCqWl3LvzQUrBZSxgz_QgZVhQ_H/view"],
];

const NAV = [
  ["index.html", "Home"],
  ["about.html", "About"],
  ["how-i-work.html", "How I Work"],
  ["what-i-do.html", "What I Do"],
  ["insurance.html", "Insurance"],
  ["insights.html", "Insights"],
];

const DISCLOSURE =
  "Investment advisory and financial planning services offered through Kiaros Advisors, LLC, a registered investment advisory firm. Insurance services offered through Peter Kisver are independent of Kiaros Advisors, LLC. Kiaros Advisors, LLC does not give legal or tax advice.";

// A restrained longleaf pine sprig: needles fanning from a short stem.
const sprig = (() => {
  const needles = [];
  const n = 13;
  for (let i = 0; i < n; i++) {
    const a = ((-168 + (156 * i) / (n - 1)) * Math.PI) / 180;
    const len = 24 + (i % 3) * 3;
    const x = (32 + Math.cos(a) * len).toFixed(1);
    const y = (40 + Math.sin(a) * len).toFixed(1);
    needles.push(`<path d="M32 40L${x} ${y}"/>`);
  }
  return `<svg class="sprig" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" aria-hidden="true">${needles.join("")}<path d="M32 40v18" stroke-width="1.6"/></svg>`;
})();

const ext = 'target="_blank" rel="noopener"';

function layout({ file, title, description, body, current = file, image = "share.jpg", extraHead = "", extraFoot = "" }) {
  const url = file === "index.html" ? `${SITE}/` : `${SITE}/${file.replace(".html", "")}`;
  const nav = NAV.map(
    ([href, label]) => `<a href="${href}"${href === current ? ' aria-current="page"' : ""}>${label}</a>`
  ).join("\n        ");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Kiaros Advisors">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${SITE}/assets/img/${image}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="theme-color" content="#30483e">
  <link rel="icon" href="favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Source+Sans+3:wght@400;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/site.css">${extraHead}
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>

  <header class="site-header">
    <div class="wrap">
      <a class="brand" href="index.html" aria-label="Kiaros Advisors, home">
        <img src="assets/img/kiaros-logo.png" alt="Kiaros Advisors, LLC" width="504" height="144">
      </a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>
      <nav class="nav" id="site-nav" aria-label="Main">
        ${nav}
        <a class="nav-cta" href="contact.html"${current === "contact.html" ? ' aria-current="page"' : ""}>Contact</a>
      </nav>
    </div>
  </header>

  <main id="main">
${body}
  </main>

  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-grid">
        <div>
          <img src="assets/img/kiaros-logo-ivory.png" alt="Kiaros Advisors, LLC" width="504" height="144" loading="lazy">
          <p class="footer-tag">Rooted in Pinehurst.<br>Focused on you.</p>
        </div>
        <div>
          <h2>Explore</h2>
          <ul>
            <li><a href="about.html">About Peter</a></li>
            <li><a href="how-i-work.html">How I Work</a></li>
            <li><a href="what-i-do.html">What I Do</a></li>
            <li><a href="insurance.html">Insurance</a></li>
            <li><a href="insights.html">Insights</a></li>
          </ul>
        </div>
        <div>
          <h2>Get in touch</h2>
          <ul>
            <li><a href="tel:+1${PHONE.replace(/-/g, "")}">${PHONE}</a></li>
            <li><a href="mailto:${EMAIL}">${EMAIL}</a></li>
            <li>Pinehurst, North Carolina</li>
            <li><a href="contact.html">Start a conversation</a></li>
          </ul>
        </div>
      </div>
      <div class="legal">
        <p>${DISCLOSURE}</p>
        <p>The material on this website is for informational purposes only and does not constitute investment advice. Investing involves risk, including loss of principal. Past performance is not indicative of future results. Registration as an investment adviser does not imply a certain level of skill or training.</p>
        <p>&copy; ${new Date().getFullYear()} Kiaros Advisors, LLC. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <script src="assets/js/site.js" defer></script>${extraFoot}
</body>
</html>
`;
}

const closing = (heading, text, button = "Let&rsquo;s Have a Conversation") => `
    <section class="section closing">
      <div class="wrap center">
        ${sprig}
        <h2>${heading}</h2>
        <p class="lede">${text}</p>
        <div class="actions">
          <a class="btn" href="contact.html">${button}</a>
          <a class="textlink" href="tel:+1${PHONE.replace(/-/g, "")}">Call ${PHONE}</a>
        </div>
      </div>
    </section>`;

const pages = [];

/* ------------------------------------------------------------------ Home */
pages.push({
  file: "index.html",
  title: "Kiaros Advisors | Financial Planning in Pinehurst, NC",
  description:
    "Peter Kisver of Kiaros Advisors offers financial planning and investment management in Pinehurst, North Carolina. Good advice begins with listening.",
  body: `
    <section class="hero">
      <div class="wrap hero-grid">
        <div>
          <span class="eyebrow">Kiaros Advisors &middot; Pinehurst, North Carolina</span>
          <h1>Good advice begins with listening.</h1>
          <p class="lede">Your financial life deserves more than a plan. It deserves someone who takes the time to understand what matters most to you.</p>
          <div class="actions">
            <a class="btn" href="contact.html">Let&rsquo;s Get Acquainted</a>
            <a class="textlink" href="about.html">Meet Peter</a>
          </div>
        </div>
        <figure class="frame">
          <img src="assets/img/pinehurst-street.jpg" alt="A quiet street in Pinehurst shaded by old oaks and magnolias" width="1280" height="853" fetchpriority="high">
        </figure>
      </div>
    </section>

    <section class="section section--sand">
      <div class="wrap split">
        <figure class="frame frame--left">
          <img src="assets/img/village-shops.jpg" alt="Brick storefronts and flower baskets along a street in the Village of Pinehurst" width="1140" height="760" loading="lazy">
        </figure>
        <div>
          <span class="eyebrow">Meet your advisor</span>
          <h2>A familiar face. A thoughtful conversation.</h2>
          <p>Financial decisions are personal. They involve more than investments, retirement dates, and account balances. They involve your family, your hopes, your concerns, and the life you&rsquo;ve worked hard to build.</p>
          <p>That&rsquo;s why I believe good financial advice begins with a conversation. Not a presentation. Not a sales pitch. Just an opportunity to get acquainted, understand what&rsquo;s important to you, and explore how I might be of service.</p>
          <p>The best financial relationships aren&rsquo;t built around transactions. They&rsquo;re built around trust.</p>
          <div class="actions">
            <a class="btn btn--ghost" href="about.html">Meet Peter Kisver</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="narrow">
          <span class="eyebrow">What I do</span>
          <h2>Whatever is on your mind, we can talk about it.</h2>
          <p class="lede">Perhaps you&rsquo;re wondering whether you&rsquo;re ready to retire. Maybe you&rsquo;re concerned about making your savings last. Or you&rsquo;re facing a financial decision that feels more complicated than it should.</p>
          <p>Whatever brings you here, you deserve the chance to ask questions, consider your options, and make decisions with greater understanding. We can begin there.</p>
        </div>
        <div class="areas">
          <div class="area">
            <span class="num">i.</span>
            <h3>Planning for tomorrow</h3>
            <p>Retirement planning, income strategies, and preparing for life&rsquo;s transitions.</p>
          </div>
          <div class="area">
            <span class="num">ii.</span>
            <h3>Caring for what you&rsquo;ve built</h3>
            <p>Investment management, risk considerations, and long-term financial stewardship.</p>
          </div>
          <div class="area">
            <span class="num">iii.</span>
            <h3>Looking after those you love</h3>
            <p>Estate planning coordination, legacy considerations, and thoughtful financial decisions for your family.</p>
          </div>
        </div>
        <div class="actions">
          <a class="textlink" href="what-i-do.html">See how I can help</a>
        </div>
      </div>
    </section>

    <section class="band">
      <img src="assets/img/longleaf-sunset.jpg" alt="" width="1920" height="900" loading="lazy">
      <div class="wrap">
        <blockquote>
          <p>&ldquo;Helping you achieve your financial goals and maintain your lifestyle into retirement is not just my job, it&rsquo;s my purpose.&rdquo;</p>
          <cite>Peter Kisver, Founder</cite>
        </blockquote>
      </div>
    </section>

    <section class="section">
      <div class="wrap split">
        <div>
          <span class="eyebrow">An independent practice</span>
          <h2>A relationship that doesn&rsquo;t get lost in the shuffle.</h2>
          <p>When you call, you should know who you&rsquo;re calling.</p>
          <p>When you have a question, you should feel comfortable asking.</p>
          <p>And when something changes in your life, you should have someone who understands your circumstances.</p>
          <p>That&rsquo;s the kind of relationship I believe financial advice should be built upon.</p>
          <div class="actions">
            <a class="textlink" href="how-i-work.html">How I work</a>
          </div>
        </div>
        <figure class="frame">
          <img src="assets/img/village-magnolia.jpg" alt="White clapboard shops, rocking chairs and azaleas in bloom in the Village of Pinehurst" width="900" height="600" loading="lazy">
        </figure>
      </div>
    </section>

    <section class="section section--sand">
      <div class="wrap">
        <span class="eyebrow">Insights</span>
        <h2>Ignore the noise of Wall Street.</h2>
        <p class="lede">Plain-spoken reading for people who would rather understand their money than worry about it.</p>
        <div class="cards">
          <a class="card" href="patient-investors.html">
            <span class="eyebrow">Article</span>
            <h3>Why patient investors win in volatile markets</h3>
            <p>When the headlines turn grim, the hardest thing to do is usually the right one.</p>
            <span class="textlink">Read the article</span>
          </a>
          <a class="card" href="${NEWSLETTERS[0][2]}" ${ext}>
            <span class="eyebrow">Newsletter</span>
            <h3>The ${NEWSLETTERS[0][0]} ${NEWSLETTERS[0][1]} issue</h3>
            <p>Each month I share a few observations on markets, planning, and the questions clients are asking.</p>
            <span class="textlink">Read this month&rsquo;s issue</span>
          </a>
          <a class="card" href="${GUIDE}" ${ext}>
            <span class="eyebrow">Free guide</span>
            <h3>Your Money, Your Future</h3>
            <p>Why a clear, written financial plan matters, and what a good one should include.</p>
            <span class="textlink">Download the guide</span>
          </a>
        </div>
      </div>
    </section>
${closing("Shall we get acquainted?", "There&rsquo;s no agenda for a first conversation. Tell me what&rsquo;s on your mind, and we&rsquo;ll see whether I can be of help.")}`,
});

/* ----------------------------------------------------------------- About */
pages.push({
  file: "about.html",
  title: "About Peter Kisver | Kiaros Advisors",
  description:
    "Peter Kisver founded Kiaros Advisors in Pinehurst, NC after more than 20 years in financial services. Learn about his background and how he approaches advice.",
  body: `
    <section class="page-head">
      <div class="wrap">
        <span class="eyebrow">About</span>
        <h1>Peter Kisver</h1>
        <p class="lede">Founder of Kiaros Advisors. Neighbor, husband, father of three, and a believer that most good financial decisions start with an unhurried conversation.</p>
      </div>
    </section>

    <section class="section section--tight">
      <div class="wrap split split--top">
        <figure class="frame frame--left frame--tall">
          <img src="assets/img/carolina-lawn.jpg" alt="Magnolias and a wide green lawn in front of a white hotel in Pinehurst" width="1280" height="853">
        </figure>
        <div>
          <h2>More than twenty years of sitting across the table.</h2>
          <p>I&rsquo;ve spent over 20 years in the financial services and insurance industry, working in wealth management, financial planning, and portfolio analysis. The technical side of the work matters. But what has kept me in it is the people.</p>
          <p>What I enjoy most is educating and assisting individuals and families as they pursue their financial goals and work to preserve their lifestyle in retirement. I like explaining things until they make sense. I like it when someone leaves a meeting feeling lighter than when they arrived.</p>
          <p>I studied finance at Pennsylvania State University, where I earned my Bachelor of Science in 1996.</p>
          <p>Away from work, you&rsquo;ll find me on a golf course or at home in Pinehurst with my wife, Tamara, our three children, and our two dogs.</p>
        </div>
      </div>
    </section>

    <section class="band">
      <img src="assets/img/longleaf-canopy.jpg" alt="" width="1600" height="1200" loading="lazy">
      <div class="wrap">
        <blockquote>
          <p>&ldquo;Helping you achieve your financial goals and maintain your lifestyle into retirement is not just my job, it&rsquo;s my purpose.&rdquo;</p>
          <cite>Peter Kisver</cite>
        </blockquote>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="narrow">
          <span class="eyebrow">What I believe</span>
          <h2>A few things I&rsquo;ve learned along the way.</h2>
        </div>
        <div class="pairs">
          <div>
            <h3>Listening comes first.</h3>
            <p>Everyone&rsquo;s circumstances are different. Before we talk about investments or retirement dates, I want to understand what you&rsquo;re hoping for and what worries you.</p>
          </div>
          <div>
            <h3>Understanding beats persuasion.</h3>
            <p>You should never have to take my word for it. My job is to explain your options clearly enough that the decision feels like your own.</p>
          </div>
          <div>
            <h3>Patience is a strategy.</h3>
            <p>Investing takes discipline and time, not short-term gambles. Much of my work is helping people stay steady when the news is loud.</p>
          </div>
          <div>
            <h3>Advice is a relationship.</h3>
            <p>A plan is only useful if someone is around to help you live with it. I intend to be that person for the people I serve.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--sand">
      <div class="wrap split">
        <div>
          <span class="eyebrow">The firm</span>
          <h2>Kiaros Advisors</h2>
          <p>Kiaros Advisors, LLC is an independent registered investment advisory firm based in Pinehurst, North Carolina. I started it to offer the kind of advice I would want for my own family: personal, clearly explained, and free of pressure.</p>
          <p>Being independent means that when you work with Kiaros, you work with me.</p>
          <div class="actions">
            <a class="btn btn--ghost" href="how-i-work.html">How I work</a>
          </div>
        </div>
        <figure class="frame">
          <img src="assets/img/village-shops.jpg" alt="Lamplit brick storefronts in the Village of Pinehurst at dusk" width="1140" height="760" loading="lazy">
        </figure>
      </div>
    </section>
${closing("I&rsquo;d welcome the chance to meet you.", "If you&rsquo;re looking for someone to talk with about your financial future, let&rsquo;s find a time.", "Let&rsquo;s Get Acquainted")}`,
});

/* ------------------------------------------------------------ How I Work */
pages.push({
  file: "how-i-work.html",
  title: "How I Work | Kiaros Advisors, Pinehurst NC",
  description:
    "How Peter Kisver works with clients at Kiaros Advisors: a first conversation, a clear written plan, a disciplined investment approach, and an ongoing relationship.",
  body: `
    <section class="page-head">
      <div class="wrap">
        <span class="eyebrow">How I work</span>
        <h1>Unhurried, clearly explained, and built around you.</h1>
        <p class="lede">Investing for your future should never be stressful. Here is what working together looks like, and the thinking behind the advice I give.</p>
      </div>
    </section>

    <section class="section section--tight">
      <div class="wrap">
        <div class="narrow">
          <h2>What to expect</h2>
        </div>
        <ol class="steps">
          <li>
            <div>
              <h3>We get acquainted.</h3>
              <p>Our first conversation is just that. You tell me about your family, your work, what you&rsquo;re hoping for, and what&rsquo;s been keeping you up at night. I mostly listen. There is no cost and no obligation.</p>
            </div>
          </li>
          <li>
            <div>
              <h3>We look at where you stand.</h3>
              <p>Together we take stock of what you have, what you owe, and what you expect from the years ahead. I&rsquo;ll also look at the risks in your current portfolio, including ones that are easy to overlook.</p>
            </div>
          </li>
          <li>
            <div>
              <h3>We put a plan in writing.</h3>
              <p>A financial plan considers your goals, your tolerance for risk, and your time horizon. I believe it should be written down in plain language, so you have a roadmap you can actually follow and come back to.</p>
            </div>
          </li>
          <li>
            <div>
              <h3>We stay in touch.</h3>
              <p>Lives change, and plans should change with them. We monitor progress, revisit priorities, and adjust when something shifts. And when you have a question in between, you call me.</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section class="section section--pine">
      <div class="wrap">
        <div class="narrow">
          <span class="eyebrow">Investment philosophy</span>
          <h2>Ignore the noise of Wall Street.</h2>
          <p class="lede">I don&rsquo;t believe in predictions, hot tips, or reacting to every headline. I believe in a few durable ideas, applied consistently.</p>
        </div>
        <div class="pairs">
          <div>
            <h3>Markets reward patience.</h3>
            <p>Investing requires discipline, patience, and time. When you own a diverse mix of stocks, you&rsquo;re investing in the growth and innovation of real businesses around the world, and giving compounding the years it needs to work.</p>
          </div>
          <div>
            <h3>Diversification is the foundation.</h3>
            <p>Owning different kinds of assets means that a hard stretch for one may be offset by another. It won&rsquo;t remove the bumps, but it can make for a steadier journey toward your goals.</p>
          </div>
          <div>
            <h3>Risk is more than losing money.</h3>
            <p>Rising healthcare costs and inflation can quietly erode a retirement just as surely as a market decline. A sound plan accounts for all of them.</p>
          </div>
          <div>
            <h3>Less volatility, more staying power.</h3>
            <p>I look at how much a portfolio is likely to swing, not only at what it might return. A portfolio you can live with is one you&rsquo;re far more likely to stay with.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap split">
        <figure class="frame frame--left">
          <img src="assets/img/pinehurst-street.jpg" alt="Sunlight through old oaks over a residential street in Pinehurst" width="1280" height="853" loading="lazy">
        </figure>
        <div>
          <span class="eyebrow">The relationship</span>
          <h2>You&rsquo;ll always know who to call.</h2>
          <p>Kiaros is an independent practice. I&rsquo;m the person you meet at the beginning, and I&rsquo;m the person who answers when you have a question years later.</p>
          <p>That continuity matters. It means you don&rsquo;t have to explain your situation from the start each time, and that the advice you receive comes from someone who knows your story.</p>
          <div class="actions">
            <a class="textlink" href="what-i-do.html">What I can help with</a>
          </div>
        </div>
      </div>
    </section>
${closing("It starts with a conversation.", "No presentation and no pressure. Just a chance to talk through what&rsquo;s on your mind.")}`,
});

/* ------------------------------------------------------------- What I Do */
pages.push({
  file: "what-i-do.html",
  title: "What I Do | Financial Planning & Investment Management | Kiaros Advisors",
  description:
    "Retirement and financial planning, investment management, tax-aware strategy, and family and legacy considerations from Kiaros Advisors in Pinehurst, NC.",
  body: `
    <section class="page-head">
      <div class="wrap">
        <span class="eyebrow">What I do</span>
        <h1>Whatever is on your mind, we can talk about it.</h1>
        <p class="lede">People rarely come to an advisor looking for a product. They come with a question. These are the ones I hear most often, and how I help.</p>
      </div>
    </section>

    <div class="wrap">
      <section class="service" id="planning">
        <div class="split split--top">
          <div>
            <span class="eyebrow">i. Planning for tomorrow</span>
            <h2>&ldquo;Am I going to be all right?&rdquo;</h2>
            <p>Financial planning is the art of making intelligent choices about how to use your money. It begins with deciding what you want out of life, and then working out what each of those goals will require.</p>
            <p>From there we assess where you are today, set priorities, and build a strategy for getting from here to there. A good plan also names the obstacles that could stand in your way, so they don&rsquo;t arrive as surprises.</p>
            <div class="actions">
              <a class="textlink" href="${GUIDE}" ${ext}>Free guide: Your Money, Your Future</a>
            </div>
          </div>
          <div>
            <h3>We can talk about</h3>
            <ul class="topics">
              <li>Whether, and when, you&rsquo;re ready to retire</li>
              <li>Turning savings into dependable retirement income</li>
              <li>Making your money last as long as you need it</li>
              <li>Preparing for a career change, a move, or a loss</li>
              <li>Putting a clear, written plan in place</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="service" id="investing">
        <div class="split split--top">
          <div>
            <span class="eyebrow">ii. Caring for what you&rsquo;ve built</span>
            <h2>&ldquo;Is my money invested the way it should be?&rdquo;</h2>
            <p>I manage portfolios with discipline and diversification rather than short-term bets. The aim is a portfolio suited to your goals and your comfort with risk, one you can hold through good markets and difficult ones.</p>
            <p>If you already have investments, I can help you identify the risks in your current portfolio and build a plan to improve its chances of success.</p>
            <div class="actions">
              <a class="textlink" href="how-i-work.html">Read my investment philosophy</a>
            </div>
          </div>
          <div>
            <h3>We can talk about</h3>
            <ul class="topics">
              <li>Ongoing investment management</li>
              <li>How much risk you&rsquo;re really taking</li>
              <li>Diversification across markets and asset types</li>
              <li>The effect of inflation and healthcare costs</li>
              <li>Staying the course when markets are unsettled</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="service" id="tax">
        <div class="split split--top">
          <div>
            <span class="eyebrow">Along the way</span>
            <h2>&ldquo;Am I paying more tax than I need to?&rdquo;</h2>
            <p>A financial plan should be tax-smart as well as sound. I look for ways to make your strategy more tax-efficient, particularly around retirement accounts and your 401(k), so that more of what you&rsquo;ve saved is there when you need it.</p>
            <p class="note">Kiaros Advisors does not give legal or tax advice. I&rsquo;m glad to work alongside your accountant or attorney so everyone is working from the same plan.</p>
          </div>
          <div>
            <h3>We can talk about</h3>
            <ul class="topics">
              <li>Tax-efficient saving for retirement</li>
              <li>Making the most of your 401(k)</li>
              <li>Which accounts to draw from, and when</li>
              <li>Coordinating with your tax professional</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="service" id="family">
        <div class="split split--top">
          <div>
            <span class="eyebrow">iii. Looking after those you love</span>
            <h2>&ldquo;Will my family be taken care of?&rdquo;</h2>
            <p>Much of financial planning is really about other people: a spouse, children, grandchildren, the causes you care for. I help you think through what you&rsquo;d like to happen and coordinate with the professionals who put it on paper.</p>
            <p>Life insurance is often part of that conversation. If you&rsquo;d like a sense of what term coverage might cost, the Ethos Estimator asks a few basic questions and gives you a figure.</p>
            <div class="actions">
              <a class="textlink" href="insurance.html">More about life insurance</a>
            </div>
            <p class="note">Insurance services offered through Peter Kisver are independent of Kiaros Advisors, LLC.</p>
          </div>
          <div>
            <h3>We can talk about</h3>
            <ul class="topics">
              <li>Estate planning coordination with your attorney</li>
              <li>What you&rsquo;d like to leave, and to whom</li>
              <li>Protecting your family&rsquo;s income</li>
              <li>Term life insurance</li>
              <li>Helping a spouse or parent with their finances</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
${closing("Not sure where your question fits?", "That&rsquo;s perfectly fine. Most first conversations begin that way.")}`,
});

/* ------------------------------------------------------------- Insurance */
pages.push({
  file: "insurance.html",
  title: "Life Insurance | Kiaros Advisors, Pinehurst NC",
  description:
    "Life insurance protects the people who depend on you. See what term coverage could cost with the Ethos Estimator, then talk it through with Peter Kisver in Pinehurst, NC.",
  body: `
    <section class="page-head">
      <div class="wrap">
        <span class="eyebrow">Insurance</span>
        <h1>If someone depends on you, it matters.</h1>
        <p class="lede">Life insurance isn&rsquo;t just about covering funeral costs. It&rsquo;s about protecting your family&rsquo;s financial future, and making sure the people who rely on you most are taken care of, no matter what happens.</p>
      </div>
    </section>

    <section class="section section--sand" id="ethos">
      <div class="wrap split">
        <div>
          <span class="eyebrow">Ethos Estimator</span>
          <h2>See how affordable life insurance could be for you and your family.</h2>
          <p>Term life insurance is an affordable option for many families. The Ethos Estimator shows what it could cost after a few basic questions.</p>
          <p>If you like what you see, I can help you take the next steps to being covered.</p>
          <div class="actions">
            <a class="btn" href="${ETHOS}" ${ext}>Open the Ethos Estimator</a>
          </div>
          <p class="note">The estimator opens on the Ethos website. Insurance services offered through Peter Kisver are independent of Kiaros Advisors, LLC.</p>
        </div>
        <a class="phone" href="${ETHOS}" ${ext} aria-label="Open the Ethos Estimator">
          <img src="assets/img/ethos-estimator.png" alt="The Ethos Estimator on a phone, asking a simple question about height" width="520" height="1057" loading="lazy">
        </a>
      </div>
    </section>

    <section class="section">
      <div class="wrap split split--top">
        <div>
          <span class="eyebrow">Do you need it?</span>
          <h2>Three questions worth asking yourself.</h2>
          <p>A well-thought-out life insurance plan can provide a safety net that gives your loved ones time to heal, adapt, and move forward without financial strain. Whether you need one usually comes down to who is counting on you.</p>
        </div>
        <div>
          <ul class="topics">
            <li>Do you have dependents who rely on your income?</li>
            <li>Would your spouse or kids struggle financially if something happened to you?</li>
            <li>Do you have debt that would become someone else&rsquo;s problem?</li>
          </ul>
          <p style="margin-top:1.6rem">If you answered yes to any of these, it&rsquo;s worth a conversation.</p>
        </div>
      </div>
    </section>

    <section class="section section--pine">
      <div class="wrap">
        <div class="narrow">
          <span class="eyebrow">Keeping it simple</span>
          <h2>The right coverage, clearly explained.</h2>
        </div>
        <div class="pairs">
          <div>
            <h3>Term life insurance</h3>
            <p>Coverage for a set number of years, typically the ones when your family depends on your income most. It is often an affordable solution for most families.</p>
          </div>
          <div>
            <h3>Whole life insurance</h3>
            <p>That&rsquo;s another debate. It can have a place, but make sure you understand the costs and benefits before signing on the dotted line.</p>
          </div>
          <div>
            <h3>Part of the plan</h3>
            <p>Insurance works best when it&rsquo;s considered alongside your savings, your debts, and your goals, not sold on its own.</p>
          </div>
          <div>
            <h3>No pressure</h3>
            <p>I&rsquo;ll help you understand your options and what they cost. Whether you move forward, and when, is up to you.</p>
          </div>
        </div>
      </div>
    </section>
${closing("Have questions about coverage?", "Try the estimator, or call me and we&rsquo;ll talk through what makes sense for your family.")}`,
});

/* -------------------------------------------------------------- Insights */
pages.push({
  file: "insights.html",
  title: "Insights | Kiaros Advisors, Pinehurst NC",
  description:
    "Articles, a monthly newsletter, and a free financial planning guide from Peter Kisver of Kiaros Advisors in Pinehurst, North Carolina.",
  body: `
    <section class="page-head">
      <div class="wrap">
        <span class="eyebrow">Insights</span>
        <h1>Thoughtful reading for a noisy world.</h1>
        <p class="lede">Observations on markets, planning, and the questions I hear most. Written to be understood, not to impress.</p>
      </div>
    </section>

    <section class="section section--tight">
      <div class="wrap feature">
        <figure class="frame frame--left">
          <a href="patient-investors.html"><img src="assets/img/longleaf-sunset.jpg" alt="Evening sun through a stand of longleaf pines" width="1920" height="900"></a>
        </figure>
        <div>
          <span class="eyebrow">Featured article</span>
          <h2>Why patient investors win in volatile markets</h2>
          <p>Bad financial news is never in short supply. It&rsquo;s natural to worry about your portfolio, but history suggests the most costly thing you can do is abandon a sound long-term plan.</p>
          <div class="actions">
            <a class="btn btn--ghost" href="patient-investors.html">Read the article</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--sand" id="newsletter">
      <div class="wrap">
        <div class="narrow">
          <span class="eyebrow">Monthly newsletter</span>
          <h2>The Kiaros newsletter</h2>
          <p>Once a month I put together a short newsletter for clients and friends of the firm. Recent issues are below.</p>
        </div>
        <ul class="archive">
          ${NEWSLETTERS.map(
            ([m, y, href]) =>
              `<li><a href="${href}" ${ext}><span class="month">${m}</span><span class="year">${y}</span></a></li>`
          ).join("\n          ")}
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="wrap split">
        <div>
          <span class="eyebrow">Free guide</span>
          <h2>Your Money, Your Future</h2>
          <p>A short guide to the importance of having a clear, written financial plan and roadmap: what one is, why it matters, and how to tell whether yours is doing its job.</p>
          <p>It&rsquo;s free, and there&rsquo;s nothing to sign up for.</p>
          <div class="actions">
            <a class="btn" href="${GUIDE}" ${ext}>Download the Guide</a>
          </div>
        </div>
        <figure class="frame">
          <img src="assets/img/longleaf-canopy.jpg" alt="Looking up through tall longleaf pines to a blue sky" width="1600" height="1200" loading="lazy">
        </figure>
      </div>
    </section>
${closing("Have a question an article can&rsquo;t answer?", "I&rsquo;m always glad to talk it through in person or by phone.")}`,
});

/* --------------------------------------------------------------- Article */
pages.push({
  file: "patient-investors.html",
  current: "insights.html",
  image: "longleaf-sunset.jpg",
  title: "Why Patient Investors Win in Volatile Markets | Kiaros Advisors",
  description:
    "When markets fall and headlines turn grim, history suggests the best response is usually to stay with your long-term plan. Peter Kisver explains why.",
  body: `
    <article class="article">
      <header class="page-head">
        <div class="wrap narrow">
          <span class="eyebrow"><a href="insights.html" style="color:inherit;text-decoration:none">Insights</a> &middot; Kiaros Insights</span>
          <h1>Why patient investors win in volatile markets</h1>
          <p class="lede">By Peter Kisver</p>
        </div>
      </header>

      <div class="wrap">
        <figure class="article-hero">
          <img src="assets/img/longleaf-sunset.jpg" alt="Evening sun through a stand of longleaf pines" width="1920" height="900">
        </figure>
      </div>

      <div class="wrap narrow">
        <p class="lede">Bad financial news abounds. Markets are falling. Analysts and experts are predicting worse to come. It&rsquo;s only natural to worry about your portfolio.</p>
        <p>But history suggests that the most damaging thing you can do in moments like these is to abandon your long-term plan.</p>

        <blockquote>
          &ldquo;The stock market is designed to transfer money from the active to the patient.&rdquo;
          <cite>Warren Buffett</cite>
        </blockquote>

        <h2>Invest in probabilities, not guarantees</h2>
        <p>Investing is not for the timid. The stock market offers no guarantees. What it offers is probabilities: over long periods, markets have tended to rise, and investors who held to a sound strategy have generally been rewarded for it.</p>
        <p>Investors who trade in and out with every headline tend to fare worse, because bumps in the road are inevitable. They are bumps, though, not the end of the road, and the task is to work through them.</p>

        <h2>The most money is made by the patient</h2>
        <p>Buffett is an active investor himself, but he understands something essential about markets. Those who stay patient tend to come out ahead, while those who panic fall by the wayside. So keep your eye on your long-term goals, and give compounding the time it needs.</p>

        <h2>Build a portfolio that cushions the dips</h2>
        <p>A diversified portfolio is your cushion against the volatility you know is coming. When you hold different asset classes, losses in one may be offset by gains in another. The ride may not always feel smooth, but your overall investment risk is lower, especially when markets turn rough.</p>

        <h2>Corrections are an opportunity</h2>
        <p>Market downturns, while unsettling, are natural moments to rebalance. When stocks fall, rebalancing guides you to sell some of what has held steady and buy more equities at lower prices.</p>

        <blockquote>
          &ldquo;Be fearful when others are greedy, and greedy when others are fearful.&rdquo;
          <cite>Warren Buffett</cite>
        </blockquote>

        <p>While others are selling in a panic, a systematic approach has you buying at a discount, without having to pick individual stocks. It keeps your portfolio at its target allocation and positions it to participate when markets recover.</p>

        <h2>History favors those who sit still</h2>
        <p>Market corrections are a regular feature of investing, not a rare event. Many have reversed within months, though some have taken a good deal longer.</p>
        <p>Consider early 2020. When COVID struck, the S&amp;P 500 fell by more than 30% in a matter of weeks. An investor who sold near the bottom locked in that loss. An investor in an S&amp;P 500 index fund who simply held on was back to even by August.</p>

        <h2>Trust your financial plan</h2>
        <p>It&rsquo;s easy to be shaken by doomsday headlines. But your financial plan was designed with the long haul in mind, and it already assumes that difficult stretches will come. As long as emotion doesn&rsquo;t take the wheel, the plan can do the work it was built to do.</p>
        <p>It isn&rsquo;t about timing the market. It&rsquo;s about time <em>in</em> the market. Stay patient, stay diversified, and stay the course.</p>
        <p>If you&rsquo;re feeling uncertain and wondering whether your plan needs adjusting, <a href="contact.html">please get in touch</a>. I&rsquo;m glad to talk it through.</p>

        <p class="fineprint">Disclosure: This material is for informational purposes only and does not constitute investment advice. Investing involves risk, including loss of principal. Diversification and rebalancing do not ensure a profit or protect against loss. Past performance is not indicative of future results. Index returns are shown for illustration; it is not possible to invest directly in an index. Consult a qualified professional before making financial decisions. Kiaros Advisors is a registered investment advisor; registration does not imply a certain level of skill or expertise.</p>
      </div>
    </article>
${closing("Wondering whether your plan is built for days like these?", "Let&rsquo;s take a look at it together.")}`,
});

/* --------------------------------------------------------------- Contact */
pages.push({
  file: "contact.html",
  title: "Contact | Kiaros Advisors, Pinehurst NC",
  description:
    "Start a conversation with Peter Kisver of Kiaros Advisors in Pinehurst, North Carolina. Call 910-420-0352 or request a consultation online.",
  extraFoot: `
  <script src="https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js"></script>
  <script>if (window.jotformEmbedHandler) window.jotformEmbedHandler("iframe[id='JotFormIFrame-${FORM_ID}']", "https://form.jotform.com/");</script>`,
  body: `
    <section class="page-head">
      <div class="wrap">
        <span class="eyebrow">Contact</span>
        <h1>Let&rsquo;s start a conversation.</h1>
        <p class="lede">Call, write, or send a note using the form. I&rsquo;ll get back to you personally.</p>
      </div>
    </section>

    <section class="section section--tight" style="padding-top:0">
      <div class="wrap contact-grid">
        <div>
          <ul class="contact-list">
            <li><span class="label">Phone</span><a href="tel:+1${PHONE.replace(/-/g, "")}">${PHONE}</a></li>
            <li><span class="label">Email</span><a href="mailto:${EMAIL}">${EMAIL}</a></li>
            <li><span class="label">Location</span><span class="value">Pinehurst, North Carolina</span></li>
          </ul>
          <h3>What happens next</h3>
          <p>We&rsquo;ll find a time to talk, in person or by phone. There&rsquo;s nothing to prepare and no obligation. Bring your questions, and I&rsquo;ll bring a few of my own.</p>
          <p class="note">Please don&rsquo;t include account numbers or other sensitive personal information in your message.</p>
        </div>
        <div>
          <div class="form-shell">
            <iframe id="JotFormIFrame-${FORM_ID}" title="Request a consultation" src="${FORM}" loading="lazy" allow="geolocation; microphone; camera" scrolling="no"></iframe>
          </div>
          <p class="form-fallback">Form not loading? <a href="${FORM}" ${ext}>Open it in a new tab</a>.</p>
        </div>
      </div>
    </section>

    <section class="band">
      <img src="assets/img/longleaf-canopy.jpg" alt="" width="1600" height="1200" loading="lazy">
      <div class="wrap">
        <blockquote>
          <p>Rooted in Pinehurst. Focused on you.</p>
        </blockquote>
      </div>
    </section>`,
});

/* ------------------------------------------------------------------- 404 */
pages.push({
  file: "404.html",
  current: "",
  title: "Page Not Found | Kiaros Advisors",
  description: "The page you were looking for could not be found.",
  body: `
    <section class="section">
      <div class="wrap center">
        ${sprig}
        <h1>That page seems to have wandered off.</h1>
        <p class="lede">Let&rsquo;s get you back on a familiar path.</p>
        <div class="actions">
          <a class="btn" href="index.html">Return Home</a>
          <a class="textlink" href="contact.html">Contact Peter</a>
        </div>
      </div>
    </section>`,
});

for (const page of pages) writeFileSync(new URL(page.file, import.meta.url), layout(page));

const listed = pages.filter((p) => p.file !== "404.html");
writeFileSync(
  new URL("sitemap.xml", import.meta.url),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${listed.map((p) => `  <url><loc>${SITE}/${p.file === "index.html" ? "" : p.file.replace(".html", "")}</loc></url>`).join("\n")}
</urlset>
`
);

console.log(`Built ${pages.length} pages + sitemap.xml`);
