import {FlatTreeControl} from '@angular/cdk/tree';
import {Component} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {Recipe} from "../DbObjects"
import { ApiService } from "../api.service"

/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */
interface RecipeNode {
  parent: Recipe;
  children?: RecipeNode[];
}
interface RecipeFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

const TREE_DATA: RecipeNode[] = []


/**
 * @title Tree with flat nodes
 */
@Component({
  selector: 'tree-flat-overview-example',
  templateUrl: 'tree-view.component.html',
  styleUrls: ['tree-view.component.scss'],
})
export class TreeViewComponent {
  private transformer = (node: RecipeNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.parent.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<RecipeFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this.transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor( apiService : ApiService) {
    apiService.getTree().then((tree : RecipeNode[]) => {
      console.log(tree)
      this.dataSource.data = tree
    })
  }

  hasChild = (_: number, node: RecipeFlatNode) => node.expandable;
}
