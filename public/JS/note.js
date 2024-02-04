// Function to generate the HTML for a note card
function generateNoteCard(note) {
  console.log('generateNoteCard')
  let noteColor = note.color;
  let mapColor = {
    white: "lightgray",
    blue: "lightblue",
    red: "lightcoral",
    green: "lightgreen",
    orange: "lightsalmon"
  }
  noteColor = mapColor[noteColor];
  console.log(note)
  return `
        <div class="col-md-4">
          <div class="card mt-4" style="background-color: ${noteColor}">
            <div class="card-header d-flex justify-content-between">
            <div class="d-flex justify-content-around"> 
              <button type="button" class="delete-btn btn btn-danger btn-sm mr-2" data-note-id=${note._id}>X</button>
              <button type="button" class="eNote btn btn-warning btn-sm mr-2">E</button>
            </div>
              <h5 class="mb-0">${note.title}</h5>
            </div>
            <div class="card-body">
              <p>${note.text}</p>
            </div>
          </div>
        </div>
      `;
}

// read notes from the server
window.onload = function () {
  fetch('/notes')
    .then(response => response.json())
    .then(notes => {
      const notesContainer = document.getElementById('noteContainer');
      notes.message.forEach(note => {
        const noteCard = generateNoteCard(note);
        notesContainer.innerHTML += noteCard;
      });
    })
    .catch(error => console.error('Error:', error));
};

// Function to add a new note
function addNote(note) {
  fetch('/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  })
    .then(response => {
      if (response.ok) { // Check if response went through
        location.reload(); // Reload the page to update the notes
      } else {
        console.error('Error:', response.statusText);
      }
    })
    .catch(error => console.error('Error:', error));
}

// Event listener for form submission
document.getElementById('addNoteForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const note = {
    title: document.getElementById('note-title').value,
    text: document.getElementById('note-text').value,
    color: document.getElementById('note-color').value,
  };

  addNote(note);
});

// Function to delete a note
function deleteNote(noteId) {
  console.log('deleteNote')
  console.log(noteId)
  fetch(`/notes/${noteId}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (response.ok) { // Check if response went through
        location.reload(); // Reload the page to update the notes
      } else {
        console.error('Error:', response.statusText);
      }
    })
    .catch(error => console.error('Error:', error));
}

// Event listener for delete button
document.body.addEventListener('click', function (event) {
  if (event.target.matches('.delete-btn')) {
    const noteId = event.target.getAttribute('data-note-id');
    console.log('delete-btn')
    console.log(event.target)
    deleteNote(noteId);
  }
});