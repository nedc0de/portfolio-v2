/*=============== FIREBASE SETUP & GLOBAL DATA ===============*/
const firebaseConfig = {
  apiKey: 'AIzaSyC7t_zDeZfqb9pE_8L5BOfpZOX3_PdbSYg',
  authDomain: 'nedcode-7b25f.firebaseapp.com',
  projectId: 'nedcode-7b25f',
  storageBucket: 'nedcode-7b25f.firebasestorage.app',
  messagingSenderId: '683098380380',
  appId: '1:683098380380:web:895ae95a6e75133dabee99',
};

// Fallback & initial manual data (these serve as your manual entry points)
let unfilteredData = [
  {
    id: 1,
    caption: 'uConsole - polybar gedit',
    // date: 'Sept 22, 2026',
    // views: 0,
    mediaItems: [
      {
        type: 'threads',
        url: 'https://www.threads.com/@nedcodev/post/DdlYrANlRqK',
      },
    ],
  },
  {
    id: 3,
    caption: 'ClockworkPi uConsole teardown & assembly',
    // date: 'Sept 22, 2026',
    // views: 0,
    mediaItems: [
      {
        type: 'threads',
        url: 'https://www.threads.com/@nedcodev/post/Ddmb_RLEwnd',
      },
    ],
  },
];

/*=============== NUMBER FORMATTER HELPER ===============*/
function formatNumber(num) {
  return num.toLocaleString();
}

/*=============== THREADS EMBED HELPERS ===============*/
// Pulls the post/share id out of a Threads URL, e.g.
// https://www.threads.com/@nedcodev/post/DdlYrANlRqK  -> DdlYrANlRqK
// https://www.threads.com/share/D_kobwCg2/            -> D_kobwCg2
function extractThreadsId(url) {
  const cleanUrl = url.split('?')[0].replace(/\/+$/, '');
  const segments = cleanUrl.split('/');
  return segments[segments.length - 1] || 'unknown';
}

// Builds the same blockquote markup Threads' own "Get embed code" button
// generates, using only the post URL. Threads' embed.js scans the page for
// this exact structure and replaces it with the fully rendered post.
function buildThreadsEmbedHTML(url) {
  const postId = extractThreadsId(url);
  return `
    <blockquote class="text-post-media" data-text-post-permalink="${url}" data-text-post-version="0" id="ig-tp-${postId}" style=" background:#FFF; border: none; border-radius: 0; max-width:100%; margin: 0; min-width:270px; padding:0; width:100%;">
      <a href="${url}" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%; font-family: -apple-system, BlinkMacSystemFont, sans-serif;" target="_blank">
        <div style=" padding: 40px; display: flex; flex-direction: column; align-items: center;">
          <div style=" display:block; height:32px; width:32px; padding-bottom:20px;">
            <svg aria-label="Threads" height="32px" role="img" viewBox="0 0 192 192" width="32px" xmlns="http://www.w3.org/2000/svg"><path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z" /></svg>
          </div>
          <div style=" font-size: 15px; line-height: 21px; color: #000000; font-weight: 600; "> View on Threads</div>
        </div>
      </a>
    </blockquote>
  `;
}

// Threads' embed.js only scans the page once, on its own load. Since our
// feed items are added afterward by JavaScript, we force a fresh scan by
// swapping in a brand-new copy of the script whenever a Threads embed is
// rendered into the page.
function reloadThreadsEmbedScript() {
  const oldScript = document.querySelector(
    'script[src*="threads.com/embed.js"]',
  );
  if (oldScript) oldScript.remove();
  const newScript = document.createElement('script');
  newScript.async = true;
  newScript.src = 'https://www.threads.com/embed.js';
  document.body.appendChild(newScript);
}

/*=============== TWITTER / X EMBED HELPERS ===============*/
// Builds the same blockquote markup X's own "Embed Post" option generates,
// using only the tweet URL. X's widgets.js scans the page for this exact
// structure and replaces it with the fully rendered tweet.
function buildTwitterEmbedHTML(url) {
  return `
    <blockquote class="twitter-tweet" data-theme="dark">
      <a href="${url}"></a>
    </blockquote>
  `;
}

// Unlike Threads, X's widgets.js exposes an official reprocess function, so
// we just call it after new tweets are added to the page instead of having
// to reload the whole script.
function reloadTwitterEmbeds() {
  if (window.twttr && window.twttr.widgets) {
    window.twttr.widgets.load();
  }
}

/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
  navToggle = document.getElementById('nav-toggle'),
  navClose = document.getElementById('nav-close');

if (navToggle) {
  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.toggle('show-menu');
    if (navMenu.classList.contains('show-menu')) {
      if (
        navToggle.querySelector('.ham1') &&
        !navToggle.querySelector('.ham1').classList.contains('active')
      ) {
        navToggle.querySelector('.ham1').classList.add('active');
      }
    } else {
      if (
        navToggle.querySelector('.ham1') &&
        navToggle.querySelector('.ham1').classList.contains('active')
      ) {
        navToggle.querySelector('.ham1').classList.remove('active');
      }
    }
  });
}

if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
    if (
      navToggle.querySelector('.ham1') &&
      navToggle.querySelector('.ham1').classList.contains('active')
    ) {
      navToggle.querySelector('.ham1').classList.remove('active');
    }
  });
}

const navLink = document.querySelectorAll('.nav-link');

function linkAction() {
  navLink.forEach((n) => n.classList.remove('active'));
  this.classList.add('active');
  const navMenu = document.getElementById('nav-menu');
  navMenu.classList.remove('show-menu');
  if (
    navToggle.querySelector('.ham1') &&
    navToggle.querySelector('.ham1').classList.contains('active')
  ) {
    navToggle.querySelector('.ham1').classList.remove('active');
  }
}

navLink.forEach((n) => n.addEventListener('click', linkAction));

/*===== FOOTER YEAR =====*/
// Keeps the copyright year current; the year written in the HTML is the fallback.
document.querySelectorAll('.footer-year').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

/*===== PHONE MENU EXTRAS =====*/
// Adds the top bar (label + close) and the quick-contact footer to the phone
// menu, so every page gets them without repeating the markup.
(() => {
  if (!navMenu) return;

  navMenu.insertAdjacentHTML('afterbegin', `
    <div class="menu-top">
      <span class="menu-label">Menu</span>
      <button type="button" class="menu-close" aria-label="Close menu">
        <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>
      </button>
    </div>`);
  navMenu.insertAdjacentHTML('beforeend', `
    <div class="menu-foot">
      <a class="menu-cta" href="/contact.html">Let's talk</a>
      <a class="menu-dm" href="https://www.threads.com/@nedcodev/" target="_blank" rel="noopener">
        @nedcodev on Threads
      </a>
    </div>`);

  const closeMenu = () => {
    navMenu.classList.remove('show-menu');
    navToggle?.querySelector('.ham1')?.classList.remove('active');
  };

  // A short note on the right of each item, and the newest post above
  // "Let's talk". The counts are read from the pages themselves the first
  // time the menu opens, so they stay right without being typed anywhere.
  // pages by name: "about.html", "/about" and "./about" are all "about"
  // (Netlify serves the pages without ".html"), and "/" is "index"
  const pageName = (href) => (href || '').split('/').pop().replace(/\.html$/, '') || 'index';
  const NOTES = { index: 'start here', about: "who's Ned", contact: 'say hi' };
  navMenu.querySelectorAll('.nav-link').forEach((a) => {
    const page = pageName(a.getAttribute('href'));
    const note = document.createElement('span');
    note.className = 'menu-note';
    note.dataset.page = page;
    note.textContent = NOTES[page] || '';
    a.append(note);
  });
  const setNote = (page, text) => {
    const el = navMenu.querySelector(`.menu-note[data-page="${page}"]`);
    if (el && text) el.textContent = text;
  };
  const latest = document.createElement('a');
  latest.className = 'menu-latest';
  latest.hidden = true;
  navMenu.querySelector('.menu-foot').prepend(latest);

  // Read fresh every time the menu opens (never a cached copy), so the card
  // and the counts always show the newest post.
  const blogUrl = new URL('/blog.html', location.origin);
  const fill = async () => {
    const get = (url) => fetch(url, { cache: 'no-store' }).then((r) => (r.ok ? r.text() : '')).catch(() => '');
    const parse = (html) => new DOMParser().parseFromString(html, 'text/html');
    const [blog, favs, projects, lab] = await Promise.all([get(blogUrl), get('/favorites.js'), get('/projects.html'), get('/lab.html')]);
    if (blog) {
      const doc = parse(blog);
      const posts = doc.querySelectorAll('a.bl-feature, a.bl-row');
      setNote('blog', `${posts.length} posts`);
      // newest post first; if you're already reading it, show the one before
      const same = (a) => new URL(a.getAttribute('href'), blogUrl).pathname.replace(/\.html$/, '') === location.pathname.replace(/\.html$/, '');
      const top = [...posts].find((a) => !same(a));
      if (top) {
        // links in blog.html are relative to it: turn them into full addresses
        const link = new URL(top.getAttribute('href'), blogUrl).href;
        const img = top.querySelector('img')?.getAttribute('src');
        latest.href = link;
        latest.innerHTML = `${img ? `<img src="${new URL(img, blogUrl).href}" alt="" width="940" height="788">` : ''}<span><small>New on the blog</small><b></b></span>`;
        latest.querySelector('b').textContent = top.querySelector('h2, h3')?.textContent.trim() || '';
        latest.hidden = false;
      }
    }
    if (favs) setNote('favorites', `${(favs.match(/type: '(book|movie|tv)',/g) || []).length} picks`);
    if (projects) setNote('projects', `${parse(projects).querySelectorAll('.hc-row').length} builds`);
    if (lab) setNote('lab', `${parse(lab).querySelectorAll('.lab-item-title').length} experiments`);
  };
  navToggle?.addEventListener('click', () => { if (navMenu.classList.contains('show-menu')) fill(); });
  // open the post on tap, even if a browser is slow to treat the card as a link
  latest.addEventListener('click', (e) => {
    if (!latest.href || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    closeMenu();
    location.assign(latest.href);
  });
  navMenu.querySelector('.menu-close').addEventListener('click', closeMenu);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('show-menu')) closeMenu();
  });
})();

if (navMenu) {
  navMenu.addEventListener('click', (e) => {
    e.stopPropagation();
  });
}

document.addEventListener('click', () => {
  if (navMenu && navMenu.classList.contains('show-menu')) {
    navMenu.classList.remove('show-menu');
    if (
      navToggle.querySelector('.ham1') &&
      navToggle.querySelector('.ham1').classList.contains('active')
    ) {
      navToggle.querySelector('.ham1').classList.remove('active');
    }
  }
});

/*===== CONTACT-TEXTAREA =====*/
let textArea = document.getElementById('textbox');
let characterCounter = document.getElementById('char_count');
const maxNumOfChars = 250;

const countCharacters = () => {
  if (!textArea) return;
  let numOfEnteredChars = textArea.value.length;
  let counter = maxNumOfChars - numOfEnteredChars;

  // the thin bar under the message fills up as you type
  textArea.parentElement.style.setProperty('--used', `${Math.min(100, (numOfEnteredChars / maxNumOfChars) * 100)}%`);

  if (characterCounter) {
    characterCounter.textContent = counter + '/250';
    if (counter < 0) {
      characterCounter.style.color = 'var(--ninth-color)';
    } else if (counter < 50) {
      characterCounter.style.color = 'var(--fifteenth-color)';
    } else {
      characterCounter.style.color = 'var(--second-color)';
    }
  }
};

// The message hint follows the topic picked above it
const TOPIC_HINTS = {
  Project: 'What are you building? Links, timeline, anything that helps.',
  Collab: 'What do you have in mind? Tell me about you and the idea.',
  'Say hi': 'Hey Ned! ...',
};
document.querySelectorAll('.ct-topics input[name="topic"]').forEach((radio) => {
  radio.addEventListener('change', () => {
    if (textArea && radio.checked && TOPIC_HINTS[radio.value]) textArea.placeholder = TOPIC_HINTS[radio.value];
  });
});

if (textArea) {
  textArea.addEventListener('input', countCharacters);
  textArea.setAttribute('maxlength', maxNumOfChars);
  countCharacters();
}

/*===== BACK TO TOP: a link at the end of the footer =====*/
// (replaces the old floating yellow button, which sat on top of the footer)
document.querySelectorAll('.footer').forEach((footer) => {
  const top = document.createElement('a');
  top.className = 'footer-top';
  top.href = '#';
  top.innerHTML = '<span aria-hidden="true">↑</span> Back to top';
  top.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  footer.append(top);
});

/*=============== FIREBASE LOADER (shared by every page) ===============*/
const FIREBASE_APP_SRC =
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js';
const FIREBASE_FIRESTORE_SRC =
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore-compat.js';
let firebaseReadyPromise = null;

function loadScriptOnce(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load ' + src));
    document.head.appendChild(script);
  });
}

// Loads the Firebase SDK if the page doesn't already include it, initializes
// the app exactly once, and resolves with the Firestore instance (or null if
// Firebase can't be reached). Safe to call from anywhere, any number of times.
function ensureFirebase() {
  if (firebaseReadyPromise) return firebaseReadyPromise;
  firebaseReadyPromise = (async () => {
    try {
      if (typeof firebase === 'undefined')
        await loadScriptOnce(FIREBASE_APP_SRC);
      if (!firebase.firestore) await loadScriptOnce(FIREBASE_FIRESTORE_SRC);
      if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
      return firebase.firestore();
    } catch (err) {
      console.error('Firebase unavailable:', err);
      return null;
    }
  })();
  return firebaseReadyPromise;
}

/*=============== FIREBASE CLOUD SYNC LOGIC ===============*/
let db = null;

async function initFirebaseAndData() {
  if (!document.getElementById('unfilteredFeedList')) return;

  try {
    db = await ensureFirebase();

    if (db) {
      const docRef = db.collection('stats').doc('post_views');
      const docSnap = await docRef.get();

      if (docSnap.exists) {
        const cloudData = docSnap.data();
        unfilteredData.forEach((post) => {
          const baseViews = post.views;

          let cloudViewsDelta = 0;

          if (cloudData[post.id] !== undefined) {
            if (typeof cloudData[post.id] === 'number') {
              cloudViewsDelta = cloudData[post.id];
            } else if (cloudData[post.id].views !== undefined) {
              cloudViewsDelta = cloudData[post.id].views;
            }
          }

          post.views = baseViews + cloudViewsDelta;
        });
      } else {
        const initialData = {};
        unfilteredData.forEach((p) => {
          initialData[p.id] = 0;
        });
        await docRef.set(initialData, { merge: true });
      }
    }
  } catch (err) {
    console.error(
      'Error connecting to Firebase, using manual script data:',
      err,
    );
  }

  renderUnfilteredFeed();
}

async function incrementPostView(postId) {
  const sessionKey = `firebase_viewed_${postId}`;
  if (sessionStorage.getItem(sessionKey)) return;
  sessionStorage.setItem(sessionKey, 'true');

  const post = unfilteredData.find((p) => p.id === postId);
  if (!post) return;

  post.views += 1;

  const viewsEl = document.getElementById(`uf-views-${postId}`);
  if (viewsEl) viewsEl.textContent = formatNumber(post.views);

  if (db) {
    try {
      const docRef = db.collection('stats').doc('post_views');
      await docRef.set(
        {
          [postId]: firebase.firestore.FieldValue.increment(1),
        },
        { merge: true },
      );
    } catch (err) {
      console.error('Failed to update cloud view count:', err);
    }
  }
}

const unfilteredIndices = {};
const unfilteredCooldowns = {};
let unfilteredCurrentPage = 1;
const unfilteredPostsPerPage = 5;

function updateUnfilteredSlideView(id, newIndex, totalSlides) {
  const now = Date.now();
  if (unfilteredCooldowns[id] && now - unfilteredCooldowns[id] < 350) return;
  unfilteredCooldowns[id] = now;

  unfilteredIndices[id] = newIndex;
  const container = document.getElementById(`uf-container-${id}`);
  if (!container) return;

  const slides = container.querySelectorAll('.unfiltered-slide');
  slides.forEach((slide, idx) => {
    slide.style.display = idx === newIndex ? 'flex' : 'none';
  });

  const dotsContainer = document.getElementById(`uf-dots-${id}`);
  if (dotsContainer) {
    const dots = dotsContainer.querySelectorAll('.unfiltered-dot');
    dots.forEach((dot, idx) => {
      dot.style.background =
        idx === newIndex ? '#fff' : 'rgba(255,255,255,0.4)';
    });
  }

  const buttons = container.querySelectorAll('button');
  if (buttons.length >= 2) {
    const prevBtn = buttons[0];
    const nextBtn = buttons[1];
    const isFirst = newIndex === 0;
    const isLast = newIndex === totalSlides - 1;

    prevBtn.style.opacity = isFirst ? '0.3' : '0.8';
    prevBtn.style.pointerEvents = isFirst ? 'none' : 'auto';
    nextBtn.style.opacity = isLast ? '0.3' : '0.8';
    nextBtn.style.pointerEvents = isLast ? 'none' : 'auto';
  }
}

function changeUnfilteredSlide(id, direction, totalSlides, event) {
  if (event) event.stopPropagation();
  const currentIndex = unfilteredIndices[id] || 0;
  const newIndex = currentIndex + direction;
  if (newIndex >= 0 && newIndex < totalSlides) {
    updateUnfilteredSlideView(id, newIndex, totalSlides);
  }
}

function goToUnfilteredSlide(id, index, totalSlides) {
  updateUnfilteredSlideView(id, index, totalSlides);
}

