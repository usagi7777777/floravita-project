/* =========================================================
   Floravita — herbs.js
   ハーブ図鑑ページの描画と絞り込み。
     1. data/herbs.js の FLORAVITA_HERBS からカードを生成
     2. キーワード検索（名前・英名・説明・タグを対象）
     3. カテゴリ絞り込み
   検索とカテゴリは「両方の条件を満たすもの」を表示します。
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('herbGrid');
  const empty = document.getElementById('herbEmpty');
  const searchInput = document.getElementById('herbSearch');
  const tabs = document.querySelectorAll('.tab');
  const herbs = window.FLORAVITA_HERBS || [];

  if (!grid) return;

  // 現在の絞り込み状態
  let query = '';
  let category = 'all';

  // --- カードを生成（検索用の文字列を data 属性に持たせる） ---
  grid.innerHTML = herbs
    .map((h) => {
      const haystack = [h.name, h.en, h.description, (h.uses || []).join(' ')]
        .join(' ')
        .toLowerCase();
      const uses = (h.uses || []).map((u) => `<span class="herb-use">${u}</span>`).join('');
      return `
        <article class="herb-card" data-cat="${h.category}" data-search="${haystack}">
          <div class="herb-emoji" aria-hidden="true">${h.emoji}</div>
          <h3>${h.name}</h3>
          <p class="herb-en">${h.en}</p>
          <p>${h.description}</p>
          <div class="herb-uses">${uses}</div>
        </article>
      `;
    })
    .join('');

  const cards = Array.from(grid.querySelectorAll('.herb-card'));

  // --- 絞り込みを適用 ---
  const applyFilter = () => {
    const q = query.trim().toLowerCase();
    let visible = 0;
    cards.forEach((card) => {
      const matchCat = category === 'all' || card.dataset.cat === category;
      const matchQuery = q === '' || card.dataset.search.includes(q);
      const show = matchCat && matchQuery;
      card.classList.toggle('is-hidden', !show);
      if (show) visible += 1;
    });
    if (empty) empty.hidden = visible !== 0;
  };

  // --- 検索入力 ---
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      query = e.target.value;
      applyFilter();
    });
  }

  // --- カテゴリボタン ---
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => {
        t.classList.remove('is-active');
        t.setAttribute('aria-pressed', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-pressed', 'true');
      category = tab.dataset.cat;
      applyFilter();
    });
  });

  applyFilter();
});
