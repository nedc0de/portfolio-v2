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

if (textArea) {
  textArea.addEventListener('input', countCharacters);
  textArea.setAttribute('maxlength', maxNumOfChars);
  countCharacters();
}

/*===== BACK TO TOP BUTTON =====*/
const createBackToTopButton = () => {
  const button = document.createElement('button');
  button.innerHTML = '<i class="uil uil-arrow-up"></i>';
  button.className = 'back-to-top-btn';
  button.id = 'backToTopBtn';
  button.title = 'Back to top';
  document.body.appendChild(button);
  return button;
};

const backToTopBtn = createBackToTopButton();

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
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

  const tick = async () => {
    if (document.visibilityState === 'hidden') return;
    await heartbeat();
    if (!panel) return; // only the Lab page reads the numbers
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

document.addEventListener('DOMContentLoaded', () => {
  initFirebaseAndData();
  initSiteStats();
});

/*===== HOME: BLOG TICKER =====*/
// Montreal time + a scrolling loop of Ned's latest blog posts, read from blog.html
// (so a new post shows up here automatically once it's on the blog page)
(() => {
  const ZONE = 'America/Toronto';
  const boardClock = document.querySelector('.hm-clock');
  const box = document.querySelector('.tk');
  if (!box) return;
  const clock = box.querySelector('.tk-clock');
  const track = box.querySelector('.tk-track');

  const tickClock = () => {
    const now = new Date();
    clock.textContent = now.toLocaleTimeString('en-US', { timeZone: ZONE, hour: 'numeric', minute: '2-digit' });
    if (boardClock) boardClock.textContent = now.toLocaleTimeString('en-GB', { timeZone: ZONE, hour: '2-digit', minute: '2-digit' });
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
  document.addEventListener('visibilitychange', () => { if (!document.hidden) release(); });
  window.addEventListener('pageshow', release);

  fetch('blog.html')
    .then((r) => (r.ok ? r.text() : Promise.reject(r.status)))
    .then((html) => build(readPosts(html)))
    .catch(() => build([]));
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
// A spark of light runs along each yellow cable in turn: the right cable into
// the O, then a moment later out of the window and around the left cable into
// the N. Each letter flickers as its spark arrives, and the little loop on top
// glows once on its own. The paths were
// traced from the 1125×450 logo artwork; timings match the 16s CSS loop.
(() => {
  const group = document.querySelector('.nav-logo-group');
  const base = group && group.querySelector('.nav-logo');
  if (!base) return;
  const CABLES = [
    'M897 355 892 357 887 361 882 364 877 365 872 366 867 366 862 366 857 366 852 367 847 367 842 368 837 370 832 371 827 373 822 376 817 378 812 382 807 385 802 389 797 394 792 398 787 402 782 405 777 408 772 410 767 412 762 413 757 415 752 415 747 416 742 416 737 415 732 414 727 413 722 411 717 409 712 405 707 401 703 396 700 391 697 386 695 381 693 376 693 371 693 366 693 361 694 356 696 351 699 346 702 341 705 336 707 331 708 326 709 321 708 316 708 311 707 308',
    'M789 160 789 160 784 160 779 157 774 155 769 154 764 153 759 153 754 153 749 155 744 158 739 161',
    'M445 161 445 161 440 160 435 159 430 157 425 152 420 147 417 142 414 137 413 132 411 127 411 122 411 117 411 112 412 107 414 102 416 97 418 92 421 87 423 82 424 77 425 72 426 67 425 62 425 57 422 52 417 47 412 44 407 42 402 40 397 40 392 40 387 40 382 42 377 44 372 46 367 49 362 52 357 56 352 59 347 63 342 67 337 71 332 74 327 77 322 79 317 82 312 84 307 85 302 86 297 87 292 88 287 87 282 87 277 86 272 84 267 81 262 77 257 72 252 68 247 63 242 58 237 55 232 52 227 50 222 48 217 46 212 45 207 45 202 45 197 45 192 46 187 47 182 49 177 50 172 53 167 55 162 58 157 63 152 67 147 72 144 77 141 82 138 87 136 92 134 97 133 102 131 107 130 112 130 117 129 122 129 127 130 132 130 137 130 142 131 147 132 152 134 157 136 162 138 167 140 172 142 177 144 182 147 187 149 192 152 197 154 202 156 207 158 212 160 217 161 222 162 227 163 232 164 237 165 242 165 247 165 252 165 257 165 262 165 267 164 272 163 277 162 282 161 287 160 292 159 297 158 302 158 307 158 312 158 317 160 322 162 327 164 332 168 337 172 342 177 347 182 351 187 356 192 359 197 363 202 365 207 367 212 368 217 369 222 369 227 368 232 367 237 365 242 362 247 359 252 354 257 349 261 344 264 339 267 334 269 329 272 324 274 319 277 314 280 309',
  ];
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'nav-logo-spark');
  svg.setAttribute('viewBox', '0 0 1125 450');
  svg.setAttribute('aria-hidden', 'true');
  // each snake is a neon tube: a yellow tube with a pale, white-hot core
  svg.innerHTML = CABLES.map((d, i) => `<path class="spark-${i + 1}" d="${d}"/><path class="spark-${i + 1} spark-core" d="${d}"/>`).join('');
  base.append(svg);

  // flicker a letter when the spark arrives; a letter that was tapped off
  // gets switched straight back on by it
  const zap = (cls) => {
    const letter = group.querySelector('.' + cls);
    if (!letter || letter.classList.contains('is-relight') || group.classList.contains('is-power-off')) return;
    letter.classList.remove('is-off', 'is-zap');
    void letter.offsetWidth;
    letter.classList.add('is-zap');
    setTimeout(() => letter.classList.remove('is-zap'), 1100);
  };
  const loop = () => {
    setTimeout(() => zap('nav-logo5'), 2240); // the O, end of the right cable
    setTimeout(() => zap('nav-logo1'), 8800); // the N, end of the left cable
  };
  const first = svg.querySelector('.spark-1');
  first.addEventListener('animationstart', loop);
  first.addEventListener('animationiteration', loop);

  // Home page: tap a cable and a snake sets off from that exact spot towards
  // its letter (right cable to the O, left cable to the N); the little loop on
  // top just lights up. The letter switch code calls this for taps that don't
  // land on a letter or the window's dots.
  const cables = [...svg.querySelectorAll('path:not(.spark-core)')].map((p) => {
    const len = p.getTotalLength();
    const pts = [];
    for (let l = 0; l <= len; l += 4) { const q = p.getPointAtLength(l); pts.push([l, q.x, q.y]); }
    return { d: p.getAttribute('d'), len, pts };
  });
  const LETTER = ['nav-logo5', null, 'nav-logo1'];
  const SPEED = 140; // units per second, same pace as the loop
  group.sendSpark = (x, y) => {
    if (group.classList.contains('is-power-off')) return false;
    let best = null;
    cables.forEach((c, i) => c.pts.forEach(([l, px, py]) => {
      const dist = Math.hypot(px - x, py - y);
      if (dist < 40 && (!best || dist < best.dist)) best = { i, l, dist };
    }));
    if (!best) return false;
    run(best.i, best.l, SPEED);
    return true;
  };
  // one snake on cable i, its head starting at `from`, then a flicker at its letter
  const glowLoop = () => svg.querySelectorAll('.spark-2').forEach((p) => p.animate([{ opacity: 0 }, { opacity: 1, offset: 0.3 }, { opacity: 0 }], { duration: 900 }));
  const run = (i, from, speed) => {
    const c = cables[i];
    if (!LETTER[i]) { glowLoop(); return; } // the top loop: a quick glow
    const ms = ((c.len - from) / speed) * 1000;
    ['', ' spark-core'].forEach((core) => {
      const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      p.setAttribute('class', 'spark-tap' + core);
      p.setAttribute('d', c.d);
      p.style.strokeDasharray = '120 3000';
      svg.append(p);
      // the dash's head starts at `from` and runs off the end of the cable
      p.animate([{ strokeDashoffset: 120 - from }, { strokeDashoffset: -(c.len + 10) }],
        { duration: ms + (130 / speed) * 1000, easing: 'linear' }).onfinish = () => p.remove();
    });
    setTimeout(() => zap(LETTER[i]), ms);
  };
  // the N-E-D secret: fast snakes down every cable at once
  group.raceSparks = () => { run(0, 0, 450); run(2, 0, 700); glowLoop(); };
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
      if (pos >= 8) press(pos === 8 ? 'b' : 'a');
      return;
    }
    press(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'));
  }, { passive: true });

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
    document.body.append(layer);
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
        '<div class="egg-crash-body"><b>SYSTEM FROZEN</b><p>Refresh the page to reboot.</p></div>';
      layer.append(crash);
      document.documentElement.classList.add('is-frozen');
      layer.setAttribute('aria-hidden', 'false');
      crash.setAttribute('role', 'alert');
    }, 7000);
  }
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
  const img = (k, still, size) => `<img src="/img/emoji/${k}${still ? '-still' : ''}.webp" alt="${EMOJI[k]}" width="${size}" height="${size}" draggable="false">`;

  const row = document.createElement('div');
  row.className = 'ps-react';
  row.innerHTML = `
    <button type="button" class="ps-react-orb" aria-haspopup="menu" aria-expanded="false"></button>
    <div class="ps-react-fan" role="menu" aria-label="Pick a reaction" hidden>
      ${KEYS.map((k, i) => `<button type="button" role="menuitem" data-r="${k}" aria-label="${LABEL[k]}" style="--i:${i}"><span class="ps-react-tip">${LABEL[k]}</span>${img(k, false, 38)}</button>`).join('')}
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
    if (entries.some((e) => e.isIntersecting)) { seen.disconnect(); connect(); }
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
