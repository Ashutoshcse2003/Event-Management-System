import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Star,
  MapPin,
  ChefHat,
  Flower2,
  Lightbulb,
  Camera,
  Sparkles,
} from "lucide-react";
import { ProductCard } from "../../components/Card";
import Input from "../../components/Input";
import { useCart } from "../../contexts/CartContext";
import { useToast } from "../../contexts/ToastContext";

export default function VendorList() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const toast = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all"
  );

  const categories = [
    { id: "all", name: "All", icon: Sparkles },
    { id: "electronics", name: "Electronics", icon: Lightbulb },
    { id: "fashion", name: "Fashion", icon: Sparkles },
    { id: "home", name: "Home & Kitchen", icon: ChefHat },
    { id: "books", name: "Books", icon: Camera },
    { id: "sports", name: "Sports", icon: Flower2 },
  ];

  const vendors = [
    {
      id: "v1",
      name: "TechWorld Electronics",
      category: "electronics",
      rating: 4.8,
      location: "Downtown",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop",
      products: [
        {
          id: "p1",
          name: "Wireless Bluetooth Headphones",
          price: 2499,
          image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=280&h=192&fit=crop",
        },
        {
          id: "p2",
          name: "Smart Watch Fitness Tracker",
          price: 4999,
          image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=280&h=192&fit=crop",
        },
        {
          id: "p3",
          name: "Portable Bluetooth Speaker",
          price: 1899,
          image:
            "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=280&h=192&fit=crop",
        },
      ],
    },
    {
      id: "v2",
      name: "Fashion Hub",
      category: "fashion",
      rating: 4.9,
      location: "Mall Road",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop",
      products: [
        {
          id: "p4",
          name: "Men's Casual Shirt",
          price: 799,
          image:
            "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=280&h=192&fit=crop",
        },
        {
          id: "p5",
          name: "Women's Summer Dress",
          price: 1499,
          image:
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=280&h=192&fit=crop",
        },
        {
          id: "p6",
          name: "Running Shoes",
          price: 2999,
          image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=280&h=192&fit=crop",
        },
      ],
    },
    {
      id: "v3",
      name: "HomeComfort Store",
      category: "home",
      rating: 4.7,
      location: "Central Plaza",
      image:
        "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=400&h=300&fit=crop",
      products: [
        {
          id: "p7",
          name: "Electric Coffee Maker",
          price: 3499,
          image:
            "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=280&h=192&fit=crop",
        },
        {
          id: "p8",
          name: "Kitchen Knife Set (5 Pieces)",
          price: 1299,
          image:
            "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=280&h=192&fit=crop",
        },
        {
          id: "p9",
          name: "Ceramic Dinner Plate Set",
          price: 899,
          image:
            "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=280&h=192&fit=crop",
        },
      ],
    },
    {
      id: "v4",
      name: "Book Paradise",
      category: "books",
      rating: 5.0,
      location: "University Area",
      image:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=300&fit=crop",
      products: [
        {
          id: "p10",
          name: "Fiction Bestseller Collection",
          price: 399,
          image:
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=280&h=192&fit=crop",
        },
        {
          id: "p11",
          name: "Self-Help Book - Atomic Habits",
          price: 299,
          image:
            "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=280&h=192&fit=crop",
        },
        {
          id: "p12",
          name: "Children's Story Book Set",
          price: 199,
          image:
            "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=280&h=192&fit=crop",
        },
      ],
    },
    {
      id: "v5",
      name: "Sports Zone",
      category: "sports",
      rating: 4.6,
      location: "Stadium Area",
      image:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop",
      products: [
        {
          id: "p13",
          name: "Yoga Mat with Bag",
          price: 699,
          image:
            "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=280&h=192&fit=crop",
        },
        {
          id: "p14",
          name: "Cricket Bat Professional",
          price: 3499,
          image:
            "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=280&h=192&fit=crop",
        },
        {
          id: "p15",
          name: "Badminton Racket Set",
          price: 1299,
          image:
            "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=280&h=192&fit=crop",
        },
      ],
    },
  ];

  const filteredVendors = vendors.filter((vendor) => {
    const matchesCategory =
      selectedCategory === "all" || vendor.category === selectedCategory;
    const matchesSearch = vendor.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const allProducts = filteredVendors.flatMap((vendor) =>
    vendor.products.map((product) => ({
      ...product,
      vendor: vendor.name,
      rating: vendor.rating,
    }))
  );

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-heading font-bold text-neutral-900 mb-2">
            Browse Products 🛍️
          </h1>
          <p className="text-neutral-600">
            Discover amazing products from top vendors
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search products or vendors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="w-4 h-4" />}
                fullWidth
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all
                  ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-primary-500 to-secondary-400 text-white shadow-md"
                      : "bg-white text-neutral-700 border border-neutral-200 hover:border-primary-300"
                  }
                `}
              >
                <category.icon className="w-4 h-4" />
                {category.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="mb-4 flex items-center justify-between">
            <p className="text-neutral-600">
              {allProducts.length} products available
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
              >
                <ProductCard
                  image={product.image}
                  title={product.name}
                  description={product.vendor}
                  price={product.price}
                  rating={product.rating}
                  onAddToCart={() => handleAddToCart(product)}
                  onClick={() => toast.info("Product details coming soon!")}
                />
              </motion.div>
            ))}
          </div>

          {allProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-neutral-400" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                No products found
              </h3>
              <p className="text-neutral-600">
                Try adjusting your search or filters
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
