// ============================================
// 资讯新闻 - 四板块数据
// ============================================

const NEWS_DATA = {
  categories: [
    { id: 'xiaomi', title: '小米/智能硬件', icon: '📱', color: '#ff6900' },
    { id: 'ai', title: 'AI/IT科技', icon: '🤖', color: '#8b5cf6' },
    { id: 'display', title: '半导体显示', icon: '🖥️', color: '#06b6d4' },
    { id: 'stock', title: 'A股', icon: '📈', color: '#ef4444' }
  ],
  news: [
    // ---- 小米/智能硬件 ----
    {
      id: 'news-001',
      category: 'xiaomi',
      date: '2026-07-01',
      title: '小米YU7上市首月交付破万，雷军称产能持续爬坡',
      summary: '小米汽车第二款车型YU7上市首月交付量突破1万台，雷军在社交媒体表示工厂产能仍在持续爬坡中，目标年内交付10万台。',
      source: '小米官方',
      link: '#'
    },
    {
      id: 'news-002',
      category: 'xiaomi',
      date: '2026-07-01',
      title: '小米电视S Pro 2026款发布：Mini LED背光+144Hz高刷',
      summary: '小米发布2026款电视S Pro系列，搭载Mini LED背光技术，支持144Hz高刷新率，覆盖55/65/75/85四个尺寸段，售价3999元起。',
      source: 'IT之家',
      link: '#'
    },
    {
      id: 'news-003',
      category: 'xiaomi',
      date: '2026-07-01',
      title: '小米澎湃OS 3.0开始推送：AI能力全面升级',
      summary: '小米澎湃OS 3.0正式版开始向旗舰机型推送，新增AI智能体框架、跨设备协同增强、隐私安全等多项升级。',
      source: '36氪',
      link: '#'
    },

    // ---- AI/IT科技 ----
    {
      id: 'news-004',
      category: 'ai',
      date: '2026-07-01',
      title: 'Claude 4.5发布：Anthropic推出新一代大模型',
      summary: 'Anthropic发布Claude 4.5系列模型，在推理、编程、多模态理解方面均有显著提升，API价格保持不变。',
      source: 'Anthropic官方',
      link: '#'
    },
    {
      id: 'news-005',
      category: 'ai',
      date: '2026-07-01',
      title: 'OpenAI宣布GPT-5全面开放：免费用户也可使用',
      summary: 'OpenAI宣布GPT-5向所有ChatGPT用户开放，免费版有使用次数限制，Plus用户无限制。模型在复杂推理和长文本处理上有重大突破。',
      source: '量子位',
      link: '#'
    },
    {
      id: 'news-006',
      category: 'ai',
      date: '2026-07-01',
      title: '国内AI Agent应用爆发：办公、编程、客服场景率先落地',
      summary: '多家国内AI企业推出Agent产品，覆盖办公自动化、代码编写、智能客服等场景，商业化进程加速。',
      source: '36氪',
      link: '#'
    },

    // ---- 半导体显示 ----
    {
      id: 'news-007',
      category: 'display',
      date: '2026-07-01',
      title: '京东方第8.6代OLED产线量产在即，瞄准IT面板市场',
      summary: '京东方成都8.6代OLED产线进入量产倒计时，主要生产笔记本和平板用OLED面板，预计年内实现规模出货。',
      source: '集微网',
      link: '#'
    },
    {
      id: 'news-008',
      category: 'display',
      date: '2026-07-01',
      title: 'TCL华星t9产线满产：LCD电视面板全球份额持续提升',
      summary: 'TCL华星t9产线达到满产状态，月产能18万片大板，LCD电视面板全球市场份额进一步提升至20%以上。',
      source: 'CINNO Research',
      link: '#'
    },
    {
      id: 'news-009',
      category: 'display',
      date: '2026-07-01',
      title: 'Mini LED背光电视渗透率突破15%，成本下降推动普及',
      summary: '2026年上半年Mini LED背光电视渗透率突破15%，随着芯片成本下降和封装技术成熟，终端售价持续走低。',
      source: 'LEDinside',
      link: '#'
    },

    // ---- A股 ----
    {
      id: 'news-010',
      category: 'stock',
      date: '2026-07-01',
      title: 'A股7月开门红：沪指站上3500点，科技板块领涨',
      summary: '7月首个交易日A股三大指数集体上涨，沪指站上3500点整数关口，半导体、AI算力板块涨幅居前。',
      source: '东方财富',
      link: '#'
    },
    {
      id: 'news-011',
      category: 'stock',
      date: '2026-07-01',
      title: '北向资金连续5日净买入，累计超200亿元',
      summary: '外资持续加仓A股，北向资金连续5个交易日净买入，累计金额超200亿元，重点增持科技和消费板块。',
      source: '同花顺',
      link: '#'
    },
    {
      id: 'news-012',
      category: 'stock',
      date: '2026-07-01',
      title: '小米集团股价创新高：汽车+AIoT双轮驱动估值重塑',
      summary: '小米集团港股股价创历史新高，市值突破万亿港元。分析师认为汽车业务放量和AIoT生态扩张是核心驱动力。',
      source: '新浪财经',
      link: '#'
    }
  ]
};
