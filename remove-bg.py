#!/usr/bin/env python3
from PIL import Image
import os

image_dir = '/Users/yohansudheer/Desktop/whoop-character/public/images'
files = ['character-energetic.png', 'character-exhausted.png', 'character-good.png',
         'character-neutral.png', 'character-tired.png']

for filename in files:
    filepath = os.path.join(image_dir, filename)
    img = Image.open(filepath).convert('RGBA')

    # Get image data
    datas = img.getdata()

    # Create new image data with transparent background
    newData = []
    for item in datas:
        # Make light gray/white pixels transparent
        if item[0] > 180 and item[1] > 180 and item[2] > 180:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(filepath)
    print(f"Processed {filename}")

print("Done!")
