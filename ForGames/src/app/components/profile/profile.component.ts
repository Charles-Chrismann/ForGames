import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FileUpload } from 'src/app/models/file-upload.model';
import { UserService } from 'src/app/services/user.service';
import { finalize, map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;
  fileUploads?: any[];
  private basePath = '/uploads';
  initial_avatar:boolean = true
  
  
  profileForm: FormGroup
  fileUrl: any;
  initialUser: any;
  previews:any = [];


  constructor(
    private uploadService: FileUploadService,
    private userService: UserService,
    private storage: AngularFireStorage,
    private db: AngularFireDatabase,
    private formBuilder: FormBuilder,
    private router : Router,
  ) {
    this.profileForm = new FormGroup({
      username: new FormControl('',[Validators.required, Validators.maxLength(24)]),
      email: new FormControl('',[Validators.required, Validators.email]),
      newPassword: new FormControl(''),
      oldPassword: new FormControl(''),
      bio: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe(
      (resp) => {
        this.initialUser = resp
        console.log(resp)

        
        this.profileForm.patchValue(resp)
      }
      
    )
    // setTimeout(() => {
    // // this.initProfileForm();
    // },1000)
    //this.initProfileForma();
    // this.uploadService.getFiles(6).snapshotChanges().pipe(
    //   map(changes =>
    //     // store the key
    //     changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    //   )
    // ).subscribe(fileUploads => {
    //   this.fileUploads = fileUploads;
    //   console.log(fileUploads)
    // });
  
  }

  initProfileForma(){
    console.log("initProfileForma")
    this.profileForm = this.formBuilder.group({
      username: new FormControl(this.initialUser.email,[Validators.required, Validators.maxLength(16000)]),
      // email: new FormControl(this.initialUser.email,[Validators.required, Validators.maxLength(16000)]),
      // newPassword: new FormControl('',[Validators.required, Validators.maxLength(16000)]),
      // oldPassword: new FormControl('',[Validators.required, Validators.maxLength(16000)]),
      // bio: new FormControl(this.initialUser.bio,[Validators.required, Validators.maxLength(16000)]),
    })
    return this.profileForm
  }

  initProfileForm(){
    //setTimeout(() => {
      console.log("ttttttttttttt")
      this.profileForm = new FormGroup({
        
        username: new FormControl(this.initialUser.username,[Validators.required, Validators.maxLength(16000)]),
        // email: new FormControl('', [Validators.required, Validators.email]),

        // newPassword: new FormControl('', ),
        // oldPassword: new FormControl('', ),
        // //confirmPassword: new FormControl('', [Validators.required]),
        // profile_picture:new FormControl(''),
        // bio: new FormControl('')
      });
      console.log("patch")
      this.profileForm.patchValue({
        username: this.initialUser.username
      })
      // this.profileForm.setValue({
      // 
      // })
    //}, 3000)
  }

  OnSubmit(){
    this.upload()
    console.log(this.fileUrl)
    const user = {
      username: this.profileForm.value.username,
      email: this.profileForm.value.email,
      newPassword: this.profileForm.value.newPassword,
      oldPassword: this.profileForm.value.oldPassword,
      profile_picture: this.profileForm.value.profile_picture,
      bio: this.profileForm.value.bio
    }
    console.log(user)
    this.userService.updateUser(user).subscribe((resp) =>{
      console.log("AAAAAAAAAAAa")
      this.router.navigate(['F'])
    })
        
    // this.authService.register(user).subscribe();
  }

  
  selectFile(event: any): void {
    // this.previews = [];
    this.selectedFiles = event.target.files;
    console.log(event.target.files)
    const reader = new FileReader()
    //reader.readAsDataURL(event.target.files);
    // reader.onload = (e: any) => {
    //   console.log(e.target.result);
    //   this.previews.push(e.target.result);
    // };
    // reader.readAsDataURL(this.selectedFiles);
    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        };
        this.initial_avatar = false
        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }

  async upload(): Promise<void> {
    console.log(this.selectedFiles)
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.currentFileUpload = new FileUpload(file);
         await this.pushFileToStorage(this.currentFileUpload)//.subscribe(
          // percentage => {
          //   console.log(this.percentage)
          //   this.percentage = Math.round(percentage ? percentage : 0);
          // },
          // error => {
          //   console.log(error);
          // }
          // (resp: any) => {
          //   console.log(resp)
          // }
        
        
        //console.log(this.fileUpload.url)
      }
    }

  }

  async pushFileToStorage(fileUpload: FileUpload):Promise<void> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          console.log(downloadURL)
          this.fileUrl = downloadURL
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
          //return this.fileUrl
          const user = {
            username: this.profileForm.value.username,
            email: this.profileForm.value.email,
            newPassword: this.profileForm.value.newPassword,
            oldPassword: this.profileForm.value.oldPassword,
            profile_picture: this.fileUrl,
            bio: this.profileForm.value.bio
          }
          console.log(user)
          this.userService.updateUser(user).subscribe()
        });
      })
    ).subscribe(
      (resp) => {
        console.log(resp)
        //console.log(this.fileUrl)
      }
      
    )

    
    
    
    // return uploadTask.percentageChanges();
     //setTimeout(() =>{ {return this.fileUrl} }, 3000)
    
  }

  private saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload);
  }

}
