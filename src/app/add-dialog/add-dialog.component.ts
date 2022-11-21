import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PhotoService} from "../photo.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Photo} from "../Models/photo";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {
  form: FormGroup;

  confirmDialogRef: MatDialogRef<ConfirmationDialogComponent>;

  constructor(
    private service:PhotoService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddDialogComponent>,
    public dialog:MatDialog,
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

  openConfirmationDialog(data?:Photo) {
    this.confirmDialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.message = "Are you sure you want to add a new entry?"

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.onSubmit(data)
      }
    });
  }

}
