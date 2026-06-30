/** 二か国語テキスト（既存サイトの data-ja / data-en に対応） */
export interface Bilingual {
  ja: string;
  en: string;
}

export interface Work {
  /** FANZA コンテンツ ID（サンプル画像フォルダ名・data-sample-target に使用） */
  id: string;
  /** カードの data-work 値 */
  workKey: string;
  title: Bilingual;
  releaseDate: Bilingual;
  summary: Bilingual;
  /** FANZA アフィリエイトリンク */
  fanzaHref: string;
  /** DLsite リンク */
  dlsiteHref: string;
  /** DLsite リンクの rel 属性（予告ページのみ sponsored を付けない） */
  dlsiteRel: string;
  /** サンプルビューアのタイトル */
  sampleTitle: Bilingual;
}

/** doujin-assets の作品サムネ URL を ID から組み立てる */
export function workImage(id: string) {
  const base = `https://doujin-assets.dmm.co.jp/digital/comic/${id}/${id}`;
  return { large: `${base}pl.jpg`, thumb: `${base}pt.jpg` };
}

/** 最新作（発売済み） */
export const latestWork: Work = {
  id: 'd_755080',
  workKey: 'engage',
  title: {
    ja: '俺がお前の嫁でお前が俺の嫁で～カスタムドールでエンゲージ～',
    en: "I'm Your Bride, You're My Bride - Custom Doll Engage",
  },
  releaseDate: {
    ja: '2026年4月29日発売',
    en: 'Released: April 29, 2026',
  },
  summary: {
    ja: '怪しいペアリングで嫁ドールの姿に変身した青年が、友人と撮影会を始めるうちに次第にその姿になりきっていくTSF漫画です。',
    en: 'A TSF manga about a young man who transforms into his bride doll through a mysterious pair ring and gradually slips into that role during a photo shoot.',
  },
  fanzaHref:
    'https://al.fanza.co.jp/?lurl=https%3A%2F%2Fwww.dmm.co.jp%2Fdc%2Fdoujin%2F-%2Fdetail%2F%3D%2Fcid%3Dd_755080%2F&af_id=ftsf-005&ch=toolbar&ch_id=link',
  dlsiteHref: 'https://dlaf.jp/maniax/dlaf/=/t/m/link/work/aid/ftsf2/id/RJ01607436.html',
  dlsiteRel: 'noopener sponsored',
  sampleTitle: {
    ja: '俺がお前の嫁でお前が俺の嫁で サンプル',
    en: 'Custom Doll Engage Sample',
  },
};

/** 新作予告（発売予定） */
export const upcomingWork: Work = {
  id: 'd_771085',
  workKey: 'new',
  title: {
    ja: '女体化した俺の僕の幸せ雌堕ち生活',
    en: 'My Happy Feminized Life',
  },
  releaseDate: {
    ja: '発売予定日：FANZA 2026年5月29日 / DLsite 2026年5月30日',
    en: 'Planned release: FANZA May 29, 2026 / DLsite May 30, 2026',
  },
  summary: {
    ja: '復讐のため悪魔を召喚した内気な少年が美少女へ変身。憎いいじめっ子も爆乳美少女へ変わり、周囲の記憶も改変されていくTSF復讐譚です。',
    en: "A TSF revenge story where a bullied boy summons a demon, becomes a beautiful girl, and transforms his bully into a seductive girl as the world's memories change.",
  },
  fanzaHref:
    'https://al.fanza.co.jp/?lurl=https%3A%2F%2Fwww.dmm.co.jp%2Fdc%2Fdoujin%2F-%2Fdetail%2F%3D%2Fcid%3Dd_771085%2F&af_id=ftsf-005&ch=toolbar&ch_id=link',
  dlsiteHref: 'https://www.dlsite.com/maniax/announce/=/product_id/RJ01634826.html',
  dlsiteRel: 'noopener',
  sampleTitle: {
    ja: '女体化した俺の僕の幸せ雌堕ち生活 サンプル',
    en: 'My Happy Feminized Life Sample',
  },
};

/** これまでの作品 */
export const pastWork: Work = {
  id: 'd_737824',
  workKey: 'app',
  title: {
    ja: '人生改変アプリで薔薇色の日々！ ～ボク♂は幸せな花嫁♀～',
    en: "Life Rewrite App: Rosy Days! - I'm a Happy Bride",
  },
  releaseDate: {
    ja: '2026年3月26日発売',
    en: 'Released: March 26, 2026',
  },
  summary: {
    ja: '人生を書き換えるアプリで美少女に改変された主人公が、恋人となった友人との甘い関係をさらに書き換えていくTSF漫画です。',
    en: 'A TSF manga about a protagonist transformed into a beautiful girl by a life-rewriting app, then deepening a sweet rewritten relationship with a friend.',
  },
  fanzaHref:
    'https://al.fanza.co.jp/?lurl=https%3A%2F%2Fwww.dmm.co.jp%2Fdc%2Fdoujin%2F-%2Fdetail%2F%3D%2Fcid%3Dd_737824%2F&af_id=ftsf-005&ch=toolbar&ch_id=link',
  dlsiteHref: 'https://dlaf.jp/maniax/dlaf/=/t/m/link/work/aid/ftsf2/id/RJ01574837.html',
  dlsiteRel: 'noopener sponsored',
  sampleTitle: {
    ja: '人生改変アプリで薔薇色の日々！ サンプル',
    en: 'Life Rewrite App Sample',
  },
};

/** サンプルビューア用：ID → タイトル / フォルダ */
export const sampleSets = [latestWork, upcomingWork, pastWork];
