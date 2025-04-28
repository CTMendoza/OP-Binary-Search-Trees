class Node {
    constructor (data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor (array) {
        this.sortedArray = this.sortArray(array)
        this.root = this.buildTree(this.sortedArray)
    }

    buildTree(array) {
        //base case
        if(array.length === 0) return null
        // grab middle element of the array
        let mid = Math.floor(array.length/2)
        //create new node with middle element value
        let root = new Node(array[mid])
        //create the left sub tree
        root.left = this.buildTree(array.slice(0, mid))
        //create the right sub tree
        root.right = this.buildTree(array.slice(mid + 1))

        return root
    }

    sortArray(array) {
        // sort Array
        let sorted = array.sort((a,b)=> a-b)
        // remove duplicate elements
        let deduped = sorted.filter((element, index) => element !== sorted[index -1] )
        return deduped

    }

    insert(value) {
        this.root = this.recursiveInsert(this.root, value)   
    }

    recursiveInsert(node,value) {
        if(node === null) {
          return new Node(value)
        }

        if(node.data === value) {
            return 'Tree already has this value'
        }

        if(value < node.data) {
            node.left = this.recursiveInsert(node.left, value)
        }

        if(value > node.data) {
            node.right = this.recursiveInsert(node.right, value)
        }

        return node
    }

    deleteItem(value) {
        this.root = this.#recursiveDelete(this.root, value)
        //delete a leaf node in bst
        //delete node with single child in bst
        //delete a Node with Both Children in BST
    }

    #recursiveDelete(node, value) {
        if(node === null) {
            return node
        }
         //delete a leaf node in bst
        if(node.data === value && node.left === null && node.right === null) {
            return null
        }

        //delete node with single child in bst
        if(node.data === value && (node.left === null || node.right === null)) {
            return node.left || node.right; 
        }

        //delete a Node with Both Children in BST 
        if(node.data === value && node.left !== null && node.right !== null) {
        let successor = node.right
        // // Find the leftmost node in the right subtree (inorder successor)
         while(successor.left !== null) {
            successor = successor.left
         }
         // replace current node value with the inorder successor's value
         node.data = successor.data
         // Delete the inorder successor from the right subtree
         node.right = this.#recursiveDelete(node.right, successor.data)
        }

        if(value < node.data) {
            node.left = this.#recursiveDelete(node.left, value)
        }

        if(value > node.data) {
            node.right = this.#recursiveDelete(node.right, value)
        }

        return node
    }

    //Write a find(value) function that returns the node with the given value.
    find(value) {
        let root = this.root
        while(root !==null) {
            if(root.data === value) {
                return root
            }
            else if( value < root.data) {
                root = root.left
            }

            else root = root.right
        }
      return `value not found`
    }

   levelOrder(callback) {
        let queue = []
        if(callback === undefined){
            throw new Error('callback function is required')
        }
        queue.push(this.root)
        while(queue.length !== 0) {
            let firstElement = queue.shift()
            callback(firstElement)
            if(firstElement.left !== null) {
                queue.push(firstElement.left)
            }
             if(firstElement.right !== null) {
                queue.push(firstElement.right)
            }
        }
   }

}

const tree =  new Tree([50,30,80,70,40,20])
console.log(tree.find(80))

console.log(tree.root);

tree.levelOrder((node) => console.log(node.data))

