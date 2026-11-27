/* ------------------------------------------------------------------
   Projects shown in the "Projects" section.

   To add a project, add one object to PROJECTS. Fields:
     title        project name
     year         optional, e.g. '2026'
     featured     true → large card in the top row (keep this to 2)
     badge        optional highlight shown on the cover
     description  one or two sentences
     tags         technologies used
     cover        optional screenshot path (16:10, e.g. 640×400 .webp);
                  without one, a generated cover with `icon` is shown
     icon         'document' | 'phone' | 'play' | 'code'
     live, code   URLs, or null to hide that button
     note         optional text shown when there are no links
   ------------------------------------------------------------------ */
const PROJECTS = [
  {
    title: 'Sigil: AI-powered PDF editor',
    year: '2026',
    featured: true,
    badge: '2nd prize · AI Hackathon',
    description:
      'Edit and query PDFs in plain language. A RAG pipeline extracts and retrieves the right context from each document, so Gemini AI gives document-specific answers inside an interactive React workspace.',
    tags: ['Python', 'React', 'Gemini AI', 'RAG', 'LangChain', 'PyMuPDF', 'FAISS', 'PostgreSQL'],
    icon: 'document',
    live: null,
    code: null,
  },
  {
    title: 'Attendance management app',
    year: '2025',
    featured: true,
    description:
      'A Flutter mobile app that replaces paper attendance registers. SQLite local storage keeps marking attendance working offline, with persistent records and quick lookups.',
    tags: ['Flutter', 'Dart', 'SQLite'],
    icon: 'phone',
    live: null,
    code: null,
  },
  {
    title: 'Microsoft homepage clone',
    year: '2024',
    description:
      'A responsive Microsoft homepage clone built with HTML and Tailwind CSS, with a modern utility-first layout tuned for every screen size.',
    tags: ['HTML', 'Tailwind CSS'],
    cover: 'assets/projects/microsoft-clone.webp',
    live: 'https://responsive42.netlify.app/',
    code: null, // the GitHub repository is private
  },
  {
    title: 'Memory game',
    year: '2024',
    description:
      'An interactive card-matching game with flip animations, match logic and scoring, written in plain HTML, CSS and JavaScript.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    cover: 'assets/projects/memory-game.webp',
    live: 'https://memorygame42.netlify.app/',
    code: 'https://github.com/Tarun841/Memory-Game',
  },
  {
    title: 'Netflix homepage clone',
    description:
      'A static Netflix homepage clone in HTML and CSS, focused on layout, styling and page structure for desktop screens.',
    tags: ['HTML', 'CSS'],
    icon: 'play',
    // The old link (tarun841.github.io/netflix/) returns 404. Put the new URL here once it's redeployed.
    live: null,
    code: null,
    note: 'Live demo coming soon',
  },
];

(() => {
  const ICONS = {
    document: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h4"/>',
    phone: '<rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="m9.5 11.5 2 2 3.5-3.5"/><path d="M11 18h2"/>',
    play: '<rect x="2" y="5" width="20" height="14" rx="2.5"/><path d="m10 9 5 3-5 3V9Z"/>',
    code: '<path d="m8 6-6 6 6 6"/><path d="m16 6 6 6-6 6"/>',
  };
  const svg = (paths, cls) =>
    `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
  const ARROW = '<path d="M7 17 17 7"/><path d="M8 7h9v9"/>';

  function cover(p, featured) {
    const media = p.cover
      ? `<img src="${p.cover}" alt="Screenshot of ${p.title}" width="640" height="400" loading="lazy" decoding="async"
           class="size-full object-cover object-top transition duration-500 group-hover:scale-105">`
      : `<div class="cover-art">
           <span class="flex items-center justify-center rounded-2xl border border-amber-200/25 bg-ink/50 text-amber-200 shadow-[0_0_60px_-10px_rgba(253,230,138,0.35)] transition duration-500 group-hover:scale-105 ${featured ? 'size-24' : 'size-20'}">
             ${svg(ICONS[p.icon] || ICONS.code, featured ? 'size-11' : 'size-9')}
           </span>
         </div>`;
    const badge = p.badge
      ? `<span class="absolute top-4 left-4 rounded-full bg-amber-200 px-3 pt-1.5 pb-1 text-xs leading-none font-semibold text-olive-950 shadow-lg">${p.badge}</span>`
      : '';
    const ratio = featured ? 'aspect-[2/1]' : 'aspect-[16/10]';
    return `<div class="relative ${ratio} overflow-hidden border-b border-white/10 bg-ink">${media}${badge}</div>`;
  }

  function links(p) {
    const out = [];
    if (p.live)
      out.push(`<a class="btn btn-primary btn-sm" href="${p.live}" target="_blank" rel="noopener noreferrer">
        Live demo<span class="sr-only">: ${p.title}</span>${svg(ARROW, 'size-4')}</a>`);
    if (p.code)
      out.push(`<a class="btn btn-outline btn-sm" href="${p.code}" target="_blank" rel="noopener noreferrer">
        Code<span class="sr-only">: ${p.title}</span>${svg(ICONS.code, 'size-4')}</a>`);
    if (!out.length && p.note) out.push(`<span class="text-sm text-white/50 italic">${p.note}</span>`);
    return out.length ? `<div class="mt-auto flex flex-wrap items-center gap-3 pt-2">${out.join('')}</div>` : '';
  }

  function card(p) {
    const f = !!p.featured;
    const size = f ? '' : 'w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]';
    return `
      <li class="card card-hover reveal group flex flex-col overflow-hidden ${size}">
        ${cover(p, f)}
        <div class="flex flex-1 flex-col gap-4 ${f ? 'p-6 sm:p-8' : 'p-6'}">
          <div class="flex items-baseline justify-between gap-4">
            <h3 class="font-display text-white ${f ? 'text-2xl sm:text-3xl' : 'text-2xl'}">${p.title}</h3>
            ${p.year ? `<span class="shrink-0 text-sm text-white/50">${p.year}</span>` : ''}
          </div>
          <p class="leading-relaxed text-white/70">${p.description}</p>
          <ul class="flex flex-wrap gap-2" aria-label="Technologies">
            ${p.tags.map((t) => `<li class="chip px-2.5 text-xs">${t}</li>`).join('')}
          </ul>
          ${links(p)}
        </div>
      </li>`;
  }

  const featured = document.getElementById('featured-projects');
  const more = document.getElementById('more-projects');
  if (featured) featured.innerHTML = PROJECTS.filter((p) => p.featured).map(card).join('');
  if (more) more.innerHTML = PROJECTS.filter((p) => !p.featured).map(card).join('');
})();
