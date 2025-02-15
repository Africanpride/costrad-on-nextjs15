import {
  Bebas_Neue,
  Playfair_Display,
  Poppins,
  Plus_Jakarta_Sans,
  Special_Elite,
  Poiret_One,
  Montserrat,
  Oswald,
} from "next/font/google";

type Props = {
  subset: string | string[];
  weight: string | string[];
  style: string | string[];
  display: string | string[];
};

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const specialElite = Special_Elite({
  subsets: ["latin"],
  weight: ["400"], // Special Elite typically comes in a single weight
  display: "swap",
  adjustFontFallback: false,
  variable: "--font-special-elite",
});

export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-plusjakartasans",
});

export const oswald = Oswald({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  style: ["normal"],
  display: "swap",
  adjustFontFallback: false,
  variable: "--font-oswald",
});
export const bebas = Bebas_Neue({
  weight: ["400"],
  subsets: ["latin"],
  style: ["normal"],
  display: "swap",
  adjustFontFallback: false,
  variable: "--font-bebas",
});

export const playfair = Playfair_Display({ subsets: ["latin"] });
export const playfair_display = Playfair_Display({
  subsets: ["latin"],
  weight: ["500"],
  style: ["italic"],
  display: "swap",
  adjustFontFallback: false,
  variable: "--font-playfair_display",
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "900"],
  style: ["normal"],
  display: "swap",
  adjustFontFallback: false,
});
