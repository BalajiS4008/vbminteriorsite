import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { GoogleMap, MapInfoWindow } from "@angular/google-maps";
import { Modal } from 'bootstrap';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit, OnInit {
  public title = 'rajeswari-interiors-website';

  @ViewChild(GoogleMap) map: GoogleMap;
  @ViewChild(MapInfoWindow) info: MapInfoWindow;

  public zoom = 18;
  public center: google.maps.LatLngLiteral;
  public options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    mapTypeId: "hybrid"
  };
  public isDevice: boolean = false;
  public markers: any[] = [];
  public infoContent = "";
  public formModal: Modal;
  public designPattern = 'modern';
  public showSidebar = false;
  public actionTemplate = 'whatsapp';
  public testimonials: string[] = ['testimonials', 'testimonials', 'testimonials'];
  public navigationMenu = [
    { text: 'Home', href: 'home', category: 'section' },
    { text: 'Our Services', href: 'service', category: 'section' },
    { text: 'About Us', href: 'about', category: 'section' },
    { text: 'Projects', href: 'project', category: 'section' },
    { text: 'Gallery', href: 'gallery', category: 'section' },
    { text: 'Videos', href: 'videos', category: 'section' },
    { text: 'Send Enquiry', href: 'contact', category: 'modal' },
    { text: 'Contact Us', href: 'contact', category: 'modal' }
  ];
  public serviceItems: Record<string, any>[] = [
    { title: 'Residential', content: 'Transform your home into the house of your dreams! Our expert team of designers specialize in creating luxury spaces that are personalized to each unique client. We take a minimalist approach to residence interior design, using a simple material and color palette to create elegant and easy-to-maintain designs that redefine the beauty of your home. Let us bring your vision to life and create a stunning space that you will be proud to call your own.', image: 'offices_icon' },
    { title: 'Commercial ', content: 'From government buildings to retail establishments, we specialize in creating stunning public spaces that are both functional and visually striking. Whether you are looking to revamp your office or transform a school, our designers have the experience and creativity to bring your vision to life. Trust us to elevate your space and impress your clients and customers alike.', image: 'residential_icon' },
    { title: 'Modular Kitchen', content: 'VBM Interior Design creates stunning and functional kitchens tailored to your lifestyle. We take a personalized approach, getting to know you and your unique needs to design a space that is both beautiful and practical. Our high-quality materials and expert craftsmanship ensure that your kitchen will stand the test of time. Let us bring your dream kitchen to life - contact us today and start your kitchen journey with us!', image: 'commercial_icon' },
    { title: 'Wooden Cup Boards', content: 'With a proven reputation for excellence in design, execution, and delivery, our team of experienced designers and decorators are equipped to handle any project. And if you are in the market for a stunning wooden cupboard that perfectly complements your new home, we have got you covered. Trust us to deliver exceptional results at a price that will not break the bank.', image: 'retail_icon' },
    { title: 'Elevation Design', content: 'As a leading interior design firm, we specialize in creating attractive spaces that not only wow your guests but also enhance the overall value of your property. Whether you are working with a small area or a larger space, our talented designers are skilled at maximizing the layout and elevating the look and feel of your home. Let us bring your dreams to life and turn your aspirations into a stunning reality.', image: 'hospitality_icon' },
    { title: 'False Ceiling', content: 'Transform your rooms into spacious, stylish spaces with VBM Interior Designs. Do not overlook the importance of your ceilings in your home decor - they can bring glory to your house. Let us enhance their beauty with our brilliant improvements and multi-coloured lighting fixtures, creating an engaging and joyful area that you will love. Contact us to schedule a consultation today!', image: 'offices_icon' },
    { title: 'Painting', content: 'Transform your home into a stunning sanctuary with VBM Interior Designs! Our expert team will fill your walls with beautiful decor, use insider tricks to light up your space, and help you choose the best paint colors for every room. Elevate your home today and experience the ultimate in style and function!', image: 'residential_icon' },
    { title: 'Plumbing', content: 'Our expert team offers complete solutions for all your plumbing needs, from minor repairs to complete upgrades. We work closely with our clients to ensure their satisfaction and provide professional guidance and expertise every step of the way. With years of experience, trust us to deliver a first-class finish that exceeds your expectations. Choose VBM Interior Designs for all your plumbing needs today!', image: 'commercial_icon' },
    { title: 'Flooring', content: 'Transform your space with VBM Interior Design beautiful and unique flooring solutions! Our expert team combines years of knowledge and dedication to bring your vision to life. Each project is approached with care and attention to detail, resulting in a personalized space that perfectly reflects your style. Trust us to create a stunning and unmatched flooring solution that brings beauty and joy to your everyday life!', image: 'retail_icon' },
    { title: 'Electrical', content: 'VBM Interior Design offers reliable, cost-efficient services for all your commercial design, installation, and maintenance needs. Our friendly and highly experienced team prioritizes safety and quality, with qualified licensed electricians ensuring your building is always in top condition. Trust us to exceed your expectations and provide the expertise and peace of mind you deserve.', image: 'hospitality_icon' },
    { title: 'Tiles Work', content: "Experience the regal elegance of VBM Design Interior's premium roofing and structural solutions! As one of the industry's leading companies, we provide affordable services that maintain our unwavering commitment to quality. Trust us to transform your space and bring your vision to life with our unparalleled expertise!", image: 'offices_icon' },
    { title: 'Wallpaper', content: "Our expert team offers a wide variety of beautiful designs to choose from, each carefully selected to perfectly complement your room's unique style and utility. We pride ourselves on maintaining a consistent theme and adding a touch of timeless elegance with our classic and metallic collections. Let us help you bring your walls to life and create a stunning space that you will love for years to come!", image: 'residential_icon' },
    { title: 'Wardrobe', content: "Maximize your storage space and streamline your belongings with VBM Design Interiors. Our stunning wardrobe designs not only provide ample storage but also add style and elegance to your home. With a wide range of options to choose from, you're sure to find the perfect fit for your space. Contact us today to schedule a consultation and transform your storage solutions with VBM Design Interiors.", image: 'commercial_icon' },
 ];
 
  public serviceItems1: Record<string, any>[] = [
    { title: 'Offices', content: 'We provide interior designing services for offices to our esteemed clientle. Contact us to know more!', image: 'offices_icon' },
    { title: 'Residential', content: 'We turn interior decoration ideas into reality. With our team we help you create your dream home.', image: 'residential_icon' },
    { title: 'Commercial', content: 'We design offices, commercial centers in a way that demonstrates masterful utilization of space.', image: 'commercial_icon' },
    { title: 'Retail', content: 'We emphasis on creating elements that lend a persona to spaces and appear inviting to prospects.', image: 'retail_icon' },
    { title: 'Hospitality', content: 'We are one of the leading names in the hospitality industry since years. Contact our experts today.', image: 'hospitality_icon' }
  ];
  public recentProjects: Record<string, any>[] = [
    { title: 'SKM ANCESTRAL HOME @ SWAMINATHAPURAM - ERODE', images: ['projects.svg', 'projects.svg', 'projects.svg', 'projects.svg', 'projects.svg'] },
    { title: 'SKM GUESTHOUSE @ SOLANGAPALAYAM - ERODE', images: ['projects.svg', 'projects.svg'] }
  ];
  public projectSlideIndexes: Record<string, any> = {};
  public videoItems = [
    { title: 'why hiring an interior designer is always the best option.', url: '' },
    { title: 'reasons why interior designers are awesome!!', url: '' }
  ];
  public slickList: Record<string, any>[] = [
    { comments: 'Brilliant Work was done by your designers. Going to recommend to my friends and family.', profile: 'profile_testimonials.svg', name: 'SAKSHI CHOPRA' },
    { comments: 'Brilliant Work was done by your designers. Going to recommend to my friends and family.', profile: 'profile_testimonials.svg', name: 'SAKSHI CHOPRA' },
    { comments: 'Brilliant Work was done by your designers. Going to recommend to my friends and family.', profile: 'profile_testimonials.svg', name: 'SAKSHI CHOPRA' },
    { comments: 'Brilliant Work was done by your designers. Going to recommend to my friends and family.', profile: 'profile_testimonials.svg', name: 'SAKSHI CHOPRA' },
    { comments: 'Brilliant Work was done by your designers. Going to recommend to my friends and family.', profile: 'profile_testimonials.svg', name: 'SAKSHI CHOPRA' }
  ];
  public galleryList: string[] = [
    'interior-design-1',
    'interior-design-2',
    'interior-design-3',
    'interior-design-4',
    'interior-design-5',
    'interior-design-6',
    'interior-design-7',
    'interior-design-8'
  ];

  public ngAfterViewInit(): void {
    const contactModal: Element = document.querySelector('#contactModal');
    this.formModal = new Modal(contactModal);
    setTimeout(() => { contactModal.classList.add('opacity-100'); }, 1000);
    this.onSlideShow(0);
    this.renderCarousel();
  }

  public ngOnInit(): void {
    this.isDevice = window.innerWidth < 576;
    navigator.geolocation.getCurrentPosition(x => {
      this.center = {
        lat: x.coords.latitude,
        lng: x.coords.longitude
      };
      this.markers.push({
        position: {
          lat: x.coords.latitude,
          lng: x.coords.longitude
        },
        label: {
          color: "blue",
          text: "Marker Label"
        },
        title: "Marker Title",
        info: "Marker info",
        options: {
          animation: google.maps.Animation.DROP
        }
      });
    });

    this.recentProjects.forEach((project: Record<string, any>, index: number) => { this.projectSlideIndexes[index] = 0; });
  }

  public renderCarousel(): void {
    const slickOptions = {
      centerMode: true,
      centerPadding: '60px',
      slidesToShow: 1,
      variableWidth: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        },
        {
          breakpoint: 600,
          settings: {
            arrows: false,
            slidesToShow: 1
          }
        }
      ]
    };
    $('.gallery-carousel').slick(slickOptions);
    $('.testimonial-carousel').slick(slickOptions);
  }

  public onSlickSlide(action: string): void {
    $('.testimonial-carousel').slick(action);
  }

  public toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }

  public closeSidebar(): void {
    this.showSidebar = false;
  }

  public onContactIconClick(contacts: HTMLElement): void {
    contacts.classList.toggle('show');
  }

  public onActionIconClick(action: string): void {
    this.actionTemplate = action;
  }

  public onDesignPatternChange(interiorDesign: HTMLElement): void {
    this.designPattern = this.designPattern === 'modern' ? 'traditional' : 'modern';
    interiorDesign.classList.add('animate');
    setTimeout(() => {
      interiorDesign.classList.remove('animate');
      document.body.classList.remove('modern');
      document.body.classList.remove('traditional');
      document.body.classList.add(this.designPattern);
    }, 1000);
  }

  public onMenuItemClick(e: Event): void {
    this.closeSidebar();
    e.preventDefault();
    const target = $(e.target);
    if (target.attr('category') === 'section') {
      $('.design-container').animate({ scrollTop: document.querySelector(target.attr('href')).offsetTop }, 1000);
    } else {
      this.onEnquireClick();
    }
  }

  public onEnquireClick(): void {
    this.actionTemplate = 'contact';
    this.formModal.show();
  }

  public currentSlide(slideIndex: number, body: HTMLElement): void {
    this.projectSlideIndexes[slideIndex] += 1;
    this.onSlideShow(this.projectSlideIndexes[slideIndex], body);
  }

  public onSlideShow(slideIndex: number, body?: HTMLElement): void {
    const tBody: HTMLElement[] = body ? [body] : [].slice.call(document.querySelectorAll('.project-tbody'));
    tBody.forEach((body: HTMLElement) => {
      const slides: HTMLElement[] = [].slice.call(body.querySelectorAll('.slideshow'));
      slides.forEach((slide: HTMLElement) => { slide.classList.remove('show'); });
      let slideShow = [slideIndex];
      if (!this.isDevice) {
        slideShow.push(slideIndex + 1);
      }
      slideShow.forEach((slide: number, a: number) => {
        let index: number = slide % slides.length;
        slides[index].classList.add('show');
      });
    });
  }

  public onModalClose(): void {
    this.formModal.hide();
  }

}
