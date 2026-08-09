import os

base_dir = '/Users/gopalsarma/Desktop/BuildInByte/Website/public/templates'
output_file = '/Users/gopalsarma/Desktop/Xcode_Templates_Code.md'

templates = [
    'buildinbyte-luxury-hotel',
    'elecstore',
    'hostel-management',
    'kanchimarket',
    'luxury-hotel',
    'real-estate',
    'scsvmv'
]

with open(output_file, 'w', encoding='utf-8') as outfile:
    outfile.write("# Web Templates for Xcode Agent\n\n")
    outfile.write("The following contains the HTML, CSS, and JS code for all templates.\n\n")
    
    for template in templates:
        template_dir = os.path.join(base_dir, template)
        if not os.path.isdir(template_dir):
            continue
            
        outfile.write(f"## Template: {template}\n\n")
        
        for root, dirs, files in os.walk(template_dir):
            for file in files:
                if file.endswith('.html') or file.endswith('.css') or file.endswith('.js'):
                    file_path = os.path.join(root, file)
                    rel_path = os.path.relpath(file_path, template_dir)
                    
                    try:
                        with open(file_path, 'r', encoding='utf-8') as f:
                            content = f.read()
                    except Exception as e:
                        content = f"Error reading file: {e}"
                        
                    ext = file.split('.')[-1]
                    lang = 'html' if ext == 'html' else 'css' if ext == 'css' else 'javascript'
                    
                    outfile.write(f"### File: {rel_path}\n\n")
                    outfile.write(f"```{lang}\n")
                    outfile.write(content)
                    outfile.write(f"\n```\n\n")
                    
print(f"Successfully wrote all template code to {output_file}")
