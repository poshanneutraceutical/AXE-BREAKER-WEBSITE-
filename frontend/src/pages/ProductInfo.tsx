import {
  Factory,
  Globe,
  Mail,
  ShieldCheck,
  Instagram,
  Building2
} from "lucide-react";

import certificateImg from "../assets/certificate.png";
import axeBreakerLogo from "../assets/AXEBREAKER.png";

function ProductInfo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 px-5 py-10">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl md:text-5xl font-bold text-center text-white mb-12">
          Product Information
        </h1>

        {/* Marketed By */}

        <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-8 mb-10">

          <div className="flex justify-center mb-4">
            <Building2
              size={45}
              className="text-red-600"
            />
          </div>

          <h2 className="text-center text-lg uppercase tracking-widest text-red-600 font-bold">
            Marketed By
          </h2>
            <div className="flex justify-center mt-4">
              <img
                src={axeBreakerLogo}
                alt="AXEbreaker Logo"
                className="w-56 h-24 object-contain"
              />
            </div>

          <div className="w-20 h-1 bg-red-600 mx-auto mt-4"></div>

          {/* Premium Box */}

          <div className="mt-6 flex justify-center">
            <div className="bg-black border border-red-600 rounded-xl px-8 py-3 shadow-lg">
              <p className="text-white font-bold text-sm tracking-widest text-center">
                PREMIUM NUTRITION • ATHLETIC PERFORMANCE
              </p>
            </div>
          </div>

          <p className="text-gray-700 text-center leading-8 mt-8">
            AXEbreaker is a premium sports nutrition brand
            focused on providing high-quality supplements
            for athletes, fitness enthusiasts, and active
            lifestyles.

            <br />
            <br />

            Our products are developed using quality
            ingredients and are designed to support
            performance, recovery, and overall wellness.

            <br />
            <br />

            AXEbreaker is committed to delivering trusted
            nutrition products with a focus on quality,
            innovation, and customer satisfaction.
          </p>

          {/* Contact Details */}

          <div className="mt-10 bg-gray-100 rounded-2xl p-6 border border-gray-200">

            <h2 className="text-center text-sm uppercase tracking-widest text-red-600 font-bold mb-6">
              Contact Details
            </h2>

            <div className="space-y-4">

              <div className="flex items-center gap-4">
                <div className="bg-red-600 text-white p-3 rounded-full">
                  <Globe size={20} />
                </div>

                <p className="text-gray-700 font-medium">
                  axebreaker.in
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-red-600 text-white p-3 rounded-full">
                  <Mail size={20} />
                </div>

                <p className="text-gray-700 font-medium">
                  axebreakerofficial@gmail.com
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-red-600 text-white p-3 rounded-full">
                  <Instagram size={20} />
                </div>

                <p className="text-gray-700 font-medium">
                  axebreaker_official
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Manufactured By */}
                <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-8 mb-10">

                  <div className="flex justify-center mb-4">
                    <Factory
                      size={45}
                      className="text-red-600"
                    />
                  </div>

                  <h2 className="text-center text-lg uppercase tracking-widest text-red-600 font-bold">
                    Manufactured By
                  </h2>

                  <h3 className="text-center text-3xl font-extrabold mt-4 text-black">
                    Poshan Nutraceuticals LLP
                  </h3>

                  <div className="w-20 h-1 bg-red-600 mx-auto mt-5 mb-6"></div>

                  <p className="text-gray-700 text-center leading-8">
                    Poshan Nutraceuticals LLP is a nutraceutical
                    manufacturing company based in Jaipur,
                    Rajasthan.

                    <br />
                    <br />

                    We specialize in manufacturing premium quality
                    protein supplements, health supplements, and
                    wellness nutrition products.

                    <br />
                    <br />

                    Our manufacturing process follows strict
                    quality standards to ensure safe, effective,
                    and reliable nutrition products.
                  </p>

                  {/* Manufacturing Details */}

                  <div className="mt-10 bg-gray-100 rounded-2xl p-6 border border-gray-200">

                    <h2 className="text-center text-sm uppercase tracking-widest text-red-600 font-bold mb-6">
                      Manufacturing Details
                    </h2>

                    <div className="space-y-5">

                      {/* Address */}

                      <div className="flex items-start gap-4">

                        <div className="bg-red-600 text-white p-3 rounded-full">
                          <Building2 size={20} />
                        </div>

                        <div>
                          <p className="font-bold text-gray-800">
                            Address
                          </p>

                          <p className="text-gray-700 leading-6">
                            Poshan Nutraceuticals LLP
                            <br />
                            Sitapura Industrial Area
                            <br />
                            Jaipur, Rajasthan
                          </p>
                        </div>

                      </div>

                      {/* PIN Code */}

                      <div className="flex items-center gap-4">

                        <div className="bg-red-600 text-white p-3 rounded-full">
                          <Mail size={20} />
                        </div>

                        <div>
                          <p className="font-bold text-gray-800">
                            PIN Code
                          </p>

                          <p className="text-gray-700">
                            302022
                          </p>
                        </div>

                      </div>

                      {/* FSSAI */}

                      <div className="flex items-center gap-4">

                        <div className="bg-red-600 text-white p-3 rounded-full">
                          <ShieldCheck size={20} />
                        </div>

                        <div>
                          <p className="font-bold text-gray-800">
                            FSSAI License
                          </p>

                          <p className="text-gray-700">
                            22226067004335
                          </p>
                        </div>

                      </div>

                    </div>

                  </div>

                  {/* Certificate */}

                  <div className="mt-8 pt-6 border-t border-gray-300">

                    <h4 className="text-center text-sm uppercase tracking-widest text-red-600 font-bold mb-5">
                      Certification
                    </h4>

                    <div className="flex justify-center">

                      <img
                        src={certificateImg}
                        alt="Certificate"
                        className="w-28 h-28 object-contain rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                      />

                    </div>

                  </div>

                </div>

                {/* Footer */}

                <p className="text-center text-gray-300 text-sm">
                  © {new Date().getFullYear()} AXE breaker. All Rights Reserved.
                </p>

              </div>
            </div>
          );
        }

        export default ProductInfo;