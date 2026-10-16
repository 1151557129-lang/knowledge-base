// ============================================
// 个人主页 - 暗色 Dashboard 版
// ============================================

class PersonalSite {
  constructor() {
    this.modalStack = [];
    this.lastFocused = null;
    this.init();
  }

  init() {
    this.renderKnowledgeCards();
    this.renderNews();
    this.renderInterests();
    this.renderProjects();
    this.setupModal();
    this.setupNavScroll();
    this.setupMobileMenu();
  }

  // ============================================
  // 知识学习 - 四宫格卡片
  // ============================================
  renderKnowledgeCards() {
    const grid = document.getElementById('knowledgeGrid');
    const modules = Object.values(KNOWLEDGE_DATA);

    const glowColors = {
      npdp: 'rgba(139,92,246,0.12)',
      pmp: 'rgba(5,150,105,0.12)',
      english: 'rgba(220,38,38,0.12)',
      legal: 'rgba(124,58,237,0.12)'
    };

    grid.innerHTML = modules.map(mod => `
      <div class="knowledge-card" data-module="${mod.id}" style="--card-glow: ${glowColors[mod.id] || 'var(--primary-50)'}">
        <div class="knowledge-card-icon">${mod.icon}</div>
        <div class="knowledge-card-title">${mod.title}</div>
      </div>
    `).join('');

    grid.querySelectorAll('.knowledge-card').forEach(card => {
      card.addEventListener('click', () => this.openKnowledgeModule(card.dataset.module));
      this.makeCardAccessible(card);
    });
  }

  openKnowledgeModule(moduleId) {
    const mod = KNOWLEDGE_DATA[moduleId];
    if (!mod) return;

    this.modalStack = [{ type: 'module', id: moduleId }];
    this.renderModalBreadcrumb();

    document.getElementById('modalIcon').textContent = mod.icon;
    document.getElementById('modalTitle').textContent = mod.title;
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-category-grid">
        ${mod.categories.map(cat => `
          <div class="modal-category-item" data-category="${cat.id}">
            <div class="modal-category-icon">${cat.icon}</div>
            <div class="modal-category-title">${cat.title}</div>
            <div class="modal-category-count">${cat.topics.length} 个知识点</div>
          </div>
        `).join('')}
      </div>
    `;

    document.getElementById('modalBody').querySelectorAll('.modal-category-item').forEach(item => {
      item.addEventListener('click', () => this.openKnowledgeCategory(moduleId, item.dataset.category));
      this.makeCardAccessible(item);
    });

    this.showModal();
  }

  openKnowledgeCategory(moduleId, categoryId) {
    const mod = KNOWLEDGE_DATA[moduleId];
    const cat = mod.categories.find(c => c.id === categoryId);
    if (!cat) return;

    this.modalStack = [
      { type: 'module', id: moduleId },
      { type: 'category', id: categoryId }
    ];
    this.renderModalBreadcrumb();

    document.getElementById('modalIcon').textContent = cat.icon;
    document.getElementById('modalTitle').textContent = cat.title;
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-topic-list">
        ${cat.topics.map(topic => `
          <div class="modal-topic-item" data-topic="${topic.id}">
            <span class="modal-topic-icon">📄</span>
            <span class="modal-topic-title">${topic.title}</span>
            <span class="modal-topic-arrow">→</span>
          </div>
        `).join('')}
      </div>
    `;

    document.getElementById('modalBody').querySelectorAll('.modal-topic-item').forEach(item => {
      item.addEventListener('click', () => this.openKnowledgeTopic(moduleId, categoryId, item.dataset.topic));
      this.makeCardAccessible(item);
    });

    this.scrollToModalTop();
  }

  openKnowledgeTopic(moduleId, categoryId, topicId) {
    const mod = KNOWLEDGE_DATA[moduleId];
    const cat = mod.categories.find(c => c.id === categoryId);
    const topic = cat.topics.find(t => t.id === topicId);
    if (!topic) return;

    this.modalStack = [
      { type: 'module', id: moduleId },
      { type: 'category', id: categoryId },
      { type: 'topic', id: topicId }
    ];
    this.renderModalBreadcrumb();

    document.getElementById('modalIcon').textContent = mod.icon;
    document.getElementById('modalTitle').textContent = topic.title;
    document.getElementById('modalBody').innerHTML = topic.content;

    this.scrollToModalTop();
  }

