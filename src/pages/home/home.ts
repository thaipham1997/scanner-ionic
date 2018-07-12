import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { Component , OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  constructor(public navCtrl: NavController,
    private qrScanner: QRScanner,
    private barcodeScanner: BarcodeScanner) {
      
  }
  ngOnInit() {
  }

  Scan(){
    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
       if (status.authorized) {
         // camera permission was granted
  
  
         // start scanning
         let scanSub = this.qrScanner.scan().subscribe((text: string) => {
           console.log('Scanned something', text);
  
           this.qrScanner.hide(); // hide camera preview
           scanSub.unsubscribe(); // stop scanning
         });
  
       } else if (status.denied) {
         // camera permission was permanently denied
         // you must use QRScanner.openSettings() method to guide the user to the settings page
         // then they can grant the permission from there
       } else {
         // permission was denied, but not permanently. You can ask for permission again at a later time.
       }
    })
    .catch((e: any) => console.log('Error is', e));
    }

    click() {
      this.barcodeScanner.scan().then((barcodeData) => {
      // Success! Barcode data is here
      //alert(‘Success’ +barcodeData);
      var jsonobject = JSON.stringify(barcodeData);
      
      alert(jsonobject + "\nResult: " + barcodeData.text + "\n");
      
      }, (err) => {
      // An error occurred
      alert(err);
      });
    }
}
