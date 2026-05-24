/**
 * To-Do List Application
 * Complete task management with local storage functionality
 */

class TodoApp {
  constructor() {
    this.todos = [];
    this.currentFilter = 'all';
    this.currentSort = 'date-desc';
    this.searchTerm = '';
    this.storageKey = 'aurealuna_todos';
    this.lastSaveKey = 'aurealuna_lastSave';
    
    this.initializeElements();
    this.loadFromStorage();
    this.attachEventListeners();
    this.render();
  }

  /**
   * Initialize DOM elements
   */
  initializeElements() {
    this.form = document.getElementById('todoForm');
    this.input = document.getElementById('todoInput');
    this.prioritySelect = document.getElementById('prioritySelect');
    this.todoList = document.getElementById('todoList');
    this.emptyState = document.getElementById('emptyState');
    this.clearAllBtn = document.getElementById('clearAllBtn');
    this.totalTasksSpan = document.getElementById('totalTasks');
    this.completedTasksSpan = document.getElementById('completedTasks');
    this.pendingTasksSpan = document.getElementById('pendingTasks');
    this.highPrioritySpan = document.getElementById('highPriorityTasks');
    this.progressFill = document.getElementById('progressFill');
    this.progressPercent = document.getElementById('progressPercent');
    this.searchInput = document.getElementById('searchInput');
    this.sortSelect = document.getElementById('sortSelect');
    this.lastSavedSpan = document.getElementById('lastSaved');
    this.toastContainer = document.getElementById('toastContainer');
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    this.form.addEventListener('submit', (e) => this.handleAddTodo(e));
    this.clearAllBtn.addEventListener('click', () => this.handleClearAll());
    this.searchInput.addEventListener('input', (e) => this.handleSearch(e));
    this.sortSelect.addEventListener('change', (e) => this.handleSort(e));
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleFilter(e));
    });
  }

  /**
   * Handle adding a new todo
   */
  handleAddTodo(e) {
    e.preventDefault();
    
    const text = this.input.value.trim();
    const priority = this.prioritySelect.value;
    
    if (!text) {
      this.showToast('Veuillez entrer une tâche', 'error');
      return;
    }
    
    const todo = {
      id: Date.now(),
      text: text,
      completed: false,
      priority: priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.todos.unshift(todo);
    this.saveToStorage();
    this.render();
    this.form.reset();
    this.prioritySelect.value = 'medium';
    this.showToast('Tâche ajoutée avec succès! ✓', 'success');
    this.input.focus();
  }

  /**
   * Handle toggling todo completion
   */
  handleToggleTodo(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      todo.updatedAt = new Date().toISOString();
      this.saveToStorage();
      this.render();
      
      const message = todo.completed ? 'Tâche complétée! ✓' : 'Tâche marquée comme en cours';
      this.showToast(message, 'success');
    }
  }

  /**
   * Handle deleting a todo
   */
  handleDeleteTodo(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche?')) {
      this.todos = this.todos.filter(t => t.id !== id);
      this.saveToStorage();
      this.render();
      this.showToast('Tâche supprimée', 'success');
    }
  }

  /**
   * Handle clearing all todos
   */
  handleClearAll() {
    if (this.todos.length === 0) {
      this.showToast('Aucune tâche à supprimer', 'info');
      return;
    }
    
    if (confirm('Êtes-vous sûr de vouloir supprimer TOUTES les tâches?')) {
      this.todos = [];
      this.saveToStorage();
      this.render();
      this.showToast('Toutes les tâches ont été supprimées', 'success');
    }
  }

  /**
   * Handle filter change
   */
  handleFilter(e) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    e.target.closest('.filter-btn').classList.add('active');
    this.currentFilter = e.target.closest('.filter-btn').dataset.filter;
    this.render();
  }

  /**
   * Handle search
   */
  handleSearch(e) {
    this.searchTerm = e.target.value.toLowerCase().trim();
    this.render();
  }

  /**
   * Handle sort change
   */
  handleSort(e) {
    this.currentSort = e.target.value;
    this.render();
  }

  /**
   * Filter todos based on current filter
   */
  filterTodos(todos) {
    switch (this.currentFilter) {
      case 'pending':
        return todos.filter(t => !t.completed);
      case 'completed':
        return todos.filter(t => t.completed);
      case 'high':
        return todos.filter(t => t.priority === 'high');
      default:
        return todos;
    }
  }

  /**
   * Search todos
   */
  searchTodos(todos) {
    if (!this.searchTerm) return todos;
    return todos.filter(t => t.text.toLowerCase().includes(this.searchTerm));
  }

  /**
   * Sort todos
   */
  sortTodos(todos) {
    const sorted = [...todos];
    
    switch (this.currentSort) {
      case 'date-asc':
        return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'priority':
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return sorted.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
      case 'alpha':
        return sorted.sort((a, b) => a.text.localeCompare(b.text, 'fr'));
      case 'date-desc':
      default:
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  }

  /**
   * Get filtered and sorted todos
   */
  getDisplayTodos() {
    let filtered = this.filterTodos(this.todos);
    filtered = this.searchTodos(filtered);
    return this.sortTodos(filtered);
  }

  /**
   * Update statistics
   */
  updateStats() {
    const total = this.todos.length;
    const completed = this.todos.filter(t => t.completed).length;
    const pending = total - completed;
    const highPriority = this.todos.filter(t => t.priority === 'high' && !t.completed).length;
    
    this.totalTasksSpan.textContent = total;
    this.completedTasksSpan.textContent = completed;
    this.pendingTasksSpan.textContent = pending;
    this.highPrioritySpan.textContent = highPriority;
    
    // Update progress
    const progressPercent = total === 0 ? 0 : Math.round((completed / total) * 100);
    this.progressFill.style.width = progressPercent + '%';
    this.progressPercent.textContent = progressPercent + '%';
  }

  /**
   * Render the todo list
   */
  render() {
    const displayTodos = this.getDisplayTodos();
    this.todoList.innerHTML = '';
    
    if (displayTodos.length === 0) {
      this.emptyState.classList.add('show');
      return;
    } else {
      this.emptyState.classList.remove('show');
    }
    
    displayTodos.forEach(todo => {
      const li = document.createElement('li');
      li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
      
      const priorityClass = `priority-${todo.priority}`;
      const priorityLabel = this.getPriorityLabel(todo.priority);
      const dateFormatted = this.formatDate(todo.createdAt);
      
      li.innerHTML = `
        <div class="checkbox-wrapper">
          <input 
            type="checkbox" 
            class="todo-checkbox" 
            ${todo.completed ? 'checked' : ''}
            data-id="${todo.id}"
          >
        </div>
        <div class="todo-content">
          <span class="priority-badge ${priorityClass}">
            <span class="priority-text">${priorityLabel}</span>
          </span>
          <span class="todo-text">${this.escapeHtml(todo.text)}</span>
        </div>
        <span class="todo-date">${dateFormatted}</span>
        <div class="todo-actions">
          <button class="todo-btn todo-btn-edit" data-id="${todo.id}" title="Éditer">
            <i class="fas fa-edit"></i>
          </button>
          <button class="todo-btn todo-btn-delete" data-id="${todo.id}" title="Supprimer">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      `;
      
      // Add event listeners to checkbox
      const checkbox = li.querySelector('.todo-checkbox');
      checkbox.addEventListener('change', () => this.handleToggleTodo(todo.id));
      
      // Add event listeners to delete button
      const deleteBtn = li.querySelector('.todo-btn-delete');
      deleteBtn.addEventListener('click', () => this.handleDeleteTodo(todo.id));
      
      // Add event listeners to edit button (future functionality)
      const editBtn = li.querySelector('.todo-btn-edit');
      editBtn.addEventListener('click', () => this.handleEditTodo(todo.id));
      
      this.todoList.appendChild(li);
    });
    
    this.updateStats();
  }

  /**
   * Handle editing a todo (placeholder for future enhancement)
   */
  handleEditTodo(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      const newText = prompt('Éditer la tâche:', todo.text);
      if (newText && newText.trim()) {
        todo.text = newText.trim();
        todo.updatedAt = new Date().toISOString();
        this.saveToStorage();
        this.render();
        this.showToast('Tâche mise à jour', 'success');
      }
    }
  }

  /**
   * Get priority label
   */
  getPriorityLabel(priority) {
    const labels = {
      high: '!',
      medium: '•',
      low: '○'
    };
    return labels[priority] || '•';
  }

  /**
   * Format date
   */
  formatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Hier';
    } else {
      return date.toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' });
    }
  }

  /**
   * Escape HTML to prevent XSS
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Show toast notification
   */
  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
      <span>${message}</span>
    `;
    
    this.toastContainer.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideInRight 0.3s ease-out reverse';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  /**
   * Save to local storage
   */
  saveToStorage() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.todos));
      const now = new Date();
      const timeString = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
      localStorage.setItem(this.lastSaveKey, timeString);
      this.lastSavedSpan.textContent = timeString;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      this.showToast('Erreur de sauvegarde', 'error');
    }
  }

  /**
   * Load from local storage
   */
  loadFromStorage() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        this.todos = JSON.parse(stored);
      }
      
      const lastSave = localStorage.getItem(this.lastSaveKey);
      if (lastSave) {
        this.lastSavedSpan.textContent = lastSave;
      }
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      this.showToast('Erreur de chargement', 'error');
    }
  }

  /**
   * Export todos as JSON
   */
  exportAsJSON() {
    const dataStr = JSON.stringify(this.todos, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `todos_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }

  /**
   * Import todos from JSON
   */
  importFromJSON(jsonData) {
    try {
      const imported = JSON.parse(jsonData);
      if (Array.isArray(imported)) {
        this.todos = imported;
        this.saveToStorage();
        this.render();
        this.showToast('Tâches importées avec succès!', 'success');
      }
    } catch (error) {
      console.error('Erreur lors de l\'import:', error);
      this.showToast('Erreur lors de l\'import', 'error');
    }
  }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.app = new TodoApp();
  });
} else {
  window.app = new TodoApp();
}