"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation"

interface FetchedProduct {
  id: string;
  pid: string;
  title: string;
  price: number;
  image: string;
  cid: string;
  description: string;
}


export default function ProductDetailsPage() {
  const [product, setProduct] = useState<FetchedProduct | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function getProductDetails() {
      try {
        setLoading(true);
        setError("");


        if (!id) {
          setError("No product ID provided");
          setLoading(false);
          return;
        }

        const res = await fetch(`/api/products/${id}`);
        const json = await res.json();
        const { product } = json
        if (!res.ok) {
          setError(json?.message || "Failed to fetch the API");
          setProduct(null);
        } else {
          setProduct(product);
        }
      } catch (err) {
        setError("Unknown error occurred");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    getProductDetails();
  }, [id]);

  // ---- Loading
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-8 min-h-screen flex items-center justify-center">
        <Card className="p-8 border-4 border-black rounded-none shadow-[8px_8px_0_#000000]">
          <h2 className="text-2xl font-bold text-black animate-pulse">Loading...</h2>
        </Card>
      </div>
    );
  }

  // ---- Error
  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-8 min-h-screen flex items-center justify-center">
        <Card className="p-8 border-4 border-red-500 rounded-none shadow-[8px_8px_0_#ef4444] bg-red-50">
          <h2 className="text-2xl font-bold text-red-600">Error: {error}</h2>
        </Card>
      </div>
    );
  }

  // ---- Not found
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto p-8 min-h-screen flex items-center justify-center">
        <Card className="p-8 border-4 border-black rounded-none shadow-[8px_8px_0_#000000]">
          <h2 className="text-2xl font-bold text-black">No product found</h2>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8 bg-cyan-100 min-h-screen">
      {/* Title */}
      <div className="mb-6 border-b-4 border-black pb-4">
        <h1 className="text-6xl font-extrabold uppercase text-black">
          {product.title}
        </h1>

        <Badge className="bg-white text-black mt-2 border-black border-2 rounded-none font-mono">
          ID: {product.cid}
        </Badge>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-8">
          {/* IMAGE */}
          <Card className="p-0 border-4 border-black rounded-none shadow-[8px_8px_0_#000000]">
            <img
              src={product.image || "/placeholder.jpg"}
              alt={product.title}
              className="w-full h-auto object-cover"
            />
          </Card>

          {/* DESCRIPTION */}
          <Card className="p-6 border-4 border-black rounded-none shadow-[8px_8px_0_#000000] bg-white">
            <h2 className="text-3xl font-bold mb-3 border-b-4 border-black pb-2">
              Product Details
            </h2>
            <p className="font-sans text-lg">{product.description}</p>
          </Card>
        </div>

        {/* RIGHT CONTENT */}
        <div className="space-y-6">
          {/* PRICE BLOCK */}
          <Card className="p-6 bg-white border-4 border-black rounded-none shadow-[8px_8px_0_#000000]">
            <p className="text-xl text-black font-bold">Current Price:</p>
            <p className="text-6xl font-mono font-bold text-black">
              ${product.price.toFixed(2)}
            </p>
          </Card>

          {/* BUTTON */}
          <Button className="w-full h-16 text-2xl bg-black text-white border-4 border-black font-extrabold rounded-none uppercase tracking-wider transition-all duration-100 hover:bg-white hover:text-black active:shadow-[4px_4px_0_#000000] active:translate-x-[4px] active:translate-y-[4px] shadow-[8px_8px_0_#000000]">
            BUY NOW
          </Button>

          {/* RATINGS */}
          <Card className="p-4 border-4 border-black rounded-none shadow-[8px_8px_0_#000000] bg-white">
            <h3 className="text-2xl font-bold mb-2 border-b-4 border-black pb-2">
              User Ratings
            </h3>

            <div className="flex items-center space-x-2">
              <span className="text-3xl text-red-500">★</span>
              <span className="text-3xl text-red-500">★</span>
              <span className="text-3xl text-red-500">★</span>
              <span className="text-3xl text-red-500">★</span>
              <span className="text-3xl text-red-500">★</span>
              <span className="bg-black text-white text-xs font-bold px-2 py-0.5 rounded-none border-2 border-black ml-3">
                5.0
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}