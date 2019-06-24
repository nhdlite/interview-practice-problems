// Implement a function to check if a binary triee is a binary search tree.

const test = require('tape');

class Node {
    constructor(value, left, right) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

function isBST(node, min, max) {
    if(node === null || node.value === null) {
        return true;
    }

    const isValueBST = node.value > min && node.value < max;
    const isLeftBST = isBST(node.left, min, node.value);
    const isRightBST = isBST(node.right, node.value, max);

    return isValueBST && isLeftBST && isRightBST;
}

 test('Valid tree returns true', (t) => {

    const node9 = new Node(9, null, null);
    const node7 = new Node(7, null, null);
    const node6 = new Node(6, null, node7);
    const node8 = new Node(8, node6, node9);
    const node2 = new Node(2, null, null);
    const node5 = new Node(5, node2, node8);

    t.true(isBST(node5, Number.MIN_VALUE, Number.MAX_VALUE));
    t.end();
 });

 test('Valid tree returns true', (t) => {

    const node9 = new Node(9, null, null);
    const node7 = new Node(7, null, null);
    const node6 = new Node(6, null, node7);
    const node8 = new Node(8, node6, node9);
    const node2 = new Node(2, null, null);
    const node5 = new Node(5, node2, node8);

    t.true(isBST(node5, Number.MIN_VALUE, Number.MAX_VALUE));
    t.end();
 });

 test('Invalid tree returns false', (t) => {

    const node9 = new Node(9, null, null);
    const node1 = new Node(1, null, null);
    const node8 = new Node(8, null, null);
    const node2 = new Node(2, node1, node9);
    const node5 = new Node(5, node2, node8);

    t.false(isBST(node5, Number.MIN_VALUE, Number.MAX_VALUE));
    t.end();
 });
