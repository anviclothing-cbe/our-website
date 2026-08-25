import os
import re

files = [
    "src/pages/admin/ProductsTab.tsx",
    "src/pages/admin/CategoriesTab.tsx",
    "src/pages/admin/OrdersTab.tsx",
    "src/pages/admin/CmsTab.tsx"
]

replacements = {
    r'\bbg-white\b': 'bg-card',
    r'\bbg-gray-50\b': 'bg-secondary',
    r'\bbg-gray-100\b': 'bg-secondary',
    r'\bborder-gray-50\b': 'border-border/50',
    r'\bborder-gray-100\b': 'border-border',
    r'\bborder-gray-200\b': 'border-border',
    r'\btext-gray-900\b': 'text-foreground',
    r'\btext-gray-800\b': 'text-foreground',
    r'\btext-gray-700\b': 'text-foreground',
    r'\btext-gray-600\b': 'text-muted-foreground',
    r'\btext-gray-500\b': 'text-muted-foreground',
    r'\btext-gray-400\b': 'text-muted-foreground',
    r'style={{ fontFamily: "\'Cormorant Garamond\', serif" }}': '',
    r'style={{ fontFamily: '\''Cormorant Garamond'\'', serif }}': '',
    r'text-2xl font-bold text-foreground mb-6': 'text-2xl font-bold text-foreground mb-6 font-serif',
    r'text-2xl font-bold text-foreground mb-4': 'text-2xl font-bold text-foreground mb-4 font-serif',
    r'className="font-bold text-foreground"': 'className="font-bold text-foreground font-serif text-xl"',
    r'className="font-bold text-foreground text-lg': 'className="font-bold text-foreground font-serif text-xl',
}

for filepath in files:
    if not os.path.exists(filepath):
        print(f"Skipping {filepath} (does not exist)")
        continue
    
    with open(filepath, 'r') as f:
        content = f.read()

    for pattern, replacement in replacements.items():
        content = re.sub(pattern, replacement, content)

    # Clean up any empty style props
    content = content.replace(' style={{  }}', '')
    content = content.replace(' style={{ }}', '')
    content = content.replace(' style={{}}', '')

    with open(filepath, 'w') as f:
        f.write(content)
    
    print(f"Processed {filepath}")

