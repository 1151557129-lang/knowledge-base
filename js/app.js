// ============================================
// 个人主页 - 暗色 Dashboard 版
// ============================================

class PersonalSite {
  constructor() {
    this.modalStack = [];
    this.init();
  }

  init() {
    this.renderKnowledgeCards();
    this.renderWeekly();
    this.renderInterests();
    this.renderProjects();
    this.setupModal();
    this.setupNavScroll();
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
  // 工作复盘 - 月度
  // ============================================
  getWeeklyEntries() {
    try {
      const userEntries = JSON.parse(localStorage.getItem('weekly_user_entries')) || [];
      const deletedIds = new Set(userEntries.filter(e => e._deleted).map(e => e.id));
      const validUser = userEntries.filter(e => !e._deleted);
      const presetIds = new Set(WEEKLY_DATA.map(e => e.id));
      const merged = [...validUser.filter(e => !presetIds.has(e.id)), ...WEEKLY_DATA.filter(e => !deletedIds.has(e.id))];
      merged.sort((a, b) => b.id.localeCompare(a.id));
      return merged;
    } catch {
      return [...WEEKLY_DATA].sort((a, b) => b.id.localeCompare(a.id));
    }
  }

  renderWeekly() {
    const entries = this.getWeeklyEntries();
    if (entries.length === 0) return;

    const listEl = document.getElementById('weeklyList');
    const items = entries.slice(0, 3);

    listEl.innerHTML = items.map(item => `
      <div class="weekly-entry" data-id="${item.id}">
        <div class="weekly-entry-header">
          <span class="weekly-entry-week">${item.label}</span>
        </div>
        <ul class="weekly-highlights">
          ${item.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
      </div>
    `).join('');

    listEl.querySelectorAll('.weekly-entry').forEach(entry => {
      entry.addEventListener('click', () => this.openWeeklyDetail(entry.dataset.id));
    });

    const toggleBtn = document.getElementById('toggleHistory');
    toggleBtn.addEventListener('click', () => {
      window.location.href = 'pages/review.html';
    });
  }

  openWeeklyDetail(id) {
    const entries = this.getWeeklyEntries();
    const item = entries.find(e => e.id === id);
    if (!item) return;

    this.modalStack = [{ type: 'weekly', id: item.id }];
    this.renderModalBreadcrumb();

    document.getElementById('modalIcon').textContent = '📊';
    document.getElementById('modalTitle').textContent = item.label;
    document.getElementById('modalBody').innerHTML = `
      <div class="weekly-edit-bar">
        <button class="weekly-edit-btn" id="weeklyEditBtn">✏️ 编辑</button>
        <button class="weekly-save-btn" id="weeklySaveBtn" style="display:none;">💾 保存</button>
      </div>
      <div class="weekly-editable" id="weeklyEditable">${item.content}</div>
    `;

    const editBtn = document.getElementById('weeklyEditBtn');
    const saveBtn = document.getElementById('weeklySaveBtn');
    const editable = document.getElementById('weeklyEditable');

    editBtn.addEventListener('click', () => {
      editable.setAttribute('contenteditable', 'true');
      editable.focus();
      editable.style.outline = '2px solid var(--primary)';
      editable.style.borderRadius = '6px';
      editBtn.style.display = 'none';
      saveBtn.style.display = 'inline-flex';
    });

    saveBtn.addEventListener('click', () => {
      editable.setAttribute('contenteditable', 'false');
      editable.style.outline = 'none';
      editBtn.style.display = 'inline-flex';
      saveBtn.style.display = 'none';
      // 保存到 localStorage
      let userEntries = [];
      try { userEntries = JSON.parse(localStorage.getItem('weekly_user_entries')) || []; } catch {}
      const idx = userEntries.findIndex(e => e.id === id);
      if (idx >= 0) {
        userEntries[idx].content = editable.innerHTML;
      } else {
        userEntries.push({ ...item, content: editable.innerHTML });
      }
      localStorage.setItem('weekly_user_entries', JSON.stringify(userEntries));
    });

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
    });
  }

  openInterestDetail(interestId) {
    const interest = INTERESTS_DATA[interestId];
    if (!interest) return;

    this.modalStack = [{ type: 'interest', id: interestId }];
    this.renderModalBreadcrumb();

    document.getElementById('modalIcon').textContent = interest.icon;
    document.getElementById('modalTitle').textContent = interest.title + ' - 文章合集';
    document.getElementById('modalBody').innerHTML = `
      <p style="color:var(--text-secondary);margin-bottom:1rem;">${interest.desc}</p>
      <div class="article-list">
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
      </div>
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
    });
  }

  openProjectDetail(projectId) {
    const project = PROJECTS_DATA.find(p => p.id === projectId);
    if (!project) return;

    this.modalStack = [{ type: 'project', id: projectId }];
    this.renderModalBreadcrumb();

    document.getElementById('modalIcon').textContent = project.icon;
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalBody').innerHTML = project.details;

    this.showModal();
  }

  // ============================================
  // 模态框
  // ============================================
  setupModal() {
    const overlay = document.getElementById('modalOverlay');
    const closeBtn = document.getElementById('modalClose');

    closeBtn.addEventListener('click', () => this.hideModal());
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) this.hideModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        if (this.modalStack.length > 1) {
          this.modalGoBack();
        } else {
          this.hideModal();
        }
      }
    });
  }

  showModal() {
    document.getElementById('modalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  hideModal() {
    document.getElementById('modalOverlay').classList.remove('active');
    document.body.style.overflow = '';
    this.modalStack = [];
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
      } else if (item.type === 'interest') {
        label = INTERESTS_DATA[item.id]?.title || item.id;
      } else if (item.type === 'project') {
        label = PROJECTS_DATA.find(p => p.id === item.id)?.title || item.id;
      }

      if (index < this.modalStack.length - 1) {
        return `<a data-index="${index}">${label}</a><span class="sep">›</span>`;
      }
      return `<span>${label}</span>`;
    });

    breadcrumb.innerHTML = labels.join('');

    breadcrumb.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        this.modalNavigateTo(parseInt(link.dataset.index));
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
    const sections = ['knowledge', 'weekly', 'interests', 'projects', 'about', 'contact'];

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
}

// ============================================
// 初始化
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  window.site = new PersonalSite();
});
