let myForm = document.forms[0];
myForm.addEventListener('submit', function (e) {
     e.preventDefault();
     let modalTitle = this.SetMyTitle.value;
     let modalContent = this.SetMyContent.value;
     let modalWidth = this.SetMyWidth.value;
     let modalClosable = this.SetModalCloasble;
     let modal =$.modal({
          title: modalTitle,
          content: modalContent,
          width: modalWidth,
          closable: modalClosable
     })
     modal.open();
}
)