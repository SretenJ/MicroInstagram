import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PhotoService} from "../photo.service";
import {MatDialogRef} from "@angular/material/dialog";
import {Photo} from "../Models/photo";

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {
  form: FormGroup;


  constructor(
    private service:PhotoService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddDialogComponent>,
  ) {
  }


  ngOnInit(): void {
    this.form = this.fb.group(
      {
        albumId: new FormControl('',{ validators: [Validators.required] }),
        id: new FormControl('',{ validators: [Validators.required] }),
        title: new FormControl('',{ validators: [Validators.required] }),
        url: new FormControl('',{ validators: [Validators.required] }),
        thumbnailUrl: new FormControl('',{ validators: [Validators.required] }),
      }
    )
  }

  onSubmit(data:any) {

    this.closeDialog(data as Photo)

  }


  closeDialog(data?:Photo){
    this.dialogRef.close(
      {
        photo:data
      });
  }

}
