/* =========================================================
   Floravita — data/herbs.js
   ハーブ図鑑のデータ。herbs.html が読み込んで一覧を生成します。

   各ハーブのフィールド:
     id            : 識別子
     name          : 和名
     en            : 英名
     emoji         : アイコン
     category      : 絞り込みカテゴリ（relax / refresh / season / aroma）
     categoryLabel : 画面表示用のカテゴリ名
     description   : 紹介文（効能の断定は避けたニュートラルな表現）
     uses          : 楽しみ方タグ（配列）

   ※ 記載は一般的な紹介であり、効能・効果を保証するものではありません。
   ========================================================= */

window.FLORAVITA_HERBS = [
  {
    id: 'chamomile', name: 'カモミール', en: 'Chamomile', emoji: '🌼',
    category: 'relax', categoryLabel: 'リラックス',
    description: 'りんごのようなやさしい香りで親しまれるハーブ。一日の終わりのティーとして人気です。',
    uses: ['ティー', '夜のひととき', 'やさしい香り']
  },
  {
    id: 'lavender', name: 'ラベンダー', en: 'Lavender', emoji: '💜',
    category: 'relax', categoryLabel: 'リラックス',
    description: 'すっきりとした清涼感のある香りが魅力。香りを楽しむアイテムとして広く親しまれています。',
    uses: ['香り', '就寝前', 'ドライフラワー']
  },
  {
    id: 'peppermint', name: 'ペパーミント', en: 'Peppermint', emoji: '🌿',
    category: 'refresh', categoryLabel: 'すっきり',
    description: 'シャープで清涼感のある香り。食後やリフレッシュしたいときのティーとして楽しまれます。',
    uses: ['ティー', '食後', '気分転換']
  },
  {
    id: 'lemongrass', name: 'レモングラス', en: 'Lemongrass', emoji: '🍋',
    category: 'refresh', categoryLabel: 'すっきり',
    description: 'レモンを思わせるさわやかな香り。単体でも、ブレンドのベースとしても使いやすいハーブです。',
    uses: ['ティー', 'さわやか', 'ブレンド']
  },
  {
    id: 'rosehip', name: 'ローズヒップ', en: 'Rosehip', emoji: '🌹',
    category: 'season', categoryLabel: '季節の養生',
    description: '鮮やかな色とほのかな酸味が楽しめるハーブ。ハイビスカスとのブレンドも親しまれています。',
    uses: ['ティー', '彩り', 'ブレンド']
  },
  {
    id: 'elderflower', name: 'エルダーフラワー', en: 'Elderflower', emoji: '🌸',
    category: 'season', categoryLabel: '季節の養生',
    description: 'マスカットのような華やかな香りが特徴。季節の変わり目に楽しむ方が多いハーブです。',
    uses: ['ティー', '華やかな香り', 'コーディアル']
  },
  {
    id: 'rosemary', name: 'ローズマリー', en: 'Rosemary', emoji: '🌱',
    category: 'aroma', categoryLabel: '香りを楽しむ',
    description: 'すっきりと印象的な香りのハーブ。料理の香りづけにも、香りそのものを楽しむのにも使われます。',
    uses: ['香り', '料理', 'すっきり']
  },
  {
    id: 'hibiscus', name: 'ハイビスカス', en: 'Hibiscus', emoji: '🌺',
    category: 'refresh', categoryLabel: 'すっきり',
    description: '目の覚めるような鮮やかな赤と、きりっとした酸味が楽しめるハーブティーの定番です。',
    uses: ['ティー', '鮮やかな赤', '酸味']
  }
];
