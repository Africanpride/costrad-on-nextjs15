import {
  Bebas_Neue,
  Playfair_Display,
  Poppins,
  Plus_Jakarta_Sans,
  Special_Elite,
  Poiret_One,
  Montserrat
} from "next/font/google";


type Props = {
  subset: string | string[];
  weight: string | string[];
  style: string | string[];
  display: string | string[];
};
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

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
  variable: "--font-playfair_display",

});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "900"],
  style: ["normal"],
  display: "swap",
  adjustFontFallback: false,
});


export { poppins, montserrat, playfair_display, bebas, plusJakartaSans, specialElite };
