#!/bin/bash

# Script to disable ALL click functionality in banner JavaScript files
# while keeping mouseover/mouseout/mouseenter/mouseleave events

echo "Disabling ALL click functionality in banner JavaScript files..."

# Find all JavaScript files
find /Users/xaviergarcia/Documents/Xavi_profile/iframes -name "main_*.js" -type f | while read file; do
    if [[ -f "$file" ]]; then
        echo "Processing: $(basename "$file")"
        
        # Remove info disclaimer click events (keeping only mouseenter/mouseleave)
        # Pattern 1: e.addEventListener("click",e=>{o?i():t()})
        sed -i '' 's/,e\.addEventListener("click",e=>{[^}]*})//' "$file"
        
        # Pattern 2: e.addEventListener("click",e=>{e.preventDefault(),this.infoClick?t.reverse():t.play(),this.infoClick=!this.infoClick})
        sed -i '' 's/e\.addEventListener("click",e=>{e\.preventDefault(),this\.infoClick?t\.reverse():t\.play(),this\.infoClick=!this\.infoClick})//' "$file"
        
        # Pattern 3: Any other click event patterns on element e
        sed -i '' 's/e\.addEventListener("click",[^)]*)//' "$file"
        
        echo "✓ Disabled click events in: $(basename "$file")"
    else
        echo "✗ File not found: $(basename "$file")"
    fi
done

echo ""
echo "Completed! All click functionality has been disabled."
echo "Mouse hover effects (mouseover/mouseout/mouseenter/mouseleave) are preserved."
