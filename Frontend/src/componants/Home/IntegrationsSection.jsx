import React from 'react';
import {
    FaBitcoin,
    FaAt,
    FaPython,
    FaAws,
    FaGithub,
    FaGoogle,
    FaDocker,
    FaAmazon,
    FaMicrosoft,
    FaApple,
    FaSalesforce,
    FaJava,
    FaHtml5,
    FaStripe,
    FaCloud,
    FaCode,
} from 'react-icons/fa';

const integrationIcons = [
    { name: 'N', component: () => <FaStripe size={32} style={{ color: '#E40046' }} /> },
    { name: 'Z', component: () => <FaJava size={32} style={{ color: '#F7B731' }} /> },
    { name: 'E', component: () => <FaAws size={32} style={{ color: '#FF5733' }} /> },
    { name: 'A', component: () => <FaAt size={32} style={{ color: '#0066cc' }} /> },
    { name: 'Xero', component: () => <FaApple size={32} style={{ color: '#4E9E7F' }} /> },
    { name: 'G', component: () => <FaGithub size={32} style={{ color: '#333333' }} /> },
    { name: 'W', component: () => <FaDocker size={32} style={{ color: '#0db7ed' }} /> },
    { name: 'B', component: () => <FaBitcoin size={32} style={{ color: '#FFB800' }} /> },
    { name: 'QB', component: () => <FaAmazon size={32} style={{ color: '#FF9900' }} /> },
    { name: 'Boo', component: () => <FaMicrosoft size={32} style={{ color: '#7F7F7F' }} /> },
    { name: 'g', component: () => <FaPython size={32} style={{ color: '#306998' }} /> },
    { name: 'O', component: () => <FaGoogle size={32} style={{ color: '#4285F4' }} /> },
    { name: 'AA', component: () => <FaSalesforce size={32} style={{ color: '#00A1E0' }} /> },
    { name: 'SAP', component: () => <FaCode size={32} style={{ color: '#F0DB4F' }} /> },
    { name: 'C', component: () => <FaCloud size={32} style={{ color: '#7D4B98' }} /> },
    { name: 'H', component: () => <FaHtml5 size={32} style={{ color: '#E34F26' }} /> },
];

const IntegrationsSection = () => {
    return (
        <section className="bg-[#fffbf4] py-12 md:py-20">
            <div className="container max-w-6xl mx-auto px-4">
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                        Integrations
                    </h2>
                    <p className="text-3xl md:text-4xl font-bold text-gray-900">
                        Seamless integration with your workflow and processes
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 place-items-center">
                {integrationIcons.map((icon, index) => {
                        const IconComponent = icon.component;
                        return (
                            <div
                                key={index}
                                className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-lg flex items-center justify-center shadow-md hover:scale-105 transition-transform duration-200"
                            >
                                {IconComponent ? <IconComponent /> : <div>{icon.name}</div>}
                            </div>
                        );
                    })}
                </div>

               
            </div>
        </section>
    );
};

export default IntegrationsSection;
