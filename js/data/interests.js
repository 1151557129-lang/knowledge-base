// ============================================
// 兴趣分享数据
// ============================================

const INTERESTS_DATA = {
  sports: {
    id: 'sports',
    title: '运动',
    icon: '🏃',
    desc: '热爱运动，在汗水中感受成长与快乐',
    banner: 'linear-gradient(135deg, #f97316, #ea580c)',
    articles: [
      { title: 'NBA 2026-27 赛季观赛指南', date: '2026-10', link: 'https://www.espn.com/nba/story/_/id/49869446/nba-preview-2026-27-tiering-30-teams-where-knicks-spurs-lakers-warriors-76ers-celtics-check-in', desc: '新赛季30队实力分层与各队阵容变化前瞻' },
      { title: '投篮姿势矫正心得', date: '2026-05', link: '#', desc: '从二段式到一段式的转变过程' },
      { title: '野球场打球的礼仪与潜规则', date: '2026-04', link: '#', desc: '那些老球皮才知道的事' },
      { title: '后卫基本功训练清单', date: '2026-03', link: '#', desc: '运球、传球、投篮每日训练计划' }
    ]
  },
  reading: {
    id: 'reading',
    title: '阅读',
    icon: '📚',
    desc: '阅读，与文字对话，在书中遇见更广阔的世界',
    banner: 'linear-gradient(135deg, #10b981, #059669)',
    articles: [
      { title: '你终究要改变 | 韩寒2016上海演讲', date: '2026-10', link: 'https://mp.weixin.qq.com/s/5_hCgX94MyrKLlGhH4Hu8g', desc: '关于改变、成长与坚持' }
    ]
  },
  music: {
    id: 'music',
    title: '音乐',
    icon: '🎵',
    desc: '用音乐治愈生活，从听众到创作者的探索',
    banner: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
    articles: [
      { title: '2026 上半年最值得听的专辑', date: '2026-06', link: '#', desc: '个人年度专辑推荐' },
      { title: '自学吉他半年的收获与心得', date: '2026-05', link: '#', desc: '从零基础到能弹唱的历程' },
      { title: '通勤路上的播客与歌单推荐', date: '2026-04', link: '#', desc: '那些让通勤变得有趣的音频' },
      { title: '独立音乐人推荐：宝藏歌手合集', date: '2026-03', link: '#', desc: '那些你可能没听过但很棒的音乐人' }
    ]
  },
  movie: {
    id: 'movie',
    title: '电影',
    icon: '🎬',
    desc: '光影之间，看尽人生百态',
    banner: 'linear-gradient(135deg, #0ea5e9, #0369a1)',
    articles: [
      { title: '2026 上半年观影报告', date: '2026-06', link: '#', desc: '半年看了50部电影，这10部最推荐' },
      { title: '产品经理必看的10部电影', date: '2026-05', link: '#', desc: '从电影中学产品思维' },
      { title: '那些改变我世界观的电影', date: '2026-04', link: '#', desc: '关于人生、选择和意义' },
      { title: '周末电影推荐：适合一个人看的片子', date: '2026-03', link: '#', desc: '独处时光的观影清单' }
    ]
  }
};
