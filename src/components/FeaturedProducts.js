import React, { useEffect } from "react";
import { useProductsContext } from "../context/products_context";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Error from "./Error";
import Loading from "./Loading";
import Product from "./Product";

const FeaturedProducts = () => {
  const {
    products_loading: loading,
    products_error: error,
    featured_products: featured,
  } = useProductsContext();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  // RANDOMIZED FEATURED
  const randomizeFeatured = () => {
    if (featured.length === 0) {
      return []; // Return an empty array if 'featured' is empty
    }
    const random1 = Math.round(Math.random()); // 0 or 1
    const random2 = Math.round(Math.random()) + 2; // 2 or 3
    const random3 = Math.round(Math.random()) + 4; // 4 or 5
    const randomize = [featured[random1], featured[random2], featured[random3]];
    return randomize;
  };
  const homeFeatured = randomizeFeatured();

  return (
    <Wrapper className="section">
      <div className="title">
        <h2>featured products</h2>
        <div className="underline" />
      </div>

      <div className="section-center featured">
        {homeFeatured.map((product) => {
          return <Product key={product.id} {...product} />;
        })}
      </div>
      <Link to="/products" className="btn">
        all products
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`;

export default FeaturedProducts;