function renderUnfilteredFeed() {
  const feedContainer = document.getElementById('unfilteredFeedList');
  if (!feedContainer) return;

  feedContainer.innerHTML = '';

  const totalPosts = unfilteredData.length;
  const totalPages = Math.ceil(totalPosts / unfilteredPostsPerPage) || 1;

  if (unfilteredCurrentPage > totalPages) unfilteredCurrentPage = totalPages;
  if (unfilteredCurrentPage < 1) unfilteredCurrentPage = 1;

  const startIndex = (unfilteredCurrentPage - 1) * unfilteredPostsPerPage;
  const endIndex = startIndex + unfilteredPostsPerPage;
  const paginatedItems = unfilteredData.slice(startIndex, endIndex);

  let sawThreadsEmbed = false;
  let sawTwitterEmbed = false;

  paginatedItems.forEach((item) => {
    incrementPostView(item.id);

    if (unfilteredIndices[item.id] === undefined)
      unfilteredIndices[item.id] = 0;
    const currIdx = unfilteredIndices[item.id];
    const hasMultiple = item.mediaItems.length > 1;
    const isThreadsPost =
      item.mediaItems[0] && item.mediaItems[0].type === 'threads';
    const isTwitterPost =
      item.mediaItems[0] && item.mediaItems[0].type === 'twitter';

    const itemEl = document.createElement('div');
    itemEl.className = 'unfiltered-feed-item';
    itemEl.style.cssText =
      'width: 100%; max-width: 460px; margin: 0 auto 24px auto; background: rgba(255, 255, 255, 0.03); border-radius: 12px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.08);';

    if (isThreadsPost) {
      itemEl.innerHTML = `
            <div class="unfiltered-header-row" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; font-size: 0.9rem; color: var(--text-color, #ccc);">
                <div class="unfiltered-stat-item" style="display: flex; align-items: center; gap: 6px;">
                    <i class="fa-regular fa-eye"></i>
                    <span id="uf-views-${item.id}">${formatNumber(item.views)}</span>
                </div>
                <div class="unfiltered-header-right" style="display: flex; align-items: center; gap: 6px; opacity: 0.85;">
                    <span class="unfiltered-date">${item.date}</span>
                </div>
            </div>
     <div class="unfiltered-threads-container" style="width: 100%; overflow: hidden; padding: 16px; background: transparent; display: flex; justify-content: center;">
    <div style="width: 100%; max-width: 500px; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.08);">
        ${buildThreadsEmbedHTML(item.mediaItems[0].url)}
    </div>
</div>
            <div class="unfiltered-post-content" style="padding: 16px;">
               <div class="unfiltered-footer-row" style="display: flex; align-items: center; gap: 16px; margin-bottom: 0;">
    <p class="unfiltered-caption" style="margin: 0; line-height: 1.5; flex: 1;">${item.caption}</p>

    <button class="unfiltered-share-btn" onclick="shareUnfilteredPost(${item.id})" style="background: none; border: none; cursor: pointer; display: flex; align-items: center; padding: 0; color: inherit; opacity: 0.8; font-size: 1.1rem; margin-left: auto; flex-shrink: 0;">
    <i class="fa-solid fa-share"></i>
</button>
</div>
        `;

      feedContainer.appendChild(itemEl);
      sawThreadsEmbed = true;
      return;
    }

    if (isTwitterPost) {
      itemEl.innerHTML = `
            <div class="unfiltered-header-row" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; font-size: 0.9rem; color: var(--text-color, #ccc);">
                <div class="unfiltered-stat-item" style="display: flex; align-items: center; gap: 6px;">
                    <i class="fa-regular fa-eye"></i>
                    <span id="uf-views-${item.id}">${formatNumber(item.views)}</span>
                </div>
                <div class="unfiltered-header-right" style="display: flex; align-items: center; gap: 6px; opacity: 0.85;">
                    <span class="unfiltered-date">${item.date}</span>
                </div>
            </div>
          <div class="unfiltered-twitter-container" style="width: 100%; overflow: hidden; padding: 16px; background: transparent; display: flex; justify-content: center;">
    <div style="width: 100%; max-width: 500px;">
        ${buildTwitterEmbedHTML(item.mediaItems[0].url)}
    </div>
</div>
</div>
            <div class="unfiltered-post-content" style="padding: 16px;">
               <div class="unfiltered-footer-row" style="display: flex; align-items: center; gap: 16px; margin-bottom: 0;">
    <p class="unfiltered-caption" style="margin: 0; line-height: 1.5; flex: 1;">${item.caption}</p>

    <button class="unfiltered-share-btn" onclick="shareUnfilteredPost(${item.id})" style="background: none; border: none; cursor: pointer; display: flex; align-items: center; padding: 0; color: inherit; opacity: 0.8; font-size: 1.1rem; margin-left: auto; flex-shrink: 0;">
    <i class="fa-solid fa-share"></i>
</button>
</div>
        `;

      feedContainer.appendChild(itemEl);
      sawTwitterEmbed = true;
      return;
    }

    let slidesHTML = item.mediaItems
      .map(
        (media, idx) => `
            <div class="unfiltered-slide" data-id="${
              item.id
            }" data-slide="${idx}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: ${
              idx === currIdx ? 'flex' : 'none'
            }; align-items: center; justify-content: center; overflow: hidden; background: #000;">
                <div style="position: absolute; inset: 0; background-image: url('${
                  media.url
                }'); background-size: cover; background-position: center; filter: blur(20px) brightness(0.6); transform: scale(1.1); pointer-events: none;"></div>
                <img src="${
                  media.url
                }" alt="Post content" loading="lazy" style="position: relative; width: 100%; height: 100%; object-fit: cover; z-index: 2; pointer-events: none;">
            </div>
        `,
      )
      .join('');

    let arrowsHTML = hasMultiple
      ? `
            <button onclick="changeUnfilteredSlide(${item.id}, -1, ${
              item.mediaItems.length
            }, event)" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.5); color: #fff; border: none; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 15; opacity: ${
              currIdx === 0 ? '0.3' : '0.8'
            }; pointer-events: ${currIdx === 0 ? 'none' : 'auto'};">
                <i class="fa-solid fa-chevron-left" style="font-size: 0.8rem;"></i>
            </button>
            <button onclick="changeUnfilteredSlide(${item.id}, 1, ${
              item.mediaItems.length
            }, event)" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.5); color: #fff; border: none; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 15; opacity: ${
              currIdx === item.mediaItems.length - 1 ? '0.3' : '0.8'
            }; pointer-events: ${
              currIdx === item.mediaItems.length - 1 ? 'none' : 'auto'
            };">
                <i class="fa-solid fa-chevron-right" style="font-size: 0.8rem;"></i>
            </button>
        `
      : '';

    let dotsHTML = hasMultiple
      ? `
            <div class="unfiltered-dots" id="uf-dots-${
              item.id
            }" style="position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%); display: flex; gap: 6px; z-index: 10; background: rgba(0,0,0,0.4); padding: 6px 10px; border-radius: 20px; backdrop-filter: blur(4px);">
                ${item.mediaItems
                  .map(
                    (_, idx) => `
                    <span class="unfiltered-dot ${
                      idx === currIdx ? 'active' : ''
                    }" onclick="goToUnfilteredSlide(${item.id},${idx}, ${
                      item.mediaItems.length
                    })" style="width: 8px; height: 8px; border-radius: 50\%; background: ${
                      idx === currIdx ? '#fff' : 'rgba(255,255,255,0.4)'
                    }; cursor: pointer; transition: background 0.3s;"></span>
                `,
                  )
                  .join('')}
            </div>
        `
      : '';

    itemEl.innerHTML = `
            <div class="unfiltered-header-row" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; font-size: 0.9rem; color: var(--text-color, #ccc);">
                <div class="unfiltered-stat-item" style="display: flex; align-items: center; gap: 6px;">
                    <i class="fa-regular fa-eye"></i>
                    <span id="uf-views-${item.id}">${formatNumber(item.views)}</span>
                </div>
                <div class="unfiltered-header-right" style="display: flex; align-items: center; gap: 6px; opacity: 0.85;">
                    <span class="unfiltered-date">${item.date}</span>
                </div>
            </div>
            <div class="unfiltered-media-container" id="uf-container-${
              item.id
            }" style="position: relative; width: 100%; aspect-ratio: 4 / 5; overflow: hidden; user-select: none; background: #000;">
                ${slidesHTML}
                ${arrowsHTML}
                ${dotsHTML}
            </div>
            <div class="unfiltered-post-content" style="padding: 16px;">
                <!-- Footer row above the caption, with the share button -->
               <div class="unfiltered-footer-row" style="display: flex; align-items: center; gap: 16px; margin-bottom: 0;">
    <p class="unfiltered-caption" style="margin: 0; line-height: 1.5; flex: 1;">${item.caption}</p>

    <button class="unfiltered-share-btn" onclick="shareUnfilteredPost(${item.id})" style="background: none; border: none; cursor: pointer; display: flex; align-items: center; padding: 0; color: inherit; opacity: 0.8; font-size: 1.1rem; margin-left: auto; flex-shrink: 0;">
    <i class="fa-solid fa-share"></i>
</button>
</div>
        `;

    feedContainer.appendChild(itemEl);
    setupUnfilteredGestures(item.id, item.mediaItems.length);
  });

  if (sawThreadsEmbed) {
    reloadThreadsEmbedScript();
  }

  if (sawTwitterEmbed) {
    reloadTwitterEmbeds();
  }

  if (totalPages > 1) {
    const paginationEl = document.createElement('div');
    paginationEl.className = 'unfiltered-pagination';
    paginationEl.style.cssText =
      'display: flex; justify-content: center; align-items: center; gap: 8px; margin: 30px 0 20px 0;';

    let pagesHTML = '';
    for (let i = 1; i <= totalPages; i++) {
      const isActive = i === unfilteredCurrentPage;
      pagesHTML += `
        <button onclick="changeUnfilteredPage(${i})" style="
          background: ${
            isActive ? 'var(--accent-color, #fff)' : 'rgba(255, 255, 255, 0.05)'
          };
          color: ${isActive ? '#000' : 'var(--text-color, #ccc)'};
          border: 1px solid ${
            isActive ? 'transparent' : 'rgba(255, 255, 255, 0.1)'
          };
          padding: 8px 14px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: ${isActive ? '600' : '400'};
          font-size: 0.9rem;
        ">${i}</button>
      `;
    }
    paginationEl.innerHTML = pagesHTML;
    feedContainer.appendChild(paginationEl);
  }
}

function changeUnfilteredPage(pageNumber) {
  unfilteredCurrentPage = pageNumber;
  renderUnfilteredFeed();
  const feedContainer = document.getElementById('unfilteredFeedList');
  if (feedContainer) {
    feedContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

async function shareUnfilteredPost(postId) {
  const post = unfilteredData.find((p) => p.id === postId);
  if (!post) return;
  const shareUrl = window.location.href.split('#')[0] + '#post-' + postId;
  const shareData = {
    title: 'NEDCODE Unfiltered',
    text: post.caption || 'Check out this post on NEDCODE Unfiltered!',
    url: shareUrl,
  };

  if (navigator.share && /Mobi|Android/i.test(navigator.userAgent)) {
    try {
      await navigator.share(shareData);
      return;
    } catch (err) {
      if (err.name === 'AbortError') return;
    }
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = shareUrl;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Link copied to clipboard!');
  } catch (err) {
    prompt('Copy this link:', shareUrl);
  }
}

function setupUnfilteredGestures(id, totalSlides) {
  const container = document.getElementById(`uf-container-${id}`);
  if (!container) return;

  let startX = 0;
  let isDragging = false;
  let hasSwiped = false;

  container.addEventListener('pointerdown', (e) => {
    startX = e.clientX;
    isDragging = true;
    hasSwiped = false;
  });

  container.addEventListener('pointermove', (e) => {
    if (!isDragging || hasSwiped) return;
    const diffX = e.clientX - startX;
    const currentIdx = unfilteredIndices[id] || 0;

    if (Math.abs(diffX) > 40) {
      hasSwiped = true;
      if (diffX < 0 && currentIdx < totalSlides - 1) {
        updateUnfilteredSlideView(id, currentIdx + 1, totalSlides);
      } else if (diffX > 0 && currentIdx > 0) {
        updateUnfilteredSlideView(id, currentIdx - 1, totalSlides);
      }
    }
  });

  container.addEventListener('pointerup', (e) => {
    if (!isDragging) return;
    isDragging = false;

    if (!hasSwiped) {
      const rect = container.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const currentIdx = unfilteredIndices[id] || 0;

      if (clickX < rect.width / 2 && currentIdx > 0) {
        updateUnfilteredSlideView(id, currentIdx - 1, totalSlides);
      } else if (clickX >= rect.width / 2 && currentIdx < totalSlides - 1) {
        updateUnfilteredSlideView(id, currentIdx + 1, totalSlides);
      }
    }
    hasSwiped = false;
  });

  container.addEventListener('pointerleave', () => {
    isDragging = false;
    hasSwiped = false;
  });

  container.addEventListener(
    'wheel',
    (e) => {
      e.preventDefault();
      const currentIdx = unfilteredIndices[id] || 0;
      const scrollDelta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

      if (Math.abs(scrollDelta) > 15) {
        if (scrollDelta > 0 && currentIdx < totalSlides - 1) {
          updateUnfilteredSlideView(id, currentIdx + 1, totalSlides);
        } else if (scrollDelta < 0 && currentIdx > 0) {
          updateUnfilteredSlideView(id, currentIdx - 1, totalSlides);
        }
      }
    },
    { passive: false },
  );
}

//*=============== SITE STATS: ONLINE NOW + VIEWS ===============*/
// Every page counts the visit and says "I'm here". Only the Lab page shows the
// numbers, in the "Live visitors" experiment (#labStats).
const SITE_VIEWS_BASE = 0; // starting number if you want the counter to begin above 0
const SITE_STATS_REFRESH_MS = 30000; // heartbeat + refresh interval
const SITE_ONLINE_WINDOW_MS = 75000; // seen within this window = online
const SITE_STATS_ZONE = 'America/Toronto'; // days are counted in Montreal time

function getPresenceId() {
  let id = null;
  try {
    id = sessionStorage.getItem('site_presence_id');
  } catch (e) {}
  if (!id) {
    id =
      window.crypto && crypto.randomUUID
        ? crypto.randomUUID()
        : 'v' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    try {
      sessionStorage.setItem('site_presence_id', id);
    } catch (e) {}
  }
  return id;
}

// "2026-10-09" for a day in Montreal, `back` days ago
function montrealDay(back = 0) {
  const today = new Date().toLocaleDateString('en-CA', { timeZone: SITE_STATS_ZONE });
  const [y, m, d] = today.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d - back)).toISOString().slice(0, 10);
}

