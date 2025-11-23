import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const HeroSection = () => {
  return (
    <section className="w-full overflow-hidden mb-8">
      {/* Background wrapper */}
      <div
        className="relative flex items-center py-24 px-4 rounded-b-2xl border-2"
        style={{
          backgroundImage:
            "url('/7b45e70b-fad8-475a-a1a1-7f43f309a7a2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        {/* Overlay to darken background */}
        <div className="absolute inset-0 bg-black/5 rounded-b-2xl"></div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-5xl mx-auto">
          <h1 className="text-white text-6xl md:text-8xl font-extrabold leading-tight mb-4 drop-shadow-lg">
            Don’t miss amazing <br /> grocery deals
          </h1>

          <p className="text-white text-lg mb-10 font-semibold drop-shadow">
            Sign up for the daily newsletter
          </p>

          {/* Form */}
          <form className="flex gap-4 max-w-md">
            <Input
              type="email"
              placeholder="Your email address"
              className="w-full px-4 py-3 rounded-lg"
            />
            <Button className="flex-shrink-0 cursor-pointer">Subscribe</Button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default HeroSection;
