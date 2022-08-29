class Node {
	constructor(value) {
		this.value = value;
		this.nextNode = null;
	}
}

class linkedList {
	constructor(headNode) {
		this.HEAD = headNode;
		this.HEAD.nextNode = null;
	}

	append(value) {
		const newNode = new Node(value);
		let temp = this.HEAD;

		while (temp.nextNode != null) {
			temp = temp.nextNode;
		}

		temp.nextNode = newNode;
	}

	prepend(value) {
		let newHead = new Node(value);
		newHead.nextNode = this.HEAD;

		this.HEAD = newHead;
	}

	size() {
		let count = 1;
		let node = this.HEAD;

		while (node.nextNode != null) {
			node = node.nextNode;
			count++;
		}

		return count;
	}

	head() {
		return this.HEAD.value;
	}

	tail() {
		let tail = this.HEAD;

		while (tail.nextNode != null) {
			tail = tail.nextNode;
		}

		return tail.value;
	}

	at(index) {
		let node = this.HEAD;

		for (let i = 0; i <= index; i++) {
			node = node.nextNode;
		}

		return node.value;
	}

	pop() {
		let tail = this.HEAD;

		while (tail.nextNode.nextNode != null) {
			tail = tail.nextNode;
		}

		tail.nextNode = null;
	}

	contains(value) {
		let node = this.HEAD;

		while (node != null && node.value !== value) {
			node = node.nextNode;
		}

		return node == null ? false : true;
	}

	find(value) {
		let node = this.HEAD;
		let index = 0;

		while (node != null && node.value !== value) {
			node = node.nextNode;
			index++;
		}

		return node == null ? null : index;
	}

	toString() {
		let str = '';
		let node = this.HEAD;

		while (node != null) {
			str.concat(`${node.value} -> `);
			node = node.nextNode;
		}

		return str.concat('null');
	}

	insertAt(value, index) {
		if (index === 0) {
			this.prepend(value);
			return;
		}

		const newNode = new Node(value);
		let node = this.HEAD;

		for (let i = 0; i < index - 1; i++) {
			node = node.nextNode;
		}

		newNode.nextNode = node.nextNode;
		node.nextNode = newNode;
	}

	removeAt(index) {
		if (index === 0) {
			this.HEAD.nextNode = this.HEAD;
			return;
		}

		for (let i = 0; i < index - 1; i++) {
			node = node.nextNode;
		}

		node.nextNode = node.nextNode.nextNode;
	}
}
