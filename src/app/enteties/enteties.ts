export interface User {
  userName : string,
  name : string,
  status : string,
  jobTitle : string,
  mail : string,
  skype : string,
  timezone : string,
  photo : string
}

export interface Channel {
  title : string,
  members : Array<string>,
  messages : Array<Message>
}


export interface Message {
  idMessage : number,
  text : string,
  authorUserName : string,
  date : Date
}

export interface NewMessage {
  idMessage : number,
  text : string,
  author : User,
  date : Date
}
