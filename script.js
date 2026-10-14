(() => {
  const $ = (selector) => document.querySelector(selector);
  

const EDIT_PASSWORD = "Njushka2024.";

function openEditorWithPassword() {
  const enteredPassword = prompt("🔐 Bitte gib dein Passwort ein:");

  if (enteredPassword === null) return;

  if (enteredPassword !== EDIT_PASSWORD) {
    alert("❌ Falsches Passwort!");
    return;
  }

  openEditor();
}


  const dialog = $('#admin-dialog');
  const nameInput = $('#name-input');
  const bioInput = $('#bio-input');
  const adminLinks = $('#admin-links');
  const mainAvatar = $('#main-avatar');
  const avatarPreview = $('#avatar-preview');
  const avatarUpload = $('#avatar-upload');
  const avatarZoom = $('#avatar-zoom');
  


let links = [
  { title: "TikTok ↗", url: "https://www.tiktok.com/@DEINNAME" },
  { title: "Instagram ↗", url: "https://www.instagram.com/DEINNAME/" },
  { title: "SoundCloud ↗", url: "https://soundcloud.com/DEINNAME" },
  { title: "Twitch ↗", url: "https://www.twitch.tv/DEINNAME" },
  { title: "YouTube ↗", url: "https://www.youtube.com/@DEINHANDLE" },
  { title: "Discord ↗", url: "https://discord.gg/DEININVITECODE" },
  { title: "Meine Website ↗", url: "https://DEINE-WEBSITE.de" },
  { title: "Spotify ↗", url: "https://open.spotify.com/user/DEINE-ID" },
  { title: "X / Twitter ↗", url: "https://x.com/DEINNAME" },
  { title: "Business & Kontakt ✉", url: "mailto:contact.kollapz@gmail.com" },
  { title: "Support ❤️", url: "https://DEIN-SUPPORT-LINK.de" },
  { title: "Mein Shop 🛍", url: "https://DEIN-SHOP-LINK.de" },
  { title: "Instant Gaming 🎮", url: "https://www.instant-gaming.com/?igr=gamer-c67596a" }
];

let pendingAvatar = '';
let zoom = 100;

function safeRead(key, fallback = null) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function saveData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    alert('Speichern fehlgeschlagen. Das Bild ist möglicherweise zu groß. Bitte wähle ein kleineres Bild.');
    return false;
  }
}


