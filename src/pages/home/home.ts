import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { SpeechRecognition,SpeechRecognitionListeningOptionsAndroid,SpeechRecognitionListeningOptionsIOS } from '@ionic-native/speech-recognition';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  speechList:Array<string>=[];
  androidOptions:SpeechRecognitionListeningOptionsAndroid;
  iosOptions:SpeechRecognitionListeningOptionsIOS;

  constructor(public navCtrl: NavController,private speech:SpeechRecognition,private platform:Platform) {

  }

  listenForSpeech():void{
  	this.androidOptions={
  		prompt:'Speck into your phone'
  	}
  	this.iosOptions={
  		language:'en-US'
  	}
  	if (this.platform.is('android')){
  		this.speech.startListening(this.androidOptions).subscribe(data=>this.speechList=data,err=>console.error(err));
  	}
  	else if (this.platform.is('ios')){
  		this.speech.startListening(this.iosOptions).subscribe(data=>this.speechList=data,err=>console.error(err));
  	}
  	// this.speech.startListening().subscribe(data=>this.speechList=data,err=>console.error(err));
  }

  async getSupportedLanguages():Promise<Array<string>>{
  	try{
  		const language=await this.speech.getSupportedLanguages();
  		console.log(language);
  		return language;
  	}
  	catch(e){
  		console.error(e);
  	}
  }

  async hasPermission():Promise<boolean>{
  	try{
  		const permission=await this.speech.hasPermission();
  		console.log(permission);
  		return permission;
  	}
  	catch(e){
  		console.error(e);
  	}
  }

  async getPermission():Promise<void>{
  	try{
  		const permission=await this.speech.requestPermission();
		console.log(permission);
		return permission;
  	}
  	catch(e){
  		console.error(e);
  	}
  }

  async isSpeechSupported():Promise<boolean>{
  	const isAvailable=await this.speech.isRecognitionAvailable();
  	console.log(isAvailable);
  	return isAvailable;
  }

}