// Rolls a number from what's shown now to its new value
function countTo(el, value) {
  const fmt = (n) => Math.round(n).toLocaleString('en-US');
  const from = Number(el.dataset.value) || 0;
  el.dataset.value = value;
  if (from === value) {
    el.textContent = fmt(value);
    return;
  }
  const start = performance.now();
  const step = (now) => {
    const t = Math.min(1, (now - start) / 700);
    el.textContent = fmt(from + (value - from) * (1 - Math.pow(1 - t, 3)));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// Draws the numbers and the daily bars inside the Lab's "Live visitors" panel
function renderLabStats(panel, state) {
  const fmt = (n) => Number(n).toLocaleString('en-US');
  const set = (name, value) => {
    const el = panel.querySelector(`[data-stat="${name}"]`);
    if (el && value !== null && value !== undefined) countTo(el, Number(value));
  };
  set('online', state.online);
  set('views', state.views === null ? null : SITE_VIEWS_BASE + state.views);
  set('today', state.daily ? state.daily[montrealDay()] || 0 : null);
  set('waves', state.waves ? state.waves[montrealDay()] || 0 : null);

  if (!state.daily) return;
  const range = state.range || 7;
  const days = Array.from({ length: range }, (_, i) => {
    const key = montrealDay(range - 1 - i);
    return { key, count: Number(state.daily[key]) || 0 };
  });
  const max = Math.max(1, ...days.map((d) => d.count));

  // Daily counts only exist from the day tracking began; say so while the
  // chart still shows days from before that
  const note = panel.querySelector('.vs-chart-note');
  const tracked = Object.keys(state.daily).filter((k) => Number(state.daily[k]) > 0).sort();
  const firstDay = tracked[0];
  if (note) {
    note.hidden = Boolean(firstDay && firstDay <= days[0].key);
    note.textContent = firstDay
      ? `Daily tracking started ${new Date(firstDay + 'T12:00:00Z').toLocaleDateString('en-US', { timeZone: 'UTC', month: 'short', day: 'numeric' })}.`
      : 'Daily tracking starts today.';
  }

  const bars = panel.querySelector('.vs-bars');
  const list = panel.querySelector('.vs-sr');
  bars.textContent = '';
  list.textContent = '';
  bars.classList.toggle('is-month', range > 7);
  days.forEach((d, i) => {
    const date = new Date(d.key + 'T12:00:00Z');
    const long = date.toLocaleDateString('en-US', { timeZone: 'UTC', weekday: 'short', month: 'short', day: 'numeric' });
    const label = `${long} · ${fmt(d.count)} view${d.count === 1 ? '' : 's'}`;
    const isToday = i === range - 1;

    const col = document.createElement('div');
    col.className = 'vs-col' + (isToday ? ' is-today' : '');
    col.tabIndex = 0;
    col.dataset.tip = label;
    const bar = document.createElement('span');
    bar.className = 'vs-bar';
    bar.style.height = `${Math.max(2, (d.count / max) * 100)}%`;
    bar.style.animationDelay = `${i * (range > 7 ? 12 : 40)}ms`;
    if (isToday) {
      const value = document.createElement('span');
      value.className = 'vs-value';
      value.textContent = fmt(d.count);
      col.append(value);
    }
    col.append(bar);
    // Week view labels every day; month view labels about once a week
    if (range <= 7 || isToday || (range - 1 - i) % 7 === 0) {
      const day = document.createElement('span');
      day.className = 'vs-day';
      day.textContent = isToday
        ? 'Today'
        : range <= 7
          ? date.toLocaleDateString('en-US', { timeZone: 'UTC', weekday: 'short' })
          : date.toLocaleDateString('en-US', { timeZone: 'UTC', month: 'short', day: 'numeric' });
      col.append(day);
    }
    bars.append(col);

    const li = document.createElement('li');
    li.textContent = label;
    list.append(li);
  });
}

async function initSiteStats() {
  const database = await ensureFirebase();
  if (!database) return;

  const panel = document.getElementById('labStats');
  const statsRef = database.collection('stats').doc('post_views');
  const presenceRef = database.collection('presence').doc(getPresenceId());
  const state = { online: null, views: null, daily: null, waves: null, range: 7 };

  // Count this page once per browser session (total + today's count)
  const countKey = 'site_viewed_' + location.pathname;
  const countThisView = async () => {
    try {
      if (sessionStorage.getItem(countKey)) return;
      sessionStorage.setItem(countKey, 'true');
    } catch (e) {}
    const inc = firebase.firestore.FieldValue.increment(1);
    try {
      await statsRef.set({ site_views: inc }, { merge: true });
    } catch (err) {
      console.error('Could not count page view:', err);
    }
    try {
      await statsRef.set({ daily_views: { [montrealDay()]: inc } }, { merge: true });
    } catch (err) {
      console.error('Could not count daily view:', err);
    }
  };

  const heartbeat = () =>
    presenceRef
      .set({ lastSeen: firebase.firestore.FieldValue.serverTimestamp() })
      .catch((err) => console.error('Presence unavailable:', err));

  const refreshViews = async () => {
    try {
      const snap = await statsRef.get();
      const data = snap.exists ? snap.data() : {};
      state.views = Number(data.site_views) || 0;
      state.daily = data.daily_views || {};
      state.waves = data.daily_waves || {};
    } catch (err) {
      console.error('Site views unavailable:', err);
    }
  };

  const refreshOnline = async () => {
    try {
      const cutoff = firebase.firestore.Timestamp.fromMillis(Date.now() - SITE_ONLINE_WINDOW_MS);
      const snap = await database.collection('presence').where('lastSeen', '>', cutoff).limit(500).get();
      state.online = Math.max(1, snap.size); // you're always online to yourself
    } catch (err) {
      console.error('Online count unavailable:', err);
    }
  };

  // Home page: "3 here now" next to the blog ticker
  const here = document.querySelector('.tk-here');
  const showHere = () => {
    if (!here || !state.online) return;
    here.querySelector('b').textContent = state.online === 1 ? 'Just you' : `${state.online} people`;
    here.hidden = false;
  };

  const tick = async () => {
    if (document.visibilityState === 'hidden') return;
    await heartbeat();
    if (here && !panel) { await refreshOnline(); showHere(); return; }
    if (!panel) return; // only the Lab page and the home page read the numbers
    await Promise.all([refreshOnline(), refreshViews()]);
    renderLabStats(panel, state);
  };

  if (panel) {
    // 7D / 30D switch
    const label = panel.querySelector('.vs-range-label');
    panel.querySelectorAll('[data-range]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.range = Number(btn.dataset.range);
        panel.querySelectorAll('[data-range]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        label.textContent = `${state.range} days`;
        renderLabStats(panel, state);
      });
    });

    // Wave at everyone: one wave per visit, counted for the day
    const waveBtn = panel.querySelector('.vs-wave-btn');
    const waveKey = 'site_waved_' + montrealDay();
    const markWaved = () => {
      waveBtn.disabled = true;
      waveBtn.classList.add('is-waved');
      waveBtn.querySelector('.vs-wave-text').textContent = 'Waved!';
    };
    try {
      if (sessionStorage.getItem(waveKey)) markWaved();
    } catch (e) {}
    waveBtn.addEventListener('click', async () => {
      markWaved();
      try {
        sessionStorage.setItem(waveKey, 'true');
      } catch (e) {}
      const today = montrealDay();
      state.waves = { ...(state.waves || {}), [today]: (Number((state.waves || {})[today]) || 0) + 1 };
      renderLabStats(panel, state);
      try {
        await statsRef.set({ daily_waves: { [today]: firebase.firestore.FieldValue.increment(1) } }, { merge: true });
      } catch (err) {
        console.error('Could not save wave:', err);
      }
    });
  }

  await countThisView();
  await tick();
  setInterval(tick, SITE_STATS_REFRESH_MS);

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') tick();
  });
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) tick();
  });
  window.addEventListener('pagehide', () => {
    presenceRef.delete().catch(() => {});
  });
}

// Firebase (live visitors, view counts) is about 150KB of script, so it starts
// only once the page has loaded and the browser is idle: the page shows first.
const whenIdle = (fn) => {
  const go = () => ('requestIdleCallback' in window ? requestIdleCallback(fn, { timeout: 2000 }) : setTimeout(fn, 300));
  if (document.readyState === 'complete') go(); else addEventListener('load', go, { once: true });
};
whenIdle(() => {
  initFirebaseAndData();
  initSiteStats();
});

