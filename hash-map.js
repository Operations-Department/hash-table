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

    //hashes keys into hashcodes
    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.size;
        }

        return hashCode;
    } 

    //sets a value to a called key
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

    //returns value of called key if exists
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

    //returns true if key exists
    has(key) {
        const index = this.hash(key);

        if (!this.buckets[index]) return false;

        let currentNode = this.buckets[index];

        while (currentNode) {
            if (currentNode.key === key) return true;
            currentNode = currentNode.next;   
        }

        return false;
    }

    //removes called key returns true
    remove(key) {
        const index = this.hash(key);

        if (!this.buckets[index]) return false;

        let currentNode = this.buckets[index];
        let prevNode = null;

        while (currentNode) {

            if (currentNode.key === key) {

                if (!prevNode) {
                    //remove the head node
                    this.buckets[index] = currentNode.next;
                } else {
                    //remove node by skipping it
                    prevNode.next = currentNode.next;
                }

                return true;
            }

            prevNode = currentNode;
            currentNode = currentNode.next;
        }

        return false
    }

    //return number of stored keys in map
    length() {

        let count = 0;

        for (let i = 0; i < this.buckets.length; i++) {
            let currentNode = this.buckets[i];

            //count each node within each bucket
            while (currentNode) {
                count++;
                currentNode = currentNode.next;
            }
        }

        return count;
    }

    //removes all map entries
    clear() {
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i]) this.buckets[i] = null;
        }
    }

    //returns array containing all keys in map
    keys() {
        let keysArr = [];

        for (let i = 0; i < this.buckets.length; i++) {
            let currentNode = this.buckets[i];

            while (currentNode) {
                keysArr.push(currentNode.key);
                currentNode = currentNode.next;
            }
        }

        return keysArr;
        
    }

    //returns array containing all values
    values() {
        let valuesArr = [];

        for (let i = 0; i < this.buckets.length; i++) {
            let currentNode = this.buckets[i];

            while (currentNode) {
                valuesArr.push(currentNode.value);
                currentNode = currentNode.next;
            }
        }

        return valuesArr;
    }

    //returns array containing each key-value pair
    entries() {
        let keyValuesArr = [];

        for (let i = 0; i < this.buckets.length; i++) {
            let currentNode = this.buckets[i];

            while (currentNode) {
                keyValuesArr.push([currentNode.key, currentNode.value]);
                currentNode = currentNode.next;
            }
        }

        return keyValuesArr;
    }
}

const myMap = new HashTable;

myMap.set('Chris', 105);
myMap.set('Chris', 31);
myMap.set('sihCr', 555);
myMap.set('sihCr', 5);

console.log(myMap.length());            //2

console.log(myMap.keys());              //[ 'sihCr', 'Chris' ]
console.log(myMap.values());            //[ 5, 31 ]
console.log(myMap.entries());           //[ [ 'sihCr', 5 ], [ 'Chris', 31 ] ]

console.log(myMap.get('Chris'));        //31
console.log(myMap.get('sihCr'));        //5
console.log(myMap.has('Chris'));        //true  

console.log(myMap.remove('Chris'));     //true

console.log(myMap.has('Chris'));        //false  
console.log(myMap.has('sihCr'));        //true

myMap.clear();

console.log(myMap.length());            //0
console.log(myMap.keys());              //[]   
console.log(myMap.values());            //[] 
console.log(myMap.entries());           //[]