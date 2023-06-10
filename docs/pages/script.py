for i in range(1, 36):
    file_name = f"inst-{i}.html"
    file_content = f'<div id="div-inst-{i}"></div>'

    with open(file_name, 'w') as file:
        file.write(file_content)