import json
import os

# Specify the directory paths
input_directory = '/Users/stu/xander.com/src/app/data/quotes'
output_directory = '/Users/stu/xander.com/src/app/data/quotes/output2'  # Or specify another directory

# Ensure the output directory exists
os.makedirs(output_directory, exist_ok=True)

# Read JSON file
with open(os.path.join(input_directory, 'quotes2.json')) as f:
    data = json.load(f)

# Create markdown files
for index, item in enumerate(data):
    output_filename = os.path.join(output_directory, f'quote_{index}.md')
    with open(output_filename, 'w') as file:
        # Construct content based on the structure of your JSON items
        content = f"# Quote\n\n{item['quote']}\n\n## Author\n\n{item['author']}\n\n## Tags\n\n{item['tags']}\n"
        file.write(content)
