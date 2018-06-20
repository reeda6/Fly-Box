/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Row, Col } from 'react-bootstrap';
//import { Slide } from 'react-slideshow-image';
//import ImageGallery from 'react-image-gallery';

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
        thumbnail: 'http://lorempixel.com/250/150/nature/2/'
      },
      {
        original: 'http://lorempixel.com/1000/600/nature/3/',
        thumbnail: 'http://lorempixel.com/250/150/nature/3/'
      }
    ]
    return (
      <div className={s.root}>
        <Row>
          <Col xs={2} md={2} mdOffset={2} />
          <Col className={s.trythis} xs={12} md={8} mdOffset={2} />
        </Row>
        <div className={s.container}>
          {/* <ImageGallery items={images} /> */}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