function renderLinks() {
  const container = document.querySelector('.links');
  container.replaceChildren();

  const iconData = [
    {
      names: ['tiktok'],
      color: '#ffffff',
      svg: `<path fill="currentColor" d="M19.6 6.3a5.2 5.2 0 0 1-3.2-1.1V15a5.7 5.7 0 1 1-5.7-5.7c.4 0 .8 0 1.2.1v3.2a2.7 2.7 0 1 0 1.9 2.6V2.5h3.2c.2 2 1.3 3.5 3.1 4.1v3.3c-.2 0-.4-.1-.5-.1Z"/>`
    },
    {
      names: ['instagram'],
      color: '#E1306C',
      svg: `<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="17.7" cy="6.5" r="1.3" fill="currentColor"/>`
    },
    {
      names: ['soundcloud'],
      color: '#FF5500',
      svg: `<path fill="currentColor" d="M3 14v4H2v-4Zm3-3v7H5v-7Zm3-3v10H8V8Zm3-2v12h-1V6Zm2 4a4.5 4.5 0 0 1 8.5 2 3.5 3.5 0 0 1-.5 7H14Z"/>`
    },
    {
      names: ['twitch'],
      color: '#9146FF',
      svg: `<path fill="currentColor" d="M5 3 3 7v13h5v3h3l3-3h4l5-5V3Zm15 11-3 3h-5l-3 3v-3H6V5h14Z"/><path fill="currentColor" d="M12 7h2v5h-2zm5 0h2v5h-2z"/>`
    },
    {
      names: ['youtube'],
      color: '#FF0033',
      svg: `<path fill="currentColor" d="M23 7.1a3 3 0 0 0-2.1-2.2C19 4.4 12 4.4 12 4.4s-7 0-8.9.5A3 3 0 0 0 1 7.1 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.9 3 3 0 0 0 2.1 2.2c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.2 31 31 0 0 0 .5-4.9 31 31 0 0 0-.5-4.9ZM9.5 15.5v-7l6 3.5Z"/>`
    },
    {
      names: ['discord'],
      color: '#5865F2',
      svg: `<path fill="currentColor" d="M19.7 5.2A18 18 0 0 0 15.3 4l-.5 1a16 16 0 0 0-5.6 0l-.5-1a18 18 0 0 0-4.4 1.2C1.5 9.3.8 13.3 1.2 17.2a18 18 0 0 0 5.4 2.7l1.2-2a11 11 0 0 1-1.9-.9l.5-.4a13 13 0 0 0 11.2 0l.5.4a11 11 0 0 1-1.9.9l1.2 2a18 18 0 0 0 5.4-2.7c.5-4.5-.8-8.5-3.1-12ZM8.5 14.5c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm7 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z"/>`
    },
    {
      names: ['website', 'meine website', 'webseite'],
      color: '#22D3EE',
      svg: `<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><ellipse cx="12" cy="12" rx="4" ry="9" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M3.5 9h17M3.5 15h17" fill="none" stroke="currentColor" stroke-width="1.7"/>`
    },
    {
      names: ['spotify'],
      color: '#1DB954',
      svg: `<circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M5.5 9a14 14 0 0 1 12 1.5M6.5 12a11 11 0 0 1 9.5 1.3M7.5 15a8 8 0 0 1 6.8 1" fill="none" stroke="#101010" stroke-width="1.7" stroke-linecap="round"/>`
    },
    {
      names: ['x (twitter)', 'twitter', 'x'],
      color: '#ffffff',
      svg: `<path fill="currentColor" d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.8 5.7 22H2.5l7.3-8.4L2 2h6.5l4.4 6.6ZM17.8 20h1.7L7.4 3.9H5.6Z"/>`
    },
    {
      names: ['kontakt per e-mail', 'e-mail', 'email', 'mail'],
      color: '#22D3EE',
      svg: `<rect x="2.5" y="4.5" width="19" height="15" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="m3.5 6 8.5 7 8.5-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>`
    },
    {
      names: ['support', 'spenden', 'donate'],
      color: '#FF5CA8',
      svg: `<path fill="currentColor" d="M12 21s-9-5.5-9-12a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.5-9 12-9 12Z"/>`
    },
    {
      names: ['shop', 'store'],
      color: '#C084FC',
      svg: `<path d="M4 9h16l-1 12H5L4 9Z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 9V6a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`
    },
    {
      names: ['instant gaming', 'instant-gaming'],
      color: '#FF6B00',
      svg: `<path fill="currentColor" d="M5 7h14a4 4 0 0 1 3.8 5.2l-1.2 4a3 3 0 0 1-4.8 1.4L14 15h-4l-2.8 2.6a3 3 0 0 1-4.8-1.4l-1.2-4A4 4 0 0 1 5 7Zm2 2v2H5v2h2v2h2v-2h2v-2H9V9Zm8 2a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Zm3 2a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z"/>`
    }
  ];
  links.forEach((link) => {
    if (!link.title || !link.url) return;

    const a = document.createElement('a');
    a.href = link.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';

    const title = link.title.trim().toLowerCase();
    const match = iconData.find(item =>
      item.names.some(name => title === name || title.includes(name))
    );

    const icon = document.createElement('span');
    icon.className = 'social-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.style.color = match ? match.color : '#C084FC';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', '24');
    svg.setAttribute('height', '24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('aria-hidden', 'true');

    const paths = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    paths.innerHTML = match
      ? match.svg
      : '<path d="M12 2 14.8 9.2 22 12l-7.2 2.8L12 22l-2.8-7.2L2 12l7.2-2.8Z" fill="currentColor"/>';

    svg.appendChild(paths);
    icon.appendChild(svg);

    const label = document.createElement('span');
    label.className = 'social-label';
    label.textContent = link.title;

    const arrow = document.createElement('span');
    arrow.className = 'link-arrow';
    arrow.textContent = '↗';
    arrow.setAttribute('aria-hidden', 'true');

    a.append(icon, label, arrow);
    container.appendChild(a);
  });
}


  function renderEditor() {
    adminLinks.replaceChildren();
    links.forEach((link, index) => {
      const row = document.createElement('div'); row.className = 'link-editor-row';
      const title = document.createElement('input'); title.placeholder = 'Link-Name'; title.value = link.title; title.setAttribute('aria-label', 'Link-Name');
      const url = document.createElement('input'); url.placeholder = 'https://...'; url.value = link.url; url.type = 'url'; url.setAttribute('aria-label', 'Link-Adresse');
      title.addEventListener('input', () => { links[index].title = title.value; });
      url.addEventListener('input', () => { links[index].url = url.value; });
      
      const up = document.createElement('button');
      up.type = 'button';
      up.textContent = '↑';
      up.title = 'Nach oben';
      up.disabled = index === 0;

      up.addEventListener('click', () => {
        if (index === 0) return;
        [links[index - 1], links[index]] = [links[index], links[index - 1]];
        renderEditor();
      });

      const down = document.createElement('button');
      down.type = 'button';
      down.textContent = '↓';
      down.title = 'Nach unten';
      down.disabled = index === links.length - 1;

      down.addEventListener('click', () => {
        if (index >= links.length - 1) return;
        [links[index], links[index + 1]] = [links[index + 1], links[index]];
        renderEditor();
      });

      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'remove-link';
      remove.textContent = 'Entfernen';

      remove.addEventListener('click', () => {
        links.splice(index, 1);
        renderEditor();
      });

      row.append(up, down, title, url, remove);
      adminLinks.append(row);

    });
  }
  function updateAvatar(src) {
    if (src) { mainAvatar.src = src; avatarPreview.src = src; }
    mainAvatar.style.setProperty('--avatar-zoom', `${zoom / 100}`);
    avatarPreview.style.setProperty('--avatar-zoom', `${zoom / 100}`);
  }
  function openEditor() {
    nameInput.value = $('#profile-name').textContent;
    bioInput.value = $('#profile-bio').textContent;
    renderEditor();
    if (typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open', '');
  }
  $('#admin-open').addEventListener('click', openEditorWithPassword);
  $('#admin-close').addEventListener('click', () => dialog.close());
  $('#add-link').addEventListener('click', () => { links.push({ title: 'Neuer Link', url: 'https://example.com/' }); renderEditor(); });

  avatarUpload.addEventListener('change', () => {
    const file = avatarUpload.files && avatarUpload.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { alert('Bitte wähle eine Bilddatei aus.'); return; }
    if (file.size > 3 * 1024 * 1024) { alert('Das Bild ist größer als 3 MB. Bitte wähle ein kleineres Bild.'); avatarUpload.value = ''; return; }
    const reader = new FileReader();
    reader.onload = () => { pendingAvatar = String(reader.result); updateAvatar(pendingAvatar); };
    reader.onerror = () => alert('Das Bild konnte nicht geöffnet werden. Bitte probiere eine andere Datei.');
    reader.readAsDataURL(file);
  });
  avatarZoom.addEventListener('input', () => {
    zoom = Number(avatarZoom.value) || 100;
    mainAvatar.style.transform = `scale(${zoom / 100})`;
    avatarPreview.style.transform = `scale(${zoom / 100})`;
  });
  $('#save-avatar').addEventListener('click', () => {
    if (!pendingAvatar && !mainAvatar.src) { alert('Bitte wähle zuerst ein Bild aus.'); return; }
    const image = pendingAvatar || mainAvatar.src;
    try {
      localStorage.setItem('myProfileAvatar', image);
      localStorage.setItem('myProfileAvatarZoom', String(zoom));
      updateAvatar(image);
      pendingAvatar = '';
      alert('Profilbild gespeichert! ✨');
    } catch { alert('Das Bild ist zu groß zum Speichern. Bitte wähle ein kleineres Bild (unter 1 MB empfohlen).'); }
  });

  $('#save-links').addEventListener('click', () => {
    const validLinks = [];
    for (const link of links) {
      const title = link.title.trim(); const rawUrl = link.url.trim();
      if (!title || !rawUrl) continue;
      try {
        const parsed = new URL(rawUrl); 
if (!['https:', 'http:', 'mailto:'].includes(parsed.protocol)) continue;
        validLinks.push({ title, url: parsed.href });
      } catch { alert(`Diese Link-Adresse ist ungültig: ${rawUrl}`); return; }
    }
    links = validLinks;



    const name = nameInput.value.trim() || 'Dein Name';
    const bio = bioInput.value.trim() || 'Willkommen auf meiner Seite ✨';
    if (!saveData('myLinks', { name, bio, links })) return;
    $('#profile-name').textContent = name;
    $('#profile-bio').textContent = bio;
    renderLinks(); renderEditor(); dialog.close();
  });

  
const saved = safeRead('myLinks');

if (saved) {
  $('#profile-name').textContent = saved.name || 'KollapZ';
  $('#profile-bio').textContent =
    saved.bio || 'Willkommen auf meiner Seite ✨';

  if (Array.isArray(saved.links)) {
    links = saved.links;
  }
}


  const savedAvatar = localStorage.getItem('myProfileAvatar');
  const savedZoom = Number(localStorage.getItem('myProfileAvatarZoom')) || 100;
  zoom = savedZoom; avatarZoom.value = String(zoom);
  
if (savedAvatar) {
  updateAvatar(savedAvatar);
} else {
  mainAvatar.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80";
  avatarPreview.src = mainAvatar.src;
}

  mainAvatar.style.transform = `scale(${zoom / 100})`;
  avatarPreview.style.transform = `scale(${zoom / 100})`;
  renderLinks();
})();



