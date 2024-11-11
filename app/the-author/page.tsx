import { title } from "@/components/primitives";
import Introduction from "@/components/ui/Introduction";
import { bebas } from "@/config/fonts";

export default function AboutPage() {
	return (
		<div className=' container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 min-h-screen h-auto space-y-3 p-5 md:p-12 '>
			<div
				className={` md:col-span-1  text-4xl md:text-6xl space-y-3`}
				data-scroll
				data-scroll-speed={0.1}
			>
				<span
					className={" text-gray-500 text-3xl uppercase font-light"}
				>
					About The Author
				</span>{" "}
				<br />
				<span className='w-1/3 text-yellow-500'>&#8212;</span>
				<div className={`${bebas.className}`}>Dr. Abu Bako</div>
			</div>
			<div className='md:col-span-2 md:text-2xl space-y-2  '>
				<p>
					Dr. Abu Bako, an Economist by profession, is the Founding
					President and Chief Servant of the Logos-Rhema Foundation
					for Leadership Resource Development. Dr Bako is the Founding
					Vessel and Chief Servant of GAPNET (Global Apostolic And
					Prophetic Network) and TGAW (The Global Altar Watch),
					umbrella leadership resource movements with bases and
					partnerships in countries on every continent of the world.
				</p>
				<br />
				<p>
					An author of several inspirational publications, training
					materials and periodicals, Dr. Bako is privileged to be a
					mentor and inspirational speaker in Transformational
					Governance and Leadership seminars, workshops, summits and
					conferences, National Prayer breakfasts and dinners in over
					120 nations of the world including almost all the African
					countries, almost all the Caribbean countries, North and
					South America, most European countries, East, West and
					Central Asia, the Middle East and Arabia.
				</p>
				<br />
				<p>
					The Logos-Rhema Foundation For Leadership Resource
					Development in partnership with GAPNET (Global Apostolic And
					Prophetic Network) is a paradigm-shifting Institution, which
					holds training sessions in different nations of the world.
				</p>
				<br />
				<p></p>
			</div>
		</div>
	);
}
