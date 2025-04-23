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
}

const tree =  new Tree([1,   3,    4,  5,
    7,   8,    9, 23,
   67, 324, 6345])

   tree.insert(42)

   console.log(JSON.stringify(tree.root, null, 2));