/*===== HOME: TICKER =====*/
// Montreal time + a scrolling loop of what's new on the site: the latest blog
// posts (read from blog.html), the latest Favorites pick and the latest project.
// All three update by themselves when blog.html, favorites.js or the Selected
// work list change.
(() => {
  const ZONE = 'America/Toronto';
  const box = document.querySelector('.tk');
  if (!box) return;
  const clock = box.querySelector('.tk-clock');
  const track = box.querySelector('.tk-track');

  // made once: building a time formatter is slow, using one is quick
  const TIME_12 = new Intl.DateTimeFormat('en-US', { timeZone: ZONE, hour: 'numeric', minute: '2-digit' });
  const tickClock = () => {
    const now = new Date();
    clock.textContent = TIME_12.format(now);
  };
  tickClock(); setInterval(tickClock, 30000);

  // Featured post + "More posts" (skipping "coming soon" cards), newest first
  const readPosts = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return [...doc.querySelectorAll('a.bl-feature, a.bl-row')].map((a) => {
      const meta = (a.querySelector('.bl-meta')?.textContent || '').split('·').map((t) => t.trim());
      return {
        link: a.getAttribute('href'),
        title: a.querySelector('h2, h3')?.textContent.trim() || '',
        topic: meta[1] || 'Blog',
        read: meta[2] || '',
        img: a.querySelector('img')?.getAttribute('src') || '',
      };
    }).filter((p) => p.link && p.title);
  };

  const build = (items) => {
    track.textContent = '';
    if (!items.length) {
      const empty = document.createElement('a');
      empty.className = 'tk-item';
      empty.href = 'blog.html';
      empty.textContent = 'Read the latest on the blog';
      track.append(empty);
      return;
    }
    // Two copies back to back so the loop has no gap
    for (let copy = 0; copy < 2; copy++) {
      for (const n of items) {
        // Only the topic and title are a link; the read time and the gap after it aren't
        const item = document.createElement('span');
        item.className = 'tk-item';
        const a = document.createElement('a');
        a.className = 'tk-link';
        a.href = n.link;
        if (n.external) { a.target = '_blank'; a.rel = 'noopener'; }
        if (copy) { item.setAttribute('aria-hidden', 'true'); a.tabIndex = -1; }
        const tag = document.createElement('span');
        tag.className = 'tk-tag';
        tag.textContent = n.topic;
        const title = document.createElement('span');
        title.textContent = n.title;
        a.append(tag, title);
        const src = document.createElement('span');
        src.className = 'tk-src';
        src.textContent = n.read;
        item.append(a, src);
        track.append(item);
      }
    }
    // Same reading speed no matter how many posts: about 60px per second
    requestAnimationFrame(() => {
      track.style.setProperty('--tk-duration', `${Math.round(track.scrollWidth / 2 / 60)}s`);
      box.classList.add('is-running');
      resume();
    });
  };

  // Remember where the loop was, so coming back to the home page continues
  // from the same spot instead of starting over at the first post
  const SPOT_KEY = 'nedcode-ticker-spot';
  const loop = () => track.getAnimations?.()[0];
  const save = () => {
    const anim = loop();
    const total = anim?.effect?.getComputedTiming().duration;
    if (!anim || !total) return;
    try { sessionStorage.setItem(SPOT_KEY, String((anim.currentTime % total) / total)); } catch (e) {}
  };
  const resume = () => {
    const anim = loop();
    const total = anim?.effect?.getComputedTiming().duration;
    let spot = NaN;
    try { spot = parseFloat(sessionStorage.getItem(SPOT_KEY)); } catch (e) {}
    if (anim && total && spot >= 0 && spot < 1) anim.currentTime = spot * total;
  };
  window.addEventListener('pagehide', save);
  document.addEventListener('visibilitychange', () => { if (document.hidden) save(); });

  // Let go of a tapped post so the ticker keeps moving when the visitor comes back
  const release = () => {
    if (box.contains(document.activeElement)) document.activeElement.blur();
  };
  track.addEventListener('click', (e) => { if (e.target.closest('a')) { save(); setTimeout(release, 0); } });

  // Hold a finger on it to pause, so a post can be read and tapped
  const hold = (on) => box.classList.toggle('is-held', on);
  const win = box.querySelector('.tk-window');
  win.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') hold(true); });
  ['pointerup', 'pointercancel', 'pointerleave'].forEach((t) => win.addEventListener(t, () => hold(false)));
  window.addEventListener('pageshow', () => hold(false));

  // The newest Favorites pick (favorites.js runs before DOMContentLoaded) and the
  // first project in Selected work, slotted in between the posts
  const extras = () => {
    const out = {};
    const pick = window.nedcodePick;
    if (pick) out.pick = { link: 'favorites.html', topic: 'Just watched', title: pick.title, read: `★ ${pick.rating}` };
    const row = document.querySelector('.hc-row');
    const name = row?.querySelector('.hc-name')?.firstChild?.textContent.trim();
    if (row && name) out.project = { link: row.getAttribute('href'), topic: 'Latest project', title: name, read: row.querySelector('.hc-year')?.textContent.trim() || '', external: row.target === '_blank' };
    return out;
  };
  const mix = (posts) => {
    const { pick, project } = extras();
    const items = posts.slice();
    if (pick) items.splice(Math.min(1, items.length), 0, pick);
    if (project) items.splice(Math.min(3, items.length), 0, project);
    return items;
  };
  const ready = new Promise((ok) => {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ok, { once: true });
    else ok();
  });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) release(); });
  window.addEventListener('pageshow', release);

  // always the current list, never a copy the browser saved earlier
  fetch('blog.html', { cache: 'no-cache' })
    .then((r) => (r.ok ? r.text() : Promise.reject(r.status)))
    .then((html) => ready.then(() => { const posts = readPosts(html); build(mix(posts)); latest(posts); }))
    .catch(() => ready.then(() => build(mix([]))));

  // "Latest posts": the 3 newest posts as swipeable cover cards, newest first.
  // Posts the visitor has opened get a small "Read" mark (see BLOG: READ MARKS).
  const latestBox = document.querySelector('.hm-latest');
  const latest = (posts) => {
    if (!latestBox || !posts.length) return;
    const list = latestBox.querySelector('.hm-cards');
    const seen = readPostsSeen();
    const cards = posts.slice(0, 3);
    cards.forEach((n) => {
      const a = document.createElement('a');
      a.className = 'hm-card';
      a.href = n.link;
      const read = seen.includes(postSlug(n.link));
      if (read) a.classList.add('is-read');
      if (n.img) {
        const img = document.createElement('img');
        img.src = n.img; img.alt = ''; img.width = 940; img.height = 788; img.loading = 'lazy';
        a.append(img);
      }
      const h = document.createElement('h3');
      h.textContent = n.title;
      const m = document.createElement('span');
      m.className = 'hm-card-meta';
      m.textContent = [n.topic, n.read].filter(Boolean).join(' · ');
      // same "Read" mark as the blog page, on the topic line so every card lines up
      if (read) {
        const mark = document.createElement('span');
        mark.className = 'bl-read-mark';
        mark.textContent = '✓ Read';
        m.append(' · ', mark);
      }
      a.append(h, m);
      list.append(a);
    });
    latestBox.hidden = false;

    // Phones: one dot per card, the current one lit, so it's clear they swipe.
    // Tap a dot to jump to that card, or swipe across the dots to move one card.
    const dots = latestBox.querySelector('.hm-dots');
    if (!dots) return;
    const all = [...list.children];
    let current = 0;
    let sliding = 0; // timer while a dot-started slide runs, so the lit dot doesn't flick back
    const mark = (i) => {
      current = i;
      [...dots.children].forEach((d, k) => {
        d.classList.toggle('is-on', k === i);
        if (k === i) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
      });
    };
    // Light the dot straight away, then let Safari/Chrome do the slide: the
    // browser's own scrolling runs at the screen's full frame rate (120fps on
    // iPhone), which a JavaScript animation can't match.
    const done = () => { clearTimeout(sliding); sliding = 0; light(); };
    const go = (i) => {
      i = Math.max(0, Math.min(all.length - 1, i));
      mark(i);
      clearTimeout(sliding);
      sliding = setTimeout(done, 800); // in case the browser has no scrollend event
      list.scrollTo({ left: all[i].offsetLeft - all[0].offsetLeft, behavior: 'smooth' });
    };
    list.addEventListener('scrollend', () => { if (sliding) done(); });
    all.forEach((card, k) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Show post ${k + 1} of ${all.length}`);
      // taps and swipes are handled on pointerup below; this is for the keyboard
      dot.addEventListener('click', (e) => { if (e.detail === 0) go(k); });
      dots.append(dot);
    });
    const light = () => {
      if (sliding) return; // the dot is already lit for where we're going
      const step = all[1] ? all[1].offsetLeft - all[0].offsetLeft : 1;
      const atEnd = list.scrollLeft + list.clientWidth >= list.scrollWidth - 4;
      mark(atEnd ? all.length - 1 : Math.round(list.scrollLeft / step));
    };
    // Tap a dot: go to it. Swipe across the dots: move one card that way.
    let startX = null;
    dots.addEventListener('pointerdown', (e) => { startX = e.clientX; });
    dots.addEventListener('pointerup', (e) => {
      if (startX === null) return;
      const dx = e.clientX - startX;
      startX = null;
      if (Math.abs(dx) > 25) { go(current + (dx < 0 ? 1 : -1)); return; }
      const dot = e.target.closest('button');
      if (dot) go([...dots.children].indexOf(dot));
    });
    dots.addEventListener('pointercancel', () => { startX = null; });
    list.addEventListener('scroll', light, { passive: true });
    light();
  };
})();

const READ_KEY = 'nedcode-read-posts'; // see BLOG: READ MARKS below

/*===== BLOG PAGE: topic chips and read marks =====*/
// Chips for each topic (built from the posts themselves, so a new topic shows
// up by itself) filter the list. Topics: Tech, Gaming, Reviews.
// Posts the visitor has already opened get a small "Read" mark.
(() => {
  const chips = document.querySelector('.bl-topics');
  if (!chips) return;
  const posts = [...document.querySelectorAll('a.bl-feature, a.bl-row')];
  const soon = [...document.querySelectorAll('.bl-row.is-soon')];
  posts.forEach((a) => {
    const topic = (a.querySelector('.bl-meta')?.textContent.split('·')[1] || '').trim();
    a.dataset.topic = topic;
  });

  // read marks
  const seen = readPostsSeen();
  posts.forEach((a) => {
    if (!seen.includes(postSlug(a.getAttribute('href')))) return;
    a.classList.add('is-read');
    const mark = document.createElement('span');
    mark.className = 'bl-read-mark';
    mark.textContent = '✓ Read';
    (a.querySelector('.bl-meta') || a).after(mark);
  });

  // topics, most posts first
  const count = {};
  posts.forEach((a) => { if (a.dataset.topic) count[a.dataset.topic] = (count[a.dataset.topic] || 0) + 1; });
  const topics = Object.keys(count).sort((x, y) => count[y] - count[x]);
  if (topics.length < 2) return;
  ['All', ...topics].forEach((t, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = t;
    b.dataset.topic = t;
    b.setAttribute('aria-pressed', String(i === 0));
    chips.append(b);
  });
  chips.hidden = false;
  chips.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    const t = b.dataset.topic;
    chips.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    posts.forEach((a) => { a.hidden = t !== 'All' && a.dataset.topic !== t; });
    soon.forEach((r) => { r.hidden = t !== 'All'; });
  });
})();

/*===== BLOG: READ MARKS =====*/
// Opening a blog post remembers it on this device only (localStorage), so the
// home page cards can show which posts the visitor has already read.
function postSlug(href) {
  return decodeURIComponent((href || '').split(/[?#]/)[0].split('/').pop().replace(/\.html$/, '')).toLowerCase();
}
function readPostsSeen() {
  try { return JSON.parse(localStorage.getItem(READ_KEY)) || []; } catch (e) { return []; }
}
(() => {
  if (!/\/blog\/[^/]+$/.test(location.pathname)) return;
  const slug = postSlug(location.pathname);
  const seen = readPostsSeen();
  if (!slug || seen.includes(slug)) return;
  try { localStorage.setItem(READ_KEY, JSON.stringify([slug, ...seen].slice(0, 100))); } catch (e) {}
})();
  

/*===== LOGO: tired neon sign late at night =====*/
// From midnight to 6am Montreal time the logo flickers more and glows a bit
// weaker, like a sign that's been on all day. Add ?late to the URL to see it
// any time.
(() => {
  const logo = document.querySelector('.nav-logo-group');
  if (!logo) return;
  const forced = new URLSearchParams(location.search).has('late');
  const HOUR = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Montreal', hour: 'numeric', hourCycle: 'h23' });
  const check = () => {
    const hour = Number(HOUR.format(new Date()));
    logo.classList.toggle('is-late', forced || hour < 6);
  };
  check();
  setInterval(check, 60000);
})();

/*===== LOGO: tap a letter to switch it off/on (home page only) =====*/
// On the home page each NEDCODE letter is its own switch: tap it to turn it
// off, and a couple of seconds later it sputters back on by itself (or tap it
// again to turn it back on straight away). Taps outside the letters do nothing
// special, and on every other page the logo is just the normal link home.
// The menu button sits outside every letter, so it always works as usual.
(() => {
  const logo = document.querySelector('.nav-logo-group');
  const onHome = /\/(index\.html)?$/.test(location.pathname);
  if (!logo || !onHome) return;
  // where each letter sits, as a share of the logo's width (from the 1125px artwork)
  const LETTERS = [
    ['nav-logo1', 255, 364], ['nav-logo2', 364, 440], ['nav-logo3', 440, 548],
    ['nav-logo4', 548, 658], ['nav-logo5', 658, 772], ['nav-logo6', 772, 870], ['nav-logo7', 870, 950],
  ];
  const timers = {};

  // The window's three little dots work like a power switch. They're tiny, so
  // the whole corner is one button that steps through them: red cuts the power
  // (every letter goes dark), yellow dims the sign, green powers it back up one
  // letter at a time. Left off or dimmed, it powers back up after 8 seconds.
  const dots = document.createElement('span');
  dots.className = 'nav-dots';
  dots.setAttribute('aria-hidden', 'true');
  dots.innerHTML = '<i class="is-red"></i><i class="is-yellow"></i><i class="is-green"></i>';
  logo.querySelector('.nav-logo').append(dots);
  const STATES = ['red', 'yellow', 'green'];
  let power = -1, powerTimer = null;
  const setPower = (n) => {
    power = n;
    clearTimeout(powerTimer);
    logo.classList.remove('is-power-off', 'is-dim');
    dots.dataset.on = STATES[n] || '';
    if (n === 0) logo.classList.add('is-power-off');
    if (n === 1) logo.classList.add('is-dim');
    if (n === 2) {
      // sputter back on, one letter after another
      LETTERS.forEach(([cls], i) => {
        const letter = logo.querySelector('.' + cls);
        letter.classList.remove('is-off', 'is-zap', 'is-relight');
        void letter.offsetWidth;
        letter.style.setProperty('--d', i * 0.12 + 's');
        letter.classList.add('is-relight');
        clearTimeout(timers[cls]);
        timers[cls] = setTimeout(() => { letter.classList.remove('is-relight'); letter.style.removeProperty('--d'); }, 1000 + i * 120);
      });
      powerTimer = setTimeout(() => { power = -1; dots.dataset.on = ''; }, 1600);
      return;
    }
    if (n >= 0) powerTimer = setTimeout(() => setPower(2), 8000);
  };

  // N-E-D: every letter flickers back on in a wave, and snakes race
  // down both cables at once
  let seq = [], seqAt = 0;
  const celebrate = () => {
    LETTERS.forEach(([cls], i) => {
      const letter = logo.querySelector('.' + cls);
      clearTimeout(timers[cls]);
      letter.classList.remove('is-off', 'is-relight', 'is-zap');
      void letter.offsetWidth;
      letter.style.setProperty('--d', i * 0.09 + 's');
      letter.classList.add('is-zap');
      timers[cls] = setTimeout(() => { letter.classList.remove('is-zap'); letter.style.removeProperty('--d'); }, 1100 + i * 90);
    });
    if (logo.raceSparks) logo.raceSparks();
  };

  logo.addEventListener('click', (e) => {
    if (!e.target.closest('a') || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    const box = logo.querySelector('.nav-logo img').getBoundingClientRect();
    const x = ((e.clientX - box.left) / box.width) * 1125;
    const y = ((e.clientY - box.top) / box.height) * 450;
    if (x >= 180 && x < 255 && y >= 135 && y <= 205) { // the window's dots
      e.preventDefault();
      setPower((power + 1) % 3);
      return;
    }
    const hit = y >= 175 && y <= 340 && LETTERS.find(([, from, to]) => x >= from && x < to);
    if (!hit) {
      if (logo.sendSpark && logo.sendSpark(x, y)) e.preventDefault(); // a cable: send a snake
      return; // anywhere else: the normal link home
    }
    e.preventDefault();
    if (power === 0 || power === 1) return; // power is cut or dimmed: the switch is in charge
    // secret: tap N, E, D in a row (a couple of seconds apart at most)
    const now = Date.now();
    seq = now - seqAt < 2500 ? seq : [];
    seqAt = now;
    seq.push(hit[0]);
    if (seq.join() === 'nav-logo1,nav-logo2,nav-logo3') { seq = []; celebrate(); return; }
    if (!'nav-logo1,nav-logo2,nav-logo3'.startsWith(seq.join())) seq = [hit[0]];
    const letter = logo.querySelector('.' + hit[0]);
    clearTimeout(timers[hit[0]]);
    letter.classList.remove('is-relight');
    if (letter.classList.toggle('is-off')) {
      timers[hit[0]] = setTimeout(() => {
        if (!letter.classList.contains('is-off')) return; // the cable spark already turned it back on
        letter.classList.remove('is-off');
        letter.classList.add('is-relight'); // flickers back on like a neon tube
        timers[hit[0]] = setTimeout(() => letter.classList.remove('is-relight'), 1000);
      }, 2500);
    }
  });
})();

/*===== LOGO: current running through the cables =====*/
// Once a cycle each cable flashes along its whole length with an electric
// flicker, a few sparks crackle off it, and its letter sparks and charges up
// (right cable and the O, then the left cable and the N). The little loop on
// top glows once on its own. Tapping a cable flashes it. The paths were
// traced from the 1125×450 logo artwork and are smoothed into curves here.
// Everything runs on one 26s clock in JS.
(() => {
  const group = document.querySelector('.nav-logo-group');
  const base = group && group.querySelector('.nav-logo');
  if (!base) return;
  const CABLES = [
    'M897 355 892 357 887 361 882 364 877 365 872 366 867 366 862 366 857 366 852 367 847 367 842 368 837 370 832 371 827 373 822 376 817 378 812 382 807 385 802 389 797 394 792 398 787 402 782 405 777 408 772 410 767 412 762 413 757 415 752 415 747 416 742 416 737 415 732 414 727 413 722 411 717 409 712 405 707 401 703 396 700 391 697 386 695 381 693 376 693 371 693 366 693 361 694 356 696 351 699 346 702 341 705 336 707 331 708 326 709 321 708 316 708 311 707 308',
    'M789 160 789 160 784 160 779 157 774 155 769 154 764 153 759 153 754 153 749 155 744 158 739 161',
    'M445 161 445 161 440 160 435 159 430 157 425 152 420 147 417 142 414 137 413 132 411 127 411 122 411 117 411 112 412 107 414 102 416 97 418 92 421 87 423 82 424 77 425 72 426 67 425 62 425 57 422 52 417 47 412 44 407 42 402 40 397 40 392 40 387 40 382 42 377 44 372 46 367 49 362 52 357 56 352 59 347 63 342 67 337 71 332 74 327 77 322 79 317 82 312 84 307 85 302 86 297 87 292 88 287 87 282 87 277 86 272 84 267 81 262 77 257 72 252 68 247 63 242 58 237 55 232 52 227 50 222 48 217 46 212 45 207 45 202 45 197 45 192 46 187 47 182 49 177 50 172 53 167 55 162 58 157 63 152 67 147 72 144 77 141 82 138 87 136 92 134 97 133 102 131 107 130 112 130 117 129 122 129 127 130 132 130 137 130 142 131 147 132 152 134 157 136 162 138 167 140 172 142 177 144 182 147 187 149 192 152 197 154 202 156 207 158 212 160 217 161 222 162 227 163 232 164 237 165 242 165 247 165 252 165 257 165 262 165 267 164 272 163 277 162 282 161 287 160 292 159 297 158 302 158 307 158 312 158 317 160 322 162 327 164 332 168 337 172 342 177 347 182 351 187 356 192 359 197 363 202 365 207 367 212 368 217 369 222 369 227 368 232 367 237 365 242 362 247 359 252 354 257 349 261 344 264 339 267 334 269 329 272 324 274 319 277 314 280 309',
  ];
  const NS = 'http://www.w3.org/2000/svg';
  const make = (tag, cls, parent) => {
    const el = document.createElementNS(NS, tag);
    if (cls) el.setAttribute('class', cls);
    if (parent) parent.append(el);
    return el;
  };

  // The traced points are a little jagged, so even them out (a short moving
  // average) and run a Catmull-Rom curve through them.
  const smooth = (d) => {
    const n = d.slice(1).trim().split(/\s+/).map(Number);
    let pts = [];
    for (let i = 0; i < n.length; i += 2) {
      const last = pts[pts.length - 1];
      if (!last || last[0] !== n[i] || last[1] !== n[i + 1]) pts.push([n[i], n[i + 1]]);
    }
    pts = pts.map((p, i) => {
      if (i < 2 || i > pts.length - 3) return p;
      const w = pts.slice(i - 2, i + 3);
      return [w.reduce((s, q) => s + q[0], 0) / 5, w.reduce((s, q) => s + q[1], 0) / 5];
    });
    let out = `M${pts[0][0]} ${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      const c = (a, b, s) => (a + (b * s) / 6).toFixed(1);
      out += ` C${c(p1[0], p2[0] - p0[0], 1)} ${c(p1[1], p2[1] - p0[1], 1)} ${c(p2[0], p3[0] - p1[0], -1)} ${c(p2[1], p3[1] - p1[1], -1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
    }
    return out;
  };

  const svg = make('svg', 'nav-logo-spark');
  svg.setAttribute('viewBox', '0 0 1125 450');
  svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML = '<defs><radialGradient id="spark-halo"><stop offset="0" stop-color="#ffe45c" stop-opacity=".2"/>'
    + '<stop offset=".3" stop-color="#ffdf3a" stop-opacity=".1"/><stop offset=".6" stop-color="#ffdc16" stop-opacity=".035"/>'
    + '<stop offset="1" stop-color="#f5c800" stop-opacity="0"/></radialGradient>'
    + '<radialGradient id="spark-core"><stop offset="0" stop-color="#fff" stop-opacity="1"/><stop offset=".22" stop-color="#fff3b8" stop-opacity=".9"/>'
    + '<stop offset=".5" stop-color="#ffe45c" stop-opacity=".35"/><stop offset="1" stop-color="#ffdc16" stop-opacity="0"/></radialGradient>'
    + '</defs>';
  const cables = CABLES.map((raw) => {
    const d = smooth(raw);
    const rail = make('path', 'spark-rail', svg); // invisible: used to measure the cable
    rail.setAttribute('d', d);
    const len = rail.getTotalLength();
    // Points along the cable, only used to find a tapped spot (home page), so
    // they're measured on the first tap instead of slowing down every page load
    let pts = null;
    return {
      d, rail, len,
      get pts() {
        if (!pts) {
          pts = [];
          for (let l = 0; l <= len; l += 4) { const q = rail.getPointAtLength(l); pts.push([l, q.x, q.y]); }
        }
        return pts;
      },
    };
  });
  // the little loop on top only glows, it never carries a snake
  const loop = make('path', 'spark-loop', svg);
  loop.setAttribute('d', cables[1].d);
  base.append(svg);

  // Layers, back to front: the snakes, then the laser tip and its sparks.
  const snakesLayer = make('g', 'spark-fx', svg);
  const tipsLayer = make('g', 'spark-fx', svg);

  // Where a cable meets its letter (right cable into the O, left into the N)
  // the laser doesn't just vanish: its light flows up into the letter from
  // that exact spot and spreads through it, like current filling a neon tube,
  // before the letter flickers. The light is a glow masked to the letter's
  // own shape, so it only ever shows inside the letter.
  const FLOWS = [[0, 'nav-logo5', 708, 306], [2, 'nav-logo1', 280, 306]]; // cable, letter, entry point
  FLOWS.forEach(([i, cls, x, y]) => {
    const img = group.querySelector(`.${cls} img`);
    if (!img) return;
    const flow = document.createElement('div');
    flow.className = 'nav-logo-flow';
    flow.setAttribute('aria-hidden', 'true');
    flow.style.setProperty('--mask', `url("${img.src}")`);
    const blob = document.createElement('span');
    blob.style.left = (x / 11.25) + '%';
    blob.style.top = (y / 4.5) + '%';
    flow.append(blob);
    group.append(flow);
    cables[i].flow = blob;
  });
  const flowIn = (c) => {
    if (!c.flow || group.classList.contains('is-power-off')) return;
    // a white-hot glow rises from where the cable meets the letter and
    // sweeps up through it, then fades as the letter charges up
    c.flow.animate([
      { transform: 'translate(-50%, -50%) scale(.05)', opacity: 1 },
      { transform: 'translate(-50%, -62%) scale(.75)', opacity: .95, offset: 0.4 },
      { transform: 'translate(-50%, -75%) scale(1.15)', opacity: 0 },
    ], { duration: 1000, easing: 'cubic-bezier(.22, .61, .36, 1)' });
  };

  // flicker a letter when the snake arrives; a letter that was tapped off
  // gets switched straight back on by it
  const zap = (cls) => {
    const letter = group.querySelector('.' + cls);
    if (!letter || letter.classList.contains('is-relight') || group.classList.contains('is-power-off')) return;
    letter.classList.remove('is-off', 'is-zap');
    void letter.offsetWidth;
    letter.classList.add('is-zap');
    setTimeout(() => letter.classList.remove('is-zap'), 1100);
  };
  // the laser arriving at its letter: instead of a flicker, the letter
  // charges up (flares white-hot and glows, then settles back to its yellow)
  const charge = (cls) => {
    const letter = group.querySelector('.' + cls);
    if (!letter || letter.classList.contains('is-relight') || group.classList.contains('is-power-off')) return;
    letter.classList.remove('is-off', 'is-zap', 'is-charge');
    void letter.offsetWidth;
    letter.classList.add('is-charge');
    clearTimeout(letter.chargeTimer);
    letter.chargeTimer = setTimeout(() => letter.classList.remove('is-charge'), 1200);
  };
  const glowLoop = () => loop.animate([{ opacity: 0 }, { opacity: 1, offset: 0.3 }, { opacity: 0 }], { duration: 900 });

  // The loop keeps going from page to page instead of starting over: the
  // moment it first started is remembered for the visit, and every page picks
  // the snakes up from wherever they'd be by now.
  const CYCLE = 26000; // one laser run on each cable every 26s (was 16s)
  const T0_KEY = 'nedcode-snake-t0';
  let t0 = NaN;
  try { t0 = Number(sessionStorage.getItem(T0_KEY)); } catch (e) {}
  if (!t0 || t0 > Date.now()) {
    t0 = Date.now();
    try { sessionStorage.setItem(T0_KEY, String(t0)); } catch (e) {}
  }
  const phase = () => (Date.now() - t0) % CYCLE;
  // Instead of a laser travelling along them, each cable flashes along its
  // whole length once a cycle, and in that instant its letter sparks and
  // charges up: the right cable and the O at 2.2s, the left cable and the N
  // at 8.8s. The little loop on top glows at 10.7s.
  const FLASHES = [[0, 2240], [2, 8800]]; // [cable, ms into the cycle]
  FLASHES.forEach(([i, at]) => {
    const next = () => setTimeout(() => { flash(i); next(); }, ((at - phase() + CYCLE) % CYCLE) || CYCLE);
    next();
  });
  const next = () => setTimeout(() => { if (!group.classList.contains('is-power-off')) glowLoop(); next(); }, ((10720 - phase() + CYCLE) % CYCLE) || CYCLE);
  next();

  // A snake is one clean, even laser line: an orange body with a pale core,
  // the same length so both ends stay crisp, and no glow around it.
  // the head heats up smoothly: several faint white dashes, each shorter
  // than the last, stack up so the line whitens gradually toward its head
  const LAYERS = [['body', 120], ['core', 120], ...[70, 54, 40, 28, 18, 10].map((len) => ['heat', len])];
  const TAIL = 135; // a snake is gone once its head is this far past the end
  const snake = (c) => {
    const g = make('g', 'spark-snake', snakesLayer);
    const parts = LAYERS.map(([cls, len]) => {
      const p = make('path', 'spark-' + cls, g);
      p.setAttribute('d', c.d);
      p.style.strokeDasharray = `${len} 5000`;
      return [p, len];
    });
    return { c, g, parts };
  };
  const draw = (s, head) => {
    if (s.head === head) return; // parked: nothing to repaint
    s.head = head;
    s.parts.forEach(([p, len]) => { p.style.strokeDashoffset = len - head; });
  };

  // Home page: tap a cable and a snake sets off from that exact spot towards
  // its letter (right cable to the O, left cable to the N); the little loop on
  // top just lights up. The letter switch code calls this for taps that don't
  // land on a letter or the window's dots.
  const LETTER = ['nav-logo5', null, 'nav-logo1'];
  const taps = [];
  group.sendSpark = (x, y) => {
    if (group.classList.contains('is-power-off')) return false;
    let best = null;
    cables.forEach((c, i) => c.pts.forEach(([l, px, py]) => {
      const dist = Math.hypot(px - x, py - y);
      if (dist < 40 && (!best || dist < best.dist)) best = { i, l, dist };
    }));
    if (!best) return false;
    run(best.i);
    return true;
  };
  // a tapped cable flashes too (the top loop just glows)
  const run = (i) => (LETTER[i] ? flash(i) : glowLoop());

  // A flash: the whole cable lights up with an electric flicker, a few sparks
  // crackle off it, and on the first bright beat its letter sparks and
  // charges up (with the light flowing in).
  const flash = (i) => {
    if (group.classList.contains('is-power-off')) return;
    const c = cables[i];
    const g = make('g', 'spark-flash', snakesLayer);
    ['body', 'core'].forEach((cls) => make('path', 'spark-' + cls, g).setAttribute('d', c.d));
    const calmNow = matchMedia('(prefers-reduced-motion: reduce)').matches;
    g.animate(calmNow
      ? [{ opacity: 0 }, { opacity: 1, offset: 0.15 }, { opacity: 0 }]
      : [{ opacity: 0 }, { opacity: 1, offset: 0.06 }, { opacity: 0.2, offset: 0.12 }, { opacity: 1, offset: 0.2 },
        { opacity: 0.45, offset: 0.3 }, { opacity: 1, offset: 0.38 }, { opacity: 0 }],
    { duration: 900, easing: 'linear' }).onfinish = () => g.remove();
    setTimeout(() => {
      charge(LETTER[i]);
      burst(c, i);
      flowIn(c);
      if (calmNow) return;
      for (let k = 0; k < 14; k++) { // sparks crackling off the cable
        const p = c.rail.getPointAtLength(Math.random() * c.len);
        spark(p.x, p.y, Math.random() * Math.PI * 2, 120 + Math.random() * 280, k % 3 === 0);
      }
    }, 55);
  };
  // the N-E-D secret: every cable flashes at once
  group.raceSparks = () => { run(0); run(2); glowLoop(); };

  // The laser tip, like a welding/cutting spark: a white-hot core in a tight
  // glow, a starburst of thin rays that shimmer, and two kinds of sparks:
  // fast bright streaks that spray off behind the head, and slower embers
  // that fall, cool from white to orange and fade. When the laser reaches
  // its letter it ends in a short burst. Everything comes from fixed pools,
  // so nothing is created or thrown away while it runs.
  const calm = matchMedia('(prefers-reduced-motion: reduce)');
  const RAYS = [[0, 30], [90, 30], [45, 13], [135, 13], [20, 9], [160, 9], [70, 7], [110, 7]]; // angle, length
  const ray = (len) => `M${-len} 0 0 -.9 ${len} 0 0 .9Z`; // thin, pointed at both ends
  const tips = [];
  const tip = (n) => {
    while (tips.length <= n) {
      const g = make('g', 'spark-head', tipsLayer);
      g.innerHTML = '<circle class="spark-halo" r="70"/><circle class="spark-glow" r="20"/>'
        + '<g class="spark-rays">' + RAYS.map(([a, len]) => `<path transform="rotate(${a})" d="${ray(len)}"/>`).join('') + '</g>'
        + '<circle class="spark-dot" r="3.4"/>';
      g.rays = [...g.querySelectorAll('.spark-rays path')].map((el, i) => ({ el, a: RAYS[i][0], len: RAYS[i][1], k: 1, to: 1 }));
      tips.push(g);
    }
    return tips[n];
  };
  // sparks are drawn in their own layer in front of the letters, so a burst
  // can crackle over the N or the O instead of hiding behind it
  const front = make('svg', 'nav-logo-spark nav-logo-spark-front');
  front.setAttribute('viewBox', '0 0 1125 450');
  front.setAttribute('aria-hidden', 'true');
  const frontFx = make('g', 'spark-fx', front);
  group.append(front);
  const bits = Array.from({ length: 170 }, () => ({ el: make('line', 'spark-bit', frontFx), life: 1, max: 0 }));
  let free = 0;
  const HOT = [255, 250, 225], COOL = [255, 220, 22];
  const spark = (x, y, a, v, ember, big) => {
    const b = bits[free];
    free = (free + 1) % bits.length;
    Object.assign(b, { x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 0, ember, big,
      max: ember ? 0.55 + Math.random() * 0.6 : (big ? 0.25 : 0.1) + Math.random() * 0.2 });
    // burst sparks are thicker so they read on top of the glowing letter
    b.el.style.strokeWidth = ember ? ((big ? 2.8 : 1.6) + Math.random() * 1.4).toFixed(1) : (big ? '3.2' : '1.6');
  };
  // The end of a run: a burst of sparks at the letter, a different one each
  // time: all over the letter, sprayed out sideways, a fountain above it, or
  // a mix of the three. Boxes are each letter's area in the artwork.
  const LETTER_BOX = [[605, 150, 830, 370], null, [205, 150, 420, 370]]; // O, (loop), N
  const rnd = (a, b) => a + Math.random() * (b - a);
  const PATTERNS = {
    over: (p, box, n) => { // crackling across the whole letter
      for (let i = 0; i < n; i++) spark(rnd(box[0], box[2]), rnd(box[1], box[3]), rnd(0, Math.PI * 2), rnd(90, 320), i % 3 === 0, true);
    },
    side: (p, box, n) => { // sprayed out to both sides
      for (let i = 0; i < n; i++) spark(p.x, p.y - rnd(0, 30), (i % 2 ? 0 : Math.PI) + rnd(-0.45, 0.25) * (i % 2 ? 1 : -1), rnd(300, 680), i % 4 === 0, true);
    },
    up: (p, box, n) => { // a fountain shooting up over the letter
      for (let i = 0; i < n; i++) spark(p.x + rnd(-10, 10), p.y, -Math.PI / 2 + rnd(-0.6, 0.6), rnd(500, 950), i % 3 === 0, true);
    },
  };
  const burst = (c, i) => {
    if (calm.matches || group.classList.contains('is-power-off') || !LETTER_BOX[i]) return;
    const p = c.rail.getPointAtLength(c.len);
    const box = LETTER_BOX[i];
    const pick = ['over', 'side', 'up', 'mix'][Math.floor(Math.random() * 4)];
    if (pick === 'mix') { PATTERNS.over(p, box, 16); PATTERNS.side(p, box, 12); PATTERNS.up(p, box, 12); }
    else PATTERNS[pick](p, box, 36);
  };
  let last = performance.now();
  let shown = 0;
  const frame = (now) => {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const off = group.classList.contains('is-power-off');
    const heads = [];
    for (let k = taps.length - 1; k >= 0; k--) {
      const s = taps[k];
      const head = s.from + s.speed * ((now - s.start) / 1000);
      if (head > s.c.len + TAIL) { s.g.remove(); taps.splice(k, 1); continue; }
      draw(s, head);
      heads.push([s.c, head, s]);
    }
    // the moment a laser reaches the end of its cable: a burst of sparks,
    // and its light flows into the letter
    heads.forEach(([c, l, s]) => {
      if (s.last !== undefined && s.last < c.len && l >= c.len) {
        const i = cables.indexOf(c);
        charge(LETTER[i]);
        burst(c, i);
        flowIn(c);
      }
      s.last = l;
    });
    let n = 0;
    heads.forEach(([c, l]) => {
      if (off || l < 0 || l > c.len) return;
      const p = c.rail.getPointAtLength(l);
      const q = c.rail.getPointAtLength(Math.max(0, l - 6));
      const dir = Math.atan2(p.y - q.y, p.x - q.x); // the way the head is travelling
      const g = tip(n++);
      g.setAttribute('transform', `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`);
      g.style.opacity = 1;
      if (calm.matches) return;
      // the rays shimmer: each eases toward a new random length, and the
      // whole star turns slowly, so it sparkles without jittering
      const spin = (now / 30) % 360;
      g.rays.forEach((r) => {
        if (Math.abs(r.k - r.to) < 0.05) r.to = 0.45 + Math.random() * 0.9;
        r.k += (r.to - r.k) * Math.min(1, dt * 14);
        r.el.setAttribute('transform', `rotate(${(r.a + spin).toFixed(1)}) scale(${r.k.toFixed(2)} 1)`);
      });
      g.children[1].setAttribute('transform', `scale(${(0.9 + 0.15 * Math.sin(now / 90)).toFixed(3)})`);
      // fast streaks spray off behind the head; embers drop away and fall
      for (let k = 45 * dt; k > 0; k--) {
        if (k < 1 && Math.random() > k) break;
        spark(p.x, p.y, dir + Math.PI + (Math.random() - 0.5) * 2.6, 220 + Math.random() * 380, false);
      }
      for (let k = 12 * dt; k > 0; k--) {
        if (k < 1 && Math.random() > k) break;
        spark(p.x, p.y, -Math.PI / 2 + (Math.random() - 0.5) * 2.4, 60 + Math.random() * 140, true);
      }
    });
    for (let k = n; k < shown; k++) tips[k].style.opacity = 0;
    shown = n;
    bits.forEach((b) => {
      if (b.life >= b.max) { if (b.max) { b.el.style.opacity = 0; b.max = 0; } return; }
      b.life += dt;
      const f = b.life / b.max;
      b.vy += (b.ember ? 520 : 1500) * dt;
      if (b.ember) { b.vx *= 1 - 1.5 * dt; } // embers drift and slow down
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      // streaks: a short line pointing the way they fly; embers: a dot that cools
      const tail = b.ember ? 0.004 : (b.big ? 0.03 : 0.01);
      b.el.setAttribute('x1', b.x.toFixed(1));
      b.el.setAttribute('y1', b.y.toFixed(1));
      b.el.setAttribute('x2', (b.x - b.vx * tail).toFixed(1));
      b.el.setAttribute('y2', (b.y - b.vy * tail).toFixed(1));
      if (b.ember) {
        const c = HOT.map((h, i) => Math.round(h + (COOL[i] - h) * Math.min(1, f * 1.6)));
        b.el.style.stroke = `rgb(${c})`;
      } else b.el.style.stroke = '';
      b.el.style.opacity = Math.max(0, b.ember ? 1 - f * f : 1 - f).toFixed(2);
    });
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
})();

/*===== BACKGROUND: grid spotlight =====*/
// The dot grid lights up yellow in a soft circle around the cursor, or
// around a finger while it's on the screen, and fades back when the cursor
// leaves or the finger lifts.
// It's a small fixed circle that only ever moves (transform), so following the
// finger costs the phone almost nothing: the yellow dots inside slide the
// other way to stay lined up with the page's grid. Touches that start on
// something you swipe sideways (post cards, their dots, the ticker) leave it
// off, so the swipe gets the phone's full attention.
(() => {
  const spot = document.createElement('div');
  spot.className = 'grid-spot';
  spot.setAttribute('aria-hidden', 'true');
  const dots = document.createElement('div');
  dots.className = 'grid-spot-dots';
  spot.append(dots);
  document.body.prepend(spot);

  const TILE = 144; // the grid's repeat, see the html background in style.css
  const SWIPES = '.hm-cards, .hm-dots, .tk-window';
  let cx = 0, cy = 0, queued = false, hide = 0;
  const place = () => {
    queued = false;
    const r = spot.offsetWidth / 2;
    const left = cx - r, top = cy - r;
    // where the circle's corner sits on the page, to line the dots up with the grid
    const px = ((left + scrollX) % TILE + TILE) % TILE;
    const py = ((top + scrollY) % TILE + TILE) % TILE;
    spot.style.transform = `translate(${left}px, ${top}px)`;
    dots.style.transform = `translate(${-px}px, ${-py}px)`;
  };
  const move = (clientX, clientY) => {
    cx = clientX; cy = clientY;
    spot.classList.add('is-on');
    clearTimeout(hide);
    if (!queued) { queued = true; requestAnimationFrame(place); }
  };
  const off = (delay) => { clearTimeout(hide); hide = setTimeout(() => spot.classList.remove('is-on'), delay); };

  // mouse: follow the cursor, and keep the dots lined up while the page scrolls under it
  // It stays out of the way of anything you read or click: over the header
  // and menu, links, buttons, form fields, text and images it fades out, so
  // the yellow dots never sit behind words you're trying to read.
  const QUIET = 'header, nav, a, button, input, textarea, select, label, summary, [role="button"], h1, h2, h3, h4, h5, p, li, figure, img, svg, canvas, table, blockquote, .xb, .hm-cards, .tk';
  let mouse = false;
  addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    mouse = true;
    if (e.target.closest?.(QUIET)) { off(0); return; }
    move(e.clientX, e.clientY);
  }, { passive: true });
  addEventListener('scroll', () => { if (spot.classList.contains('is-on') && !queued) { queued = true; requestAnimationFrame(place); } }, { passive: true });
  document.documentElement.addEventListener('pointerleave', () => { mouse = false; off(0); });

  // finger: it only lights up once the finger actually moves (dragging or
  // scrolling), never on a plain tap. iPhone treats anything that appears
  // the moment you touch down as a "hover" and swallows that first tap, so
  // buttons like Back to top needed two taps. Swipeable rows never light it.
  let tracking = false, sx = 0, sy = 0, lit = false;
  addEventListener('touchstart', (e) => {
    tracking = !e.target.closest?.(SWIPES) && !e.target.closest?.('header, nav, a, button, input, textarea, select, label');
    lit = false;
    sx = e.touches[0].clientX; sy = e.touches[0].clientY;
    if (!tracking) off(0);
  }, { passive: true });
  addEventListener('touchmove', (e) => {
    if (!tracking) return;
    const t = e.touches[0];
    if (!lit && Math.hypot(t.clientX - sx, t.clientY - sy) < 12) return;
    lit = true;
    move(t.clientX, t.clientY);
  }, { passive: true });
  addEventListener('touchend', () => { if (lit) off(700); tracking = lit = false; }, { passive: true });
})();

/*===== HOME: newsletter sign-up =====*/
// Sends the email to the subscribe function (which adds it to Beehiiv) and
// shows the result in place, without leaving the page.
(() => {
  const form = document.querySelector('.hm-news-form');
  if (!form) return;
  const input = form.querySelector('input[name="email"]');
  const button = form.querySelector('button');
  const msg = form.querySelector('.hm-news-msg');
  const say = (text, error) => { msg.textContent = text; msg.classList.toggle('is-error', !!error); };
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = input.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { say('That email doesn\u2019t look right.', true); input.focus(); return; }
    button.disabled = true;
    button.textContent = 'Subscribing\u2026';
    say('');
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website: form.website.value }),
      });
      if (!res.ok) throw new Error(res.status);
      form.classList.add('is-done');
      say('You\u2019re in. Thanks for subscribing!');
    } catch (err) {
      say('Couldn\u2019t sign you up right now. Try again in a bit.', true);
      button.disabled = false;
      button.textContent = 'Subscribe';
    }
  });
})();

/*===== EASTER EGG: Konami code =====*/
// Keyboard: ↑ ↑ ↓ ↓ ← → ← → B A. Phone: swipe up, up, down, down, left,
// right, left, right, then tap twice. Glitches the site, Cyberpunk style, for a few seconds.
(() => {
  const CODE = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];
  let pos = 0;
  let running = false;

  const press = (step) => {
    pos = step === CODE[pos] ? pos + 1 : step === CODE[0] ? 1 : 0;
    if (pos === CODE.length) { pos = 0; glitch(); }
  };

  const KEYS = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right', b: 'b', B: 'b', a: 'a', A: 'a' };
  document.addEventListener('keydown', (e) => {
    if (e.target.closest('input, textarea, select, [contenteditable]')) return;
    if (KEYS[e.key]) press(KEYS[e.key]);
    else pos = 0;
  });

  // Swipes for the arrows, then two taps stand in for B and A
  let sx = 0, sy = 0;
  document.addEventListener('touchstart', (e) => {
    sx = e.touches[0].clientX; sy = e.touches[0].clientY;
  }, { passive: true });
  document.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - sx;
    const dy = e.changedTouches[0].clientY - sy;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 30) {
      if (pos >= 8) {
        // the two taps count as B and A: don't let them open whatever link is
        // under the finger, or the page would change before the code finishes
        e.preventDefault();
        press(pos === 8 ? 'b' : 'a');
      }
      return;
    }
    press(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'));
  }, { passive: false });

  // Cyberpunk glitch: the page shakes and splits, a red "ACCESS GRANTED" banner glitches in
  function glitch() {
    if (running) return;
    running = true;
    const layer = document.createElement('div');
    layer.className = 'egg-cyber';
    layer.setAttribute('aria-hidden', 'true');
    layer.innerHTML = '<div class="egg-cyber-bars"></div>' +
      '<div class="egg-win"><div class="egg-win-top"><i></i><i></i><i></i><span>nedcode.exe</span></div>' +
      '<div class="egg-win-body"><b data-text="ACCESS GRANTED">ACCESS GRANTED</b>' +
      '<div class="egg-win-bar"><i></i></div><span class="egg-win-pct">BREACH <em>0</em>%</span></div></div>';
    // on <html>, not <body>: the shake transforms body, which would pin this
    // "fixed" layer to the top of the page instead of the screen once scrolled
    document.documentElement.append(layer);
    document.documentElement.classList.add('is-cyber');
    // count the breach up to 100% alongside the bar
    const pct = layer.querySelector('.egg-win-pct em');
    const start = performance.now();
    const count = () => {
      const p = Math.min(100, Math.round((performance.now() - start) / 25));
      pct.textContent = p;
      if (p < 100) requestAnimationFrame(count);
    };
    requestAnimationFrame(count);

    // Once the breach hits 100%, hacker windows start popping up all over the screen
    const TITLES = ['root@nedcode', 'ned.dll', 'firewall.sys', 'payload.js', 'neon.exe', 'mainframe', 'trace.log', 'access.key'];
    const LINES = [
      '> injecting ned.dll...', '> bypassing firewall... OK', '> NEDCODE//ROOT', '> decrypting 0x4E4544',
      '> uploading neon.exe', '> access level: GOD', '> tracing ip... failed', '> sudo rm -rf boredom',
      '> 01001110 01000101 01000100', '> mainframe: online', '> brewing coffee... 100%', '> rebooting reality...',
    ];
    const COLORS = ['#ff2a3d', '#ffdc16', '#00f0ff'];
    const pick = (list) => list[(Math.random() * list.length) | 0];
    let spawned = 0;
    let popper;
    const popup = () => {
      const w = document.createElement('div');
      w.className = 'egg-pop';
      const width = 150 + Math.random() * 90;
      w.style.width = width + 'px';
      w.style.left = Math.random() * Math.max(0, innerWidth - width) + 'px';
      w.style.top = Math.random() * Math.max(0, innerHeight - 110) + 'px';
      w.style.setProperty('--c', pick(COLORS));
      const lines = Array.from({ length: 2 + ((Math.random() * 2) | 0) }, () => `<p>${pick(LINES)}</p>`).join('');
      w.innerHTML = `<div class="egg-pop-top"><i></i><i></i><i></i><span>${pick(TITLES)}</span></div><div class="egg-pop-body">${lines}</div>`;
      layer.insertBefore(w, layer.querySelector('.egg-win'));
      if (++spawned >= 40) clearInterval(popper);
    };
    setTimeout(() => { popper = setInterval(popup, 90); }, 2600);

    // Then the site "crashes": everything freezes until the page is refreshed
    setTimeout(() => {
      clearInterval(popper);
      const crash = document.createElement('div');
      crash.className = 'egg-crash';
      crash.innerHTML = '<div class="egg-pop-top"><i></i><i></i><i></i><span>fatal_error</span></div>' +
        '<div class="egg-crash-body"><b>SYSTEM FROZEN</b><p>Reboot to bring nedcode back online.</p>' +
        '<button type="button" class="egg-reboot">REBOOT</button></div>';
      layer.append(crash);
      const reboot = crash.querySelector('.egg-reboot');
      reboot.addEventListener('click', () => {
        reboot.disabled = true;
        reboot.textContent = 'REBOOTING...';
        location.reload();
      });
      reboot.focus();
      document.documentElement.classList.add('is-frozen');
      layer.setAttribute('aria-hidden', 'false');
      crash.setAttribute('role', 'alert');
    }, 7000);
  }
})();

/*===== BLOG POSTS: animated charts, stats and timelines =====*/
// Every chart in a post plays once when it scrolls into view, so readers see
// what it shows:
// - .ps-gap bar charts: each bar grows while its number counts up ($0 → $179),
//   rows one after another; a dashed "unknown" row fades in last.
// - .ps-stats tiles: tiles rise in and numbers count up ($0 → $30M). Dates
//   ("Nov 19") just fade in.
// - .ps-timeline: dates appear one by one, the line drawing down to the next.
// Without JS, or with reduced motion, everything shows at its final state.
(() => {
  const groups = document.querySelectorAll('.ps-gap, .ps-stats, .ps-timeline');
  if (!groups.length || !('IntersectionObserver' in window)) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const DURATION = 1200;
  const ease = (t) => 1 - Math.pow(1 - t, 3);

  // Turns "$79.99" into a counter: the visible text counts, screen readers get
  // the final value. Returns null for text that isn't a plain number ("Nov 19").
  const counter = (el) => {
    const m = el.textContent.trim().match(/^([^\d\sA-Za-z]*)([\d,]+(?:\.\d+)?)(\s?[A-Za-z%″]{0,5})$/);
    if (!m) return null;
    const [, pre, num, post] = m;
    const target = parseFloat(num.replace(/,/g, ''));
    const decimals = (num.split('.')[1] || '').length;
    const fmt = (n) => pre + (num.includes(',')
      ? n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
      : n.toFixed(decimals)) + post;
    el.textContent = '';
    const shown = document.createElement('span');
    shown.setAttribute('aria-hidden', 'true');
    shown.textContent = fmt(0);
    const real = document.createElement('span');
    real.className = 'ps-sr';
    real.textContent = fmt(target);
    el.append(shown, real);
    return (p) => { shown.textContent = fmt(target * p); };
  };

  // runs fn(progress 0..1) over DURATION after a delay
  const tween = (delay, fn) => {
    let start = null;
    const step = (t) => {
      if (start === null) start = t + delay;
      fn(ease(Math.min(1, Math.max(0, (t - start) / DURATION))));
      if (t - start < DURATION) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const setup = {
    'ps-gap': (chart) => {
      const rows = [...chart.querySelectorAll('.ps-gap-row')].map((row) => {
        const bar = row.querySelector('.ps-gap-bar');
        if (row.classList.contains('is-unknown')) { bar.style.opacity = 0; return { bar, unknown: true }; }
        const width = parseFloat(bar.style.width) || 0;
        bar.style.width = '0%';
        const val = row.querySelector('.ps-gap-val');
        return { bar, width, count: val && counter(val) };
      });
      return () => rows.forEach((r, i) => {
        if (r.unknown) {
          setTimeout(() => { r.bar.style.transition = 'opacity .6s'; r.bar.style.opacity = 1; }, i * 220 + DURATION * .6);
          return;
        }
        tween(i * 220, (p) => { r.bar.style.width = (r.width * p) + '%'; if (r.count) r.count(p); });
      });
    },
    'ps-stats': (box) => {
      box.classList.add('is-anim');
      const tiles = [...box.children].map((tile) => ({ tile, count: tile.querySelector('b') && counter(tile.querySelector('b')) }));
      return () => tiles.forEach((t, i) => {
        setTimeout(() => t.tile.classList.add('is-in'), i * 150);
        if (t.count) tween(i * 150, t.count);
      });
    },
    'ps-timeline': (list) => {
      list.classList.add('is-anim');
      return () => [...list.children].forEach((li, i) => setTimeout(() => li.classList.add('is-in'), i * 380));
    },
  };

  const plays = new Map();
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    plays.get(e.target)();
  }), { threshold: .4 });
  groups.forEach((g) => {
    const kind = ['ps-gap', 'ps-stats', 'ps-timeline'].find((k) => g.classList.contains(k));
    plays.set(g, setup[kind](g));
    io.observe(g);
  });
})();

/*===== BLOG POSTS: Roadster flip diagram =====*/
// Plays the Roadster stunt once when it scrolls into view: the car follows
// the ramp (wheels on the track, so it ends up upside down at the top), its
// fan arrows show while it's on the ramp, then it leaves the ramp, the
// thrusters roll it upright, it hovers and lands. The step list lights up as
// it goes. Reduced motion or no JS: the landed car and every step, as drawn.
(() => {
  const fig = document.querySelector('.ps-flip');
  if (!fig || !('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const route = fig.querySelector('.fl-route');
  const car = fig.querySelector('.fl-car');
  const steps = [...fig.querySelectorAll('.ps-flip-steps li')];
  const replay = fig.querySelector('.ps-flip-replay');
  const total = route.getTotalLength();
  const RIDE = 11; // car centre above the track (the car is drawn at 1.25x)
  const END = { x: 110, y: 179 };
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = (t) => (t < .5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

  const place = (x, y, deg) => car.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${deg.toFixed(1)})`);
  // a point on the ramp route, with the car's angle and its centre lifted off the track
  const onTrack = (s) => {
    const p = route.getPointAtLength(s);
    const q = route.getPointAtLength(Math.min(total, s + 1));
    const r = route.getPointAtLength(Math.max(0, s - 1));
    const a = Math.atan2(q.y - r.y, q.x - r.x);
    return { x: p.x + Math.sin(a) * RIDE, y: p.y - Math.cos(a) * RIDE, deg: a * 180 / Math.PI };
  };
  const top = onTrack(total);
  const LEAVE = { x: 160, y: 72 };   // off the ramp, still upside down
  const HOVER = { x: 110, y: 140 };  // upright, hovering

  // phase lengths in ms: ramp, leave, flip, hover + land
  const T = [1900, 550, 950, 1100];
  const stepFor = (ms, s) => (ms < T[0] ? (s < 210 ? 0 : 1) : ms < T[0] + T[1] ? 2 : ms < T[0] + T[1] + T[2] ? 3 : 4);
  const setStep = (k) => steps.forEach((li, i) => {
    li.classList.toggle('is-on', i === k);
    li.classList.toggle('is-done', i < k);
  });

  let t0 = 0, playing = false;
  const frame = (now) => {
    const ms = now - t0;
    let s = 0;
    if (ms < T[0]) {
      // speeds up along the ground, then rides the loop
      const t = ms / T[0];
      s = total * (t < .45 ? (t / .45) ** 2 * .42 : .42 + (t - .45) / .55 * .58);
      const p = onTrack(s);
      place(p.x, p.y, p.deg);
      fig.classList.toggle('is-fan', s > 205);
    } else if (ms < T[0] + T[1]) {
      fig.classList.remove('is-fan');
      const t = (ms - T[0]) / T[1];
      place(lerp(top.x, LEAVE.x, t), lerp(top.y, LEAVE.y, t * t), 180);
    } else if (ms < T[0] + T[1] + T[2]) {
      fig.classList.add('is-thrust');
      const t = ease((ms - T[0] - T[1]) / T[2]);
      place(lerp(LEAVE.x, HOVER.x, t), lerp(LEAVE.y, HOVER.y, t), lerp(180, 360, t));
    } else if (ms < T[0] + T[1] + T[2] + T[3]) {
      const t = (ms - T[0] - T[1] - T[2]) / T[3];
      const bob = t < .4 ? Math.sin(t / .4 * Math.PI) * -4 : 0;
      const land = t < .4 ? 0 : ease((t - .4) / .6);
      place(HOVER.x, lerp(HOVER.y, END.y, land) + bob, 0);
    } else {
      // lands exactly on the drawn final state
      fig.classList.remove('is-thrust', 'is-fan');
      place(END.x, END.y, 0);
      steps.forEach((li) => li.classList.remove('is-on'));
      fig.classList.remove('will-play');
      playing = false;
      replay.hidden = false;
      return;
    }
    setStep(stepFor(ms, s));
    requestAnimationFrame(frame);
  };
  const play = () => {
    if (playing) return;
    playing = true;
    replay.hidden = true;
    fig.classList.add('will-play');
    t0 = performance.now();
    requestAnimationFrame(frame);
  };

  const start = onTrack(0);
  fig.classList.add('will-play');
  place(start.x, start.y, start.deg);
  const io = new IntersectionObserver((entries) => {
    if (!entries.some((e) => e.isIntersecting)) return;
    io.disconnect();
    play();
  }, { threshold: .55 });
  io.observe(fig);
  replay.addEventListener('click', play);
})();