/* 🌌 Galaxy-Cursor mit funkelnden Partikeln */
(() => {
  const glow = document.createElement('div');

  glow.style.cssText = `
    position: fixed;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: rgba(190, 120, 255, 0.55);
    box-shadow: 0 0 18px 8px rgba(160, 80, 255, 0.45);
    pointer-events: none;
    z-index: 999999;
    transform: translate(-50%, -50%);
    display: none;

  `;

 

  let lastParticle = 0;

  document.addEventListener('mousemove', (event) => {
    const x = event.clientX;
    const y = event.clientY;

    glow.style.display = 'block';
    glow.style.left = x + 'px';
    glow.style.top = y + 'px';

    if (Date.now() - lastParticle < 45) return;
    lastParticle = Date.now();

    const particle = document.createElement('span');
    const size = 2 + Math.random() * 4;
    const colors = ['#c084fc', '#8cf5ff', '#ffffff'];

    particle.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      box-shadow: 0 0 8px currentColor;
      pointer-events: none;
      z-index: 999998;
      transition: opacity 0.6s ease, transform 0.6s ease;
    `;

    document.body.appendChild(particle);

    requestAnimationFrame(() => {
      particle.style.opacity = '0';
      particle.style.transform =
        `translate(${Math.random() * 36 - 18}px, ${Math.random() * 36 - 18}px) scale(0.2)`;
    });

    setTimeout(() => particle.remove(), 700);
  });

  document.addEventListener('mouseleave', () => {
    glow.style.display = 'none';
  });
})();

