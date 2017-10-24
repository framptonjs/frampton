import { ReorderPatch } from '../patches';


function moveToIndex(oldIndex: number, newIndex: number, parentNode: Node): void {
  const toMove = parentNode.childNodes[oldIndex];
  const toReplace = parentNode.childNodes[newIndex];
  if (toReplace !== undefined) {
    parentNode.insertBefore(toMove, toReplace);
  } else {
    parentNode.appendChild(toMove);
  }
}


export function performMoves<T>(moves: Array<ReorderPatch<T>>, parentNode: Node): void {
  const len = moves.length;
  for (let i = 0; i < len; i++) {
    moveToIndex(moves[i].oldIndex, moves[i].newIndex, parentNode);
  }
}