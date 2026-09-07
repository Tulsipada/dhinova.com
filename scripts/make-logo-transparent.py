from PIL import Image
from pathlib import Path

src = Path(
    r"C:\Users\tulsi\.cursor\projects\d-Projects-dhinova-com\assets\d__Projects_dhinova.com_public_logo.png"
)
out_dir = Path(r"D:\Projects\dhinova.com\public")
dst = out_dir / "logo.png"
dst_light = out_dir / "logo-light.png"


def is_bg(r: int, g: int, b: int, a: int) -> bool:
    if a < 10:
        return True
    mx = max(r, g, b)
    mn = min(r, g, b)
    # paper / off-white plate (keep saturated blues/purples)
    if mx >= 230 and (mx - mn) <= 28:
        return True
    if r >= 245 and g >= 245 and b >= 245:
        return True
    return False


def remove_background(img: Image.Image) -> Image.Image:
    img = img.convert("RGBA")
    pixels = img.load()
    w, h = img.size
    visited = [[False] * h for _ in range(w)]
    stack: list[tuple[int, int]] = []
    for x in range(w):
        stack.append((x, 0))
        stack.append((x, h - 1))
    for y in range(h):
        stack.append((0, y))
        stack.append((w - 1, y))

    while stack:
        x, y = stack.pop()
        if x < 0 or y < 0 or x >= w or y >= h or visited[x][y]:
            continue
        visited[x][y] = True
        r, g, b, a = pixels[x, y]
        if not is_bg(r, g, b, a):
            continue
        pixels[x, y] = (r, g, b, 0)
        stack.extend(((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)))

    bbox = img.getbbox()
    if bbox:
        pad = 32
        left = max(0, bbox[0] - pad)
        top = max(0, bbox[1] - pad)
        right = min(w, bbox[2] + pad)
        bottom = min(h, bbox[3] + pad)
        img = img.crop((left, top, right, bottom))
    return img


def make_light_variant(img: Image.Image) -> Image.Image:
    """Turn near-black / navy text into white for dark full-screen use."""
    img = img.copy().convert("RGBA")
    pixels = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if a < 10:
                continue
            brightness = (r + g + b) / 3
            sat = max(r, g, b) - min(r, g, b)
            # dark navy / near-black wordmark + tagline
            if brightness < 70 and sat < 55:
                pixels[x, y] = (255, 255, 255, a)
            elif brightness < 90 and sat < 40:
                pixels[x, y] = (255, 255, 255, a)
    return img


base = remove_background(Image.open(src))
base.save(dst, "PNG", optimize=True)
light = make_light_variant(base)
light.save(dst_light, "PNG", optimize=True)

print(f"logo.png {base.size} corner={base.getpixel((2, 2))}")
print(f"logo-light.png {light.size} corner={light.getpixel((2, 2))}")
opaque = sum(1 for p in base.getdata() if p[3] > 10)
print(f"opaque_pixels={opaque}/{base.size[0] * base.size[1]}")
