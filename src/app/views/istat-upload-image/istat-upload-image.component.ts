import { Component, OnInit } from '@angular/core';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { IstatServiceService } from 'src/app/services/istat-service.service';
import { IstatHackService } from 'src/app/services/istat-hack.service';
import { ConditionalExpr } from '@angular/compiler';
 

const URL = 'http://localhost:8080/api/upload';

@Component({
  selector: 'app-istat-upload-image',
  templateUrl: './istat-upload-image.component.html',
  styleUrls: ['./istat-upload-image.component.scss']
})
export class IstatUploadImageComponent implements OnInit {
  
  foodLoadedList=[];
  selectedFood={};
 selectedFoodImg;
 showUpload:boolean=false;
  constructor( private ihackservice: IstatHackService) { }
 
  title = 'app';

 // public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

  ngOnInit() {
//    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
 //   this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
  //       console.log('ImageUpload:uploaded:', item, status, response);
   //      alert('File uploaded successfully');
    // };

     this.loadFoods();
 }
public loadFoods(){
  this.selectedFoodImg=null;
  this.selectedFood=null;
  this.ihackservice.getFoodLists().subscribe(list => this.foodLoadedList = list);
}
 
public openDetails(food){

  this.selectedFood=food;
  console.log(this.selectedFood);
  this.selectedFoodImg= food.name;

}
}

