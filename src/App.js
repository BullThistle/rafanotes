import React, { Component } from 'react';
import Note from './components/Note';
import NoteForm from './components/NoteForm';
import HeaderMenu from './components/HeaderMenu';
import DB_CONFIG from './config/config';
import firebase from 'firebase/app'
import 'firebase/database';
import './styles/App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);

    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('notes');

    // We're going to setup the React state of our component
    this.state = {
      notes: [],
    }
  }

  componentWillMount(){
    const previousNotes = this.state.notes;

    // DataSnapshot
    this.database.on('child_added', snap => {
      previousNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent,
      })

      this.setState({
        notes: previousNotes
      })
    })

    this.database.on('child_removed', snap => {
      for(var i=0; i < previousNotes.length; i++){
        if(previousNotes[i].id === snap.key){
          previousNotes.splice(i, 1);
        }
      }

      this.setState({
        notes: previousNotes
      })
    })
  }

  addNote(note){
    this.database.push().set({ noteContent: note});
  }

  removeNote(noteId){
    console.log("from the parent: " + noteId);
    this.database.child(noteId).remove();
  }
    
    render() {
        return (
            <div className="notesWrapper">
                <header className="notesHeader">
                    <HeaderMenu />
                </header>
                <main className="notesBody">
                    {
                        this.state.notes.map((note) => {
                            return (
                                <Note 
                                    noteContent={note.noteContent} 
                                    noteId={note.id} key={note.id}
                                    removeNote={this.removeNote} 
                                />
                            )
                        })
                    }
                </main>
                <footer className="notesFooter">    
                    <NoteForm addNote={this.addNote}/>
                </footer>
            </div>
        );
    }
}

export default App;
