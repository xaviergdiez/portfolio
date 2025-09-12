#!/bin/bash

# Script to disable click functionality in all banner JavaScript files
# while keeping mouseover/mouseout events

echo "Disabling click functionality in banner JavaScript files..."

# Array of all JavaScript files to process
files=(
    "/Users/xaviergarcia/Documents/Xavi_profile/iframes/F70_120x600/main_fcff06c1370057dcc504.js"
    "/Users/xaviergarcia/Documents/Xavi_profile/iframes/F70_160x600/main_d097267bb0e3a376ff6e.js"
    "/Users/xaviergarcia/Documents/Xavi_profile/iframes/F70_300x250/main_9df239ac25d566c01cb7.js"
    "/Users/xaviergarcia/Documents/Xavi_profile/iframes/F70_300x600/main_0b2237ef6833d4938665.js"
    "/Users/xaviergarcia/Documents/Xavi_profile/iframes/F70_320x50/main_3698b2235d371bffb727.js"
    "/Users/xaviergarcia/Documents/Xavi_profile/iframes/F70_728x90/main_ab511441817b8aa2672c.js"
    "/Users/xaviergarcia/Documents/Xavi_profile/iframes/F70_970x250/main_06f6dbc6162a7412cbbc.js"
    "/Users/xaviergarcia/Documents/Xavi_profile/iframes/G26_160x600/main_8be68faa1f4d80495fca.js"
    "/Users/xaviergarcia/Documents/Xavi_profile/iframes/G26_300x250/main_fa44eb3f6afa2e057318.js"
    "/Users/xaviergarcia/Documents/Xavi_profile/iframes/G26_300x250/main_0f04cf2a391b10a8d37d.js"
    "/Users/xaviergarcia/Documents/Xavi_profile/iframes/G26_300x600/main_e4e27661b2a04a4a6db2.js"
    "/Users/xaviergarcia/Documents/Xavi_profile/iframes/G26_300x600_V2/main_9503e612ba8496a4c9da.js"
    "/Users/xaviergarcia/Documents/Xavi_profile/iframes/G26_300x600_V3/main_942d63deccaabc6e5ee7.js"
    "/Users/xaviergarcia/Documents/Xavi_profile/iframes/G26_300x600_V4/main_b399da838b83ebc9274a.js"
    "/Users/xaviergarcia/Documents/Xavi_profile/iframes/G26_300x600_V5/main_ead4ecf22fbb69c0e1f3.js"
    "/Users/xaviergarcia/Documents/Xavi_profile/iframes/G26_300x600_V6/main_11b369ac60980e35f425.js"
    "/Users/xaviergarcia/Documents/Xavi_profile/iframes/G26_300x600_V7/main_47ecdde81d2158464812.js"
    "/Users/xaviergarcia/Documents/Xavi_profile/iframes/G26_320x50/main_f1dbe9fce9a05ee814fa.js"
    "/Users/xaviergarcia/Documents/Xavi_profile/iframes/G26_336x280/main_8687be6072a6af677fbb.js"
    "/Users/xaviergarcia/Documents/Xavi_profile/iframes/G26_728x90/main_206691cfd10c24ce3b80.js"
    "/Users/xaviergarcia/Documents/Xavi_profile/iframes/G26_970x250/main_6013394335d15625664a.js"
    "/Users/xaviergarcia/Documents/Xavi_profile/iframes/J01_300x250/main_8cc8ec1db86d6c471695.js"
    "/Users/xaviergarcia/Documents/Xavi_profile/iframes/J01_320x100/main_5ef3fb7375e071c19fd9.js"
    "/Users/xaviergarcia/Documents/Xavi_profile/iframes/J01_970x250/main_6e5b661b3c216c81d971.js"
    "/Users/xaviergarcia/Documents/Xavi_profile/iframes/J05_320x320/main_06b187af648abccd3271.js"
    "/Users/xaviergarcia/Documents/Xavi_profile/iframes/J05_728x90/main_df70391f45117d1bac65.js"
)

# Counter for successful modifications
count=0

# Process each file
for file in "${files[@]}"; do
    if [[ -f "$file" ]]; then
        # Remove the click event listener while keeping mouseover/mouseout
        if sed -i '' 's/this\.domMainExit\.addEventListener("click",this\.handleClick),//g' "$file"; then
            echo "✓ Processed: $(basename "$file")"
            ((count++))
        else
            echo "✗ Failed to process: $(basename "$file")"
        fi
    else
        echo "✗ File not found: $(basename "$file")"
    fi
done

echo ""
echo "Completed! Successfully processed $count files."
echo "Click functionality has been disabled while keeping hover effects."
