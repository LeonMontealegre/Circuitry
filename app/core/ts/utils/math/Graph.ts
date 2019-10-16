
export class Edge<V, E> {
    private source: V;
    private target: V;
    private weight: E;

    public constructor(source: V, target: V, weight: E) {
        this.source = source;
        this.target = target;
        this.weight = weight;
    }

    public getSource(): V {
        return this.source;
    }

    public getTarget(): V {
        return this.target;
    }

    public getWeight(): E {
        return this.weight;
    }
}

export class Graph<V, E> {
    private list: Map<V, Edge<V, E>[]>;
    private reverseList: Map<V, Edge<V, E>[]>;
    private edges: Edge<V, E>[];

    public constructor() {
        this.list = new Map<V, Edge<V, E>[]>();
        this.reverseList = new Map<V, Edge<V, E>[]>();
        this.edges = [];
    }

    private bfs(visited: Map<V, boolean>, v: V): void {
        if (visited.get(v))
            return;

        visited.set(v, true);
        this.list.get(v).forEach((e) => this.bfs(visited, e.getTarget()));
        this.reverseList.get(v).forEach((e) => this.bfs(visited, e.getTarget()));
    }

    public createNode(value: V): void {
        if (this.list.has(value))
            throw new Error("Graph already has value: " + value);

        this.list.set(value, []);
        this.reverseList.set(value, []);
    }

    public createEdge(source: V, target: V, weight: E): void {
        if (!this.list.has(source))
            throw new Error("Graph doesn't have node of value: " + source);
        if (!this.list.has(target))
            throw new Error("Graph doesn't have node of value: " + target);

        const e = new Edge<V, E>(source, target, weight);
        this.edges.push(e);
        this.list.get(source).push(e);
        this.reverseList.get(target).push(e);
    }

    public isConnected(): boolean {
        if (this.list.size <= 1)
            return true;

        const v = this.list.keys().next().value;

        const visited = new Map<V, boolean>();
        this.bfs(visited, v);

        return (visited.size === this.size());
    }

    public getEndNodes(): V[] {
        // Get nodes with degree of exactly 1
        return this.getNodes().filter((n) => this.getDegree(n) == 1);
    }

    public size(): number {
        return this.list.size;
    }

    public getDegree(node: V): number {
        return this.list.get(node).length + this.reverseList.get(node).length;
    }

    public getConnections(value: V): Edge<V, E>[] {
        return this.list.get(value);
    }

    public getNodes(): V[] {
        const nodes = [];
        for (const val of this.list.keys())
            nodes.push(val);
        return nodes;
    }

    public getEdges(): Edge<V, E>[] {
        return this.edges.slice();
    }

}
