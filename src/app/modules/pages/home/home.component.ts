import { Component, ViewChild, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('wrapper', { static: false }) containerRef!: ElementRef;
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  files: any;
  uploadedImage: '';
  private ctx!: CanvasRenderingContext2D | null;
  private isDrawing: boolean = false;
  private startX: number = 0;
  private startY: number = 0;
  private currentX: number = 0;
  private currentY: number = 0;
  private savedCanvasImage!: ImageData;
  SaveCropedImageData = [];
  width = 0;
  height = 0;
  isSaveImgRectData = false;

  constructor(private renderer: Renderer2) {
  }

  onUpload(event) {
    this.files = event.target.files[0];
    if (this.files) {
      const reader = new FileReader();
      reader.onload = async (e: any) => {
        const img = new Image();
        img.src = e.target.result; // Assign base64 string to the image source
        this.uploadedImage = e.target.result;
        await img.decode();
        this.generateCanvas(img.width, img.height)


        // img.onload = () => {
        //   const canvas = this.canvas.nativeElement;
        //   const ctx = canvas.getContext('2d');

        //   if (ctx) {
        //     // Set canvas size to match the image
        //     canvas.width = img.width;
        //     canvas.height = img.height;

        //     // Draw the image onto the canvas
        //     ctx.drawImage(img, 0, 0, img.width, img.height);
        //   }
        // };
      };

      reader.readAsDataURL(this.files);
    }
  }

  ngAfterViewInit() {
    // const canvas = this.canvasRef.nativeElement;
    // this.ctx = canvas.getContext('2d');

    // if (this.ctx) {
    //   canvas.width = 600; // Set default width
    //   canvas.height = 400; // Set default height
    //   this.ctx.fillStyle = 'transparent'; // Set background
    //   this.ctx.fillRect(0, 0, canvas.width, canvas.height);
    // }
  }

  generateCanvas(width, height) {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');

    if (this.ctx) {
      canvas.width = width; // Set default width
      canvas.height = height; // Set default height
      this.ctx.fillStyle = 'transparent'; // Set background
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }

  dragStart(event: MouseEvent) {
    if (!this.ctx) return;
    this.isDrawing = true;
    this.startX = event.offsetX;
    this.startY = event.offsetY;

    // Save the current canvas state (to prevent overlapping)
    this.savedCanvasImage = this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  drag(event: MouseEvent) {
    if (!this.ctx || !this.isDrawing) return;

    this.currentX = event.offsetX;
    this.currentY = event.offsetY;

    // Restore the previous canvas state before drawing a new rectangle
    this.ctx.putImageData(this.savedCanvasImage, 0, 0);

    this.ctx.strokeStyle = "red"; // Rectangle border color
    this.ctx.lineWidth = 2;

    this.width = this.currentX - this.startX;
    this.height = this.currentY - this.startY;


    this.ctx.strokeRect(this.startX, this.startY, this.width, this.height);
  }

  dragStop() {
    this.isDrawing = false;
    this.SaveCropedImageData.push({ startX: this.startX, startY: this.startY, width: this.width, height: this.height });
  }

  // Bind Mouse Events
  @HostListener('window:mouseup', ['$event'])
  onMouseUp(event) {
    if (event.srcElement.className.includes("drawing")) {
      this.dragStop();
    }
  }

  savedImgRectData() {
    this.isSaveImgRectData = true;
    this.SaveCropedImageData.forEach((element, i) => {
      const newDiv = this.renderer.createElement('div');
      this.renderer.addClass(newDiv, `generateDrawingBoxes`);
      this.renderer.addClass(newDiv, `box-${i}`);
      this.renderer.setStyle(newDiv, 'width', `${element.width}px`);
      this.renderer.setStyle(newDiv, 'height', `${element.height}px`);
      this.renderer.setStyle(newDiv, 'left', `${element.startX}px`);
      this.renderer.setStyle(newDiv, 'top', element.startY + "px");

      const anchor = this.renderer.createElement('a');
      this.renderer.setAttribute(anchor, 'href', "javascript:void(0);"); // Prevent default navigation

      // ✅ Add `window.open` directly to the click event
      this.renderer.listen(anchor, 'click', () => {
        window.open(`http://localhost:4200/${i}.jpg`, '_blank', 'width=800,height=600,left=100,top=100');
      });
      this.renderer.appendChild(anchor, newDiv);

      this.renderer.appendChild(this.containerRef.nativeElement, anchor);
    });
  }



















  // constructor(@Inject(DOCUMENT) document: Document) {
  //   this.doc = document;
  // }
  // ngOnInit() {
  //   this.canvas = this.doc.getElementById("myCanvas");
  //   this.init()
  // }

  // OnUpload(event) {
  //   this.files = event.target.files[0];
  //   var img = document.getElementById("scream");
  //   if (this.files) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       const img = new Image();
  //       img.src = e.target.result; // Assign base64 string to the image source
  //       this.uploadedImage = e.target.result;
  //       // img.onload = () => {
  //       //   const canvas = this.canvas.nativeElement;
  //       //   const ctx = canvas.getContext('2d');

  //       //   if (ctx) {
  //       //     // Set canvas size to match the image
  //       //     canvas.width = img.width;
  //       //     canvas.height = img.height;

  //       //     // Draw the image onto the canvas
  //       //     ctx.drawImage(img, 0, 0, img.width, img.height);
  //       //   }
  //       // };
  //     };

  //     reader.readAsDataURL(this.files);
  //   }
  // }

  // init() {

  //   // let context = canvas.getContext('2d');
  //   // context.strokeStyle = 'green';
  //   // context.lineWidth = 4;
  //   // context.lineCap = 'round';
  //   this.canvas.addEventListener('mousedown', this.dragStart, false);
  //   this.canvas.addEventListener('mousemove', this.drag, false);
  //   this.canvas.addEventListener('mouseup', this.dragStop, false);
  //   this.context = this.canvas.getContext('2d');
  // }

  // dragStart(event) {
  //   debugger
  //   this.dragging = true;
  //   this.dragStartLocation = this.getCanvasCoordinates(event);
  //   // var radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x), 2) + Math.pow((dragStartLocation.y - position.y), 2));
  //   // context.beginPath();
  //   // context.arc(dragStartLocation.x, dragStartLocation.y, radius, 0, 2 * Math.PI, false);
  //   // context.fillStyle = getRndColor();
  // }

  // getCanvasCoordinates(event) {
  //   var x = event.clientX - this.canvas.getBoundingClientRect().left,
  //     y = event.clientY - this.canvas.getBoundingClientRect().top;

  //   return { x: x, y: y };
  // }

  // draw(position, type) {
  //   var radius = Math.sqrt(Math.pow((this.dragStartLocation.x - position.x), 2) + Math.pow((this.dragStartLocation.y - position.y), 2));
  //   this.context.beginPath();
  //   this.context.arc(this.dragStartLocation.x, this.dragStartLocation.y, radius, 0, 2 * Math.PI, false);
  //   this.context.fillStyle = this.getRndColor();
  // }

  // dragStop(event) {
  //   var position = this.getCanvasCoordinates(event);
  //   this.draw(position, "polygon");
  // }

  // drag(event) {
  //   let position = this.getCanvasCoordinates(event);
  //   this.draw(position, "polygon");
  // }

  // getRndColor() {
  //   var r = 255 * Math.random() | 0,
  //     g = 255 * Math.random() | 0,
  //     b = 255 * Math.random() | 0;
  //   return 'rgb(' + r + ',' + g + ',' + b + ')';
  // }

  // onKeydown(event) {
  //   // const ctx = canvas.getContext('2d');
  // }

}
