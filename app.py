from flask import Flask, render_template, request, jsonify
from binarytree.ArbolBinario import ArbolBinario
arbol = ArbolBinario()

app = Flask(__name__)


@app.route('/')
def inicio():
    return render_template('index.html', arbol=arbol)

@app.route('/update_tree', methods=['POST'])
def update_tree():
    if not request.json or 'action' not in request.json or 'value' not in request.json:
        return jsonify({'error': 'Invalid request format.'}), 400

    action = request.json['action']
    value = request.json['value']

    if action == 'insert':
        arbol.agregar(value)
        return jsonify({'message': f'Successfully inserted {value} into the tree.'}), 200
    elif action == 'delete':
        if not arbol.buscar(value):
            return jsonify({'error': f'{value} does not exist in the tree.'}), 400
        arbol.deleteNode(arbol.raiz, value)
        return jsonify({'message': f'Successfully deleted {value} from the tree.'}), 200
    else:
        return jsonify({'error': 'Invalid action.'}), 400

if __name__ == "__main__":
    app.run(debug=True)
