package com.X_axe_breaker.config;

import com.X_axe_breaker.entity.Product;
import com.X_axe_breaker.repository.ProductRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import java.math.BigDecimal;
import java.util.List;

@Configuration
@Slf4j
public class DataSeeder {

    @Bean
    CommandLineRunner seedProducts(
            ProductRepository repo,
            JdbcTemplate jdbcTemplate
    ) {

        return args -> {

            /*
             * ============================================================
             * PRODUCT SEEDING
             * ============================================================
             *
             * Keep the existing products untouched when they already
             * exist in the database.
             * ============================================================
             */

            if (repo.count() == 0) {

                List<Product> products = List.of(

                        Product.builder()
                                .name("Blood Rush Pre-Workout")
                                .price(new BigDecimal("1000"))
                                .description("Blood Rush Pre-Workout is crafted to deliver explosive energy, intense focus, and long-lasting endurance for every workout.")
                                .category("Pre-Workout")
                                .badge("BEST SELLER")
                                .featured(true)
                                .inStock(true)
                                .build(),

                        Product.builder()
                                .name("Burn Syndicate Pre-Workout + Fat Burner")
                                .price(new BigDecimal("1000"))
                                .description("Push beyond your limits with X Axe Breaker Pre-Workout + Fat Burner. Engineered to ignite explosive energy while supporting fat loss.")
                                .category("Pre-Workout")
                                .badge("HOT")
                                .featured(true)
                                .inStock(true)
                                .build(),

                        Product.builder()
                                .name("Devils Pump Non-Stim Pre-Workout")
                                .price(new BigDecimal("1000"))
                                .description("X Axe Breaker Non-Stim Pre-Workout delivers clean performance without relying on stimulants.")
                                .category("Pre-Workout")
                                .badge("NEW")
                                .featured(true)
                                .inStock(true)
                                .build(),

                        Product.builder()
                                .name("EAA Electrolyte")
                                .price(new BigDecimal("1000"))
                                .description("Essential amino acids with electrolytes to improve hydration, endurance, and muscle recovery.")
                                .category("Recovery")
                                .badge("POPULAR")
                                .featured(true)
                                .inStock(true)
                                .build(),

                        Product.builder()
                                .name("X Axe Breaker Whey Protein")
                                .price(new BigDecimal("1000"))
                                .description("Premium whey protein with superior absorption to maximize muscle recovery and growth.")
                                .category("Protein")
                                .badge("BEST SELLER")
                                .featured(true)
                                .inStock(true)
                                .build(),

                        Product.builder()
                                .name("Protein Coffee")
                                .price(new BigDecimal("1000"))
                                .description("High-protein coffee that combines rich coffee flavor with premium whey protein.")
                                .category("Protein")
                                .badge("NEW")
                                .featured(true)
                                .inStock(true)
                                .build(),

                        Product.builder()
                                .name("Mass Gainer")
                                .price(new BigDecimal("1000"))
                                .description("High-calorie lean mass gainer designed for maximum muscle size and strength.")
                                .category("Mass Gainer")
                                .badge("POPULAR")
                                .featured(true)
                                .inStock(true)
                                .build(),

                        Product.builder()
                                .name("Protein Coffee 2KG")
                                .price(new BigDecimal("1000"))
                                .description("2KG value pack of Protein Coffee for long-term muscle recovery and energy.")
                                .category("Protein")
                                .badge("VALUE PACK")
                                .featured(true)
                                .inStock(true)
                                .build(),

                        Product.builder()
                                .name("X Axe Breaker Whey Protein 2KG")
                                .price(new BigDecimal("1000"))
                                .description("2KG premium whey protein for serious athletes looking for maximum performance.")
                                .category("Protein")
                                .badge("VALUE PACK")
                                .featured(true)
                                .inStock(true)
                                .build()

                );

                repo.saveAll(products);

                log.info(
                        "Successfully seeded {} X Axe Breaker products.",
                        products.size()
                );
            } else {

                log.info(
                        "Products already exist. Skipping product seeding."
                );
            }


            /*
             * ============================================================
             * PRE-WORKOUT FLAVOUR SEEDING
             * ============================================================
             *
             * These are added separately because your products already
             * exist in the current production database.
             *
             * Weight is NULL because these products have flavour variants
             * but no weight selector.
             * ============================================================
             */

            seedPreWorkoutFlavour(
                    jdbcTemplate,
                    1,
                    "Neon Venom — Citrus Lemon",
                    "Blood Rush Neon Venom flavour with a Citrus Lemon taste.",
                    "2800"
            );

            seedPreWorkoutFlavour(
                    jdbcTemplate,
                    1,
                    "Midnight Fizz — Cola",
                    "Blood Rush Midnight Fizz flavour with a Cola taste.",
                    "2800"
            );


            seedPreWorkoutFlavour(
                    jdbcTemplate,
                    2,
                    "Frozen Ghost — Apple Mint",
                    "Burn Syndicate Frozen Ghost flavour with an Apple Mint taste.",
                    "2800"
            );

            seedPreWorkoutFlavour(
                    jdbcTemplate,
                    2,
                    "Spirit Colada — Pina Colada",
                    "Burn Syndicate Spirit Colada flavour with a Pina Colada taste.",
                    "2800"
            );


            seedPreWorkoutFlavour(
                    jdbcTemplate,
                    3,
                    "Toxic Fusion — Peach Mango",
                    "Devil's Pump Toxic Fusion flavour with a Peach Mango taste.",
                    "2600"
            );

            seedPreWorkoutFlavour(
                    jdbcTemplate,
                    3,
                    "Blue Venom — Blueberry",
                    "Devil's Pump Blue Venom flavour with a Blueberry taste.",
                    "2600"
            );

        };
    }


    /*
     * ================================================================
     * INSERT PRE-WORKOUT FLAVOUR IF IT DOES NOT EXIST
     * ================================================================
     */

    private void seedPreWorkoutFlavour(
            JdbcTemplate jdbcTemplate,
            int productId,
            String flavourName,
            String description,
            String price
    ) {

        String existsSql = """
                SELECT COUNT(*)
                FROM product_flavours
                WHERE product_id = ?
                  AND flavour_name = ?
                """;


        Integer count =
                jdbcTemplate.queryForObject(
                        existsSql,
                        Integer.class,
                        productId,
                        flavourName
                );


        if (count != null && count > 0) {

            log.info(
                    "Flavour already exists: product={} flavour={}",
                    productId,
                    flavourName
            );

            return;
        }


        String insertSql = """
                INSERT INTO product_flavours
                (
                    flavour_name,
                    description,
                    in_stock,
                    price,
                    product_id,
                    weight
                )
                VALUES
                (
                    ?,
                    ?,
                    true,
                    ?,
                    ?,
                    NULL
                )
                """;


        jdbcTemplate.update(
                insertSql,
                flavourName,
                description,
                new BigDecimal(price),
                productId
        );


        log.info(
                "Added flavour: product={} flavour={}",
                productId,
                flavourName
        );
    }
}