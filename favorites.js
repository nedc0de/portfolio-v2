/*=============== FAVORITES: FLIP CARD WALL ===============*/
// Covers load automatically:
// - movies & TV shows from TMDB via netlify/functions/tmdb.js
//   (the key lives in a server-side env var, never in this file)
// - books from Open Library (no key needed)
// To add a favorite, add one line to FAVORITES. Fields:
//   type: 'book' | 'movie' | 'tv'      title, year, by (author / director), genre
//   rating: 0-5 (halves are fine)      take: your one-line review (optional)
//   cover: 'img/covers/file.jpg'  -> use your own image instead (optional)
//   tmdbId: 12345                 -> force the exact TMDB title if the search picks the wrong one (optional)
(() => {
  const grid = document.getElementById('favGrid');
  const homeCard = document.querySelector('.xb-mv'); // the "just watched" card on the home page
  const labReceipt = document.getElementById('labReceipt'); // the Lab's receipt printer
  if (!grid && !homeCard && !labReceipt) return;

  /*---------- settings ----------*/
  const COVER_CACHE_KEY = 'nedcode-fav-covers-v1';
  const CACHE_DAYS_FOUND = 30;
  const CACHE_DAYS_MISSING = 3;

  /*---------- your favorites ----------*/
  const FAVORITES = [
    // ----- Books -----
    {
      type: 'book',
      title: 'Meditations',
      by: 'Marcus Aurelius',
      genre: 'Philosophy',
      rating: 5,
    },
    {
      type: 'book',
      title: 'The 4-Hour Workweek',
      by: 'Tim Ferriss',
      genre: 'Business',
      rating: 5,
    },
    {
      type: 'book',
      title: 'The Obstacle Is the Way',
      by: 'Ryan Holiday',
      genre: 'Self-help',
      rating: 5,
    },
    {
      type: 'book',
      title: "Trust Me, I'm Lying",
      by: 'Ryan Holiday',
      genre: 'Media',
      rating: 4.5,
    },
    {
      type: 'book',
      title: 'The Alchemist',
      by: 'Paulo Coelho',
      genre: 'Fiction',
      rating: 5,
    },
    {
      type: 'book',
      title: 'Start with Why',
      by: 'Simon Sinek',
      genre: 'Leadership',
      rating: 5,
    },
    {
      type: 'book',
      title: 'The 48 Laws of Power',
      by: 'Robert Greene',
      genre: 'Strategy',
      rating: 5,
    },
    {
      type: 'book',
      title: 'The 50th Law',
      by: 'Robert Greene',
      genre: 'Strategy',
      rating: 4,
    },
    {
      type: 'book',
      title: 'Elon Musk',
      by: 'Ashlee Vance',
      genre: 'Biography',
      rating: 4,
    },
    {
      type: 'book',
      title: 'Persuasion',
      by: 'Arlene Dickinson',
      genre: 'Business',
      rating: 3.5,
    },
    {
      type: 'book',
      title: 'Unlimited Power',
      by: 'Tony Robbins',
      genre: 'Self-help',
      rating: 5,
    },

    // ----- Movies -----
    {
      type: 'movie',
      title: 'Animals',
      year: 2026,
      by: 'Ben Affleck',
      genre: 'Thriller',
      rating: 3,
    },
    {
      type: 'movie',
      title: 'The Housemaid',
      year: 2025,
      by: 'Paul Feig',
      genre: 'Thriller',
      rating: 4.8,
    },
    {
      type: 'movie',
      title: 'Deadpool & Wolverine',
      year: 2024,
      by: 'Shawn Levy',
      genre: 'Superhero',
      rating: 3,
    },
    {
      type: 'movie',
      title: 'Carry-On',
      year: 2024,
      by: 'Jaume Collet-Serra',
      genre: 'Thriller',
      rating: 3,
    },
    {
      type: 'movie',
      title: 'Gladiator II',
      year: 2024,
      by: 'Ridley Scott',
      genre: 'Action',
      rating: 3,
    },
    {
      type: 'movie',
      title: 'Furiosa: A Mad Max Saga',
      year: 2024,
      by: 'George Miller',
      genre: 'Action',
      rating: 4.4,
    },
    {
      type: 'movie',
      title: 'The Beekeeper',
      year: 2024,
      by: 'David Ayer',
      genre: 'Action',
      rating: 3.5,
    },
    {
      type: 'movie',
      title: 'Road House',
      year: 2024,
      by: 'Doug Liman',
      genre: 'Action',
      rating: 3.6,
    },
    {
      type: 'movie',
      title: 'Blink Twice',
      year: 2024,
      by: 'Zoë Kravitz',
      genre: 'Thriller',
      rating: 4.6,
    },
    {
      type: 'movie',
      title: 'Trap',
      year: 2024,
      by: 'M. Night Shyamalan',
      genre: 'Thriller',
      rating: 3.2,
    },
    {
      type: 'movie',
      title: 'Rebel Ridge',
      year: 2024,
      by: 'Jeremy Saulnier',
      genre: 'Thriller',
      rating: 3,
    },
    {
      type: 'movie',
      title: 'Michael',
      year: 2026,
      by: 'Antoine Fuqua',
      genre: 'Biography',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'Spider-Man: Brand New Day',
      year: 2026,
      by: 'Destin Daniel Cretton',
      genre: 'Superhero',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'Project Hail Mary',
      year: 2026,
      by: 'Phil Lord & Christopher Miller',
      genre: 'Sci-fi',
      rating: 4.7,
    },
    {
      type: 'movie',
      title: 'F1',
      year: 2025,
      by: 'Joseph Kosinski',
      genre: 'Sports',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'Frankenstein',
      year: 2025,
      by: 'Guillermo del Toro',
      genre: 'Horror',
      rating: 4.7,
    },
    {
      type: 'movie',
      title: 'Havoc',
      year: 2025,
      by: 'Gareth Evans',
      genre: 'Action',
      rating: 4.2,
    },
    {
      type: 'movie',
      title: 'Avatar: Fire and Ash',
      year: 2025,
      by: 'James Cameron',
      genre: 'Sci-fi',
      rating: 4,
    },
    {
      type: 'movie',
      title: 'Thunderbolts*',
      year: 2025,
      by: 'Jake Schreier',
      genre: 'Superhero',
      rating: 3.3,
    },
    {
      type: 'movie',
      title: 'Mickey 17',
      year: 2025,
      by: 'Bong Joon Ho',
      genre: 'Sci-fi',
      rating: 4,
    },
    {
      type: 'movie',
      title: 'Lilo & Stitch',
      year: 2025,
      by: 'Dean Fleischer Camp',
      genre: 'Family',
      rating: 4,
    },
    {
      type: 'movie',
      title: 'The Woman in Cabin 10',
      year: 2025,
      by: 'Simon Stone',
      genre: 'Thriller',
      rating: 4,
    },
    {
      type: 'movie',
      title: 'Tron: Ares',
      year: 2025,
      by: 'Joachim Rønning',
      genre: 'Sci-fi',
      rating: 3.8,
    },
    {
      type: 'movie',
      title: 'The Accountant 2',
      year: 2025,
      by: "Gavin O'Connor",
      genre: 'Action',
      rating: 3.3,
    },
    {
      type: 'movie',
      title: 'Marty Supreme',
      year: 2025,
      by: 'Josh Safdie',
      genre: 'Drama',
      rating: 3.5,
    },
    {
      type: 'movie',
      title: 'The Gorge',
      year: 2025,
      by: 'Scott Derrickson',
      genre: 'Action',
      rating: 3.5,
    },
    {
      type: 'movie',
      title: 'Superman',
      year: 2025,
      by: 'James Gunn',
      genre: 'Superhero',
      rating: 3,
    },
    {
      type: 'movie',
      title: 'Oppenheimer',
      year: 2023,
      by: 'Christopher Nolan',
      genre: 'Biography',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'Interstellar',
      year: 2014,
      by: 'Christopher Nolan',
      genre: 'Sci-fi',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'Inception',
      year: 2010,
      by: 'Christopher Nolan',
      genre: 'Sci-fi',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'Dunkirk',
      year: 2017,
      by: 'Christopher Nolan',
      genre: 'War',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'Blade Runner 2049',
      year: 2017,
      by: 'Denis Villeneuve',
      genre: 'Sci-fi',
      rating: 4.4,
    },
    {
      type: 'movie',
      title: 'Dune',
      year: 2021,
      by: 'Denis Villeneuve',
      genre: 'Sci-fi',
      rating: 4.1,
    },
    {
      type: 'movie',
      title: 'Arrival',
      year: 2016,
      by: 'Denis Villeneuve',
      genre: 'Sci-fi',
      rating: 4,
    },
    {
      type: 'movie',
      title: '2001: A Space Odyssey',
      year: 1968,
      by: 'Stanley Kubrick',
      genre: 'Sci-fi',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'Ad Astra',
      year: 2019,
      by: 'James Gray',
      genre: 'Sci-fi',
      rating: 4.5,
    },
    {
      type: 'movie',
      title: 'First Man',
      year: 2018,
      by: 'Damien Chazelle',
      genre: 'Biography',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'Gravity',
      year: 2013,
      by: 'Alfonso Cuarón',
      genre: 'Sci-fi',
      rating: 4.5,
    },
    {
      type: 'movie',
      title: 'Ex Machina',
      year: 2014,
      by: 'Alex Garland',
      genre: 'Sci-fi',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'Prometheus',
      year: 2012,
      by: 'Ridley Scott',
      genre: 'Sci-fi',
      rating: 4.5,
    },
    {
      type: 'movie',
      title: 'Oblivion',
      year: 2013,
      by: 'Joseph Kosinski',
      genre: 'Sci-fi',
      rating: 4.5,
    },
    {
      type: 'movie',
      title: 'The Matrix',
      year: 1999,
      by: 'Lana & Lilly Wachowski',
      genre: 'Sci-fi',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'Memento',
      year: 2000,
      by: 'Christopher Nolan',
      genre: 'Thriller',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'Eyes Wide Shut',
      year: 1999,
      by: 'Stanley Kubrick',
      genre: 'Thriller',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'Joker',
      year: 2019,
      by: 'Todd Phillips',
      genre: 'Thriller',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'Shutter Island',
      year: 2010,
      by: 'Martin Scorsese',
      genre: 'Thriller',
      rating: 4.5,
    },
    {
      type: 'movie',
      title: 'Tenet',
      year: 2020,
      by: 'Christopher Nolan',
      genre: 'Action',
      rating: 4.5,
    },
    {
      type: 'movie',
      title: 'The Dark Knight',
      year: 2008,
      by: 'Christopher Nolan',
      genre: 'Action',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'Fight Club',
      year: 1999,
      by: 'David Fincher',
      genre: 'Drama',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'Mad Max: Fury Road',
      year: 2015,
      by: 'George Miller',
      genre: 'Action',
      rating: 4.5,
    },
    {
      type: 'movie',
      title: 'The Shining',
      year: 1980,
      by: 'Stanley Kubrick',
      genre: 'Horror',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'A Clockwork Orange',
      year: 1971,
      by: 'Stanley Kubrick',
      genre: 'Crime',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'Legend',
      year: 2015,
      by: 'Brian Helgeland',
      genre: 'Crime',
      rating: 3.5,
    },
    {
      type: 'movie',
      title: 'Catch Me If You Can',
      year: 2002,
      by: 'Steven Spielberg',
      genre: 'Crime',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'The Departed',
      year: 2006,
      by: 'Martin Scorsese',
      genre: 'Crime',
      rating: 4,
    },
    {
      type: 'movie',
      title: 'The Godfather',
      year: 1972,
      by: 'Francis Ford Coppola',
      genre: 'Crime',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'The Godfather Part II',
      year: 1974,
      by: 'Francis Ford Coppola',
      genre: 'Crime',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'The Godfather Part III',
      year: 1990,
      by: 'Francis Ford Coppola',
      genre: 'Crime',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'Scarface',
      year: 1983,
      by: 'Brian De Palma',
      genre: 'Crime',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'Public Enemies',
      year: 2009,
      by: 'Michael Mann',
      genre: 'Crime',
      rating: 4.5,
    },
    {
      type: 'movie',
      title: 'Pulp Fiction',
      year: 1994,
      by: 'Quentin Tarantino',
      genre: 'Crime',
      rating: 4.5,
    },
    {
      type: 'movie',
      title: 'Django Unchained',
      year: 2012,
      by: 'Quentin Tarantino',
      genre: 'Western',
      rating: 4.5,
    },
    {
      type: 'movie',
      title: 'Killers of the Flower Moon',
      year: 2023,
      by: 'Martin Scorsese',
      genre: 'Western',
      rating: 4,
    },
    {
      type: 'movie',
      title: 'Lawless',
      year: 2012,
      by: 'John Hillcoat',
      genre: 'Crime',
      rating: 4,
    },
    {
      type: 'movie',
      title: 'Once Upon a Time in Hollywood',
      year: 2019,
      by: 'Quentin Tarantino',
      genre: 'Comedy',
      rating: 4.5,
    },
    {
      type: 'movie',
      title: 'The Wolf of Wall Street',
      year: 2013,
      by: 'Martin Scorsese',
      genre: 'Comedy',
      rating: 4.5,
    },
    {
      type: 'movie',
      title: "What's Eating Gilbert Grape",
      year: 1993,
      by: 'Lasse Hallström',
      genre: 'Drama',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'Good Will Hunting',
      year: 1997,
      by: 'Gus Van Sant',
      genre: 'Drama',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'The Aviator',
      year: 2004,
      by: 'Martin Scorsese',
      genre: 'Biography',
      rating: 4,
    },
    {
      type: 'movie',
      title: '1917',
      year: 2019,
      by: 'Sam Mendes',
      genre: 'War',
      rating: 5,
    },

    // ----- TV shows -----
    { type: 'tv', title: 'The First', year: 2018, genre: 'Sci-fi', rating: 5 },
    {
      type: 'tv',
      title: 'Black Mirror',
      year: 2011,
      genre: 'Sci-fi',
      rating: 5,
    },
    {
      type: 'tv',
      title: 'Westworld',
      year: 2016,
      genre: 'Sci-fi',
      rating: 4.5,
    },
    {
      type: 'tv',
      title: 'Raised by Wolves',
      year: 2020,
      genre: 'Sci-fi',
      rating: 4,
    },
    {
      type: 'tv',
      title: 'Succession',
      year: 2018,
      genre: 'Drama',
      rating: 3.5,
    },
    {
      type: 'tv',
      title: "The Queen's Gambit",
      year: 2020,
      genre: 'Drama',
      rating: 4,
    },
    { type: 'tv', title: 'Dark', year: 2017, genre: 'Mystery', rating: 5 },
    { type: 'tv', title: '1899', year: 2022, genre: 'Mystery', rating: 5 },
    { type: 'tv', title: 'Hannibal', year: 2013, genre: 'Crime', rating: 4 },
    { type: 'tv', title: 'Silo', year: 2023, genre: 'Sci-fi', rating: 4 },
    {
      type: 'tv',
      title: 'Yellowstone',
      year: 2018,
      genre: 'Western',
      rating: 5,
    },
    { type: 'tv', title: 'Godless', year: 2017, genre: 'Western', rating: 5 },
    {
      type: 'tv',
      title: 'American Primeval',
      year: 2025,
      genre: 'Western',
      rating: 4,
    },
    { type: 'tv', title: 'The Office', year: 2005, genre: 'Comedy', rating: 5 },
    {
      type: 'tv',
      title: 'Mr. Robot',
      year: 2015,
      genre: 'Thriller',
      rating: 5,
    },
    { type: 'tv', title: 'Fargo', year: 2014, genre: 'Crime', rating: 4.5 },
    {
      type: 'tv',
      title: 'The Sopranos',
      year: 1999,
      genre: 'Crime',
      rating: 4.5,
    },
    {
      type: 'tv',
      title: 'Breaking Bad',
      year: 2008,
      genre: 'Crime',
      rating: 5,
    },
    { type: 'tv', title: 'Ozark', year: 2017, genre: 'Crime', rating: 5 },
    { type: 'tv', title: 'Narcos', year: 2015, genre: 'Crime', rating: 5 },
    { type: 'tv', title: 'The Penguin', year: 2024, genre: 'Crime', rating: 4 },
    {
      type: 'tv',
      title: 'Stranger Things',
      year: 2016,
      genre: 'Sci-fi',
      rating: 5,
    },
    {
      type: 'tv',
      title: 'The Witcher',
      year: 2019,
      genre: 'Fantasy',
      rating: 4.5,
    },
    {
      type: 'tv',
      title: 'Chernobyl',
      year: 2019,
      genre: 'History',
      rating: 4.5,
    },
    {
      type: 'tv',
      title: 'Game of Thrones',
      year: 2011,
      genre: 'Fantasy',
      rating: 4.5,
    },
    {
      type: 'tv',
      title: 'The Last of Us',
      year: 2023,
      genre: 'Adventure',
      rating: 3.5,
    },
    {
      type: 'tv',
      title: 'The Walking Dead',
      year: 2010,
      genre: 'Horror',
      rating: 4.5,
    },
    { type: 'tv', title: 'The Boys', year: 2019, genre: 'Action', rating: 4.5 },
    {
      type: 'tv',
      title: 'The Agency',
      year: 2024,
      genre: 'Thriller',
      rating: 4.5,
    },
  ];

  const TYPE_NAME = { book: 'Book', movie: 'Movie', tv: 'TV show' };
  const TONES = [
    '#34405a',
    '#5a3446',
    '#2f5246',
    '#5a4c30',
    '#46345a',
    '#5a3a30',
    '#304a5a',
    '#4a5a30',
  ];
  // Animations play for everyone, even with "reduce motion" turned on (Ned's call)
  const reduceMotion = { matches: false };

  /*---------- stats line ----------*/
  function renderStats() {
    const el = document.getElementById('favStats');
    if (!el) return;
    const count = (t) => FAVORITES.filter((f) => f.type === t).length;
    const directors = {};
    FAVORITES.forEach((f) => {
      if (f.type === 'movie' && f.by)
        directors[f.by] = (directors[f.by] || 0) + 1;
    });
    const top = Object.keys(directors).sort(
      (a, b) => directors[b] - directors[a],
    )[0];
    const part = (n, word) => `<span><b>${n}</b> ${word}</span>`;
    el.innerHTML =
      part(count('movie'), 'movies') +
      part(count('tv'), 'shows') +
      part(count('book'), 'books') +
      (top
        ? `<span>Most-watched director: <strong>${escapeHTML(top)}</strong> (${directors[top]})</span>`
        : '');
  }

  /*---------- cards ----------*/
  // Five stars filled to the exact rating: each star is filled by how much of
  // it the rating covers, so 4.8 is four stars and 80% of the fifth, and 3.2
  // is three stars and a sliver (no rounding to halves)
  // The fill is cut by how much of the star's shape is covered, not just its
  // width: a star's tips are thin, so cutting 80% of the width still looks
  // like a full star. (Inverse of a smoothstep, a close match for a star's
  // area; the glyph's ink spans about 4% to 96% of its box.)
  function starFill(rating, i) {
    const f = Math.max(0, Math.min(1, rating - (i - 1)));
    if (f === 0 || f === 1) return f * 100;
    const x = 0.5 - Math.sin(Math.asin(1 - 2 * f) / 3);
    return Math.round(4 + 92 * x);
  }
  // a short verdict from the rating (home card and the Lab's receipts)
  function verdict(r) {
    return r >= 4.5 ? 'Must watch' : r >= 4 ? 'Really good' : r >= 3.5 ? 'Worth a watch' : r >= 3 ? 'Just okay' : r >= 2 ? 'Skip it' : 'Avoid';
  }

  function starsHTML(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
      html += `<span class="fav-star" style="--f:${starFill(rating, i)}%" aria-hidden="true">★</span>`;
    }
    return `<span class="fav-stars" title="${rating} out of 5">${html}</span>`;
  }

  function escapeHTML(s) {
    return String(s).replace(
      /[&<>"']/g,
      (c) =>
        ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;',
        })[c],
    );
  }

  const cards = [];
  function buildCards() {
    // movies, then TV shows (each newest first, same year A to Z), then books in list order
    const TYPE_ORDER = { movie: 0, tv: 1, book: 2 };
    const sorted = FAVORITES.map((f, i) => ({ f, i }))
      .sort(
        (a, b) =>
          TYPE_ORDER[a.f.type] - TYPE_ORDER[b.f.type] ||
          (b.f.year || 0) - (a.f.year || 0) ||
          (a.f.type === 'book'
            ? a.i - b.i
            : a.f.title.localeCompare(b.f.title, 'en')),
      )
      .map((x) => x.f);
    sorted.forEach((f, i) => {
      const rating = Math.max(0, Math.min(5, Number(f.rating) || 0)); // always a number from 0 to 5

      const card = document.createElement('div');
      card.setAttribute('role', 'button');
      card.tabIndex = 0;
      card.className = 'fav-card';
      card.dataset.type = f.type;
      card.setAttribute('aria-pressed', 'false');
      card.setAttribute(
        'aria-label',
        `${f.title}, ${TYPE_NAME[f.type]}, rated ${rating} out of 5. Show details`,
      );
      const meta = [TYPE_NAME[f.type], f.year, f.genre]
        .filter(Boolean)
        .join(' · ');
      const by = f.by ? (f.type === 'book' ? 'by ' : 'dir. ') + f.by : '';
      card.innerHTML = `
        <span class="fav-inner">
          <span class="fav-face fav-front" style="background-color:${TONES[i % TONES.length]}">
            <span class="fav-placeholder-title">${escapeHTML(f.title)}</span>
            <img class="fav-cover" alt="" decoding="async">
            <span class="fav-tag">${TYPE_NAME[f.type]}</span>
            <span class="fav-score">★ ${rating}</span>
          </span>
          <span class="fav-face fav-back">
            <span class="fav-back-title">${escapeHTML(f.title)}</span>
            <span class="fav-back-meta">${escapeHTML(meta)}</span>
            ${by ? `<span class="fav-back-meta">${escapeHTML(by)}</span>` : ''}
            ${starsHTML(rating)}
            ${f.take ? `<span class="fav-take">${escapeHTML(f.take)}</span>` : ''}
          </span>
        </span>`;
      const flip = () => {
        if (picking) return;
        setFlipped(card, !card.classList.contains('is-flipped'));
      };
      card.addEventListener('click', flip);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          flip();
        }
      });
      grid.appendChild(card);
      cards.push({ el: card, fav: f });
    });
  }

  // an open card flips back to its cover on its own after 10 seconds
  const AUTO_FLIP_BACK_MS = 10000;
  function setFlipped(card, on) {
    clearTimeout(card.flipBackTimer);
    card.classList.toggle('is-flipped', on);
    card.setAttribute('aria-pressed', String(on));
    if (on)
      card.flipBackTimer = setTimeout(
        () => setFlipped(card, false),
        AUTO_FLIP_BACK_MS,
      );
  }

  /*---------- filters ----------*/
  let filter = 'all';
  const filterButtons = document.querySelectorAll('.fav-filter');
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (picking) return;
      filter = btn.dataset.filter;
      filterButtons.forEach((b) =>
        b.setAttribute('aria-pressed', String(b === btn)),
      );
      cards.forEach(({ el, fav }) => {
        el.hidden = filter !== 'all' && fav.type !== filter;
      });
    });
  });

  /*---------- pick for me ----------*/
  let picking = false;
  const pickButton = document.getElementById('favPick');

  function onScreen(el) {
    const r = el.getBoundingClientRect();
    return r.bottom > 0 && r.top < window.innerHeight && r.width > 0;
  }

  function land(card) {
    const r = card.getBoundingClientRect();
    const visible = r.top >= 0 && r.bottom <= window.innerHeight;
    if (!visible)
      card.scrollIntoView({
        behavior: reduceMotion.matches ? 'auto' : 'smooth',
        block: 'center',
      });
    setTimeout(
      () => {
        card.classList.add('is-picked');
        setFlipped(card, true);
        card.focus({ preventScroll: true });
        setTimeout(() => card.classList.remove('is-picked'), 1600);
        picking = false;
      },
      visible || reduceMotion.matches ? 0 : 450,
    );
  }

  if (pickButton) {
    pickButton.addEventListener('click', () => {
      if (picking) return;
      const pool = cards.filter((c) => !c.el.hidden).map((c) => c.el);
      if (!pool.length) return;
      picking = true;
      pool.forEach((c) => setFlipped(c, false));
      const target = pool[Math.floor(Math.random() * pool.length)];
      if (reduceMotion.matches) return land(target);

      // hop across the covers you can see, slowing down, then land on the pick
      const seen = pool.filter(onScreen);
      const hopPool = seen.length >= 3 ? seen : pool;
      let n = 0;
      let last = null;
      const steps = 14;
      const hop = () => {
        if (last) last.classList.remove('is-hopping');
        if (n >= steps) return land(target);
        let next = hopPool[Math.floor(Math.random() * hopPool.length)];
        if (next === last && hopPool.length > 1)
          next = hopPool[(hopPool.indexOf(next) + 1) % hopPool.length];
        next.classList.add('is-hopping');
        last = next;
        n++;
        setTimeout(hop, 60 + n * 14);
      };
      hop();
    });
  }

  /*---------- covers (automatic) ----------*/
  let cache = {};
  try {
    cache = JSON.parse(localStorage.getItem(COVER_CACHE_KEY)) || {};
  } catch (e) {
    cache = {};
  }
  function saveCache() {
    try {
      localStorage.setItem(COVER_CACHE_KEY, JSON.stringify(cache));
    } catch (e) {}
  }
  const cacheId = (f) =>
    [f.type, f.title, f.year || '', f.by || '', f.tmdbId || ''].join('|');

  async function getJSON(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return res.json();
  }

  async function findBookCover(f) {
    const q =
      `title=${encodeURIComponent(f.title)}` +
      (f.by ? `&author=${encodeURIComponent(f.by)}` : '');
    const data = await getJSON(
      `https://openlibrary.org/search.json?${q}&limit=5&fields=cover_i`,
    );
    const hit = (data.docs || []).find(
      (d) => Number.isInteger(d.cover_i) && d.cover_i > 0,
    ); // only real cover numbers
    return hit
      ? `https://covers.openlibrary.org/b/id/${hit.cover_i}-M.jpg`
      : '';
  }

  async function findScreenCover(f) {
    // Covers come from our own Netlify Function proxy, which holds the TMDB
    // key server-side (see netlify/functions/tmdb.js). If the proxy is down
    // or unconfigured, getJSON throws and the caller keeps the placeholder.
    const kind = f.type === 'tv' ? 'tv' : 'movie';
    const base = '/.netlify/functions/tmdb';
    let poster = '';
    if (f.tmdbId) {
      const data = await getJSON(
        `${base}?kind=${kind}&id=${encodeURIComponent(f.tmdbId)}`,
      );
      poster = data.poster_path || '';
    } else {
      const query = `q=${encodeURIComponent(f.title)}`;
      const yearParam = f.year ? `&year=${f.year}` : '';
      let data = await getJSON(`${base}?kind=${kind}&${query}${yearParam}`);
      let hit = (data.results || []).find((r) => r.poster_path);
      if (!hit && f.year) {
        // release dates differ between countries, so try once more without the year
        data = await getJSON(`${base}?kind=${kind}&${query}`);
        hit = (data.results || []).find((r) => r.poster_path);
      }
      poster = hit ? hit.poster_path : '';
    }
    const safe =
      typeof poster === 'string' && /^\/[A-Za-z0-9._-]+$/.test(poster); // only plain image file names
    return safe ? `https://image.tmdb.org/t/p/w342${poster}` : '';
  }

  // Sharp covers on every screen: the cached link is the medium size, and
  // this lists the other sizes the services offer so each device downloads
  // the one it needs (bigger on high-density screens like iPhones).
  function coverSrcset(url) {
    const tmdb = url.match(/^(https:\/\/image\.tmdb\.org\/t\/p\/)w\d+(\/.+)$/);
    if (tmdb) return [185, 342, 500, 780].map((w) => `${tmdb[1]}w${w}${tmdb[2]} ${w}w`).join(', ');
    const ol = url.match(/^(https:\/\/covers\.openlibrary\.org\/b\/id\/\d+)-M\.jpg$/);
    if (ol) return `${ol[1]}-M.jpg 180w, ${ol[1]}-L.jpg 500w`;
    return '';
  }

  async function coverFor(f) {
    if (f.cover) return f.cover;
    const id = cacheId(f);
    const hit = cache[id];
    if (hit) {
      const maxAge =
        (hit.url ? CACHE_DAYS_FOUND : CACHE_DAYS_MISSING) * 86400000;
      if (Date.now() - hit.t < maxAge) return hit.url;
    }
    const url =
      f.type === 'book' ? await findBookCover(f) : await findScreenCover(f);
    if (url === null) return null;
    cache[id] = { url, t: Date.now() };
    saveCache();
    return url;
  }

  function showCover(item, url) {
    if (!url) return;
    const img = item.el.querySelector('.fav-cover');
    img.onload = () => item.el.classList.add('has-cover'); // fades the cover in
    img.onerror = () => {
      img.removeAttribute('src');
      delete cache[cacheId(item.fav)]; // try again next visit
      saveCache();
    };
    const set = coverSrcset(url);
    if (set) {
      img.sizes = '(min-width: 768px) 220px, 34vw';
      img.srcset = set;
    }
    img.src = url;
  }

  // only a few lookups at a time, and only for cards near the screen
  const queue = [];
  let running = 0;
  const MAX_AT_ONCE = 4;
  function pump() {
    while (running < MAX_AT_ONCE && queue.length) {
      const item = queue.shift();
      running++;
      coverFor(item.fav)
        .then((url) => showCover(item, url))
        .catch(() => {}) // offline or service down: the placeholder stays
        .finally(() => {
          running--;
          pump();
        });
    }
  }
  function requestCover(item) {
    if (item.requested) return;
    item.requested = true;
    queue.push(item);
    pump();
  }

  /*---------- Lab: the receipt printer reads the same list ----------*/
  if (labReceipt) window.nedcodeFavs = { list: FAVORITES, coverFor, coverSrcset, verdict, escapeHTML };
  if (!grid && !homeCard) return;

  /*---------- home page: the movie deck ----------*/
  // The newest movies on the list (they're added at the top) as a small deck:
  // the latest one is the 3D card (poster on the front, details, take and
  // rating on the back), the two before it fan out behind. Tapping one of
  // those brings it to the front. Posters use the same lookup and cache as
  // this page, so the home page stays up to date by itself.
  if (!grid) {
    const deck = FAVORITES.filter((f) => f.type === 'movie').slice(0, 3);
    if (!deck.length) return;
    const tk = homeCard.querySelector('.tk3');
    const hold = homeCard.querySelector('.tk3-hold');
    const back = homeCard.querySelector('.tk3-back');
    const img = homeCard.querySelector('.xb-poster img');
    const peeks = [...homeCard.querySelectorAll('.tk3-peek')];
    const dotsBox = homeCard.querySelector('.tk3-dots');
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const covers = deck.map((f) => coverFor(f).catch(() => ''));
    let at = 0;

    // a poster into an <img>, sharp on every screen; ok() runs once it shows
    const setPoster = (el, url, sizes, ok) => {
      el.onload = ok || null;
      el.removeAttribute('srcset');
      const set = coverSrcset(url);
      if (set) {
        el.sizes = sizes;
        el.srcset = set;
      }
      el.src = url;
    };

    const show = (i) => {
      at = i;
      const pick = deck[i];
      homeCard.querySelector('.tk3-tag').textContent = i === 0 ? 'Just watched' : 'Recently watched';
      back.querySelector('.tk3-bt').textContent = pick.title;
      back.querySelector('.tk3-by').textContent = pick.year || '';
      back.querySelector('.tk3-genre').textContent = pick.genre || '—';
      back.querySelector('.tk3-dir').textContent = pick.by || '—';
      const take = back.querySelector('.tk3-take');
      take.textContent = pick.take ? `“${pick.take}”` : '';
      take.hidden = !pick.take;
      back.querySelector('.tk3-panel').classList.toggle('has-take', !!pick.take);
      const num = back.querySelector('.tk3-num b');
      num.textContent = pick.rating;
      num.dataset.score = pick.rating;
      back.querySelector('.tk3-verdict').textContent = verdict(pick.rating);
      back.querySelector('.tk3-meter').style.setProperty('--p', pick.rating / 5);
      back.querySelector('.tk3-bstars').outerHTML = starsHTML(pick.rating).replace('fav-stars', 'fav-stars xb-stars tk3-bstars');
      homeCard.setAttribute('aria-label', `${i === 0 ? 'Just watched' : 'Recently watched'}: ${pick.title}, rated ${pick.rating} out of 5`);

      // front poster: a soft shimmer until it arrives, popcorn if there's none
      tk.classList.remove('has-poster', 'no-poster');
      homeCard.classList.remove('has-glow');
      img.removeAttribute('srcset');
      img.removeAttribute('src');
      covers[i].then((url) => {
        if (at !== i) return;
        if (!url) { tk.classList.add('no-poster'); return; }
        setPoster(img, url, '250px', () => {
          if (at !== i) return;
          // the blurred back and the glow behind the deck use the same poster
          homeCard.style.setProperty('--poster', `url("${url}")`);
          tk.classList.add('has-poster');
          homeCard.classList.add('has-glow');
        });
      });

      dots.forEach((d, k) => d.setAttribute('aria-current', k === i ? 'true' : 'false'));

      // the other movies fan out behind, in order
      peeks.forEach((peek, k) => {
        const j = (i + 1 + k) % deck.length;
        peek.hidden = deck.length < 2 + k;
        peek.dataset.i = j;
        peek.setAttribute('aria-label', `Show ${deck[j].title}`);
        const pimg = peek.querySelector('img');
        peek.classList.remove('has-poster');
        covers[j].then((url) => {
          if (url && peek.dataset.i === String(j)) setPoster(pimg, url, '120px', () => peek.classList.add('has-poster'));
        });
      });
    };

    // bring another movie to the front: the card drops back, then the new one
    // comes forward (scripts.js turns it to face you again)
    const deal = (i) => {
      if (i === at || hold.classList.contains('is-dealing')) return;
      const swap = () => {
        show(i);
        tk.dispatchEvent(new CustomEvent('tk3:reset'));
      };
      if (still) { swap(); return; }
      hold.classList.add('is-dealing');
      setTimeout(() => {
        swap();
        hold.classList.remove('is-dealing');
        hold.classList.add('is-dealt');
        setTimeout(() => hold.classList.remove('is-dealt'), 400);
      }, 220);
    };
    peeks.forEach((peek) => peek.addEventListener('click', () => deal(Number(peek.dataset.i))));

    // one dot per movie under the deck: shows which one is in front, tap to jump
    const dots = deck.length > 1 ? deck.map((f, k) => {
      const d = document.createElement('button');
      d.type = 'button';
      d.className = 'tk3-dot';
      d.setAttribute('aria-label', `Show ${f.title}`);
      d.addEventListener('click', () => deal(k));
      dotsBox.append(d);
      return d;
    }) : [];
    dotsBox.hidden = !dots.length;
    tk.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
      e.preventDefault();
      deal((at + (e.key === 'ArrowDown' ? 1 : deck.length - 1)) % deck.length);
    });

    show(0);
    homeCard.hidden = false;
    // the home ticker shows the latest pick
    window.nedcodePick = { title: deck[0].title, rating: deck[0].rating };
    return;
  }

  /*---------- start ----------*/
  renderStats();
  buildCards();
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const item = cards.find((c) => c.el === e.target);
          if (item) requestCover(item);
          io.unobserve(e.target);
        });
      },
      { rootMargin: '400px 0px' },
    );
    cards.forEach((c) => io.observe(c.el));
  } else {
    cards.forEach(requestCover);
  }
})();
