import React from "react";
import ProductDetail from "../../../components/products/ProductDetail";
import ProductReviewList from "../../../components/products/ProductReviewList";
import ProductDescription from "../../../components/products/ProductDescription";

export default function Page() {
  const product = {
    id: 1,
    category: "Shoes",
    name: "Nike Air Max 90",
    price: 120,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat blandit aliquam etiam erat velit scelerisque. Et netus et malesuada fames ac turpis egestas. Nec sagittis aliquam malesuada bibendum arcu vitae elementum. Platea dictumst vestibulum rhoncus est pellentesque. Proin fermentum leo vel orci porta non pulvinar neque. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Iaculis urna id volutpat lacus laoreet non curabitur gravida arcu. Semper viverra nam libero justo laoreet sit amet cursus. Gravida arcu ac tortor dignissim convallis aenean. Tellus id interdum velit laoreet id donec ultrices tincidunt arcu. Id aliquet risus feugiat in ante. Amet aliquam id diam maecenas ultricies mi eget. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo. Vitae tempus quam pellentesque nec nam aliquam sem. Vitae tortor condimentum lacinia quis vel.Quis auctor elit sed vulputate. Arcu risus quis varius quam quisque. Id semper risus in hendrerit gravida rutrum. Mattis vulputate enim nulla aliquet. Interdum velit euismod in pellentesque massa placerat duis. Urna neque viverra justo nec ultrices dui sapien.",
  };

  const reviews = [
    {
      id: 1,
      name: "John Doe",
      date: "25, Nov 2025",
      rating: 5.0,
      title: "I really Love this product!",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac risus a risus elementum vehicula. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean tristique nisl nec fermentum eleifend. Fusce tincidunt, tortor a elementum vehicula, magna ligula iaculis lacus, vel feugiat velit felis a metus.",
    },
    {
      id: 2,
      name: "Jane Smith",
      date: "12, Dec 2024",
      rating: 5.0,
      title: "This is one of the best products I have ever used!",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac risus a risus elementum vehicula. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean tristique nisl nec fermentum eleifend. Fusce tincidunt, tortor a elementum vehicula,magna ligula iaculis lacus, vel feugiat velit felis a metus.",
    },
  ];

  return (
    <div>
      {/* <ProductDetail product={product} /> */}
      <ProductDescription description={product.description} />
      <ProductReviewList reviews={reviews} />
    </div>
  );
}
