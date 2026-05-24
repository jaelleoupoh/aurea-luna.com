# To-Do List Application

## 📝 Description

Une application de gestion de tâches moderne et réactive construite avec HTML, CSS et JavaScript vanilla. L'application sauvegarde automatiquement les données dans le stockage local du navigateur (localStorage).

## ✨ Fonctionnalités

### ✅ Gestion des Tâches
- ➕ Ajouter de nouvelles tâches
- ✔️ Marquer les tâches comme complétées
- ✏️ Éditer les tâches existantes
- 🗑️ Supprimer les tâches individuelles
- 🗑️ Effacer toutes les tâches en une seule action

### 📊 Filtrage & Tri
- 🎯 Filtrer par statut (Tous, En cours, Complétées, Haute Priorité)
- 🔍 Rechercher des tâches en temps réel
- 📈 Trier par date, priorité ou ordre alphabétique

### 🎯 Gestion des Priorités
- 🔴 Haute priorité (Haute)
- 🟡 Priorité moyenne (Moyenne)
- 🟢 Basse priorité (Basse)
- Les tâches haute priorité sont mises en avant

### 📈 Statistiques
- 📊 Total des tâches
- ✅ Nombre de tâches complétées
- ⏳ Nombre de tâches en attente
- 🎯 Nombre de tâches haute priorité
- 📊 Barre de progression animée

### 💾 Stockage Local
- 🔄 Sauvegarde automatique des données
- ⏱️ Affichage de la dernière sauvegarde
- 📱 Persistance des données entre les sessions

### 🎨 Interface
- 🌙 Design moderne et responsive
- 🎨 Dégradés et animations fluides
- 📱 Adapté aux mobiles et tablettes
- 🔔 Notifications toast personnalisées
- ♿ Accessibilité (WCAG)
- 🎬 Animations réduites (prefers-reduced-motion)

## 🚀 Utilisation

### Installation

```bash
# Cloner le repository
git clone https://github.com/jaelleoupoh/aurea-luna.com.git
cd aurea-luna.com/todo-app

# Ouvrir index.html dans le navigateur
open index.html
```

### Opérations Basiques

#### Ajouter une tâche
1. Entrez le texte de la tâche dans le champ d'entrée
2. Sélectionnez la priorité (Basse, Moyenne, Haute)
3. Cliquez sur le bouton "Ajouter"

#### Marquer comme complétée
- Cliquez sur la case à cocher à gauche de la tâche

#### Supprimer une tâche
- Cliquez sur le bouton "Supprimer" (🗑️) sur la droite de la tâche

#### Filtrer les tâches
- Cliquez sur les boutons de filtre (Toutes, En cours, Complétées, Priorité)

#### Rechercher
- Utilisez le champ de recherche pour filtrer les tâches

#### Trier
- Utilisez le menu déroulant "Trier par"

## 🛠️ Structure des Fichiers

```
todo-app/
├── index.html           # Fichier HTML principal
├── assets/
│   ├── style.css        # Styles CSS
│   └── app.js           # Logique de l'application
└── README.md            # Documentation
```

## 💻 Détails Techniques

### Architecture
- **Classe TodoApp**: Gestion centralisée de l'application
- **Stockage Local**: LocalStorage API pour la persistance
- **Event Listeners**: Gestion d'événements optimisée
- **DOM Manipulation**: Création et mise à jour dynamique

### Structure des Données

Chaque tâche est un objet JSON:
```json
{
  "id": 1234567890,
  "text": "Exemple de tâche",
  "completed": false,
  "priority": "medium",
  "createdAt": "2026-05-24T10:30:00.000Z",
  "updatedAt": "2026-05-24T10:30:00.000Z"
}
```

### LocalStorage Keys
- `aurealuna_todos`: Tableau des tâches
- `aurealuna_lastSave`: Dernière heure de sauvegarde

## 🎨 Personnalisation

### Modifier les couleurs
Éditez les variables CSS dans `assets/style.css`:

```css
:root {
  --primary-color: #6366f1;
  --success-color: #10b981;
  --danger-color: #ef4444;
  /* ... autres couleurs ... */
}
```

### Ajouter des fonctionnalités

La classe `TodoApp` peut être étendue avec:
- Export/Import de données
- Répétition de tâches
- Catégories de tâches
- Dates d'échéance
- Rappels

## 🔐 Sécurité

- ✅ Protection contre les injections XSS via `escapeHtml()`
- ✅ Validation des entrées utilisateur
- ✅ Gestion d'erreurs robuste
- ✅ Pas d'envoi de données à des serveurs externes

## ♿ Accessibilité

- ✅ ARIA labels
- ✅ Navigation au clavier
- ✅ Contraste élevé
- ✅ Support des lecteurs d'écran
- ✅ Respect de prefers-reduced-motion

## 📱 Responsive Design

- ✅ Mobile (< 600px)
- ✅ Tablette (600px - 1024px)
- ✅ Desktop (> 1024px)
- ✅ Optimisé pour tous les écrans

## 🐛 Dépannage

### Les données ne sont pas sauvegardées
- Vérifiez que le localStorage n'est pas désactivé
- Vérifiez les permissions du navigateur
- Essayez un navigateur différent

### Les styles ne s'appliquent pas
- Vérifiez le chemin d'accès à `style.css`
- Videz le cache du navigateur (Ctrl+Shift+Delete)
- Vérifiez la console pour les erreurs

## 📊 Performance

- ⚡ Aucune dépendance externe (vanilla JS)
- ⚡ Fichiers petits et optimisés
- ⚡ Rendu efficace du DOM
- ⚡ Animations GPU-accélérées

## 🚀 Améliorations Futures

- [ ] Synchronisation avec cloud
- [ ] Catégories de tâches
- [ ] Dates d'échéance
- [ ] Rappels et notifications
- [ ] Mode sombre complet
- [ ] Export PDF
- [ ] Répétition de tâches
- [ ] Collaboration en temps réel

## 📄 Licence

MIT License - Libre d'utilisation

## 👨‍💻 Auteur

Créé par **jaelleoupoh** pour Aurea Luna

## 🤝 Contribution

Les contributions sont bienvenues! N'hésitez pas à ouvrir des issues ou des pull requests.

## 📞 Support

Pour toute question ou problème, veuillez ouvrir une issue sur GitHub.

---

**Restez productif avec To-Do List! 🚀**