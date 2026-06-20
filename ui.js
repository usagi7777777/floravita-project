/* =========================================================
   Floravita — ui.js
   全ページ共通のUI挙動：
     1. ダークモードの切り替え（localStorage に保存）
     2. スクロール連動の出現アニメーション（IntersectionObserver）

   ※ テーマの初期適用は、画面のちらつき(FOUC)を防ぐため
     各ページの <head> 内インラインスクリプトで先に行っています。
     このファイルは切替ボタンの配線と演出を担当します。
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 0. モバイルナビの開閉（全ページ共通） ---------- */
  // レスポンシブCSSはハンバーガー前提で site-nav を隠すため、全ページで配線する。
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const open = siteNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    // ナビ内リンクをクリックしたらメニューを閉じる
    siteNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- 1. ダークモード切り替え ---------- */
  const btn = document.getElementById('themeToggle');
  const root = document.documentElement;

  const syncToggle = () => {
    if (!btn) return;
    const dark = root.getAttribute('data-theme') === 'dark';
    btn.setAttribute('aria-pressed', String(dark));
    btn.textContent = dark ? '☀️' : '🌙';
    btn.setAttribute('aria-label', dark ? 'ライトモードに切り替え' : 'ダークモードに切り替え');
  };

  syncToggle();

  if (btn) {
    btn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('floravita-theme', next); } catch (e) { /* 保存不可でも動作は継続 */ }
      syncToggle();
    });
  }

  /* ---------- 2. スクロール連動アニメーション ---------- */
  // 対応ブラウザ かつ アニメーション許可時のみ .reveal を付与する。
  // （JS無効や IntersectionObserver 非対応のときは .reveal が付かず通常表示になる）
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if ('IntersectionObserver' in window && !prefersReduced) {
    const targets = document.querySelectorAll(
      '.card, .blog-card, .herb-card, .section-title, .section-desc, .about-figure, .article-hero'
    );
    targets.forEach((el) => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    targets.forEach((el) => observer.observe(el));
  }

});
