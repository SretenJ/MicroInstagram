import {Component, OnInit} from '@angular/core';
import {Photo} from "./Models/photo";
import {PhotoService} from "./photo.service";
import {MatDialog} from "@angular/material/dialog";
import {EditComponentDialogComponent} from "./edit-photo-dialog/edit-component-dialog.component";
import {AddDialogComponent} from "./add-dialog/add-dialog.component";

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
    private photosService: PhotoService,
    public dialog: MatDialog
  ) { }


  getPhotos(): void {
    this.photosService.getPhotos()
      .subscribe(p=>this.photos=p,)
  }

  ngOnInit(): void {
    this.getPhotos()

  }

  deletePhoto(data: Photo):void {
    let index  = this.photos.findIndex(d=>d.id == data.id)
    this.photos.splice(index,1)
    this.photosService.deletePhoto(data.id).subscribe()
  }


  editData(data:Photo):void
  {
    let p = data as Photo
    let index = this.photos.findIndex(d=>d.id == data.id)
    this.photos[index] = p
  }

  addData(data:Photo):void
  {
    this.photos.unshift(data)
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
      { this.deletePhoto(result.photo)}
      else if (result.event=='EDIT')
      { this.editData(result.photo)}
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
