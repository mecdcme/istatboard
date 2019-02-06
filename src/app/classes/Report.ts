export class Report {
 
    user:  number;
    activity: number;
    mood: number;
    place: number;
    person:number;
    hours: number;
   
    constructor( user:  number,
        activity: number,
        mood: number,
        place: number,
        person:number,
        hours: number) {
        this.user= user;
        this.activity=activity;
        this.mood=mood;
        this.place=place;
        this.person=person;
        this.hours=hours;


  }
 
}