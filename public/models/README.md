# 3D Character Models

This directory should contain 5 GLB files representing different character states based on Whoop recovery data.

## Required Files

Place the following 5 GLB files in this directory:

1. **character-energetic.glb** (Recovery 80-100%)
   - Upright pose, wide smile, bright skin
   - Green lighting theme
   - Fast breathing animation

2. **character-good.glb** (Recovery 60-79%)
   - Normal standing pose, slight smile
   - Healthy skin tone
   - Normal breathing animation

3. **character-neutral.glb** (Recovery 40-59%)
   - Relaxed pose, neutral expression
   - Standard skin tone
   - Standard animation speed

4. **character-tired.glb** (Recovery 20-39%)
   - Slouched shoulders, tired eyes
   - Pale skin tone
   - Slow breathing animation

5. **character-exhausted.glb** (Recovery 0-19%)
   - Hunched over, frowning
   - Very pale skin
   - Minimal movement

## How to Generate These Models

### Option 1: AI Image-to-3D (Recommended)

1. **Generate Character Images with AI:**
   - Use Midjourney or DALL-E 3
   - Example prompt: "3D character model, [state description], T-pose, neutral background, game asset style, Pixar quality, full body shot"
   - Generate all 5 variations

2. **Convert to 3D:**
   - Use CSM (Common Sense Machines) at csm.ai
   - Or use Rodin AI at hyperhuman.deemos.com
   - Upload each image and export as GLB

3. **Optimize in Blender (optional):**
   - Import GLB files
   - Reduce polygon count if needed (target < 10k polygons)
   - Add simple animations
   - Re-export as GLB

### Option 2: Ready Player Me + Mixamo

1. Create a base avatar at readyplayer.me
2. Download the GLB model
3. Upload to mixamo.com for automatic rigging
4. Create 5 pose variations in Blender
5. Export each as separate GLB files

### Option 3: Use Blender From Scratch

1. Model a simple humanoid character
2. Create 5 different poses/expressions
3. Export each pose as a separate GLB file

## Model Requirements

- **Format:** GLB (binary GLTF)
- **Size:** 2-5 MB per file (max 10 MB)
- **Polygons:** < 10,000 per model for web performance
- **Textures:** Embedded in GLB file
- **Animation:** Optional idle animation included

## Testing

Once you've added the models, you can test them by:

1. Running the development server: `npm run dev`
2. Opening http://localhost:3000
3. The character will load based on the current state in `data/current-state.json`
4. Change the "state" value in that file to test different models

## Placeholder Mode

Until you add the actual GLB files, the app will show a simple placeholder (gray boxes) to indicate where the character should appear. This is expected behavior during development.