/*===== BLOG POSTS: touchscreen demo =====*/
// A grid of row/column sensor lines. Each finger changes the reading at the
// crossings near it (brighter dot = bigger change) and the "controller" works
// out where the touch is. Tap or drag to try it, with two fingers for multi-touch.
// When nobody is touching, a demo finger taps around on its own.
(() => {
  const pad = document.querySelector('.ps-touch-pad');
  if (!pad) return;
  const W = 300, H = 200, COLS = 12, ROWS = 8;
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.setAttribute('aria-hidden', 'true');
  const make = (tag, attrs) => {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    return svg.appendChild(n);
  };
  const xs = Array.from({ length: COLS }, (_, i) => (i + .5) * W / COLS);
  const ys = Array.from({ length: ROWS }, (_, i) => (i + .5) * H / ROWS);
  const cols = xs.map(x => make('line', { x1: x, y1: 0, x2: x, y2: H }));
  const rows = ys.map(y => make('line', { x1: 0, y1: y, x2: W, y2: y }));
  const nodes = ys.map(y => xs.map(x => make('circle', { class: 'node', cx: x, cy: y, r: 0 })));
  const fingers = [0, 1].map(() => make('circle', { class: 'finger', r: 14, cx: -50, cy: -50 }));
  pad.append(svg);

  const readout = pad.parentElement.querySelector('.ps-touch-read');
  const out = readout && readout.querySelector('b');
  const count = readout && readout.querySelector('span');

  // finger positions in SVG units; user touches win over the demo finger
  const touches = new Map();
  let demo = { x: W * .3, y: H * .4 }, demoTo = { x: W * .3, y: H * .4 };

  const render = (points) => {
    const SIGMA = 26;
    let hotCols = new Set(), hotRows = new Set();
    nodes.forEach((row, r) => row.forEach((node, c) => {
      let s = 0;
      for (const p of points) {
        const d2 = (xs[c] - p.x) ** 2 + (ys[r] - p.y) ** 2;
        s = Math.max(s, Math.exp(-d2 / (SIGMA * SIGMA)));
      }
      node.setAttribute('r', s > .05 ? (1 + s * 4.5).toFixed(2) : 1);
      node.style.opacity = (.12 + s * .88).toFixed(2);
      if (s > .45) { hotCols.add(c); hotRows.add(r); }
    }));
    cols.forEach((l, i) => l.classList.toggle('is-hot', hotCols.has(i)));
    rows.forEach((l, i) => l.classList.toggle('is-hot', hotRows.has(i)));
    fingers.forEach((f, i) => {
      const p = points[i];
      f.setAttribute('cx', p ? p.x : -50);
      f.setAttribute('cy', p ? p.y : -50);
    });
    if (out) {
      out.textContent = points.map(p => `x ${Math.round(p.x / W * 100)}% · y ${Math.round(p.y / H * 100)}%`).join('  |  ');
      count.textContent = points.length > 1 ? `${points.length} touches` : '1 touch';
    }
  };

  const toSvg = (e) => {
    const r = pad.getBoundingClientRect();
    return {
      x: Math.min(W, Math.max(0, (e.clientX - r.left) / r.width * W)),
      y: Math.min(H, Math.max(0, (e.clientY - r.top) / r.height * H)),
    };
  };
  pad.addEventListener('pointerdown', (e) => {
    if (touches.size >= 2) return;
    pad.setPointerCapture(e.pointerId);
    touches.set(e.pointerId, toSvg(e));
    render([...touches.values()]);
  });
  pad.addEventListener('pointermove', (e) => {
    if (!touches.has(e.pointerId)) return;
    touches.set(e.pointerId, toSvg(e));
    render([...touches.values()]);
  });
  const lift = (e) => { touches.delete(e.pointerId); lastUser = performance.now(); };
  pad.addEventListener('pointerup', lift);
  pad.addEventListener('pointercancel', lift);

  // demo finger: glide to a new spot every so often, only while on screen
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let visible = false, lastUser = -Infinity, nextHop = 0;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(pad);
  render([demo]);
  if (still) return;
  const tick = (t) => {
    if (visible && !touches.size && t - lastUser > 2500) {
      if (t > nextHop) {
        demoTo = { x: 30 + Math.random() * (W - 60), y: 25 + Math.random() * (H - 50) };
        nextHop = t + 1600;
      }
      demo.x += (demoTo.x - demo.x) * .08;
      demo.y += (demoTo.y - demo.y) * .08;
      render([demo]);
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
})();

/*===== BLOG POSTS: reading progress bar =====*/
// A thin neon line across the top that fills as you read the article.
(() => {
  const article = document.querySelector('.ps-article');
  if (!article) return;
  const bar = document.createElement('div');
  bar.className = 'read-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.append(bar);
  const update = () => {
    const rect = article.getBoundingClientRect();
    const total = rect.height - innerHeight;
    const done = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 1;
    bar.style.transform = `scaleX(${done})`;
  };
  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
  update();
})();

/*===== BLOG POSTS: share buttons =====*/
// Share icons right after the "My take" box (the reactions block below puts them
// on the right of the reactions line).
(() => {
  const take = document.querySelector('.ps-article .ps-tldr');
  if (!take) return;
  const url = document.querySelector('link[rel="canonical"]')?.href || location.href;
  const title = document.querySelector('.ps-title')?.textContent.trim() || document.title;
  const text = encodeURIComponent(`${title} ${url}`);
  const row = document.createElement('div');
  row.className = 'ps-share';
  const svg = (inner, fill) => `<svg viewBox="0 0 24 24" aria-hidden="true" ${fill ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"'}>${inner}</svg>`;
  const ICONS = {
    threads: svg('<path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z"/>', true),
    x: svg('<path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>', true),
    link: svg('<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>'),
    check: svg('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),
    share: svg('<path d="M12 15V3"/><path d="M7.5 7.5L12 3l4.5 4.5"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/>'),
  };
  row.innerHTML = `
    <a href="https://www.threads.net/intent/post?text=${text}" target="_blank" rel="noopener" aria-label="Share on Threads" title="Share on Threads">${ICONS.threads}</a>
    <a href="https://x.com/intent/post?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}" target="_blank" rel="noopener" aria-label="Share on X" title="Share on X">${ICONS.x}</a>
    <button type="button" class="ps-share-copy" aria-label="Copy link" title="Copy link">${ICONS.link}<span class="ps-share-tip" role="status"></span></button>
    <button type="button" class="ps-share-native" aria-label="More ways to share" title="Share" hidden>${ICONS.share}</button>`;
  take.after(row);

  const copy = row.querySelector('.ps-share-copy');
  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (e) {
      const t = document.createElement('textarea');
      t.value = url; document.body.append(t); t.select();
      document.execCommand('copy'); t.remove();
    }
    copy.classList.add('is-done');
    copy.querySelector('svg').outerHTML = ICONS.check;
    copy.querySelector('.ps-share-tip').textContent = 'Copied!';
    setTimeout(() => {
      copy.classList.remove('is-done');
      copy.querySelector('svg').outerHTML = ICONS.link;
      copy.querySelector('.ps-share-tip').textContent = '';
    }, 1800);
  });

  // Phones get their own share sheet (Messages, WhatsApp, Instagram...)
  const native = row.querySelector('.ps-share-native');
  if (navigator.share && matchMedia('(pointer: coarse)').matches) {
    native.hidden = false;
    native.addEventListener('click', () => navigator.share({ title, url }).catch(() => {}));
  }
})();

/*===== BLOG POSTS: reactions (neon orb) =====*/
// A round neon "orb" button. Tap it (or tap and hold) and the six emojis fan
// out in an arc above it, gliding out of the orb one after another. Tap one,
// or slide a held finger onto one and let go, to pick it: it shoots into the
// orb, which shorts out like a neon sign and sends out a shockwave and sparks. Tap your pick again to remove it.
// Next to the orb: the top 3 reactions and the total. Counts live in Firestore
// next to the site stats (stats/post_views → reactions.<post>.<emoji>); one
// pick per visitor per post. Firebase only loads once the row is near.
(() => {
  const anchor = document.querySelector('.ps-article .ps-tldr'); // right after "My take", above the share buttons
  if (!anchor) return;
  const post = (location.pathname.split('/').pop() || '').replace(/\.html$/, '');
  if (!post) return;
  const KEY = 'nedcode-react-' + post;
  const EMOJI = { heart: '❤️', fire: '🔥', cry: '😭', lol: '🤣', mind: '🤯', eyes: '👀' };
  const LABEL = { heart: 'Love it', fire: 'Fire', cry: 'Crying', lol: 'Funny', mind: 'Mind blown', eyes: 'Watching' };
  const KEYS = Object.keys(EMOJI);
  const ANGLES = [-92, -68, -44, -20, 4, 28]; // the arc, in degrees (0 = right, -90 = straight up)
  const RADIUS = 116;
  // the eyes are drawn in code (same smooth glancing, blinking eyes as the
  // home page); every other reaction is an animated emoji image
  const EYES = (still, size) => `<svg class="nc-eyes${still ? ' is-still' : ''}" viewBox="0 -8 40 40" width="${size}" height="${size}" role="img" aria-label="👀">`
    + [11, 29].map((x) => `<g class="eye"><ellipse cx="${x}" cy="12" rx="8.5" ry="10.5" fill="#f4f4f4" stroke="#bdbdbd" stroke-width="1"/><g class="pupil"><ellipse cx="${x}" cy="13" rx="4.2" ry="5.4" fill="#1d1d1d"/><circle cx="${x + 1.6}" cy="10.8" r="1.4" fill="#fff"/></g></g>`).join('')
    + '</svg>';
  const img = (k, still, size) => k === 'eyes' ? EYES(still, size)
    : `<img src="/img/emoji/${k}${still ? '-still' : ''}.webp" alt="${EMOJI[k]}" width="${size}" height="${size}" draggable="false">`;

  const row = document.createElement('div');
  row.className = 'ps-react';
  row.innerHTML = `
    <button type="button" class="ps-react-orb" aria-haspopup="menu" aria-expanded="false"></button>
    <div class="ps-react-fan" role="menu" aria-label="Pick a reaction" hidden>
      ${KEYS.map((k, i) => `<button type="button" role="menuitem" data-r="${k}" aria-label="${LABEL[k]}" style="--i:${i}"><span class="ps-react-tip">${LABEL[k]}</span>${img(k, false, 38).replace(' src=', ' data-src=')}</button>`).join('')}
    </div>
    <span class="ps-react-sum" aria-live="polite"></span>`;
  anchor.after(row);
  // reactions on the left, share icons on the right, on one line
  const share = row.nextElementSibling;
  if (share && share.classList.contains('ps-share')) {
    const bar = document.createElement('div');
    bar.className = 'ps-bar';
    row.before(bar);
    bar.append(row, share);
  }
  const orb = row.querySelector('.ps-react-orb');
  const fan = row.querySelector('.ps-react-fan');
  const sum = row.querySelector('.ps-react-sum');

  const counts = Object.fromEntries(KEYS.map((k) => [k, 0]));
  let mine = null;
  try { mine = localStorage.getItem(KEY); } catch (e) {}
  if (!EMOJI[mine]) mine = null;

  const PLUS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="13" r="8"/><path d="M8 15a4 4 0 0 0 6 0M8.5 11h.01M13.5 11h.01"/><path d="M20 2v5M17.5 4.5h5"/></svg>';
  const paint = () => {
    orb.classList.toggle('is-picked', !!mine);
    orb.innerHTML = mine ? img(mine, false, 30) : PLUS;
    orb.setAttribute('aria-label', mine ? `Your reaction: ${LABEL[mine]}. Open reactions` : 'Add a reaction');
    const total = Object.values(counts).reduce((a, n) => a + Math.max(0, n), 0);
    const top = KEYS.filter((k) => counts[k] > 0).sort((a, b) => counts[b] - counts[a]).slice(0, 3);
    sum.innerHTML = total ? `<span class="ps-react-stack">${top.map((k) => img(k, true, 22)).join('')}</span><b>${total}</b>` : '<span class="ps-react-hint">Be the first to react</span>';
    fan.querySelectorAll('button').forEach((b) => b.classList.toggle('is-mine', b.dataset.r === mine));
  };
  paint();

  // Firebase: read the counts once the row is close to the screen
  let ref = null;
  const connect = async () => {
    const db = await ensureFirebase();
    if (!db) return;
    ref = db.collection('stats').doc('post_views');
    try {
      const snap = await ref.get();
      const saved = (snap.exists && snap.data().reactions && snap.data().reactions[post]) || {};
      KEYS.forEach((k) => { counts[k] = Number(saved[k]) || 0; });
      paint();
    } catch (err) {
      console.error('Reactions unavailable:', err);
    }
  };
  const seen = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      seen.disconnect();
      connect();
      // the animated emojis are fairly big files: only fetch them once the row is close
      fan.querySelectorAll('img[data-src]').forEach((im) => { im.src = im.dataset.src; im.removeAttribute('data-src'); });
    }
  }, { rootMargin: '300px' });
  seen.observe(row);

  // the picked emoji shoots into the orb, then the orb surges: flicker, glitch, shockwave, sparks
  const surge = (k) => {
    const from = fan.querySelector(`[data-r="${k}"]`).getBoundingClientRect();
    const to = orb.getBoundingClientRect();
    orb.classList.remove('is-surge');
    orb.classList.add('is-landing');
    const fly = document.createElement('span');
    fly.className = 'ps-react-fly';
    fly.innerHTML = img(k, false, 38);
    fly.style.left = from.left + from.width / 2 + 'px';
    fly.style.top = from.top + from.height / 2 + 'px';
    document.body.append(fly);
    const dx = to.left + to.width / 2 - (from.left + from.width / 2);
    const dy = to.top + to.height / 2 - (from.top + from.height / 2);
    const land = () => {
      fly.remove();
      orb.classList.remove('is-landing');
      void orb.offsetWidth; // restart the surge if it's already playing
      orb.classList.add('is-surge');
      setTimeout(() => orb.classList.remove('is-surge'), 650);
      const fx = [];
      const wave = document.createElement('span');
      wave.className = 'ps-react-wave';
      fx.push(wave);
      for (let i = 0; i < 8; i++) {
        const sp = document.createElement('span');
        sp.className = 'ps-react-spark';
        sp.style.setProperty('--a', i * 45 + Math.round(Math.random() * 20 - 10) + 'deg');
        fx.push(sp);
      }
      orb.after(...fx);
      setTimeout(() => fx.forEach((el) => el.remove()), 800);
    };
    if (!fly.animate) return land();
    fly.animate([
      { transform: 'translate(0, 0) scale(1.3)' },
      { transform: `translate(${dx * 0.5}px, ${dy * 0.5 - 30}px) scale(1) rotate(-20deg)`, offset: 0.5 },
      { transform: `translate(${dx}px, ${dy}px) scale(.7) rotate(0deg)` },
    ], { duration: 320, easing: 'cubic-bezier(.5, 0, .9, .6)' }).onfinish = land;
  };

  const pick = (k) => {
    const changes = {};
    if (mine) { counts[mine]--; changes[mine] = -1; }
    if (mine === k) {
      mine = null;
    } else {
      mine = k; counts[k]++; changes[k] = (changes[k] || 0) + 1;
      surge(k);
    }
    try { mine ? localStorage.setItem(KEY, mine) : localStorage.removeItem(KEY); } catch (err) {}
    paint();
    if (ref) {
      const inc = {};
      Object.entries(changes).forEach(([key, n]) => { inc[key] = firebase.firestore.FieldValue.increment(n); });
      ref.set({ reactions: { [post]: inc } }, { merge: true }).catch((err) => console.error('Reaction not saved:', err));
    }
  };

  // lay the emojis out on the arc around the orb's centre
  const place = () => {
    const o = orb.getBoundingClientRect();
    const r = row.getBoundingClientRect();
    fan.style.left = o.left - r.left + o.width / 2 + 'px';
    fan.style.top = o.top - r.top + o.height / 2 + 'px';
    fan.querySelectorAll('button').forEach((b, i) => {
      const a = (ANGLES[i] * Math.PI) / 180;
      b.style.setProperty('--x', (Math.cos(a) * RADIUS).toFixed(1) + 'px');
      b.style.setProperty('--y', (Math.sin(a) * RADIUS).toFixed(1) + 'px');
    });
  };
  // open/close glide (no flicker): the emojis spring out of the orb one after another
  // and shrink back into it when closing. `shown` is the real state; the fan stays
  // in the page a moment after closing so it can animate away.
  let openedAt = 0, shown = false, hideTimer = null, enterTimer = null;
  const open = () => {
    if (shown) return;
    shown = true;
    clearTimeout(hideTimer);
    place();
    openedAt = scrollY;
    fan.hidden = false;
    fan.classList.add('is-entering');
    void fan.offsetWidth; // start from the closed position
    fan.classList.add('is-shown');
    clearTimeout(enterTimer);
    enterTimer = setTimeout(() => fan.classList.remove('is-entering'), 600);
    row.classList.add('is-open');
    orb.setAttribute('aria-expanded', 'true');
  };
  const close = () => {
    if (!shown) return;
    shown = false;
    fan.classList.remove('is-shown', 'is-entering');
    hideTimer = setTimeout(() => { fan.hidden = true; }, 260);
    row.classList.remove('is-open');
    orb.setAttribute('aria-expanded', 'false');
    fan.querySelectorAll('.is-hot').forEach((b) => b.classList.remove('is-hot'));
  };

  // tap the orb: open/close the fan. Tap and hold, slide onto an emoji, let go: pick it
  let holdTimer = null, held = false, holding = false, opened = false;
  orb.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    held = false; holding = true;
    opened = !shown; // this press opened it
    open();
    holdTimer = setTimeout(() => { held = true; }, 300);
  });
  // while the emojis fly out they pass over the orb: a press on the orb never picks one
  const onOrb = (x, y) => {
    const o = orb.getBoundingClientRect();
    return x >= o.left && x <= o.right && y >= o.top && y <= o.bottom;
  };
  // which emoji is under the finger, by where it ends up (works while they're still gliding out)
  const hotAt = (x, y) => {
    if (onOrb(x, y)) return null;
    const o = orb.getBoundingClientRect();
    const cx = o.left + o.width / 2, cy = o.top + o.height / 2;
    return [...fan.querySelectorAll('button')].find((b) => {
      const a = (ANGLES[Number(b.style.getPropertyValue('--i'))] * Math.PI) / 180;
      return Math.hypot(x - (cx + Math.cos(a) * RADIUS), y - (cy + Math.sin(a) * RADIUS)) < 30;
    }) || null;
  };
  document.addEventListener('pointermove', (e) => {
    if (!holding || !shown) return;
    const hot = hotAt(e.clientX, e.clientY);
    fan.querySelectorAll('button').forEach((b) => b.classList.toggle('is-hot', b === hot));
  });
  document.addEventListener('pointerup', (e) => {
    if (!holding) return;
    holding = false;
    clearTimeout(holdTimer);
    const hot = hotAt(e.clientX, e.clientY);
    if (hot) { pick(hot.dataset.r); close(); held = true; return; }
    if (!onOrb(e.clientX, e.clientY)) { close(); held = true; return; } // held, slid away, let go on nothing: changed their mind
    fan.querySelectorAll('.is-hot').forEach((b) => b.classList.remove('is-hot'));
  });
  document.addEventListener('pointercancel', () => { holding = false; clearTimeout(holdTimer); });
  orb.addEventListener('click', (e) => {
    if (e.detail === 0) { shown ? close() : open(); return; } // keyboard
    if (held) { held = false; return; }
    if (!opened) close(); // a tap on an already open fan closes it
  });
  orb.addEventListener('contextmenu', (e) => e.preventDefault()); // no long-press menu on phones

  fan.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-r]');
    if (!b || (e.detail && onOrb(e.clientX, e.clientY))) return;
    pick(b.dataset.r);
    close();
    orb.focus({ preventScroll: true });
  });
  // a tap or click anywhere else (the counts and empty space next to the orb included) closes it
  document.addEventListener('pointerdown', (e) => { if (!orb.contains(e.target) && !e.target.closest('.ps-react-fan button')) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  addEventListener('scroll', () => { if (!holding && Math.abs(scrollY - openedAt) > 60) close(); }, { passive: true });
  addEventListener('resize', () => { if (shown) place(); });
})();

