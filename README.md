# 📚 Knowledge Base

A modern, lightweight web-based knowledge base for documenting bot commands, workflows, and employee information. Built with vanilla JavaScript - no frameworks required!

## Features

- **🔍 Full-text search** - Find articles instantly across titles, content, and categories
- **📂 Category organization** - Group articles by topic for easy navigation
- **✍️ Markdown support** - Write documentation with full Markdown formatting
- **💾 Auto-save** - All data persists in browser localStorage
- **📱 Responsive design** - Works beautifully on desktop and mobile
- **🎨 Clean UI** - Modern, intuitive interface with no distractions

## Quick Start

### Option 1: Local Development

1. Clone this repository:
```bash
git clone https://github.com/wowsuchbot/knowledge-base.git
cd knowledge-base
```

2. Open `index.html` in your browser:
```bash
open index.html
# or
python -m http.server 8000
# then visit http://localhost:8000
```

### Option 2: Deploy to GitHub Pages

1. Go to your repository Settings
2. Navigate to Pages
3. Select "main" branch as source
4. Your knowledge base will be live at: `https://wowsuchbot.github.io/knowledge-base/`

### Option 3: Deploy Anywhere

Simply upload the three files to any web host:
- `index.html`
- `styles.css`
- `app.js`

No build process, no dependencies!

## Usage

### Creating Categories

1. Click **"+ Add Category"** in the sidebar
2. Enter a category name
3. Start organizing your articles

### Adding Articles

1. Click the **+ button** (bottom right)
2. Enter a title
3. Select a category
4. Write your content in Markdown
5. Click **Save**

### Searching

Use the search bar at the top to find articles by:
- Title
- Content
- Category name

### Editing Articles

1. Click any article to view it
2. Click **"Edit Article"** button
3. Make your changes
4. Save

## Markdown Support

The knowledge base supports full Markdown syntax:

- **Bold** with `**text**`
- *Italic* with `*text*`
- `Code` with \`code\`
- Code blocks with triple backticks
- Headers with `#`, `##`, `###`
- Lists (ordered and unordered)
- Links and more!

## Use Cases

Perfect for documenting:
- Bot commands and APIs
- Internal workflows and processes
- Employee onboarding guides
- Technical documentation
- FAQ sections
- Standard operating procedures
- Troubleshooting guides

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript** - No frameworks, just clean ES6+
- **Marked.js** - Markdown parsing (loaded via CDN)
- **LocalStorage** - Client-side persistence

## Browser Support

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Data Storage

All articles and categories are stored in your browser's localStorage. This means:
- ✅ No server required
- ✅ Works offline
- ✅ Fast and responsive
- ⚠️ Data is browser-specific (not synced across devices)
- ⚠️ Clearing browser data will delete articles

### Exporting Data

To backup your knowledge base:
1. Open browser DevTools (F12)
2. Go to Console
3. Run: `localStorage.getItem('kb_articles')`
4. Copy the JSON output
5. Save to a file

### Importing Data

To restore from backup:
1. Open browser DevTools (F12)
2. Go to Console
3. Run: `localStorage.setItem('kb_articles', 'YOUR_JSON_HERE')`
4. Refresh the page

## Customization

### Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #2563eb;  /* Main brand color */
    --secondary-color: #64748b;
    --background: #f8fafc;
    --surface: #ffffff;
}
```

### Sample Data

The app includes 2 sample articles on first load. These demonstrate the features and help users get started.

## Contributing

Feel free to open issues or submit PRs!

## License

MIT License - feel free to use this for your own projects!

## Support

Questions? Contact: mxjxn.art@gmail.com

---

Built with ❤️ for bot creators and teams who value good documentation
