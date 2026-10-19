/* TexCycle AI portfolio — shared behaviour v2 */
const CONFIG = {
  groupEmail: "",
  year: new Date().getFullYear()
};
const PAGES = [
  {id:"home",     href:"index.html",        label:"Home"},
  {id:"domain",   href:"domain.html",       label:"Domain", sub:[
    {href:"domain.html#intro",        label:"Introduction"},
    {href:"domain.html#literature",   label:"Literature survey"},
    {href:"domain.html#problem",      label:"Problem & gap"},
    {href:"domain.html#methodology",  label:"Methodology"},
    {href:"domain.html#technologies", label:"Technologies"},
    {href:"domain.html#architecture", label:"System architecture"},
    {href:"components.html",          label:"Individual components"}
  ]},
  {id:"milestones",    href:"milestones.html",    label:"Milestones"},
  {id:"documents",     href:"documents.html",     label:"Documents"},
  {id:"presentations", href:"presentations.html", label:"Presentations"},
  {id:"about",         href:"about.html",         label:"About Us"},
  {id:"contact",       href:"contact.html",       label:"Contact Us"}
];

const LOGO_SVG = `<svg viewBox="0 0 40 40" aria-hidden="true" focusable="false">
  <rect width="40" height="40" rx="10" fill="#092D25"/>
  <path d="M12 14h16M12 20h16M12 26h16M14 11v18M20 11v18M26 11v18" stroke="#18866B" stroke-width="2"/>
  <path d="M27 9a8 8 0 1 1-8 8" fill="none" stroke="#D9A64E" stroke-width="2.4" stroke-linecap="round"/>
</svg>`;

function buildChrome() {
  const cur = document.body.dataset.page;
  const inDomain = ["domain","components"].includes(cur);

  const items = PAGES.map(p => {
    const active = (p.id === cur || (p.id === "domain" && inDomain)) ? ' aria-current="page"' : '';
    if (!p.sub) return `<li><a href="${p.href}"${active}>${p.label}</a></li>`;
    return `<li>
      <button class="dd-btn" aria-expanded="false" aria-haspopup="true" aria-controls="dd-${p.id}"${active}>
        ${p.label}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" style="vertical-align:middle;margin-left:2px">
          <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <ul class="dd-panel" id="dd-${p.id}">${p.sub.map(s=>`<li><a href="${s.href}">${s.label}</a></li>`).join("")}</ul>
    </li>`;
  }).join("");

  const header = `<a class="skip" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="wrap nav">
      <a class="logo" href="index.html" aria-label="TexCycle AI home">
        ${LOGO_SVG}<span>TexCycle <b>AI</b></span>
      </a>
      <button class="burger" aria-label="Open navigation menu" aria-expanded="false" aria-controls="menu">
        <span></span><span></span><span></span>
      </button>
      <nav aria-label="Main navigation">
        <ul class="menu" id="menu">${items}</ul>
      </nav>
    </div>
  </header>`;

  const footLinks = PAGES.map(p=>`<li><a href="${p.href}">${p.label}</a></li>`).join("");
  const footer = `
  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-grid">
        <div>
          <div class="foot-brand">
            ${LOGO_SVG}<span>TexCycle <b>AI</b></span>
          </div>
          <p>AI-Powered Digital Marketplace for Upcycling Sri Lanka's Textile Waste. An academic research project exploring textile waste identification, sustainability assessment and marketplace intelligence.</p>
          <p style="margin-top:.75rem;font-size:.82rem;color:rgba(255,255,255,.3)">Project ID R26-IT-081 · Panel IT-P06</p>
        </div>
        <div>
          <h4>Quick links</h4>
          <ul>${footLinks}</ul>
        </div>
        <div>
          <h4>Institution</h4>
          <p>Sri Lanka Institute of Information Technology (SLIIT)<br>Faculty of Computing<br>Information Technology specialization</p>
        </div>
      </div>
      <div class="foot-bottom">
        <span>© ${CONFIG.year} TexCycle AI research group. Academic research portfolio — not the marketplace application.</span>
        <span>R26-IT-081</span>
      </div>
    </div>
  </footer>
  <button id="toTop" aria-label="Back to top">↑</button>
  <div class="lb" id="lb" role="dialog" aria-modal="true" aria-label="Enlarged image">
    <button type="button">Close ✕</button>
    <img alt="">
  </div>`;

  document.body.insertAdjacentHTML("afterbegin", header);
  document.body.insertAdjacentHTML("beforeend", footer);
}

