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
