package com.X_axe_breaker.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import java.math.BigDecimal;

@Configuration
@Slf4j
public class ProductFlavourSeeder {

    @Bean
    CommandLineRunner seedProductFlavours(
            JdbcTemplate jdbcTemplate
    ) {
        return args -> {

            /*
             * PRE-WORKOUT
             */

            seedFlavour(
                    jdbcTemplate,
                    1,
                    "Neon Venom — Citrus Lemon",
                    "BLOOD RUSH PRE-WORKOUT IS ENGINEERED FOR THE DEDICATED FEW WHO REFUSE TO LEAVE ANYTHING IN THE TANK. FROM THE MOMENT YOU TAKE IT, THIS FORMULA IS DESIGNED TO SUPPORT BLOOD FLOW AND INTENSE MUSCLE PUMPS DURING TRAINING. FORMULATED WITH KEY INGREDIENTS TO SUPPORT MUSCULAR ENDURANCE AND BUFFERING CAPACITY, IT HELPS YOU PUSH HARD THROUGH DEMANDING SESSIONS WHEN DIET AND TRAINING ARE ON POINT. IT DELIVERS HARD-HITTING ENERGY AND SHARP MENTAL FOCUS TO KEEP YOU DIALED IN TO NOTHING BUT THE IRON AND YOUR GOALS.",
                    "2800"
            );

            seedFlavour(
                    jdbcTemplate,
                    1,
                    "Midnight Fizz — Cola",
                    "BLOOD RUSH PRE-WORKOUT IS ENGINEERED FOR THE DEDICATED FEW WHO REFUSE TO LEAVE ANYTHING IN THE TANK. FROM THE MOMENT YOU TAKE IT, THIS FORMULA IS DESIGNED TO SUPPORT BLOOD FLOW AND INTENSE MUSCLE PUMPS DURING TRAINING. FORMULATED WITH KEY INGREDIENTS TO SUPPORT MUSCULAR ENDURANCE AND BUFFERING CAPACITY, IT HELPS YOU PUSH HARD THROUGH DEMANDING SESSIONS WHEN DIET AND TRAINING ARE ON POINT. IT DELIVERS HARD-HITTING ENERGY AND SHARP MENTAL FOCUS TO KEEP YOU DIALED IN TO NOTHING BUT THE IRON AND YOUR GOALS.",
                    "2800"
            );

            seedFlavour(
                    jdbcTemplate,
                    2,
                    "Frozen Ghost — Apple Mint",
                    "BURN SYNDICATE PRE-WORKOUT IS A HIGH-INTENSITY FORMULA FORGED FOR ATHLETES IN SHRED MODE. FROM THE FIRST SCOOP, IT UNLEASHES EXPLOSIVE ENERGY AND LASER FOCUS TO KEEP YOU DIALED IN THROUGH BRUTAL, SWEAT-DRENCHED SESSIONS. FORMULATED WITH KEY THERMOGENIC INGREDIENTS TO SUPPORT METABOLISM AND CALORIE BURN DURING TRAINING. IT'S ENGINEERED TO HELP YOU MAINTAIN INTENSITY AND MUSCULAR ENDURANCE WHEN EVERY REP COUNTS. WHEN THE HEAT IS ON, IT DELIVERS A RELENTLESS SURGE OF CLEAN ENERGY AND AGGRESSION SO YOU LEAVE NOTHING IN THE TANK.",
                    "2800"
            );

            seedFlavour(
                    jdbcTemplate,
                    2,
                    "Spirit Colada — Pina Colada",
                    "BURN SYNDICATE PRE-WORKOUT IS A HIGH-INTENSITY FORMULA FORGED FOR ATHLETES IN SHRED MODE. FROM THE FIRST SCOOP, IT UNLEASHES EXPLOSIVE ENERGY AND LASER FOCUS TO KEEP YOU DIALED IN THROUGH BRUTAL, SWEAT-DRENCHED SESSIONS. FORMULATED WITH KEY THERMOGENIC INGREDIENTS TO SUPPORT METABOLISM AND CALORIE BURN DURING TRAINING. IT'S ENGINEERED TO HELP YOU MAINTAIN INTENSITY AND MUSCULAR ENDURANCE WHEN EVERY REP COUNTS. WHEN THE HEAT IS ON, IT DELIVERS A RELENTLESS SURGE OF CLEAN ENERGY AND AGGRESSION SO YOU LEAVE NOTHING IN THE TANK.",
                    "2800"
            );

            seedFlavour(
                    jdbcTemplate,
                    3,
                    "Toxic Fusion — Peach Mango",
                    "DEVIL'S PUMP PRE-WORKOUT IS AN UNHOLY, STIMULANT-FREE FORMULA FORGED FOR ELITE BODYBUILDERS WHO REFUSE TO TRAIN WITHOUT INSANE INTENSITY. FROM THE MOMENT YOU TAKE IT, THIS FORMULA IS DESIGNED TO SUPPORT BLOOD FLOW AND EXTREME MUSCLE FULLNESS DURING TRAINING. BUILT FOR BRUTAL SESSIONS, IT CONTAINS KEY INGREDIENTS TO SUPPORT MUSCULAR ENDURANCE AND HYDRATION, HELPING YOU PUSH THROUGH HIGH-VOLUME WORK WHEN DIET AND TRAINING ARE ON POINT. SIMULTANEOUSLY, IT PROVIDES ELECTROLYTES TO SUPPORT HYDRATION AND KEY COMPOUNDS TO SUPPORT FOCUS AND MIND-MUSCLE CONNECTION, SO YOU STAY LOCKED IN TO EVERY REP WITH RELENTLESS AGGRESSION.",
                    "2600"
            );

            seedFlavour(
                    jdbcTemplate,
                    3,
                    "Blue Venom — Blueberry",
                    "DEVIL'S PUMP PRE-WORKOUT IS AN UNHOLY, STIMULANT-FREE FORMULA FORGED FOR ELITE BODYBUILDERS WHO REFUSE TO TRAIN WITHOUT INSANE INTENSITY. FROM THE MOMENT YOU TAKE IT, THIS FORMULA IS DESIGNED TO SUPPORT BLOOD FLOW AND EXTREME MUSCLE FULLNESS DURING TRAINING. BUILT FOR BRUTAL SESSIONS, IT CONTAINS KEY INGREDIENTS TO SUPPORT MUSCULAR ENDURANCE AND HYDRATION, HELPING YOU PUSH THROUGH HIGH-VOLUME WORK WHEN DIET AND TRAINING ARE ON POINT. SIMULTANEOUSLY, IT PROVIDES ELECTROLYTES TO SUPPORT HYDRATION AND KEY COMPOUNDS TO SUPPORT FOCUS AND MIND-MUSCLE CONNECTION, SO YOU STAY LOCKED IN TO EVERY REP WITH RELENTLESS AGGRESSION.",
                    "2600"
            );

            /*
             * EAA + ELECTROLYTES
             */

            seedFlavour(
                    jdbcTemplate,
                    4,
                    "Toxic Fusion — Strawberry Kiwi",
                    "SOUL REVIVE EAA+ELECTROLYTES IS ENGINEERED FOR THE DEDICATED FEW WHO REFUSE TO LEAVE THEIR RECOVERY TO CHANCE. FROM THE MOMENT YOU TAKE IT, THIS FORMULA DELIVERS ESSENTIAL AMINO ACIDS AND ELECTROLYTES TO SUPPORT HYDRATION AND MUSCLE RECOVERY DURING INTENSE TRAINING. FORMULATED TO SUPPORT PERFORMANCE WHEN DIET AND TRAINING ARE ON POINT, IT HELPS YOU PUSH THROUGH DEMANDING SESSIONS AND MAINTAIN INTENSITY DEEP INTO YOUR WORKOUT. SIMULTANEOUSLY, IT PROVIDES KEY MINERALS TO SUPPORT HYDRATION, ENERGY METABOLISM, AND MENTAL FOCUS SO YOU STAY DIALED IN TO YOUR PERFORMANCE AND YOUR GOALS.",
                    "2600"
            );

            seedFlavour(
                    jdbcTemplate,
                    4,
                    "Spirit Colada — Pina Colada",
                    "SOUL REVIVE EAA+ELECTROLYTES IS ENGINEERED FOR THE DEDICATED FEW WHO REFUSE TO LEAVE THEIR RECOVERY TO CHANCE. FROM THE MOMENT YOU TAKE IT, THIS FORMULA DELIVERS ESSENTIAL AMINO ACIDS AND ELECTROLYTES TO SUPPORT HYDRATION AND MUSCLE RECOVERY DURING INTENSE TRAINING. FORMULATED TO SUPPORT PERFORMANCE WHEN DIET AND TRAINING ARE ON POINT, IT HELPS YOU PUSH THROUGH DEMANDING SESSIONS AND MAINTAIN INTENSITY DEEP INTO YOUR WORKOUT. SIMULTANEOUSLY, IT PROVIDES KEY MINERALS TO SUPPORT HYDRATION, ENERGY METABOLISM, AND MENTAL FOCUS SO YOU STAY DIALED IN TO YOUR PERFORMANCE AND YOUR GOALS.",
                    "2600"
            );

            /*
             * PROTEIN MATRIX-ISO
             *
             * Same description for every 1 KG and 2 KG
             * flavour as requested.
             */
            String matrixIsoDescription =
                    "MATRIX ISO IS ENGINEERED FOR THE DEDICATED FEW WHO DEMAND ABSOLUTE DOMINANCE FROM THEIR RECOVERY AND REFUSE TO LEAVE THEIR MUSCLE GROWTH TO CHANCE. FROM THE MOMENT YOU SLAM BACK IT'S UNEXPECTEDLY RICH, UNIQUELY SMOOTH FLAVOR, IT FORCES A RAPID SURGE OF DUAL ACTION AMINO ACIDS FLOODING YOUR EXHAUSTED MUSCLES WITH A HIGH-BIOAVAILABILITY BLEND OF FERMENTED YEAST PROTEIN ISOLATE AND WHEY PROTEIN ISOLATE.\n\n" +
                            "DELIVERING A BOLD, UNFORGETTABLE TASTE AND COMPLETE MUSCLE RECOVERY SUPPORT THAT DEMANDS RESPECT.\n\n" +
                            "THIS ADVANCED HYBRID FORMULA HELPS TO REDUCE MUSCLE BREAKDOWN, HELPS FIGHT WORKOUT FATIGUE AND IGNITE EXPLOSIVE PROTEIN SYNTHESIS TO PUSH YOUR PHYSIQUE TO ITS ABSOLUTE PEAK.";

            updateExistingFlavourDescription(
                    jdbcTemplate,
                    5,
                    "Mango",
                    "1 KG",
                    matrixIsoDescription
            );

            updateExistingFlavourDescription(
                    jdbcTemplate,
                    5,
                    "Chocolate",
                    "1 KG",
                    matrixIsoDescription
            );

            updateExistingFlavourDescription(
                    jdbcTemplate,
                    5,
                    "Coffee",
                    "1 KG",
                    matrixIsoDescription
            );

            updateExistingFlavourDescription(
                    jdbcTemplate,
                    5,
                    "Mango",
                    "2 KG",
                    matrixIsoDescription
            );

            updateExistingFlavourDescription(
                    jdbcTemplate,
                    5,
                    "Chocolate",
                    "2 KG",
                    matrixIsoDescription
            );

            updateExistingFlavourDescription(
                    jdbcTemplate,
                    5,
                    "Coffee",
                    "2 KG",
                    matrixIsoDescription
            );
        };
    }

