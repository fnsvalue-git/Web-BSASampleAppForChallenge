import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Android',
    Svg: require('../../static/img/fnsv/android_img.svg').default,
    description: (
      <>
        Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running quickly.
      </>
    ),
    link: 'docs/intro',
  },
  {
    title: 'iOS',
    Svg: require('../../static/img/fnsv/ios_img.svg').default,
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory.
      </>
    ),
    link: 'docs/intro',
  },
];

function Feature({Svg, title, description, link}) {
  return (
    <div className={clsx('col col--6')}>
      <div className="text--center">
        <button style={{backgroundColor : "transparent", borderWidth : 0}} onClick={()=>{location.href = link}}>
            <Svg className={styles.featureSvg} alt={title}/>
        </button>
      </div>
      <div className="text--center padding-horiz--xl">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
