export class Question {
 static create(question) {
return fetch('https://inputvalue-e09a0-default-rtdb.europe-west1.firebasedatabase.app/questions.json', {
method: 'POST',
body: JSON.stringify(question),
headers: {
     'Content-type' : 'application/json'
}
})
.then( Response => Response.json())
.then(Response => {
     question.id =Response.name
     return question
})
.then(addToLocalStorage)
.then(Question.renderList)
}


static fetch (token) {
     if (!token){
         return Promise.resolve('<p class="error">Email не зарегестрированы</p>') 
     }
   return fetch(`https://inputvalue-e09a0-default-rtdb.europe-west1.firebasedatabase.app/questions.json?auth=${token}`)
     .then(Response => Response.json())
     .then(Response => {
          if(Response && Response.error) {
               return `<p class="error">${questions.error}</p>`
          }

          return Response ? Object.keys(Response).map( key => ({
               ...Response[key],
               id:key
          })) : []
     })
}

static renderList () {
     const questions = getQuestionFromLocalStorage()

     const html =  questions.length 
     ? questions.map(toCard).join('')
     : `<div class="mui--text-headline">Вы пока ничего не спрашивали</div>`


     const list = document.getElementById('List')
     list.innerHTML = html

}

static listToHtml(questions) {
     return questions.length
     ? `<ol>${questions.map(q => `<li>${q.text}</li>`).join('')}</ol>`
     : '<p>No one questions</p>'
}

}



function addToLocalStorage(question) {
const all = getQuestionFromLocalStorage()
all.push(question)
localStorage.setItem('questions', JSON.stringify(all))
}

function getQuestionFromLocalStorage() {
     return JSON.parse(localStorage.getItem('questions') || '[]')
}



function toCard(question){
return `
                 <div class="mui-divider">
                 ${new Date(question.date).toLocaleDateString()}
                 ${new Date(question.date).toLocaleTimeString()}
                 </div>
                 <br>
                 <div class="mui--text-headline">${question.text}</div>
`
}