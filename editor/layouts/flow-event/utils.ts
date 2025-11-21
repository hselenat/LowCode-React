// 获取树的深度
export function getTreeDepth(node: any) {
     if(!node) {
        return 0;
     }
     let maxChildDepth = 0; // 当前节点子节点的最大深度
     // 遍历当前节点的所有自节点，递归调用 getTreeDepth 函数获取自节点的深度
     for(const child of node.children || []) {
       const childDepth = getTreeDepth(child);
       maxChildDepth = Math.max(maxChildDepth, childDepth);
     }
     return maxChildDepth + 1; // 当前节点的深度等于子节点的最大深度加1
}