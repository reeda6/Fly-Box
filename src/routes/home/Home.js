import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Row, Col } from 'react-bootstrap';
// import { Slide } from 'react-slideshow-image';
// import ImageGallery from 'react-image-gallery';
import fish1 from '../../../public/fish4.jpg';
import fish2 from '../../../public/fish2.jpg';
import fish3 from '../../../public/fish3.jpg';
import { Carousel } from 'react-responsive-carousel';

import s from './Home.css';

// const images = [
//   '../../../public/fish1.jpg',
//   '../../../public/fish2.jpg',
//   '../../../public/fish3.jpg',
//   '../../../public/fish4.jpg',

// ];

// const Slideshow = () => {
//     return (
//         <Slide
//           images={[
//             '../../../public/fish1.jpg',
//             '../../../public/fish2.jpg',
//             '../../../public/fish3.jpg',
//             '../../../public/fish4.jpg',

//           ]}
//           duration={5000}
//           transitionDuration={1000}
//         />
//     )
// }

class Home extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state={images: [
  //     '../../../public/fish1.jpg',
  //     '../../../public/fish2.jpg',
  //     '../../../public/fish3.jpg',
  //     '../../../public/fish4.jpg',
  //   ]}
  // }

  render() {
    const images = [
      {
        original: 'http://lorempixel.com/1000/600/nature/1/',
        thumbnail: 'http://lorempixel.com/250/150/nature/1/',
      },
      {
        original: 'http://lorempixel.com/1000/600/nature/2/',
        thumbnail: 'http://lorempixel.com/250/150/nature/2/',
      },
      {
        original: 'http://lorempixel.com/1000/600/nature/3/',
        thumbnail: 'http://lorempixel.com/250/150/nature/3/',
      },
    ];
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1 className={s.head}>This could be you...</h1>
          <img
            className={s.thisPic}
            src="http://www.flyfisherman.com/files/2017/06/FFMP-161200-STL-02.jpg"
          />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
{
  /* <Carousel>
<div>
    <img src={require('../../../public/fish4.jpg')} />
    <p className="legend">Legend 1</p>
</div>
<div>
    <img src={require('../../../public/fish3.jpg')} />
    <p className="legend">Legend 2</p>
</div>
{/* <div>
    <img src="assets/3.jpeg" />
    <p className="legend">Legend 3</p>
</div> */
}
// </Carousel>
// <div className={s.root}>
//   <Row>
//     <Col xs={2} md={2} mdOffset={2} />
//     <Col className={s.trythis} xs={12} md={8} mdOffset={2} />
//   </Row>
//   <div className={s.container}>
//     {/* <ImageGallery items={images} /> */}

//     {/* <Carousel>
//       <Carousel.Item >
//         <img width={900} height={500} alt="900x500" src= {require('../../../public/fish4.jpg')} />
//         <Carousel.Caption>
//           <h3>First slide label</h3>
//           <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//         </Carousel.Caption>
//       </Carousel.Item>
//       <Carousel.Item>
//         <img width={900} height={500} alt="900x500" src={require('../../../public/fish4.jpg')} />
//         <Carousel.Caption>
//           <h3>Second slide label</h3>
//           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//         </Carousel.Caption>
//       </Carousel.Item>
//       <Carousel.Item>
//         <img width={900} height={500} alt="900x500" src={require('../../../public/fish4.jpg')} />
//         <Carousel.Caption>
//           <h3>Third slide label</h3>
//           <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
//         </Carousel.Caption>
//       </Carousel.Item>
//     </Carousel> */}

//     {/* <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
//       <div className="carousel-inner">
//         <div className="carousel-item active">
//           <img className="d-block w-50" src={fish1} alt="First slide"/>
//         </div>
//         <div className="carousel-item">
//           <img className="d-block w-100" src={fish2} alt="Second slide"/>
//         </div>
//         <div className="carousel-item">
//           <img className="d-block w-100" src={fish3} alt="Third slide"/>
//         </div>
//       </div>
//       <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
//         <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//         <span className="sr-only">Previous</span>
//       </a>
//       <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
//         <span className="carousel-control-next-icon" aria-hidden="true"></span>
//         <span className="sr-only">Next</span>
//       </a>
//     </div> */}

//     {/* <div id="myCarousel" className="carousel slide" data-ride="carousel">
//         <ol v="carousel-indicators">
//           <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
//           <li data-target="#myCarousel" data-slide-to="1"></li>
//           <li data-target="#myCarousel" data-slide-to="2"></li>
//         </ol>

//         <div className="carousel-inner">
//           <div className="item active">
//             <img src={fish1} alt="Chania"/>
//             <div className="carousel-caption">
//               <h3>Los Angeles</h3>
//               <p>LA is always so much fun!</p>
//             </div>
//           </div>

//           <div className="item">
//             <img src={fish2} alt="Chicago"/>
//             <div className="carousel-caption">
//               <h3>Chicago</h3>
//               <p>Thank you, Chicago!</p>
//             </div>
//           </div>

//           <div className="item">
//             <img src={fish3} alt="New York"/>
//             <div className="carousel-caption">
//               <h3>New York</h3>
//               <p>We love the Big Apple!</p>
//             </div>
//           </div>
//         </div>

//         <a className="left carousel-control" href="#myCarousel" data-slide="prev">
//           <span className="glyphicon glyphicon-chevron-left"></span>
//           <span className="sr-only">Previous</span>
//         </a>
//         <a className="right carousel-control" href="#myCarousel" data-slide="next">
//           <span className="glyphicon glyphicon-chevron-right"></span>
//           <span className="sr-only">Next</span>
//         </a>
//       </div> */}
//   </div> */}
// </div>
