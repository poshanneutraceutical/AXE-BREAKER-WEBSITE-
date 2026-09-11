import { X, ShoppingBag } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useMemo, useState } from "react";

import type {
  Product,
  ProductFlavour,
} from "../lib/api";

import ProductCarousel from "./ProductCarousel";


interface ProductQuickViewProps {

  product: Product | null;

  initialFlavourId?: number;

  isOpen: boolean;

  onClose: () => void;

  onAddToCart: (
    productId: number,
    flavourId?: number
  ) => void;

  addingProductId: number | null;
}


export default function ProductQuickView({

  product,

  initialFlavourId,

  isOpen,

  onClose,

  onAddToCart,

  addingProductId,

}: ProductQuickViewProps) {


  const [
    selectedWeight,
    setSelectedWeight
  ] = useState<string | null>(null);


  const [
    selectedFlavourId,
    setSelectedFlavourId
  ] = useState<number | null>(null);


  /*
   * ============================================================
   * AVAILABLE WEIGHTS
   * ============================================================
   */

  const availableWeights = useMemo(() => {

    if (!product?.flavours) {
      return [];
    }


    return Array.from(
      new Set(
        product.flavours
          .map(
            (flavour) =>
              flavour.weight
          )
          .filter(
            (
              weight
            ): weight is string =>
              Boolean(weight)
          )
      )
    );

  }, [product, initialFlavourId]);


  /*
   * ============================================================
   * INITIAL SELECTION
   * ============================================================
   */

  useEffect(() => {

    if (
      product?.flavours &&
      product.flavours.length > 0
    ) {

      const requestedFlavour =
        initialFlavourId != null
          ? product.flavours.find(
              (flavour) =>
                flavour.id ===
                initialFlavourId
            )
          : undefined;


      const firstFlavour =
        product.flavours.find(
          (flavour) =>
            Boolean(flavour.weight)
        );


      /*
       * Products such as Pre-Workout have
       * flavour variants without a weight.
       */

      const firstAvailableFlavour =
        requestedFlavour ??
        firstFlavour ??
        product.flavours[0];


      const firstWeight =
        firstAvailableFlavour?.weight ??
        null;


      setSelectedWeight(
        firstWeight
      );


      setSelectedFlavourId(
        firstAvailableFlavour?.id ??
        null
      );

    } else {

      setSelectedWeight(
        null
      );

      setSelectedFlavourId(
        null
      );
    }

  }, [product, initialFlavourId]);


  /*
   * ============================================================
   * FLAVOURS FOR SELECTED WEIGHT
   * ============================================================
   */

  const flavoursForSelectedWeight =
    useMemo(() => {

      if (!product?.flavours) {
        return [];
      }


      /*
       * If this product has no weight variants,
       * return all flavours.
       *
       * This is used for Pre-Workout.
       */

      if (!selectedWeight) {
        return product.flavours;
      }


      return product.flavours.filter(
        (flavour) =>
          flavour.weight ===
          selectedWeight
      );

    }, [
      product,
      selectedWeight
    ]);


  /*
   * ============================================================
   * DISPLAY FLAVOUR NAME
   * ============================================================
   */

  const getDisplayFlavourName = (
    flavour: ProductFlavour
  ): string => {

    const flavourName =
      flavour.flavourName || "";

    const name =
      flavourName.trim().toLowerCase();

    /*
     * ============================================================
     * PRE-WORKOUT FLAVOUR NAMES
     *
     * Buttons show only the variant name.
     * ============================================================
     */

    if (name.includes("neon venom")) {
      return "Neon Venom";
    }

    if (name.includes("midnight fizz")) {
      return "Midnight Fizz";
    }

    if (name.includes("frozen ghost")) {
      return "Frozen Ghost";
    }

    if (name.includes("spirit colada")) {
      return "Spirit Colada";
    }

    if (name.includes("toxic fusion")) {
      return "Toxic Fusion";
    }

    if (name.includes("blue venom")) {
      return "Blue Venom";
    }

    /*
     * ============================================================
     * EAA + ELECTROLYTES FLAVOUR NAMES
     * ============================================================
     */

    if (name.includes("toxic fusion")) {
      return "Toxic Fusion";
    }

    if (name.includes("spirit colada")) {
      return "Spirit Colada";
    }

    /*
     * ============================================================
     * EXISTING PROTEIN MATRIX-ISO MAPPINGS
     *
     * Keep these unchanged.
     * ============================================================
     */

    switch (flavour.id) {

      case 1:
        return "Mango";

      case 2:
        return "Chocolate";

      case 3:
        return "Coffee";

      case 4:
        return "Chocolate";

      case 5:
        return "Coffee";

      case 6:
        return "Mango";

      default:
        return flavourName;
    }
  };


  /*
   * ============================================================
   * SELECTED PRE-WORKOUT TASTE
   *
   * The flavour buttons show the variant name, while the
   * "Selected Flavour" row shows the corresponding taste.
   * ============================================================
   */

  const getSelectedFlavourTaste = (
    flavour: ProductFlavour
  ): string => {

    const name =
      (flavour.flavourName || "")
        .trim()
        .toLowerCase();

    if (
      product?.id === 4 &&
      name.includes("toxic fusion")
    ) {
      return "Strawberry Kiwi";
    }

    if (
      product?.id === 4 &&
      name.includes("spirit colada")
    ) {
      return "Pina Colada";
    }

    if (
      product?.id === 1 &&
      name.includes("neon venom")
    ) {
      return "Citrus Lemon";
    }

    if (
      product?.id === 1 &&
      name.includes("midnight fizz")
    ) {
      return "Cola";
    }

    if (
      product?.id === 2 &&
      name.includes("frozen ghost")
    ) {
      return "Apple Mint";
    }

    if (
      product?.id === 2 &&
      name.includes("spirit colada")
    ) {
      return "Pina Colada";
    }

    if (
      product?.id === 3 &&
      name.includes("toxic fusion")
    ) {
      return "Peach Mango";
    }

    if (
      product?.id === 3 &&
      name.includes("blue venom")
    ) {
      return "Blueberry";
    }

    return getDisplayFlavourName(flavour);
  };


  /*
   * ============================================================
   * SELECTED FLAVOUR
   * ============================================================
   */

  const selectedFlavour:
    ProductFlavour | null =

    product?.flavours?.find(
      (flavour) =>
        flavour.id ===
        selectedFlavourId
    ) ?? null;


  /*
   * ============================================================
   * CHANGE WEIGHT
   * ============================================================
   */

  const handleWeightChange = (
    weight: string
  ) => {

    setSelectedWeight(
      weight
    );


    const firstFlavour =
      product?.flavours?.find(
        (flavour) =>
          flavour.weight ===
          weight
      );


    setSelectedFlavourId(
      firstFlavour?.id ??
      null
    );
  };


  /*
   * ============================================================
   * CHANGE FLAVOUR
   * ============================================================
   */

  const handleFlavourChange = (
    flavourId: number
  ) => {

    setSelectedFlavourId(
      flavourId
    );
  };


  /*
   * ============================================================
   * PRE-WORKOUT IMAGE MAPPING
   * ============================================================
   */

  const getPreWorkoutFlavourImages = (
    productId: number,
    flavourName: string
  ): string[] | null => {

    const name =
      flavourName
        .trim()
        .toLowerCase();


    /*
     * BLOOD RUSH
     *
     * Neon Venom — Citrus Lemon
     * images 1,2,3
     */

    if (
      productId === 1 &&
      name.includes("neon venom")
    ) {

      return [
        "/products/pre-workout/4.png",
        "/products/pre-workout/5.png",
        "/products/pre-workout/6.png",
      ];
    }


    /*
     * BLOOD RUSH
     *
     * Midnight Fizz — Cola
     * images 4,5,6
     */

    if (
      productId === 1 &&
      name.includes("midnight fizz")
    ) {

      return [
        "/products/pre-workout/1.png",
        "/products/pre-workout/2.png",
        "/products/pre-workout/3.png",
      ];
    }


    /*
     * BURN SYNDICATE
     *
     * Frozen Ghost — Apple Mint
     * images 7,8,9
     */

    if (
      productId === 2 &&
      name.includes("frozen ghost")
    ) {

      return [
        "/products/Non-stim preworkout/13.png",
                "/products/Non-stim preworkout/14.png",
                "/products/Non-stim preworkout/15.png",
      ];
    }


    /*
     * BURN SYNDICATE
     *
     * Spirit Colada — Pina Colada
     * images 10,11,12
     */

    if (
      productId === 2 &&
      name.includes("spirit colada")
    ) {

      return [
        "/products/Non-stim preworkout/16.png",
                "/products/Non-stim preworkout/17.png",
                "/products/Non-stim preworkout/18.png",
      ];
    }


    /*
     * DEVIL'S PUMP
     *
     * Toxic Fusion — Peach Mango
     * images 13,14,15
     */

    if (
      productId === 3 &&
      name.includes("toxic fusion")
    ) {

      return [
       "/products/Fat-burner/10.png",
               "/products/Fat-burner/11.png",
               "/products/Fat-burner/12.png",
      ];
    }


    /*
     * DEVIL'S PUMP
     *
     * Blue Venom — Blueberry
     * images 16,17,18
     */

    if (
      productId === 3 &&
      name.includes("blue venom")
    ) {

      return [
                "/products/Fat-burner/7.png",
                "/products/Fat-burner/8.png",
                "/products/Fat-burner/9.png",
      ];
    }


    return null;
  };


  /*
   * ============================================================
   * PROTEIN IMAGE MAPPING
   * ============================================================
   */

  const getProteinFlavourImages = (
    flavour: ProductFlavour
  ): string[] | null => {

    const weight =
      flavour.weight
        ?.trim()
        .toLowerCase();


    const displayFlavour =
      getDisplayFlavourName(
        flavour
      )
        .trim()
        .toLowerCase();


    /*
     * 1 KG MANGO
     */

    if (
      weight === "1 kg" &&
      displayFlavour === "mango"
    ) {

      return [
        "/products/protein/25.png",
        "/products/protein/26.png",
        "/products/protein/27.png",
      ];
    }


    /*
     * 1 KG CHOCOLATE
     */

    if (
      weight === "1 kg" &&
      displayFlavour === "chocolate"
    ) {

      return [
        "/products/protein coffee/28.png",
        "/products/protein coffee/29.png",
        "/products/protein coffee/30.png",
      ];
    }


    /*
     * 1 KG COFFEE
     */

    if (
      weight === "1 kg" &&
      displayFlavour === "coffee"
    ) {

      return [
        "/products/protein balgain/31.png",
        "/products/protein balgain/32.png",
        "/products/protein balgain/33.png",
      ];
    }


    /*
     * 2 KG CHOCOLATE
     */

    if (
      weight === "2 kg" &&
      displayFlavour === "chocolate"
    ) {

      return [
        "/products/protein 2kg/37.png",
        "/products/protein 2kg/38.png",
        "/products/protein 2kg/39.png",
      ];
    }


    /*
     * 2 KG COFFEE
     */

    if (
      weight === "2 kg" &&
      displayFlavour === "coffee"
    ) {

      return [
        "/products/protein2kgcofees/40.png",
        "/products/protein2kgcofees/41.png",
        "/products/protein2kgcofees/42.png",
      ];
    }


    /*
     * 2 KG MANGO
     */

    if (
      weight === "2 kg" &&
      displayFlavour === "mango"
    ) {

      return [
        "/products/protein 2kg coffee/34.png",
        "/products/protein 2kg coffee/35.png",
        "/products/protein 2kg coffee/36.png",
      ];
    }


    return null;
  };


  /*
   * ============================================================
   * IMAGE MAPPING
   * ============================================================
   */

  const getFlavourImages = (
    flavour: ProductFlavour
  ): string[] => {

    /*
     * Pre-Workout images.
     */

    if (
      product &&
      (
        product.id === 1 ||
        product.id === 2 ||
        product.id === 3
      )
    ) {

      const preWorkoutImages =
        getPreWorkoutFlavourImages(
          product.id,
          flavour.flavourName
        );


      if (preWorkoutImages) {
        return preWorkoutImages;
      }
    }


    /*
     * EAA + Electrolytes images.
     */

    if (
      product &&
      product.id === 4
    ) {

      const name =
        flavour.flavourName
          .trim()
          .toLowerCase();

      if (name.includes("toxic fusion")) {

        return [
          "/products/EAA electrolyte/19.png",
          "/products/EAA electrolyte/20.png",
          "/products/EAA electrolyte/21.png",
        ];

      }

      if (name.includes("spirit colada")) {

        return [
          "/products/EAA electrolyte/22.png",
          "/products/EAA electrolyte/23.png",
          "/products/EAA electrolyte/24.png",
        ];

      }
    }


    /*
     * Protein Matrix-ISO images.
     */

    if (
      product &&
      product.id === 5
    ) {

      const proteinImages =
        getProteinFlavourImages(
          flavour
        );


      if (proteinImages) {
        return proteinImages;
      }
    }


    /*
     * Backend fallback.
     */

    if (
      flavour.images &&
      flavour.images.length > 0
    ) {

      return flavour.images;
    }


    return product?.images ?? [];
  };


  /*
   * ============================================================
   * CHECK OPEN
   * ============================================================
   */

  if (
    !isOpen ||
    !product
  ) {

    return null;
  }


  /*
   * ============================================================
   * DISPLAY PRICE
   * ============================================================
   */

  const displayPrice =
    selectedFlavour?.price ??
    product.price;


  /*
   * ============================================================
   * DISPLAY DESCRIPTION
   * ============================================================
   */

  const displayDescription =
    selectedFlavour?.description ??
    product.description;


  /*
   * ============================================================
   * DISPLAY IMAGES
   * ============================================================
   */

  const displayImages =
    selectedFlavour
      ? getFlavourImages(
          selectedFlavour
        )
      : product.images;


  /*
   * ============================================================
   * STOCK
   * ============================================================
   */

  const displayInStock =
    selectedFlavour?.inStock ??
    product.inStock;


  /*
   * ============================================================
   * ADD SELECTED VARIANT
   * ============================================================
   */

  const handleAdd = () => {

    if (
      selectedFlavourId !== null
    ) {

      onAddToCart(
        product.id,
        selectedFlavourId
      );

    } else {

      onAddToCart(
        product.id
      );
    }
  };


  return createPortal(

    <div
      className="
        fixed
        inset-0
        z-[9999999]
        bg-black/80
        backdrop-blur-md
        flex
        items-center
        justify-center
        p-4
      "
      onClick={onClose}
    >

      {/* CLOSE BUTTON */}

      <button
        onClick={(e) => {

          e.stopPropagation();

          onClose();

        }}
        className="
          fixed
          top-6
          right-6
          z-[10000000]
          bg-black/70
          hover:bg-red-600
          transition-all
          duration-300
          p-3
          rounded-full
          shadow-lg
        "
      >
        <X
          className="text-white"
          size={24}
        />
      </button>


      {/* MODAL */}

      <div
        className="
          relative
          w-full
          max-w-6xl
          max-h-[92vh]
          overflow-y-auto
          rounded-2xl
          bg-[#111111]
          border
          border-white/10
          shadow-2xl
        "
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        <div
          className="
           grid
           lg:grid-cols-2
           gap-6
           lg:gap-10
           p-4
           sm:p-6
           lg:p-8
          "
        >

          {/* LEFT */}

          <div>

            <ProductCarousel
              images={displayImages}
              productName={
                selectedFlavour
                  ? `${product.name} ${getDisplayFlavourName(
                      selectedFlavour
                    )}`
                  : product.name
              }
            />

          </div>


          {/* RIGHT */}

          <div
            className="
              flex
              flex-col
              justify-center
            "
          >

            {/* BADGE */}

            {product.badge && (

              <span
                className="
                  inline-block
                  bg-red-600
                  text-white
                  text-xs
                  font-semibold
                  tracking-widest
                  uppercase
                  px-3
                  py-1
                  rounded-full
                  mb-5
                  w-fit
                "
              >
                {product.badge}
              </span>

            )}


            {/* PRODUCT NAME */}

            <h2
              className="
                text-4xl
                font-bold
                text-white
                mb-6
              "
            >
              {product.name}
            </h2>


            {/* WEIGHT */}

            {availableWeights.length > 0 && (

              <div className="mb-6">

                <h3
                  className="
                    text-white
                    font-semibold
                    mb-3
                  "
                >
                  Weight
                </h3>

                <div
                  className="
                    flex
                    flex-wrap
                    gap-3
                  "
                >

                  {availableWeights.map(
                    (weight) => (

                      <button
                        key={weight}
                        type="button"
                        onClick={() =>
                          handleWeightChange(
                            weight
                          )
                        }
                        className={`
                          px-5
                          py-2.5
                          rounded-lg
                          border
                          font-semibold
                          transition-all
                          duration-300

                          ${
                            selectedWeight ===
                            weight

                              ? `
                                bg-red-600
                                border-red-600
                                text-white
                                shadow-lg
                                shadow-red-600/30
                              `

                              : `
                                bg-transparent
                                border-white/20
                                text-white/70
                                hover:border-red-500
                                hover:text-white
                              `
                          }
                        `}
                      >
                        {weight}
                      </button>

                    )
                  )}

                </div>

              </div>

            )}


            {/* FLAVOUR */}

            {flavoursForSelectedWeight.length >
              0 && (

              <div className="mb-6">

                <h3
                  className="
                    text-white
                    font-semibold
                    mb-3
                  "
                >
                  Flavour
                </h3>


                <div
                  className="
                    flex
                    flex-wrap
                    gap-3
                  "
                >

                  {flavoursForSelectedWeight.map(
                    (flavour) => (

                      <button
                        key={flavour.id}
                        type="button"
                        onClick={() =>
                          handleFlavourChange(
                            flavour.id
                          )
                        }
                        className={`
                          px-5
                          py-2.5
                          rounded-lg
                          border
                          font-semibold
                          transition-all
                          duration-300

                          ${
                            selectedFlavourId ===
                            flavour.id

                              ? `
                                bg-red-600
                                border-red-600
                                text-white
                                shadow-lg
                                shadow-red-600/30
                              `

                              : `
                                bg-transparent
                                border-white/20
                                text-white/70
                                hover:border-red-500
                                hover:text-white
                              `
                          }
                        `}
                      >
                        {getDisplayFlavourName(
                          flavour
                        )}
                      </button>

                    )
                  )}

                </div>

              </div>

            )}


            {/* PRICE */}

            <p
              className="
                text-red-500
                text-3xl
                font-bold
                mb-6
              "
            >
              ₹
              {Number(
                displayPrice
              ).toLocaleString(
                "en-IN"
              )}
            </p>


            {/* DESCRIPTION */}

            <div className="mb-6">

              <h3
                className="
                  text-white
                  font-semibold
                  mb-2
                "
              >
                Product Description
              </h3>

              <p
                className="
                  text-white/70
                  leading-8
                "
              >
                {displayDescription}
              </p>

            </div>


            {/* DETAILS */}

            <div
              className="
                space-y-3
                mb-8
              "
            >

              {/* CATEGORY */}

              <div
                className="
                  flex
                  justify-between
                  border-b
                  border-white/10
                  pb-2
                "
              >

                <span
                  className="text-white/60"
                >
                  Category
                </span>

                <span
                  className="
                    text-white
                    capitalize
                  "
                >
                  {product.category}
                </span>

              </div>


              {/* WEIGHT */}

              {selectedFlavour?.weight && (

                <div
                  className="
                    flex
                    justify-between
                    border-b
                    border-white/10
                    pb-2
                  "
                >

                  <span
                    className="text-white/60"
                  >
                    Weight
                  </span>

                  <span
                    className="text-white"
                  >
                    {selectedFlavour.weight}
                  </span>

                </div>

              )}


              {/* FLAVOUR */}

              {selectedFlavour && (

                <div
                  className="
                    flex
                    justify-between
                    border-b
                    border-white/10
                    pb-2
                  "
                >

                  <span
                    className="text-white/60"
                  >
                    Selected Flavour
                  </span>

                  <span
                    className="
                      text-white
                      text-right
                    "
                  >
                    {getDisplayFlavourName(selectedFlavour)} (
                      {getSelectedFlavourTaste(selectedFlavour)}
                    )
                  </span>

                </div>

              )}


              {/* AVAILABILITY */}

              <div
                className="
                  flex
                  justify-between
                  border-b
                  border-white/10
                  pb-2
                "
              >

                <span
                  className="text-white/60"
                >
                  Availability
                </span>

                <span
                  className={
                    displayInStock
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {displayInStock
                    ? "In Stock"
                    : "Out of Stock"}
                </span>

              </div>

            </div>


            {/* ADD TO CART */}

            <button
              disabled={
                !displayInStock ||
                addingProductId ===
                  product.id
              }
              onClick={handleAdd}
              className="
                flex
                items-center
                justify-center
                gap-3
                bg-red-600
                hover:bg-red-700
                transition-all
                duration-300
                text-white
                py-4
                rounded-xl
                text-lg
                font-semibold
                disabled:opacity-50
              "
            >

              <ShoppingBag
                size={20}
              />

              {addingProductId ===
              product.id
                ? "Adding..."
                : "Add To Cart"}

            </button>

          </div>

        </div>

      </div>

    </div>,

    document.body

  );
}