function initNav() {
  const burger = document.querySelector(".burger");
  const menu   = document.getElementById("menu");

  burger.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });

  // Close menu on link click (mobile)
  menu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      menu.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    });
  });

  document.querySelectorAll(".dd-btn").forEach(b => {
    const panel = document.getElementById(b.getAttribute("aria-controls"));
    b.addEventListener("click", e => {
      e.stopPropagation();
      const open = !panel.classList.contains("open");
      closeDD();
      panel.classList.toggle("open", open);
      b.setAttribute("aria-expanded", open);
    });
  });

  function closeDD() {
    document.querySelectorAll(".dd-panel").forEach(p => p.classList.remove("open"));
    document.querySelectorAll(".dd-btn").forEach(b => b.setAttribute("aria-expanded","false"));
  }

  document.addEventListener("click", closeDD);
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeDD();
      document.getElementById("lb").classList.remove("open");
      menu.classList.remove("open");
      burger.setAttribute("aria-expanded","false");
    }
  });
}

function initUtilities() {
  const t = document.getElementById("toTop");
  addEventListener("scroll", () => t.classList.toggle("show", scrollY > 500), {passive:true});
  t.addEventListener("click", () => scrollTo({top:0, behavior:"smooth"}));

  const lb  = document.getElementById("lb");
  const img = lb.querySelector("img");

  document.querySelectorAll("img.zoomable").forEach(i => {
    i.tabIndex = 0;
    const open = () => {
      img.src = i.src; img.alt = i.alt;
      lb.classList.add("open");
      lb.querySelector("button").focus();
    };
    i.addEventListener("click", open);
    i.addEventListener("keydown", e => { if(e.key==="Enter") open(); });
  });
  lb.addEventListener("click", e => { if(e.target !== img) lb.classList.remove("open"); });
  lb.querySelector("button").addEventListener("click", () => lb.classList.remove("open"));
}

const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const statusTag = s => ({
  "Available":    '<span class="status st-ok">Available</span>',
  "Coming Soon":  '<span class="status st-soon">Coming Soon</span>'
}[s] || `<span class="status st-na">${esc(s)}</span>`);

function initLibrary() {
  const cards = [...document.querySelectorAll(".card.doc")];
  if (!cards.length) return;

  cards.forEach(c => {
    const f  = c.dataset.file;
    const st = c.querySelector(".state");
    const b  = c.querySelector(".btns");
    if (f) {
      const ext = f.split(".").pop().toUpperCase();
      st.innerHTML = statusTag("Available") + `&nbsp;<span class="status st-na" style="font-size:.72rem">${esc(ext)}</span>`;
      b.innerHTML  = `<a class="btn btn-green btn-sm" href="${esc(f)}" target="_blank" rel="noopener">Open</a><a class="btn btn-out btn-sm" href="${esc(f)}" download>Download</a>`;
    } else {
      st.innerHTML = statusTag("Coming Soon");
      b.innerHTML  = '<span class="btn btn-out btn-sm" aria-disabled="true">Not yet published</span>';
    }
  });

  const q = document.getElementById("docSearch");
  const k = document.getElementById("docCat");
  if (!q) return;

  const draw = () => {
    let n = 0;
    cards.forEach(c => {
      const ok = (!k.value || c.dataset.cat === k.value) &&
                 c.textContent.toLowerCase().includes(q.value.trim().toLowerCase());
      c.hidden = !ok;
      if (ok) n++;
    });
    document.getElementById("docCount").textContent = `${n} of ${cards.length} documents`;
    document.getElementById("docEmpty").hidden = n > 0;
  };
  q.addEventListener("input", draw);
  k.addEventListener("change", draw);
  draw();
}

function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  const out = document.getElementById("formOut");

  const rules = {
    name:    v => v.trim().length >= 2     || "Enter your name (at least 2 characters).",
    email:   v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || "Enter a valid email address.",
    subject: v => v.trim().length >= 3     || "Enter a subject (at least 3 characters).",
    message: v => v.trim().length >= 10    || "Write a message of at least 10 characters."
  };

  form.addEventListener("submit", e => {
    e.preventDefault();
    let ok = true, first = null;
    for (const k in rules) {
      const el = form.elements[k];
      const r  = rules[k](el.value);
      const er = document.getElementById("e-" + k);
      el.setAttribute("aria-invalid", r !== true);
      er.textContent = r === true ? "" : r;
      if (r !== true) { ok = false; first = first || el; }
    }
    out.className = ""; out.innerHTML = "";
    if (!ok) {
      out.className = "msg bad";
      out.setAttribute("role","alert");
      out.textContent = "Some fields need attention. Please fix the highlighted fields and try again.";
      first.focus(); return;
    }
    const d = Object.fromEntries(new FormData(form));
    if (CONFIG.groupEmail) {
      const href = `mailto:${CONFIG.groupEmail}?subject=${encodeURIComponent(d.subject)}&body=${encodeURIComponent(d.message+"\n\n— "+d.name+" ("+d.email+")")}`;
      out.className = "msg ok";
      out.innerHTML = `Your message is ready, but has <strong>not been sent yet</strong>. <a href="${href}">Open in your email app</a> to send it.`;
    } else {
      out.className = "msg ok";
      out.innerHTML = "Your details passed validation, but <strong>nothing was sent</strong>. This is a frontend prototype — no email service is connected.";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  buildChrome();
  initNav();
  initUtilities();
  initLibrary();
  initContactForm();
});
