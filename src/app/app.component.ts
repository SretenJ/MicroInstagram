import {Component, OnInit} from '@angular/core';
import {Photo} from "./Models/photo";
import {PhotoService} from "./photo.service";
import {MatDialog} from "@angular/material/dialog";
import {EditComponentDialogComponent} from "./edit-photo-dialog/edit-component-dialog.component";
import {AddDialogComponent} from "./add-dialog/add-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'FrontEndTask';
  photos: Photo[];
  pageNumber: number = 1;
  constructor(
    public snackBar: MatSnackBar,
    private photosService: PhotoService,
    public dialog: MatDialog
  ) { }


  getPhotos(): void {
    this.photosService.getPhotos()
      .subscribe(p=>this.photos=p.slice(0,100),)
  }

  ngOnInit(): void {
    this.getPhotos()
  }

  deletePhoto(data: Photo):void {
    let index  = this.photos.findIndex(d=>d.id == data.id)
    this.photos.splice(index,1)
    this.photosService.deletePhoto(data.id).subscribe(e=>{ let snackBarRef = this.snackBar.open('Entry was deleted','',{duration:2000})})
  }


  editData(data:Photo):void
  {
    let p = data as Photo
    let index = this.photos.findIndex(d=>d.id == data.id)
    this.photos[index] = p
    this.photosService.putPhoto(data).subscribe(e=>{
      let snackBarRef = this.snackBar.open('Changes saved','',{duration:2000})
    })
  }

  addData(data:Photo):void
  {
    if (data == undefined)
    {
      let snackBarRef = this.snackBar.open('Canceled','',{duration:2000})
      return
    }
    this.photos.unshift(data)
    this.photosService.postPhoto(data).subscribe(e=>{
      let snackBarRef = this.snackBar.open('New Photo Added','',{duration:2000})
    })
  }

  openDialog(photo:Photo): void {
    const dialogRef = this.dialog.open(EditComponentDialogComponent,{
      width:'700px',
      data: {
        dataKey:photo.id,
        photoKey:photo
      }
    })
    dialogRef.afterClosed().subscribe(result =>{
      if(result.event=='DELETE')
      {
        this.deletePhoto(result.photo)
      }
      else if (result.event=='EDIT')
      {
        this.editData(result.photo)
      }
      else if (result.event=='CANCEL')
      {
        let snackBarRef = this.snackBar.open('Changes Discarded','',{duration:2000})
      }
    })
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddDialogComponent,{
      width:'900px',

    })
    dialogRef.afterClosed().subscribe(result =>{
      this.addData(result.photo)
    })
  }
}
