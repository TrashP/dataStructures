class Node {
	constructor(data) {
		this.data = data;
		this.left = null;
		this.right = null;
	}
}

class Tree {
	constructor(array) {
		this.array = [...removeDuplicates(mergeSort(array))];
		this.root = this.buildTree(this.array, 0, this.array.length - 1);
		this.preorderData = [];
		this.inorderData = [];
		this.postorderData = [];
	}

	buildTree(array, start, end) {
		if (start > end) return null;

		const mid = parseInt((start + end) / 2);
		const root = new Node(array[mid]);

		root.left = this.buildTree(array, start, mid - 1);
		root.right = this.buildTree(array, mid + 1, end);

		return root;
	}

	insert(value, root = this.root) {
		if (root == null) {
			return (root = new Node(value));
		}

		if (root.data < value) {
			root.right = this.insert(value, root.right);
		} else {
			root.left = this.insert(value, root.left);
		}

		return root;
	}

	delete(value, root = this.root) {
		if (root == null) {
			return root;
		}

		if (root.data > value) {
			root.left = this.delete(value, root.left);
		} else if (root.data < value) {
			root.right = this.delete(value, root.right);
		} else {
			if (root.left == null) {
				return root.right;
			} else if (root.right == null) {
				return root.left;
			}
			root.data = minData(root.right);
			root.right = this.delete(root.data, root.right);
		}
		return root;
	}

	find(value, root = this.root) {
		if (root == null) return false;

		if (root.data == value) return root;

		if (root.data > value) {
			root.left = this.find(value, root.left);
		} else {
			root.right = this.find(value, root.right);
		}

		return root;
	}

	levelOrder(func, root = this.root) {
		const queue = [];
		const list = [];

		if (root == null) return;
		queue.push(root);

		while (queue.length) {
			if (queue[0].left != null) queue.push(root.left);
			if (queue[0].right != null) queue.push(root.right);
			list.push(func(queue.shift().data));
		}
	}

	preOrder(func, root = this.root) {
		if (root == null) return;

		if (root.data !== undefined) this.preorderData.push(func(root.data));
		if (root.left !== null) this.preOrder(root.left);
		if (root.right !== null) this.preOrder(root.right);

		return this.preorderData;
	}

	inOrder(func, root = this.root) {
		if (root == null) return;

		if (root.left !== null) this.inOrder(root.left);
		if (root.data !== undefined) this.inorderData.push(func(root.data));
		if (root.right !== null) this.inOrder(root.right);

		return this.inorderData;
	}

	postOrder(func, root = this.root) {
		if (root == null) return;

		if (root.left !== null) this.postOrder(root.left);
		if (root.right !== null) this.postOrder(root.right);
		if (root.data !== undefined) this.postorderData.push(func(root.data));

		return this.postorderData;
	}

	height(node) {
		if (node == null) {
			return -1;
		} else {
			let left = this.height(node.left);
			let right = this.height(node.right);

			return Math.max(left, right) + 1;
		}
	}

	depth(node, root = this.root) {
		if (root.data == node.data) {
			return 0;
		} else if (node.data < root.data) {
			return this.depth(node, root.left) + 1;
		} else if (node.data > root.data) {
			return this.depth(node, root.right) + 1;
		}
	}

	traverse(root, array) {
		if (array !== undefined) array.push(root.data);
		if (root.leftPart !== null) {
			this.traverse(root.leftPart, array);
		}

		if (root.rightPart !== null) {
			this.traverse(root.rightPart, array);
		}
		return array;
	}

	isBalanced(root) {
		if (root == null) return false;

		let leftHalf = root.leftPart;
		let rightHalf = root.rightPart;

		if (Math.abs(this.height(leftHalf) - this.height(rightHalf)) > 1) {
			return false;
		} else {
			return true;
		}
	}

	rebalance() {
		if (this.isBalanced(this.root)) return this.root;

		let rebalancedNewTreeArray = [];
		rebalancedNewTreeArray = this.traverse(
			this.root,
			rebalancedNewTreeArray
		);

		let balancedTree = new Tree(rebalancedNewTreeArray);

		return balancedTree.root;
	}
}

function minData(root) {
	let min = root.data;
	while (root != null) {
		min = root.data;
		root = root.left;
	}

	return min;
}

function merge(leftArray, rightArray) {
	const arr = [];

	while (leftArray.length && rightArray.length) {
		if (leftArray[0] <= rightArray[0]) {
			arr.push(leftArray.shift());
		} else {
			arr.push(rightArray.shift());
		}
	}

	return [...arr, ...leftArray, ...rightArray];
}

function mergeSort(array) {
	if (array.length <= 1) {
		return array;
	} else {
		const mid = parseInt(array.length / 2);

		const left = array.splice(0, mid);
		return merge(mergeSort(left), mergeSort(array));
	}
}

function removeDuplicates(array) {
	return [...new Set(array)];
}