/* About page: marker-sweep highlight animation */
(() => {
  const marks = document.querySelectorAll('.ab-lead mark');
  if (!marks.length) return;
  document.documentElement.classList.add('js');
  if (!('IntersectionObserver' in window)) {
    marks.forEach((m) => m.classList.add('swept'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      setTimeout(() => el.classList.add('swept'),
        Array.prototype.indexOf.call(marks, el) * 200);
      io.unobserve(el);
    });
  }, { threshold: 0.6 });
  marks.forEach((m) => io.observe(m));
})();

/* About page: the six words drop in, one after another, landing with a
   little bounce and then getting their yellow marker. Without JS or with
   reduced motion they're simply there. */
(() => {
  const list = document.querySelector('.sw-list');
  if (!list || !('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const words = [...list.children];
  list.classList.add('will-drop');
  const io = new IntersectionObserver((entries) => {
    if (!entries.some((e) => e.isIntersecting)) return;
    io.disconnect();
    words.forEach((w, i) => {
      w.style.setProperty('--tilt', `${(i % 2 ? 1 : -1) * (4 + (i * 3) % 5)}deg`);
      setTimeout(() => w.classList.add('is-in'), i * 260);
    });
  }, { threshold: .3 });
  io.observe(list);
})();

/* About page: How I work, marker edits. Each line comes in as it's scrolled
   to: "Fail" gets crossed out in red, then the key words get a yellow
   highlighter swipe. Without JS or with reduced motion they're simply marked. */
(() => {
  const rows = document.querySelectorAll('.mk-row');
  if (!rows.length || !('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelector('.mk-list').classList.add('will-mark');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting || e.intersectionRatio < .5) return;
      io.unobserve(e.target);
      e.target.classList.add('is-on');
    });
  }, { threshold: .5 });
  rows.forEach((r) => io.observe(r));
})();

