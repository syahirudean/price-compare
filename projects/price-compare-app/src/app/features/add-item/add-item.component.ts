import { Component, OnInit, ViewChild } from '@angular/core';
import {
  doc,
  Firestore,
  serverTimestamp,
  setDoc,
} from '@angular/fire/firestore';
import { catchError } from 'rxjs/operators';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import {
  base64ToFile,
  Dimensions,
  ImageCroppedEvent,
  ImageTransform,
} from 'ngx-image-cropper';
import { of } from 'rxjs';
import { ProductService } from '../../core/services/product.service';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from '@angular/fire/storage';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnInit {
  imageURL?: string;
  imageChangedEvent: string = '';
  imageFile?: File;
  croppedImage: any = '';
  canvasRotation: number = 0;
  rotation: number = 0;
  showCropper: boolean = false;
  containWithinAspectRatio: boolean = false;
  scale: number = 1;
  transform: ImageTransform = {};
  units: string[] = ['Stks', 'Pcs', 'Kg', 'g', 'L', 'ml', 'mg'];
  unitCell: boolean = false;

  @ViewChild('formElement', { static: true }) formElement?: NgForm;
  productForm?: FormGroup;

  // Form state
  loading = false;
  success = false;

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    private route: Router,
    private toast: HotToastService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      brand: ['', Validators.required],
      description: ['', Validators.required],
      quantity: [null, Validators.required],
      unit: ['', Validators.required],
    });
  }

  // Choose city using select dropdown
  changeUnit(e: any) {
    this.unit?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  // Getter method to access formcontrols
  get unit() {
    return this.productForm?.get('unit');
  }

  get brand() {
    return this.productForm?.get('brand');
  }

  get description() {
    return this.productForm?.get('description');
  }

  get quantity() {
    return this.productForm?.get('quantity');
  }

  fileChangeEvent(event: any): void {
    let file = event.target.files[0];
    if (file) {
      this.imageFile = file;
      this.imageChangedEvent = event;
    }
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  imageLoaded() {
    console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
    console.log('Load failed');
  }

  zoomOut() {
    this.scale -= 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }

  zoomIn() {
    this.scale += 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }

  cancelForm() {
    if (
      confirm('Information will be lost. Cancel form and go back to home page?')
    ) {
      this.route.navigateByUrl('/home');
      this.resetForm();
    }
  }

  async submitProduct() {
    if (!this.imageFile) {
      alert('Missing product image. Please upload image of product...');
    } else if (this.brand?.invalid) {
      alert('Missing the brand of the product...');
    } else if (this.description?.invalid) {
      alert('Missing a short description of product...');
    } else if (this.quantity?.invalid) {
      alert('Missing product quantity...');
    } else if (this.unit?.invalid) {
      this.unitCell = true;
      alert('Missing product quantity...');
    } else {
      this.loading = true;

      const productValue = this.productForm?.value;

      const setId = (
        productValue.brand.toLowerCase() +
        '_' +
        productValue.description.toLowerCase() +
        '_' +
        productValue.quantity +
        productValue.unit
      )
        .split(' ')
        .join('_');

      const storage = getStorage();
      const storageRef = ref(storage, `products/${setId}`);

      // 'file' comes from the Blob or File API
      uploadBytes(storageRef, base64ToFile(this.croppedImage))
        .then(() => {
          console.log('Image uploaded...');
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(storageRef).then(async (downloadURL) => {
            const productRef = doc(this.firestore, 'products', setId);
            await setDoc(productRef, {
              id: setId,
              imgUrl: downloadURL,
              brand: productValue.brand,
              description: productValue.description,
              quantity: productValue.quantity,
              lowest_price: {},
              price_list: [],
              user: '',
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            })
              .then(async () => {
                console.log('success');
                this.route.navigateByUrl('/');
                this.resetForm();
              })
              .catch((err) => {
                console.log(err);
                alert(
                  'Oh-oh, something when wrong. Try again later or contact support.'
                );
              });
          });
        })
        .catch((err) => {
          alert(
            'Oh-oh, something when wrong. Try again later or contact support.'
          );
          console.error(err);
        });

      this.loading = false;
    }
  }

  sendData() {
    this.productService.currentMessage
      .pipe(
        this.toast.observe({
          loading: 'Saving...',
          success: (s) => 'I got a response: ' + s,
          error: (e) => 'Something did not work, reason: ' + e,
        }),
        catchError((error) => of(error))
      )
      .subscribe();
  }

  resetForm() {
    this.formElement!.resetForm();
  }
}
