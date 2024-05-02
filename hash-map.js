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
}

const myMap = new HashTable;

myMap.set('Chris', 31);
myMap.set('Chris', 105);
myMap.set('sihCr', 123123);
myMap.set('sihCr', 05);

console.log(myMap.get('Chris'));
console.log(myMap.get('sihCr'));
