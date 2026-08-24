package com.X_axe_breaker.service;

import com.X_axe_breaker.dto.AddToCartRequest;
import com.X_axe_breaker.dto.CartDTO;
import com.X_axe_breaker.dto.CartItemDTO;
import com.X_axe_breaker.entity.Cart;
import com.X_axe_breaker.entity.CartItem;
import com.X_axe_breaker.entity.Product;
import com.X_axe_breaker.entity.ProductFlavour;
import com.X_axe_breaker.repository.CartRepository;
import com.X_axe_breaker.repository.ProductFlavourRepository;
import com.X_axe_breaker.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class CartService {

    private final CartRepository cartRepository;

    private final ProductRepository productRepository;

    private final ProductFlavourRepository productFlavourRepository;


    /*
     * ============================================================
     * ADD TO CART
     * ============================================================
     */
    public CartDTO addToCart(AddToCartRequest request) {

        /*
         * Find parent product
         */
        Product product =
                productRepository.findById(
                        request.getProductId()
                ).orElseThrow(() ->
                        new EntityNotFoundException(
                                "Product not found"
                        )
                );


        /*
         * Selected flavour / variant.
         *
         * Normal products:
         *     flavourId = null
         *
         * Variant products:
         *     flavourId contains the selected variant.
         */
        ProductFlavour selectedFlavour = null;


        if (request.getFlavourId() != null) {

            selectedFlavour =
                    productFlavourRepository.findById(
                            request.getFlavourId()
                    ).orElseThrow(() ->
                            new EntityNotFoundException(
                                    "Product flavour not found"
                            )
                    );


            /*
             * Make sure the selected flavour belongs
             * to the selected parent product.
             */
            if (
                    selectedFlavour.getProduct() == null ||
                            selectedFlavour.getProduct().getId() == null ||
                            !selectedFlavour.getProduct()
                                    .getId()
                                    .equals(product.getId())
            ) {

                throw new IllegalArgumentException(
                        "Selected flavour does not belong to this product"
                );

            }

        }


        /*
         * Determine exact price.
         *
         * Variant:
         *     ProductFlavour.price
         *
         * Normal product:
         *     Product.price
         */
        BigDecimal itemPrice =
                selectedFlavour != null
                        ? selectedFlavour.getPrice()
                        : product.getPrice();


        /*
         * Find customer's cart.
         */
        Cart cart =
                cartRepository
                        .findByCustomerId(
                                request.getCustomerId()
                        )
                        .orElseGet(() -> {

                            Cart newCart =
                                    Cart.builder()
                                            .customerId(
                                                    request.getCustomerId()
                                            )
                                            .items(
                                                    new ArrayList<>()
                                            )
                                            .totalAmount(
                                                    BigDecimal.ZERO
                                            )
                                            .build();

                            return cartRepository.save(
                                    newCart
                            );
                        });


        /*
         * Find existing cart item.
         *
         * Product + flavour must match.
         *
         * This allows:
         *
         * Protein Matrix-ISO
         * 1 KG Mango
         *
         * and
         *
         * Protein Matrix-ISO
         * 2 KG Coffee
         *
         * to exist as separate cart items.
         */
        /*
         * Make selected flavour effectively final
         * before using it inside the lambda.
         */
        final ProductFlavour finalSelectedFlavour =
                selectedFlavour;


        Optional<CartItem> existingItem =
                cart.getItems()
                        .stream()
                        .filter(item -> {

                            /*
                             * Product must match
                             */
                            if (
                                    !item.getProduct()
                                            .getId()
                                            .equals(product.getId())
                            ) {
                                return false;
                            }


                            /*
                             * Existing cart flavour
                             */
                            Long existingFlavourId =
                                    item.getFlavour() != null
                                            ? item.getFlavour().getId()
                                            : null;


                            /*
                             * New selected flavour
                             *
                             * IMPORTANT:
                             * Use finalSelectedFlavour here,
                             * NOT selectedFlavour.
                             */
                            Long newFlavourId =
                                    finalSelectedFlavour != null
                                            ? finalSelectedFlavour.getId()
                                            : null;


                            /*
                             * Both are normal products
                             */
                            if (
                                    existingFlavourId == null &&
                                            newFlavourId == null
                            ) {
                                return true;
                            }


                            /*
                             * One has flavour and the other doesn't
                             */
                            if (
                                    existingFlavourId == null ||
                                            newFlavourId == null
                            ) {
                                return false;
                            }


                            /*
                             * Same product + same flavour
                             */
                            return existingFlavourId.equals(
                                    newFlavourId
                            );

                        })
                        .findFirst();

        /*
         * ========================================================
         * EXISTING ITEM
         * ========================================================
         */
        if (existingItem.isPresent()) {

            CartItem item =
                    existingItem.get();


            item.setQuantity(
                    item.getQuantity()
                            + request.getQuantity()
            );


            item.setSubtotal(
                    itemPrice.multiply(
                            BigDecimal.valueOf(
                                    item.getQuantity()
                            )
                    )
            );

        }


        /*
         * ========================================================
         * NEW ITEM
         * ========================================================
         */
        else {

            CartItem item =
                    CartItem.builder()

                            .cart(cart)

                            .product(product)

                            .flavour(selectedFlavour)

                            .quantity(
                                    request.getQuantity()
                            )

                            .subtotal(
                                    itemPrice.multiply(
                                            BigDecimal.valueOf(
                                                    request.getQuantity()
                                            )
                                    )
                            )

                            .build();


            cart.getItems().add(item);

        }


        /*
         * Recalculate complete cart total.
         */
        calculateTotal(cart);


        cartRepository.save(cart);


        return convertToDTO(cart);

    }


    /*
     * ============================================================
     * GET CART
     * ============================================================
     */
    public CartDTO getCart(
            String customerId
    ) {

        Cart cart =
                cartRepository
                        .findByCustomerId(
                                customerId
                        )
                        .orElseThrow(() ->
                                new EntityNotFoundException(
                                        "Cart not found"
                                )
                        );


        /*
         * Recalculate using CURRENT prices.
         *
         * This is important if a product price was
         * changed after an item was added to cart.
         */
        calculateTotal(cart);


        cartRepository.save(cart);


        return convertToDTO(cart);

    }


    /*
     * ============================================================
     * REMOVE FROM CART
     * ============================================================
     *
     * flavourId is optional.
     *
     * Normal product:
     *     flavourId = null
     *
     * Variant product:
     *     flavourId = selected flavour ID
     */
    public CartDTO removeFromCart(
            String customerId,
            Long productId,
            Long flavourId
    ) {

        Cart cart =
                cartRepository
                        .findByCustomerId(
                                customerId
                        )
                        .orElseThrow(() ->
                                new EntityNotFoundException(
                                        "Cart not found"
                                )
                        );


        /*
         * Remove only the matching product + flavour.
         */
        cart.getItems().removeIf(item -> {

            /*
             * Product must match.
             */
            if (
                    !item.getProduct()
                            .getId()
                            .equals(productId)
            ) {
                return false;
            }


            /*
             * Existing flavour ID.
             */
            Long existingFlavourId =
                    item.getFlavour() != null
                            ? item.getFlavour().getId()
                            : null;


            /*
             * Normal product.
             */
            if (flavourId == null) {
                return existingFlavourId == null;
            }


            /*
             * Variant product.
             */
            return flavourId.equals(
                    existingFlavourId
            );

        });


        /*
         * Recalculate total.
         */
        calculateTotal(cart);


        cartRepository.save(cart);


        return convertToDTO(cart);

    }


    /*
     * ============================================================
     * UPDATE QUANTITY
     * ============================================================
     *
     * flavourId is optional.
     */
    public CartDTO updateQuantity(
            String customerId,
            Long productId,
            Long flavourId,
            Integer quantity
    ) {

        /*
         * Quantity must be positive.
         */
        if (quantity == null || quantity < 1) {

            throw new IllegalArgumentException(
                    "Quantity must be at least 1"
            );

        }


        Cart cart =
                cartRepository
                        .findByCustomerId(
                                customerId
                        )
                        .orElseThrow(() ->
                                new EntityNotFoundException(
                                        "Cart not found"
                                )
                        );


        /*
         * Find exact cart item using
         * product + flavour.
         */
        CartItem item =
                cart.getItems()
                        .stream()
                        .filter(i -> {

                            /*
                             * Product must match.
                             */
                            if (
                                    !i.getProduct()
                                            .getId()
                                            .equals(
                                                    productId
                                            )
                            ) {
                                return false;
                            }


                            /*
                             * Existing flavour ID.
                             */
                            Long existingFlavourId =
                                    i.getFlavour() != null
                                            ? i.getFlavour().getId()
                                            : null;


                            /*
                             * Normal product.
                             */
                            if (flavourId == null) {

                                return existingFlavourId == null;

                            }


                            /*
                             * Variant product.
                             */
                            return flavourId.equals(
                                    existingFlavourId
                            );

                        })
                        .findFirst()
                        .orElseThrow(() ->
                                new EntityNotFoundException(
                                        "Product variant not found in cart"
                                )
                        );


        /*
         * Update quantity.
         */
        item.setQuantity(quantity);


        /*
         * Get CURRENT exact price.
         *
         * Variant:
         *     flavour.price
         *
         * Normal:
         *     product.price
         */
        BigDecimal itemPrice =
                item.getFlavour() != null
                        ? item.getFlavour().getPrice()
                        : item.getProduct().getPrice();


        /*
         * Recalculate subtotal.
         */
        item.setSubtotal(
                itemPrice.multiply(
                        BigDecimal.valueOf(
                                quantity
                        )
                )
        );


        /*
         * Recalculate complete cart.
         */
        calculateTotal(cart);


        cartRepository.save(cart);


        return convertToDTO(cart);

    }


    /*
     * ============================================================
     * CALCULATE TOTAL
     * ============================================================
     *
     * Always calculates using the CURRENT price.
     */
    private void calculateTotal(
            Cart cart
    ) {

        BigDecimal total =
                BigDecimal.ZERO;


        for (
                CartItem item :
                cart.getItems()
        ) {

            /*
             * Current exact price.
             */
            BigDecimal itemPrice =
                    item.getFlavour() != null
                            ? item.getFlavour().getPrice()
                            : item.getProduct().getPrice();


            /*
             * Recalculate subtotal.
             */
            item.setSubtotal(
                    itemPrice.multiply(
                            BigDecimal.valueOf(
                                    item.getQuantity()
                            )
                    )
            );


            /*
             * Add to cart total.
             */
            total =
                    total.add(
                            item.getSubtotal()
                    );

        }


        cart.setTotalAmount(total);

    }


    /*
     * ============================================================
     * CONVERT TO DTO
     * ============================================================
     */
    private CartDTO convertToDTO(
            Cart cart
    ) {

        return CartDTO.builder()

                .id(
                        cart.getId()
                )

                .customerId(
                        cart.getCustomerId()
                )

                .totalAmount(
                        cart.getTotalAmount()
                )

                .items(
                        cart.getItems()
                                .stream()
                                .map(item -> {

                                    ProductFlavour flavour =
                                            item.getFlavour();


                                    /*
                                     * Exact current price.
                                     */
                                    BigDecimal price =
                                            flavour != null
                                                    ? flavour.getPrice()
                                                    : item.getProduct()
                                                    .getPrice();


                                    return CartItemDTO.builder()

                                            .productId(
                                                    item.getProduct()
                                                            .getId()
                                            )

                                            .productName(
                                                    item.getProduct()
                                                            .getName()
                                            )

                                            .flavourId(
                                                    flavour != null
                                                            ? flavour.getId()
                                                            : null
                                            )

                                            .flavourName(
                                                    flavour != null
                                                            ? flavour.getFlavourName()
                                                            : null
                                            )

                                            .weight(
                                                    flavour != null
                                                            ? flavour.getWeight()
                                                            : null
                                            )

                                            .price(
                                                    price
                                            )

                                            .quantity(
                                                    item.getQuantity()
                                            )

                                            .subtotal(
                                                    item.getSubtotal()
                                            )

                                            .build();

                                })
                                .toList()
                )

                .build();

    }

}