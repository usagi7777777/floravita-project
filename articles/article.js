/* =========================================================
   Floravita — articles/article.js
   記事個別ページの描画。
   URLの ?id=▲▲ を読み取り、data/articles.js の
   FLORAVITA_ARTICLES から該当記事を探して表示する。
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('articleRoot');
  if (!root) return;

  const id = new URLSearchParams(window.location.search).get('id');
  const articles = window.FLORAVITA_ARTICLES || [];
  const article = articles.find((a) => a.id === id);

  // 記事が見つからない場合のフォールバック
  if (!article) {
    root.innerHTML = `
      <p class="article-eyebrow">Not found</p>
      <h1 class="article-title">記事が見つかりませんでした</h1>
      <p class="article-lead">お探しの記事は存在しないか、移動した可能性があります。</p>
    `;
    return;
  }

  // タブのタイトルを記事名に更新
  document.title = `${article.title}｜Floravita`;

  const dateText = formatDate(article.date);
  const bodyHtml = article.body.map((p) => `<p>${p}</p>`).join('');

  root.innerHTML = `
    <p class="article-eyebrow">
      <span class="blog-tag">${article.categoryLabel}</span>
      <span class="article-date">${dateText}</span>
    </p>
    <h1 class="article-title">${article.title}</h1>
    <div class="article-hero" style="--c1:${article.gradient[0]}; --c2:${article.gradient[1]};"></div>
    <div class="article-body">${bodyHtml}</div>
  `;
});

/* YYYY-MM-DD → 「YYYY年M月D日」 */
function formatDate(iso) {
  if (!iso) return '';
  const parts = iso.split('-').map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) return iso;
  const [y, m, d] = parts;
  return `${y}年${m}月${d}日`;
}
