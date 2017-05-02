// @flow
import firebase from 'firebase'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  firebase: Object
  db: Object

  constructor() {
    this.firebase = firebase.initializeApp(config)
    this.db = this.firebase.database()
  }

  snapshotToArray(snapshot: Object) {
    let tasks = []
    let objects = snapshot.val()
    
    for (var key in objects) {
      if (objects.hasOwnProperty(key)) {
        tasks.push(objects[key])
      }
    }

    return tasks
  }

  allTasks(callback: Function) {
    return this.db
            .ref('/todos')
            .once('value')
            .then(this.snapshotToArray)
            .then(callback)
  }

  createTask(task: Object) {
    let newTaskRef = this.db.ref('/todos').push()
    task.id = newTaskRef.key
    return newTaskRef.set(task).then(() => task)
  }

  setDone(taskId: string) {
    this.db.ref('/todos').child(taskId).child('status').set('done')
  }
}

export default (new Firebase())
