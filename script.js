/* =========================================================
   Floravita — script.js
   ・モバイルナビの開閉
   ・「はじめての方へ」ポップアップ（モーダル）
   ・読みものカテゴリのタブ切り替え
   ・お問い合わせフォームの送信デモ
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  // モバイルナビの開閉は全ページ共通のため ui.js に移動しました。

  /* ---------- 1. ポップアップ（モーダル） ---------- */
  const modal = document.getElementById('introModal');
  const openBtn = document.getElementById('openIntro');
  const closeBtn = document.getElementById('closeIntro');
  const toBlogBtn = document.getElementById('modalToBlog');

  let lastFocused = null; // モーダルを開く直前のフォーカス位置を記憶

  // モーダル内のフォーカス可能な要素を取得
  const getFocusable = () =>
    modal
      ? modal.querySelectorAll('a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])')
      : [];

  const openModal = () => {
    if (!modal) return;
    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    // 開いたらモーダル内（先頭の閉じるボタン）へフォーカスを移す
    const focusables = getFocusable();
    (focusables[0] || modal).focus();
  };
  const closeModal = () => {
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = '';
    // 閉じたら呼び出し元へフォーカスを戻す
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  };

  // フォーカストラップ：モーダル表示中は Tab がモーダル内を循環するようにする
  modal && modal.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const f = getFocusable();
    if (!f.length) return;
    const first = f[0];
    const last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  openBtn && openBtn.addEventListener('click', openModal);
  closeBtn && closeBtn.addEventListener('click', closeModal);
  toBlogBtn && toBlogBtn.addEventListener('click', closeModal);

  // オーバーレイの外側クリックで閉じる
  modal && modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  // Escキーで閉じる
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.hidden) closeModal();
  });

  /* ---------- 2. 読みものカードの動的生成 ---------- */
  // data/articles.js の FLORAVITA_ARTICLES から、トップページのカードを生成する。
  // 各カードは記事個別ページ（articles/article.html?id=...）へのリンクになる。
  const blogGrid = document.getElementById('blogGrid');
  const articles = window.FLORAVITA_ARTICLES || [];

  if (blogGrid && articles.length) {
    blogGrid.innerHTML = articles
      .map((a) => `
        <a class="blog-card" href="articles/article.html?id=${encodeURIComponent(a.id)}" data-category="${a.category}">
          <div class="blog-thumb" style="--c1:${a.gradient[0]}; --c2:${a.gradient[1]};"></div>
          <div class="blog-body">
            <span class="blog-tag">${a.categoryLabel}</span>
            <h3>${a.title}</h3>
            <p>${a.excerpt}</p>
          </div>
        </a>
      `)
      .join('');
  }

  /* ---------- 3. 読みもののカテゴリ絞り込み ---------- */
  const tabs = document.querySelectorAll('.tab');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      // アクティブ表示の切り替え（見た目とスクリーンリーダー向け状態の両方を更新）
      tabs.forEach((t) => {
        t.classList.remove('is-active');
        t.setAttribute('aria-pressed', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-pressed', 'true');

      // カードは動的生成のため、クリックのたびに最新の .blog-card を取得する
      const filter = tab.dataset.tab;
      document.querySelectorAll('.blog-card').forEach((card) => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('is-hidden', !match);
      });
    });
  });

  /* ---------- 4. お問い合わせフォームの送信デモ ---------- */
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');

  form && form.addEventListener('submit', (e) => {
    e.preventDefault(); // 練習用のためページ遷移させない
    if (note) note.hidden = false;
    form.reset();
  });

});
