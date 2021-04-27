import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    /*  ==========================================
    SHOW UPLOADED IMAGE
* ==========================================
function readURL(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
          $('#imageResult')
              .attr('src', e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
  }
}

$(function () {
  $('#upload').on('change', function () {
      readURL(input);
  });
});

/*  ==========================================
  SHOW UPLOADED IMAGE NAME
* ==========================================
var input = document.getElementById( 'upload' );
var infoArea = document.getElementById( 'upload-label' );

input.addEventListener( 'change', showFileName );
function showFileName( event ) {
var input = event.srcElement;
var fileName = input.files[0].name;
infoArea.textContent = 'File name: ' + fileName;
}


Cris: Copié tal cual de https://bootstrapious.com/p/bootstrap-image-upload
pero me da muchos errores y no sé si es porque es código JS o no lo estoy poniendo donde tiene que ir
*/
  }

}
