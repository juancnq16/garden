import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { HomeService } from 'src/app/services/home.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit, AfterViewInit {
  searchTerm:string = ""
  username:string = ""
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
  constructor(
    private dialog: MatDialog,
    private homeService:HomeService,
    private storageService:StorageService,
    private router:Router,
    private translate: TranslateService
  ){}
  ngAfterViewInit(): void {
    //this.username = this.storageService.getUsername()+"";
  }
  ngOnInit(): void {
    /**
    this.translate.get("home.welcome").subscribe((successMessage: string) => {
      alert(successMessage);
    }); 
     */
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
    }
  }
  logOut(){
    this.storageService.logOut();
    this.router.navigate(['/login'])
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
      if(result){
        this.ngOnInit()
      }
    });
  }
  parentMethod(){

  }
}

/**
  interface for nav bar contact tree
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
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _snackBar: MatSnackBar,
    private homeService:HomeService,
  ) {}
  parentMethod(user:string){
    const that = this
    this.homeService.addFriend(user).subscribe({
      next(value) {
        that.data.users.splice(that.data.users.indexOf(user),1)
        that.openSnackBar(user)
        
      },error(err) {
        console.log(err)
      },
    })
  } 
  openSnackBar(message: string) {
    this._snackBar.open("Sent","OK")
  }
}
export interface DialogData {
  users:string[]
}