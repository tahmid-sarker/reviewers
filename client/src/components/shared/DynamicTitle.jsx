import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import useAuth from '../../hooks/useAuth';

const DynamicTitle = () => {
    const [services, setServices] = useState([]);
    const { id } = useParams();
    const location = useLocation();
    const { user } = useAuth();
    useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/services`)
    .then((res) => res.json())
    .then((data) => setServices(data));
    
    const currentPath = location.pathname;
    let title = 'Rate Cloud';
    if (currentPath === '/') {
        title = 'Home | Rate Cloud';
    } else if (currentPath === "/membership") {
        title = "Membership | Rate Cloud";
    } else if (currentPath === '/register') {
        title = 'Register | Rate Cloud';
    } else if (currentPath === '/login') {
        title = 'Login | Rate Cloud';
    } else if (currentPath === '/forget-password') {
        title = 'Forgot Password | Rate Cloud';
    } else if (currentPath === '/services') {
        title = 'Services | Rate Cloud';
    } else if (currentPath === '/add-service') {
        title = 'Add Service | Rate Cloud';
    } else if (currentPath === `/service-details/${id}` || currentPath === `/update-service/${id}`) {
        const service = services.find(service => service._id === id);
        if (service) {
            title = `Service Details: ${service.title} | Rate Cloud`;
        }
    } else if (currentPath === '/my-services') {
        title = "My Services | Rate Cloud";
    } else if (currentPath === `/my-reviews`) {
        title = 'My Reviews | Rate Cloud';
    } else if (currentPath === '/my-profile' || currentPath === '/update-profile') {
        title = `${user?.displayName} | Rate Cloud`;
    } else {
        title = 'Page Not Found | Rate Cloud';
    }
    document.title = title;
}, [location.pathname, id, user]);

return null;
};

export default DynamicTitle;