// Knowledge Base App
class KnowledgeBase {
    constructor() {
        this.articles = this.loadArticles();
        this.categories = this.loadCategories();
        this.currentCategory = null;
        this.currentArticle = null;
        this.editingArticle = null;
        
        this.init();
    }

    init() {
        this.renderCategories();
        this.renderArticles();
        this.attachEventListeners();
        
        // Load sample data if empty
        if (this.articles.length === 0) {
            this.loadSampleData();
        }
    }

    loadSampleData() {
        this.categories = [
            { id: 1, name: 'Getting Started' },
            { id: 2, name: 'Bot Commands' },
            { id: 3, name: 'Workflows' },
            { id: 4, name: 'Troubleshooting' }
        ];
        
        this.articles = [
            {
                id: 1,
                title: 'Welcome to the Knowledge Base',
                category: 'Getting Started',
                body: '# Welcome!\n\nThis is your knowledge base for documenting everything your bots and employees need to know.\n\n## Features\n\n- **Search**: Find articles quickly\n- **Categories**: Organize by topic\n- **Markdown**: Write with formatting\n- **Easy editing**: Click any article to edit\n\n## Getting Started\n\n1. Create categories for your topics\n2. Add articles with documentation\n3. Use search to find information fast',
                created: new Date().toISOString()
            },
            {
                id: 2,
                title: 'How to Add New Articles',
                category: 'Getting Started',
                body: '# Adding Articles\n\nClick the **+ button** in the bottom right to create a new article.\n\n## Steps\n\n1. Enter a title\n2. Select a category\n3. Write your content in Markdown\n4. Click Save\n\nYou can use Markdown formatting:\n\n- **Bold text**\n- *Italic text*\n- `code snippets`\n- Lists and more!',
                created: new Date().toISOString()
            }
        ];
        
        this.saveArticles();
        this.saveCategories();
        this.renderCategories();
        this.renderArticles();
    }

    loadArticles() {
        const stored = localStorage.getItem('kb_articles');
        return stored ? JSON.parse(stored) : [];
    }

    saveArticles() {
        localStorage.setItem('kb_articles', JSON.stringify(this.articles));
    }

    loadCategories() {
        const stored = localStorage.getItem('kb_categories');
        return stored ? JSON.parse(stored) : [];
    }

    saveCategories() {
        localStorage.setItem('kb_categories', JSON.stringify(this.categories));
    }

    renderCategories() {
        const categoryList = document.getElementById('categoryList');
        const categorySelect = document.getElementById('articleCategory');
        
        // Render sidebar
        categoryList.innerHTML = `
            <li class="${!this.currentCategory ? 'active' : ''}" data-category="all">
                <span>All Articles</span>
                <span class="category-count">${this.articles.length}</span>
            </li>
        `;
        
        this.categories.forEach(cat => {
            const count = this.articles.filter(a => a.category === cat.name).length;
            categoryList.innerHTML += `
                <li class="${this.currentCategory === cat.name ? 'active' : ''}" data-category="${cat.name}">
                    <span>${cat.name}</span>
                    <span class="category-count">${count}</span>
                </li>
            `;
        });
        
        // Render select dropdown
        categorySelect.innerHTML = '<option value="">Select Category</option>';
        this.categories.forEach(cat => {
            categorySelect.innerHTML += `<option value="${cat.name}">${cat.name}</option>`;
        });
    }

