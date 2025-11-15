import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Sun, Heart } from 'lucide-react';
import asset from '../assets/assets';
const heroImageUrl = "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";
const blogImage1 = "https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";

const blogPosts = [
    {
        title: "The Art of the Everyday Uniform: Styling Your Core Essentials",
        excerpt: "Building a functional wardrobe starts with a foundation of perfect basics. We explore how to mix, match, and layer our core pieces—from tees to joggers—to create effortless looks for any occasion.",
        image: blogImage1,
        link: "/blog/styling-essentials"
    },
    {
        title: "Built to Last: How to Care for Your Quality Basics",
        excerpt: "The best clothes are the ones that stay with you. Learn the simple dos and don'ts of washing and caring for your quality apparel to keep it feeling soft, looking great, and lasting for years to come.",
        image: asset.cloth,
        link: "/blog/apparel-care"
    },
    {
        title: "Finding Comfort in Your Own Skin (and Clothes)",
        excerpt: "We believe that true style isn't about what you wear, but how you feel. It's about confidence, ease, and authenticity. We explore how the right clothes can be a catalyst for feeling like the best version of yourself.",
        image: asset.comfy,
        link: "/blog/finding-comfort"
    }
];

const AboutUs = () => {
    return (
        <div className="bg-white text-gray-800">
            {/* --- Hero Section --- */}
            <div className="relative bg-gray-900 text-white text-center py-20 md:py-32">
                <div className="absolute inset-0">
                    <img src={heroImageUrl} alt="Diverse group of friends wearing comfortable and stylish apparel" className="w-full h-full object-cover opacity-40"/>
                </div>
                <div className="relative container mx-auto px-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">More Than a Name. It's a Promise.</h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto">
                        Welcome to Hoodie. Our name is a promise—the promise of that perfect, worn-in comfort you feel in your favorite hoodie, woven into every piece we create.
                    </p>
                </div>
            </div>

            {/* --- Our Story Section --- */}
            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                        <p className="mb-4 text-gray-600">
                            Our story began not with a single garment, but with a feeling. That immediate sense of comfort, ease, and being yourself when you pull on your favorite hoodie. We asked ourselves: why can't every piece of clothing feel this good? Why reserve that ultimate comfort for just one item in the closet?
                        </p>
                        <p className="text-gray-600">
                            That question launched Hoodie. Our mission is to capture that iconic comfort and infuse it into a complete wardrobe of modern essentials. We obsess over soft-touch fabrics, relaxed-yet-flattering fits, and durable construction to ensure every t-shirt, jogger, and sweatshirt we make lives up to our name.
                        </p>
                    </div>
                    <div className='flex justify-center items-center'>
                        <img src={asset.logo} alt="A curated flat lay of the brand's apparel including a t-shirt and joggers" className="rounded-lg shadow-xl" />
                    </div>
                </div>
            </div>

            {/* --- Our Philosophy Section --- */}
            <div className="bg-gray-50">
                <div className="container mx-auto px-4 py-16 md:py-24 text-center">
                    <h2 className="text-3xl font-bold mb-12">Our Philosophy</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="flex flex-col items-center">
                            <Award className="w-12 h-12 mb-4 text-indigo-600" />
                            <h3 className="text-xl font-semibold mb-2">Uncompromising Comfort</h3>
                            <p className="text-gray-600">
                                From our signature fleece to our breathable cotton tees, every fabric is chosen for its incredible softness, durability, and feel.
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <Sun className="w-12 h-12 mb-4 text-indigo-600" />
                            <h3 className="text-xl font-semibold mb-2">Effortless Style</h3>
                            <p className="text-gray-600">
                                We design timeless essentials that form the foundation of your wardrobe. Clean lines, versatile colors, and no loud logos.
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <Heart className="w-12 h-12 mb-4 text-indigo-600" />
                            <h3 className="text-xl font-semibold mb-2">Conscious Craftsmanship</h3>
                            <p className="text-gray-600">
                                We partner with facilities that prioritize fair wages and safe working conditions, creating products you can feel good about.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* --- Blog Section --- */}
            <div className="container mx-auto px-4 py-16 md:py-24">
    <h2 className="text-3xl font-bold text-center mb-12">The Vastram Hub</h2>
    <div className="space-y-16">
        {blogPosts.map((post, index) => (
            <div key={index} className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center ${index % 2 !== 0 ? 'md:grid-flow-row-dense' : ''}`}>
                
                {/* Updated this div below */}
                <div className={`flex justify-center items-center ${index % 2 !== 0 ? 'md:col-start-2' : ''}`}>
                    <img src={post.image} alt={post.title} className="rounded-lg shadow-xl" />
                </div>

                <div className={index % 2 !== 0 ? 'md:col-start-1' : ''}>
                    <h3 className="text-2xl font-semibold mb-3">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <Link to={post.link} className="font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                        Read More →
                    </Link>
                </div>
            </div>
        ))}
    </div>
</div>

            {/* --- CTA Section --- */}
            <div className="bg-indigo-700 text-white">
                <div className="container mx-auto px-4 py-16 text-center">
                    <h2 className="text-3xl font-bold mb-4">Discover Your New Favorites</h2>
                    <p className="text-indigo-200 max-w-xl mx-auto mb-8">
                        Ready to experience the difference? Explore our collection of modern essentials and find the pieces that feel like they were made just for you.
                    </p>
                    <Link to="/collections" className="bg-white text-indigo-700 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-transform hover:scale-105 inline-block">
                        Shop The Collection
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;