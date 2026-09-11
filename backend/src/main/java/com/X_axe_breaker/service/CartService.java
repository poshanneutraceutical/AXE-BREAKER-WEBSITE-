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
         * Find parent product.
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
                                    .equals(
                                            product.getId()
                                    )
            ) {

                throw new IllegalArgumentException(
                        "Selected flavour does not belong to this product"
                );

            }

        }


        /*
         * Determine exact item price.
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
         * Make selected flavour effectively final
         * for the stream below.
         */
        final ProductFlavour finalSelectedFlavour =
                selectedFlavour;


        /*
         * Find existing cart item using:
         *
         *     product ID + flavour ID
         *
         * This is important because the same parent
         * product can have multiple different flavours.
         */
        Optional<CartItem> existingItem =
                cart.getItems()
                        .stream()
                        .filter(item -> {

                            /*
                             * Product must match.
                             */
                            if (
                                    !item.getProduct()
                                            .getId()
                                            .equals(
                                                    product.getId()
                                            )
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
                             * New flavour ID.
                             */
                            Long newFlavourId =
                                    finalSelectedFlavour != null
                                            ? finalSelectedFlavour.getId()
                                            : null;


                            /*
                             * Both normal products.
                             */
                            if (
                                    existingFlavourId == null &&
                                            newFlavourId == null
                            ) {

                                return true;

                            }


                            /*
                             * One variant and one normal
                             * product are different items.
                             */
                            if (
                                    existingFlavourId == null ||
                                            newFlavourId == null
                            ) {

                                return false;

                            }


                            /*
                             * Same product + same flavour.
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


        calculateTotal(cart);


        cartRepository.save(
                cart
        );


        return convertToDTO(
                cart
        );

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
                        .orElseGet(() ->

                                Cart.builder()
                                        .customerId(
                                                customerId
                                        )
                                        .items(
                                                new ArrayList<>()
                                        )
                                        .totalAmount(
                                                BigDecimal.ZERO
                                        )
                                        .build()

                        );


        /*
         * Always calculate current totals.
         */
        calculateTotal(
                cart
        );


        return convertToDTO(
                cart
        );

    }


    /*
     * ============================================================
     * REMOVE FROM CART
     * ============================================================
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
         * Remove the exact selected variant when
         * flavourId is supplied.
         *
         * If flavourId is not supplied, remove ALL
         * items belonging to that parent product.
         *
         * This is important for the existing cart page,
         * which currently sends productId only.
         */
        cart.getItems().removeIf(item -> {

            if (
                    !item.getProduct()
                            .getId()
                            .equals(
                                    productId
                            )
            ) {

                return false;

            }


            if (flavourId == null) {

                return true;

            }


            Long existingFlavourId =
                    item.getFlavour() != null
                            ? item.getFlavour().getId()
                            : null;


            return flavourId.equals(
                    existingFlavourId
            );

        });


        calculateTotal(
                cart
        );


        cartRepository.save(
                cart
        );


        return convertToDTO(
                cart
        );

    }


    /*
     * ============================================================
     * UPDATE QUANTITY
     * ============================================================
     */
    public CartDTO updateQuantity(

            String customerId,

            Long productId,

            Long flavourId,

            Integer quantity

    ) {

        /*
         * Quantity 0 or below removes the requested
         * cart item.
         */
        if (
                quantity == null ||
                        quantity <= 0
        ) {

            return removeFromCart(
                    customerId,
                    productId,
                    flavourId
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
         * Find exact product + flavour when
         * flavourId is provided.
         */
        CartItem item =
                cart.getItems()
                        .stream()
                        .filter(i -> {

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
                             * Existing cart behaviour:
                             * when no flavour ID is supplied,
                             * use the first matching item.
                             */
                            if (
                                    flavourId == null
                            ) {

                                return true;

                            }


                            Long existingFlavourId =
                                    i.getFlavour() != null
                                            ? i.getFlavour().getId()
                                            : null;


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


        item.setQuantity(
                quantity
        );


        /*
         * Use exact current variant price.
         */
        BigDecimal itemPrice =
                item.getFlavour() != null
                        ? item.getFlavour().getPrice()
                        : item.getProduct().getPrice();


        item.setSubtotal(
                itemPrice.multiply(
                        BigDecimal.valueOf(
                                quantity
                        )
                )
        );


        calculateTotal(
                cart
        );


        cartRepository.save(
                cart
        );


        return convertToDTO(
                cart
        );

    }


    /*
     * ============================================================
     * CLEAR CART
     * ============================================================
     */
    public void clearCart(
            String customerId
    ) {

        Cart cart =
                cartRepository
                        .findByCustomerId(
                                customerId
                        )
                        .orElse(null);


        if (cart == null) {

            return;

        }


        cart.getItems().clear();


        cart.setTotalAmount(
                BigDecimal.ZERO
        );


        cartRepository.save(
                cart
        );

    }


    /*
     * ============================================================
     * CALCULATE TOTAL
     * ============================================================
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
             * Variant price takes priority over
             * parent product price.
             */
            BigDecimal itemPrice =
                    item.getFlavour() != null
                            ? item.getFlavour().getPrice()
                            : item.getProduct().getPrice();


            item.setSubtotal(
                    itemPrice.multiply(
                            BigDecimal.valueOf(
                                    item.getQuantity()
                            )
                    )
            );


            total =
                    total.add(
                            item.getSubtotal()
                    );

        }


        cart.setTotalAmount(
                total
        );

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