    renderArticles() {
        const container = document.getElementById('articlesContainer');
        let filteredArticles = this.currentCategory 
            ? this.articles.filter(a => a.category === this.currentCategory)
            : this.articles;
        
        // Apply search filter
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        if (searchTerm) {
            filteredArticles = filteredArticles.filter(a => 
                a.title.toLowerCase().includes(searchTerm) ||
                a.body.toLowerCase().includes(searchTerm) ||
                a.category.toLowerCase().includes(searchTerm)
            );
        }
        
        if (filteredArticles.length === 0) {
            container.innerHTML = '<p style="color: var(--text-secondary);">No articles found. Click the + button to create one!</p>';
            return;
        }
        
        container.innerHTML = filteredArticles.map(article => {
            const preview = article.body.substring(0, 150).replace(/[#*`]/g, '') + '...';
            return `
                <div class="article-card" data-id="${article.id}">
                    <span class="category-tag">${article.category}</span>
                    <h3>${article.title}</h3>
                    <p class="preview">${preview}</p>
                </div>
            `;
        }).join('');
    }

    showArticle(id) {
        const article = this.articles.find(a => a.id === id);
        if (!article) return;
        
        this.currentArticle = article;
        document.getElementById('articlesContainer').classList.add('hidden');
        const articleView = document.getElementById('articleView');
        articleView.classList.remove('hidden');
        
        const html = marked.parse(article.body);
        document.getElementById('articleContent').innerHTML = `
            <div class="article-meta">
                <span class="category-tag">${article.category}</span>
                <span style="margin-left: 1rem; color: var(--text-secondary);">
                    ${new Date(article.created).toLocaleDateString()}
                </span>
            </div>
            <h1>${article.title}</h1>
            <div class="article-body">${html}</div>
        `;
    }

    hideArticle() {
        document.getElementById('articlesContainer').classList.remove('hidden');
        document.getElementById('articleView').classList.add('hidden');
        this.currentArticle = null;
    }

    showArticleModal(article = null) {
        this.editingArticle = article;
        const modal = document.getElementById('articleModal');
        const title = document.getElementById('modalTitle');
        
        if (article) {
            title.textContent = 'Edit Article';
            document.getElementById('articleTitle').value = article.title;
            document.getElementById('articleCategory').value = article.category;
            document.getElementById('articleBody').value = article.body;
        } else {
            title.textContent = 'New Article';
            document.getElementById('articleForm').reset();
        }
        
        modal.classList.remove('hidden');
    }

    hideArticleModal() {
        document.getElementById('articleModal').classList.add('hidden');
        this.editingArticle = null;
    }

    saveArticle(title, category, body) {
        if (this.editingArticle) {
            // Update existing
            this.editingArticle.title = title;
            this.editingArticle.category = category;
            this.editingArticle.body = body;
        } else {
            // Create new
            const newArticle = {
                id: Date.now(),
                title,
                category,
                body,
                created: new Date().toISOString()
            };
            this.articles.unshift(newArticle);
        }
        
        this.saveArticles();
        this.renderCategories();
        this.renderArticles();
        this.hideArticleModal();
        
        if (this.currentArticle) {
            this.hideArticle();
        }
    }

    showCategoryModal() {
        document.getElementById('categoryModal').classList.remove('hidden');
    }

    hideCategoryModal() {
        document.getElementById('categoryModal').classList.add('hidden');
        document.getElementById('categoryForm').reset();
    }

    addCategory(name) {
        const newCategory = {
            id: Date.now(),
            name
        };
        this.categories.push(newCategory);
        this.saveCategories();
        this.renderCategories();
        this.hideCategoryModal();
    }

    attachEventListeners() {
        // Search
        document.getElementById('searchInput').addEventListener('input', () => {
            this.renderArticles();
        });
        
        // Category selection
        document.getElementById('categoryList').addEventListener('click', (e) => {
            const li = e.target.closest('li');
            if (!li) return;
            
            const category = li.dataset.category;
            this.currentCategory = category === 'all' ? null : category;
            this.renderCategories();
            this.renderArticles();
        });
        
        // Article card click
        document.getElementById('articlesContainer').addEventListener('click', (e) => {
            const card = e.target.closest('.article-card');
            if (!card) return;
            
            const id = parseInt(card.dataset.id);
            this.showArticle(id);
        });
        
        // Back button
        document.getElementById('backBtn').addEventListener('click', () => {
            this.hideArticle();
        });
        
        // Edit article button
        document.getElementById('editArticleBtn').addEventListener('click', () => {
            this.showArticleModal(this.currentArticle);
        });
        
        // FAB (add article)
        document.getElementById('addArticleBtn').addEventListener('click', () => {
            this.showArticleModal();
        });
        
        // Article form
        document.getElementById('articleForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('articleTitle').value;
            const category = document.getElementById('articleCategory').value;
            const body = document.getElementById('articleBody').value;
            this.saveArticle(title, category, body);
        });
        
        document.getElementById('cancelBtn').addEventListener('click', () => {
            this.hideArticleModal();
        });
        
        // Category form
        document.getElementById('addCategoryBtn').addEventListener('click', () => {
            this.showCategoryModal();
        });
        
        document.getElementById('categoryForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('categoryName').value;
            this.addCategory(name);
        });
        
        document.getElementById('cancelCategoryBtn').addEventListener('click', () => {
            this.hideCategoryModal();
        });
        
        // Close modals on outside click
        document.getElementById('articleModal').addEventListener('click', (e) => {
            if (e.target.id === 'articleModal') {
                this.hideArticleModal();
            }
        });
        
        document.getElementById('categoryModal').addEventListener('click', (e) => {
            if (e.target.id === 'categoryModal') {
                this.hideCategoryModal();
            }
        });
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    new KnowledgeBase();
});
