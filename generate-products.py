import yaml, os

with open("data/products.yaml") as f:
    products = yaml.safe_load(f)

os.makedirs("content/products", exist_ok=True)

for p in products:
    filename = f"content/products/{p['id']}.md"
    with open(filename, "w") as f:
        f.write(f"""---
title: "{p['title']}"
id: "{p['id']}"
type: "products"
layout: "single"
---
""")
print("✅ Product markdown files generated!")