import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Photo} from "../Models/photo";
import {PhotoService} from "../photo.service";

@Component({
  selector: 'app-edit-photo-dialog',
  templateUrl: './edit-component-dialog.component.html',
  styleUrls: ['./edit-component-dialog.component.css']
})
export class EditComponentDialogComponent implements OnInit {

  form: FormGroup;

  photoId: number;

  constructor(
    private service:PhotoService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditComponentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.photoId = this.data.dataKey
    this.photo = this.data.photoKey
  }

   photo:Photo;

  getPhoto(id: number): void {
    this.service.getPhoto(this.photoId).subscribe({
      next: (photo) => (this.photo = photo),
      complete: () => {

      }
    });
  }

  ngOnInit(): void {
    this.getPhoto(this.data.dateKey)
    this.form = this.fb.group(
      {
        albumId: this.photo.albumId,
        id: this.photo.id,
        title: this.photo.title,
        url: this.photo.url,
        thumbnailUrl: this.photo.thumbnailUrl,
      }
    )
  }

  onSubmit(data:any,event?:any) {

    this.data.photoKey = data as Photo
    this.photo = data as Photo

    this.closeDialog(data as Photo,event)


  }


  closeDialog(data?:Photo,pass?:any){
    this.dialogRef.close(
      {
        photo:data,
        event:pass
      });
  }
}
