import {
  Bebas_Neue,
  Source_Sans_3,
  Playfair_Display,
  Poppins,
  Plus_Jakarta_Sans,
  Special_Elite
} from "next/font/google";


type Props = {
  subset: string | string[];
  weight: string | string[];
  style: string | string[];
  display: string | string[];
};

const specialElite = Special_Elite({
  subsets: ["latin"],
  weight: ["400"], // Special Elite typically comes in a single weight
  display: "swap",
  adjustFontFallback: false,
  variable: "--font-special-elite",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: [ "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-plusjakartasans",
}); 

const bebas = Bebas_Neue({
  weight: ["400"],
  subsets: ["latin"],
  style: ["normal"],
  display: "swap",
  adjustFontFallback: false,
  variable: "--font-bebas",
});

const playfair = Playfair_Display({ subsets: ["latin"] });
const playfair_display = Playfair_Display({
  subsets: ["latin"],
  weight: ["500"],
  style: ["italic"],
  display: "swap",
  adjustFontFallback: false,
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "900"],
  style: ["normal"],
  display: "swap",
  adjustFontFallback: false,
});

const sourceCodePro700 = Source_Sans_3({ subsets: ["latin"], weight: "700" });

export { poppins, playfair_display, bebas, sourceCodePro700, plusJakartaSans, specialElite };
