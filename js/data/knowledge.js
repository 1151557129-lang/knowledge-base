// ============================================
// 知识学习数据
// ============================================

const KNOWLEDGE_DATA = {
  npdp: {
    id: 'npdp',
    title: 'NPDP 产品管理',
    icon: '💡',
    desc: 'New Product Development Professional 国际产品经理认证知识体系',
    color: '#8b5cf6',
    categories: [
      {
        id: 'npdp-strategy', title: '战略管理', icon: '🎯',
        topics: [
          { id: 'npdp-s1', title: '产品战略规划', content: `
            <h3>产品战略规划</h3>
            <p>产品战略是企业战略的核心组成部分，决定了企业如何通过产品创造和传递价值。</p>
            <h4>战略规划流程</h4>
            <ol>
              <li><strong>环境分析</strong>：PEST分析（政治、经济、社会、技术）、五力模型分析行业竞争</li>
              <li><strong>内部评估</strong>：核心竞争力分析、资源能力审计</li>
              <li><strong>战略制定</strong>：确定产品愿景、使命和目标</li>
              <li><strong>战略执行</strong>：资源配置、组织架构调整</li>
              <li><strong>战略控制</strong>：KPI监控、战略回顾与调整</li>
            </ol>
            <h4>产品愿景声明模板</h4>
            <blockquote>对于 [目标客户]，他们的 [需求/痛点]，我们的 [产品名称] 是一个 [产品类别]，它能够 [核心价值主张]。不像 [竞争对手]，我们的产品 [差异化优势]。</blockquote>
            <h4>关键工具</h4>
            <ul>
              <li>SWOT分析</li>
              <li>安索夫矩阵（市场渗透、市场开发、产品开发、多元化）</li>
              <li>BCG矩阵（明星、现金牛、问题、瘦狗）</li>
              <li>产品路线图（Roadmap）</li>
            </ul>
          ` },
          { id: 'npdp-s2', title: '创新战略类型', content: `
            <h3>创新战略类型</h3>
            <h4>按创新程度分类</h4>
            <table>
              <tr><th>类型</th><th>描述</th><th>风险</th><th>示例</th></tr>
              <tr><td>突破式创新</td><td>全新技术/市场</td><td>极高</td><td>iPhone 初代</td></tr>
              <tr><td>平台式创新</td><td>基于平台衍生</td><td>高</td><td>iPhone 系列迭代</td></tr>
              <tr><td>衍生式创新</td><td>现有产品改进</td><td>中</td><td>功能增强版本</td></tr>
              <tr><td>增量式创新</td><td>小幅优化</td><td>低</td><td>Bug修复、UI调整</td></tr>
            </table>
            <h4>颠覆式创新理论（Christensen）</h4>
            <p>颠覆式创新从低端市场或新市场切入，逐步侵蚀主流市场：</p>
            <ul>
              <li>初始性能低于主流产品</li>
              <li>提供不同的价值主张（更简单、更便宜、更方便）</li>
              <li>随着技术进步逐步满足主流市场需求</li>
            </ul>
          ` },
          { id: 'npdp-s3', title: '产品组合管理', content: `
            <h3>产品组合管理</h3>
            <p>对企业所有产品项目进行系统评估、优先级排序和资源分配的过程。</p>
            <h4>组合管理目标</h4>
            <ul>
              <li><strong>价值最大化</strong>：确保资源投入产出比最优</li>
              <li><strong>战略一致性</strong>：产品组合与企业战略对齐</li>
              <li><strong>平衡性</strong>：短期收益与长期发展的平衡</li>
              <li><strong>资源可行性</strong>：确保有足够的资源执行</li>
            </ul>
            <h4>组合管理工具</h4>
            <ul>
              <li>气泡图：用气泡大小、位置、颜色展示多维度信息</li>
              <li>评分模型：加权评分法对项目打分排序</li>
              <li>财务模型：NPV、IRR、回收期等财务指标</li>
              <li>战略桶：按战略类别分配资源比例</li>
            </ul>
          ` }
        ]
      },
      {
        id: 'npdp-process', title: '开发流程', icon: '⚙️',
        topics: [
          { id: 'npdp-p1', title: 'Stage-Gate 门径管理', content: `
            <h3>Stage-Gate 门径管理流程</h3>
            <p>Robert Cooper 提出的门径管理流程是新产品开发的经典框架。</p>
            <h4>五个阶段</h4>
            <ol>
              <li><strong>发现（Discovery）</strong>：创意产生、机会识别</li>
              <li><strong>范围界定（Scoping）</strong>：初步市场和技术评估</li>
              <li><strong>商业论证（Business Case）</strong>：深入分析、制定项目计划</li>
              <li><strong>开发（Development）</strong>：产品设计、原型制作、测试</li>
              <li><strong>测试与验证（Testing & Validation）</strong>：市场测试、试销</li>
              <li><strong>发布（Launch）</strong>：全面上市、商业化</li>
            </ol>
            <h4>关口决策结果</h4>
            <ul>
              <li>🟢 <strong>Go</strong>：通过，进入下一阶段</li>
              <li>🟡 <strong>Recycle</strong>：有条件通过，需补充信息</li>
              <li>🟠 <strong>Hold</strong>：暂停，等待合适时机</li>
              <li>🔴 <strong>Kill</strong>：终止项目</li>
            </ul>
          ` },
          { id: 'npdp-p2', title: '精益创业与MVP', content: `
            <h3>精益创业与最小可行产品（MVP）</h3>
            <h4>构建-测量-学习循环</h4>
            <ol>
              <li><strong>构建（Build）</strong>：将想法转化为MVP</li>
              <li><strong>测量（Measure）</strong>：收集用户行为数据</li>
              <li><strong>学习（Learn）</strong>：分析数据，验证假设</li>
            </ol>
            <h4>MVP 策略</h4>
            <table>
              <tr><th>MVP类型</th><th>描述</th><th>适用场景</th></tr>
              <tr><td>落地页MVP</td><td>单页面测试市场兴趣</td><td>验证需求是否存在</td></tr>
              <tr><td>视频MVP</td><td>演示产品概念</td><td>复杂产品概念验证</td></tr>
              <tr><td>人工MVP</td><td>人工模拟自动化功能</td><td>验证服务流程</td></tr>
              <tr><td>单功能MVP</td><td>只实现核心功能</td><td>验证核心价值主张</td></tr>
            </table>
          ` },
          { id: 'npdp-p3', title: '敏捷产品开发', content: `
            <h3>敏捷产品开发</h3>
            <h4>Scrum 框架</h4>
            <p><strong>三个角色：</strong></p>
            <ul>
              <li>产品负责人（Product Owner）：管理产品待办列表</li>
              <li>Scrum Master：确保团队遵循Scrum流程</li>
              <li>开发团队：跨职能、自组织的团队</li>
            </ul>
            <p><strong>五个事件：</strong></p>
            <ol>
              <li>Sprint：固定时长的迭代周期（1-4周）</li>
              <li>Sprint计划会：确定本次Sprint的目标和任务</li>
              <li>每日站会：15分钟同步进展和障碍</li>
              <li>Sprint评审会：展示成果，收集反馈</li>
              <li>Sprint回顾会：反思改进</li>
            </ol>
            <h4>用户故事模板</h4>
            <blockquote>作为 [用户角色]，我想要 [功能/目标]，以便 [价值/原因]。</blockquote>
          ` }
        ]
      },
      {
        id: 'npdp-market', title: '市场研究', icon: '📊',
        topics: [
          { id: 'npdp-m1', title: '市场研究方法论', content: `
            <h3>市场研究方法论</h3>
            <h4>定性研究方法</h4>
            <ul>
              <li><strong>深度访谈</strong>：一对一深入交流，探索用户深层需求</li>
              <li><strong>焦点小组</strong>：6-10人小组讨论，获取多元观点</li>
              <li><strong>民族志研究</strong>：在用户自然环境中观察行为</li>
            </ul>
            <h4>定量研究方法</h4>
            <ul>
              <li><strong>问卷调查</strong>：大规模收集结构化数据</li>
              <li><strong>A/B测试</strong>：对比两个版本的效果差异</li>
              <li><strong>联合分析</strong>：了解用户对产品属性的偏好权重</li>
            </ul>
            <h4>Kano 模型</h4>
            <table>
              <tr><th>需求类型</th><th>特征</th><th>示例</th></tr>
              <tr><td>基本型需求</td><td>必须有，缺失导致不满</td><td>手机能打电话</td></tr>
              <tr><td>期望型需求</td><td>越多越满意，线性关系</td><td>手机拍照清晰度</td></tr>
              <tr><td>兴奋型需求</td><td>意想不到的惊喜</td><td>手机无线充电</td></tr>
            </table>
          ` },
          { id: 'npdp-m2', title: '用户画像与场景', content: `
            <h3>用户画像与使用场景</h3>
            <h4>用户画像（Persona）要素</h4>
            <ul>
              <li><strong>基本信息</strong>：姓名、年龄、职业、收入</li>
              <li><strong>行为特征</strong>：使用习惯、消费行为</li>
              <li><strong>目标与动机</strong>：想要达成什么</li>
              <li><strong>痛点与挫折</strong>：遇到的问题和困难</li>
            </ul>
            <h4>Jobs to be Done (JTBD)</h4>
            <p>用户购买产品不是为了拥有产品本身，而是为了完成某个"任务"。</p>
            <blockquote>当 [情境] 时，我想要 [动机]，以便 [预期结果]。</blockquote>
          ` }
        ]
      },
      {
        id: 'npdp-design', title: '设计与开发', icon: '🎨',
        topics: [
          { id: 'npdp-d1', title: '设计思维', content: `
            <h3>设计思维（Design Thinking）</h3>
            <h4>五个阶段</h4>
            <ol>
              <li><strong>共情（Empathize）</strong>：深入理解用户需求和感受</li>
              <li><strong>定义（Define）</strong>：明确核心问题</li>
              <li><strong>创意（Ideate）</strong>：产生大量解决方案</li>
              <li><strong>原型（Prototype）</strong>：快速制作低成本原型</li>
              <li><strong>测试（Test）</strong>：验证解决方案</li>
            </ol>
          ` },
          { id: 'npdp-d2', title: '产品需求文档PRD', content: `
            <h3>产品需求文档（PRD）</h3>
            <h4>PRD 核心要素</h4>
            <ol>
              <li><strong>产品概述</strong>：背景、目标、目标用户、核心价值主张</li>
              <li><strong>功能需求</strong>：功能清单、优先级（MoSCoW）、详细描述</li>
              <li><strong>非功能需求</strong>：性能、安全、兼容性</li>
              <li><strong>用户故事与验收标准</strong></li>
              <li><strong>发布计划</strong></li>
            </ol>
            <h4>需求优先级排序方法</h4>
            <ul>
              <li>RICE评分：Reach × Impact × Confidence / Effort</li>
              <li>Kano模型</li>
              <li>价值vs复杂度矩阵</li>
            </ul>
          ` }
        ]
      }
    ]
  },

  pmp: {
    id: 'pmp',
    title: 'PMP 项目管理',
    icon: '📋',
    desc: 'Project Management Professional 项目管理专业人士认证知识体系',
    color: '#059669',
    categories: [
      {
        id: 'pmp-framework', title: '项目管理框架', icon: '🏗️',
        topics: [
          { id: 'pmp-f1', title: '项目管理基础', content: `
            <h3>项目管理基础概念</h3>
            <h4>项目的定义与特征</h4>
            <p>项目是为创造独特的产品、服务或成果而进行的<strong>临时性</strong>工作。</p>
            <ul>
              <li><strong>临时性</strong>：有明确的开始和结束时间</li>
              <li><strong>独特性</strong>：每个项目都是独一无二的</li>
              <li><strong>渐进明细</strong>：项目信息随时间逐步清晰</li>
            </ul>
            <h4>五大过程组</h4>
            <ol>
              <li><strong>启动过程组</strong>：定义项目、获得授权</li>
              <li><strong>规划过程组</strong>：制定行动方案</li>
              <li><strong>执行过程组</strong>：完成工作</li>
              <li><strong>监控过程组</strong>：跟踪、审查、调整</li>
              <li><strong>收尾过程组</strong>：正式完成、移交</li>
            </ol>
          ` },
          { id: 'pmp-f2', title: '十大知识领域', content: `
            <h3>十大知识领域</h3>
            <ol>
              <li><strong>整合管理</strong>：协调所有项目管理活动</li>
              <li><strong>范围管理</strong>：确保包含且仅包含全部工作</li>
              <li><strong>进度管理</strong>：确保项目按时完成</li>
              <li><strong>成本管理</strong>：确保在预算内完成</li>
              <li><strong>质量管理</strong>：确保成果满足需求</li>
              <li><strong>资源管理</strong>：有效利用团队和物质资源</li>
              <li><strong>沟通管理</strong>：确保信息及时恰当传递</li>
              <li><strong>风险管理</strong>：识别、分析、应对风险</li>
              <li><strong>采购管理</strong>：从外部获取产品或服务</li>
              <li><strong>相关方管理</strong>：管理相关方期望和参与</li>
            </ol>
          ` }
        ]
      },
      {
        id: 'pmp-scope', title: '范围与进度', icon: '📐',
        topics: [
          { id: 'pmp-sc1', title: 'WBS 工作分解结构', content: `
            <h3>WBS 工作分解结构</h3>
            <p>WBS 是对项目可交付成果和项目工作的层次分解。</p>
            <h4>核心原则</h4>
            <ul>
              <li><strong>100% 规则</strong>：必须包含项目全部工作</li>
              <li><strong>相互独立</strong>：各元素之间不重叠</li>
              <li><strong>可管理</strong>：分解到可以估算和控制的层级</li>
              <li><strong>成果导向</strong>：以可交付成果为导向</li>
            </ul>
          ` },
          { id: 'pmp-sc2', title: '关键路径法 CPM', content: `
            <h3>关键路径法（CPM）</h3>
            <ol>
              <li>绘制网络图</li>
              <li>正推法计算最早开始（ES）和最早完成（EF）</li>
              <li>逆推法计算最晚开始（LS）和最晚完成（LF）</li>
              <li>计算浮动时间（Total Float = LS - ES）</li>
              <li>浮动时间为零的活动构成关键路径</li>
            </ol>
            <h4>进度压缩技术</h4>
            <table>
              <tr><th>技术</th><th>描述</th><th>代价</th></tr>
              <tr><td>赶工（Crashing）</td><td>增加资源缩短工期</td><td>增加成本</td></tr>
              <tr><td>快速跟进（Fast Tracking）</td><td>并行执行串行活动</td><td>增加风险</td></tr>
            </table>
          ` }
        ]
      },
      {
        id: 'pmp-cost', title: '成本与质量', icon: '💰',
        topics: [
          { id: 'pmp-c1', title: '挣值管理 EVM', content: `
            <h3>挣值管理（EVM）</h3>
            <h4>三个基本指标</h4>
            <ul>
              <li><strong>PV（计划值）</strong>：计划完成工作的预算成本</li>
              <li><strong>EV（挣值）</strong>：实际完成工作的预算成本</li>
              <li><strong>AC（实际成本）</strong>：实际完成工作的实际成本</li>
            </ul>
            <h4>偏差分析</h4>
            <table>
              <tr><th>指标</th><th>公式</th><th>含义</th></tr>
              <tr><td>CV（成本偏差）</td><td>EV - AC</td><td>正=节约，负=超支</td></tr>
              <tr><td>SV（进度偏差）</td><td>EV - PV</td><td>正=提前，负=落后</td></tr>
              <tr><td>CPI（成本绩效指数）</td><td>EV / AC</td><td>>1=节约，<1=超支</td></tr>
              <tr><td>SPI（进度绩效指数）</td><td>EV / PV</td><td>>1=提前，<1=落后</td></tr>
            </table>
            <blockquote>BAC=100万，PV=40万，EV=35万，AC=45万 → CPI=0.78，EAC=128万（预计超支28万）</blockquote>
          ` }
        ]
      },
      {
        id: 'pmp-risk', title: '风险管理', icon: '⚠️',
        topics: [
          { id: 'pmp-r1', title: '风险应对策略', content: `
            <h3>风险应对策略</h3>
            <table>
              <tr><th>类型</th><th>策略</th><th>描述</th></tr>
              <tr><td rowspan="4">威胁（负面）</td><td>规避</td><td>消除威胁或保护目标</td></tr>
              <tr><td>转移</td><td>将风险影响转移给第三方</td></tr>
              <tr><td>减轻</td><td>降低风险概率或影响</td></tr>
              <tr><td>接受</td><td>不主动处理，承受后果</td></tr>
              <tr><td rowspan="4">机会（正面）</td><td>开拓</td><td>确保机会实现</td></tr>
              <tr><td>分享</td><td>将机会分配给第三方</td></tr>
              <tr><td>提高</td><td>增加机会概率或影响</td></tr>
              <tr><td>接受</td><td>不主动追求</td></tr>
            </table>
          ` }
        ]
      },
      {
        id: 'pmp-agile', title: '敏捷管理', icon: '🔄',
        topics: [
          { id: 'pmp-a1', title: '敏捷方法与混合方法', content: `
            <h3>敏捷方法与混合方法</h3>
            <h4>敏捷适用场景</h4>
            <ul>
              <li>需求不确定或快速变化</li>
              <li>需要快速交付价值</li>
              <li>客户能持续参与</li>
            </ul>
            <h4>预测型（瀑布）适用场景</h4>
            <ul>
              <li>需求明确且稳定</li>
              <li>变更成本高</li>
              <li>有严格的法规要求</li>
            </ul>
            <h4>看板方法</h4>
            <ul>
              <li>可视化工作流程</li>
              <li>限制在制品（WIP）</li>
              <li>管理流动</li>
              <li>持续改进</li>
            </ul>
          ` }
        ]
      }
    ]
  },

  english: {
    id: 'english',
    title: '英语学习',
    icon: '🌍',
    desc: '系统化英语学习，提升听说读写综合能力',
    color: '#dc2626',
    categories: [
      {
        id: 'eng-vocab', title: '词汇积累', icon: '📝',
        topics: [
          { id: 'eng-v1', title: '高频商务词汇', content: `
            <h3>高频商务英语词汇</h3>
            <h4>产品管理相关</h4>
            <table>
              <tr><th>英文</th><th>中文</th><th>例句</th></tr>
              <tr><td>Roadmap</td><td>路线图</td><td>We need to update the product roadmap.</td></tr>
              <tr><td>Stakeholder</td><td>相关方</td><td>All stakeholders should be informed.</td></tr>
              <tr><td>Backlog</td><td>待办列表</td><td>Let's prioritize the backlog.</td></tr>
              <tr><td>Sprint</td><td>冲刺迭代</td><td>This sprint focuses on user authentication.</td></tr>
              <tr><td>MVP</td><td>最小可行产品</td><td>Let's launch the MVP first.</td></tr>
              <tr><td>Iterate</td><td>迭代</td><td>We'll iterate based on user feedback.</td></tr>
            </table>
            <h4>项目管理相关</h4>
            <table>
              <tr><th>英文</th><th>中文</th><th>例句</th></tr>
              <tr><td>Milestone</td><td>里程碑</td><td>We've reached a key milestone.</td></tr>
              <tr><td>Deliverable</td><td>可交付成果</td><td>All deliverables are on track.</td></tr>
              <tr><td>Scope creep</td><td>范围蔓延</td><td>We need to avoid scope creep.</td></tr>
              <tr><td>Resource allocation</td><td>资源分配</td><td>Resource allocation is critical.</td></tr>
            </table>
          ` },
          { id: 'eng-v2', title: '常用词根词缀', content: `
            <h3>常用词根词缀</h3>
            <h4>常见前缀</h4>
            <table>
              <tr><th>前缀</th><th>含义</th><th>示例</th></tr>
              <tr><td>un-</td><td>不、否定</td><td>unhappy, unable, uncertain</td></tr>
              <tr><td>re-</td><td>再次、重新</td><td>review, rebuild, return</td></tr>
              <tr><td>pre-</td><td>之前</td><td>preview, predict, prepare</td></tr>
              <tr><td>over-</td><td>过度</td><td>overcome, overlook, overload</td></tr>
              <tr><td>inter-</td><td>之间</td><td>international, interact</td></tr>
            </table>
            <h4>常见后缀</h4>
            <table>
              <tr><th>后缀</th><th>含义</th><th>示例</th></tr>
              <tr><td>-tion/-sion</td><td>名词化</td><td>innovation, decision</td></tr>
              <tr><td>-able/-ible</td><td>能够</td><td>scalable, flexible</td></tr>
              <tr><td>-ment</td><td>名词化</td><td>management, development</td></tr>
              <tr><td>-ive</td><td>形容词化</td><td>creative, effective</td></tr>
            </table>
          ` }
        ]
      },
      {
        id: 'eng-speaking', title: '口语表达', icon: '🗣️',
        topics: [
          { id: 'eng-sp1', title: '会议常用表达', content: `
            <h3>会议常用英语表达</h3>
            <h4>开场</h4>
            <ul>
              <li>Let's get started. / Shall we begin?</li>
              <li>Thank you all for joining today.</li>
              <li>The purpose of this meeting is to...</li>
            </ul>
            <h4>表达观点</h4>
            <ul>
              <li>From my perspective, ...</li>
              <li>I'd like to point out that...</li>
              <li>In my opinion, we should...</li>
              <li>I agree / I see your point, but...</li>
            </ul>
            <h4>讨论与决策</h4>
            <ul>
              <li>Let's move on to the next topic.</li>
              <li>Can we circle back to that later?</li>
              <li>What are your thoughts on this?</li>
              <li>Let's take a vote on this.</li>
            </ul>
            <h4>结束会议</h4>
            <ul>
              <li>Let me summarize the key takeaways.</li>
              <li>Action items: [person] will [task] by [date].</li>
              <li>Thank you for your time. See you next week.</li>
            </ul>
          ` },
          { id: 'eng-sp2', title: '邮件写作模板', content: `
            <h3>商务邮件写作模板</h3>
            <h4>请求信息</h4>
            <blockquote>Subject: Request for Information on [Topic]<br><br>Hi [Name],<br><br>I hope this email finds you well. I'm writing to inquire about [specific information].<br><br>Could you please provide [details needed] by [date]?<br><br>Thank you for your assistance.<br><br>Best regards,<br>[Your Name]</blockquote>
            <h4>项目更新</h4>
            <blockquote>Subject: [Project Name] - Weekly Update<br><br>Hi Team,<br><br>Here's a brief update on our progress this week:<br><br>✅ Completed: [tasks]<br>🔄 In Progress: [tasks]<br>⚠️ Blockers: [issues]<br><br>Next steps: [actions]<br><br>Best,<br>[Your Name]</blockquote>
          ` }
        ]
      },
      {
        id: 'eng-reading', title: '阅读提升', icon: '📖',
        topics: [
          { id: 'eng-r1', title: '推荐阅读资源', content: `
            <h3>英语阅读资源推荐</h3>
            <h4>新闻与资讯</h4>
            <ul>
              <li><strong>TechCrunch</strong>：科技行业新闻</li>
              <li><strong>Harvard Business Review</strong>：商业管理文章</li>
              <li><strong>The Economist</strong>：经济与国际时事</li>
              <li><strong>BBC News</strong>：综合新闻</li>
            </ul>
            <h4>产品与设计</h4>
            <ul>
              <li><strong>Medium</strong>：产品经理社区文章</li>
              <li><strong>Smashing Magazine</strong>：前端与设计</li>
              <li><strong>Product Hunt</strong>：新产品发现</li>
            </ul>
            <h4>阅读技巧</h4>
            <ol>
              <li>先读标题和首段，了解文章大意</li>
              <li>遇到生词先猜意思，不要立刻查字典</li>
              <li>关注文章结构（论点-论据-结论）</li>
              <li>积累好的表达和句型</li>
            </ol>
          ` }
        ]
      },
      {
        id: 'eng-listening', title: '听力训练', icon: '🎧',
        topics: [
          { id: 'eng-l1', title: '听力练习资源', content: `
            <h3>英语听力练习资源</h3>
            <h4>播客推荐</h4>
            <ul>
              <li><strong>6 Minute English</strong>（BBC）：6分钟英语，适合中级学习者</li>
              <li><strong>TED Talks Daily</strong>：TED演讲，话题广泛</li>
              <li><strong>The Daily</strong>（NYT）：每日新闻深度分析</li>
              <li><strong>How I Built This</strong>（NPR）：创业故事</li>
            </ul>
            <h4>听力练习方法</h4>
            <ol>
              <li><strong>精听</strong>：逐句听写，核对原文</li>
              <li><strong>泛听</strong>：大量输入，培养语感</li>
              <li><strong>跟读</strong>：模仿发音和语调</li>
              <li><strong>影子跟读</strong>：延迟1-2秒跟读</li>
            </ol>
          ` }
        ]
      }
    ]
  },

  legal: {
    id: 'legal',
    title: '法律法务',
    icon: '⚖️',
    desc: '法律基础知识、实务要点与热点案例分析',
    color: '#7c3aed',
    categories: [
      {
        id: 'legal-civil', title: '民法基础', icon: '📜',
        topics: [
          { id: 'leg-c1', title: '合同法要点', content: `
            <h3>合同法核心要点</h3>
            <h4>合同成立要件</h4>
            <ul>
              <li><strong>当事人适格</strong>：具有相应的民事行为能力</li>
              <li><strong>意思表示真实</strong>：不存在欺诈、胁迫等情形</li>
              <li><strong>内容合法</strong>：不违反法律、行政法规的强制性规定</li>
              <li><strong>形式合法</strong>：法律要求书面形式的应当采用书面形式</li>
            </ul>
            <h4>合同的效力</h4>
            <table>
              <tr><th>类型</th><th>情形</th><th>法律后果</th></tr>
              <tr><td>有效合同</td><td>符合生效要件</td><td>对当事人具有法律约束力</td></tr>
              <tr><td>无效合同</td><td>违反强制性规定、恶意串通</td><td>自始无效</td></tr>
              <tr><td>可撤销合同</td><td>重大误解、显失公平</td><td>撤销权人可请求撤销</td></tr>
              <tr><td>效力待定</td><td>无权代理、限制行为能力人</td><td>待追认后确定效力</td></tr>
            </table>
            <h4>违约责任</h4>
            <ul>
              <li>继续履行</li>
              <li>采取补救措施</li>
              <li>赔偿损失</li>
              <li>支付违约金</li>
            </ul>
          ` },
          { id: 'leg-c2', title: '劳动法实务', content: `
            <h3>劳动法实务要点</h3>
            <h4>劳动合同</h4>
            <ul>
              <li>用人单位自用工之日起即与劳动者建立劳动关系</li>
              <li>应当自用工之日起<strong>一个月内</strong>订立书面劳动合同</li>
              <li>超过一个月不满一年未签订的，应当支付<strong>双倍工资</strong></li>
            </ul>
            <h4>试用期规定</h4>
            <table>
              <tr><th>合同期限</th><th>试用期上限</th></tr>
              <tr><td>3个月 ≤ 期限 < 1年</td><td>1个月</td></tr>
              <tr><td>1年 ≤ 期限 < 3年</td><td>2个月</td></tr>
              <tr><td>期限 ≥ 3年或无固定期限</td><td>6个月</td></tr>
            </table>
            <h4>经济补偿金</h4>
            <p>每工作满一年支付一个月工资；六个月以上不满一年的，按一年计算；不满六个月的，支付半个月工资。</p>
          ` }
        ]
      },
      {
        id: 'legal-ip', title: '知识产权', icon: '🔐',
        topics: [
          { id: 'leg-ip1', title: '知识产权基础', content: `
            <h3>知识产权基础知识</h3>
            <h4>知识产权类型</h4>
            <table>
              <tr><th>类型</th><th>保护对象</th><th>保护期限</th></tr>
              <tr><td>专利权</td><td>发明创造</td><td>发明20年，实用新型/外观10年</td></tr>
              <tr><td>商标权</td><td>商品/服务标识</td><td>10年，可续展</td></tr>
              <tr><td>著作权</td><td>文学、艺术、科学作品</td><td>作者终生+死后50年</td></tr>
              <tr><td>商业秘密</td><td>技术信息、经营信息</td><td>只要保密即可</td></tr>
            </table>
            <h4>职务发明与非职务发明</h4>
            <ul>
              <li><strong>职务发明</strong>：执行本单位任务或主要利用单位物质技术条件完成的发明，专利权归单位</li>
              <li><strong>非职务发明</strong>：与本职工作无关的发明，专利权归发明人</li>
            </ul>
          ` }
        ]
      },
      {
        id: 'legal-corporate', title: '公司法务', icon: '🏢',
        topics: [
          { id: 'leg-co1', title: '公司治理基础', content: `
            <h3>公司治理基础知识</h3>
            <h4>公司组织机构</h4>
            <ul>
              <li><strong>股东会</strong>：最高权力机构，决定公司重大事项</li>
              <li><strong>董事会</strong>：执行股东会决议，制定经营计划</li>
              <li><strong>监事会</strong>：监督董事和高管的行为</li>
              <li><strong>经理层</strong>：负责日常经营管理</li>
            </ul>
            <h4>股东权利</h4>
            <ul>
              <li>资产收益权（分红权）</li>
              <li>参与重大决策权</li>
              <li>选择管理者权</li>
              <li>知情权</li>
              <li>优先认购权</li>
            </ul>
          ` }
        ]
      },
      {
        id: 'legal-privacy', title: '数据与隐私', icon: '🛡️',
        topics: [
          { id: 'leg-p1', title: '个人信息保护法', content: `
            <h3>个人信息保护法要点</h3>
            <h4>核心原则</h4>
            <ul>
              <li><strong>合法正当必要原则</strong>：处理个人信息应当具有明确、合理的目的</li>
              <li><strong>最小必要原则</strong>：限于实现处理目的的最小范围</li>
              <li><strong>公开透明原则</strong>：公开处理规则，明示目的、方式和范围</li>
              <li><strong>准确性原则</strong>：保证个人信息的质量</li>
            </ul>
            <h4>个人权利</h4>
            <ul>
              <li>知情权、决定权</li>
              <li>查阅、复制权</li>
              <li>更正、补充权</li>
              <li>删除权（被遗忘权）</li>
              <li>撤回同意权</li>
            </ul>
            <h4>企业合规要点</h4>
            <ul>
              <li>制定隐私政策并公示</li>
              <li>获取用户明确同意</li>
              <li>建立数据安全管理制度</li>
              <li>定期进行合规审计</li>
            </ul>
          ` }
        ]
      }
    ]
  }
};
