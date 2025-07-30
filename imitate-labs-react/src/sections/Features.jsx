import React from 'react';
import './Feature.css'; // Make sure to copy your CSS here

const features = [
  {
    title: 'Self-Style Learning',
    description: 'An AI that learns your style',
    icon: 'ri-flashlight-line',
    extraClass: '',
  },
  {
    title: 'Other-Style Learning',
    description: 'Learns other"s style',
    icon: 'ri-fire-line',
    extraClass: 'card__orange',
  },
  {
    title: 'Assistant',
    description: 'Your own Content Creating Assistant',
    icon: 'ri-shining-line',
    extraClass: 'card__green',
  },
];

const Features = () => {
  return (
    <div className="container">
      <div className="card__container">
        {features.map((feature, index) => (
          <article className={`card__article ${feature.extraClass}`} key={index}>
            <div className="card__scale-1"></div>
            <div className="card__scale-2"></div>

            <div className="card__shape-1">
              <div className="card__shape-2"></div>
              <div className="card__shape-3">
                <i className={`${feature.icon} card__icon`}></i>
              </div>
            </div>

            <div className="card__data">
              <h2 className="card__title">{feature.title}</h2>
              <p className="card__description">{feature.description}</p>
              <a href="#" className="card__button">Know More</a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Features;