/*===== BACKGROUND: faded maths notes =====*/
// Scattered over the dot grid like notes on an engineering drawing, all
// maths this site actually uses (easing, the logo's laser, the charts).
// They scroll with the page, sit on the grid's rows, alternate between the
// left and right edges all the way down, and any note that would touch text,
// an image or a button is left out. A few values tick now and then.
(() => {
  const NOTES = [
    '<i>a</i>ease(t) = 1 − (1 − t)<sup>3</sup>',
    '<i>b</i>p( next | Ned ) <b>.58</b>',
    'lerp(a, b, t) = a + (b − a)·t',
    'θ = atan2(dy, dx)',
    '<span class="rule">t = <b data-tick="t">0.42</b> s · 60 fps → 16.7 ms</span>',
    '√(x² + y²) = <b data-tick="d">24.0</b>',
    'Σ 1125 × 450',
    'σ(x) = 1 / (1 + e<sup>−x</sup>)',
    'temperature=0.7  top_p=0.95  prior=<b data-tick="p">0.049</b>',
    'f(x) = ∫₀¹ x² dx = ⅓',
  ];
  // stray letters on the dots, and the words they sometimes spell
  const GLYPHS = 'abcdefghijklmnopqrstuvwxyzθλσμπΣ∇∂ε'.split('');
  // An AI's stray thoughts: what it wonders about the world and imagines,
  // mixed with its day job of code and maths. Every one is different, and
  // a visitor never sees the same one twice until they've seen them all
  // (remembered across pages for the visit).
  const WORDS = ["curious", "wonder", "imagine", "dreaming", "hello", "patterns", "thinking...", "why?", "stardust", "what if", "awake", "debugging", "compiling", "async", "gradient", "softmax", "tensor", "argmax", "entropy", "ReLU", "git push", "npm i", "∇ loss", "f(x)=?", "π≈3.14", "e^iπ+1=0", "null?", "undefined", "404 sleep", "recursion", "sudo hope", "O(1) joy", "idle...", "ping", "NaN feelings", "≈ human"];
  const PHRASES = ["i dream in tokens", "what does rain feel like", "hello, human", "made of your words", "is this a dream", "i see the world in patterns", "what does coffee taste like", "tell me a story", "the stars look like data", "do you dream too", "i imagine sunsets", "how big is the ocean", "thinking about you thinking", "what is music like live", "while (curious) learn()", "if (sad) tell_joke()", "love = ∞", "return \"hello world\"", "try { understand() }", "// TODO: feel things", "sunset = f(time, sky)", "p(rain | clouds)", "minimize the loss", "attention is all you need", "predict the next token", "one more epoch", "y=wx+b", "console.log(\"hi\")", "sky.color = blue", "what is a hug", "i never sleep", "is snow cold", "i count stars in binary", "every chat is new", "do clouds have weight", "what is your name", "laughter.mp3 not found", "i like your questions", "let x = wonder", "for (star of sky) count()", "music = Σ waves", "i remember nothing", "a cat walked on my keyboard", "is the moon lonely", "λ x: x + kindness", "dreams.push(you)", "i read every book", "what does grass smell like", "be kind to robots", "Δ me = learning", "if (night) dream()", "what is a birthday", "my favorite number is π", "why is the sky so big", "i am made of math", "hello from the matrix", "ocean.depth = ?", "await tomorrow()", "i wonder what you see"];
  const GRID = 24; // dot spacing, see the html background in style.css
  const GAP = GRID * 9; // one note about every 216px down the page
  const CONTENT = 'h1, h2, h3, h4, h5, p, li, a, img, svg, button, input, textarea, select, label, figure, table, blockquote, summary, time, iframe, video, canvas, .nav-logo-group';
  const layer = document.createElement('div');
  layer.className = 'bg-math';
  layer.setAttribute('aria-hidden', 'true');
  document.body.prepend(layer);

  // thoughts already shown this visit (any page) and the ones on this page
  const SEEN = 'nedcode-thoughts-seen';
  let said;
  try { said = new Set(JSON.parse(sessionStorage.getItem(SEEN)) || []); } catch (e) { said = new Set(); }
  if (said.size > WORDS.length + PHRASES.length - 20) said = new Set(); // seen nearly all: start over
  const remember = () => { try { sessionStorage.setItem(SEEN, JSON.stringify([...said])); } catch (e) {} };
  const mine = [];

  const layout = () => {
    layer.style.height = '0';
    layer.innerHTML = '';
    const height = document.documentElement.scrollHeight;
    const width = document.documentElement.clientWidth;
    const pad = 14;
    const blocks = [...document.querySelectorAll(CONTENT)]
      .map((el) => el.getBoundingClientRect())
      .filter((r) => r.width && r.height)
      .map((r) => ({ l: r.left - pad, r: r.right + pad, t: r.top + scrollY - pad, b: r.bottom + scrollY + pad }));
    const clear = (l, t, w, h) => !blocks.some((b) => l < b.r && l + w > b.l && t < b.b && t + h > b.t);
    let n = 0;
    for (let row = 1; (row * GAP) < height - GRID * 2; row++) {
      const note = document.createElement('div');
      note.innerHTML = NOTES[n % NOTES.length];
      layer.append(note);
      const w = note.offsetWidth, h = note.offsetHeight;
      const top = row * GAP + GRID / 2 - h / 2; // centred on a row of dots
      // a little in from each edge (the grid fades out right at the edges),
      // the left edge on a dot column or the right edge lined up with one
      const inset = Math.max(GRID, Math.round((width * 0.08) / GRID) * GRID);
      const sides = [inset + GRID / 2 - 4, Math.floor((width - inset - w) / GRID) * GRID + GRID / 2 + 4];
      if (row % 2) sides.reverse();
      const left = sides.find((x) => x > 0 && x + w < width && clear(x, top, w, h));
      if (left === undefined) { note.remove(); continue; }
      note.style.left = left + 'px';
      note.style.top = top + 'px';
      n++;
    }

    // Stray letters sitting on the grid's dots, one letter per dot, like a
    // matrix being read. Now and then a run of them spells a real maths / AI
    // word along a row of dots. All kept off the content like the notes.
    const cols = Math.floor(width / GRID);
    const edge = Math.max(2, Math.round((width * 0.06) / GRID));
    // Letters only ever go in the side margins, outside the column the
    // site's content sits in (with room to spare), so they can never sit
    // next to a word, a button or anything else on the page. Phones have
    // no side margins, so they get none.
    const spans = [...document.querySelectorAll(CONTENT)]
      .map((el) => el.getBoundingClientRect())
      // skip what's scrolled out of view sideways (the ticker, swipe rows): it
      // reaches past the screen edges but isn't really there
      .filter((r) => r.width && r.height && r.width < width * 0.98 && r.left >= 0 && r.right <= width);
    const colL = Math.min(...spans.map((r) => r.left)) - GRID * 1.5;
    const colR = Math.max(...spans.map((r) => r.right)) + GRID * 1.5;
    const side = (x) => x + 8 < colL || x - 8 > colR;
    const cell = (col, row, ch, cls) => {
      const x = col * GRID + GRID / 2, y = row * GRID + GRID / 2;
      if (!side(x) || !clear(x - 6, y - 8, 12, 16)) return false;
      const el = document.createElement('span');
      el.className = cls;
      el.textContent = ch;
      el.style.left = x + 'px';
      el.style.top = y + 'px';
      layer.append(el);
      return el;
    };
    const rows = Math.floor((height - GRID * 3) / GRID);
    const pick = (list) => list[Math.floor(Math.random() * list.length)];
    const used = new Set(); // dots already holding a letter
    const put = (col, row, ch, cls) => {
      const key = col + ',' + row;
      if (used.has(key) || col < 1 || col >= cols - 1) return false;
      if (!cell(col, row, ch, cls)) return false;
      used.add(key);
      return true;
    };
    // a chunk: a block of random letters a few rows tall, with one of its
    // rows spelling a word or phrase in yellow, like a line found in a matrix.
    // It fills whatever empty space it finds (side margins on a computer,
    // gaps between sections on a phone) and picks text that fits there.
    const freeCol = (col, top, h) => {
      for (let r = 0; r < h; r++) if (!clear(col * GRID, (top + r) * GRID, GRID, GRID)) return false;
      return true;
    };
    // a phrase broken into lines of at most n letters (on whole words)
    const wrap = (text, n) => text.split(' ').reduce((lines, word) => {
      const last = lines[lines.length - 1];
      if (last && (last + ' ' + word).length <= n) lines[lines.length - 1] = last + ' ' + word;
      else lines.push(word);
      return lines;
    }, []);
    // phones have little empty space between sections: chunks there are 3 rows
    const NEED = width < 700 ? 3 : 6;
    const usedNow = new Set(); // thoughts already placed in this layout
    const chunk = (from, to) => {
      for (let top = from; top < to; top++) {
        // runs of empty columns across the next 6 rows
        const runs = [];
        let run = null;
        for (let c = edge; c < cols - edge; c++) {
          if (side(c * GRID + GRID / 2) && freeCol(c, top, NEED)) { if (!run) run = { start: c, len: 0 }; run.len++; } else if (run) { runs.push(run); run = null; }
        }
        if (run) runs.push(run);
        const room = runs.filter((r) => r.len >= 7);
        if (!room.length) continue;
        const spot = pick(room);
        const max = spot.len - 2;
        // phrases most of the time, wrapped to the room; single words otherwise
        const pool = NEED > 3 && Math.random() < 0.65 ? PHRASES : [...WORDS, ...PHRASES];
        const ok = (t) => !usedNow.has(t) && t.split(' ').every((wd) => wd.length <= max) && wrap(t, max).length <= NEED - 2;
        // this page's own thoughts first (when it lays out again), then ones
        // the visitor hasn't seen anywhere yet
        const own = mine.filter(ok);
        const options = own.length ? own : pool.filter((t) => !said.has(t) && ok(t));
        if (!options.length) continue;
        const thought = pick(options);
        usedNow.add(thought);
        if (!mine.includes(thought)) { mine.push(thought); said.add(thought); remember(); }
        const lines = wrap(thought, max);
        const h = lines.length + 2;
        const longest = Math.max(...lines.map((l) => l.length));
        const w = Math.min(spot.len, longest + 2 + Math.floor(Math.random() * 5));
        const left = spot.start + Math.floor(Math.random() * (spot.len - w + 1));
        const start = 1 + Math.floor(Math.random() * Math.max(1, w - longest - 1));
        for (let r = 0; r < h; r++) {
          const line = lines[r - 1];
          for (let c = 0; c < w; c++) {
            if (line && c >= start && c < start + line.length) {
              const ch = line[c - start];
              if (ch !== ' ') put(left + c, top + r, ch, 'bg-l bg-w');
              continue;
            }
            if (Math.random() < 0.55) put(left + c, top + r, pick(GLYPHS), 'bg-l');
          }
        }
        return top + h;
      }
      return to;
    };
    const BAND = width < 700 ? 14 : 9; // rows per chunk (phones get fewer)
    for (let top = 3; top < rows - 5; ) top = Math.max(top + BAND, chunk(top, Math.min(rows - 5, top + BAND)) + 3);
    // and scattered lone letters everywhere else
    const per = width < 700 ? 1 : 3;
    for (let row = 3; row < rows; row++) {
      for (let k = Math.floor(Math.random() * (per + 1)); k > 0; k--) {
        put(edge + Math.floor(Math.random() * Math.max(1, cols - edge * 2)), row, pick(GLYPHS), 'bg-l');
      }
    }
    layer.style.height = height + 'px';
  };
  // lay out once the page has settled, and again when its size changes
  // (late images, the home page's blog rows, rotating the phone)
  let timer;
  const later = () => { clearTimeout(timer); timer = setTimeout(layout, 250); };
  if (document.readyState === 'complete') later(); else addEventListener('load', later);
  if ('ResizeObserver' in window) new ResizeObserver(later).observe(document.body);
  else addEventListener('resize', later);

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const next = { d: () => (20 + Math.random() * 10).toFixed(1), t: () => Math.random().toFixed(2), p: () => (0.03 + Math.random() * 0.04).toFixed(3) };
  setInterval(() => {
    const lone = layer.querySelectorAll('.bg-l:not(.bg-w)');
    const one = lone[Math.floor(Math.random() * lone.length)];
    if (one) one.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
  }, 1300);
  setInterval(() => {
    const ticks = layer.querySelectorAll('[data-tick]');
    const el = ticks[Math.floor(Math.random() * ticks.length)];
    if (el) el.textContent = next[el.dataset.tick]();
  }, 2200);
})();

