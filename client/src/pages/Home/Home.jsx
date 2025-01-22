import Banner from "./Banner";
import FeaturedServices from "./FeaturedServices";
import Partners from "./Partners";
import Stats from "./Stats";
import Testimonials from "./Testimonials";
import WhyChooseUs from "./WhyChooseUs";

const Home = () => {
    return (
        <div>
            {/* Banner */}
            <Banner></Banner>
            {/* Featured Services */}
            <FeaturedServices></FeaturedServices>
            {/* Meet Our Partners */}
            <Partners></Partners>
            {/* Why Choose Us */}
            <WhyChooseUs></WhyChooseUs>
            {/* Stats */}
            <Stats></Stats>
            {/* Testimonials */}
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;