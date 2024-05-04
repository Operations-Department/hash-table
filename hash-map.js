class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

class HashTable {
    constructor(size = 16) {
        this.size = size;
        this.buckets = new Array(this.size).fill(null);
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.size;
        }

        return hashCode;
    } 

    set(key, value) {
        const index = this.hash(key);
        const newNode = new Node(key, value);

        if (!this.buckets[index]) this.buckets[index] = newNode;

        let currentNode = this.buckets[index];

        while (currentNode) {
            if (currentNode.key === key) return currentNode.value = value;
            if (!currentNode.next) return currentNode.next = newNode;
            currentNode = currentNode.next;
        }
    }

    get(key) {
        const index = this.hash(key);

        if (!this.buckets[index]) return null;

        let currentNode = this.buckets[index];

        while (currentNode) {
            if (currentNode.key === key) return currentNode.value;
            if (!currentNode.next) return null;
            currentNode = currentNode.next;
        }
    }

    has(key) {
        const index = this.hash(key);

        if (!this.buckets[index]) return false;

        let currentNode = this.buckets[index];

        while (currentNode) {
            return currentNode.key === key;   
        }
    }
}

const myMap = new HashTable;

myMap.set('Chris', 105);
myMap.set('Chris', 31);
myMap.set('sihCr', 555);
myMap.set('sihCr', 5);

console.log(myMap.get('Chris'));        // Output: 31
console.log(myMap.get('sihCr'));        // Output: 5

console.log(myMap.has('Chris'));       // Output: true  
console.log(myMap.has('Catherine'));   // Output: false