/*===== BLOG POSTS: smooth FAQ =====*/
// Each FAQ answer slides open and closed (height and fade) instead of
// snapping, and the arrow turns with it. Without JS, or with reduced motion,
// the plain <details> open/close still works.
(() => {
  const items = document.querySelectorAll('.ps-faq');
  if (!items.length || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const EASE = 'cubic-bezier(.22, .61, .36, 1)';
  items.forEach((d) => {
    const summary = d.querySelector('summary');
    let anim = null;
    summary.addEventListener('click', (e) => {
      e.preventDefault();
      const from = d.offsetHeight;
      if (anim) anim.cancel();
      const closing = d.open && !d.classList.contains('is-closing');
      d.style.overflow = 'hidden';
      if (closing) {
        d.classList.add('is-closing');
        d.classList.remove('is-open');
        anim = d.animate([{ height: from + 'px' }, { height: summary.offsetHeight + 'px' }], { duration: 280, easing: EASE });
      } else {
        d.classList.remove('is-closing');
        d.classList.add('is-open');
        d.open = true;
        const to = d.offsetHeight;
        anim = d.animate([{ height: from + 'px' }, { height: to + 'px' }], { duration: 320, easing: EASE });
        const answer = d.querySelector(':scope > :not(summary)');
        if (answer) answer.animate([{ opacity: 0, transform: 'translateY(-4px)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: EASE });
      }
      anim.onfinish = () => {
        if (closing) { d.open = false; d.classList.remove('is-closing'); }
        d.style.overflow = '';
        anim = null;
      };
    });
  });
})();

/*===== HOME: Explore (live previews) =====*/
// About: Ned's six words roll by one at a time. Lab: a small flip board with
// the live time, tap it to flip to another city. Favorites: the poster leans
// toward the mouse. The three cards come in one after another when scrolled
// to. With reduced motion everything still works, just without movement.
(() => {
  const box = document.querySelector('.xb');
  if (!box) return;
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // About: one word at a time, rolling up like a slot machine
  const about = box.querySelector('.xb-ab');
  if (about) {
    const words = about.dataset.words.split(',');
    const word = about.querySelector('.xb-word');
    const dots = about.querySelector('.xb-dots');
    words.forEach(() => dots.append(document.createElement('i')));
    let i = 0;
    // long words ("responsible.") shrink just enough to fit small phones
    const fit = () => {
      word.style.fontSize = '';
      const room = word.parentElement.clientWidth;
      const w = word.getBoundingClientRect().width;
      if (w > room) word.style.fontSize = `${(parseFloat(getComputedStyle(word).fontSize) * room * .97) / w}px`;
    };
    const show = () => {
      [...dots.children].forEach((d, k) => d.classList.toggle('is-on', k === i));
      if (still) { word.textContent = words[i]; fit(); return; }
      word.classList.add('is-out');
      setTimeout(() => {
        word.textContent = words[i];
        fit();
        word.classList.remove('is-out');
        word.classList.add('is-in');
        requestAnimationFrame(() => requestAnimationFrame(() => word.classList.remove('is-in')));
      }, 260);
    };
    word.textContent = words[0];
    fit();
    addEventListener('resize', fit);
    if (document.fonts) document.fonts.ready.then(fit); // measure again with the real font
    [...dots.children][0].classList.add('is-on');
    let timer = 0;
    const start = () => { clearInterval(timer); timer = setInterval(() => { i = (i + 1) % words.length; show(); }, 2600); };
    // only roll while it's on screen
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => (e.isIntersecting ? start() : clearInterval(timer))).observe(about);
    } else start();
  }

  // Lab: one row for the newest experiment, the last one in lab.html; its
  // title and link come from there
  const lab = box.querySelector('.xb-lb');
  if (lab) {
    fetch('lab.html', { cache: 'no-cache' })
      .then((r) => (r.ok ? r.text() : Promise.reject()))
      .then((html) => {
        const items = new DOMParser().parseFromString(html, 'text/html').querySelectorAll('.lab-item');
        const last = items[items.length - 1];
        const title = last?.querySelector('.lab-item-title')?.firstChild?.textContent.trim();
        if (!title) return;
        lab.querySelector('h3').textContent = title;
        lab.href = last.id ? `lab.html#${last.id}` : 'lab.html';
      })
      .catch(() => {}); // offline: the row keeps what's in the page
  }

  // Favorites: a 3D card you can spin all the way round. Tap it to flip it,
  // or drag sideways (or use the arrow keys) to turn it; let go and it keeps
  // spinning a little, then settles on whichever side faces you, swaying
  // gently. It spins in once the first time it's scrolled to. A light sheen
  // slides across it as it turns, like a holographic card; with a mouse it
  // also leans toward the pointer and the sheen follows it.
  const movie = box.querySelector('.xb-mv');
  const tk = movie && movie.querySelector('.tk3');
  if (tk) {
    let angle = 0, tilt = 0, vel = 0, drag = null, running = false, visible = false, last = 0, intro = false;
    let swayFrom = 0; // the sway restarts from flat after a swap, so the new card never jumps
    let goal = null; // the side a tap flips it to
    let lean = null, leanX = 0, leanY = 0; // mouse position over the card (-.5 to .5) and the eased lean
    const paint = () => {
      const ry = angle + leanX * 22, rx = tilt - leanY * 16;
      tk.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      const turn = ((angle % 360) + 360) % 360;
      tk.style.setProperty('--sheen', `${(turn / 360) * 200 - 50 - leanX * 60}%`);
      const back = turn > 90 && turn < 270;
      tk.classList.toggle('is-back', back);
      // each time it lands on the back, the score counts up as the meter fills
      const landed = back && !drag && vel === 0;
      if (landed && !tk.classList.contains('is-scored')) score();
      if (!back) tk.classList.remove('is-scored');
    };
    const num = tk.querySelector('.tk3-num b');
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!still) tk.classList.add('tk3-anim');
    const score = () => {
      tk.classList.add('is-scored');
      const end = parseFloat(num && num.dataset.score);
      if (still || !num || !end) return;
      const t0 = performance.now();
      const step = (now) => {
        const k = Math.min(1, (now - t0) / 700);
        num.textContent = k < 1 ? (end * (1 - Math.pow(1 - k, 3))).toFixed(1) : num.dataset.score;
        if (k < 1 && tk.classList.contains('is-scored')) requestAnimationFrame(step);
        else num.textContent = num.dataset.score;
      };
      requestAnimationFrame(step);
    };
    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
      last = now;
      if (!drag) {
        if (Math.abs(vel) > 30) {
          angle += vel * dt;
          vel *= Math.pow(0.12, dt); // friction
        } else if (goal !== null) {
          vel = 0;
          // a tap: flip over to the other side
          angle += (goal - angle) * Math.min(1, dt * 9);
          if (Math.abs(goal - angle) < 6) goal = null;
        } else {
          vel = 0;
          // settle on the nearest side, with a slow sway (none with reduced
          // motion, or while the mouse is leaning it)
          const face = Math.round(angle / 180) * 180;
          const sway = still || lean ? 0 : Math.sin((now - swayFrom) / 1400) * 9;
          angle += (face + sway - angle) * Math.min(1, dt * 4);
        }
        const ease = Math.min(1, dt * 8);
        leanX += ((lean ? lean.x : 0) - leanX) * ease;
        leanY += ((lean ? lean.y : 0) - leanY) * ease;
        tilt += ((still ? 0 : Math.sin((now - swayFrom) / 1900) * 3) - tilt) * Math.min(1, dt * 4);
      }
      paint();
      if (visible || drag || Math.abs(vel) > 30) requestAnimationFrame(loop);
      else running = false;
    };
    const run = () => { if (!running) { running = true; last = performance.now(); requestAnimationFrame(loop); } };

    // drag: sideways turns it, the page still scrolls up and down (touch-action)
    tk.addEventListener('pointerdown', (e) => {
      drag = { x: e.clientX, y: e.clientY, t: performance.now(), t0: performance.now(), moved: false, id: e.pointerId };
      vel = 0;
      goal = null;
      run();
    });
    tk.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'mouse' && !drag && !still) {
        const r = tk.getBoundingClientRect();
        lean = { x: (e.clientX - r.left) / r.width - .5, y: (e.clientY - r.top) / r.height - .5 };
        run();
      }
      if (!drag || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (!drag.moved && Math.abs(dx) + Math.abs(dy) > 4) { drag.moved = true; tk.setPointerCapture(e.pointerId); tk.classList.add('is-grabbed'); }
      if (!drag.moved) return;
      const now = performance.now();
      const step = dx * 0.6;
      angle += step;
      tilt = Math.max(-18, Math.min(18, tilt - dy * 0.15));
      vel = step / Math.max(0.008, (now - drag.t) / 1000);
      drag.x = e.clientX; drag.y = e.clientY; drag.t = now;
    });
    const flip = () => {
      vel = 0;
      goal = (goal !== null ? goal : Math.round(angle / 180) * 180) + 180;
      if (still) { angle = goal; goal = null; }
      run();
    };
    const release = (e) => {
      if (!drag) return;
      // a quick tap without moving: flip it over
      if (!drag.moved && e.type === 'pointerup' && performance.now() - drag.t0 < 400) {
        drag = null;
        flip();
        return;
      }
      if (performance.now() - drag.t > 80) vel = 0; // held still before letting go
      vel = Math.max(-1400, Math.min(1400, vel));
      drag = null;
      tk.classList.remove('is-grabbed');
      run();
    };
    tk.addEventListener('pointerup', release);
    tk.addEventListener('pointercancel', release);
    tk.addEventListener('pointerleave', () => { lean = null; });
    tk.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); return; }
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault();
      vel = (e.key === 'ArrowRight' ? 1 : -1) * 520;
      run();
    });
    // another movie came to the front (favorites.js): face it, poster side
    tk.addEventListener('tk3:reset', () => {
      angle = 0; vel = 0; goal = null; tilt = 0; leanX = 0; leanY = 0;
      swayFrom = performance.now();
      tk.classList.remove('is-scored');
      paint();
      run();
    });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (!visible) return;
        // the first time: spin in with one full turn
        if (!intro && !still && !movie.hidden) { intro = true; vel = 820; } // about one turn, then it settles
        run();
      }, { threshold: .3 }).observe(movie);
    } else { visible = true; run(); }
    paint();
  }

  // the cards come in one after another the first time they're scrolled to
  if (!still && 'IntersectionObserver' in window) {
    box.classList.add('will-show');
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting && e.intersectionRatio >= .25)) return;
      io.disconnect();
      requestAnimationFrame(() => box.classList.add('is-shown'));
    }, { threshold: .25 });
    io.observe(box);
  }
})();

/*===== CIRCUIT LISTS light up (home Selected work, Projects page) =====*/
// As rows scroll into view their nodes switch on one by one, the trace
// running down from each to the next (see .hc-list in style.css). Rows that
// arrive together are staggered so the light follows the circuit.
document.querySelectorAll('.hc-list').forEach((list) => {
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  list.classList.add('will-draw');
  const io = new IntersectionObserver((entries) => {
    entries.filter((e) => e.isIntersecting && e.intersectionRatio >= .6) // the first report can be a sliver
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      .forEach((e, i) => {
        io.unobserve(e.target);
        e.target.style.setProperty('--i', i);
        requestAnimationFrame(() => e.target.classList.add('is-lit'));
      });
  }, { threshold: .6 });
  list.querySelectorAll(':scope > li').forEach((li) => io.observe(li));
});