    private void seedFlavour(
            JdbcTemplate jdbcTemplate,
            int productId,
            String flavourName,
            String description,
            String price
    ) {

        Integer count =
                jdbcTemplate.queryForObject(
                        """
                        SELECT COUNT(*)
                        FROM product_flavours
                        WHERE product_id = ?
                          AND flavour_name = ?
                        """,
                        Integer.class,
                        productId,
                        flavourName
                );

        /*
         * If the flavour already exists, update ONLY its
         * description so existing flavour rows receive
         * the new PDF description.
         */
        if (count != null && count > 0) {

            jdbcTemplate.update(
                    """
                    UPDATE product_flavours
                    SET description = ?
                    WHERE product_id = ?
                      AND flavour_name = ?
                    """,
                    description,
                    productId,
                    flavourName
            );

            log.info(
                    "Updated product flavour description: productId={}, flavour={}",
                    productId,
                    flavourName
            );

            return;
        }

        jdbcTemplate.update(
                """
                INSERT INTO product_flavours
                (
                    flavour_name,
                    description,
                    in_stock,
                    price,
                    product_id,
                    weight
                )
                VALUES (?, ?, true, ?, ?, NULL)
                """,
                flavourName,
                description,
                new BigDecimal(price),
                productId
        );

        log.info(
                "Seeded product flavour: productId={}, flavour={}",
                productId,
                flavourName
        );
    }

    private void updateExistingFlavourDescription(
            JdbcTemplate jdbcTemplate,
            int productId,
            String flavourName,
            String weight,
            String description
    ) {

        int updatedRows =
                jdbcTemplate.update(
                        """
                        UPDATE product_flavours
                        SET description = ?
                        WHERE product_id = ?
                          AND flavour_name = ?
                          AND LOWER(TRIM(weight)) = LOWER(TRIM(?))
                        """,
                        description,
                        productId,
                        flavourName,
                        weight
                );

        if (updatedRows > 0) {

            log.info(
                    "Updated Matrix ISO description: productId={}, flavour={}, weight={}",
                    productId,
                    flavourName,
                    weight
            );

        } else {

            log.warn(
                    "Matrix ISO flavour not found: productId={}, flavour={}, weight={}",
                    productId,
                    flavourName,
                    weight
            );

        }
    }
}
