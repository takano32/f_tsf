// サイト全体のクライアント挙動。既存サイトの inline script と同等。

/** 発売日を境に「新作予告」を「最新作」へ自動昇格する */
function applyPostRelease() {
  const switchAt = Date.parse('2026-05-28T15:00:00Z');
  if (Date.now() < switchAt) return;

  // 予告ページは発売後に本ページへ転送
  if (document.body.classList.contains('announce-page')) {
    location.replace('index.html#latest');
    return;
  }

  document.body.classList.add('post-release');
  document.querySelector('.nav-links a[href="announce.html"]')?.remove();

  const latest = document.querySelector('#latest .work-grid');
  const announce = document.querySelector('#announce');
  const past = document.querySelector('#past .work-grid');
  const old = document.querySelector<HTMLElement>('#latest .featured-work-card')?.cloneNode(true) as HTMLElement | undefined;
  const nw = document.querySelector<HTMLElement>('#announce .featured-work-card')?.cloneNode(true) as HTMLElement | undefined;

  if (latest && past && old && nw) {
    const rel = nw.querySelector<HTMLElement>('.release-date');
    const en = document.documentElement.lang === 'en';
    if (rel) {
      rel.dataset.ja = '発売日：FANZA 2026年5月29日 / DLsite 2026年5月30日';
      rel.dataset.en = 'Released: FANZA May 29, 2026 / DLsite May 30, 2026';
      rel.textContent = en ? rel.dataset.en : rel.dataset.ja;
    }
    const dl = nw.querySelector<HTMLAnchorElement>('.shop-link.dlsite');
    if (dl) {
      dl.href = 'https://dlaf.jp/maniax/dlaf/=/t/m/link/work/aid/ftsf2/id/RJ01634826.html';
      dl.rel = 'noopener sponsored';
    }
    latest.innerHTML = '';
    latest.appendChild(nw);
    past.insertBefore(old, past.firstChild);
  }
  announce?.remove();
}

/** サンプル画像ビューア */
function setupSampleViewer() {
  const sets: Record<string, { t: { ja: string; en: string }; f: string }> = {
    d_771085: { t: { ja: '女体化した俺の僕の幸せ雌堕ち生活 サンプル', en: 'My Happy Feminized Life Sample' }, f: 'samples/d_771085/' },
    d_755080: { t: { ja: '俺がお前の嫁でお前が俺の嫁で サンプル', en: 'Custom Doll Engage Sample' }, f: 'samples/d_755080/' },
    d_737824: { t: { ja: '人生改変アプリで薔薇色の日々！ サンプル', en: 'Life Rewrite App Sample' }, f: 'samples/d_737824/' },
  };
  const ov = document.getElementById('sampleOverlay');
  const ti = document.getElementById('sampleTitle');
  const im = document.getElementById('sampleCurrentImage') as HTMLImageElement | null;
  const co = document.getElementById('sampleCounter');
  const pg = document.getElementById('sampleCurrentPage');
  if (!ov || !ti || !im || !co || !pg) return;

  let imgs: string[] = [];
  let idx = 0;
  let lang = 'ja';

  const ex = (s: string) =>
    new Promise<boolean>((r) => {
      const i = new Image();
      i.onload = () => r(true);
      i.onerror = () => r(false);
      i.src = s;
    });

  async function find(s: { f: string }) {
    const a: string[] = [];
    for (let i = 1; i <= 80; i++) {
      const p = s.f + String(i).padStart(2, '0') + '.jpg';
      if (!(await ex(p))) break;
      a.push(p);
    }
    return a;
  }

  function show() {
    if (!imgs.length) return;
    pg!.className = 'sample-page-current';
    im!.src = imgs[idx];
    co!.textContent = idx + 1 + ' / ' + imgs.length;
  }

  async function open(k: string) {
    const s = sets[k];
    if (!s) return;
    lang = (navigator.languages || [navigator.language || 'ja']).some((x) => String(x).toLowerCase().startsWith('ja')) ? 'ja' : 'en';
    ti!.textContent = s.t[lang as 'ja' | 'en'];
    ov!.classList.add('is-open');
    document.body.classList.add('sample-open');
    pg!.className = 'sample-page-current is-loading';
    im!.removeAttribute('src');
    co!.textContent = lang === 'ja' ? 'サンプル画像を読み込み中…' : 'Loading sample pages…';
    imgs = await find(s);
    idx = 0;
    if (!imgs.length) {
      pg!.className = 'sample-page-current is-empty';
      co!.textContent = lang === 'ja' ? 'サンプル画像が見つかりません。' : 'No sample pages found.';
      return;
    }
    show();
  }

  function next() {
    if (imgs.length) {
      idx = (idx + 1) % imgs.length;
      show();
    }
  }
  function prev() {
    if (imgs.length) {
      idx = (idx - 1 + imgs.length) % imgs.length;
      show();
    }
  }
  function close() {
    ov!.classList.remove('is-open');
    document.body.classList.remove('sample-open');
  }

  document.querySelectorAll<HTMLElement>('[data-sample-target]').forEach((b) => b.addEventListener('click', () => open(b.dataset.sampleTarget!)));
  document.querySelectorAll('[data-sample-close]').forEach((b) => b.addEventListener('click', close));
  document.querySelectorAll('[data-sample-next]').forEach((b) => b.addEventListener('click', next));
  document.querySelectorAll('[data-sample-prev]').forEach((b) => b.addEventListener('click', prev));
  document.addEventListener('keydown', (e) => {
    if (!ov!.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });
}

/** ブラウザ言語に応じて data-ja / data-en を反映 */
function applyLanguage() {
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language || 'ja'];
  const ja = langs.some((l) => String(l).toLowerCase().startsWith('ja'));
  const key = ja ? 'ja' : 'en';
  document.documentElement.lang = ja ? 'ja' : 'en';
  document.querySelectorAll<HTMLElement>('[data-ja][data-en]').forEach((el) => (el.textContent = el.dataset[key]!));
}

/** ページ指定セクションへスクロール＆フォーカス */
function focusSection() {
  const id = document.body.dataset.focusSection || 'latest';
  setTimeout(() => {
    const s = document.getElementById(id);
    if (!s) return;
    s.classList.add('section-focus');
    s.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const c = s.querySelector<HTMLElement>('.featured-work-card');
    if (c) {
      c.tabIndex = -1;
      setTimeout(() => c.focus({ preventScroll: true }), 450);
    }
  }, 80);
}

/** 年齢確認ゲート */
function setupAgeGate() {
  const k = 'tsf_age_confirmed_v1';
  const g = document.getElementById('ageGate');
  const y = document.getElementById('ageGateYes');
  const n = document.getElementById('ageGateNo');
  if (!g) return;
  if (localStorage.getItem(k) !== 'yes') {
    g.classList.add('is-open');
    document.body.classList.add('age-gate-open');
  }
  y?.addEventListener('click', () => {
    localStorage.setItem(k, 'yes');
    g.classList.remove('is-open');
    document.body.classList.remove('age-gate-open');
  });
  n?.addEventListener('click', () => {
    document.body.innerHTML = '';
    history.length > 1 ? history.back() : (location.href = 'about:blank');
  });
}

// 既存サイトと同じ実行順序
applyPostRelease();
setupSampleViewer();
applyLanguage();
focusSection();
setupAgeGate();
