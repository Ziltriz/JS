function _createModal (option) {
     const modal = document.createElement('div')
     modal.classList.add('pmodal')
     modal.insertAdjacentHTML('afterbegin', `
     <div class="pmodal" id = "pmodal">
     <div class="modal_overlay">
          <div class="modal_window">
               <div class="modal_header">
                    <span class="modal_title"></span>
                    <span class="modal_close">&times;</span>
               </div>
               <div class="modal_body">
                    <p>Lorem ipsum dolor sit.</p>
                    <p>Lorem ipsum dolor sit.</p>
               </div>
               <div class="modal_footer">
                    <button>OK</button>
                    <button>Cancel</button>
               </div>
          </div>
     </div>
     </div>
     `)
     document.body.appendChild(modal)
     modal.querySelector(".modal_title").textContent = option.title || "New Modal"
     modal.querySelector(".modal_body").innerHTML = option.content || "<p> No content provided </p>"
     option.width && (modal.querySelector(".modal_window").style.width = parseInt(option.width)+ "px")
     !option.closable && modal.querySelector(".modal_close").remove();

return modal   
};





/* OnClose(): void
* OnOpen():void
* beforeClose(): boolean 
* animation css
*/


$.modal = function(option) {
     const $modal =_createModal(option)
     const ANIMATION_SPEED = 200
     let closing = false
    
     return{
          open() { 
          !closing && $modal.classList.add('open')
          document.body.addEventListener("click", event => {
          let tar = event.target;
          if (tar.className == "modal_overlay" ||
          tar.className == "modal_close" ||
          tar.tagName == "BUTTON" && tar.textContent == "Cancel"
                ) {
                 this.close();
               }
               return;
             });
             },
        close() {
             closing =true
             $modal.classList.remove('open')
             $modal.classList.add('hide')
             setTimeout( () =>{
                  $modal.classList.remove('hide')
                  closing = false
             }, ANIMATION_SPEED )
             this.destroy();
        },
        destroy() {
               let _modalDelete = document.querySelector('.pmodal')
               _modalDelete.remove()
          
        }
     }
}