  // ============================================
  // 资讯新闻
  // ============================================
  getAllNews() {
    try {
      const userNews = JSON.parse(localStorage.getItem('news_user_entries')) || [];
      const deletedIds = new Set(userNews.filter(e => e._deleted).map(e => e.id));
      const validUser = userNews.filter(e => !e._deleted);
      const presetIds = new Set(NEWS_DATA.news.map(e => e.id));
      const merged = [...validUser.filter(e => !presetIds.has(e.id)), ...NEWS_DATA.news.filter(e => !deletedIds.has(e.id))];
      merged.sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
      return merged;
    } catch {
      return [...NEWS_DATA.news].sort((a, b) => b.date.localeCompare(a.date));
    }
  }

  renderNews() {
    const allNews = this.getAllNews();
    const listEl = document.getElementById('newsList');
    if (!listEl) return;

    // 每个板块取最新2条，按板块分组
    const grouped = {};
    NEWS_DATA.categories.forEach(cat => { grouped[cat.id] = []; });
    allNews.forEach(item => {
      if (grouped[item.category] && grouped[item.category].length < 2) {
        grouped[item.category].push(item);
      }
    });

    listEl.innerHTML = NEWS_DATA.categories.map(cat => {
      const items = grouped[cat.id] || [];
      if (items.length === 0) return '';
      const latestDate = items[0].date;
      const dateStr = `${parseInt(latestDate.slice(5,7))}月${parseInt(latestDate.slice(8,10))}日`;
      return `
        <div class="news-group" data-category="${cat.id}">
          <div class="news-group-header">
            <span class="news-group-badge" style="background:${cat.color}20;color:${cat.color}">${cat.icon} ${cat.title}</span>
            <span class="news-group-date">${dateStr}</span>
          </div>
          ${items.map(item => `
            <div class="news-group-item">
              <span class="news-group-title">${item.title}</span>
              <span class="news-group-summary">${item.summary}</span>
            </div>
          `).join('')}
        </div>
      `;
    }).join('');

    listEl.querySelectorAll('.news-group').forEach(group => {
      group.addEventListener('click', () => this.openNewsCategory(group.dataset.category));
      this.makeCardAccessible(group);
    });

    const toggleBtn = document.getElementById('toggleNews');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        window.location.href = 'pages/news.html';
      });
    }
  }

  openNewsCategory(categoryId) {
    const cat = NEWS_DATA.categories.find(c => c.id === categoryId);
    if (!cat) return;

    const allNews = this.getAllNews().filter(n => n.category === categoryId);

    this.modalStack = [{ type: 'news-category', id: categoryId }];
    this.renderModalBreadcrumb();

    document.getElementById('modalIcon').textContent = cat.icon;
    document.getElementById('modalTitle').textContent = cat.title + ' - 资讯列表';
    document.getElementById('modalBody').innerHTML = `
      <div class="news-detail-list">
        ${allNews.map(item => `
          <div class="news-detail-item">
            <div class="news-detail-date">${item.date}</div>
            <div class="news-detail-title">${item.title}</div>
            <div class="news-detail-summary">${item.summary}</div>
            <div class="news-detail-meta">
              <span class="news-detail-source">来源：${item.source}</span>
              ${item.link && item.link !== '#' ? `<a href="${item.link}" target="_blank" class="news-detail-link">查看原文 ↗</a>` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    `;

    this.showModal();
  }

  // ============================================
  // 兴趣分享
  // ============================================
  renderInterests() {
    const grid = document.getElementById('interestsGrid');
    const interests = Object.values(INTERESTS_DATA);

    grid.innerHTML = interests.map(interest => `
      <div class="interest-mini" style="background: ${interest.banner}" data-interest="${interest.id}">
        <div class="interest-mini-icon">${interest.icon}</div>
        <div class="interest-mini-title">${interest.title}</div>
      </div>
    `).join('');

    grid.querySelectorAll('.interest-mini').forEach(card => {
      card.addEventListener('click', () => this.openInterestDetail(card.dataset.interest));
      this.makeCardAccessible(card);
    });
  }

  openInterestDetail(interestId) {
    const interest = INTERESTS_DATA[interestId];
    if (!interest) return;

    this.modalStack = [{ type: 'interest', id: interestId }];
    this.renderModalBreadcrumb();

    document.getElementById('modalIcon').textContent = interest.icon;
    document.getElementById('modalTitle').textContent = interest.title + ' - 文章合集';
    const articleListHtml = interest.articles.length === 0
      ? `<p style="color:var(--text-secondary);text-align:center;padding:2rem 0;">暂无文章，敬请期待</p>`
      : `<div class="article-list">
          ${interest.articles.map(article => `
            <a href="${article.link}" class="article-item" target="_blank">
              <span class="article-icon">📄</span>
              <div class="article-info">
                <div class="article-title">${article.title}</div>
                <div class="article-meta">${article.date} · ${article.desc}</div>
              </div>
              <span class="article-arrow">↗</span>
            </a>
          `).join('')}
        </div>`;
    document.getElementById('modalBody').innerHTML = `
      <p style="color:var(--text-secondary);margin-bottom:1rem;">${interest.desc}</p>
      ${articleListHtml}
    `;

    this.showModal();
  }

  // ============================================
  // 个人项目
  // ============================================
  renderProjects() {
    const grid = document.getElementById('projectsGrid');

    grid.innerHTML = PROJECTS_DATA.map(project => `
      <div class="project-mini" data-project="${project.id}">
        <div class="project-mini-icon">${project.icon}</div>
        <div class="project-mini-info">
          <div class="project-mini-title">${project.title}</div>
          <span class="project-mini-status ${project.status}">
            <span class="project-mini-status-dot"></span>
            ${project.statusText}
          </span>
        </div>
      </div>
    `).join('');

    grid.querySelectorAll('.project-mini').forEach(card => {
      card.addEventListener('click', () => this.openProjectDetail(card.dataset.project));
      this.makeCardAccessible(card);
    });
  }

  openProjectDetail(projectId) {
    const project = PROJECTS_DATA.find(p => p.id === projectId);
    if (!project) return;

    this.modalStack = [{ type: 'project', id: projectId }];
    this.renderModalBreadcrumb();

    document.getElementById('modalIcon').textContent = project.icon;
    document.getElementById('modalTitle').textContent = project.title;
    const linkHtml = project.link
      ? `<a href="${project.link}" target="_blank" rel="noopener" class="project-detail-link">立即体验 ↗</a>`
      : '';
    document.getElementById('modalBody').innerHTML = linkHtml + project.details;

    this.showModal();
  }

  // ============================================
  // 模态框
  // ============================================
  setupModal() {
    const overlay = document.getElementById('modalOverlay');
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementById('modalClose');

    closeBtn.addEventListener('click', () => this.hideModal());
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) this.hideModal();
    });

    document.addEventListener('keydown', (e) => {
      if (!overlay.classList.contains('active')) return;

      // Esc 关闭（多层时返回上一层）
      if (e.key === 'Escape') {
        if (this.modalStack.length > 1) {
          this.modalGoBack();
        } else {
          this.hideModal();
        }
      }

      // 焦点陷阱：Tab 在模态框内循环
      if (e.key === 'Tab') {
        const focusable = modal.querySelectorAll(
          'button, a[href], a[tabindex], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  showModal() {
    // 记录触发元素，关闭时恢复焦点
    this.lastFocused = document.activeElement;
    document.getElementById('modalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
    // 焦点移到关闭按钮
    setTimeout(() => {
      const closeBtn = document.getElementById('modalClose');
      if (closeBtn) closeBtn.focus();
    }, 50);
  }

  hideModal() {
    document.getElementById('modalOverlay').classList.remove('active');
    document.body.style.overflow = '';
    this.modalStack = [];
    // 焦点返回到触发元素
    if (this.lastFocused && typeof this.lastFocused.focus === 'function') {
      this.lastFocused.focus();
      this.lastFocused = null;
    }
  }

  scrollToModalTop() {
    document.getElementById('modal').scrollTop = 0;
  }

  renderModalBreadcrumb() {
    const breadcrumb = document.getElementById('modalBreadcrumb');
    if (this.modalStack.length <= 1) {
      breadcrumb.innerHTML = '';
      return;
    }

    const labels = this.modalStack.map((item, index) => {
      let label = '';
      if (item.type === 'module') {
        label = KNOWLEDGE_DATA[item.id]?.title || item.id;
      } else if (item.type === 'category') {
        const mod = KNOWLEDGE_DATA[this.modalStack[0].id];
        label = mod?.categories.find(c => c.id === item.id)?.title || item.id;
      } else if (item.type === 'topic') {
        const mod = KNOWLEDGE_DATA[this.modalStack[0].id];
        const cat = mod?.categories.find(c => c.id === this.modalStack[1].id);
        label = cat?.topics.find(t => t.id === item.id)?.title || item.id;
      } else if (item.type === 'weekly') {
        label = WEEKLY_DATA.find(w => w.id === item.id)?.title || item.id;
      } else if (item.type === 'news-category') {
        label = NEWS_DATA.categories.find(c => c.id === item.id)?.title || item.id;
      } else if (item.type === 'interest') {
        label = INTERESTS_DATA[item.id]?.title || item.id;
      } else if (item.type === 'project') {
        label = PROJECTS_DATA.find(p => p.id === item.id)?.title || item.id;
      }

      if (index < this.modalStack.length - 1) {
        return `<a data-index="${index}" role="button" tabindex="0">${label}</a><span class="sep">›</span>`;
      }
      return `<span>${label}</span>`;
    });

    breadcrumb.innerHTML = labels.join('');

    breadcrumb.querySelectorAll('a').forEach(link => {
      const navigate = () => this.modalNavigateTo(parseInt(link.dataset.index));
      link.addEventListener('click', navigate);
      // 键盘访问（Enter/Space）
      link.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate();
        }
      });
    });
  }

  modalNavigateTo(index) {
    const item = this.modalStack[index];
    this.modalStack = this.modalStack.slice(0, index + 1);

    if (item.type === 'module') {
      this.openKnowledgeModule(item.id);
    } else if (item.type === 'category') {
      this.openKnowledgeCategory(this.modalStack[0].id, item.id);
    }
  }

  modalGoBack() {
    if (this.modalStack.length <= 1) return;
    this.modalStack.pop();
    const prev = this.modalStack[this.modalStack.length - 1];

    if (prev.type === 'module') {
      this.openKnowledgeModule(prev.id);
    } else if (prev.type === 'category') {
      this.openKnowledgeCategory(this.modalStack[0].id, prev.id);
    }
  }

  // ============================================
  // 导航栏滚动高亮
  // ============================================
  setupNavScroll() {
    const navLinks = document.querySelectorAll('.hero-nav-link');
    const sections = ['knowledge', 'news', 'interests', 'projects', 'about', 'contact'];

    // 点击平滑滚动 + 立即高亮
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
          // 立即高亮点击的链接
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
          // 平滑滚动
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // 滚动时自动高亮对应区域
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPos) {
          navLinks.forEach(l => l.classList.remove('active'));
          const activeLink = document.querySelector(`.hero-nav-link[data-section="${sections[i]}"]`);
          if (activeLink) activeLink.classList.add('active');
          break;
        }
      }
    });
  }

  // ============================================
  // 移动端汉堡菜单
  // ============================================
  setupMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('heroNavLinks');
    if (!toggle || !links) return;

    // 切换菜单开合
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.setAttribute('aria-label', isOpen ? '关闭菜单' : '打开菜单');
    });

    // 点击菜单项后关闭
    links.querySelectorAll('.hero-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', '打开菜单');
      });
    });

    // 点击菜单外区域关闭
    document.addEventListener('click', (e) => {
      if (!links.classList.contains('open')) return;
      if (!toggle.contains(e.target) && !links.contains(e.target)) {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', '打开菜单');
      }
    });
  }

  // ============================================
  // 无障碍：让可点击卡片支持键盘操作
  // ============================================
  makeCardAccessible(el) {
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        el.click();
      }
    });
  }
}

// ============================================
// 初始化
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  window.site = new PersonalSite();
});
