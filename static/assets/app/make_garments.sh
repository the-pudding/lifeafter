#!/bin/bash

# Define the full arrays for randomization
outfits=(tshirtJeans tshirtShorts tshirtShortShorts longSleeve tank hoodie hoodieBaggyPants tankBaggyPants dress)
m_hairstyles=(m_bald m_short m_messy m_curly)
f_hairstyles=(f_long f_bob f_ponytail)

# Ensure the output directory exists
mkdir -p bodies_clothes

for f in bodies/*.glb; do
  # Extract the filename without the path, the base name without extension, and the extension
  filename=$(basename "$f")
  basename="${filename%.*}"
  ext="${filename##*.}"
  
  # Loop twice for each input file to get 32 total outputs from 16 inputs
  for i in {1..2}; do
    
    # Pick a random outfit from the complete list
    o=${outfits[$RANDOM % ${#outfits[@]}]}
    
    # 10% chance to swap hairstyles (rolls 0-9; if 0, swap the styles)
    swap_chance=$((RANDOM % 10))
    
    # Determine gender from filename and pick appropriate hairstyle
    if [[ "$filename" == *"_m_"* ]]; then
      if [[ $swap_chance -eq 0 ]]; then
        # 10% chance: give men female hairstyles
        h=${f_hairstyles[$RANDOM % ${#f_hairstyles[@]}]}
      else
        # 90% chance: normal male hairstyles
        h=${m_hairstyles[$RANDOM % ${#m_hairstyles[@]}]}
      fi
    elif [[ "$filename" == *"_f_"* ]]; then
      if [[ $swap_chance -eq 0 ]]; then
        # 10% chance: give women male hairstyles
        h=${m_hairstyles[$RANDOM % ${#m_hairstyles[@]}]}
      else
        # 90% chance: normal female hairstyles
        h=${f_hairstyles[$RANDOM % ${#f_hairstyles[@]}]}
      fi
    else
      # Fallback to 'auto' if the filename doesn't contain _m_ or _f_
      h="auto"
    fi
    
    # Define the new output filename (e.g., base_mesh_246_tri_walking_m_athletic_v1.glb)
    out_file="bodies_clothes/${basename}_v${i}.${ext}"
    
    # Run the python script with the new flags
    python3 shape_garments.py "$f" "$out_file" \
      --outfit "$o" \
      --hairstyle "$h" \
      --features \
      --shirt-thick 0.16 \
      --tucked
      
  done
done