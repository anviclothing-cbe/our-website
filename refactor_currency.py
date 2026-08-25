import os
import re

TARGET_DIR = "client/src"

# We want to find patterns like:
# ₹{product.price.toLocaleString("en-IN")}
# ₹{(product.price * item.quantity).toLocaleString("en-IN")}
# ₹{item.product.price.toLocaleString("en-IN")}
# And replace them with:
# {formatPrice(product.price)}

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    original_content = content
    
    # Simple regex to catch most cases of ₹{ ... .toLocaleString("en-IN") }
    # Group 1 is the expression inside
    pattern1 = r'₹\{([^}]+)\.toLocaleString\("en-IN"\)\}'
    content = re.sub(pattern1, r'{formatPrice(\1)}', content)
    
    # Catch simple ₹{price} without toLocaleString
    pattern2 = r'₹\{([^}]+)\}'
    # But wait, only if it doesn't already have formatPrice
    # Actually, let's just do a manual replace for the most common ones
    # Because ₹{...} might be something else
    # Let's just catch ₹ and replace with formatPrice where we can
    
    if content == original_content:
        # Check for other patterns
        if "₹" in content:
            # We will manually inspect these or just do a broader replace
            content = re.sub(r'`₹\$\{([^}]+)\.toLocaleString\("en-IN"\)\}`', r'formatPrice(\1)', content)
            content = re.sub(r'₹([0-9,]+)', lambda m: f'{{formatPrice({m.group(1).replace(",", "")})}}', content)

    # If we made replacements, we need to import useCurrency
    if content != original_content and "useCurrency" not in content and "formatPrice" in content:
        # Check if it's a React component
        if "export function" in content or "export default function" in content or "const " in content:
            # Add import
            import_stmt = 'import { useCurrency } from "@/contexts/CurrencyContext";\n'
            # Find last import
            last_import_idx = content.rfind("import ")
            if last_import_idx != -1:
                end_of_line = content.find("\n", last_import_idx)
                content = content[:end_of_line+1] + import_stmt + content[end_of_line+1:]
            else:
                content = import_stmt + content

            # Add hook call inside component
            # This is tricky with regex, we'll try to find the main component
            # "export function ComponentName() {"
            func_pattern = r'(export (?:default )?function [A-Z][a-zA-Z0-9_]*\s*\([^)]*\)\s*\{)'
            if re.search(func_pattern, content):
                content = re.sub(func_pattern, r'\1\n  const { formatPrice } = useCurrency();', content)
            else:
                # Arrow function components
                arrow_pattern = r'(const [A-Z][a-zA-Z0-9_]*\s*=\s*\([^)]*\)\s*=>\s*\{)'
                if re.search(arrow_pattern, content):
                    content = re.sub(arrow_pattern, r'\1\n  const { formatPrice } = useCurrency();', content)

    with open(filepath, 'w') as f:
        f.write(content)

for root, _, files in os.walk(TARGET_DIR):
    for file in files:
        if file.endswith(('.tsx', '.ts')) and file != "CurrencyContext.tsx":
            process_file(os.path.join(root, file))

print("Done refactoring currency.")
