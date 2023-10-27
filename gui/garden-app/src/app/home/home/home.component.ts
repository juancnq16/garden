import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
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
  constructor(public dialog: MatDialog, private homeService:HomeService) {
    var contacts = 'and,there,for'
    
  
    //this.dataSource.data = madeData;
  }
  ngOnInit(): void {
    const that = this
    this.homeService.getFriendList().subscribe({
      next(contacts) {
        var madeData:TreeNode[] = [{
          name: 'Contacts',
          children: [],
        }] ;
        for (var contact of contacts){
          madeData[0].children?.push({name: contact})
        }
        that.dataSource.data = madeData;
      },error(err) {
        console.log(err)
      },
    })
    
  }
  search(event:KeyboardEvent){
    if(event.key == 'Enter'){
      console.log("searching.. ",this.searchTerm)
      const that = this
      this.homeService.searchUser(this.searchTerm).subscribe({
        next(value){
          that.openDialog(value)
        },error(err){
          console.log(err)
        }
      })
      //this.openDialog()
    }
  }
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  openDialog(value:any) {
    console.log(value)
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      data:{
        users:value
      }
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
  imports: [MatDialogModule, MatButtonModule, NgFor,MatSnackBarModule],
})
export class DialogContentExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,private _snackBar: MatSnackBar) {}
  parentMethod(user:string){
    console.log("username ",user);
    this.data.users.splice(this.data.users.indexOf(user),1)
    this.openSnackBar(user)
  } 
  openSnackBar(message: string) {
    this._snackBar.open("Sent","OK")
  }
}
export interface DialogData {
  users:string[]
}