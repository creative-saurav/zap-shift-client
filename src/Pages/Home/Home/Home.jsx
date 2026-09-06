import React from 'react';
import Banner from '../Banner/Banner';
import ItWorks from '../ItWorks/ItWorks';
import Services from '../Services/Services';
import Brands from '../Brands/Brands';
import Features from '../Features/Features';
import MerchantSection from '../MerchantSection/MerchantSection';
import Reviews from '../Reviews/Reviews';
import FAQ from '../Faq/Faq';

const reviewsPromise = fetch('./reviews.json').then(res=>res.json());

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <ItWorks></ItWorks>
           <Services></Services>
           <Brands></Brands>
           <Features></Features>
           <MerchantSection ></MerchantSection>
           <Reviews reviewsPromise= {reviewsPromise}></Reviews>
           <FAQ></FAQ>
        </div>
    );
};

export default Home;