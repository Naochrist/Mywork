import FileTree from './fileTree';

export function createFileTree(input) {
  let dataWithoutPId = input.filter(el=>{
    return el.parentId === undefined
  })
  let sortedDataWithoutPId = dataWithoutPId.sort((a, b)=> a.id - b.id)
  
  let dataWithPId = input.filter(el=>{
    return el.parentId !== undefined
  })
  const sortedDataWithPId = dataWithPId.sort((a, b)=> a.id - b.id)
    input = [...sortedDataWithoutPId, ...sortedDataWithPId]
  const fileTree = new FileTree();

  for (const inputNode of input) {
    const parentNode = inputNode.parentId
      ? fileTree.findNodeById(inputNode.parentId)
      : null;

    fileTree.createNode(
      inputNode.id,
      inputNode.name,
      inputNode.type,
      parentNode
    );
  }

  return fileTree;
}