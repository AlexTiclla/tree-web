document.querySelector('button[name="action"][value="insert"]').addEventListener('click', function(event) {
    event.preventDefault();
    let value = document.querySelector('input[name="value"]').value;
    fetch('/update_tree', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'insert', value: value }),
    })
    .then(response => response.json())
    .then(data => {
        // Actualiza la visualización del árbol aquí
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

function updateTreeVisualization(treeData) {
    // 1. Obtén el contenedor del árbol en tu HTML
    let treeContainer = document.querySelector('#treeContainer');

    // 2. Limpia el contenedor del árbol
    treeContainer.innerHTML = '';

    // 3. Crea una nueva visualización del árbol con los datos actualizados
    // Esto dependerá de cómo estés visualizando el árbol.
    // Por ejemplo, si estás utilizando D3.js para visualizar el árbol, podrías tener algo como esto:
    let tree = d3.tree().size([height, width]);
    let root = d3.hierarchy(treeData, function(d) { return d.children; });
    tree(root);

    // 4. Agrega la nueva visualización del árbol al contenedor del árbol
    treeContainer.appendChild(tree);
}

