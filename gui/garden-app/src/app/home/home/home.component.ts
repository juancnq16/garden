import { Component, ElementRef, ViewChild } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent {
  searchTerm:string = ""
  /**
   * Boiler plate for tee component on sidebar
   */
  private _transformer = (node: TreeNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );
  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  constructor(public dialog: MatDialog) {
    var contacts = 'and,there,for'
    var madeData:TreeNode[] = [{
      name: 'Contacts',
      children: [],
    }] ;
    for (var contact of contacts.split(',')){
      madeData[0].children?.push({name: contact})
    }
  
    this.dataSource.data = madeData;
  }
  search(event:KeyboardEvent){
    if(event.key == 'Enter'){
      console.log("searching.. ",this.searchTerm)
      this.openDialog()
    }
  }
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  parentMethod(){

  }
}

/**
   * Boiler plate for tee component on sidebar
*/
interface TreeNode {
  name: string;
  children?: TreeNode[];
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}


@Component({
  selector: 'dialog-dialog',
  templateUrl: 'friend-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogContentExampleDialog {
  parentMethod(){

  } 
}