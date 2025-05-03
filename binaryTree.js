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
      return null
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

   inOrder(callback){
    function traverse(node) {
        if(node ===  null) {
            return
        }
        //visit left subtree
        traverse(node.left)
        //visit root subtree
        callback(node)
        // visit right subtree
        traverse(node.right)
    }
    if(callback === undefined){
        throw new Error('callback function is required')
    }
    traverse(this.root)  
   }
   
   preOrder(callback) {
    function traverse(node) {
        if(node === null) {
            return
        }
        //visit root
        callback(node)
        //visit left subtree
        traverse(node.left)
        //visit right subtree
        traverse(node.right)
    }
   
    if(callback === undefined) {
        throw new Error('callback function is required')
    }
    traverse(this.root)
   }

   postOrder(callback) {
    function traverse(node) {
        if(node ===  null) {
            return
        }
         //visit left subtree
        traverse(node.left)
        //visit right subtree
        traverse(node.right)
        //visit root 
        callback(node)
    }

    if(callback === undefined) {
        throw new Error('callback function is required')
    }
    traverse(this.root)
   }

   height(value) {
    let node = this.find(value)
    
    function getHeight(node) {

    //Height is defined as the number of edges in the longest path from that node to a leaf node.
        if(node === null) {
            return -1
        }
        let rightHeight= getHeight(node.right)

        let leftHeight  = getHeight(node.left)

        return Math.max(rightHeight, leftHeight) + 1
    }

    if(node === null) return null
    return getHeight(node)
   }
   
   // Depth is defined as the number of edges in the path from that node to the root node.
   //  If the value is not found in the tree, the function should return null.
   depth(value) {
    let currentNode= this.root
    if(currentNode === null) {
        return null
    }
    function findDepth(node, depth) {
        if(node === null) return null
        if(node.data === value) {
            return depth
        }
        if(value < node.data) {
            return findDepth(node.left, depth + 1)
        }
        if(value > node.data) {
            return findDepth(node.right, depth + 1)
        }
     }
     return findDepth(currentNode, 0)        
   }

   isBalanced() {
    let currentNode = this.root
    function checkBalance(node) {
        if(node === null) {
            return 0
        }
        let leftBalance = checkBalance(node.left)
        let rightBalance = checkBalance(node.right)
        if (leftBalance === null|| rightBalance === null) return null;
        if (Math.abs(leftBalance - rightBalance) > 1) return null;
        return Math.max(leftBalance, rightBalance) + 1;
     }
     return checkBalance(currentNode) !== null
   }
}

const tree =  new Tree([50,30,80,70,40,20,60,55])

console.log(tree.root);


